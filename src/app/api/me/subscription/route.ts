import { editSubscription } from "@/app/controllers/meControllers";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await User.sync({ alter: true });
    const body = await request.json();
    editSubscription(body)
    return NextResponse.json({ message: "Edit OK" });
  } catch  {
    console.error("Error en la ruta /api/edit-user:" );
    return NextResponse.json( "Internal Server Error", { status: 500 });
  }
}