import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLoading } from '../store/appSlice'
import axios from 'axios'
import showToaster from '../utils/showToaster'
import Pagination from '../components/Pagination'
import moment from 'moment'

function WidgetBotHistory() {
  const dispatch = useDispatch()
  const [history, setHistory] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPage, setTotalPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  async function loadPage(page) {
    dispatch(setLoading(true))
    try {
      const { data: response } = await axios.get(process.env.REACT_APP_API_URL + '/api/bot-history', {
        params: {
          page, pageSize, type: 'widgetbot'
        }
      })
      setHistory(response.history)
      setPage(response.page)
      setTotalPage(response.totalPage)
      setTotalCount(response.totalCount)
    } catch (err) {
      showToaster(err?.response?.data?.message || { error: 'Please try again later' })
    }
    dispatch(setLoading(false))
  }

  useEffect(() => {
    loadPage(1)
  }, [])

  return (
    <>
      <div className="mt-8 flow-root">
        <label className='font-bold mb-2'>Widgetbot History</label>
        <div className="mx-4 -my-2 overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Time
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap text-center">
                    User #
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Question / Answer
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Segment / Percentage / Rationale
                  </th>
                  <th scope="col-2" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-pre text-wrap">
                    Chat List
                  </th>
                  <th scope="col-2" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-pre text-wrap">
                    Detection Result
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {history.map((history) => (
                  <tr key={history.email}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      {moment.utc(history.createdAt).local().format('yyyy-MM-DD HH:mm:ss')}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 text-center">
                      {history.chatbotIndex}
                    </td>
                    <td className="px-3 py-5 text-sm text-gray-500 break-all whitespace-normal">
                      <span class="font-bold">{history.question}</span><br />
                      {history.answer}
                    </td>
                    <td className="px-3 py-5 text-sm text-gray-500 break-all whitespace-normal">
                      <span class="font-bold">{history.segment || 'Uncertain'}</span>/{history.percentage || 0}%<br />
                      {history.rationale || ""}<br />
                    </td>
                    <td className="px-3 py-5 text-sm text-gray-500 break-all whitespace-normal whitespace-pre text-wrap">
                      {history.chatHistory || ""}
                    </td>
                    <td className="px-3 py-5 text-sm text-gray-500 break-all whitespace-normal whitespace-pre text-wrap">
                      {history.detection || ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination totalCount={totalCount} totalPage={totalPage} page={page} from={pageSize * (page - 1) + 1} to={pageSize * (page - 1) + history.length} getPage={loadPage} />
    </>
  )
}

function SitewideBotHistory() {
  const dispatch = useDispatch()
  const [history, setHistory] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPage, setTotalPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  async function loadPage(page) {
    dispatch(setLoading(true))
    try {
      const { data: response } = await axios.get(process.env.REACT_APP_API_URL + '/api/bot-history', {
        params: {
          page, pageSize, type: 'sitewidebot'
        }
      })
      setHistory(response.history)
      setPage(response.page)
      setTotalPage(response.totalPage)
      setTotalCount(response.totalCount)
    } catch (err) {
      showToaster(err?.response?.data?.message || { error: 'Please try again later' })
    }
    dispatch(setLoading(false))
  }

  useEffect(() => {
    loadPage(1)
  }, [])

  return (
    <>
      <div className="mt-8 flow-root">
        <label className='font-bold mb-2'>Sitewidebot History</label>
        <div className="mx-4 -my-2 overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Time
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap text-center">
                    User #
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Question / Answer
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {history.map((history) => (
                  <tr key={history.email}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      {moment.utc(history.createdAt).local().format('yyyy-MM-DD HH:mm:ss')}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 text-center">
                      {history.chatbotIndex}
                    </td>
                    <td className="px-3 py-5 text-sm text-gray-500 break-all whitespace-normal">
                      <span class="font-bold">{history.question}</span><br />
                      {history.answer}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination totalCount={totalCount} totalPage={totalPage} page={page} from={pageSize * (page - 1) + 1} to={pageSize * (page - 1) + history.length} getPage={loadPage} />
    </>
  )
}

export default function HistoryPage() {
  return (
    <div className='w-full grow p-6'>
      <div className='container mx-auto space-y-12 mt-12'>
        <WidgetBotHistory />
        <hr />
        <SitewideBotHistory />
      </div>
    </div>
  )
}