import { CheckIcon, PencilIcon, XMarkIcon, TrashIcon, DocumentPlusIcon, BookOpenIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import updateHomeSetting from '../utils/updateHomeSetting'
import axios from 'axios'

import { setLoading } from '../store/appSlice'
import convertFile2Base64 from '../utils/convertFile2Base64'
import showToaster from '../utils/showToaster'
import Pagination from '../components/Pagination'

function Brochure({ brochure, onUpdated }) {
  const dispatch = useDispatch()

  const fileInputRef = useRef(null)
  const onFileChange = async (e) => {
    const file = e.target?.files?.[0]
    if (!file) return;
    dispatch(setLoading(true))
    let fileData = await convertFile2Base64(file)
    await fileUpload(fileData)
    fileInputRef.current.value = null
    dispatch(setLoading(false))
  }

  async function fileUpload(fileData) {
    try {
      const { data: response } = await axios.post(process.env.REACT_APP_API_URL + '/api/admin/brochure-upload', {
        number: brochure.number,
        file: fileData
      })
      onUpdated?.(response.brochure);
      showToaster(response.message)
    } catch (err) {
      showToaster(err?.response?.data?.message || { error: 'Please try again later' })
    }
  }

  async function fileDelete(e) {
    e?.preventDefault()
    dispatch(setLoading(true))
    try {
      const { data: response } = await axios.post(process.env.REACT_APP_API_URL + '/api/admin/brochure-delete', {
        number: brochure.number
      })
      onUpdated?.(response.brochure)
      showToaster(response.message)
    } catch (err) {
      showToaster(err?.response?.data?.message || { error: 'Please try again later' })
    }
    dispatch(setLoading(false))
  }

  return (
    <>
      <div className='flex justify-between'>
        <input ref={fileInputRef} type="file" onChange={onFileChange} hidden />
        <div>{brochure.segment}</div>
        {
          brochure.file &&
          <div className='flex gap-2 text-[#454545]'>
            <a href={process.env.REACT_APP_API_URL + brochure.file} target='_blank' className='w-6 cursor-pointer'><BookOpenIcon /></a>
            <div className='w-6 cursor-pointer'><PencilIcon onClick={() => fileInputRef.current.click()} /></div>
            <div className='w-6 cursor-pointer'><TrashIcon onClick={fileDelete} /></div>
          </div>
        }
        {
          !brochure.file &&
          <div className='w-6 cursor-pointer'><DocumentPlusIcon onClick={() => { fileInputRef.current.click(); }} /></div>
        }
      </div>
      {
        (brochure.number < 6) && <hr />
      }
    </>
  )
}

function BotFiles() {
  const dispatch = useDispatch()

  const fileInputRef = useRef(null)

  const [botFiles, setbotFiles] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPage, setTotalPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  async function loadPage(page) {
    dispatch(setLoading(true))
    try {
      const { data: response } = await axios.get(process.env.REACT_APP_API_URL + '/api/admin/bot-files', {
        params: {
          page, pageSize
        }
      })
      setbotFiles(response.botFiles)
      setPage(response.page)
      setTotalPage(response.totalPage)
      setTotalCount(response.totalCount)
    } catch (err) {
      showToaster(err?.response?.data?.message || { error: 'Please try again later' })
    }
    dispatch(setLoading(false))
  }

  async function onFileChange(e) {
    const file = e.target?.files?.[0]
    if (!file) return;
    dispatch(setLoading(true))
    let fileData = await convertFile2Base64(file)
    await fileUpload(fileData)
    fileInputRef.current.value = null
    dispatch(setLoading(false))
  }

  async function fileUpload(fileData) {
    try {
      const { data: response } = await axios.post(process.env.REACT_APP_API_URL + '/api/admin/bot-file-upload', {
        ...fileData
      })
      showToaster(response.message)
      loadPage(page)
    } catch (err) {
      showToaster(err?.response?.data?.message || { error: 'Please try again later' })
    }
  }

  async function fileDelete(id) {
    dispatch(setLoading(true))
    try {
      const { data: response } = await axios.post(process.env.REACT_APP_API_URL + '/api/admin/bot-file-delete', { id })
      showToaster(response.message)
      loadPage(page)
    } catch (err) {
      showToaster(err?.response?.data?.message || { error: 'Please try again later' })
    }
    dispatch(setLoading(false))
  }

  useEffect(() => {
    loadPage(1)
  }, [])

  return (
    <div className='w-full space-y-6 text-[#454545]'>
      <input type='file' onChange={onFileChange} ref={fileInputRef} hidden />
      <div className='flex gap-6'>
        <label className='text-xl font-bold'>Sitebot Files</label>
        <div className='w-6 cursor-pointer'><DocumentPlusIcon onClick={() => { fileInputRef.current.click(); }} /></div>
      </div>
      <div className='w-full space-y-4 px-6'>
        {
          botFiles.map((botFile, index) => (
            <div key={index} className='space-y-6'>
              <div className='flex justify-between'>
                <div>{botFile.name}</div>
                <div className='flex gap-2'>
                  <a href={process.env.REACT_APP_API_URL + botFile.path} target='_blank' className='w-6 cursor-pointer'><BookOpenIcon /></a>
                  <div className='w-6 cursor-pointer'><TrashIcon onClick={() => fileDelete(botFile.id)} /></div>
                </div>
              </div>
              <hr />
            </div>
          ))
        }
        <Pagination getPage={loadPage} page={page} totalPage={totalPage} totalCount={totalCount} from={(page - 1) * pageSize + 1} to={(page - 1) * pageSize + botFiles.length} />
      </div>
    </div>
  )
}

function SettingEdit({ valueKey, title }) {
  const homeSetting = useSelector(state => state.app.homeSetting)
  const [value, setValue] = useState('')
  const [editing, setEditing] = useState(false)
  const editingRef = useRef(null)

  const resetEditingHeight = () => {
    let y = window.pageYOffset
    editingRef.current.style.height = '1px'
    editingRef.current.style.height = `${editingRef.current.scrollHeight + 2}px`;
    window.scrollTo(0, y)
  }

  const valuChanged = (e) => {
    setValue(e.target.value)
    resetEditingHeight()
  }

  useEffect(() => {
    if (!editing) {
      setValue(homeSetting?.[valueKey] || "")
      setTimeout(resetEditingHeight, 1);
    }
  }, [homeSetting])

  return (
    <div className='w-full text-[#454545]'>
      <div className='flex justify-between'>
        <label className='text-xl font-bold'>
          {title}
        </label>
        <div className='ml-auto w-fit flex gap-2 mb-1'>
          {
            editing &&
            <>
              <div
                onClick={() => updateHomeSetting(valueKey, editingRef, setEditing)}
                className={`cursor-pointer w-8 p-1.5 border border-[#454545] rounded-full`}><CheckIcon className={`text[#454545]`} /></div>
              <div
                onClick={(e) => {
                  setEditing(false)
                  setValue(homeSetting?.[valueKey])
                  setTimeout(resetEditingHeight, 1)
                }}
                className={`cursor-pointer w-8 p-1.5 border border-[#454545] rounded-full`}><XMarkIcon className={`text-[#454545]`} /></div>
            </>
          }
          {
            !editing &&
            <div
              onClick={() => {
                setEditing(true)
                editingRef.current.focus()
              }}
              className={`cursor-pointer w-8 p-1.5 border border-[#454545] rounded-full`}><PencilIcon className={`text-[#454545]`} /></div>
          }
        </div>
      </div>
      <textarea
        value={value}
        ref={editingRef}
        onChange={valuChanged}
        className='w-full px-2 py-1 resize-none border border-[#454545] rounded-md focus:outline-none focus-visible:outline-none' style={{ height: '32px' }} readOnly={!editing} />
    </div>
  )
}

export default function ChatbotSettingPage() {
  const dispatch = useDispatch()
  const [brochures, setBrochures] = useState([])
  const homeSetting = useSelector(state => state.app.homeSetting)

  function onBrochureUpdated(brochure) {
    const index = brochure.number;
    setBrochures([
      ...brochures.slice(0, index), brochure, ...brochures.slice(index + 1)
    ])
  }

  useEffect(() => {
    (async () => {
      dispatch(setLoading(true))
      try {
        const { data: response } = await axios.get(process.env.REACT_APP_API_URL + '/api/admin/brochures')
        setBrochures(response.brochures)
      } catch (err) {

      }
      dispatch(setLoading(false))
    })()
  }, [])

  return (
    <div className='w-full grow p-6'>
      <div className='container mx-auto space-y-12 mt-12'>
        <SettingEdit valueKey='greeting' title='Chatbot Greeting' />
        <hr />
        <SettingEdit valueKey='prompt' title='Chatbot Prompt' />
        <hr />
        <SettingEdit valueKey='widgetPrompt' title='Widget Prompt' />
        <hr />
        <div className='w-full space-y-4'>
          <label className='text-xl font-bold'>
            Brochures
          </label>
          <div className='w-full space-y-4 px-6'>
            {
              brochures.map((brochure, index) => <Brochure brochure={brochure} key={index} onUpdated={onBrochureUpdated} />)
            }
          </div>
        </div>
        <hr />
        <SettingEdit valueKey='sitebotGreeting' title='Sitebot Greeting' />
        <hr />
        <SettingEdit valueKey='sitebotPrompt' title='Sitebot Prompt' />
        <hr />
        <BotFiles />
      </div>

    </div>
  )
}