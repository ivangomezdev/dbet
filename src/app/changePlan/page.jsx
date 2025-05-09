"use client";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Videos from "@/components/Videos";
import SubscriptionCard from "@/components/SubscriptionCard";
import ChooseSubscriptionPlan from "@/components/ChooseSubscriptionPlan"; 
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useSession } from "next-auth/react";


const Page = () => {
  const [cookies] = useCookies(["token"]);
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);

  // Determine if user is authenticated
  const isAuthenticated = !!session || !!cookies.token;

  // Fetch user data for token-based authentication
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

  // Determine subscription status
  const subscriptionStatus = session?.user?.subscriptionStatus || userData?.subscriptionStatus || "inactive";
  const isFreePlan = subscriptionStatus === "FREE";
  const isPremiumPlan = subscriptionStatus === "MONTHLY" || subscriptionStatus === "YEAR";

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="guides__main bonos__content">
        <Videos />
        {/* Conditional rendering for subscription components */}
        {!isAuthenticated ? (
          <div>
            <SubscriptionCard
              hrefAnual="/auth/register"
              hrefFree="/auth/register"
              hrefMensual="/auth/register"
            />
          </div>
        ) : isFreePlan ? (
          <div>
            <ChooseSubscriptionPlan />
          </div>
        ) : (
          <div></div>
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Page;