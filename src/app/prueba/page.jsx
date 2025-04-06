"use client";

import "./casino-background.css";
import { useAtom } from "jotai";
import { useState } from "react";
import Image from "next/image";
import {
  tournamentsDataAtom,
  oddsDataAtom,
  loadingAtom,
  errorAtom,
} from "../../lib/atom";
import NavBar from "@/components/NavBar";

export default function DataDisplay() {
  const [tournamentsData] = useAtom(tournamentsDataAtom);
  const [oddsData] = useAtom(oddsDataAtom);
  const [loading] = useAtom(loadingAtom);
  const [error] = useAtom(errorAtom);

  const [currentPage, setCurrentPage] = useState(1);
  const [eventFilter, setEventFilter] = useState("");
  const [sportFilter, setSportFilter] = useState("");
  const [bookmakerFilter, setBookmakerFilter] = useState("");
  const itemsPerPage = 15;

  const bookmakerImages = {
    bet365:
      "https://res.cloudinary.com/dc5zbh38m/image/upload/v1743783285/36_w0vbhc.gif",
    "betfair-ex":
      "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972626/betfair_qlonut.gif",
    betway:
      "https://res.cloudinary.com/dc5zbh38m/image/upload/v1743783285/way_guaro0.png",
    "leovegas.es":
      "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972625/71_ij3po0.png",
    "paf.es":
      "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972626/paf_r32yqs.png",
    tonybet:
      "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972625/105_kjtrkr.png",
    marcaapuestas:
      "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972622/marcaapuestas.png",
  };

  const sportImages = {
    footballIds: [1024, 155, 325, 18, 24, 34, 35, 679, 7, 480, 384, 498],
    basketballIds: [132],
    footballImage:
      "https://res.cloudinary.com/dc5zbh38m/image/upload/v1743784233/FOTBAL_wprepx.png",
    basketballImage:
      "https://res.cloudinary.com/dc5zbh38m/image/upload/v1743784289/BASKET_hrcizl.png",
  };

  const getEventBookmakerOutcomeTriples = () => {
    const triples = [];
    let eventCount = 0;

    tournamentsData.forEach((tournament) => {
      console.log(`Procesando torneo ${tournament.tournamentId}`);
      if (tournament.tournamentId === 132) {
        console.log("Eventos en torneo 132:", tournament.events);
      }
      const events = tournament.events || {};
      Object.values(events).forEach((event) => {
        eventCount++;
        const eventOdds = oddsData[event.eventId];
        if (!eventOdds) {
          console.log(
            `No hay odds para el evento ${event.eventId} del torneo ${tournament.tournamentId}`
          );
          return;
        }

        if (!eventOdds.bookmakers) {
          console.log(`Faltan bookmakers para el evento ${event.eventId}`);
          return;
        }

        // Determinar el ID del mercado según el deporte
        const marketId = sportImages.basketballIds.includes(
          tournament.tournamentId
        )
          ? 111
          : 101;
        const fullTimeResult = eventOdds.markets?.[marketId];
        if (!fullTimeResult) {
          console.log(
            `No hay market ${marketId} para el evento ${event.eventId}`
          );
          return;
        }

        // Definir resultados según el deporte
        const outcomes = sportImages.basketballIds.includes(
          tournament.tournamentId
        )
          ? [
              {
                id: "111",
                name: event.participant1,
                data: fullTimeResult.outcomes[111],
              },
              {
                id: "112",
                name: event.participant2,
                data: fullTimeResult.outcomes[112],
              },
            ]
          : [
              {
                id: "101",
                name: event.participant1,
                data: fullTimeResult.outcomes[101],
              },
              { id: "102", name: "Empate", data: fullTimeResult.outcomes[102] },
              {
                id: "103",
                name: event.participant2,
                data: fullTimeResult.outcomes[103],
              },
            ];

        Object.entries(eventOdds.bookmakers).forEach(([bookmaker]) => {
          if (bookmaker === "betfair" || bookmaker === "betfair-ex") return;

          outcomes.forEach(({ id, name, data }) => {
            if (!data?.bookmakers?.[bookmaker]?.price) {
              console.log(
                `No hay precio para ${bookmaker} en el evento ${event.eventId}`
              );
              return;
            }

            // Verificar si betfair-ex existe y tiene precio
            if (!data?.bookmakers?.["betfair-ex"]?.price) {
              console.log(
                `No hay betfair-ex para ${bookmaker} en el evento ${event.eventId}`
              );
              return;
            }

            const eventName =
              `${event.participant1} vs ${event.participant2}`.toLowerCase();
            const sportType = sportImages.footballIds.includes(
              tournament.tournamentId
            )
              ? "football"
              : sportImages.basketballIds.includes(tournament.tournamentId)
                ? "basketball"
                : "unknown";

            if (
              (eventFilter && !eventName.includes(eventFilter.toLowerCase())) ||
              (sportFilter && sportFilter !== sportType) ||
              (bookmakerFilter && bookmakerFilter !== bookmaker)
            ) {
              return;
            }

            triples.push({
              event,
              bookmaker,
              date: eventOdds.date,
              tournamentId: tournament.tournamentId,
              apuesta: name,
              rating: fullTimeResult.payouts?.[bookmaker] || "-",
              favor: data.bookmakers[bookmaker].price,
              contra: data.bookmakers["betfair-ex"].price,
              liquidez: data.bookmakers["betfair-ex"].limit || "-gallery",
              sportType,
            });
          });
        });
      });
    });

    console.log("Total eventos procesados:", eventCount);
    console.log("Total triples generados:", triples.length);
    console.log("Triples generados (primeros 10):", triples.slice(0, 10));
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
    typeof price === "number" ? price.toFixed(2) : "-";

  const getSportImage = (tournamentId) => {
    if (sportImages.footballIds.includes(tournamentId)) {
      return sportImages.footballImage;
    } else if (sportImages.basketballIds.includes(tournamentId)) {
      return sportImages.basketballImage;
    }
    return null;
  };

  const availableBookmakers = Object.keys(bookmakerImages).filter(
    (b) => b !== "betfair-ex"
  );

  return (
    <div className="oddsMatcher__cont">
      <NavBar />

      <>
        <div className="me__content betting-table-container">
          <h2 className="betting-table-title">OddsMatcher</h2>

          {/* Filtros */}
          <div className="oddsmatcher__filterData">
            <label className="oddsMatcher__label">
              Evento
              <input
                type="text"
                value={eventFilter}
                onChange={(e) => setEventFilter(e.target.value)}
                placeholder="Ej: Rosario vs Andes"
                style={{ marginLeft: "5px", padding: "5px" }}
              />
            </label>
            <label className="oddsMatcher__label">
              Deporte
              <select
                value={sportFilter}
                onChange={(e) => setSportFilter(e.target.value)}
                style={{ marginLeft: "5px", padding: "5px" }}
              >
                <option value="">Todos</option>
                <option value="football">Fútbol</option>
                <option value="basketball">Baloncesto</option>
              </select>
            </label>
            <label>
              Bookmaker
              <select
                value={bookmakerFilter}
                onChange={(e) => setBookmakerFilter(e.target.value)}
                className="oddsMatcher__label"
              >
                <option value="">Todos</option>
                {availableBookmakers.map((bookmaker) => (
                  <option key={bookmaker} value={bookmaker}>
                    {bookmaker}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="table-wrapper">
            <table className="betting-table">
              <thead>
                <tr>
                  <th>FECHA/HORA</th>
                  <th>DEPORTE</th>
                  <th>EVENTO</th>
                  <th>APUESTA</th>
                  <th>RATING (%)</th>
                  <th>BOOKMAKER</th>
                  <th>FAVOR</th>
                  <th>EXCHANGE</th>
                  <th>CONTRA</th>
                  <th>LIQUIDEZ</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(
                  (
                    {
                      event,
                      bookmaker,
                      date,
                      tournamentId,
                      apuesta,
                      rating,
                      favor,
                      contra,
                      liquidez,
                    },
                    index
                  ) => {
                    const sportImage = getSportImage(tournamentId);
                    return (
                      <tr
                        key={`${event.eventId}-${bookmaker}-${apuesta}-${index}`}
                      >
                        <td>{date}</td>
                        <td>
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
                        <td>{`${event.participant1} vs ${event.participant2}`}</td>
                        <td>{apuesta}</td>
                        <td>
                          {typeof rating === "number"
                            ? `${rating.toFixed(2)}%`
                            : "-"}
                        </td>
                        <td>
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
                        <td>{formatPrice(favor)}</td>
                        <td>
                          <Image
                            src={bookmakerImages["betfair-ex"]}
                            alt="Betfair Exchange"
                            width={80}
                            height={80}
                            style={{ objectFit: "contain" }}
                            />
                        </td>
                        <td>{formatPrice(contra)}</td>
                        <td>{formatPrice(liquidez)}</td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              style={{backgroundColor:"rgba(12, 187, 91, 0.497)", color:"white", marginRight: "10px", padding: "5px 10px" }}
            >
              Anterior
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              style={{ backgroundColor:"rgba(12, 187, 91, 0.497)", color:"white", marginLeft: "10px", padding: "5px 10px" }}
            >
              Siguiente
            </button>
            <p style={{ marginTop: "10px" }}>
              Mostrando {startIndex + 1} - {Math.min(endIndex, totalItems)} de{" "}
              {totalItems} resultados
            </p>
          </div>
        </div>
      </>
    </div>
  );
}