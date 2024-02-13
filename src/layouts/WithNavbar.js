import { Outlet, useLocation } from "react-router-dom"
import React from 'react'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
export default function Withnavbar() {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className={`flex flex-col flex-auto h-screen overflow-y-auto ${pathname==="/"?'snap-y snap-mandatory':''}`}>
      <Navbar className={`${pathname==='/'?'snap-start':''} md:snap-align-none grow-0`}/>
      <Outlet />
      <Footer className={`${pathname==='/'?'snap-end':''} md:snap-align-none grow-0`}/>
    </div>
  )
}