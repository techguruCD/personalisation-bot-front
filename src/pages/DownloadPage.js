import React from 'react'

import BrochureImage from '../assets/images/brochure.png'

export default function DownloadPage() {
  return (
    <>
      <div className='w-full py-12 px-6'>
        <div className='container mx-auto space-y-12'>
          <div className='text-center text-4xl text-[#454545]'>
            We Think You're
          </div>
          <div className='border border-[#ee484d] text-[#ee484d] rounded-xl text-3xl font-bold text-center py-6 px-4'>
            An Opportunistic Adventurer
          </div>
          <div className='border border-[#ee484d] rounded-xl py-12 px-4 space-y-12 flex flex-col items-center'>
            <div className='text-center text-3xl text-[#454545]'>
              Your Personalised Brochure
            </div>
            <div>
              <img src={BrochureImage}></img>
            </div>
            <div className='text-white bg-[#ee484d] w-fit py-4 px-6 rounded-md font-bold mx-auto'>
              NEXT STEP >
            </div>
          </div>
        </div>
      </div>
    </>
  )
}