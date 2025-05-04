"use client";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import NavBar from "@/components/NavBar";
import "./mePage.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ReferralsPage() {
  const { status, data: session } = useSession();
  const [cookies] = useCookies(["token"]);
  const router = useRouter();
  const [referralData, setReferralData] = useState({
    referralCode: "Loading...",
    hasUsedReferral: false,
    invitedUsers: 0,
  });
  const [referralInput, setReferralInput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated" && !cookies.token) {
      console.log("No session or token, redirecting to /auth/register");
      router.push("/auth/register");
      return;
    }

    const fetchReferralStatus = async () => {
      try {
        setIsLoading(true);
        setError("");
        console.log("Fetching /api/referrals/status", {
          hasToken: !!cookies.token,
          hasSession: !!session?.user,
          token: cookies.token ? cookies.token.substring(0, 10) + "..." : null,
        });
        const headers = {
          "Content-Type": "application/json",
        };
        if (cookies.token) {
          headers["Authorization"] = `Bearer ${cookies.token}`;
        }
        const response = await fetch("/api/referrals/status", {
          method: "GET",
          headers,
          credentials: "include",
        });

        const responseBody = await response.clone().json();
        console.log("Response status:", response.status, "Response:", responseBody);

        if (!response.ok) {
          throw new Error(responseBody.error || responseBody.details || `HTTP error! Status: ${response.status}`);
        }

        const data = responseBody;
        console.log("Referral data:", data);
        setReferralData({
          referralCode: data.referralCode || "No code available",
          hasUsedReferral: data.hasUsedReferral || false,
          invitedUsers: data.invitedUsers || 0,
        });
      } catch (err) {
        console.error("Error fetching referral status:", err);
        setError(`Failed to load referral data: ${err.message}`);
        setReferralData({
          referralCode: "Error",
          hasUsedReferral: false,
          invitedUsers: 0,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchReferralStatus();
  }, [status, cookies.token, session, router]);

  const handleApplyReferral = async () => {
    setError("");
    try {
      console.log("Applying referral code:", referralInput, {
        hasToken: !!cookies.token,
        token: cookies.token ? cookies.token.substring(0, 10) + "..." : null,
      });
      const headers = {
        "Content-Type": "application/json",
      };
      if (cookies.token) {
        headers["Authorization"] = `Bearer ${cookies.token}`;
      }
      const res = await fetch("/api/referrals/apply", {
        method: "POST",
        headers,
        body: JSON.stringify({ referralCode: referralInput }),
        credentials: "include",
      });
      const data = await res.json();
      console.log("Apply referral response:", data);
      if (res.ok) {
        setReferralData((prev) => ({ ...prev, hasUsedReferral: true }));
        setError("Referral code applied successfully!");
        const statusRes = await fetch("/api/referrals/status", {
          method: "GET",
          headers,
          credentials: "include",
        });
        const statusData = await statusRes.json();
        console.log("Updated referral status:", statusData);
        setReferralData({
          referralCode: statusData.referralCode || "No code available",
          hasUsedReferral: statusData.hasUsedReferral || false,
          invitedUsers: statusData.invitedUsers || 0,
        });
      } else {
        throw new Error(data.error || data.details || "Error applying referral code");
      }
    } catch (err) {
      console.error("Error applying referral:", err);
      setError(`Error applying referral code: ${err.message}`);
    }
  };

  const handleRedeemDiscount = async () => {
    setError("");
    try {
      console.log("Redeeming 5% discount", {
        hasToken: !!cookies.token,
        token: cookies.token ? cookies.token.substring(0, 10) + "..." : null,
      });
      const headers = {
        "Content-Type": "application/json",
      };
      if (cookies.token) {
        headers["Authorization"] = `Bearer ${cookies.token}`;
      }
      const res = await fetch("/api/referrals/redeem", {
        method: "POST",
        headers,
        credentials: "include",
      });
      const data = await res.json();
      console.log("Redeem discount response:", data);
      if (res.ok) {
        setError("5% discount redeemed successfully! Check your rewards.");
      } else {
        throw new Error(data.error || data.details || "Error redeeming discount");
      }
    } catch (err) {
      console.error("Error redeeming discount:", err);
      setError(`Error redeeming discount: ${err.message}`);
    }
  };

  const handleShare = () => {
    if (referralData.referralCode && referralData.referralCode !== "Error" && referralData.referralCode !== "Loading...") {
      navigator.clipboard.write(referralData.referralCode);
      alert("Referral code copied to clipboard!");
    } else {
      alert("No referral code available to share.");
    }
  };

  if (isLoading) {
    return (
      <div style={{ backgroundColor: "black", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <NavBar />
        <h1
          style={{
            color: "#F28C38",
            fontSize: "80px",
            fontFamily: "'Gagalin', sans-serif",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Cargando...
        </h1>
      </div>
    );
  }

  return (
    <div className="referrals__content" style={{backgroundColor:"orange",height:"100vh",marginTop:"-50px"}}>
      <NavBar />
      <div style={{paddingLeft:"20PX"}}>
      <h1 style={{paddingTop:"150px",fontSize:"80px",fontFamily:"gagalin",color:"white"}}>Referidos</h1>
      {error && (
        <p style={{ color: error.includes("successfully") ? "green" : "red" }}>
          {error}
        </p>
      )}
      <div>
        <h2 style={{backgroundColor:"white",width:"270px",padding:"5px",borderRadius:"5px",color:"orange",fontFamily:"gagalin",textAlign:"center"}}>Tu Código de Referido</h2>
      
        <div style={{ fontSize: "1.5em", fontWeight: "bold", margin: "10px 0" }}>
          {referralData.referralCode}
        <button className="referrals__btn" onClick={handleShare}>Copiar al portapapeles 📋</button>
        </div>
        <p>Usuarios Invitados: {referralData.invitedUsers}</p>
        <button
          className="referrals__btnCanjear"
          onClick={handleRedeemDiscount}
          disabled={referralData.invitedUsers === 0}
        >
          Canjear 5% de Descuento
        </button>
      </div>

      <div>
        <h2>Ingresar Código de Referido</h2>
        {referralData.hasUsedReferral ? (
          <p>
            Ya has utilizado un código de referidos, ganaste un bono del 5% en la
            compra de tu membresía.
          </p>
        ) : (
          <>
            <p >Ingresa el código de la persona que te invitó:</p>
            <input
              style={{padding:"5px",backgroundColor:"orange",color:"white",borderRadius:"5px"}}
              type="text"
              value={referralInput}
              onChange={(e) => setReferralInput(e.target.value)}
              placeholder="Ingresa el código de referido"
            />
            <button className="referrals__btnCanjear" onClick={handleApplyReferral}>Aplicar Código</button>
          </>
        )}
      </div>
      </div>
    </div>
  );
}