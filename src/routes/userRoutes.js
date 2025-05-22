// src/routes/userRoutes.js
import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userControllers.js";

const router = express.Router();

// Tüm kullanıcıları getir
router.get("/", getAllUsers);

// ID’ye göre kullanıcı getir
router.get("/:id", getUserById);

// Yeni kullanıcı oluştur
router.post("/", createUser);

// Kullanıcı güncelle
router.put("/:id", updateUser);

// Kullanıcı sil
router.delete("/:id", deleteUser);

export default router;
