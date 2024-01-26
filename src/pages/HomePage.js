import React from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <>
      <div className='w-full py-6 px-6'>
        <div className='container mx-auto space-y-24 md:grid md:grid-cols-2 md:gap-24'>
          <div className='md:col-span-1 space-y-6 text-center md:text-start'>
            <div className='text-[#ee484d] text-[40pt] font-bold'>
              Widget Questions?
            </div>
            <div className='text-[#454545] text-4xl'>
              Chat to Our Bot!
            </div>
            <div className='rounded-xl w-full h-[800px] shadow-2xl shadow-gray-400 flex flex-col flex-auto shrink-0'>
              <div className='h-full overflow-auto p-6 space-y-4'>
                <div className='max-w-[90%] flex gap-6 mr-auto'>
                  <div className='bg-[#ee484d] min-w-[60px] min-h-[60px] max-h-[60px] text-center rounded-full flex items-center justify-center'>
                    <div className='font-bold text-white'>WB</div>
                  </div>
                  <div className='space-y-4'>
                    <div className='bg-[#fef1f1] rounded-xl shadow-md p-6 text-[#454545]' style={{ overflowWrap: 'anywhere' }}>
                      Hi. I am WidgetBot - A Chatbot trained to have answers for you about widgets. Feel free to ask me anything about widgets. I can also provide you a brochure - Just ask!
                    </div>
                    <div className='text-gray-400'>
                      2 mins ago
                    </div>
                  </div>
                </div>
                <div className='max-w-[90%] flex flex-row-reverse gap-6 ml-auto'>
                  <div className='bg-[#fcce3d] min-w-[60px] min-h-[60px] max-h-[60px] text-center rounded-full flex items-center justify-center'>
                    <div className='font-bold text-[#454545]'>You</div>
                  </div>
                  <div className='flex flex-col items-end space-y-4'>
                    <div className='bg-white rounded-xl shadow-md p-6 text-[#454545] text-wrap' style={{ overflowWrap: 'anywhere' }}>
                      Hi. I am interested in the widget 2000. How much is it and does it come with free shipping?
                    </div>
                    <div className='text-gray-400'>
                      2 mins ago
                    </div>
                  </div>
                </div>
              </div>
              <div className='border-t flex p-6 items-end'>
                <textarea placeholder='Type Your Questions here...' className='grow px-2 py-1 resize-none max-h-[90px] focus:outline-none focus-visible:outline-none' style={{ height: '32px' }} />
                <div className='w-6 cursor-pointer'>
                  <PaperAirplaneIcon />
                </div>
              </div>
            </div>
          </div>
          <div className='md:col-span-1 space-y-6 xl:pl-32'>
            <div className='text-[#ee484d] text-[40pt] font-bold text-center md:text-start'>
              Behind the Scenes
            </div>
            <div className='text-[#454545] text-4xl text-center md:text-start'>
              Real Time Segmentation
            </div>
            <div className='border-t space-y-12 pt-10'>
              <div className='flex items-center gap-4'>
                <div className='text-[#ee484d] text-2xl font-bold min-w-[120px]'>
                  Segment
                </div>
                <div className='text-[#454545] text-2xl lg:text-3xl border-l px-4' style={{ overflowWrap: 'anywhere' }}>
                  Opportunistic Adventurer
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <div className='text-[#ee484d] text-2xl font-bold min-w-[120px]'>
                  Chance%
                </div>
                <div className='text-[#454545] text-4xl border-l px-4'>
                  75%
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <div className='text-[#ee484d] text-2xl font-bold min-w-[120px]'>
                  Rationale
                </div>
                <div className='text-[#454545] border-l px-4'>
                  This user is asking highly detailed questions and using direct communication in his messages indicating he is an opportunistic adventurer.
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <div className='text-[#ee484d] text-2xl font-bold min-w-[120px]'>
                  Brochure
                </div>
                <div className='text-[#454545] text-4xl border-l px-4'>
                  1
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-32 text-center'>
          <Link className='text-white bg-[#ee484d] py-4 px-6 rounded-md font-bold cursor-pointer' to='/download'>
            DOWNLOAD BROCHURE
          </Link>
        </div>
      </div>
    </>
  )
}