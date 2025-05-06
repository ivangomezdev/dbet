"use client";
import NavBar from "@/components/HeroNavBar";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./forYou.css";
import Footer from "../../components/Footer"

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Enviando...");

    console.log("Sending form data:", formData); // Debug

    try {
      const response = await emailjs.send(
        "service_00zfxyb", // Tu Service ID
        "template_2m731gj", // Tu Template ID
        {
          from_name: formData.name,
          username: formData.username,
          from_email: formData.email,
          message: formData.message,
        },
        "wCdowsq3Gd-v3MDME" // Tu Public Key
      );

      console.log("EmailJS response:", response); // Debug
      setStatus("¡Mensaje enviado con éxito!");
      setFormData({ name: "", username: "", email: "", message: "" });
    } catch (error) {
      console.error("Email send error:", error);
      setStatus("Error al enviar el mensaje");
    }
  };

  return (
    <div className="container">
      <NavBar />
      <h1 className="forYou__title">Hacemos el MatchBetting por tí</h1>
      <p className="forYoy__p">
        ¿No sabes cómo realizar el MatchBetting? Déjanos un mensaje y un
        profesional se contactará contigo
      </p>
      <form onSubmit={handleSubmit}>
        <label className="forYou__label">
          Nombre:
          <input
            className="forYou__input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label className="forYou__label">
          Usuario:
          <input
            className="forYou__input"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <label className="forYou__label">
          Email:
          <input
            className="forYou__input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label className="forYou__label">
          Mensaje:
          <textarea
            className="forYou__textarea"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </label>
        <button className="forYou__button" type="submit">
          Quiero ser contactado
        </button>
      </form>
      {status && <p>{status}</p>}
      <Footer/>
    </div>
  );
};

export default Page;