import React, { useState } from "react";

function App() {
  const [image, setImage] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);

    const fileExtension = file.name.split('.').pop();
    const newName = keyword.trim().toLowerCase().replace(/\s+/g, '-') + '.' + fileExtension;
    const renamedFile = new File([file], newName, { type: file.type });

    const reader = new FileReader();
    reader.onload = (e) => {
      const blob = new Blob([e.target.result], { type: file.type });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    };
    reader.readAsArrayBuffer(renamedFile);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>SEO Image Optimizer Tool</h1>
      <input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <br /><br />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <br /><br />
      {downloadUrl && (
        <a href={downloadUrl} download>
          <button>Download SEO Image</button>
        </a>
      )}
    </div>
  );
}

export default App;