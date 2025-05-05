import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getAuthenticatedUser } from "@/lib/auth";
import { User } from "@/models/user";
import { Subscription } from "@/models/subscription";

export async function POST(request) {
  try {
    console.log("Iniciando POST /api/create-checkout-session");

    // Sincronizar modelos
    await User.sync({ alter: true });
    await Subscription.sync({ alter: true });

    // Validar autenticación
    const user = await getAuthenticatedUser(request);
    if (!user || !user.id) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    // Obtener planName del cuerpo de la solicitud
    const body = await request.json();
    const { planName } = body;

    // Configurar priceId y subscriptionStatus según el plan
    let priceId;
    let subscriptionStatus;

    if (planName === "PREMIUM MENSUAL") {
      priceId = "price_1RKQoZDlBkPgK5IT6DFCy96s";
      subscriptionStatus = "MONTHLY";
    } else if (planName === "PREMIUM ANUAL") {
      priceId = "price_1RKQooDlBkPgK5ITFyTS0NSd";
      subscriptionStatus = "YEAR";
    } else {
      return NextResponse.json({ error: "Plan no válido" }, { status: 400 });
    }

    // Verificar si el usuario ha usado un código de referido
    let couponId = null;
    const userRecord = await User.findOne({ where: { id: user.id } });
    if (userRecord.has_used_referral && userRecord.referred_by) {
      couponId = "kgoT2Uad"; // Usar el cupón preexistente de Stripe
    }

    // Crear la sesión de Checkout en Stripe
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${request.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/failed?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        userId: user.id.toString(),
        planName,
        subscriptionStatus,
      },
      ...(couponId && { discounts: [{ coupon: couponId }] }),
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error en /api/create-checkout-session:", error);
    return NextResponse.json(
      { error: "Error interno", details: error.message },
      { status: 500 }
    );
  }
}