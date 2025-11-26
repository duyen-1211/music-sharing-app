require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const File = require('./models/File');
const fs = require('fs');
const path = require('path');

const app = express();

// --- 1. Middleware ---
app.use(cors()); 
app.use(express.json());

// Log để kiểm tra yêu cầu tới server
app.use((req, res, next) => {
    console.log(`📡 Server nhận lệnh: ${req.method} ${req.url}`);
    next();
});

// --- 2. Cấu hình Cloudinary ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- 3. Cấu hình Multer ---
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}
const upload = multer({ dest: 'uploads/' });

// --- 4. Kết nối MongoDB ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// --- 5. CÁC ROUTES ---

// Route 1: Lấy danh sách
app.get('/api/files', async (req, res) => {
    try {
        const files = await File.find().sort({ createdAt: -1 });
        res.json(files);
    } catch (err) {
        res.status(500).json({ error: 'Lỗi server' });
    }
});

// Route 2: Upload
app.post('/api/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'Chưa chọn file' });

        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: 'video',
            folder: 'music-share-app'
        });

        const newFile = new File({
            originalName: req.file.originalname,
            path: result.secure_url,
            cloudinaryId: result.public_id,
            size: req.file.size
        });

        await newFile.save();
        fs.unlinkSync(req.file.path); 

        console.log("✅ Upload xong:", newFile.originalName);
        res.status(200).json({ fileId: newFile._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi upload file' });
    }
});

// Route 3: Download
app.get('/api/download/:id', async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) return res.status(404).json({ error: 'File không tồn tại' });

        file.downloadCount++;
        await file.save();

        const downloadUrl = file.path.replace('/upload/', '/upload/fl_attachment/');
        res.json({ downloadUrl });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi server' });
    }
});

// 👉 Route 4: Xóa File (ĐÂY LÀ ĐOẠN QUAN TRỌNG BẠN ĐANG THIẾU/LỖI)
app.delete('/api/files/:id', async (req, res) => {
    console.log("🗑️ Đang xử lý xóa ID:", req.params.id); // Log kiểm tra
    try {
        const file = await File.findById(req.params.id);
        if (!file) return res.status(404).json({ error: 'File không tồn tại trong DB' });

        // Xóa trên Cloudinary
        if (file.cloudinaryId) {
            await cloudinary.uploader.destroy(file.cloudinaryId, { resource_type: 'video' });
        }

        // Xóa trong MongoDB
        await File.findByIdAndDelete(req.params.id);

        console.log("✅ Đã xóa thành công!");
        res.json({ message: 'Đã xóa file' });
    } catch (error) {
        console.error("❌ Lỗi khi xóa:", error);
        res.status(500).json({ error: 'Lỗi server khi xóa' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));