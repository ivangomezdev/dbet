import { NextResponse } from "next/server";
import { verify } from "jose";
import { User } from "@/models/user"; // Ajusta la ruta según tu proyecto
import { sequelize } from "@/lib/db"; // Ajusta la ruta según tu proyecto

export async function GET(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    // Verifica el token JOSE
    const secret = new TextEncoder().encode(process.env.JWT_SECRET); // Asegúrate de tener JWT_SECRET en tu .env
    const { payload } = await verify(token, secret);

    // Asume que el payload contiene el userId o email
    const user = await User.findOne({
      where: { id: payload.sub || payload.id }, // Ajusta según el campo en tu token
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Devuelve los datos del usuario
    return NextResponse.json({
      id: user.id,
      email: user.email,
      subscriptionStatus: user.subscriptionStatus,
      name: user.name,
      surname: user.surname,
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}