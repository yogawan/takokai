// src/pages/api/history/index.js
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
    const { id } = req.query; // Ambil ID jika tersedia

    if (req.method === "GET") {
      if (id) {
        // GET by ID
        const chat = await Chat.findOne({ _id: id, userId });
        if (!chat)
          return res.status(404).json({ message: "Chat tidak ditemukan" });
        return res.status(200).json(chat);
      } else {
        // GET all
        const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });
        return res.status(200).json(chats);
      }
    }

    if (req.method === "POST") {
      const { title } = req.body;
      if (!title) return res.status(400).json({ message: "Title diperlukan" });

      const newChat = await Chat.create({
        userId,
        title,
        messages: [],
      });

      return res.status(201).json(newChat);
    }

    if (req.method === "PUT") {
      if (!id) return res.status(400).json({ message: "ID diperlukan" });

      const { title } = req.body;
      const chat = await Chat.findOneAndUpdate(
        { _id: id, userId },
        { title, updatedAt: new Date() },
        { new: true },
      );

      if (!chat)
        return res.status(404).json({ message: "Chat tidak ditemukan" });

      return res.status(200).json(chat);
    }

    if (req.method === "DELETE") {
      if (!id) return res.status(400).json({ message: "ID diperlukan" });

      const chat = await Chat.findOneAndDelete({ _id: id, userId });

      if (!chat)
        return res.status(404).json({ message: "Chat tidak ditemukan" });

      return res.status(200).json({ message: "Chat berhasil dihapus" });
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
}
