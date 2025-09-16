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
      {/* The conditional classes are updated for better responsive handling. */}
      <div className={`${isSidebarVisible ? 'block' : 'hidden'} sm:flex sm:flex-col w-full sm:w-[30%] md:w-[25%] border-r border-slate-500`}>
        <Sidebar />
      </div>
      <div className={`${isSidebarVisible ? 'hidden' : 'block'} sm:flex sm:flex-col flex-1`}>
        <MessageContainer />
      </div>
    </div>
  )
}

export default HomePage
