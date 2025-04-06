import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getAuthenticatedUser } from "@/lib/auth"; // Importamos la función unificada
import { User } from "@/models/user";
import { Subscription } from "@/models/subscription";

export async function POST(request) {
  try {
    console.log("Iniciando POST /api/create-checkout-session");

    // Sincronizar modelos (si es necesario, aunque podrías mover esto a un inicio global)
    await User.sync({ alter: true });
    await Subscription.sync({ alter: true });

    // Obtener el usuario autenticado (soporta NextAuth y JOSE)
    const user = await getAuthenticatedUser(request);
    console.log("Usuario autenticado:", user);

    if (!user || !user.id) {
      return NextResponse.json({ error: "No autenticado o usuario no encontrado" }, { status: 401 });
    }

    const body = await request.json();
    const { planName } = body;
    console.log("Plan seleccionado:", planName);

    let priceId;
    let subscriptionStatus;

    if (planName === "PREMIUM MENSUAL") {
      priceId = "price_1R8B1qQO2yiuJACCAZYkd1tn"; // Tu Price ID real
      subscriptionStatus = "MONTHLY";
    } else if (planName === "PREMIUM ANUAL") {
      priceId = "price_1R8B1qQO2yiuJACCAZYkd1tn"; // Tu Price ID real (parece que usaste el mismo, ajusta si es diferente)
      subscriptionStatus = "YEAR";
    } else {
      return NextResponse.json({ error: "Plan no válido" }, { status: 400 });
    }
    console.log("Price ID:", priceId);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${request.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/failed?session_id={CHECKOUT_SESSION_ID}`,
      metadata: { userId: user.id.toString(), planName, subscriptionStatus },
    });
    console.log("Sesión de Stripe creada:", session.id);

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error en /api/create-checkout-session:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}