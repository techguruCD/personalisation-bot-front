import React, { useEffect, useMemo, useRef, useState } from 'react'
import HeroImage from '../assets/images/hero.png'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setHomeSetting, setLoading, setSetting } from '../store/appSlice'

import { PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import showToaster from '../utils/showToaster'
import updateHomeSetting from '../utils/updateHomeSetting'
import HomeSettingEdit from './HomeSettingEditor'

export default function Hero({
  className
}) {
  return (
    <div className={`bg-gradient-to-t from-[#f0f0f0] to-white py-6 px-6 ${className ? className : ''}`}>
      <div className='container mx-auto space-y-4 md:grid md:grid-cols-2 md:gap-4'>
        <div className='md:col-span-1 my-auto space-y-4 text-center md:text-start'>
          <HomeSettingEdit contentClassName='text-[40pt] font-bold' color='[#ee484d]' valueKey='mainTitle' />
          <HomeSettingEdit contentClassName='text-4xl font-bold' color='[#454545]' valueKey='subTitle' />
          <HomeSettingEdit contentClassName='text-xl' color='[#454545]' valueKey='text' />
          <div className='text-white bg-[#ee484d] w-fit py-4 px-6 rounded-md font-bold mx-auto md:ml-0 cursor-pointer'>
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