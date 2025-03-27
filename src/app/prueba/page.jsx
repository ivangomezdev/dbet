"use client";
import {  useState } from "react";
import Image from "next/image";
import "./casino-background.css";



const bookies = {
  32: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972626/paf_r32yqs.png",
  107: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972626/107_ot40na.png",
  108: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972626/108_wvuxur.png",
  106: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972626/106_ou8ot9.png",
  105: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972625/105_kjtrkr.png",
  104: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972625/104_hkhpba.png",
  102: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972625/102_quu4ih.png",
  76: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972625/76_h8okek.png",
  103: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972625/103_mvvit2.png",
  78: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972625/78_s9dizl.png",
  75: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972625/75_btwvye.png",
  74: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972625/74_vrjwwq.png",
  73: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972625/73_qsj5kc.png",
  71: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972625/71_ij3po0.png",
  68: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972625/68_vvfrn3.png",
  69: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972624/69_dlxsmr.png",
  64: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972624/64_oqdipm.png",
  65: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972624/65_jnk86u.png",
  62: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972624/62_vkiemv.png",
  61: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972624/61_tqjhc4.png",
  56: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972624/56_umynwv.png",
  55: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972624/55_okomtx.png",
  59: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972624/59_elv93x.png",
  57: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972624/57_kh24sc.png",
  53: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972623/53_czwofu.gif",
  54: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972623/54_q8groq.png",
  52: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972623/52_eaudsi.png",
  41: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972623/41_jjbhgr.png",
  48: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972623/48_yowyxj.png",
  47: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972623/47_qbv8gd.png",
  45: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972623/45_b14yj5.png",
  43: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972623/43_xpqbyk.gif",
  40: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972623/40_xnhng0.png",
  39: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972622/39_fg0jh8.png",
  1: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972622/1_x6vxy4.gif",
  42: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972622/42_qr1thq.png",
  20: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972622/20_ykoo4y.gif",
  29: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972622/29_r5mmzr.png",
  7: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972622/7_u7bjom.gif",
  46: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742972623/46_dummy.png",
};

export default function BettingTable() {

  const [currentPage, setCurrentPage] = useState(1); // Página actual


 
  // Funciones para navegar entre páginas
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="me__content betting-table-container">
      <h2 className="betting-table-title">Apuestas Disponibles</h2>
      <div className="table-wrapper">
        <table className="betting-table">
          <thead>
            <tr>
              <th>FECHA/HORA</th>
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
          
          </tbody>
        </table>
      </div>

      {/* Controles de paginación */}
      <div className="pagination-controls" style={{ marginTop: "10px", textAlign: "center" }}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          style={{ marginRight: "10px" }}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          style={{ marginLeft: "10px" }}
        >
          Siguiente
        </button>
      </div>

      {loading && <div className="loading-indicator">Cargando más datos...</div>}
      {!loading && data.length < 500 && (
        <div className="warning">
          Solo se encontraron {data.length} apuestas únicas de las 500 deseadas tras revisar la API.
        </div>
      )}
    </div>
  );
}