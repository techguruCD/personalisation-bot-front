import { Outlet } from "react-router-dom"
import React from 'react'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
export default function Withnavbar() {
  return (
    <>
      <Navbar />
      <Hero />
      <Outlet />
      <Footer />
    </>
  )
}