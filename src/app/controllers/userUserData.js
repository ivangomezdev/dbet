import { useEffect } from "react";
import { useSession } from "next-auth/react"; // Para obtener la sesión en el cliente

export const setUserData = async (token, setUser) => {
  try {
    const response = await fetch("/api/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }), // Solo añade el header si hay token
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener datos del usuario");
    }

    const data = await response.json();

    
    const dataForUser = data.userData.user;
    console.log("Datos recibidos de /api/me:", data);
    setUser(data);
  } catch (err) {
    console.log("Error en GET /me:", err);
    throw err;
  }
};

function useUserData(cookie, setUser, router) {
  const { data: session, status } = useSession(); // Obtener la sesión de NextAuth

  useEffect(() => {
    const fetchUserData = async () => {
      // Si hay token JOSE en la cookie, usarlo
      if (cookie?.token) {
        await setUserData(cookie.token, setUser);
      }
      // Si no hay token pero hay sesión de NextAuth, usar los datos de la sesión
      else if (status === "authenticated" && session?.user) {
        console.log("Usando datos de la sesión de NextAuth:", session.user);
        setUser(session.user);
      }
    };

    fetchUserData();
  }, [cookie?.token, session, status, setUser, router]);

  return status; // Opcional: puedes devolver el estado para usarlo en el componente
}

export default useUserData;