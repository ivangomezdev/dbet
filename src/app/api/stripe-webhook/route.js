import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { User } from "@/models/user";
import { Subscription } from "@/models/subscription";

export async function POST(request) {
  const sig = request.headers.get("stripe-signature");
  const rawBody = await request.text();

  if (!sig) {
    return NextResponse.json({ error: "No signature provided" }, { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET // Añade esto a tu .env.local
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata.userId;
      const planName = session.metadata.planName;
      const subscriptionStatus = session.metadata.subscriptionStatus;

      console.log("Webhook recibido - checkout.session.completed:", { userId, planName, subscriptionStatus });

      // Actualizar el estado del usuario en la base de datos
      await User.update(
        { subscriptionStatus },
        { where: { id: userId } }
      );
      console.log("Usuario actualizado con subscriptionStatus:", subscriptionStatus);

      // Opcional: Crear un registro en la tabla Subscription
      await Subscription.create({
        userId,
        plan: subscriptionStatus === "MONTHLY" ? "premium" : "pro", // Ajusta según tus enums
        status: "active",
        startDate: new Date(),
        endDate: subscriptionStatus === "MONTHLY" 
          ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 días
          : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 año
      });
      console.log("Registro de suscripción creado para userId:", userId);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error en /api/stripe-webhook:", error);
    return NextResponse.json({ error: "Webhook error", details: error.message }, { status: 400 });
  }
}