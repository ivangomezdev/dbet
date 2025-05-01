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
    const [cookies] = useCookies(["token"]);
    const router = useRouter();

    useEffect(() => {
      if (status === "loading") return;
      
      if (status === "authenticated" || cookies.token) {
        router.push("/me");
        console.log(session);
      }
    }, [status, cookies.token, router]);

    return (
        <div className="register__main">
            <header>
                <NavBar />
                <video src='https://res.cloudinary.com/dllkefj8m/video/upload/v1746115042/Dise%C3%B1o_sin_t%C3%ADtulo_3_d9ujeh.mp4' autoPlay muted loop id="fondo-video" />
            </header>
            <main className="register__content">
                <SignupForm />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Page