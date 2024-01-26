import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import './App.css';
import HeroImage from './assets/images/hero.png'
import Withnavbar from './layouts/WithNavbar';
import NormalRoute from './components/routeHelper/NormalRoute';
import HomePage from './pages/HomePage';
import DownloadPage from './pages/DownloadPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Withnavbar />}>
            <Route exact path='/' element={<NormalRoute><HomePage /></NormalRoute>} />
            <Route exact path='/download' element={<NormalRoute><DownloadPage /></NormalRoute>} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;
