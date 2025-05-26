"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import VerifiedIcon from "@mui/icons-material/Verified";
import { getVideos } from "../lib/contenful";
import "./videos.css";

// Datos de ejemplo para el canal
const channelData = {
  name: "GUÍAS",
  isVerified: true,
  description: "Todo lo que necesitas saber",
  profileImage: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742334432/BRAIN_tfew9b.png",
};

export default function Videos() {
  const [activeFilter, setActiveFilter] = useState("recientes");
  const [cookies] = useCookies(["token"]);
  const [userData, setUserData] = useState(null);
  const [videos, setVideos] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  // Determine if user is authenticated
  const isAuthenticated = !!session || !!cookies.token;

  // Determine subscription status
  const subscriptionStatus = session?.user?.subscriptionStatus || userData?.subscriptionStatus || "inactive";
  const hasPremiumSubscription = subscriptionStatus === "MONTHLY" || subscriptionStatus === "YEAR";
  const isFreePlan = subscriptionStatus === "FREE";

  // Show all videos (including locked ones) if not authenticated or on FREE plan
  const showLockedVideos = !isAuthenticated || isFreePlan;

  // Fetch videos from Contentful
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videoEntries = await getVideos();
        const formattedVideos = videoEntries.map((entry, index) => ({
          id: index + 1,
          title: entry.fields.title || "Sin título",
          thumbnail: entry.fields.thumbnail?.fields?.file?.url
            ? `https:${entry.fields.thumbnail.fields.file.url}`
            : "https://res.cloudinary.com/dc5zbh38m/image/upload/v174248 angles/1_ilbchq.png",
          time: entry.fields.time || "hace 1 día",
          duration: entry.fields.duration || "10:00",
          slug: entry.fields.slug || `video-${index + 1}`,
        }));
        setVideos(formattedVideos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

  // Fetch user data for JOSE token
  useEffect(() => {
    const fetchUserData = async () => {
      if (cookies.token && !session) {
        try {
          const response = await fetch("/api/user", {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [cookies.token, session]);

  // Handle click on locked video
  const handleLockedVideoClick = () => {
    if (showLockedVideos) {
      if (isAuthenticated && isFreePlan) {
        router.push("/changePlan");
      } else {
        router.push("/auth/register");
      }
    }
  };

  // Handle video click to navigate to video detail page
  const handleVideoClick = (slug) => {
    router.push(`/guides/${slug}`);
  };

  // Filter and sort videos by slug (guia-1, guia-2, etc.)
  const filteredVideos = (showLockedVideos ? videos : videos.filter((video) => video.id < 6)).sort((a, b) => {
    const aNumber = parseInt(a.slug.split("-")[1], 10) || 0;
    const bNumber = parseInt(b.slug.split("-")[1], 10) || 0;
    return aNumber - bNumber;
  });

  return (
    <div className="guides">
      {/* Profile Header */}
      <div className="guides__profile">
        <div className="guides__profile-avatar"></div>
        <div className="guides__profile-info">
          <div className="guides__profile-name-container">
            <h1 className="guides__profile-name">
              {channelData.name}
          
            </h1>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="guides__navigation">
        <div className="guides__filters">
          <button
            className={`guides__filter-button ${
              activeFilter === "recientes" ? "guides__filter-button--active" : ""
            }`}
            onClick={() => setActiveFilter("recientes")}
          >
           Ver guías
          </button>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="guides__content">
        <div className="guides__videos-grid">
          {filteredVideos.map((video) => {
            const isLocked = video.id >= 6 && !hasPremiumSubscription;
            return (
              <div
                key={video.id}
                className={`guides__video-card ${isLocked ? "guides__video-card--locked" : ""}`}
                onClick={isLocked ? handleLockedVideoClick : () => handleVideoClick(video.slug)}
                style={{ cursor: isLocked ? "pointer" : "default" }}
              >
                <div className="guides__video-thumbnail-container">
                  <img src={video.thumbnail} alt={video.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                  <div className="guides__video-duration">{video.slug.slice(5)}</div>
                  {isLocked && (
                    <div className="guides__video-locked-overlay">
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
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      <span>Premium</span>
                    </div>
                  )}
                </div>
                <div className="guides__video-info">
                  <h3 className="guides__video-title">{video.title}</h3>
                  <div className="guides__video-meta">
                    <span className="guides__video-time">{video.time}</span>
                  </div>
                </div>
                <button className="guides__video-options" disabled={isLocked}>
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
            );
          })}
        </div>
      </div>
    </div>
  );
}