import { useState } from "react";
import './UploadForm.css';

export default function UploadForm({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) return setMessage("Chưa chọn file");

    const allowedTypes = ["audio/mpeg", "audio/wav", "audio/ogg"];
    if (!allowedTypes.includes(file.type)) {
      return setMessage("Chỉ được phép upload file audio (mp3, wav, ogg)");
    }
    if (file.size > 20 * 1024 * 1024) return setMessage("File quá lớn (>20MB)");

    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();
    
    // --- SỬA Ở ĐÂY: GỌI TRỰC TIẾP SERVER ---
    xhr.open("POST", "http://localhost:5000/api/upload"); 

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        setMessage(`✅ Upload thành công!`);
        setProgress(0);
        setFile(null);
        if (onUploadSuccess) onUploadSuccess();
      } else {
        setMessage(`❌ Upload thất bại`);
      }
    };

    xhr.onerror = () => { setMessage("❌ Lỗi kết nối Server"); };
    xhr.send(formData);
  };

  return (
    <div className="upload-form">
      <h2>Upload nhạc</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept="audio/*" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
      {progress > 0 && <div className="progress-bar" style={{ width: `${progress}%`, height:'5px', background:'green', marginTop:'10px' }}></div>}
      {message && <p style={{marginTop:'10px'}}>{message}</p>}
    </div>
  );
}