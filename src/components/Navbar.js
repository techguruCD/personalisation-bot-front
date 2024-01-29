import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='w-full bg-[#ee484d] px-6'>
      <div className='container mx-auto flex justify-between items-center text-white py-4'>
        <Link className='md:text-4xl cursor-pointer' to='/'>
          <span className='font-bold'>The New Widgets</span> 2000
        </Link>
        <div className='flex gap-4 items-center'>
          <div className='border border-white rounded-md px-4 py-2 cursor-pointer h-fit'>
            Find Out More
          </div>
          <Link to='/admin/home' className='border border-white rounded-md px-4 py-2 cursor-pointer h-fit'>
            Members
          </Link>
        </div>
      </div>
    </div>
  )
}