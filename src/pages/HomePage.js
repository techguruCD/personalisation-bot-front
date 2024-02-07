import React, { useEffect, useRef, useLayoutEffect, useState, useMemo } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addMessage, setMessages, setSegment, setSetting, shiftMessage } from '../store/appSlice'
import Hero from '../components/Hero'
import updateHomeSetting from '../utils/updateHomeSetting'
import { CheckIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/outline'
import HomeSettingEdit from '../components/HomeSettingEditor'
import showToaster from '../utils/showToaster'

function Message({
  typing,
  message
}) {
  const isLeft = useMemo(() => message?.role === 'assistant' || typing)
  return (
    <>
      <div className={`max-w-[90%] flex gap-6 ${isLeft ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}>
        <div className={`min-w-[60px] min-h-[60px] max-h-[60px] text-center rounded-full flex items-center justify-center ${isLeft ? 'bg-[#ee484d]' : 'bg-[#fcce3d]'}`}>
          <div className={`font-bold ${isLeft ? 'text-white' : 'text-[#454545]'}`}>{isLeft ? 'WB' : 'You'}</div>
        </div>
        <div className='space-y-4'>
          <div className={`whitespace-pre-wrap rounded-xl shadow-md p-6 text-[#454545] text-left text-wrap ${isLeft ? 'bg-[#fef1f1]' : 'bg-white'} ${typing ? 'typing' : ''}`} style={{ overflowWrap: 'anywhere' }}>
            {
              !typing &&
              message.content
            }
            {
              typing &&
              <>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </>
            }
          </div>
          {
            !typing &&
            <div className='text-gray-400'>
              2 mins ago
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default function HomePage() {

  const dispatch = useDispatch()
  const segment = useSelector(state => state.app.segment)
  const [windowsWidth, setWindowsWidth] = useState(window.innerWidth)
  const homeSetting = useSelector(state => state.app.homeSetting)

  const messages = useSelector(state => state.app.messages)
  const [typing, setTyping] = useState(false)
  const [payload, setPayload] = useState('')
  const inputTextArea = useRef(null)
  const chatBoxRef = useRef(null)

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }

  const handleSend = (e) => {
    e?.preventDefault()
    if (typing) return;
    const content = payload;
    dispatch(addMessage({ role: 'user', content }))
    setTimeout(scrollToBottom, 100)
    setPayload('')
    setTyping(true)
    axios.post(process.env.REACT_APP_API_URL + '/api/sendMessage', { messages: [...messages.slice(messages.length - 10), { role: 'user', content }] })
      .then(({ data: response }) => {
        dispatch(addMessage({ role: 'assistant', content: response.content }))
        setTimeout(scrollToBottom, 100)
      }).catch(err => {
        dispatch(shiftMessage())
        showToaster(err?.response?.data?.message)
      }).finally(() => {
        setTyping(false)
      })
    axios.post(process.env.REACT_APP_API_URL + '/api/detect-segment', { messages: [...messages.slice(messages.length - 10), { role: 'user', content }] })
      .then(({ data: response }) => {
        dispatch(setSegment(response.segment))
      }).catch(err => {
      }).finally(() => {

      })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const init = () => {
    dispatch(setMessages([
      {
        role: 'assistant',
        content: homeSetting.greeting
      }
    ]))
  }

  useLayoutEffect(() => {
    function updateSize() {
      setWindowsWidth(window.innerWidth)
    }
    window.addEventListener('resize', updateSize)
    setTimeout(() => {
      if (windowsWidth < 768) {
        chatBoxRef.current.scrollIntoView()
      }
    }, 1)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  useEffect(() => {
    if (homeSetting && !messages.length)
      init()
  }, [homeSetting])

  const chatComponent = <div className='md:col-span-1 space-y-6 text-center md:text-start'>
    <HomeSettingEdit containerClassName='hidden md:block' contentClassName='text-[40pt] font-bold' color='[#ee484d]' valueKey='chatbotTitle' />
    <HomeSettingEdit contentClassName='text-4xl font-bold' color='[#454545]' valueKey='chatbotSubTitle' />
    <div className='rounded-xl w-full h-[70vh] md:h-[800px] shadow-2xl shadow-gray-400 flex flex-col flex-auto shrink-0'>
      <div className='h-full overflow-auto p-6 space-y-4' ref={chatBoxRef}>
        {
          messages.map((message, index) => <Message key={index} message={message} />)
        }
        {
          typing && <Message typing={true} />
        }
      </div>
      <div className='border-t flex p-6 items-end'>
        <textarea value={payload} onKeyDown={handleKeyDown} ref={inputTextArea} onChange={(e) => setPayload(e.target.value)} placeholder='Type Your Questions here...' className='grow px-2 py-1 resize-none max-h-[90px] focus:outline-none focus-visible:outline-none' style={{ height: '32px' }} />
        <div onClick={handleSend} className='w-6 cursor-pointer'>
          <PaperAirplaneIcon />
        </div>
      </div>
    </div>
  </div>

  const segmentComponent = <div className='md:col-span-1 space-y-6 xl:pl-32'>
    <HomeSettingEdit containerClassName='hidden md:block' contentClassName='text-[40pt] font-bold text-center' color='[#ee484d]' valueKey='segmentTitle' />
    <HomeSettingEdit contentClassName='text-4xl text-center md:text-start' color='[#454545]' valueKey='segmentSubTitle' />
    <div className='border-t space-y-12 pt-10'>
      <div className='flex items-center gap-4'>
        <HomeSettingEdit containerClassName='min-w-[120px]' contentClassName='text-2xl font-bold min-w-[120px]' color='[#ee484d]' valueKey='segmentLabel1' />
        <div className='text-[#454545] text-2xl lg:text-3xl border-l px-4' style={{ overflowWrap: 'anywhere' }}>
          {segment?.brochure?.segment || 'Uncertain'}
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <HomeSettingEdit containerClassName='min-w-[120px]' contentClassName='text-2xl font-bold min-w-[120px]' color='[#ee484d]' valueKey='segmentLabel2' />
        <div className='text-[#454545] text-4xl border-l px-4'>
          {segment?.percentage || '0'}%
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <HomeSettingEdit containerClassName='min-w-[120px]' contentClassName='text-2xl font-bold min-w-[120px]' color='[#ee484d]' valueKey='segmentLabel3' />
        <div className='text-[#454545] border-l px-4'>
          {segment?.rationale || 'The user has not provided enough information yet.'}
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <HomeSettingEdit containerClassName='min-w-[120px]' contentClassName='text-2xl font-bold min-w-[120px]' color='[#ee484d]' valueKey='segmentLabel4' />
        <div className='text-[#454545] text-4xl border-l px-4'>
          {segment?.brochure?.number || ''}
        </div>
      </div>
    </div>
  </div>

  return (
    <>
      <Hero className='snap-end md:snap-align-none' />
      {
        windowsWidth > 768 &&
        <div className='w-full py-6 px-6 hidden md:block'>
          <div className='container mx-auto space-y-24 md:space-y-0 md:grid md:grid-cols-2 md:gap-24'>
            {chatComponent}
            {segmentComponent}
          </div>
        </div>
      }
      {
        windowsWidth <= 768 &&
        <>
          <div className='container mx-auto px-6 md:hidden snap-start md:snap-align-none'>
            {chatComponent}
          </div>
          <div className='container mx-auto px-6 md:hidden snap-start md:snap-align-none'>
            {segmentComponent}
          </div>
        </>
      }
      <div className='mt-32 text-center'>
        <Link className='text-white bg-[#ee484d] py-4 px-6 rounded-md font-bold cursor-pointer' to='/download'>
          DOWNLOAD BROCHURE
        </Link>
      </div>
    </>
  )
}