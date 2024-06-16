# ใช้ node image version 14 เป็น base image
FROM node:14

# สร้างไดเร็กทอรี app
WORKDIR /usr/src/app

# คัดลอกไฟล์ package.json และ package-lock.json ไปยังไดเร็กทอรี app
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์ project ทั้งหมดไปยังไดเร็กทอรี app
COPY . .

# ระบุพอร์ตที่จะ expose
EXPOSE 8080

# สั่งให้ Node.js รันไฟล์ index.js
CMD ["node", "index.js"]
