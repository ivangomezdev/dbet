"use client";

import { useState } from 'react';
import "./userEditForm.css";

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
  onCancel = () => {} 
}: UserEditFormProps) {
  const [activeTab] = useState('profile'); // Removed setActiveTab since we're only showing profile tab
  const [phoneType, setPhoneType] = useState(initialData.phoneType || 'Mobile');
  const [showPhoneDropdown, setShowPhoneDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // New state to track edit mode
console.log(activeTab);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing) {
      // If not in edit mode, switch to edit mode
      setIsEditing(true);
      return;
    }
    // If in edit mode, submit the form
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
    setIsEditing(false); // Return to view mode after submit
  };

  const handleCancel = () => {
    setIsEditing(false);
    onCancel();
  };

  return (
    <div className="user-edit-form">
      <div className="user-edit-form__header">
        <h2 className="user-edit-form__title">Tu información</h2>
        <button 
          className="user-edit-form__close" 
          onClick={handleCancel}
          aria-label="Close"
        >
          ×
        </button>
      </div>

      <form className="user-edit-form__form" onSubmit={handleSubmit}>
        <div className="user-edit-form__banner">
          <div className="user-edit-form__profile-container">
            <div className="user-edit-form__profile">
              <img 
                src={initialData.profileImage || "/placeholder.svg?height=100&width=100"} 
                alt="Profile" 
                className="user-edit-form__profile-image" 
              />
              <button 
                type="button" 
                className="user-edit-form__profile-edit" 
                aria-label="Edit profile picture"
                disabled={!isEditing}
              >
                ✏️
              </button>
            </div>
          </div>
        </div>

        <div className="user-edit-form__fields">
          <div className="user-edit-form__field-group">
            <label className="user-edit-form__label">
              Nombre completo <span className="user-edit-form__info-icon" title="Your full name">ℹ️</span>
            </label>
            <div className="user-edit-form__name-fields">
              <input 
                type="text" 
                name="firstName" 
                className="user-edit-form__input user-edit-form__input--half" 
                defaultValue={initialData.firstName || "Ella"}
                placeholder="First name"
                disabled={!isEditing}
              />
              <input 
                type="text" 
                name="lastName" 
                className="user-edit-form__input user-edit-form__input--half" 
                defaultValue={initialData.lastName || "Lauda"}
                placeholder="Last name"
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="user-edit-form__field-group">
            <label htmlFor="email" className="user-edit-form__label">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className="user-edit-form__input" 
              defaultValue={initialData.email || "ella@site.com"}
              placeholder="Email address"
              disabled // Email always disabled
            />
          </div>

          <div className="user-edit-form__field-group">
            <label htmlFor="phone" className="user-edit-form__label">Teléfono (Opcional)</label>
            <div className="user-edit-form__phone-container">
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                className="user-edit-form__input user-edit-form__input--phone" 
                defaultValue={initialData.phone || "+1(609) 972-22-22"}
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
                  {phoneType} <span className="user-edit-form__dropdown-arrow">▼</span>
                </button>
                {showPhoneDropdown && (
                  <div className="user-edit-form__dropdown-menu">
                    <button 
                      type="button" 
                      className="user-edit-form__dropdown-item"
                      onClick={() => {
                        setPhoneType('Mobile');
                        setShowPhoneDropdown(false);
                      }}
                    >
                      Celular
                    </button>
                    <button 
                      type="button" 
                      className="user-edit-form__dropdown-item"
                      onClick={() => {
                        setPhoneType('Work');
                        setShowPhoneDropdown(false);
                      }}
                    >
                      Trabajo
                    </button>
                    <button 
                      type="button" 
                      className="user-edit-form__dropdown-item"
                      onClick={() => {
                        setPhoneType('Home');
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
            <label htmlFor="organization" className="user-edit-form__label">Dirección</label>
            <input 
              type="text" 
              id="organization" 
              name="organization" 
              className="user-edit-form__input" 
              defaultValue={initialData.organization || "Htmlstream"}
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