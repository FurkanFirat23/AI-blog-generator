import bcrypt from "bcrypt";
import prisma from "@/utils/prisma"; // Prisma'yı entegre ettiğinizi varsayıyoruz.

export async function POST(request) {
  const { name, email, password } = await request.json();

  // Email'in zaten kayıtlı olup olmadığını kontrol et
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

  // Yeni kullanıcıyı kaydet
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
}
