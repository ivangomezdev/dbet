// src/app/controllers/meControllers.ts
import { User } from "@/models/user";

// Define una interfaz para los datos del usuario
interface UserData {
  email: string;
  name?: string;
  surname?: string;
  phone?: string;
  address?: string;
  plan?: "FREE" | "MONTHLY" | "YEAR" | "inactive";
}

export const editUser = async (data: UserData) => {
  await User.update(
    {
      name: data.name,
      surname: data.surname,
      phone: data.phone,
      address: data.address,
    },
    {
      where: { email: data.email },
    }
  );
};

export const editSubscription = async (data: UserData) => {
  await User.update(
    {
      subscriptionStatus: data.plan, // Extraer el valor de plan
    },
    {
      where: { email: data.email },
    }
  );
};
