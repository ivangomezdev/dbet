import { User } from "@/models/user";
import { Subscription } from "@/models/subscription";

// Define una interfaz para los datos del usuario
interface UserData {
  email: string;
  name?: string;
  surname?: string;
  phone?: string;
  address?: string;
  plan?: "FREE" | "MONTHLY" | "YEAR" | "inactive";
  stripeSubscriptionId?: string;
}

export const editUser = async (data: UserData) => {
  const { name, surname, email, phone, address } = data;
  try {
    const [_, [updatedUser]] = await User.update(
      { name, surname, email, phone, address },
      { where: { email }, returning: true }
    );
    console.log("User updated:", { email, name, surname, phone, address });
    return updatedUser;
  } catch (error) {
    console.error("Error in editUser:", {
      message: error.message,
      stack: error.stack,
    });
    throw error;
  }
};

export const editSubscription = async (data: UserData) => {
  const { email, plan, stripeSubscriptionId } = data;

  console.log("editSubscription called with:", { email, plan, stripeSubscriptionId });

  // Validar plan
  if (!plan) {
    console.error("No plan provided for email:", email);
    throw new Error("Plan is required");
  }

  const validPlans = ["FREE", "MONTHLY", "YEAR", "inactive"];
  if (!validPlans.includes(plan)) {
    console.error(`Invalid plan: ${plan} for email: ${email}`);
    throw new Error(`Invalid plan: ${plan}. Must be one of ${validPlans.join(", ")}`);
  }

  // Mapear los valores de plan a los esperados por Subscription
  const planMap = {
    FREE: "basic",
    MONTHLY: "premium",
    YEAR: "pro",
    inactive: "basic",
  };

  const subscriptionPlan = planMap[plan] || "basic";
  const subscriptionStatus = plan === "inactive" ? "inactive" : "active";

  // Buscar el usuario
  let user;
  try {
    user = await User.findOne({ where: { email } });
    if (!user) {
      console.error(`No user found with email: ${email}`);
      throw new Error(`No user found with email: ${email}`);
    }
    console.log("User found:", { id: user.id, email: user.email });
  } catch (error) {
    console.error("Error finding user:", {
      message: error.message,
      stack: error.stack,
    });
    throw error;
  }

  // Crear o actualizar la suscripción
  let subscription;
  try {
    subscription = await Subscription.findOne({
      where: { userId: user.id },
    });

    const currentDate = new Date();
    const endDate = new Date(currentDate);
    if (subscriptionPlan === "premium") {
      endDate.setMonth(currentDate.getMonth() + 1);
    } else if (subscriptionPlan === "pro") {
      endDate.setFullYear(currentDate.getFullYear() + 1);
    }

    if (subscription) {
      await subscription.update({
        plan: subscriptionPlan,
        status: subscriptionStatus,
        startDate: currentDate,
        endDate: subscriptionPlan === "basic" ? null : endDate,
        stripeSubscriptionId: stripeSubscriptionId || subscription.stripeSubscriptionId,
      });
      console.log("Subscription updated:", {
        userId: user.id,
        plan: subscriptionPlan,
        status: subscriptionStatus,
        stripeSubscriptionId,
      });
    } else {
      subscription = await Subscription.create({
        userId: user.id,
        plan: subscriptionPlan,
        status: subscriptionStatus,
        startDate: currentDate,
        endDate: subscriptionPlan === "basic" ? null : endDate,
        stripeSubscriptionId,
      });
      console.log("Subscription created:", {
        userId: user.id,
        plan: subscriptionPlan,
        status: subscriptionStatus,
        stripeSubscriptionId,
      });
    }
  } catch (error) {
    console.error("Error updating/creating subscription:", {
      message: error.message,
      stack: error.stack,
    });
    throw error;
  }

  // Actualizar User.subscriptionStatus
  try {
    const [affectedRows] = await User.update(
      { subscriptionStatus: plan },
      { where: { email } }
    );
    if (affectedRows === 0) {
      console.warn(`No rows updated for User.subscriptionStatus with email: ${email}`);
    } else {
      console.log(`User.subscriptionStatus updated to: ${plan} for email: ${email}`);
    }
  } catch (error) {
    console.error("Error updating User.subscriptionStatus:", {
      message: error.message,
      stack: error.stack,
    });
    throw error;
  }

  // Verificar el estado final
  try {
    const updatedUser = await User.findOne({ where: { email } });
    const updatedSubscription = await Subscription.findOne({ where: { userId: user.id } });
    console.log("Final state after editSubscription:", {
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        subscriptionStatus: updatedUser.subscriptionStatus,
      },
      subscription: updatedSubscription
        ? {
            plan: updatedSubscription.plan,
            status: updatedSubscription.status,
            stripeSubscriptionId: updatedSubscription.stripeSubscriptionId,
          }
        : "No subscription found",
    });
  } catch (error) {
    console.error("Error verifying final state:", {
      message: error.message,
      stack: error.stack,
    });
  }
};