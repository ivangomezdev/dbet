// src/app/controllers/meControllers.ts
import { User } from "@/models/user";

// Define una interfaz para los datos del usuario
interface UserData {
  email: string;
  name?: string;
  surname?: string;
  phone?: string;
  address?: string;
  subscriptionStatus?: "FREE" | "MONTHLY" | "YEAR" | "inactive"  ;
}

type UserPlan = {
  plan: "FREE" | "MONTHLY" | "YEAR" | "inactive";
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
  )
};

export const editSubscription = async (data: UserData, plan: UserPlan) => {
  console.log(plan.plan,"ESTA ES LA DATA");
  
  await User.update(
    {
      subscriptionStatus: plan.plan, // Extraer el valor de plan
    },
    {
      where: { email: data.email },
    }
  );
};