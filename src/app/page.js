"use client";

import { useState } from "react";

export default function Home() {
  const [blogContent, setBlogContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateClick = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: "Blog yazısı hakkında bir açıklama." }), // Burada prompt'u kullanıcıdan alabilirsiniz
      });

      const data = await response.json();

      if (data.content) {
        setBlogContent(data.content);
      } else {
        setBlogContent("Bir hata oluştu.");
      }
    } catch (error) {
      console.error("Hata:", error);
      setBlogContent("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleGenerateClick} disabled={loading}>
        {loading ? "Yükleniyor..." : "Blog Yazısını Oluştur"}
      </button>
      <div>{blogContent}</div>
    </div>
  );
}
