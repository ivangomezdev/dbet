"use client";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import UserBono from "@/components/UserBono";

import { getBonosRecurrentes } from "@/lib/contenful";
import "../bonos.css";

import { useEffect, useState } from "react";

import Loaders from "../../../components/Loaders.jsx"
const Page = () => {
  const [bonosData, setBonosData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);





  // Efecto para obtener los bonos
  useEffect(() => {
    const fetchBonos = async () => {
      try {
        setIsLoading(true);
        const data = await getBonosRecurrentes();
        setBonosData(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching bonos:", err);
        setError("No se pudieron cargar los bonos");
        setIsLoading(false);
      }
    };

    fetchBonos();
  }, []);

  if (isLoading) return <Loaders/>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="bonos__content">
        <UserBono bonosData={bonosData} />
      
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Page;