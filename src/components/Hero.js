import React from 'react'
import HeroImage from '../assets/images/hero.png'

export default function Hero() {
  return (
    <div className='bg-gradient-to-t from-[#f0f0f0] to-white py-6 px-6'>
      <div className='container mx-auto space-y-4 md:grid md:grid-cols-2 md:gap-4'>
        <div className='md:col-span-1 my-auto space-y-4 text-center md:text-start'>
          <div className='text-[#ee484d] text-[40pt] font-bold'>
            The New Widget 2000
          </div>
          <div className='text-[#454545] text-4xl font-bold text-[#454545]'>
            Get Your Brochure Below
          </div>
          <div className='text-xl text-[#454545]'>
            The wait is over. Now you can buy a Widget 2000 and have your widget dreams come true.
          </div>
          <div className='text-white bg-[#ee484d] w-fit py-4 px-6 rounded-md font-bold mx-auto md:ml-0'>
            DOWNLOAD
          </div>
        </div>
        <div className='md:col-span-1 my-auto'>
          <img src={HeroImage} alt='hero image'></img>
        </div>
      </div>
    </div>
  )
}