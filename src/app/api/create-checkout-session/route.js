import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getUserIdFromToken } from "@/lib/joseToken";
import { User } from "@/models/user";
import { Subscription } from "@/models/subscription";

export async function POST(request) {
  try {
    console.log("Iniciando POST /api/create-checkout-session");
    await User.sync({ alter: true });
    await Subscription.sync({ alter: true });

    const authHeader = request.headers.get("authorization");
    console.log("Authorization header recibido:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token extraído:", token);

    const tokenData = await getUserIdFromToken(token);
    console.log("Resultado de getUserIdFromToken:", tokenData);

    const user = tokenData?.userId;
    if (!user || !user.id) {
      return NextResponse.json({ error: "Invalid token or user not found" }, { status: 401 });
    }

    const body = await request.json();
    const { planName } = body;
    console.log("Plan seleccionado:", planName);

    let priceId;
    let subscriptionStatus;

    if (planName === "PREMIUM MENSUAL") {
      priceId = "price_1R8B1qQO2yiuJACCAZYkd1tn"; // Tu Price ID real de "PREMIUM MENSUAL"
      subscriptionStatus = "MONTHLY";
    } else if (planName === "PREMIUM ANUAL") {
      priceId = "price_1R8B1qQO2yiuJACCAZYkd1tn"; // Tu Price ID real de "PREMIUM ANUAL"
      subscriptionStatus = "YEAR";
    } else {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }
    console.log("Price ID:", priceId);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${request.headers.get("origin")}/me?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/choose-subscription`,
      metadata: { userId: user.id.toString(), planName, subscriptionStatus }, // Guardamos subscriptionStatus en metadata
    });
    console.log("Sesión de Stripe creada:", session.id);

    // NO actualizamos el usuario aquí, esperamos al webhook
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error en /api/create-checkout-session:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}