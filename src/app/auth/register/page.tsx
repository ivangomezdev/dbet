import NavBar from '@/components/NavBar'
import SignupForm from '@/components/SingUpForm'
import React from 'react'
import "./register.css"
import Footer from '@/components/Footer'

const Page = () => {
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
