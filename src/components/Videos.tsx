"use client";

import { useState } from "react";
import Image from "next/image";
import VerifiedIcon from '@mui/icons-material/Verified';
import "./videos.css";

// Datos de ejemplo para simular la API
const channelData = {
  name: "GUÍAS",
  isVerified: true,
 
  description:
    "Todo lo que necesitas saber",
  profileImage: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742334432/BRAIN_tfew9b.png",
};

const videoData = [
  {
    id: 1,
    title: "Video 1 prueba dsadasdasaasd asdasdasd ",
    thumbnail: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742489438/1_ilbchq.png",
    time: "hace 2 horas",
    duration: "15:24",
  },
  {
    id: 2,
    title:
      "Video 2 prueba asdasdasdasdasdasdasdasd",
    thumbnail: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742489438/2_ev9m72.png",
    time: "hace 20 horas",
    duration: "5:52",
  },
  {
    id: 3,
    title: "Video 3 prueba asdasdasdasdasdasdasdasd",
    thumbnail: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742489434/3_opp8bh.png",
    time: "hace 1 día",
    duration: "6:25",
  },
  {
    id: 4,
    title: "Video 4 prueba asdasd asdasdasdasd",
    thumbnail: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742489435/4_chzk5n.png",
    time: "hace 1 día",
    duration: "10:20",
  },
  {
    id: 5,
    title: "Video 5 prueba asdas asdasdasdasdasdasd ",
    thumbnail: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742489438/1_ilbchq.png",
    time: "hace 2 días",
    duration: "6:01",
  },
  {
    id: 6,
    title: "Video 6 prueba adsasd asdasdasdasd",
    thumbnail: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742489438/2_ev9m72.png",
    time: "hace 2 días",
    duration: "10:34",
  },
  {
    id: 7,
    title: "Video 7 pruebaasd adsd asdasdasdasd",
    thumbnail: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742489434/3_opp8bh.png",
    time: "hace 3 días",
    duration: "6:42",
  },
  {
    id: 8,
    title: "Video 6 prueba asd asdasdasdasd ",
    thumbnail: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742489435/4_chzk5n.png",
    time: "hace 5 días",
    duration: "12:31",
  },
  {
    id: 9,
    title: "Video 9 prueba asdasd asdasdasdasdasdasd ",
    thumbnail: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742489438/2_ev9m72.png",
    time: "hace 6 días",
    duration: "9:25",
  },
  {
    id: 10,
    title: 'Video 1 prueba1 asda as asdasdasdasdasdasd',
    thumbnail: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742489435/4_chzk5n.png",
    time: "hace 6 días",
    duration: "10:27",
  },
  {
    id: 11,
    title: "Video 33  pruebaa aaa aa asdasdasdasdasdasd ",
    thumbnail: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742489438/2_ev9m72.png",
    time: "hace 7 días",
    duration: "10:22",
  },
  {
    id: 12,
    title: "Video 1 prueba33 sadadasd  asdasdasdasdasdasdasdasd",
    thumbnail: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742489438/1_ilbchq.png",
    time: "hace 7 días",
    duration: "8:15",
  },
];

export default function Videos() {

  const [activeFilter, setActiveFilter] = useState("recientes");

  return (
    <div className="guides">
      {/* Profile Header */}
      <div className="guides__profile">
        <div className="guides__profile-avatar">
      
        </div>

        <div className="guides__profile-info">
          <div className="guides__profile-name-container">
            <h1 className="guides__profile-name">
              {channelData.name}
              {channelData.isVerified && (
                <span className="guides__profile-verified"><VerifiedIcon sx={{color:"#8FC799"}}/></span>
              )}
            </h1>
          </div>


      
        </div>
      </div>

      {/* Navigation */}
      <div className="guides__navigation">
        <div className="guides__filters">
          <button
            className={`guides__filter-button ${
              activeFilter === "recientes"
                ? "guides__filter-button--active"
                : ""
            }`}
            onClick={() => setActiveFilter("recientes")}
          >
            Más recientes
          </button>
          <button
            className={`guides__filter-button ${
              activeFilter === "popular" ? "guides__filter-button--active" : ""
            }`}
            onClick={() => setActiveFilter("popular")}
          >
            Vistos
          </button>
          <button
            className={`guides__filter-button ${
              activeFilter === "antiguos" ? "guides__filter-button--active" : ""
            }`}
            onClick={() => setActiveFilter("antiguos")}
          >
          No vistos
          </button>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="guides__content">
        <div className="guides__videos-grid">
          {videoData.map((video) => (
            <div key={video.id} className="guides__video-card">
              <div className="guides__video-thumbnail-container">
                <Image
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  width={320}
                  height={180}
                  className="guides__video-thumbnail"
                />
                <div className="guides__video-duration">{video.duration}</div>
              </div>

              <div className="guides__video-info">
                <h3 className="guides__video-title">{video.title}</h3>
                <div className="guides__video-meta">
             
      
                  <span className="guides__video-time">{video.time}</span>
                </div>
              </div>

              <button className="guides__video-options">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="12" cy="5" r="1"></circle>
                  <circle cx="12" cy="19" r="1"></circle>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
