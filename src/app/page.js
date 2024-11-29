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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Blog Yazısı Oluşturucu
        </h1>
        <button
          onClick={handleGenerateClick}
          disabled={loading}
          className={`w-full px-4 py-2 text-white font-semibold rounded-lg ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Yükleniyor..." : "Blog Yazısını Oluştur"}
        </button>
        <div className="mt-6 p-4 bg-gray-50 rounded border border-gray-200 text-gray-700">
          {blogContent || "Henüz bir blog yazısı oluşturulmadı."}
        </div>
      </div>
    </div>
  );
}
