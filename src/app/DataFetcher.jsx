"use client";

import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import {
  tournamentsDataAtom,
  oddsDataAtom,
  loadingAtom,
  errorAtom,
} from "../lib/atom";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function DataFetcher() {
  const [, setTournamentsData] = useAtom(tournamentsDataAtom);
  const [, setOddsData] = useAtom(oddsDataAtom);
  const [, setLoading] = useAtom(loadingAtom);
  const [, setError] = useAtom(errorAtom);

  const hasFetched = useRef(false);

  const tournamentIds = [
    1024, 155, 325, 18, 24, 34, 35, 679, 7, 480, 384, 498, 132,
  ];

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchDataFromFirebase = async () => {
      setLoading(true);
      try {
        // Obtener torneos
        const tournamentsSnapshot = await getDocs(collection(db, "tournaments"));
        const tournamentsMap = {};
        tournamentsSnapshot.forEach((doc) => {
          const data = doc.data();
          const id = Number(doc.id);
          if (tournamentIds.includes(id)) {
            tournamentsMap[id] = {
              tournamentId: id,
              categoryName: data.categoryName || `Torneo ${id}`,
              sportSlug: data.sportSlug || "unknown",
              events: data.events || {},
            };
            if (id === 132) {
              console.log("Datos del torneo 132 desde Firestore:", tournamentsMap[id]);
            }
          }
        });

        // Obtener odds
        const oddsSnapshot = await getDocs(collection(db, "odds"));
        const oddsMap = {};
        oddsSnapshot.forEach((doc) => {
          const oddsData = doc.data();
          oddsMap[doc.id] = oddsData;
        });

        setTournamentsData(Object.values(tournamentsMap));
        setOddsData(oddsMap);
        console.log("Torneos cargados:", Object.values(tournamentsMap));
        console.log("Odds cargados:", oddsMap);
      } catch (error) {
        setError(error.message || "Error al cargar datos");
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromFirebase();
  }, [setTournamentsData, setOddsData, setLoading, setError]);

  return null; // Este componente no renderiza nada, solo fetches datos
}