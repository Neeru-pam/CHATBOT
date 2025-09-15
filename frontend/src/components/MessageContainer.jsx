import React from 'react';
import SendInput from './SendInput';
import Messages from './Messages';
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser, setIsSidebarVisible } from '../redux/userSlice';
import { IoArrowBack } from "react-icons/io5";


const MessageContainer = () => {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const isOnline = onlineUsers?.includes(selectedUser?._id);

    const handleBack = () => {
        dispatch(setIsSidebarVisible(true));
        dispatch(setSelectedUser(null));
    }

    return (
        <>
            {
                selectedUser !== null ? (
                    <div className='md:min-w-[550px] flex flex-col h-full'>
                        <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>
                            <button onClick={handleBack} className="sm:hidden mr-2">
                                <IoArrowBack size={24} />
                            </button>
                            <div className={`avatar ${isOnline ? 'online' : ''}`}>
                                <div className='w-12 rounded-full'>
                                    <img src={selectedUser?.profilePhoto} alt="user-profile" />
                                </div>
                            </div>
                            <div className='flex flex-col flex-1'>
                                <div className='flex justify-between gap-2'>
                                    <p>{selectedUser?.fullName}</p>
                                </div>
                            </div>
                        </div>
                        <Messages />
                        <SendInput />
                    </div>
                ) : (
                    <div className='md:min-w-[550px] flex flex-col justify-center items-center h-full'>
                        <h1 className='text-4xl text-white font-bold'>Hi, {authUser?.fullName} </h1>
                        <h1 className='text-2xl text-white'>Let's start a conversation</h1>
                    </div>
                )
            }
        </>
    )
}

export default MessageContainer;