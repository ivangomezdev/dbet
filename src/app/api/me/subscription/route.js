import { editSubscription } from "@/app/controllers/meControllers";
import { getAuthenticatedUser } from "@/lib/auth";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await User.sync({ alter: true });
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const body = await request.json();
    await editSubscription({ ...body, email: user.email });
    return NextResponse.json({ message: "Edit OK" });
  } catch (error) {
    console.error("Error en la ruta /api/me/subscription:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}