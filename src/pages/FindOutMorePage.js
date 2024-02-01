import React, { useEffect, useState } from 'react'
import Editor from '../components/Editor'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setLoading } from '../store/appSlice'
import showToaster from '../utils/showToaster'

export default function FindOutMorePage() {
  const dispatch = useDispatch()
  const [content, setContent] = useState('')
  const isAuthenticated = useSelector(state => state.app.token)

  const loadSetting = async () => {
    dispatch(setLoading(true))
    try {
      const { data: response } = await axios.get(process.env.REACT_APP_API_URL + '/api/find-out-more')
      setContent(response.findOutMore.content)
    } catch (err) {
      showToaster(err?.response?.data?.message)
    }
    dispatch(setLoading(false))
  }

  const handleSubmit = async (e) => {
    e?.preventDefault()
    dispatch(setLoading(true))
    try {
      const { data: response } = await axios.post(process.env.REACT_APP_API_URL + '/api/admin/find-out-more', { content })
    } catch (err) {
      showToaster(err?.response?.data?.message)
    }
    dispatch(setLoading(false))
  }

  useEffect(() => {
    loadSetting()
  }, [])
  return (
    <>
      <div className='w-full h-full py-6 px-6'>
        <div className='container mx-auto space-y-6'>
          {
            !isAuthenticated &&
            <div className='ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred' style={{ overflowWrap: 'break-word' }} dangerouslySetInnerHTML={{ __html: content }} />
          }
          {
            !!isAuthenticated &&
            <div className='w-full space-y-6'>
              <Editor onChange={setContent} data={content} />
              <div className='w-full flex justify-end gap-6'>
                <button
                  type="button"
                  className="rounded-lg bg-rose-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
                  onClick={loadSetting}
                >
                  Reload
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleSubmit}
                >
                  Update
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  )
}