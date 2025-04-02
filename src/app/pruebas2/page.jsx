"use client";

import { useAtom } from "jotai";
import { useState } from "react";
import {
  tournamentsDataAtom,
  oddsDataAtom,
  loadingAtom,
  errorAtom,
} from "../../lib/atom"
export default function DataDisplay() {
  const [tournamentsData] = useAtom(tournamentsDataAtom);
  const [oddsData] = useAtom(oddsDataAtom);
  const [loading] = useAtom(loadingAtom);
  const [error] = useAtom(errorAtom);

  const [matchFilter, setMatchFilter] = useState("");
  const [sportFilter, setSportFilter] = useState("");
  const [bookmakerFilter, setBookmakerFilter] = useState("");

  const getEventBookmakerPairs = () => {
    const pairs = [];

    tournamentsData.forEach((tournament) => {
      Object.values(tournament.events || {}).forEach((event) => {
        const eventOdds = oddsData[event.eventId];
        if (eventOdds && eventOdds.bookmakers) {
          Object.entries(eventOdds.bookmakers).forEach(([bookmaker, odds]) => {
            const matchText = `${event.participant1} ${event.participant2}`.toLowerCase();
            if (
              (matchFilter === "" || matchText.includes(matchFilter.toLowerCase())) &&
              (sportFilter === "" || (event.sportSlug?.toLowerCase() === sportFilter.toLowerCase())) &&
              (bookmakerFilter === "" || bookmaker.toLowerCase() === bookmakerFilter.toLowerCase())
            ) {
              pairs.push({ event, bookmaker, odds });
            }
          });
        }
      });
    });

    return pairs;
  };

  const eventBookmakerPairs = getEventBookmakerPairs();

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {loading && <p>Cargando más datos...</p>}

      <h1>Todos los Eventos y Cuotas por Bookmaker</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>
          Filtrar por partido:
          <input
            type="text"
            value={matchFilter}
            onChange={(e) => setMatchFilter(e.target.value)}
            placeholder="Ej: Unión de Santa Fe"
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
        <label style={{ marginLeft: "20px" }}>
          Filtrar por deporte:
          <input
            type="text"
            value={sportFilter}
            onChange={(e) => setSportFilter(e.target.value)}
            placeholder="Ej: soccer"
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
        <label style={{ marginLeft: "20px" }}>
          Filtrar por casa de apuestas:
          <input
            type="text"
            value={bookmakerFilter}
            onChange={(e) => setBookmakerFilter(e.target.value)}
            placeholder="Ej: bet365"
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
      </div>

      {eventBookmakerPairs.length === 0 ? (
        <p>No hay datos disponibles que coincidan con los filtros.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {eventBookmakerPairs.map(({ event, bookmaker, odds }, index) => (
            <li
              key={`${event.eventId}-${bookmaker}-${index}`}
              style={{
                marginBottom: "15px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "#fff",
              }}
            >
              <h4>
                {event.participant1} vs {event.participant2} - {bookmaker}
              </h4>
              <p>
                <strong>Fecha:</strong> {event.date} | <strong>Hora:</strong> {event.time} |{" "}
                <strong>Estado:</strong> {event.eventStatus}
              </p>
              <p>
                <strong>ID del Evento:</strong> {event.eventId} |{" "}
                <strong>Tournament ID:</strong> {event.tournamentId}
              </p>
              <h5>Cuotas de {bookmaker}:</h5>
              <pre style={{ margin: 0, fontSize: "14px" }}>
                {JSON.stringify(odds, null, 2)}
              </pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}