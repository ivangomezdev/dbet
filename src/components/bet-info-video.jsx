"use client";

import { useState, useEffect } from "react";
import "./bet-info-video.css";

function BetInfoVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const totalDuration = 140; // 5:23 in seconds

  // Load YouTube IFrame Player API
  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      const ytPlayer = new window.YT.Player("youtube-player", {
        videoId: "w_kTpNcQN5w",
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              const interval = setInterval(() => {
                setCurrentTime(ytPlayer.getCurrentTime());
              }, 1000);
              return () => clearInterval(interval);
            } else {
              setIsPlaying(false);
            }
          },
        },
      });
      setPlayer(ytPlayer);
    };
  }, []);

  const handlePlayPause = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="bet-info-video">
      <h2 className="bet-info-video__welcome">
        BIENVENIDO A <span style={{ color: "#FE9610" }}>WIN</span>
        BET<span style={{ color: "#037339" }}>420</span>
      </h2>

      <h1 className="bet-info-video__mission">
        ESTAMOS EN UNA MISIÓN PARA AYUDARTE A IMPULSAR TU BANCO CONVIRTIENDO
        PROMOCIONES EN GANANCIAS
      </h1>

      <div className="bet-info-video__player">
      <div className="bet-info-video__player-container">
<iframe
  id="youtube-player"
  src="https://www.youtube.com/embed/w_kTpNcQN5w?enablejsapi=1&controls=0"
  allow="autoplay; encrypted-media"
  allowFullScreen
  title="WinBet420 Video"
></iframe>

          {!isPlaying && (
            <button
              className="bet-info-video__play-button"
              onClick={handlePlayPause}
              aria-label="Reproducir video"
            >
              <div className="bet-info-video__play-icon"></div>
            </button>
          )}

          <div className="bet-info-video__caption">
            <p>
             Aprende con el creador de WinBet
            </p>
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
              <button className="bet-info-video__control-button bet-info-video__control-button--volume">
                🔊
              </button>
              <button className="bet-info-video__control-button bet-info-video__control-button--settings">
                ⚙️
              </button>
              <button className="bet-info-video__control-button bet-info-video__control-button--miniplayer">
                □
              </button>
              <button className="bet-info-video__control-button bet-info-video__control-button--fullscreen">
                ⛶
              </button>
            </div>
          </div>
        </div>
      </div>

      <a href="#howWorks" className="bet-info-video__cta">
        DESCUBRE CÓMO FUNCIONA
      </a>
    </div>
  );
}

export default BetInfoVideo;