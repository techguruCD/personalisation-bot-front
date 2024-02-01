import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { setUser } from '../store/appSlice'
import setAuthToken from '../utils/setAuthToken'

export default function Navbar({
  className
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();
  const { pathname } = location;

  const isAuthenticated = useSelector(state => state.app.token)

  return (
    <div className={`w-full bg-[#ee484d] px-6 ${className?className:''}`}>
      <div className='container mx-auto flex justify-between items-center text-white py-4'>
        <Link className='md:text-4xl cursor-pointer' to='/'>
          <span className='font-bold'>The New Widgets</span> 2000
        </Link>
        <div className='flex gap-4 items-center'>
          <Link to='/find-out-more' className={`border border-white rounded-md px-4 py-2 cursor-pointer h-fit ${pathname.startsWith('/find-out-more')&&'text-[#ee484d] bg-white'}`}>
            Find Out More
          </Link>
          {
            !isAuthenticated &&
            <Link to='/login' className={`border border-white rounded-md px-4 py-2 cursor-pointer h-fit ${pathname.startsWith('/login')&&'text-[#ee484d] bg-white'}`}>
              Members
            </Link>
          }
          {
            isAuthenticated &&
            <button className='border border-white rounded-md px-4 py-2 cursor-pointer h-fit' onClick={() => {
              dispatch(setUser(null))
              setAuthToken(null)
              navigate('/login')
            }}>
              LogOut
            </button>
          }
        </div>
      </div>
    </div>
  )
}