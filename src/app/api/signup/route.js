import bcrypt from "bcrypt";
import prisma from "@/utils/prisma"; // Prisma Client'i buradan çağıracağız.

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // E-posta kontrolü
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "Email already registered." }),
        { status: 400 }
      );
    }

    // Şifreyi hash'le
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcı oluştur
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return new Response(
      JSON.stringify({ message: "User created successfully!", user }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error during signup:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred during signup." }),
      {
        status: 500,
      }
    );
  }
}
