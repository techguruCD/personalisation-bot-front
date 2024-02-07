import React from 'react'

import BrochureImage from '../assets/images/brochure.png'
import Hero from '../components/Hero'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../store/appSlice'
import axios from 'axios'
import FileSaver from 'file-saver'
import showToaster from '../utils/showToaster'

export default function DownloadPage() {
  const dispatch = useDispatch()
  const segment = useSelector(state => state.app.segment)
  async function onDownload(e) {
    e?.preventDefault()
    dispatch(setLoading(true))
    try {
      const {data: {brochure}} = await axios.get(process.env.REACT_APP_API_URL + '/api/brochure', {params: {number: segment?.brochure?.number || 0}})
      FileSaver.saveAs(process.env.REACT_APP_API_URL + brochure?.file, brochure?.segment + '.pdf')
    } catch (err) {
      showToaster(err?.response?.data?.message||{error: 'Please try again later'})
    }
    dispatch(setLoading(false))
  }
  return (
    <>
      <Hero />
      <div className='w-full py-12 px-6'>
        <div className='container mx-auto space-y-12'>
          <div className='text-center text-4xl text-[#454545]'>
            We Think You're
          </div>
          <div className='border border-[#ee484d] text-[#ee484d] rounded-xl text-3xl font-bold text-center py-6 px-4'>
            {segment?.brochure?.segment || 'Unpersonalised'}
          </div>
          <div className='border border-[#ee484d] rounded-xl py-12 px-4 space-y-12 flex flex-col items-center'>
            <div className='text-center text-3xl text-[#454545]'>
              Your Personalised Brochure
            </div>
            <div>
              <img src={BrochureImage}></img>
            </div>
            <div className='text-white bg-[#ee484d] w-fit py-4 px-6 rounded-md font-bold mx-auto cursor-pointer' onClick={onDownload}>
              DOWNLOAD
            </div>
          </div>
        </div>
      </div>
    </>
  )
}