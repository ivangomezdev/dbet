import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import { User } from "@/models/user";
import { getAuthenticatedUser } from "@/lib/auth";

export async function POST(request) {
  try {
    // Obtener el cuerpo de la solicitud
    const { referralCode } = await request.json();

    // Validar que se proporcionó un código de referido
    if (!referralCode) {
      return NextResponse.json(
        { error: "Referral code is required" },
        { status: 400 }
      );
    }

    // Intentar obtener la sesión de NextAuth
    const session = await getSession({ req: { headers: request.headers } });

    // Validar el token de la cookie si no hay sesión
    const user = await getAuthenticatedUser(request);
    if (!user && (!session || !session.user.email)) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Buscar el usuario por email (si usas sesión) o por ID (si usas token)
    const userRecord = await User.findOne({
      where: { email: session?.user.email || user.email },
    });

    if (!userRecord) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verificar si el usuario ya ha usado un código de referido
    if (userRecord.has_used_referral) {
      return NextResponse.json(
        { error: "You have already used a referral code" },
        { status: 400 }
      );
    }

    // Buscar el usuario que posee el código de referido
    const referredUser = await User.findOne({
      where: { referral_code: referralCode },
    });

    if (!referredUser) {
      return NextResponse.json(
        { error: "Referral code not found" },
        { status: 404 }
      );
    }

    // Evitar que el usuario use su propio código
    if (referredUser.id === userRecord.id) {
      return NextResponse.json(
        { error: "Cannot use your own referral code" },
        { status: 400 }
      );
    }

    // Aplicar el código de referido
    await userRecord.update({
      has_used_referral: true,
      referred_by: referredUser.id,
    });

    return NextResponse.json({
      message: "Referral code applied successfully",
    });
  } catch (error) {
    console.error("Error in /api/referrals/apply:", error);
    return NextResponse.json(
      {
        error: "Error applying referral code",
        details: error.message,
      },
      { status: 500 }
    );
  }
}