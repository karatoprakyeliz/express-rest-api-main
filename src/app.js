// src/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

// Ortam değişkenlerini yükle (.env)
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Test endpoint
app.get("/", (req, res) => {
  res.send("Perwatch API Başladı 🚀");
});

// Kullanıcı rotaları
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

export default app;
