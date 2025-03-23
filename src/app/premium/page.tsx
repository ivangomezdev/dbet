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
      <SubscriptionCard hrefAnual='/auth/register' hrefMensual='/auth/register' hrefFree='/auth/register' />
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  )
}

export default premium
