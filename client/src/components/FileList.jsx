import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import './FileList.css';

const FileList = forwardRef((props, ref) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- Lấy danh sách file ---
  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://music-sharing-app-kw03.onrender.com/api/files"); 
      if (!res.ok) throw new Error(`Lỗi server: ${res.status}`);
      const data = await res.json();
      setFiles(data);
    } catch (err) {
      console.error("Lỗi lấy danh sách:", err);
    }
    setLoading(false);
  };

  useImperativeHandle(ref, () => ({ fetchFiles }));
  useEffect(() => { fetchFiles(); }, []);

  // --- Hàm Download ---
  const handleDownload = async (id) => {
    try {
      const res = await fetch(`https://music-sharing-app-kw03.onrender.com/api/download/${id}`);
      const data = await res.json();
      window.open(data.downloadUrl, "_self");
      fetchFiles();
    } catch (err) { console.error(err); }
  };

  // --- Hàm Share (Đã sửa link) ---
  const handleCopyLink = (id) => {
    // Tạo link trỏ về trang chia sẻ của Frontend
    // Ví dụ: http://localhost:5173/share/6561f...
    const link = `${window.location.origin}/share/${id}`; 
    
    navigator.clipboard.writeText(link);
    alert(`✅ Đã copy link chia sẻ!\nLink: ${link}`);
  };

  // --- Hàm Xóa ---
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bài hát này không?")) return;

    try {
      const res = await fetch(`https://music-sharing-app-kw03.onrender.com/api/files/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert("🗑️ Đã xóa bài hát!");
        fetchFiles(); 
      } else {
        alert("❌ Lỗi khi xóa!");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối server");
    }
  };

  return (
    <div className="file-list">
      <h2>Danh sách bài hát</h2>
      {loading ? <p>Đang tải...</p> : (
        <ul>
          {files.map((file) => (
            <li key={file._id}>
              <div className="file-info">
                <strong>{file.originalName}</strong>
                <audio controls src={file.path} style={{marginTop:'5px'}}></audio>
                <small>Tải: {file.downloadCount}</small>
              </div>
              
              {/* Khu vực nút bấm: Share -> Tải -> Xóa */}
              <div style={{display:'flex', gap:'8px'}}>
                  <button onClick={() => handleCopyLink(file._id)}>Share 🔗</button>
                  <button onClick={() => handleDownload(file._id)}>Tải ⬇️</button>
                  
                  {/* Nút Xóa nằm cuối cùng như ý bạn */}
                  <button 
                    onClick={() => handleDelete(file._id)} 
                    className="btn-delete icon-btn"
                    title="Xóa bài hát"
                  >
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default FileList;