import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import SubscriptionCard from '@/components/SubscriptionCard'
import React from 'react'

const premium = () => {
  return (
    <>
      <header>
        <NavBar/>
      </header>
      <main>
      <SubscriptionCard/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  )
}

export default premium
