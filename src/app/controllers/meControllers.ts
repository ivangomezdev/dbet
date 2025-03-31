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
// backend/controllers/meControllers.js

  const { name, surname, email, phone, address } = data;
  const [_, [updatedUser]] = await User.update(
    { name, surname, email, phone, address },
    { where: { email }, returning: true } // Devuelve el registro actualizado
  );
  return updatedUser;

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
