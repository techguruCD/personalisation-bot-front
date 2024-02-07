import { Outlet } from "react-router-dom"
import React from 'react'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
export default function Withnavbar() {
  return (
    <div className="flex flex-col flex-auto h-screen overflow-y-auto snap-y snap-mandatory">
      <Navbar className='snap-start md:snap-align-none grow-0'/>
      <Outlet />
      <Footer className='snap-end md:snap-align-none grow-0'/>
    </div>
  )
}