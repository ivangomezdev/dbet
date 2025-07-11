"use client"
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import Videos from '@/components/Videos'
import React from 'react'
import "./guides.css"
import SubscriptionCard from "@/components/SubscriptionCard";
import { useCookies } from "react-cookie";

import { useSession } from "next-auth/react";

const Page = () => {
  const [cookies] = useCookies(["token"]); 

  const { data: session } = useSession()
  


  return (
    <div style={{backgroundColor:"#054F36"}}>
    <header>
      <NavBar />
      </header>
      <main className='guides__main bonos__content'>
        <Videos bonosData={[]} />
         { !cookies.token && !session  ? <div>
                 <SubscriptionCard hrefAnual="/auth/register" hrefFree="/auth/register" hrefMensual="/auth/register"/>
               </div> : <div>  </div> }
      </main>
      
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Page
