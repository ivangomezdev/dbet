"use client";

import { useAtom } from "jotai";
import { useState } from "react";
import Image from "next/image";
import {
  tournamentsDataAtom,
  oddsDataAtom,
  loadingAtom,
  errorAtom,
} from "../../lib/atom";

export default function DataDisplay() {
  const [tournamentsData] = useAtom(tournamentsDataAtom);
  const [oddsData] = useAtom(oddsDataAtom);
  const [loading] = useAtom(loadingAtom);
  const [error] = useAtom(errorAtom);

  const [matchFilter, setMatchFilter] = useState("");
  const [sportFilter, setSportFilter] = useState("");
  const [bookmakerFilter, setBookmakerFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Mapa de bookmakers a sus imágenes
  const bookmakerImages = {
    "betfair-ex": "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972626/betfair_qlonut.gif",
    "bet365": "https://res.cloudinary.com/dc5zbh38m/image/upload/v1743783285/36_w0vbhc.gif",
    "pokerstars": "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972622/29_r5mmzr.png",
    "williamHill": "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972622/20_ykoo4y.gif",
    "paf.es": "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972626/paf_r32yqs.png",
    "leovegas.es": "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972625/71_ij3po0.png",
    "winamax": "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972624/69_dlxsmr.png",
    "bwin": "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972622/7_u7bjom.gif",
    "betway": "https://res.cloudinary.com/dc5zbh38m/image/upload/v1743783285/way_guaro0.png",
    "interwetten": "https://res.cloudinary.com/dc5zbh38m/image/upload/v1743783285/inter_wvwqtz.gif",
    "tonybet": "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972625/105_kjtrkr.png"
  };

  // Mapa de tournamentId a imágenes de deportes
  const sportImages = {
    footballIds: [1024, 155, 325, 18, 24, 34, 35, 679, 7, 480, 384, 498],
    basketballIds: [132],
    footballImage: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1743784233/FOTBAL_wprepx.png",
    basketballImage: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1743784289/BASKET_hrcizl.png",
  };

  const getEventBookmakerOutcomeTriples = () => {
    const triples = [];

    tournamentsData.forEach((tournament) => {
      Object.values(tournament.events || {}).forEach((event) => {
        const eventOdds = oddsData[event.eventId];
        if (eventOdds && eventOdds.bookmakers) {
          const hasBetfairEx = Object.keys(eventOdds.bookmakers).includes("betfair-ex");
          if (!hasBetfairEx) return;

          Object.entries(eventOdds.bookmakers).forEach(([bookmaker, odds]) => {
            if (bookmaker === "marcaapuestas" || bookmaker === "betfair" || bookmaker === "betfair-ex") return;

            const matchText = `${event.participant1} ${event.participant2}`.toLowerCase();
            if (
              (matchFilter === "" || matchText.includes(matchFilter.toLowerCase())) &&
              (sportFilter === "" || (event.sportSlug?.toLowerCase() === sportFilter.toLowerCase())) &&
              (bookmakerFilter === "" || bookmaker.toLowerCase() === bookmakerFilter.toLowerCase())
            ) {
              const fullTimeResult = eventOdds.markets?.[101];
              if (!fullTimeResult) return;

              const outcome1 = fullTimeResult.outcomes?.[101];
              const outcomeX = fullTimeResult.outcomes?.[102];
              const outcome2 = fullTimeResult.outcomes?.[103];

              if (outcome1?.bookmakers?.[bookmaker]?.price) {
                triples.push({
                  event,
                  bookmaker,
                  odds: eventOdds,
                  outcomeId: "101",
                  outcomeName: event.participant1,
                  price: outcome1.bookmakers[bookmaker].price,
                  betfairExPrice: outcome1.bookmakers["betfair-ex"]?.price || "-",
                  betfairExLimit: outcome1.bookmakers["betfair-ex"]?.limit || "-",
                  tournamentId: tournament.tournamentId,
                });
              }
              if (outcomeX?.bookmakers?.[bookmaker]?.price) {
                triples.push({
                  event,
                  bookmaker,
                  odds: eventOdds,
                  outcomeId: "102",
                  outcomeName: "Empate",
                  price: outcomeX.bookmakers[bookmaker].price,
                  betfairExPrice: outcomeX.bookmakers["betfair-ex"]?.price || "-",
                  betfairExLimit: outcomeX.bookmakers["betfair-ex"]?.limit || "-",
                  tournamentId: tournament.tournamentId,
                });
              }
              if (outcome2?.bookmakers?.[bookmaker]?.price) {
                triples.push({
                  event,
                  bookmaker,
                  odds: eventOdds,
                  outcomeId: "103",
                  outcomeName: event.participant2,
                  price: outcome2.bookmakers[bookmaker].price,
                  betfairExPrice: outcome2.bookmakers["betfair-ex"]?.price || "-",
                  betfairExLimit: outcome2.bookmakers["betfair-ex"]?.limit || "-",
                  tournamentId: tournament.tournamentId,
                });
              }
            }
          });
        }
      });
    });

    return triples;
  };

  const eventBookmakerOutcomeTriples = getEventBookmakerOutcomeTriples();

  const totalItems = eventBookmakerOutcomeTriples.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = eventBookmakerOutcomeTriples.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const formatPrice = (price) =>
    typeof price === "number"
      ? Number(price.toString().match(/^\d+(?:\.\d{0,2})?/) || price).toFixed(2)
      : "-";

  const formatDateTime = (date, time) => {
    const formattedTime = time ? time.slice(0, 5) : "00:00";
    return `${date} ${formattedTime}`;
  };

  const getSportImage = (tournamentId) => {
    if (sportImages.footballIds.includes(tournamentId)) {
      return sportImages.footballImage;
    } else if (sportImages.basketballIds.includes(tournamentId)) {
      return sportImages.basketballImage;
    }
    return null;
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {loading && <p>Cargando más datos...</p>}

      <h1>Todos los Eventos y Cuotas por Casa de Apuestas</h1>

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
            placeholder="Ej: fútbol"
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
        <label style={{ marginLeft: "20px" }}>
          Filtrar por bookmaker:
          <input
            type="text"
            value={bookmakerFilter}
            onChange={(e) => setBookmakerFilter(e.target.value)}
            placeholder="Ej: bet365"
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
      </div>

      {eventBookmakerOutcomeTriples.length === 0 ? (
        <p>No hay datos disponibles que coincidan con los filtros.</p>
      ) : (
        <>
          <div style={{ marginBottom: "20px" }}>
            <p>
              Mostrando {startIndex + 1} - {Math.min(endIndex, totalItems)} de {totalItems} resultados
            </p>
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              style={{ marginRight: "10px", padding: "5px 10px" }}
            >
              Anterior
            </button>
            <span>Página {currentPage} de {totalPages}</span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              style={{ marginLeft: "10px", padding: "5px 10px" }}
            >
              Siguiente
            </button>
          </div>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#fff",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Fecha y Hora</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Deporte</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Evento</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Apuesta</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Rating</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Bookmaker</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Favor</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Exchange</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Contra</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Liquidez</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(({ event, bookmaker, odds, outcomeName, price, betfairExPrice, betfairExLimit, tournamentId }, index) => {
                const fullTimeResult = odds.markets?.[101];
                const payout = fullTimeResult?.payouts?.[bookmaker] || "-";
                const sportImage = getSportImage(tournamentId);

                return (
                  <tr key={`${event.eventId}-${bookmaker}-${outcomeName}-${index}`}>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                      {formatDateTime(event.date, event.time)}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center" }}>
                      {sportImage ? (
                        <Image
                          src={sportImage}
                          alt="Sport"
                          width={20}
                          height={20}
                          style={{ objectFit: "contain" }}
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                      {event.participant1} vs {event.participant2}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>{outcomeName}</td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                      {typeof payout === "number" ? payout.toFixed(2) : payout}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center" }}>
                      {bookmakerImages[bookmaker] ? (
                        <Image
                          src={bookmakerImages[bookmaker]}
                          alt={bookmaker}
                          width={80}
                          height={80}
                          style={{ objectFit: "contain" }}
                        />
                      ) : (
                        bookmaker
                      )}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>{formatPrice(price)}</td>
                    <td style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center" }}>
                      <Image
                        src={bookmakerImages["betfair-ex"]}
                        alt="Betfair Exchange"
                        width={80}
                        height={80}
                        style={{ objectFit: "contain" }}
                      />
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>{formatPrice(betfairExPrice)}</td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>{formatPrice(betfairExLimit)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div style={{ marginTop: "20px" }}>
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              style={{ marginRight: "10px", padding: "5px 10px" }}
            >
              Anterior
            </button>
            <span>Página {currentPage} de {totalPages}</span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              style={{ marginLeft: "10px", padding: "5px 10px" }}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
}