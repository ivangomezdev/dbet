"use client"
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import Videos from '@/components/Videos'
import React, { useEffect } from 'react'
import "./guides.css"
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/navigation'
const Page = () => {
  const [cookies] = useCookies(["token"]); // Leer las cookies
  const router = useRouter();
  
    //MiddleWare para asegurar la ruta
    useEffect(() => {
      if (!cookies.token) {
        router.push("/auth/register");
      }
    }, [cookies.token, router]);

  return (
    <>
    <header>
      <NavBar />
      </header>
      <main className='guides__main bonos__content'>
        <Videos/>
       
      </main>
      
      <footer>
        <Footer/>
      </footer>
    </>
  )
}

export default Page
