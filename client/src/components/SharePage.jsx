import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './FileList.css'; // Tận dụng lại CSS cũ cho đẹp

const SharePage = () => {
  const { id } = useParams(); // Lấy ID từ đường dẫn URL
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        // Gọi API lấy thông tin chi tiết 1 bài hát
        const res = await fetch(`http://localhost:5000/api/files/${id}`);
        if (!res.ok) throw new Error("Không tìm thấy file");
        const data = await res.json();
        setFile(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchFile();
  }, [id]);

  const handleDownload = () => {
    window.open(`http://localhost:5000/api/download/${id}`, "_self");
  };

  if (loading) return <p style={{textAlign:'center', marginTop:'50px'}}>⏳ Đang tải thông tin bài hát...</p>;
  if (error || !file) return <p style={{textAlign:'center', marginTop:'50px', color:'red'}}>❌ Link bị lỗi hoặc bài hát đã bị xóa!</p>;

  return (
    <div className="App" style={{display:'flex', justifyContent:'center', marginTop:'50px'}}>
      <div className="file-list" style={{width: '100%', maxWidth:'500px'}}>
        <h2 style={{textAlign:'center'}}>🎶 Nhạc được chia sẻ với bạn</h2>
        
        <div style={{
            background: '#fff', 
            padding: '30px', 
            borderRadius: '20px', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
        }}>
            <h3 style={{color: '#5d576b', marginBottom:'15px'}}>{file.originalName}</h3>
            
            <div style={{fontSize:'50px', marginBottom:'20px'}}>💿</div>

            <audio controls src={file.path} style={{width:'100%', marginBottom:'20px'}}></audio>
            
            <p style={{color:'#999', fontSize:'0.9rem'}}>
                Dung lượng: {(file.size/1024/1024).toFixed(2)} MB <br/>
                Lượt tải: {file.downloadCount}
            </p>

            <button 
                onClick={handleDownload}
                style={{
                    marginTop: '20px',
                    width: '100%',
                    padding: '15px',
                    border: 'none',
                    borderRadius: '50px',
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    color: 'white',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 5px 15px rgba(0, 242, 254, 0.4)'
                }}
            >
                Tải Xuống Ngay ⬇️
            </button>

            <a href="/" style={{display:'block', marginTop:'20px', color:'#555', textDecoration:'none'}}>
                ← Quay về trang chủ
            </a>
        </div>
      </div>
    </div>
  );
};

export default SharePage;