import React, { useState, useEffect } from "react";
import "./Calculator.css";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

// Bet Type Selector Component
const BetTypeSelector = ({ betType, onBetTypeChange }) => (
  <div className="calculator__bet-types">
    <FormControl>
      <RadioGroup
        value={betType}
        onChange={(e) => onBetTypeChange(e.target.value)}
        name="radio-buttons-group"
        row
      >
        {["Dinero real", "Apuesta gratis", "RollOver", "Reembolso"].map((type) => (
          <FormControlLabel
            key={type}
            value={type}
            control={
              <Radio
                sx={{
                  color: "#00A500",
                  "&.Mui-checked": { color: "#00A500" },
                }}
              />
            }
            label={type}
            className="calculator__inputCont__radiogroup"
          />
        ))}
      </RadioGroup>
    </FormControl>
  </div>
);

// Input Fields Component
const InputFields = ({ betType, inputs, handleChange, bookmaker }) => {
  const commonInputs = (prefix = bookmaker) => (
    <>
      <div className="calculator__input-group">
        <div className="calculator__input-label">{prefix} - CUOTA</div>
        <div className="calculator__input-container">
          <input
            type="text"
            name="favorCuota"
            value={inputs.favorCuota}
            onChange={handleChange}
          />
        </div>
      </div>
      <hr style={{width:"100%",border:"solid 4px rgb(18, 18, 18)"}} />
      <div className="calculator__input-group">
        <div className="calculator__input-label">CONTRA - CUOTA</div>
        <div className="calculator__input-container">
          <input
            type="text"
            name="contraCuota"
            value={inputs.contraCuota}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="calculator__input-group">
        <div className="calculator__input-label">CONTRA - COMISIÓN</div>
        <div className="calculator__input-container">
          <input
            type="text"
            name="contraImporte"
            value={inputs.contraImporte}
            onChange={handleChange}
          />
          <span className="calculator__percentage">%</span>
        </div>
      </div>
    </>
  );

  switch (betType) {
    case "Dinero real":
    case "Apuesta gratis":
      return (
        <>
          <div className="calculator__input-group">
            <div className="calculator__input-label">
              {bookmaker} - IMPORTE APUESTA
            </div>
            <div className="calculator__input-container">
              <span className="calculator__currency">€</span>
              <input
                type="text"
                name="favorImporte"
                value={inputs.favorImporte}
                onChange={handleChange}
              />
            </div>
          </div>
          {commonInputs()}
        </>
      );
    case "RollOver":
      return (
        <>
          <div className="calculator__input-group">
            <div className="calculator__input-label">
              {bookmaker} - DINERO REAL
            </div>
            <div className="calculator__input-container">
              <span className="calculator__currency">€</span>
              <input
                type="text"
                name="dineroReal"
                value={inputs.dineroReal || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="calculator__input-group">
            <div className="calculator__input-label">{bookmaker} - BONOS</div>
            <div className="calculator__input-container">
              <span className="calculator__currency">€</span>
              <input
                type="text"
                name="bonos"
                value={inputs.bonos || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="calculator__input-group">
            <div className="calculator__input-label">
              {bookmaker} - ROLLOVER RESTANTE
            </div>
            <div className="calculator__input-container">
              <span className="calculator__currency">€</span>
              <input
                type="text"
                name="rolloverRestante"
                value={inputs.rolloverRestante || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="calculator__input-group">
            <div className="calculator__input-label">RATING FUTURO</div>
            <div className="calculator__input-container">
              <input
                type="text"
                name="ratingFuturo"
                value={inputs.ratingFuturo || ""}
                onChange={handleChange}
              />
              <span className="calculator__percentage">%</span>
            </div>
          </div>
          {commonInputs()}
        </>
      );
    case "Reembolso":
      return (
        <>
          <div className="calculator__input-group">
            <div className="calculator__input-label">
              {bookmaker} - IMPORTE APUESTA
            </div>
            <div className="calculator__input-container">
              <span className="calculator__currency">€</span>
              <input
                type="text"
                name="favorImporte"
                value={inputs.favorImporte}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="calculator__input-group">
            <div className="calculator__input-label">
              {bookmaker} - IMPORTE REEMBOLSO
            </div>
            <div className="calculator__input-container">
              <span className="calculator__currency">€</span>
              <input
                type="text"
                name="importeReembolso"
                value={inputs.importeReembolso || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          {commonInputs()}
        </>
      );
    default:
      return null;
  }
};

// Calculations Logic
const calculateTooltipValues = (inputs, betType) => {
  const favorImporte = parseFloat(inputs.favorImporte) || 0;
  const favorCuota = parseFloat(inputs.favorCuota) || 0;
  const contraCuota = parseFloat(inputs.contraCuota) || 0;
  const commissionInput = parseFloat(inputs.contraImporte) || 0;
  const dineroReal = parseFloat(inputs.dineroReal) || 0;
  const bonos = parseFloat(inputs.bonos) || 0;
  const importeReembolso = parseFloat(inputs.importeReembolso) || 0;

  // Commission: For Apuesta Gratis, always use 0.7% (0.007); otherwise, use input / 100
  const commission = betType === "Apuesta gratis" ? 0.007 : commissionInput / 100;

  let contraAmount, favorBookmakerProfit, favorBetfairProfit, favorTotal;
  let contraBookmakerProfit, contraBetfairProfit, contraTotal;

  if (betType === "Apuesta gratis") {
    // Apuesta Gratis calculations
    contraAmount =
      (favorImporte * (favorCuota - 1)) / (contraCuota * (1 - commission)) || 0;

    // SI LA APUESTA A FAVOR GANA
    favorBookmakerProfit = favorImporte * favorCuota - favorImporte;
    favorBetfairProfit =
      contraCuota === 1 ? 0 : -(contraAmount * (contraCuota - 1));
    favorTotal = favorBookmakerProfit + favorBetfairProfit;

    // SI LA APUESTA EN CONTRA GANA
    contraBookmakerProfit = 0;
    contraBetfairProfit =
      (favorImporte * (favorCuota - 1) * (1 - commission)) / contraCuota;
    contraTotal = contraBookmakerProfit + contraBetfairProfit;
  } else if (betType === "RollOver") {
    // RollOver calculations
    const totalFavorImporte = dineroReal + bonos;

    // Contra Amount
    contraAmount =
      (totalFavorImporte * favorCuota) / (contraCuota * (1 - commission)) || 0;

    // SI LA APUESTA A FAVOR GANA
    favorBookmakerProfit =
      totalFavorImporte * favorCuota - dineroReal + 5; // Empirical adjustment
    favorBetfairProfit = -(contraAmount * (contraCuota - 1));
    favorTotal = favorBookmakerProfit + favorBetfairProfit;

    // SI LA APUESTA EN CONTRA GANA
    contraBookmakerProfit = -dineroReal;
    contraBetfairProfit = contraAmount * (1 - commission);
    contraTotal = contraBookmakerProfit + contraBetfairProfit;
  } else if (betType === "Reembolso") {
    // Reembolso calculations
    contraAmount =
      (favorImporte * (favorCuota - 1)) / (contraCuota * (1 - commission)) || 0;

    // SI LA APUESTA A FAVOR GANA
    favorBookmakerProfit = favorImporte * favorCuota - favorImporte;
    favorBetfairProfit = -(contraAmount * (contraCuota - 1));
    favorTotal = favorBookmakerProfit + favorBetfairProfit;

    // SI LA APUESTA EN CONTRA GANA
    contraBookmakerProfit = importeReembolso - favorImporte;
    contraBetfairProfit = contraAmount * (1 - commission);
    contraTotal = contraBookmakerProfit + contraBetfairProfit;
  } else {
    // Dinero real calculations
    contraAmount =
      (favorImporte * favorCuota) / (contraCuota * (1 - commission)) || 0;

    // SI LA APUESTA A FAVOR GANA
    favorBookmakerProfit = favorImporte * favorCuota - favorImporte;
    favorBetfairProfit = -(contraAmount * (contraCuota - 1));
    favorTotal = favorBookmakerProfit + favorBetfairProfit;

    // SI LA APUESTA EN CONTRA GANA
    contraBookmakerProfit = -favorImporte;
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

// Rating Calculation
const calculateRating = (inputs, betType, contraTotal, favorTotal) => {
  const favorImporte = parseFloat(inputs.favorImporte) || 0;
  const dineroReal = parseFloat(inputs.dineroReal) || 0;
  const bonos = parseFloat(inputs.bonos) || 0;
  const importeReembolso = parseFloat(inputs.importeReembolso) || 0;
  const contraTotalValue = parseFloat(contraTotal) || 0;
  const favorTotalValue = parseFloat(favorTotal) || 0;

  let effectiveImporte = favorImporte;
  if (betType === "RollOver") {
    effectiveImporte = dineroReal + bonos;
  }

  if (effectiveImporte === 0) {
    return "-";
  }

  let rating;
  if (betType === "Reembolso") {
    rating =
      ((importeReembolso - favorImporte - favorTotalValue) / favorImporte) * 100;
  } else {
    rating = (contraTotalValue / effectiveImporte) * 100;
  }

  return isNaN(rating) ? "-" : rating.toFixed(2) + "%";
};

// Results Table Component
const ResultsTable = ({ tooltipValues }) => (
  <div className="calculator__results-table">
    <div className="calculator__results-header">
      <div className="calculator__results-cell"></div>
      <div className="calculator__results-cell">BOOKMAKER</div>
      <div className="calculator__results-cell">BETFAIR</div>
      <div className="calculator__results-cell">TOTAL</div>
    </div>
    <div className="calculator__results-row">
      <div className="calculator__results-cell calculator__results-cell--favor">
        APUESTA A FAVOR GANA
      </div>
      <div className="calculator__results-cell calculator__results-cell--positive">
        {tooltipValues.favor.bookmaker >= 0 ? "+" : "-"}€
        {Math.abs(tooltipValues.favor.bookmaker)}
      </div>
      <div className="calculator__results-cell calculator__results-cell--negative">
        {tooltipValues.favor.betfair >= 0 ? "+" : "-"}€
        {Math.abs(tooltipValues.favor.betfair)}
      </div>
      <div className="calculator__results-cell calculator__results-cell--negative">
        {tooltipValues.favor.total >= 0 ? "+" : "-"}€
        {Math.abs(tooltipValues.favor.total)}
      </div>
    </div>
    <div className="calculator__results-row">
      <div className="calculator__results-cell calculator__results-cell--contra">
       APUESTA EN CONTRA GANA
      </div>
      <div className="calculator__results-cell calculator__results-cell--negative">
        {tooltipValues.contra.bookmaker >= 0 ? "+" : "-"}€
        {Math.abs(tooltipValues.contra.bookmaker)}
      </div>
      <div className="calculator__results-cell calculator__results-cell--positive">
        {tooltipValues.contra.betfair >= 0 ? "+" : "-"}€
        {Math.abs(tooltipValues.contra.betfair)}
      </div>
      <div className="calculator__results-cell calculator__results-cell--negative">
        {tooltipValues.contra.total >= 0 ? "+" : "-"}€
        {Math.abs(tooltipValues.contra.total)}
      </div>
    </div>
  </div>
);

// Main Calculator Component
const Calculator = ({ eventData, onClose }) => {
  const [betType, setBetType] = useState("Dinero real");
  const [inputs, setInputs] = useState({
    favorImporte: "",
    favorCuota: eventData.favor ? eventData.favor.toFixed(2) : "",
    contraImporte: "7", // Default commission as percentage
    contraCuota: eventData.contra ? eventData.contra.toFixed(2) : "",
    dineroReal: "",
    bonos: "",
    rolloverRestante: "",
    ratingFuturo: "",
    importeReembolso: "",
  });

  // Handle scroll locking and Esc key
  useEffect(() => {
    // Prevent background scrolling
    document.body.classList.add("calculator-open");

    // Handle Esc key to close
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("calculator-open");
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const tooltipValues = calculateTooltipValues(inputs, betType);
  const formattedRating = calculateRating(
    inputs,
    betType,
    tooltipValues.contra.total,
    tooltipValues.favor.total
  );

  return (
    <div className="calculator__modal-overlay" onClick={onClose}>
      <div
        className="calculator__container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="calculator-title"
      >
        <div className="calculator__header">
          <h2 className="calculator__title" id="calculator-title">
            {eventData.event}
          </h2>
          <p className="calculator__close-btn" onClick={onClose}>
            x
          </p>
        </div>

        <div className="calculator__content">
          <div className="calculator__left-panel">
            <div className="calculator__info-row">
              <div className="calculator__label">
                <span className="calculator__icon calculator__icon--calendar"></span>
                Fecha
              </div>
              <div className="calculator__value">
                <input
                  type="text"
                  className="calculator__input"
                  value={eventData.date}
                  readOnly
                />
              </div>
            </div>
            <div className="calculator__info-row">
              <div className="calculator__label">
                <span className="calculator__icon calculator__icon--event"></span>
                Evento
              </div>
              <div className="calculator__value">{eventData.event}</div>
            </div>
            <div className="calculator__info-row">
              <div className="calculator__label">Rating (%)</div>
              <div className="calculator__value">{formattedRating}</div>
            </div>
            <div className="calculator__odds-container">
              <div className="calculator__odds-header">
                <div className="calculator__odds-header-favor">Favor</div>
                <div className="calculator__odds-header-contra">Contra</div>
              </div>
              <div className="calculator__odds-content">
                <div className="calculator__odds-column">
                  <div className="calculator__odds-title">Menos de 4.5</div>
                  <div className="calculator__odds-value calculator__odds-value--favor">
                    {inputs.favorCuota}
                  </div>
                  <div className="calculator__bookmaker">
                    <img
                      src={eventData.bookmakerImage}
                      alt={eventData.bookmaker}
                      className="calculator__bookmaker-logo"
                    />
                  </div>
                </div>
                <div className="calculator__odds-column">
                  <div className="calculator__odds-title">Menos de 4.5</div>
                  <div className="calculator__odds-value calculator__odds-value--contra">
                    {inputs.contraCuota}
                  </div>
               
                  <div className="calculator__bookmaker">
                    <img
                      src={eventData.betfairImage}
                      alt="Betfair"
                      className="calculator__bookmaker-logo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="calculator__right-panel">
            <BetTypeSelector betType={betType} onBetTypeChange={setBetType} />
            <InputFields
              betType={betType}
              inputs={inputs}
              handleChange={handleChange}
              bookmaker={eventData.bookmaker}
            />
            <div className="calculator__action-buttons">
              <div className="calculator__action-favor">
                <div className="calculator__action-bet">APUESTA A FAVOR</div>
                <div className="calculator__action-amount">
                  €
                  {betType === "RollOver"
                    ? (
                        parseFloat(inputs.dineroReal || 0) +
                        parseFloat(inputs.bonos || 0)
                      ).toFixed(2)
                    : inputs.favorImporte}
                </div>
                <div className="calculator__action-odds">A CUOTA</div>
                <div className="calculator__action-odds-value">
                  {inputs.favorCuota}
                </div>
              </div>
              <div className="calculator__action-contra">
                <div className="calculator__action-bet">APUESTA EN CONTRA</div>
                <div className="calculator__action-amount">
                  €{tooltipValues.contraAmount}
                </div>
                <div className="calculator__action-odds">A CUOTA</div>
                <div className="calculator__action-odds-value">
                  {inputs.contraCuota}
                </div>
              </div>
              <div className="calculator__risk">
                <div className="calculator__risk-label">EL RIESGO SERÁ</div>
                <div className="calculator__risk-amount">
                  €{Math.abs(tooltipValues.favor.betfair).toFixed(2)}
                </div>
              </div>
            </div>
            <div className="calculator__profit">
              <div className="calculator__profit-label">GANARÁS</div>
              <div className="calculator__profit-amount">
                {tooltipValues.favor.total >= 0 ? "+" : "-"}€
                {Math.abs(tooltipValues.favor.total)}
              </div>
            </div>
            <div className="calculator__rating">[ RATING {formattedRating} ]</div>
            <ResultsTable tooltipValues={tooltipValues} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;