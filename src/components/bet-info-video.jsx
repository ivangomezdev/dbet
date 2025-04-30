"use client"

import { useState } from "react"
import "./bet-info-video.css"

function BetInfoVideo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const totalDuration = 323 // 5:23 in seconds

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    // In a real implementation, you would control the video element here
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  return (
    <div className="bet-info-video">
      <h2 className="bet-info-video__welcome">BIENVENIDO A <span style={{color:"#FE9610"}}>WIN</span>BET<span style={{color:"#037339"}}>420</span></h2>

      <h1 className="bet-info-video__mission">
        ESTAMOS EN UNA MISIÓN PARA AYUDARTE A IMPULSAR TU BANCO CONVIRTIENDO PROMOCIONES EN GANANCIAS
      </h1>

      <div className="bet-info-video__player">
        <div className="bet-info-video__player-container">
         <video src="https://www.youtube.com/watch?v=D0_cdpPiZnE"></video>
          
          {!isPlaying && (
            <button className="bet-info-video__play-button" onClick={handlePlayPause} aria-label="Reproducir video">
              <div className="bet-info-video__play-icon"></div>
            </button>
          )}

          <div className="bet-info-video__caption">
            <p>The number one side hustle in the United States is matched betting.</p>
          </div>

          <div className="bet-info-video__controls">
            <button
              className="bet-info-video__control-button bet-info-video__control-button--play"
              onClick={handlePlayPause}
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>

            <div className="bet-info-video__time">
              {formatTime(currentTime)} / {formatTime(totalDuration)}
            </div>

            <div className="bet-info-video__right-controls">
              <button className="bet-info-video__control-button bet-info-video__control-button--volume">🔊</button>
              <button className="bet-info-video__control-button bet-info-video__control-button--settings">⚙️</button>
              <button className="bet-info-video__control-button bet-info-video__control-button--miniplayer">□</button>
              <button className="bet-info-video__control-button bet-info-video__control-button--fullscreen">⛶</button>
            </div>
          </div>
        </div>
      </div>

      <button className="bet-info-video__cta">DESCUBRE CÓMO FUNCIONA</button>
    </div>
  )
}

export default BetInfoVideo