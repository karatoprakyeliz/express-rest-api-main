// src/controllers/postController.js
import prisma from "../config/prisma.js";

// GET /api/posts
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true, tags: true },
    });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

// GET /api/posts/user/:userId
export const getPostsByUser = async (req, res, next) => {
  const userId = Number(req.params.userId);
  try {
    const posts = await prisma.post.findMany({
      where: { authorId: userId },
      include: { author: true, tags: true },
    });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

// GET /api/posts/tag/:tagName
export const getPostsByTag = async (req, res, next) => {
  const tagName = req.params.tagName;
  try {
    const posts = await prisma.post.findMany({
      where: { tags: { some: { name: tagName } } },
      include: { author: true, tags: true },
    });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

// GET /api/posts/:id
export const getPostById = async (req, res, next) => {
  const postId = Number(req.params.id);
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { author: true, tags: true },
    });
    if (!post) return res.status(404).json({ error: "Gönderi bulunamadı." });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// // POST /api/posts
// export const createPost = async (req, res, next) => {
//   const { title, content, isPublished, authorId, tags } = req.body;
//   try {
//     const post = await prisma.post.create({
//       data: {
//         title,
//         content,
//         isPublished,
//         author: { connect: { id: authorId } },
//         tags: {
//           connectOrCreate: tags.map((name) => ({
//             where: { name },
//             create: { name },
//           })),
//         },
//       },
//       include: { author: true, tags: true },
//     });
//     res.status(201).json(post);
//   } catch (err) {
//     next(err);
//   }
// };





export const createPost = async (req, res, next) => {
  const { title, content, isPublished, authorId, tags } = req.body;

  if (!authorId) {
    return res.status(400).json({ error: "authorId alanı zorunludur." });
  }

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        isPublished,
        author: { connect: { id: authorId } },
        tags: {
          connectOrCreate: tags.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
      include: { author: true, tags: true },
    });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};



// PUT /api/posts/:id
export const updatePost = async (req, res, next) => {
  const postId = Number(req.params.id);
  const { title, content, isPublished, tags } = req.body;
  try {
    const post = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
        isPublished,
        tags: {
          set: [], // önce tüm etiketleri kaldır
          connectOrCreate: tags.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
      include: { author: true, tags: true },
    });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/posts/:id
export const deletePost = async (req, res, next) => {
  const postId = Number(req.params.id);
  try {
    await prisma.post.delete({ where: { id: postId } });
    res.json({ message: "Gönderi başarıyla silindi." });
  } catch (err) {
    next(err);
  }
};
