"use client"
import NavBar from '@/components/NavBar'
import SignupForm from '@/components/SingUpForm'
import React, { useEffect } from 'react'
import "./register.css"
import Footer from '@/components/Footer'
import { useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'
import { useSession } from 'next-auth/react'

const Page = () => {
  
    const { data: session, status } = useSession();
    const [cookies] = useCookies(["token"]); // Leer las cookies
    const router = useRouter();
  
    
    useEffect(() => {
      if (status === "loading") return;
  
      if (status === "authenticated" || cookies.token) {
        router.push("/me");
      }
    }, [status, cookies.token, router]);
  return (
    <>
      <header>
        <NavBar/>
      </header>
      <main className='register__main'>
      <div className="card card--spade"></div>
        <div className="card card--heart"></div>
        <div className="card card--diamond"></div>
        <div className="ball ball--soccer"></div>
        <div className="ball ball--basketball"></div>
        <div className="dice dice--one"></div>
        <div className="dice dice--six"></div>
        <SignupForm/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  )
}

export default Page
