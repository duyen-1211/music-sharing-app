# 🎵 MERN Music Sharing App

> Ứng dụng chia sẻ nhạc chất lượng cao, giúp nhà sáng tạo nội dung và lập trình viên chia sẻ tệp âm thanh gốc mà không lo bị nén dung lượng như các ứng dụng nhắn tin.

![Project Banner](https://via.placeholder.com/1000x300?text=Music+Sharing+App+Preview) 
*(Bạn có thể thay link trên bằng ảnh chụp màn hình dự án của bạn)*

## 🌟 Giới thiệu

Dự án này là một ứng dụng Fullstack được xây dựng trên nền tảng **MERN Stack** (MongoDB, Express, React, Node.js). Ứng dụng giải quyết vấn đề chia sẻ file âm thanh lớn một cách bất tiện, cung cấp giao diện trực quan để tải lên, lưu trữ trên đám mây và chia sẻ đường dẫn tải xuống trực tiếp cho người dùng khác.

### Các tính năng chính:
* **☁️ Upload nhạc:** Tải file âm thanh (MP3, WAV, OGG) lên Cloudinary.
* **📂 Quản lý danh sách:** Hiển thị danh sách bài hát với thông tin chi tiết (Tên, dung lượng, lượt tải).
* **🎧 Nghe thử:** Trình phát nhạc (Audio Player) tích hợp sẵn.
* **⬇️ Tải xuống:** Tải file gốc về máy tính với cơ chế force download (không mở tab mới).
* **🔗 Chia sẻ (Share):** Tạo đường dẫn riêng biệt (`/share/:id`) để gửi cho bạn bè.
* **🗑️ Xóa file:** Xóa bài hát khỏi danh sách và xóa file gốc trên Cloudinary để giải phóng bộ nhớ.
* **🎨 Giao diện:** Thiết kế hiện đại với tông màu Pastel, Responsive trên Mobile.

---

## 🛠️ Công nghệ sử dụng

### Frontend (Client)
* **React (Vite):** Xây dựng giao diện người dùng nhanh chóng.
* **React Router DOM:** Quản lý điều hướng trang (Trang chủ & Trang chia sẻ).
* **CSS3:** Tùy biến giao diện (Style Pastel, Flexbox, Responsive).
* **FontAwesome:** Icon giao diện.

### Backend (Server)
* **Node.js & Express:** Xây dựng RESTful API.
* **MongoDB & Mongoose:** Cơ sở dữ liệu NoSQL lưu trữ metadata bài hát.
* **Multer:** Middleware xử lý upload file.
* **Cloudinary:** Lưu trữ và quản lý file media trên đám mây.

---

## ⚙️ Cài đặt và Chạy dự án (Local)

Để chạy dự án trên máy tính cá nhân, bạn cần cài đặt [Node.js](https://nodejs.org/) và [MongoDB](https://www.mongodb.com/).

### Bước 1: Clone dự án
```bash
git clone [https://github.com/username-cua-ban/music-sharing-app.git](https://github.com/username-cua-ban/music-sharing-app.git)
cd music-sharing-app
````

### Bước 2: Cấu hình Backend (Server)

1.  Di chuyển vào thư mục server:
    ```bash
    cd server
    ```
2.  Cài đặt thư viện:
    ```bash
    npm install
    ```
3.  Tạo file `.env` và điền thông tin (Lấy từ Cloudinary Dashboard & MongoDB Atlas):
    ```env
    PORT=5000
    MONGO_URI=mongodb://127.0.0.1:27017/musicDB
    CLOUDINARY_CLOUD_NAME=dien_ten_cloud_cua_ban
    CLOUDINARY_API_KEY=dien_api_key_cua_ban
    CLOUDINARY_API_SECRET=dien_api_secret_cua_ban
    ```
4.  Chạy Server:
    ```bash
    node server.js
    ```
    *Terminal báo: `🚀 Server running on port 5000` và `✅ MongoDB connected` là thành công.*

### Bước 3: Cấu hình Frontend (Client)

1.  Mở một terminal mới, di chuyển vào thư mục client:
    ```bash
    cd client
    ```
2.  Cài đặt thư viện:
    ```bash
    npm install
    ```
3.  Chạy ứng dụng React:
    ```bash
    npm run dev
    ```
4.  Truy cập trình duyệt tại địa chỉ: `http://localhost:5173`

-----

## 📡 Danh sách API (Endpoints)

Server cung cấp các API sau tại `http://localhost:5000`:

| Phương thức | Đường dẫn | Mô tả |
| :--- | :--- | :--- |
| **GET** | `/api/files` | Lấy danh sách tất cả bài hát. |
| **GET** | `/api/files/:id` | Lấy thông tin chi tiết 1 bài hát. |
| **POST** | `/api/upload` | Upload file nhạc mới (Key: `file`). |
| **GET** | `/api/download/:id` | Tải xuống file và tăng lượt tải. |
| **DELETE** | `/api/files/:id` | Xóa bài hát (DB + Cloudinary). |

-----

## 🚀 Hướng dẫn Triển khai (Deploy)

Để đưa ứng dụng lên internet (miễn phí), bạn nên sử dụng mô hình tách biệt:

1.  **Backend:** Deploy lên **Render.com**.
      * Nhớ thêm các biến môi trường (`Environment Variables`) từ file `.env` lên Render.
2.  **Frontend:** Deploy lên **Netlify** hoặc **Vercel**.
      * Trong code Frontend, thay thế `http://localhost:5000` bằng URL mới của Server trên Render.
      * Thêm file `_redirects` vào thư mục `public` để hỗ trợ React Router.
