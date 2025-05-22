// src/controllers/userController.js
import prisma from "../config/prisma.js";

// Yardımcı fonksiyon: Sayı mı?
const isValidId = (id) => !isNaN(id) && Number.isInteger(Number(id));

// GET /api/users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      include: { posts: true },
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// GET /api/users/:id
export const getUserById = async (req, res, next) => {
  const userId = Number(req.params.id);
  if (!isValidId(userId)) {
    return res.status(400).json({ error: "Geçersiz kullanıcı ID." });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { posts: true },
    });

    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı." });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

// POST /api/users
export const createUser = async (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "İsim ve email zorunludur." });
  }

  try {
    const newUser = await prisma.user.create({
      data: { name, email },
    });
    res.status(201).json(newUser);
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(400).json({ error: "Bu email zaten kayıtlı." });
    }
    next(err);
  }
};

// PUT /api/users/:id
export const updateUser = async (req, res, next) => {
  const userId = Number(req.params.id);
  const { name, email } = req.body;

  if (!isValidId(userId)) {
    return res.status(400).json({ error: "Geçersiz kullanıcı ID." });
  }

  if (!name && !email) {
    return res.status(400).json({ error: "Güncellenecek alan bulunamadı." });
  }

  try {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { name, email },
    });
    res.json(updated);
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Güncellenecek kullanıcı bulunamadı." });
    }
    next(err);
  }
};

// DELETE /api/users/:id
export const deleteUser = async (req, res, next) => {
  const userId = Number(req.params.id);

  if (!isValidId(userId)) {
    return res.status(400).json({ error: "Geçersiz kullanıcı ID." });
  }

  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    res.json({ message: "Kullanıcı başarıyla silindi." });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Silinecek kullanıcı bulunamadı." });
    }
    next(err);
  }
};

























// // src/controllers/userController.js
// import prisma from "../config/prisma.js";

// // GET /api/users
// export const getAllUsers = async (req, res, next) => {
//   try {
//     const users = await prisma.user.findMany({
//       include: { posts: true },
//     });
//     res.json(users);
//   } catch (err) {
//     next(err);
//   }
// };

// // GET /api/users/:id
// export const getUserById = async (req, res, next) => {
//   const userId = Number(req.params.id);
//   try {
//     const user = await prisma.user.findUnique({
//       where: { id: userId },
//       include: { posts: true },
//     });
//     if (!user) {
//       return res.status(404).json({ error: "Kullanıcı bulunamadı." });
//     }
//     res.json(user);
//   } catch (err) {
//     next(err);
//   }
// };

// // POST /api/users
// export const createUser = async (req, res, next) => {
//   const { name, email } = req.body;
//   try {
//     const newUser = await prisma.user.create({
//       data: { name, email },
//     });
//     res.status(201).json(newUser);
//   } catch (err) {
//     if (err.code === "P2002") {
//       return res.status(400).json({ error: "Bu email zaten kayıtlı." });
//     }
//     next(err);
//   }
// };

// // PUT /api/users/:id
// export const updateUser = async (req, res, next) => {
//   const userId = Number(req.params.id);
//   const { name, email } = req.body;
//   try {
//     const updated = await prisma.user.update({
//       where: { id: userId },
//       data: { name, email },
//     });
//     res.json(updated);
//   } catch (err) {
//     if (err.code === "P2025") {
//       return res
//         .status(404)
//         .json({ error: "Güncellenecek kullanıcı bulunamadı." });
//     }
//     next(err);
//   }
// };

// // DELETE /api/users/:id
// export const deleteUser = async (req, res, next) => {
//   const userId = Number(req.params.id);
//   try {
//     await prisma.user.delete({
//       where: { id: userId },
//     });
//     res.json({ message: "Kullanıcı başarıyla silindi." });
//   } catch (err) {
//     if (err.code === "P2025") {
//       return res.status(404).json({ error: "Silinecek kullanıcı bulunamadı." });
//     }
//     next(err);
//   }
// };
