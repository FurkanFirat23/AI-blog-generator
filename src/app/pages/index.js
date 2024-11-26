import { useState } from "react";
import { generateBlogContent } from "../utils/openai";

export default function Home() {
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [blogContent, setBlogContent] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    const content = await generateBlogContent(keywords.split(","));
    setBlogContent(content);
    setLoading(false);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">AI Destekli Blog Oluşturucu</h1>
      <textarea
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        placeholder="Anahtar kelimeleri virgülle ayırarak yazın..."
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {loading ? "Oluşturuluyor..." : "Blog Yazısını Oluştur"}
      </button>
      {blogContent && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h2 className="text-xl font-semibold mb-2">
            Oluşturulan Blog Yazısı
          </h2>
          <p>{blogContent}</p>
        </div>
      )}
    </div>
  );
}
