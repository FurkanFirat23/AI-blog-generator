import { NextResponse } from "next/server";
import { generateBlogContent } from "@/utils/openai"; // OpenAI içerik üretme fonksiyonunu import ediyoruz

export async function POST(request) {
  try {
    const { prompt } = await request.json(); // Kullanıcıdan gelen prompt verisini alıyoruz

    if (!prompt) {
      return NextResponse.json({ error: "Prompt gerekli!" }, { status: 400 });
    }

    // Blog içeriğini OpenAI'den oluşturuyoruz
    const content = await generateBlogContent(prompt);

    return NextResponse.json({ content });
  } catch (error) {
    console.error("API Hatası:", error);
    return NextResponse.json(
      { error: "Blog içeriği oluşturulamadı." },
      { status: 500 }
    );
  }
}
