import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Withnavbar from './layouts/WithNavbar';
import NormalRoute from './components/routeHelper/NormalRoute';
import HomePage from './pages/HomePage';
import DownloadPage from './pages/DownloadPage';

import setAuthToken from './utils/setAuthToken'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setSetting, setUser } from './store/appSlice';
import axios from 'axios';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.app.loading)
  useEffect(() => {
    (async function () {
      if (localStorage.token) {
        try {
          const { data: user } = await axios.get(process.env.REACT_APP_API_URL + '/api/me')
          dispatch(setUser(user))
        } catch (err) {
          setAuthToken(null)
        }
      }
    })()
    window.addEventListener('storage', () => {
      if (!localStorage.token) dispatch(setUser(null))
    });
    (async function() {
      try {
        const {data: response} = await axios.get(process.env.REACT_APP_API_URL + '/api/home')
        dispatch(setSetting(response.setting))
      } catch (err) { }
    })()
  })
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Withnavbar />}>
            <Route exact path='/' element={<NormalRoute><HomePage /></NormalRoute>} />
            <Route exact path='/download' element={<NormalRoute><DownloadPage /></NormalRoute>} />
          </Route>
          <Route path='/admin' element={<Withnavbar />}>

          </Route>
        </Routes>
      </Router>
      {loading &&
        <div className='fixed inset-0 z-50' style={{ backdropFilter: 'blur(5px)' }}>
          <div className='flex w-full h-full justify-center items-center'>
            <div
              className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-orange-700 motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status">
              <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
              >Loading...</span>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default App;
