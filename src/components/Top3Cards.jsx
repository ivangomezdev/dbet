"use client";

import { useAtom } from "jotai";
import { useState, useEffect, useMemo } from "react";
import { tournamentsDataAtom, oddsDataAtom } from "../lib/atom";
import "./top3Cards.css";

export default function TopEventsCards() {
  const [tournamentsData] = useAtom(tournamentsDataAtom);
  const [oddsData] = useAtom(oddsDataAtom);
  const [selectedBetType] = useState("Dinero real");
  const [teamLogos, setTeamLogos] = useState({});

  const [ratingInputs] = useState({
    favorImporte: "100",
    contraImporte: "7",
    dineroReal: "100",
    bonos: "100",
    rolloverRestante: "100",
    ratingFuturo: "0.95",
    importeReembolso: "100",
  });

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
      contraAmount = (favorImporte * favorCuotaValue) / (contraCuotaValue - commissionInput) || 0;
      favorBookmakerProfit = favorImporte * favorCuotaValue - favorImporte;
      favorBetfairProfit = -(contraAmount * (contraCuotaValue - 1));
      favorTotal = favorBookmakerProfit + favorBetfairProfit;
      contraBookmakerProfit = -favorImporte;
      contraBetfairProfit = contraAmount * (1 - commissionInput);
      contraTotal = contraBookmakerProfit + contraBetfairProfit;
    } else if (betType === "Apuesta gratis") {
      contraAmount = (favorImporte * (favorCuotaValue - 1)) / (contraCuotaValue - commissionInput) || 0;
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
      contraAmount = ((favorImporte * favorCuotaValue) - importeReembolso) / (contraCuotaValue - commissionInput) || 0;
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
    const excludedBookmakers = ["Bet365 (no latency)", "Betfair Sportsbook", "Betfair Exchange"];

    Object.values(oddsData).forEach((eventOdds) => {
      console.log("Raw team names:", eventOdds.home, eventOdds.participant1, eventOdds.away, eventOdds.participant2);
      const homeTeam = (eventOdds.home || eventOdds.participant1 || "Team 1").replace(/[^a-zA-Z0-9\s]/g, "").trim();
      const awayTeam = (eventOdds.away || eventOdds.participant2 || "Team 2").replace(/[^a-zA-Z0-9\s]/g, "").trim();
      const eventId = eventOdds.eventId;
      const eventDate = eventOdds.date;
      const homeTeamId = eventOdds.home_team_key || null;
      const awayTeamId = eventOdds.away_team_key || null;

      if (!eventOdds.bookmakers) return;

      const outcomes = [
        { id: "101", name: homeTeam, key: "home" },
        { id: "102", name: "Empate", key: "draw" },
        { id: "103", name: awayTeam, key: "away" },
      ];

      Object.entries(eventOdds.bookmakers).forEach(([bookmakerName, bookmakerData]) => {
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

          triples.push({
            event: { participant1: homeTeam, participant2: awayTeam, eventId },
            bookmaker: bookmakerName,
            date: eventDate,
            rating: rating === "-" ? -Infinity : parseFloat(rating),
            homeTeamId,
            awayTeamId,
          });
        });
      });
    });

    triples.sort((a, b) => b.rating - a.rating);
    return triples.slice(0, 3);
  };

  const topThreeEvents = useMemo(() => getEventBookmakerOutcomeTriples(), [oddsData]);

  useEffect(() => {
    const normalizeTeamName = (name) => {
      const cleanName = name.replace(/[^a-zA-Z0-9\s]/g, "").trim();
      const aliases = {
        "Man Utd": "Manchester United",
        "Man City": "Manchester City",
        "Spurs": "Tottenham",
        "Leicester City": "Leicester",
      };
      return aliases[cleanName] || cleanName;
    };

    const fetchTeamLogos = async () => {
      const cachedLogos = JSON.parse(localStorage.getItem("teamLogos") || "{}");
      const newLogos = { ...teamLogos, ...cachedLogos };

      for (const event of topThreeEvents) {
        console.log("Event teams:", event.event.participant1, event.event.participant2);
        const teams = [event.event.participant1, event.event.participant2].filter(Boolean);

        for (const teamName of teams) {
          const normalizedTeamName = normalizeTeamName(teamName);
          if (!newLogos[teamName]) {
            try {
              const url = `/api/teams?teamName=${encodeURIComponent(normalizedTeamName)}`;
              console.log(`Fetching logo for ${teamName}: ${url}`);
              const response = await fetch(url);
              if (!response.ok) {
                console.error(`Failed to fetch logo for ${teamName}. Status: ${response.status}, Response:`, await response.text());
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              const data = await response.json();

              if (data.logoUrl) {
                newLogos[teamName] = data.logoUrl;
              } else {
                newLogos[teamName] = null;
              }
            } catch (error) {
              console.error(`Error fetching logo for ${teamName}:`, error);
              newLogos[teamName] = null;
            }
          }
        }
      }

      setTeamLogos(newLogos);
      localStorage.setItem("teamLogos", JSON.stringify(newLogos));
    };

    if (topThreeEvents.length > 0) {
      fetchTeamLogos();
    }
  }, [topThreeEvents]);

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    }).toUpperCase();
  };

  const fallbackLogo = "https://via.placeholder.com/40x40.png?text=Logo";

  return (
    <div className="events-container">
      {topThreeEvents.map(({ event, bookmaker, date, rating }, index) => (
        <div style={{ display: "flex" }} key={`${event.eventId}-${bookmaker}-${index}`} className="event-card">
          <div>
            <div className="date">{formatDate(date)}</div>
            <div className="teams">
              <div className="team-container">
                {teamLogos[event.participant1] ? (
                  <img
                    src={teamLogos[event.participant1]} // Uses logoUrl from API (strBadge)
                    alt={`${event.participant1} logo`}
                    className="team-logo"
                    onError={(e) => {
                      console.error(`Failed to load logo for ${event.participant1}: ${teamLogos[event.participant1]}`);
                      e.target.src = fallbackLogo;
                    }}
                  />
                ) : (
                  <div className="team-logo-placeholder">No Logo</div>
                )}
                <span className="team">{event.participant1}</span>
              </div>
              <div className="vs">VS</div>
              <div className="team-container">
                {teamLogos[event.participant2] ? (
                  <img
                    src={teamLogos[event.participant2]} // Uses logoUrl from API (strBadge)
                    alt={`${event.participant2} logo`}
                    className="team-logo"
                    onError={(e) => {
                      console.error(`Failed to load logo for ${event.participant2}: ${teamLogos[event.participant2]}`);
                      e.target.src = fallbackLogo;
                    }}
                  />
                ) : (
                  <div className="team-logo-placeholder">No Logo</div>
                )}
                <span className="team">{event.participant2}</span>
              </div>
            </div>
            <div className="bookmaker">
              Bookmaker: <span style={{ fontWeight: "bold", color: "#FE9610" }}>{bookmaker}</span>
            </div>
            <div className="rating">
              Rating: <span style={{ fontWeight: "bold", color: "#FE9610" }}>
                {rating === -Infinity ? "-" : `${rating}%`}
              </span>
              
            </div>
            <div>
         
            </div>
          </div>
          <img
            src="https://res.cloudinary.com/dllkefj8m/image/upload/v1746043395/Sin_t%C3%ADtulo-removebg-preview_pt6cpz.png"
            style={{  width: "120px", height: "150px", position: "relative" }}
            alt=""
          />
        </div>
      ))}
    
    </div>
  );
}