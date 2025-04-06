import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { getToken } from "next-auth/jwt"; // Para obtener el token en el cliente

export const setUserData = async (token, setUser) => {
  try {
    const response = await fetch("/api/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener datos del usuario");
    }

    const data = await response.json();
    setUser(data.userData);
  } catch (err) {
    console.log("Error en GET /me:", err);
    throw err;
  }
};

// Nueva función para solicitudes autenticadas
export const editUserData = async (token, data) => {
  const response = await fetch("/api/me", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al editar datos");
  }

  return await response.json();
};

export const editSubscriptionData = async (token, data) => {
  const response = await fetch("/api/me/subscription", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al editar suscripción");
  }

  return await response.json();
};

function useUserData(cookie, setUser, router) {
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      if (cookie?.token) {
        await setUserData(cookie.token, setUser);
      } else if (status === "authenticated" && session?.user) {
        await setUserData(null, setUser); // NextAuth manejará la autenticación en el servidor
      }
    };

    fetchUserData();
  }, [cookie?.token, session, status, setUser, router]);

  return { status, session };
}

export default useUserData;