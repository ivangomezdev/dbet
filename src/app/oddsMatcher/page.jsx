"use client";

import "./casino-background.css";
import { useAtom } from "jotai";
import { useState } from "react";
import Image from "next/image";
import {
  tournamentsDataAtom,
  oddsDataAtom,
} from "../../lib/atom";
import NavBar from "@/components/NavBar";
import Calculator from "@/components/Calculator";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { StarRate, AccountBalance, FilterList, Calculate } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

import NavBar from "@/components/NavBar";

import { useSession } from "next-auth/react";

export default function DataDisplay() {
  const [tournamentsData] = useAtom(tournamentsDataAtom);
  const [oddsData] = useAtom(oddsDataAtom);


    const { data: session, status } = useSession();
    const [cookies] = useCookies(["token"]); // Leer las cookies
    const router = useRouter();
  
    console.log(status);
    
    useEffect(() => {
      if (status === "loading") return;
  
      if (status === "unauthenticated" && !cookies.token) {
        router.push("/auth/register");
      }
    }, [status, cookies.token, router]);


  const [currentPage, setCurrentPage] = useState(1);
  const [eventFilter, setEventFilter] = useState("");
  const [sportFilter, setSportFilter] = useState("");
  const [bookmakerFilter, setBookmakerFilter] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [commissionModalOpen, setCommissionModalOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
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
  const [sortConfig, setSortConfig] = useState({ key: "rating", direction: "desc" });
  const itemsPerPage = 15;

  // Estados para filtros
  const [commission, setCommission] = useState(0.7);
  const [tempCommission, setTempCommission] = useState(commission);
  const [filterInputs, setFilterInputs] = useState({
    ratingMin: "",
    ratingMax: "",
    oddsMin: "",
    oddsMax: "",
    dateStart: null,
    dateEnd: null,
  });
  const [tempFilterInputs, setTempFilterInputs] = useState({ ...filterInputs });

  // Updated bookmakerImages, excluding bet365, Betfair Sportsbook, and Betfair Exchange
  const bookmakerImages = {
    Bet365:"https://res.cloudinary.com/dc5zbh38m/image/upload/v1743783285/36_w0vbhc.gif",
    Betway:
      "https://res.cloudinary.com/dc5zbh38m/image/upload/v1743783285/way_guaro0.png",
    "LeoVegas ES":
      "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972625/71_ij3po0.png",
    "PAF ES":
      "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972626/paf_r32yqs.png",
    TonyBet:
      "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972625/105_kjtrkr.png",
    marcaapuestas:
      "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972622/marcaapuestas.png",
    "Winamax FR":
      "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745713210/wiina_ntkzce.png",
  };

  // Updated sportImages to use dynamic sport value from oddsData
  const sportImages = {
    Football: {
      tournamentIds: [1024, 155, 325, 18, 24, 34, 35, 679, 7, 480, 384, 498],
      image:
        "https://res.cloudinary.com/dc5zbh38m/image/upload/v1743784233/FOTBAL_wprepx.png",
    },
    Basketball: {
      tournamentIds: [132],
      image:
        "https://res.cloudinary.com/dc5zbh38m/image/upload/v1743784289/BASKET_hrcizl.png",
    },
  };

  // Lógica de ordenamiento
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key && prev.direction === "asc") {
        return { key, direction: "desc" };
      } else {
        return { key, direction: "asc" };
      }
    });
  };

  // Cálculos (from Calculator component)
  const calculateTooltipValues = (inputs, betType, favorCuota, contraCuota) => {
    const favorImporte = parseFloat(inputs.favorImporte) || 0;
    const favorCuotaValue = parseFloat(favorCuota) || 0;
    const contraCuotaValue = parseFloat(contraCuota) || 0;
    const commissionInput = betType === "Apuesta gratis" ? 0.07 : parseFloat(inputs.contraImporte) / 100;
    const dineroReal = parseFloat(inputs.dineroReal) || 0;
    const bonos = parseFloat(inputs.bonos) || 0;
    const rolloverRestante = parseFloat(inputs.rolloverRestante) || 0;
    const ratingFuturo = parseFloat(inputs.ratingFuturo) || 0;
    const importeReembolso = parseFloat(inputs.importeReembolso) || 0;

    let contraAmount, favorBookmakerProfit, favorBetfairProfit, favorTotal;
    let contraBookmakerProfit, contraBetfairProfit, contraTotal;

    if (betType === "Dinero real") {
      contraAmount =
        (favorImporte * favorCuotaValue) / (contraCuotaValue - commissionInput) || 0;
      favorBookmakerProfit = favorImporte * favorCuotaValue - favorImporte;
      favorBetfairProfit = -(contraAmount * (contraCuotaValue - 1));
      favorTotal = favorBookmakerProfit + favorBetfairProfit;
      contraBookmakerProfit = -favorImporte;
      contraBetfairProfit = contraAmount * (1 - commissionInput);
      contraTotal = contraBookmakerProfit + contraBetfairProfit;
    } else if (betType === "Apuesta gratis") {
      contraAmount =
        (favorImporte * (favorCuotaValue - 1)) / (contraCuotaValue - commissionInput) || 0;
      favorBookmakerProfit = favorImporte * favorCuotaValue - favorImporte;
      favorBetfairProfit = -(contraAmount * (contraCuotaValue - 1));
      favorTotal = favorBookmakerProfit + favorBetfairProfit;
      contraBookmakerProfit = 0;
      contraBetfairProfit = contraAmount * (1 - commissionInput);
      contraTotal = contraBookmakerProfit + contraBetfairProfit;
    } else if (betType === "RollOver") {
      const totalFavorImporte = dineroReal + bonos;
      contraAmount =
        ((totalFavorImporte * favorCuotaValue) -
         Math.max(0, rolloverRestante - totalFavorImporte) * (1 - ratingFuturo)) /
        (contraCuotaValue - commissionInput) || 0;
      favorBookmakerProfit =
        ((totalFavorImporte * favorCuotaValue) - dineroReal) -
        Math.max(0, (rolloverRestante - totalFavorImporte) * (1 - ratingFuturo));
      favorBetfairProfit = -(contraAmount * (contraCuotaValue - 1));
      favorTotal = favorBookmakerProfit + favorBetfairProfit;
      contraBookmakerProfit = -dineroReal;
      contraBetfairProfit = contraAmount * (1 - commissionInput);
      contraTotal = contraBookmakerProfit + contraBetfairProfit;
    } else if (betType === "Reembolso") {
      contraAmount =
        ((favorImporte * favorCuotaValue) - importeReembolso) / (contraCuotaValue - commissionInput) || 0;
      favorBookmakerProfit = favorImporte * favorCuotaValue - favorImporte;
      favorBetfairProfit = -(contraAmount * (contraCuotaValue - 1));
      favorTotal = favorBookmakerProfit + favorBetfairProfit;
      contraBookmakerProfit = importeReembolso - favorImporte;
      contraBetfairProfit = contraAmount * (1 - commissionInput);
      contraTotal = contraBookmakerProfit + contraBetfairProfit;
    }

    return {
      contraAmount: isNaN(contraAmount) ? 0 : contraAmount.toFixed(2),
      favor: {
        bookmaker: isNaN(favorBookmakerProfit) ? 0 : favorBookmakerProfit.toFixed(2),
        betfair: isNaN(favorBetfairProfit) ? 0 : favorBookmakerProfit.toFixed(2),
        total: isNaN(favorTotal) ? 0 : favorTotal.toFixed(2),
      },
      contra: {
        bookmaker: isNaN(contraBookmakerProfit) ? 0 : contraBookmakerProfit.toFixed(2),
        betfair: isNaN(contraBetfairProfit) ? 0 : contraBetfairProfit.toFixed(2),
        total: isNaN(contraTotal) ? 0 : contraTotal.toFixed(2),
      },
    };
  };

  const calculateRating = (inputs, betType, contraTotal, favorTotal) => {
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

    return isNaN(rating) ? "-" : rating.toFixed(2) + "%";
  };

  const getEventBookmakerOutcomeTriples = () => {
    let triples = [];

    // List of bookmakers to exclude
    const excludedBookmakers = ["Bet365 (no latency)", "Betfair Sportsbook", "Betfair Exchange"];

    Object.values(oddsData).forEach((eventOdds) => {
      const eventId = eventOdds.eventId;
      const eventDate = eventOdds.date;
      const sport = eventOdds.sport || "Football"; // Default to Football if sport is undefined
      const homeTeam = eventOdds.home || eventOdds.participant1 || "Team 1";
      const awayTeam = eventOdds.away || eventOdds.participant2 || "Team 2";
      const eventName = `${homeTeam} vs ${awayTeam}`.toLowerCase();

      if (!eventOdds.bookmakers) return;

      const outcomes = [
        { id: "101", name: homeTeam, key: "home" },
        { id: "102", name: "Empate", key: "draw" },
        { id: "103", name: awayTeam, key: "away" },
      ];

      Object.entries(eventOdds.bookmakers).forEach(([bookmakerName, bookmakerData]) => {
        // Skip excluded bookmakers
        if (excludedBookmakers.includes(bookmakerName)) return;

        const marketData = bookmakerData.find((market) => market.name === "ML");
        if (!marketData || !marketData.odds || !marketData.odds[0]) return;

        const betfairData = eventOdds.bookmakers["Betfair Exchange"]?.find(
          (market) => market.name === "ML"
        );
        if (!betfairData || !betfairData.odds || !betfairData.odds[0]) return;

        outcomes.forEach((outcome) => {
          const favorOdds = parseFloat(marketData.odds[0][outcome.key]);
          const contraOdds = parseFloat(betfairData.odds[0][outcome.key]);

          if (isNaN(favorOdds) || isNaN(contraOdds)) return;

          if (
            (eventFilter && !eventName.includes(eventFilter.toLowerCase())) ||
            (sportFilter && sportFilter !== sport) ||
            (bookmakerFilter && bookmakerFilter !== bookmakerName)
          ) {
            return;
          }

          const tooltipValues = calculateTooltipValues(
            ratingInputs,
            selectedBetType,
            favorOdds,
            contraOdds
          );
          const rating = calculateRating(
            ratingInputs,
            selectedBetType,
            tooltipValues.contra.total,
            tooltipValues.favor.total
          );

          if (
            rating !== "-" &&
            filterInputs.ratingMin &&
            parseFloat(rating) < parseFloat(filterInputs.ratingMin)
          )
            return;
          if (
            rating !== "-" &&
            filterInputs.ratingMax &&
            parseFloat(rating) > parseFloat(filterInputs.ratingMax)
          )
            return;
          if (filterInputs.oddsMin && favorOdds < parseFloat(filterInputs.oddsMin)) return;
          if (filterInputs.oddsMax && favorOdds > parseFloat(filterInputs.oddsMax)) return;
          if (filterInputs.dateStart && new Date(eventDate) < filterInputs.dateStart) return;
          if (filterInputs.dateEnd && new Date(eventDate) > filterInputs.dateEnd) return;

          triples.push({
            event: { participant1: homeTeam, participant2: awayTeam, eventId },
            bookmaker: bookmakerName,
            date: eventDate,
            tournamentId: sport === "Football" ? 155 : 132,
            apuesta: outcome.name,
            rating: rating === "-" ? -Infinity : parseFloat(rating),
            favor: favorOdds,
            contra: contraOdds,
            sportType: sport,
          });
        });
      });
    });

    triples.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === "date") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else if (sortConfig.key === "event") {
        aValue = `${a.event.participant1} vs ${a.event.participant2}`.toLowerCase();
        bValue = `${b.event.participant1} vs ${b.event.participant2}`.toLowerCase();
      }

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
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
    typeof price === "number" ? price.toFixed(2) : "-";

  const getSportImage = (tournamentId) => {
    // Find the sport whose tournamentIds include the given tournamentId
    for (const [sport, { tournamentIds, image }] of Object.entries(sportImages)) {
      if (tournamentIds.includes(tournamentId)) {
        return image;
      }
    }
    return null;
  };

  const availableBookmakers = Object.keys(bookmakerImages);

  const handleOpenCalculator = (item) => {
    setSelectedEvent({
      date: item.date,
      event: `${item.event.participant1} vs ${item.event.participant2}`,
      bookmaker: item.bookmaker,
      favor: item.favor,
      contra: item.contra,
      rating: item.rating === -Infinity ? "-" : `${item.rating}`,
      bookmakerImage: bookmakerImages[item.bookmaker],
      betfairImage: bookmakerImages["Betfair Exchange"],
      apuesta: item.apuesta,
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
    setCurrentPage(1);
    setRatingModalOpen(false);
  };

  const handleRatingInputChange = (e) => {
    const { name, value } = e.target;
    setTempRatingInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenCommissionModal = () => {
    setTempCommission(commission);
    setCommissionModalOpen(true);
  };

  const handleCloseCommissionModal = () => {
    setCommissionModalOpen(false);
  };

  const handleApplyCommission = () => {
    setCommission(tempCommission);
    setCurrentPage(1);
    setCommissionModalOpen(false);
  };

  const handleOpenFilterModal = () => {
    setTempFilterInputs({ ...filterInputs });
    setFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setFilterModalOpen(false);
  };

  const handleApplyFilter = () => {
    setFilterInputs({ ...tempFilterInputs });
    setCurrentPage(1);
    setFilterModalOpen(false);
  };

  const handleFilterInputChange = (e) => {
    const { name, value } = e.target;
    setTempFilterInputs((prev) => ({
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

  const CommissionModal = () => (
    <div className="modal-overlay" style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
      <div className="modal-content" style={{ backgroundColor: "white", padding: "20px", borderRadius: "5px", width: "400px", maxWidth: "90%" }} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: "10px" }}>Configurar Comisión</h2>
        <div className="tab-content" style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "10px" }}>
            Comisión (%)
            <input
              type="text"
              value={tempCommission}
              onChange={(e) => setTempCommission(e.target.value)}
              style={{ width: "100%", padding: "5px", marginTop: "5px" }}
            />
          </label>
        </div>
        <div className="modal-buttons" style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={handleCloseCommissionModal}
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
            onClick={handleApplyCommission}
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

  const FilterModal = () => (
    <div className="modal-overlay" style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
      <div className="modal-content" style={{ backgroundColor: "white", padding: "20px", borderRadius: "5px", width: "400px", maxWidth: "90%" }} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: "10px" }}>Configurar Filtros</h2>
        <div className="tab-content" style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "10px" }}>
            Rating (%) desde
            <div style={{ display: "flex", gap: "5px" }}>
              <input
                type="text"
                name="ratingMin"
                value={tempFilterInputs.ratingMin}
                onChange={handleFilterInputChange}
                placeholder="Mín"
                style={{ width: "50%", padding: "5px", marginTop: "5px" }}
              />
              <input
                type="text"
                name="ratingMax"
                value={tempFilterInputs.ratingMax}
                onChange={handleFilterInputChange}
                placeholder="Máx"
                style={{ width: "50%", padding: "5px", marginTop: "5px" }}
              />
            </div>
          </label>
          <label style={{ display: "block", marginBottom: "10px" }}>
            Cuotas Bookmaker desde
            <div style={{ display: "flex", gap: "5px" }}>
              <input
                type="text"
                name="oddsMin"
                value={tempFilterInputs.oddsMin}
                onChange={handleFilterInputChange}
                placeholder="Mín"
                style={{ width: "50%", padding: "5px", marginTop: "5px" }}
              />
              <input
                type="text"
                name="oddsMax"
                value={tempFilterInputs.oddsMax}
                onChange={handleFilterInputChange}
                placeholder="Máx"
                style={{ width: "50%", padding: "5px", marginTop: "5px" }}
              />
            </div>
          </label>
          <label style={{ display: "block", marginBottom: "10px" }}>
            Fecha/Hora desde
            <div style={{ display: "flex", gap: "5px" }}>
              <DatePicker
                selected={tempFilterInputs.dateStart}
                onChange={(date) => setTempFilterInputs({ ...tempFilterInputs, dateStart: date })}
                showTimeSelect
                dateFormat="Pp"
                placeholderText="Desde"
                style={{ width: "50%", padding: "5px", marginTop: "5px" }}
              />
              <DatePicker
                selected={tempFilterInputs.dateEnd}
                onChange={(date) => setTempFilterInputs({ ...tempFilterInputs, dateEnd: date })}
                showTimeSelect
                dateFormat="Pp"
                placeholderText="A"
                style={{ width: "50%", padding: "5px", marginTop: "5px" }}
              />
            </div>
          </label>
        </div>
        <div className="modal-buttons" style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={handleCloseFilterModal}
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
            onClick={handleApplyFilter}
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

        {/* Filtros Superiores */}
        <div className="oddsmatcher__filterData" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <label className="oddsMatcher__label" style={{ width: "150px" }}>
           
            <button
              onClick={handleOpenRatingModal}
              style={{
                marginLeft: "5px",
                padding: "5px 10px",
                backgroundColor: "rgba(12, 187, 91, 0.497)",
                color: "white",
                border: "none",
                cursor: "pointer",
                width: "100%",
                display: "flex",
                alignItems: "center",
                borderRadius:"5px",
                justifyContent: "center",
              }}
            >
              <StarRate style={{ marginRight: "5px" }} />
              Rating
            </button>
          </label>
          <label className="oddsMatcher__label" style={{ width: "150px" }}>
           
            <button
              onClick={handleOpenCommissionModal}
              style={{
                marginLeft: "5px",
                padding: "5px 10px",
                backgroundColor: "rgba(12, 187, 91, 0.497)",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius:"5px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AccountBalance style={{ marginRight: "5px" }} />
              Comisión ({commission}%)
            </button>
          </label>
          <label className="oddsMatcher__label" style={{ width: "150px" }}>
            
            <button
              onClick={handleOpenFilterModal}
              style={{
                marginLeft: "5px",
                padding: "5px 10px",
                backgroundColor: "rgba(12, 187, 91, 0.497)",
                color: "white",
                border: "none",
                borderRadius:"5px",
                cursor: "pointer",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FilterList style={{ marginRight: "5px" }} />
              Filtro
            </button>
          </label>
        </div>

        {/* Filtros Inferiores */}
        <div className="oddsmatcher__filterData" style={{ display: "flex", gap: "10px" }}>
          <label className="oddsMatcher__label" style={{ width: "150px",fontWeight:"bold",marginBottom:"5px" }}>
            Evento
            <input
              type="text"
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              placeholder="Ej: Rosario vs Andes"
              style={{color:"white", marginLeft: "5px", padding: "5px", width: "100%",borderRadius:"5px",marginTop:"5px",marginLeft:"-1px" }}
            />
          </label>
          <label className="oddsMatcher__label" style={{ width: "150px",fontWeight:"bold",marginBottom:"5px" }}>
            Deporte
            <select
              value={sportFilter}
              onChange={(e) => setSportFilter(e.target.value)}
              style={{ color:"white", marginLeft: "5px",backgroundColor:"#0B7348", padding: "5px", width: "100%", borderRadius:"5px",marginTop:"5px",marginLeft:"-1px" }}
            >
              <option value="">Todos</option>
              <option value="Football">Fútbol</option>
              <option value="Basketball">Baloncesto</option>
            </select>
          </label>
          <label className="oddsMatcher__label" style={{ width: "150px",fontWeight:"bold",marginBottom:"5px" }}>
            Bookmaker
            <select
              value={bookmakerFilter}
              onChange={(e) => setBookmakerFilter(e.target.value)}
              style={{ color:"white", padding: "5px", width: "100%",marginTop:"5px",marginLeft:"-1px",borderRadius:"5px" }}
            >
              <option value="">Todos</option>
              {availableBookmakers.map((bookmaker) => (
                <option style={{color:"black"}} key={bookmaker} value={bookmaker}>
                  {bookmaker}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="table-wrapper">
          <table className="betting-table">
            <thead className="betting-thead">
              <tr>
                <th onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>
                  FECHA/HORA {sortConfig.key === "date" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("sportType")} style={{ cursor: "pointer" }}>
                  DEPORTE {sortConfig.key === "sportType" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("event")} style={{ cursor: "pointer" }}>
                  EVENTO {sortConfig.key === "event" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("apuesta")} style={{ cursor: "pointer" }}>
                  APUESTA {sortConfig.key === "apuesta" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th>CALC</th>
                <th onClick={() => handleSort("rating")} style={{ cursor: "pointer" }}>
                  RATING (%) {sortConfig.key === "rating" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("bookmaker")} style={{ cursor: "pointer" }}>
                  BOOKMAKER {sortConfig.key === "bookmaker" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("favor")} style={{ cursor: "pointer" }}>
                  FAVOR {sortConfig.key === "favor" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("exchange")} style={{ cursor: "pointer" }}>
                  EXCHANGE {sortConfig.key === "exchange" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("contra")} style={{ cursor: "pointer" }}>
                  CONTRA {sortConfig.key === "contra" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
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
                  },
                  index
                ) => {
                  const sportImage = getSportImage(tournamentId);
                  return (
                    <tr
                      key={`${event.eventId}-${bookmaker}-${apuesta}-${index}`}
                    >
                      <td>{new Date(date).toLocaleString()}</td>
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
                          "Football"
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
                            })
                          }
                          style={{
                            color: "white",
                            padding: "10px 10px",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "4px"
                          }}
                        >
                          <Calculate style={{ fontSize: "30px",marginLeft:"30px" }} />
                        </button>
                      </td>
                      <td>
                        {rating === -Infinity ? "-" : rating}
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
                          src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972626/betfair_qlonut.gif"
                          alt="Betfair Exchange"
                          width={80}
                          height={80}
                          style={{ objectFit: "contain" }}
                        />
                      </td>
                      <td>{formatPrice(contra)}</td>
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
              borderRadius:"5px"
            }}
          >
            Anterior
          </button>
          <span style={{fontFamily:"Gagalin",fontWeight:"100"}}>
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
              borderRadius:"5px"
            }}
          >
            Siguiente
          </button>
          <p style={{fontFamily:"Gagalin",fontWeight:"100"}}>
            Mostrando {startIndex + 1} - {Math.min(endIndex, totalItems)} de{" "}
            {totalItems} resultados
          </p>
        </div>
      </div>
      {selectedEvent && (
        <Calculator
          eventData={selectedEvent}
          onClose={handleCloseCalculator}
          initialBetType={selectedBetType}
        />
      )}
      {ratingModalOpen && <RatingModal />}
      {commissionModalOpen && <CommissionModal />}
      {filterModalOpen && <FilterModal />}
    </div>
  );
}