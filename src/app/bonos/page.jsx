"use client";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import UserBono from "@/components/UserBono";
import { getBonos } from "@/lib/contenful";
import "./bonos.css";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [bonosData, setBonosData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cookies] = useCookies(["token"]); 
  const router = useRouter();

  // Middleware para asegurar la ruta
  useEffect(() => {
    if (!cookies.token) {
      router.push("/auth/register");
    }
  }, [cookies.token, router]);

  // Efecto para obtener los bonos
  useEffect(() => {
    const fetchBonos = async () => {
      try {
        setIsLoading(true);
        const data = await getBonos();
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

  if (isLoading) return <div>Cargando...</div>;
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