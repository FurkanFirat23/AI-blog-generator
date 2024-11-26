import { OpenAI } from "openai"; // 'openai' paketinden doğrudan OpenAI sınıfını içe aktaralım

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // .env dosyasındaki API anahtarını kullanıyoruz
});

export async function generateBlogContent(prompt) {
  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo", // GPT-3.5 Turbo modeli
    });

    return response.choices[0].message.content;
  } catch (error) {
    if (error.code === "insufficient_quota") {
      console.error("Quota limit reached. Please check your OpenAI plan.");
      throw new Error("Quota limit reached. Please check your OpenAI plan.");
    }
    console.error("OpenAI API error:", error);
    throw new Error("Content could not be generated.");
  }
}
