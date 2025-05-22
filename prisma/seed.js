import prisma from "../src/config/prisma.js";

// 🔁 Tüm tablo verilerini temizleyen fonksiyon
async function resetDatabase() {
  await prisma.post.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.user.deleteMany();
  console.log("🚨 Veritabanı sıfırlandı (tüm kayıtlar silindi).");
}

// 🏷️ Etiket havuzu (sabit)
const tagsPool = [
  "prisma",
  "nodejs",
  "express",
  "backend",
  "veritabanı",
  "docker",
  "orm",
  "api",
  "auth",
  "javascript",
  "giriş",
  "yeni",
  "fullstack",
];

// 👇 Belirtilen sayıda rastgele etiket döndürür
function getRandomTags(count) {
  const shuffled = [...tagsPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// 🏷️ Etiketleri veritabanında oluşturur veya varsa getirir
async function getOrCreateTags(tagNames) {
  if (!Array.isArray(tagNames)) {
    throw new Error("getOrCreateTags fonksiyonuna bir dizi verilmelidir.");
  }

  const tags = [];

  for (const name of tagNames) {
    const tag = await prisma.tag.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    tags.push(tag);
  }

  return tags;
}

// 🔤 Slug üretici
function generateSlug(title, id) {
  return (
    title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .substring(0, 40) + `-${id}`
  );
}

// 🚀 Seed işleminin ana fonksiyonu
async function main() {
  await resetDatabase();

  // 10 kullanıcı oluştur
  for (let i = 1; i <= 10; i++) {
    const email = `kullanici${Date.now()}_${i}@example.com`;
    const user = await prisma.user.create({
      data: {
        name: `Kullanıcı ${i}`,
        email,
      },
    });
    console.log(`✅ ${user.name} (${user.email}) oluşturuldu.`);
  }

  // Tag'leri baştan bir defa oluştur (10 tane)
  for (let i = 0; i < 10; i++) {
    await prisma.tag.create({
      data: { name: tagsPool[i] },
    });
  }

  // Kullanıcıları getir
  const users = await prisma.user.findMany();
  let postCount = 1;

  for (const user of users) {
    for (let i = 0; i < 2; i++) {
      const title = `Post ${postCount}`;
      const slug = generateSlug(title, Date.now() + postCount);

      // ⬇️ 2 adet rastgele tag ismi al
      const randomTagNames = getRandomTags(2);
      const tags = await getOrCreateTags(randomTagNames);

      await prisma.post.create({
        data: {
          title,
          slug,
          content: `Bu içerik ${user.name} tarafından oluşturuldu.`,
          isPublished: Math.random() < 0.8,
          author: { connect: { id: user.id } },
          tags: {
            connect: tags.map((tag) => ({ id: tag.id })),
          },
        },
      });

      postCount++;
    }
  }

  console.log("🎉 Seed işlemi başarıyla tamamlandı.");
}

main()
  .catch((e) => {
    console.error("❌ Hata oluştu:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
