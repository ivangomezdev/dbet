"use client";

import { useEffect, useState } from "react";
import "./userEditForm.css";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/atom";
import { GetServerSidePropsContext } from "next"; // Importamos el tipo
import Image from "next/image";

interface UserEditFormProps {
  initialData?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    phoneType?: string;
    organization?: string;
    department?: string;
    profileImage?: string;
    bannerImage?: string;
  };
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}

export default function UserEditForm({
  initialData = {},
  onSubmit = () => {},
  onCancel = () => {},
}: UserEditFormProps) {
  const [phoneType, setPhoneType] = useState(initialData.phoneType || "Mobile");
  const [showPhoneDropdown, setShowPhoneDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [cookie, _, removeCookie] = useCookies(["token"]);
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: user?.userId?.name || "",
    surname: user?.userId?.surname || "",
    email: user?.userId?.email || "",
    phone: user?.userId?.phone || "",
    address: user?.userId?.address || "",
  });

  useEffect(() => {
    if (user?.userId) {
      setFormData({
        name: user.userId.name || "",
        surname: user.userId.surname || "",
        email: user.userId.email || "",
        phone: user.userId.phone || "",
        address: user.userId.address || "",
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!cookie.token) {
        console.log("No token disponible, omitiendo solicitud a /me");
        return;
      }

      try {
        const response = await fetch("/api/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookie.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener datos del usuario");
        }

        const data = await response.json();
        const dataForUser = data.userData.user;
        setUser(dataForUser);
        console.log(data, "ESTA ES LA  DATA");
      } catch (err) {
        console.log("Error en GET /me:", err);
      }
    };

    if (!user) {
      fetchUserData();
    }
  }, [cookie.token, router, setUser, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    // Usa user.email si está disponible, ya que el input está disabled
    const email = user;
    console.log(email, "es el email");

    if (!email) {
      console.log("Error: No hay email disponible en user");
      return;
    }

    // Combinar los datos del formulario con el email de user
    const updatedData = {
      ...data,
      email: email.userId.email, // Asegura que email siempre esté presente
    };

    try {
      console.log("Datos enviados al backend:", updatedData); // Para depurar
      const response = await fetch("/api/me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log("Respuesta del backend:", result);
      onSubmit(updatedData);
      setIsEditing(false);
    } catch (err) {
      console.log("Error en el fetch:", err);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    onCancel();
  };

  const handleSession = () => {
    removeCookie("token", { path: "/" });
    console.log("Deslogueado correctamente");
    setUser(null); // Limpia el estado del usuario
    router.push("/auth/register");
  };

  console.log(_);

  return (
    <div className="user-edit-form">
      <div className="user-edit-form__header">
        <h2 className="user-edit-form__title">Tu información</h2>
        <button
          className="user-edit-form__close"
          onClick={handleSession}
          aria-label="Close"
        >
          Cerrar sesión
        </button>
      </div>

      <form className="user-edit-form__form" onSubmit={handleSubmit}>
        <div className="user-edit-form__banner">
          <div className="user-edit-form__profile-container">
            <div className="user-edit-form__profile">
              <Image
                src={
                  "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742308305/spain_xcufym.png"
                }
                alt="Profile"
                width={150}
                height={150}
                className="user-edit-form__profile-image"
              />
            </div>
          </div>
        </div>

        <div className="user-edit-form__fields">
          <div className="user-edit-form__field-group">
            <label className="user-edit-form__label">
              Nombre completo{" "}
              <span
                className="user-edit-form__info-icon"
                title="Your full name"
              >
                ℹ️
              </span>
            </label>
            <div className="user-edit-form__name-fields">
              <input
                type="text"
                name="name"
                className="user-edit-form__input user-edit-form__input--half"
                defaultValue={formData.name || "Cargando..."}
                placeholder="First name"
                disabled={!isEditing}
              />
              <input
                type="text"
                name="surname"
                className="user-edit-form__input user-edit-form__input--half"
                defaultValue={formData.surname}
                placeholder="Last name"
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="user-edit-form__field-group">
            <label htmlFor="email" className="user-edit-form__label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="user-edit-form__input"
              value={user?.userId.email}
              placeholder="Email address"
              disabled
            />
          </div>

          <div className="user-edit-form__field-group">
            <label htmlFor="phone" className="user-edit-form__label">
              Teléfono (Opcional)
            </label>
            <div className="user-edit-form__phone-container">
              <input
                type="tel"
                id="phone"
                name="phone"
                className="user-edit-form__input user-edit-form__input--phone"
                defaultValue={formData.phone}
                placeholder="Phone number"
                disabled={!isEditing}
              />
              <div className="user-edit-form__dropdown">
                <button
                  type="button"
                  className="user-edit-form__dropdown-toggle"
                  onClick={() => setShowPhoneDropdown(!showPhoneDropdown)}
                  disabled={!isEditing}
                >
                  {phoneType}{" "}
                  <span className="user-edit-form__dropdown-arrow">▼</span>
                </button>
                {showPhoneDropdown && (
                  <div className="user-edit-form__dropdown-menu">
                    <button
                      type="button"
                      className="user-edit-form__dropdown-item"
                      onClick={() => {
                        setPhoneType("Mobile");
                        setShowPhoneDropdown(false);
                      }}
                    >
                      Celular
                    </button>
                    <button
                      type="button"
                      className="user-edit-form__dropdown-item"
                      onClick={() => {
                        setPhoneType("Work");
                        setShowPhoneDropdown(false);
                      }}
                    >
                      Trabajo
                    </button>
                    <button
                      type="button"
                      className="user-edit-form__dropdown-item"
                      onClick={() => {
                        setPhoneType("Home");
                        setShowPhoneDropdown(false);
                      }}
                    >
                      Casa
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="user-edit-form__field-group">
            <label htmlFor="organization" className="user-edit-form__label">
              Dirección
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="user-edit-form__input"
              defaultValue={formData.address}
              placeholder="Organization"
              disabled={!isEditing}
            />
          </div>

          <div className="user-edit-form__actions">
            <button
              type="submit"
              className="user-edit-form__button user-edit-form__button--primary"
            >
              {isEditing ? "Guardar Cambios" : "Editar"}
            </button>
            {isEditing && (
              <button
                type="button"
                className="user-edit-form__button user-edit-form__button--secondary"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

// Agregar SSR con tipado explícito
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const token = req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: "/auth/register",
        permanent: false,
      },
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener datos del usuario");
    }

    const data = await response.json();
    const userData = data.userData.user;

    return {
      props: {
        initialData: {
          email: userData.email,
          firstName: userData.name || "Ella",
          lastName: userData.surname || "Lauda",
          phone: userData.phone || "+1(609) 972-22-22",
          organization: userData.address || "Htmlstream",
        },
      },
    };
  } catch (err) {
    console.log("Error en SSR:", err);
    return {
      redirect: {
        destination: "/auth/register",
        permanent: false,
      },
    };
  }
}
