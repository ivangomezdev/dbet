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
                  color: "orange",
                  "&.Mui-checked": { color: "orange" },
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
                value={inputs.dineroReal}
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
                value={inputs.bonos}
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
                value={inputs.rolloverRestante}
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
                value={inputs.ratingFuturo}
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
                value={inputs.importeReembolso}
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
  const rolloverRestante = parseFloat(inputs.rolloverRestante) || 0;
  const ratingFuturo = parseFloat(inputs.ratingFuturo) || 0;
  const importeReembolso = parseFloat(inputs.importeReembolso) || 0;

  // Commission: Use input / 100 for most bet types, but 0.07 for Apuesta Gratis to match Excel
  const commission = betType === "Apuesta gratis" ? 0.07 : commissionInput / 100;

  let contraAmount, favorBookmakerProfit, favorBetfairProfit, favorTotal;
  let contraBookmakerProfit, contraBetfairProfit, contraTotal;

  if (betType === "Dinero real") {
    contraAmount =
      (favorImporte * favorCuota) / (contraCuota - commission) || 0;
    favorBookmakerProfit = favorImporte * favorCuota - favorImporte;
    favorBetfairProfit = -(contraAmount * (contraCuota - 1));
    favorTotal = favorBookmakerProfit + favorBetfairProfit;
    contraBookmakerProfit = -favorImporte;
    contraBetfairProfit = contraAmount * (1 - commission);
    contraTotal = contraBookmakerProfit + contraBetfairProfit;
  } else if (betType === "Apuesta gratis") {
    // Apuesta Gratis calculations
    contraAmount =
      (favorImporte * (favorCuota - 1)) / (contraCuota - commission) || 0;
    favorBookmakerProfit = favorImporte * favorCuota - favorImporte;
    favorBetfairProfit = -(contraAmount * (contraCuota - 1));
    favorTotal = favorBookmakerProfit + favorBetfairProfit;
    contraBookmakerProfit = 0;
    contraBetfairProfit = contraAmount * (1 - commission);
    contraTotal = contraBookmakerProfit + contraBetfairProfit;
  } else if (betType === "RollOver") {
    const totalFavorImporte = dineroReal + bonos;
    contraAmount =
      ((totalFavorImporte * favorCuota) -
       Math.max(0, rolloverRestante - totalFavorImporte) * (1 - ratingFuturo)) /
      (contraCuota - commission) || 0;
    favorBookmakerProfit =
      ((totalFavorImporte * favorCuota) - dineroReal) -
      Math.max(0, (rolloverRestante - totalFavorImporte) * (1 - ratingFuturo));
    favorBetfairProfit = -(contraAmount * (contraCuota - 1));
    favorTotal = favorBookmakerProfit + favorBetfairProfit;
    contraBookmakerProfit = -dineroReal;
    contraBetfairProfit = contraAmount * (1 - commission);
    contraTotal = contraBookmakerProfit + contraBetfairProfit;
  } else if (betType === "Reembolso") {
    contraAmount =
      ((favorImporte * favorCuota) - importeReembolso) / (contraCuota - commission) || 0;
    favorBookmakerProfit = favorImporte * favorCuota - favorImporte;
    favorBetfairProfit = -(contraAmount * (contraCuota - 1));
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

// Rating Calculation
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
    // RATING: ((C2 + H8) / C2)
    rating = ((favorImporte + contraTotalValue) / favorImporte) * 100;
  } else if (betType === "Apuesta gratis") {
    // RATING: (H8 / C2) * 100
    rating = (contraTotalValue / favorImporte) * 100;
  } else if (betType === "Reembolso") {
    // RATING: H8 / C3
    rating = (contraTotalValue / importeReembolso) * 100;
  } else if (betType === "RollOver") {
    // RATING: H8 / (C2 + C3)
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
      <div
        className="calculator__results-cell"
        style={{
          color: tooltipValues.favor.total > 0 ? "green" : tooltipValues.favor.total < 0 ? "red" : "black",
        }}
      >
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
      <div
        className="calculator__results-cell"
        style={{
          color: tooltipValues.contra.total > 0 ? "green" : tooltipValues.contra.total < 0 ? "red" : "black",
        }}
      >
        {tooltipValues.contra.total >= 0 ? "+" : "-"}€
        {Math.abs(tooltipValues.contra.total)}
      </div>
    </div>
  </div>
);

// Main Calculator Component
const Calculator = ({ eventData, onClose, initialBetType }) => {
  const [betType, setBetType] = useState(initialBetType || "Dinero real");
  const [inputs, setInputs] = useState({
    favorImporte: "100", // Default for Dinero real, Apuesta gratis, Reembolso
    favorCuota: eventData.favor ? eventData.favor.toFixed(2) : "",
    contraImporte: "7", // Default commission as percentage
    contraCuota: eventData.contra ? eventData.contra.toFixed(2) : "",
    dineroReal: "100", // Default for RollOver
    bonos: "100", // Default for RollOver
    rolloverRestante: "100", // Updated default for RollOver
    ratingFuturo: "0.95", // Default for RollOver
    importeReembolso: "100", // Default for Reembolso
  });

  // Handle scroll locking and Esc key
  useEffect(() => {
    document.body.classList.add("calculator-open");

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

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
                  <div className="calculator__odds-title">{eventData.apuesta}</div>
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
                  <div className="calculator__odds-title">{eventData.apuesta}</div>
                  <div className="calculator__odds-value calculator__odds-value--contra">
                    {inputs.contraCuota}
                  </div>
                  <div className="calculator__bookmaker">
                    <img
                      src="https://res.cloudinary.com/dllkefj8m/image/upload/v1746469540/betfa_bnuz8u.gif"
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
              <div
                className="calculator__profit-amount"
                style={{
                  color: tooltipValues.contra.total > 0 ? "green" : tooltipValues.contra.total < 0 ? "red" : "black",
                }}
              >
                {tooltipValues.contra.total >= 0 ? "+" : "-"}€
                {Math.abs(tooltipValues.contra.total)}
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