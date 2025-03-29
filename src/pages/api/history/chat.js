import connectionToDatabase from "@/lib/mongodb";
import Chat from "@/models/Chat";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await connectionToDatabase();

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    if (req.method === "GET") {
      const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });
      return res.status(200).json(chats);
    }

    if (req.method === "POST") {
      const { title } = req.body;

      if (!title) {
        return res.status(400).json({ message: "Title diperlukan" });
      }

      const newChat = await Chat.create({
        userId,
        title,
        messages: [],
      });

      return res.status(201).json(newChat);
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
}