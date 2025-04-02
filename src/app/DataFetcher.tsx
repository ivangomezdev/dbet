"use client";

import { useAtom } from "jotai";
import { useEffect } from "react";
import {
  tournamentsDataAtom,
  oddsDataAtom,
  loadingAtom,
  errorAtom,
  TournamentResponse,
  OddsResponse,
  Event,
} from "../lib/atom";

export default function DataFetcher() {
  const [tournamentsData, setTournamentsData] = useAtom(tournamentsDataAtom);
  const [oddsData, setOddsData] = useAtom(oddsDataAtom);
  const [, setLoading] = useAtom(loadingAtom);
  const [, setError] = useAtom(errorAtom);

  const tournamentIds: number[] = [
    1024, 155, 325, 18, 24, 34, 35, 679, 7, 480, 384, 498, 132,
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Paso 1: Obtener datos de los torneos desde la API interna
        console.log("Iniciando peticiones para tournamentIds:", tournamentIds);
        const tournamentPromises: Promise<TournamentResponse>[] = tournamentIds.map(
          async (id: number) => {
            const url = `/api/tournaments/${id}`;
            console.log(`Solicitando datos para tournamentId: ${id}`);
            const response = await fetch(url);
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || `Error en tournamentId ${id}`);
            }
            const data: TournamentResponse = await response.json();
            console.log(`Datos recibidos para tournamentId ${id}:`, data);

            // Actualizar torneos incrementalmente
            setTournamentsData((prev) => {
              const updated = [...prev.filter((t) => t.categoryName !== data.categoryName), data];
              return updated;
            });

            return data;
          }
        );

        const tournamentsResults: TournamentResponse[] = await Promise.all(tournamentPromises);
        console.log("Todos los datos de torneos cargados:", tournamentsResults);

        // Paso 2: Extraer eventIds y obtener odds desde la API interna
        const eventIds: string[] = tournamentsResults
          .flatMap((result) => Object.values(result.events || {}))
          .map((event) => event.eventId);
        console.log("EventIds extraídos:", eventIds);

        const oddsPromises: Promise<{ eventId: string; odds: OddsResponse }>[] = eventIds.map(
          async (eventId: string) => {
            const url = `/api/odds/${eventId}`;
            console.log(`Solicitando odds para eventId: ${eventId}`);
            const response = await fetch(url);
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || `Error en eventId ${eventId}`);
            }
            const data: OddsResponse = await response.json();
            console.log(`Odds recibidas para eventId ${eventId}:`, data);

            // Actualizar odds incrementalmente
            setOddsData((prev) => ({
              ...prev,
              [eventId]: data,
            }));

            return { eventId, odds: data };
          }
        );

        const oddsResults: { eventId: string; odds: OddsResponse }[] = await Promise.all(
          oddsPromises
        );
        console.log("Todas las odds cargadas:", oddsData);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Error desconocido";
        console.error("Error en la carga de datos:", error);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setTournamentsData, setOddsData, setLoading, setError]);

  return null; // Este componente no renderiza nada
}