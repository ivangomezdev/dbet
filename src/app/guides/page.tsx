"use client"
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import Videos from '@/components/Videos'
import React from 'react'
import "./guides.css"
import SubscriptionCard from "@/components/SubscriptionCard";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import { useSession } from "next-auth/react";

const Page = () => {
  const [cookies] = useCookies(["token"]); 
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Estado de carga
  const { data: session , status } = useSession()
  


  return (
    <>
    <header>
      <NavBar />
      </header>
      <main className='guides__main bonos__content'>
        <Videos/>
         { !cookies.token && !session  ? <div>
                 <SubscriptionCard hrefAnual="/auth/register" hrefFree="/auth/register" hrefMensual="/auth/register"/>
               </div> : <div>  </div> }
      </main>
      
      <footer>
        <Footer/>
      </footer>
    </>
  )
}

export default Page
