const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = 3000;


app.use(express.json());

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'], // ระบุ methods ที่อนุญาต (default: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'])
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']// ระบุ headers ที่อนุญาต
  };
app.use(cors(corsOptions)); 

app.post('/send-email', async (req, res) => {
    console.log('body==',req.body)
    const { email, message, name,subject } = req.body;

    // สร้าง transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jump7k@gmail.com',
            pass: 'nforkrvgpqaaqwzr'  // ใช้รหัสผ่านแอปพลิเคชัน
        }
    });

    // ตั้งค่าอีเมล
    let mailOptions = {
        from: name, 
        to: 'gfk.jkjkk@gmail.com',
        subject: subject,
        text: `${email} : ${message}`
    };
    console.log('mailOptions==',mailOptions)


    try {
        // ส่งอีเมล
        let info = await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent', info });
    } catch (error) {
        res.status(500).json({ message: 'Error sending email', error });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
