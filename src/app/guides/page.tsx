import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import Videos from '@/components/Videos'
import React from 'react'
import "./guides.css"
const page = () => {
  return (
    <>
    <header>
      <NavBar />
      </header>
      <main className='guides__main'>
        <Videos/>
       
      </main>
      
      <footer>
        <Footer/>
      </footer>
    </>
  )
}

export default page
