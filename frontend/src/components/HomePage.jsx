import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const { authUser, isSidebarVisible } = useSelector(store => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);
  return (
    <div className='flex h-screen w-screen rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <div className={`w-full sm:w-1/3 md:w-1/4 ${isSidebarVisible ? 'block' : 'hidden'} sm:block`}>
        <Sidebar />
      </div>
      <div className={`w-full sm:w-2/3 md:w-3/4 ${isSidebarVisible ? 'hidden' : 'block'} sm:block`}>
        <MessageContainer />
      </div>
    </div>
  )
}

export default HomePage