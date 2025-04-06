import { editUser } from '@/app/controllers/meControllers';
import { getAuthenticatedUser } from '@/lib/auth'; // Asegúrate de que la ruta sea correcta
import { User } from '@/models/user';
import { NextResponse } from 'next/server';

export async function GET(request) {
  console.log("Iniciando solicitud GET a /api/me");
  try {
    console.log("Sincronizando modelo User");
    await User.sync({ alter: true });
    console.log("Obteniendo usuario autenticado");
    const user = await getAuthenticatedUser(request);
    console.log("Resultado de getAuthenticatedUser:", user);

    if (!user) {
      console.log("No se encontró usuario autenticado");
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    console.log("Usuario autenticado encontrado:", user);
    return NextResponse.json({ message: "Auth OK", userData: user });
  } catch (error) {
    console.error("Error completo en la ruta /api/me:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  console.log("Iniciando solicitud POST a /api/me");
  try {
    console.log("Sincronizando modelo User");
    await User.sync({ alter: true });
    console.log("Obteniendo usuario autenticado");
    const user = await getAuthenticatedUser(request);
    console.log("Resultado de getAuthenticatedUser:", user);

    if (!user) {
      console.log("No se encontró usuario autenticado");
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const body = await request.json();
    console.log("Cuerpo de la solicitud:", body);
    await editUser({ ...body, email: user.email });
    console.log("Usuario editado correctamente");
    return NextResponse.json({ message: "Edit OK" });
  } catch (error) {
    console.error("Error completo en la ruta /api/me (POST):", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}