````markdown
# 📦 Perwatch Backend API

Bu proje, Perwatch için geliştirilmiş bir RESTful backend API'dir.  
Kullanıcı ve gönderi (post) yönetimi sağlar.  
Docker üzerinden container'larda çalışır, Prisma ile PostgreSQL veritabanı kullanır.

---

## 🚀 Özellikler

- Express.js REST API
- Prisma ORM ile PostgreSQL veritabanı
- Kullanıcı ve gönderi CRUD işlemleri
- Etiket sistemi (`Tag`)
- Docker ile hızlı kurulum
- Otomatik veri seedleme

---

## 🛠️ Kurulum

Aşağıdaki adımları takip ederek projeyi çalıştırabilirsiniz:

### 1. 🚨 Gereksinimler

Bilgisayarınızda aşağıdaki yazılımların kurulu olması gerekir:

- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

---

### 2. 💾 Projeyi Klonlayın

```bash
git clone https://github.com/kullaniciadi/perwatch-backend.git
cd perwatch-backend
```
````

---

### 3. ⚙️ Ortam Değişkenlerini Ayarlayın

`.env` dosyasını oluşturun:

```bash
cp .env.example .env
```

> `.env` dosyasında varsayılan olarak aşağıdakiler olmalı:

```
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@db:5432/perwatch
```

---

### 4. 🐳 Docker ile Projeyi Başlatın

```bash
docker-compose up --build
```

Bu komut:

- PostgreSQL servisinin çalışmasını sağlar.
- Express API container’ını başlatır.
- Prisma migrasyonlarını çalıştırır (`npx prisma migrate deploy`)
- Seed verilerini otomatik olarak yükler (`npx prisma db seed`)

## 📮 API Uç Noktaları

### 🔹 User Endpoints

| Method | Endpoint         | Açıklama                   |
| ------ | ---------------- | -------------------------- |
| GET    | `/api/users`     | Tüm kullanıcıları getir    |
| GET    | `/api/users/:id` | ID’ye göre kullanıcı getir |
| POST   | `/api/users`     | Yeni kullanıcı oluştur     |
| PUT    | `/api/users/:id` | Kullanıcı güncelle         |
| DELETE | `/api/users/:id` | Kullanıcı sil              |

---

### 🔸 Post Endpoints

| Method | Endpoint                  | Açıklama                           |
| ------ | ------------------------- | ---------------------------------- |
| GET    | `/api/posts`              | Tüm gönderileri getir              |
| GET    | `/api/posts/:id`          | Gönderiyi ID ile getir             |
| GET    | `/api/posts/user/:userId` | Belirli kullanıcıya ait gönderiler |
| GET    | `/api/posts/tag/:tagName` | Etikete göre gönderiler            |
| POST   | `/api/posts`              | Yeni gönderi oluştur               |
| PUT    | `/api/posts/:id`          | Gönderiyi güncelle                 |
| DELETE | `/api/posts/:id`          | Gönderiyi sil                      |

---

## 🧪 API'yi Test Etmek

API’yi Postman veya benzeri API test araçları ile kolayca test edebilirsiniz.  
Projede tüm CRUD (Create, Read, Update, Delete) işlemleri için gerekli HTTP istekleri mevcuttur.  
Postman koleksiyonunu kullanarak bu istekleri hızlıca çalıştırabilir ve API fonksiyonlarını deneyebilirsiniz. 

Proje, kullanıcı ve gönderi için tam CRUD işlemlerini destekler:

- Yeni veri oluşturma (POST)
- Veri okuma (GET)
- Güncelleme (PUT)
- Silme (DELETE)

Postman koleksiyonu ile tüm bu istekleri kolayca deneyebilirsiniz.
Base URL: `http://localhost:3000/api`

---

## 📂 Proje Yapısı

```
.
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── config/
│   └── index.js
├── docker-compose.yml
├── .env
├── package.json
└── README.md
```

---


## 👨‍💻 Geliştirici

> Developer: Yeliz Karatoprak

```

---
```
