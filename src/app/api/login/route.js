import bcrypt from "bcrypt";
import prisma from "@/utils/prisma";
import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key"; // Bunu .env dosyanıza ekleyin.

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Kullanıcıyı veritabanından bul
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password." }),
        { status: 401 }
      );
    }

    // Şifre kontrolü
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password." }),
        { status: 401 }
      );
    }

    // JWT oluştur
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return new Response(
      JSON.stringify({ message: "Login successful!", token }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred during login." }),
      {
        status: 500,
      }
    );
  }
}
