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
    const { id } = req.query;

    if (req.method === "GET") {
      const chat = await Chat.findOne({ _id: id, userId });

      if (!chat) {
        return res.status(404).json({ message: "Chat tidak ditemukan" });
      }

      return res.status(200).json(chat);
    }

    if (req.method === "POST") {
      const { message } = req.body;

      if (!message || typeof message !== "object" || !message.content || !message.role) {
        return res.status(400).json({ message: "Message diperlukan dengan role dan content" });
      }

      const chat = await Chat.findOne({ _id: id, userId });
      if (!chat) {
        return res.status(404).json({ message: "Chat tidak ditemukan" });
      }

      chat.messages.push({ role: message.role, content: message.content });
      chat.updatedAt = new Date();
      await chat.save();

      return res.status(201).json({ message: "Pesan berhasil ditambahkan", chat });
    }

    if (req.method === "PUT") {
      const { message } = req.body;

      if (!message || typeof message !== "object" || !message.content || !message.role) {
        return res.status(400).json({ message: "Message diperlukan dengan role dan content" });
      }

      const chat = await Chat.findOne({ _id: id, userId });
      if (!chat) {
        return res.status(404).json({ message: "Chat tidak ditemukan" });
      }

      chat.messages.push({ role: message.role, content: message.content });
      chat.updatedAt = new Date();
      await chat.save();

      return res.status(200).json(chat);
    }

    if (req.method === "DELETE") {
      const chat = await Chat.findOneAndDelete({ _id: id, userId });

      if (!chat) {
        return res.status(404).json({ message: "Chat tidak ditemukan" });
      }

      return res.status(200).json({ message: "Chat berhasil dihapus" });
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
}