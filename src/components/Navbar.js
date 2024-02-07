import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowRightStartOnRectangleIcon, UsersIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { UsersIcon as UsersIconSolid, Cog6ToothIcon as Cog6ToothIconSolid } from '@heroicons/react/24/solid'
import { setUser } from '../store/appSlice'
import setAuthToken from '../utils/setAuthToken'

export default function Navbar({
  className
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();
  const { pathname } = location;

  const isAdmin = useSelector(state => state.app.user?.role === 'ADMIN')

  const isAuthenticated = useSelector(state => state.app.token)

  return (
    <div className={`w-full bg-[#ee484d] px-6 ${className ? className : ''}`}>
      <div className='container mx-auto flex justify-between items-center text-white py-4'>
        <Link className='text-base sm:text-3xl md:text-4xl cursor-pointer' to='/'>
          <span className='font-bold'>The New Widgets</span> 2000
        </Link>
        <div className='flex gap-2 md:gap-4 items-center'>
          <Link to='/find-out-more' className={`border border-white rounded-md text-sm md:text-base px-2 md:px-4 py-2 cursor-pointer h-fit ${pathname.startsWith('/find-out-more') && 'text-[#ee484d] bg-white'}`}>
            Find Out More
          </Link>
          {
            isAdmin &&
            <Link to='/setting' className={`cursor-pointer h-fit`}>
              <div className='w-6 md:w-8'>
                {
                  !pathname.startsWith('/setting') &&
                  <Cog6ToothIcon />
                }
                {
                  pathname.startsWith('/setting') &&
                  <Cog6ToothIconSolid />
                }
              </div>
            </Link>
          }
          {
            !isAuthenticated &&
            <Link to='/login' className={`rounded-md cursor-pointer h-fit`}>
              <div className='w-6 md:w-8'>
                {
                  pathname.startsWith('/login') &&
                  <UsersIconSolid />
                }
                {
                  !pathname.startsWith('/login') &&
                  <UsersIcon />
                }
              </div>
            </Link>
          }
          {
            isAuthenticated &&
            <button className='rounded-md cursor-pointer h-fit' onClick={() => {
              dispatch(setUser(null))
              setAuthToken(null)
              navigate('/login')
            }}>
              <div className='w-6 md:w-8'>
                <ArrowRightStartOnRectangleIcon />
              </div>
            </button>
          }
        </div>
      </div>
    </div>
  )
}