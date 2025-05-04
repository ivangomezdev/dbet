import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import { User } from "@/models/user";
import { getAuthenticatedUser } from "@/lib/auth"; // Asegúrate de que esta función valida el token

export async function GET(request) {
  try {
    // Intentar obtener la sesión de NextAuth
    const session = await getSession({ req: { headers: request.headers } });

    // Si no hay sesión, validar el token de la cookie
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

    // Contar los usuarios invitados (aquellos con referred_by igual al ID del usuario)
    const invitedUsers = await User.count({
      where: { referred_by: userRecord.id },
    });

    return NextResponse.json({
      referralCode: userRecord.referral_code,
      hasUsedReferral: userRecord.has_used_referral,
      invitedUsers,
    });
  } catch (error) {
    console.error("Error in /api/referrals/status:", error);
    return NextResponse.json(
      { error: "Error fetching referral status", details: error.message },
      { status: 500 }
    );
  }
}