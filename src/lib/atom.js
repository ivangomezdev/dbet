// lib/atom.js
import { atom } from "jotai";
import { db } from "../lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";


// Átomos sin tipos
export const tournamentsDataAtom = atom([]);
export const oddsDataAtom = atom({});
export const loadingAtom = atom(true);
export const errorAtom = atom(null);
export const userAtom = atom(null);
export const oAuthAtom = atom(null);

// Función para cargar datos de Firebase
export const fetchDataFromFirebase = (set) => {
  try {
    // Escuchar cambios en la colección 'tournaments'
    const tournamentsRef = collection(db, "tournaments");
    onSnapshot(tournamentsRef, (snapshot) => {
      const tournamentsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      set(tournamentsDataAtom, tournamentsData);
    });

    // Escuchar cambios en la colección 'odds'
    const oddsRef = collection(db, "odds");
    onSnapshot(oddsRef, (snapshot) => {
      const oddsData = {};
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        oddsData[data.eventId] = {
          ...data,
          markets: data.markets || {}, // Aseguramos que markets siempre esté definido
        };
      });
      set(oddsDataAtom, oddsData);
    });

    set(loadingAtom, false);
  } catch (err) {
    set(errorAtom, err instanceof Error ? err.message : "Error desconocido");
    set(loadingAtom, false);
  }
};
