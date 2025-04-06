"use client";
import { useEffect, useState } from "react";
import "./userEditForm.css";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/atom";
import useUserData from "../app/controllers/userUserData";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function UserEditForm({
  initialData = {},
  onSubmit = () => {},
  onCancel = () => {},
}) {
  const [phoneType, setPhoneType] = useState(initialData.phoneType || "Mobile");
  const [showPhoneDropdown, setShowPhoneDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cookie, _, removeCookie] = useCookies(["token"]);
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    address: "",
  });

  console.log(_);

  const [initialFormData, setInitialFormData] = useState(formData);

  useUserData(cookie, setUser, router);

  useEffect(() => {
    if (user) {
      console.log("Actualizando formData con:", user);
      const newData = {
        name: user.name || "",
        surname: user.surname || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      };
      setFormData(newData);
      setInitialFormData(newData);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    setIsLoading(true);

    const updatedData = {
      ...formData,
      email: user?.email || formData.email,
    };

    try {
      console.log("Datos enviados al backend:", updatedData);
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
      setInitialFormData(updatedData);
      setIsEditing(false);
    } catch (err) {
      console.log("Error en el fetch:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setIsEditing(false);
    onCancel();
  };

  const handleSession = () => {
    removeCookie("token", { path: "/" });
    signOut({ callbackUrl: "/auth/register" });
    console.log("Deslogueado correctamente");
    setUser(null);
    router.push("/auth/register");
  };

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
          <p className="user-edit-form__plan">
            PLAN <span>{user?.subscriptionStatus || "Cargando..."}</span>
          </p>
          <div className="user-edit-form__profile-container">
            <div className="user-edit-form__profile">
              <Image
                src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1742308305/spain_xcufym.png"
                alt="Profile"
                width={150}
                height={150}
                className="user-edit-form__profile-image"
              />
            </div>
          </div>
        </div>
        <Link style={{ textDecoration: "none" }} href="/changePlan">
          <p className="user-edit-form__planUpgrade">Mejorar plan</p>
        </Link>
        <div className="user-edit-form__fields">
          <div className="user-edit-form__field-group">
            <label className="user-edit-form__label">
              Nombre completo{" "}
              <span className="user-edit-form__info-icon" title="Your full name"></span>
            </label>
            <div className="user-edit-form__name-fields">
              <input
                type="text"
                name="name"
                className="user-edit-form__input user-edit-form__input--half"
                value={formData.name || "Cargando..."}
                onChange={handleInputChange}
                placeholder="First name"
                disabled={!isEditing}
              />
              <input
                type="text"
                name="surname"
                className="user-edit-form__input user-edit-form__input--half"
                value={formData.surname || "Cargando..."}
                onChange={handleInputChange}
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
              value={formData.email || "Cargando..."}
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
                value={formData.phone || "Cargando..."}
                onChange={handleInputChange}
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
            <label htmlFor="address" className="user-edit-form__label">
              Dirección
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="user-edit-form__input"
              value={formData.address || "Cargando..."}
              onChange={handleInputChange}
              placeholder="Address"
              disabled={!isEditing}
            />
          </div>

          <div className="user-edit-form__actions">
            <div className="user-edit-form__button-container">
              <button
                type="submit"
                className="user-edit-form__button user-edit-form__button--primary"
                disabled={isLoading}
              >
                {isEditing ? "Guardar Cambios" : "Editar"}
              </button>
              {isLoading && (
                <span className="user-edit-form__loading-spinner"></span>
              )}
            </div>
            {isEditing && (
              <button
                type="button"
                className="user-edit-form__button user-edit-form__button--secondary"
                onClick={handleCancel}
                disabled={isLoading}
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
