// src/routes/postRoutes.js
import express from "express";
import {
  getAllPosts,
  getPostsByUser,
  getPostsByTag,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postControllers.js";

const router = express.Router();

// Tüm gönderiler
router.get("/", getAllPosts);

// Kullanıcıya ait gönderiler
router.get("/user/:userId", getPostsByUser);

// Etikete göre gönderiler
router.get("/tag/:tagName", getPostsByTag);

// ID'ye göre gönderi
router.get("/:id", getPostById);

// Yeni gönderi oluştur
router.post("/", createPost);

// Gönderi güncelle
router.put("/:id", updatePost);

// Gönderi sil
router.delete("/:id", deletePost);

export default router;
