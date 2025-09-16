import React from 'react'
import { useDispatch,useSelector } from "react-redux";
import { setSelectedUser, setIsSidebarVisible } from '../redux/userSlice';
import { decrementUnreadMessages } from '../redux/messageSlice';

const OtherUser = ({ user }) => {
    const dispatch = useDispatch();
    const {selectedUser, onlineUsers} = useSelector(store=>store.user);
    const { unreadMessages } = useSelector(store => store.message);
    const isOnline = onlineUsers?.includes(user._id);
    const unreadCount = unreadMessages && unreadMessages[user._id] ? unreadMessages[user._id] : 0;

    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
        dispatch(setIsSidebarVisible(false));
        if (unreadCount > 0) {
            dispatch(decrementUnreadMessages(user._id));
        }
    }
    return (
        <>
            <div onClick={() => selectedUserHandler(user)} className={` ${selectedUser?._id === user?._id ? 'bg-zinc-200 text-black' : 'text-white'} flex gap-2 hover:text-black items-center hover:bg-zinc-200 rounded p-2 cursor-pointer`}>
                <div className={`avatar ${isOnline ? 'online' : '' }`}>
                    <div className='w-12 rounded-full'>
                        <img src={user?.profilePhoto} alt="user-profile" />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex justify-between gap-2 '>
                        <p>{user?.fullName}</p>
                        {unreadCount > 0 && (
                            <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {unreadCount}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className='divider my-0 py-0 h-1'></div>
        </>
    )
}

export default OtherUser
