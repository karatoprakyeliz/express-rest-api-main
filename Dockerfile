
# Dockerfile

# 1. Temel image
FROM node:18

# 2. Çalışma dizini
WORKDIR /app

# 3. package.json ve lock dosyasını kopyala
COPY package*.json ./

# 4. Prisma klasörünü de dahil et
COPY prisma ./prisma

# 5. Bağımlılıkları kur
RUN npm install

# 6. Tüm proje dosyalarını kopyala
COPY . .

# 7. Uygulamayı başlat
CMD ["npm", "run", "dev"]
