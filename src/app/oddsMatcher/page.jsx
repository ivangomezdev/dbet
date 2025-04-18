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
import Calculator from "@/components/Calculator";

export default function DataDisplay() {
  const [tournamentsData] = useAtom(tournamentsDataAtom);
  const [oddsData] = useAtom(oddsDataAtom);
  const [loading] = useAtom(loadingAtom);
  const [error] = useAtom(errorAtom);

  const [currentPage, setCurrentPage] = useState(1);
  const [eventFilter, setEventFilter] = useState("");
  const [sportFilter, setSportFilter] = useState("");
  const [bookmakerFilter, setBookmakerFilter] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [selectedBetType, setSelectedBetType] = useState("Dinero real");
  const [ratingInputs, setRatingInputs] = useState({
    favorImporte: "100",
    contraImporte: "7",
    dineroReal: "100",
    bonos: "100",
    rolloverRestante: "100",
    ratingFuturo: "0.95",
    importeReembolso: "100",
  });
  const [tempRatingInputs, setTempRatingInputs] = useState({ ...ratingInputs });
  const [activeTab, setActiveTab] = useState("Dinero real");
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

  // Calculations Logic from Calculator.jsx
  const calculateTooltipValues = (inputs, betType, favorCuota, contraCuota) => {
    const favorImporte = parseFloat(inputs.favorImporte) || 0;
    const favorCuotaValue = parseFloat(favorCuota) || 0;
    const contraCuotaValue = parseFloat(contraCuota) || 0;
    const commissionInput = parseFloat(inputs.contraImporte) || 0;
    const dineroReal = parseFloat(inputs.dineroReal) || 0;
    const bonos = parseFloat(inputs.bonos) || 0;
    const rolloverRestante = parseFloat(inputs.rolloverRestante) || 0;
    const ratingFuturo = parseFloat(inputs.ratingFuturo) || 0;
    const importeReembolso = parseFloat(inputs.importeReembolso) || 0;

    const commission = betType === "Apuesta gratis" ? 0.07 : commissionInput / 100;

    let contraAmount, favorBookmakerProfit, favorBetfairProfit, favorTotal;
    let contraBookmakerProfit, contraBetfairProfit, contraTotal;

    if (betType === "Dinero real") {
      contraAmount =
        (favorImporte * favorCuotaValue) / (contraCuotaValue - commission) || 0;
      favorBookmakerProfit = favorImporte * favorCuotaValue - favorImporte;
      favorBetfairProfit = -(contraAmount * (contraCuotaValue - 1));
      favorTotal = favorBookmakerProfit + favorBetfairProfit;
      contraBookmakerProfit = -favorImporte;
      contraBetfairProfit = contraAmount * (1 - commission);
      contraTotal = contraBookmakerProfit + contraBetfairProfit;
    } else if (betType === "Apuesta gratis") {
      contraAmount =
        (favorImporte * (favorCuotaValue - 1)) / (contraCuotaValue - commission) || 0;
      favorBookmakerProfit = favorImporte * favorCuotaValue - favorImporte;
      favorBetfairProfit = -(contraAmount * (contraCuotaValue - 1));
      favorTotal = favorBookmakerProfit + favorBetfairProfit;
      contraBookmakerProfit = 0;
      contraBetfairProfit = contraAmount * (1 - commission);
      contraTotal = contraBookmakerProfit + contraBetfairProfit;
    } else if (betType === "RollOver") {
      const totalFavorImporte = dineroReal + bonos;
      contraAmount =
        ((totalFavorImporte * favorCuotaValue) -
         Math.max(0, rolloverRestante - totalFavorImporte) * (1 - ratingFuturo)) /
        (contraCuotaValue - commission) || 0;
      favorBookmakerProfit =
        ((totalFavorImporte * favorCuotaValue) - dineroReal) -
        Math.max(0, (rolloverRestante - totalFavorImporte) * (1 - ratingFuturo));
      favorBetfairProfit = -(contraAmount * (contraCuotaValue - 1));
      favorTotal = favorBookmakerProfit + favorBetfairProfit;
      contraBookmakerProfit = -dineroReal;
      contraBetfairProfit = contraAmount * (1 - commission);
      contraTotal = contraBookmakerProfit + contraBetfairProfit;
    } else if (betType === "Reembolso") {
      contraAmount =
        ((favorImporte * favorCuotaValue) - importeReembolso) / (contraCuotaValue - commission) || 0;
      favorBookmakerProfit = favorImporte * favorCuotaValue - favorImporte;
      favorBetfairProfit = -(contraAmount * (contraCuotaValue - 1));
      favorTotal = favorBookmakerProfit + favorBetfairProfit;
      contraBookmakerProfit = importeReembolso - favorImporte;
      contraBetfairProfit = contraAmount * (1 - commission);
      contraTotal = contraBookmakerProfit + contraBetfairProfit;
    }

    return {
      contraAmount: isNaN(contraAmount) ? 0 : contraAmount.toFixed(2),
      favor: {
        bookmaker: isNaN(favorBookmakerProfit) ? 0 : favorBookmakerProfit.toFixed(2),
        betfair: isNaN(favorBetfairProfit) ? 0 : favorBetfairProfit.toFixed(2),
        total: isNaN(favorTotal) ? 0 : favorTotal.toFixed(2),
      },
      contra: {
        bookmaker: isNaN(contraBookmakerProfit) ? 0 : contraBookmakerProfit.toFixed(2),
        betfair: isNaN(contraBetfairProfit) ? 0 : contraBetfairProfit.toFixed(2),
        total: isNaN(contraTotal) ? 0 : contraTotal.toFixed(2),
      },
    };
  };

  const calculateRating = (inputs, betType, contraTotal, favorTotal, favorCuota, contraCuota) => {
    const favorImporte = parseFloat(inputs.favorImporte) || 0;
    const dineroReal = parseFloat(inputs.dineroReal) || 0;
    const bonos = parseFloat(inputs.bonos) || 0;
    const importeReembolso = parseFloat(inputs.importeReembolso) || 0;
    const contraTotalValue = parseFloat(contraTotal) || 0;

    let effectiveImporte = favorImporte;
    if (betType === "RollOver") {
      effectiveImporte = dineroReal + bonos;
    }

    if (effectiveImporte === 0 || (betType === "Reembolso" && importeReembolso === 0)) {
      return "-";
    }

    let rating;
    if (betType === "Dinero real") {
      rating = ((favorImporte + contraTotalValue) / favorImporte) * 100;
    } else if (betType === "Apuesta gratis") {
      rating = (contraTotalValue / favorImporte) * 100;
    } else if (betType === "Reembolso") {
      rating = (contraTotalValue / importeReembolso) * 100;
    } else if (betType === "RollOver") {
      rating = (contraTotalValue / effectiveImporte) * 100;
    }

    return isNaN(rating) ? "-" : rating.toFixed(2);
  };

  const getEventBookmakerOutcomeTriples = () => {
    const triples = [];
    let eventCount = 0;

    tournamentsData.forEach((tournament) => {
      const events = tournament.events || {};
      Object.values(events).forEach((event) => {
        eventCount++;
        const eventOdds = oddsData[event.eventId];
        if (!eventOdds || !eventOdds.bookmakers) {
          return;
        }

        const marketId = sportImages.basketballIds.includes(tournament.tournamentId) ? 111 : 101;
        const fullTimeResult = eventOdds.markets?.[marketId];
        if (!fullTimeResult) {
          return;
        }

        const outcomes = sportImages.basketballIds.includes(tournament.tournamentId)
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
            if (!data?.bookmakers?.[bookmaker]?.price || !data?.bookmakers?.["betfair-ex"]?.price) {
              return;
            }

            const eventName = `${event.participant1} vs ${event.participant2}`.toLowerCase();
            const sportType = sportImages.footballIds.includes(tournament.tournamentId)
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

            const favorCuota = data.bookmakers[bookmaker].price;
            const contraCuota = data.bookmakers["betfair-ex"].price;
            const tooltipValues = calculateTooltipValues(ratingInputs, selectedBetType, favorCuota, contraCuota);
            const rating = calculateRating(
              ratingInputs,
              selectedBetType,
              tooltipValues.contra.total,
              tooltipValues.favor.total,
              favorCuota,
              contraCuota
            );

            triples.push({
              event,
              bookmaker,
              date: eventOdds.date,
              tournamentId: tournament.tournamentId,
              apuesta: name,
              rating: rating === "-" ? -Infinity : parseFloat(rating),
              favor: data.bookmakers[bookmaker].price,
              contra: data.bookmakers["betfair-ex"].price,
              liquidez: data.bookmakers["betfair-ex"].limit || "-gallery",
              sportType,
            });
          });
        });
      });
    });

    // Sort by rating in descending order
    triples.sort((a, b) => b.rating - a.rating);
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

  const handleOpenCalculator = (item) => {
    setSelectedEvent({
      date: item.date,
      event: `${item.event.participant1} vs ${item.event.participant2}`,
      bookmaker: item.bookmaker,
      favor: item.favor,
      contra: item.contra,
      rating: item.rating === -Infinity ? "-" : `${item.rating.toFixed(2)}%`,
      bookmakerImage: bookmakerImages[item.bookmaker],
      betfairImage: bookmakerImages["betfair-ex"],
    });
  };

  const handleCloseCalculator = () => {
    setSelectedEvent(null);
  };

  const handleOpenRatingModal = () => {
    setTempRatingInputs({ ...ratingInputs });
    setActiveTab(selectedBetType);
    setRatingModalOpen(true);
  };

  const handleCloseRatingModal = () => {
    setRatingModalOpen(false);
  };

  const handleApplyRating = () => {
    setRatingInputs({ ...tempRatingInputs });
    setSelectedBetType(activeTab);
    setCurrentPage(1); // Reset to first page after applying
    setRatingModalOpen(false);
  };

  const handleRatingInputChange = (e) => {
    const { name, value } = e.target;
    setTempRatingInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const RatingModal = () => (
    <div className="modal-overlay" style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
      <div className="modal-content" style={{ backgroundColor: "white", padding: "20px", borderRadius: "5px", width: "400px", maxWidth: "90%" }} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: "10px" }}>Configurar Rating</h2>
        <div className="tabs" style={{ display: "flex", marginBottom: "10px" }}>
          {["Dinero real", "Apuesta gratis", "RollOver", "Reembolso"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: "10px",
                backgroundColor: activeTab === tab ? "#00A500" : "#f0f0f0",
                color: activeTab === tab ? "white" : "black",
                border: "none",
                cursor: "pointer",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="tab-content" style={{ marginBottom: "20px" }}>
          {activeTab === "Dinero real" && (
            <div>
              <label style={{ display: "block", marginBottom: "10px" }}>
                Importe Apuesta (€)
                <input
                  type="text"
                  name="favorImporte"
                  value={tempRatingInputs.favorImporte}
                  onChange={handleRatingInputChange}
                  style={{ width: "100%", padding: "5px", marginTop: "5px" }}
                />
              </label>
            </div>
          )}
          {activeTab === "Apuesta gratis" && (
            <div>
              <label style={{ display: "block", marginBottom: "10px" }}>
                Importe Apuesta (€)
                <input
                  type="text"
                  name="favorImporte"
                  value={tempRatingInputs.favorImporte}
                  onChange={handleRatingInputChange}
                  style={{ width: "100%", padding: "5px", marginTop: "5px" }}
                />
              </label>
            </div>
          )}
          {activeTab === "RollOver" && (
            <div>
              <label style={{ display: "block", marginBottom: "10px" }}>
                Dinero Real (€)
                <input
                  type="text"
                  name="dineroReal"
                  value={tempRatingInputs.dineroReal}
                  onChange={handleRatingInputChange}
                  style={{ width: "100%", padding: "5px", marginTop: "5px" }}
                />
              </label>
              <label style={{ display: "block", marginBottom: "10px" }}>
                Bonos (€)
                <input
                  type="text"
                  name="bonos"
                  value={tempRatingInputs.bonos}
                  onChange={handleRatingInputChange}
                  style={{ width: "100%", padding: "5px", marginTop: "5px" }}
                />
              </label>
              <label style={{ display: "block", marginBottom: "10px" }}>
                Rollover Restante (€)
                <input
                  type="text"
                  name="rolloverRestante"
                  value={tempRatingInputs.rolloverRestante}
                  onChange={handleRatingInputChange}
                  style={{ width: "100%", padding: "5px", marginTop: "5px" }}
                />
              </label>
              <label style={{ display: "block", marginBottom: "10px" }}>
                Rating Futuro (%)
                <input
                  type="text"
                  name="ratingFuturo"
                  value={tempRatingInputs.ratingFuturo}
                  onChange={handleRatingInputChange}
                  style={{ width: "100%", padding: "5px", marginTop: "5px" }}
                />
              </label>
            </div>
          )}
          {activeTab === "Reembolso" && (
            <div>
              <label style={{ display: "block", marginBottom: "10px" }}>
                Importe Apuesta (€)
                <input
                  type="text"
                  name="favorImporte"
                  value={tempRatingInputs.favorImporte}
                  onChange={handleRatingInputChange}
                  style={{ width: "100%", padding: "5px", marginTop: "5px" }}
                />
              </label>
              <label style={{ display: "block", marginBottom: "10px" }}>
                Importe Reembolso (€)
                <input
                  type="text"
                  name="importeReembolso"
                  value={tempRatingInputs.importeReembolso}
                  onChange={handleRatingInputChange}
                  style={{ width: "100%", padding: "5px", marginTop: "5px" }}
                />
              </label>
            </div>
          )}
        </div>
        <div className="modal-buttons" style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={handleCloseRatingModal}
            style={{
              padding: "10px 20px",
              marginRight: "10px",
              backgroundColor: "#ccc",
              border: "none",
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleApplyRating}
            style={{
              padding: "10px 20px",
              backgroundColor: "#00A500",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="oddsMatcher__cont">
      <NavBar />
      <div className="me__content betting-table-container">
        <h2 className="betting-table-title">OddsMatcher</h2>

        {/* Filtros */}
        <div className="oddsmatcher__filterData" style={{ display: "flex", gap: "10px" }}>
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
          <label className="oddsMatcher__label">
            Bookmaker
            <select
              value={bookmakerFilter}
              onChange={(e) => setBookmakerFilter(e.target.value)}
            >
              <option value="">Todos</option>
              {availableBookmakers.map((bookmaker) => (
                <option key={bookmaker} value={bookmaker}>
                  {bookmaker}
                </option>
              ))}
            </select>
          </label>
          <label className="oddsMatcher__label">
            Rating
            <button
              onClick={handleOpenRatingModal}
              style={{
                marginLeft: "5px",
                padding: "5px 10px",
                backgroundColor: "rgba(12, 187, 91, 0.497)",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Configurar
            </button>
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
                <th>CALC</th>
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
                        <button
                          onClick={() =>
                            handleOpenCalculator({
                              event,
                              bookmaker,
                              date,
                              tournamentId,
                              apuesta,
                              rating,
                              favor,
                              contra,
                              liquidez,
                            })
                          }
                          style={{
                            backgroundColor: "rgba(12, 187, 91, 0.497)",
                            color: "white",
                            padding: "5px 10px",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          Calc
                        </button>
                      </td>
                      <td>
                        {rating === -Infinity ? "-" : `${rating.toFixed(2)}%`}
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
            style={{
              backgroundColor: "rgba(12, 187, 91, 0.497)",
              color: "white",
              marginRight: "10px",
              padding: "5px 10px",
            }}
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            style={{
              backgroundColor: "rgba(12, 187, 91, 0.497)",
              color: "white",
              marginLeft: "10px",
              padding: "5px 10px",
            }}
          >
            Siguiente
          </button>
          <p style={{ marginTop: "10px" }}>
            Mostrando {startIndex + 1} - {Math.min(endIndex, totalItems)} de{" "}
            {totalItems} resultados
          </p>
        </div>
      </div>
      {selectedEvent && (
        <Calculator
          eventData={selectedEvent}
          onClose={handleCloseCalculator}
        />
      )}
      {ratingModalOpen && <RatingModal />}
    </div>
  );
}