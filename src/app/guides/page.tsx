"use client"
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import Videos from '@/components/Videos'
import React from 'react'
import "./guides.css"

const Page = () => {

  


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
