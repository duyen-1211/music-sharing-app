import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useRef } from 'react';
import './App.css';

// Import các components
import UploadForm from './components/UploadForm';
import FileList from './components/FileList';
import SharePage from './components/SharePage'; // 👉 Import trang Share mới tạo

// --- Tách giao diện Trang Chủ ra thành component riêng ---
const HomePage = () => {
  const fileListRef = useRef();

  return (
    <div className="App">
       {/* Tiêu đề với màu Gradient Pastel */}
       <h1 style={{
         textAlign:'center', 
         background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
         WebkitBackgroundClip: 'text',
         WebkitTextFillColor: 'transparent',
         fontSize: '2.5rem',
         fontWeight: '800'
       }}>
         Music Sharing App
       </h1>

       <UploadForm onUploadSuccess={() => fileListRef.current.fetchFiles()} />
       
       <FileList ref={fileListRef} />
    </div>
  );
};

// --- App Chính chứa Router ---
function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Đường dẫn gốc (Trang chủ): Hiển thị Upload + Danh sách */}
        <Route path="/" element={<HomePage />} />
        
        {/* 2. Đường dẫn chia sẻ (Share Page): Hiển thị giao diện nghe nhạc riêng */}
        {/* :id là tham số động, ví dụ /share/656abc... */}
        <Route path="/share/:id" element={<SharePage />} />
      </Routes>
    </Router>
  );
}

export default App;