import React from 'react'
import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import {useSelector} from "react-redux";
import useGetUnreadMessages from '../hooks/useGetUnreadMessages';


const OtherUsers = () => {
    // my custom hook
    useGetOtherUsers();
    useGetUnreadMessages();
    const {otherUsers} = useSelector(store=>store.user);
    if (!otherUsers) return null; // early return in react
     
    return (
        <div className='overflow-auto flex-1'>
            {
                otherUsers?.map((user)=>{
                    return (
                        <OtherUser key={user._id} user={user}/>
                    )
                })
            }
            
        </div>
    )
}

export default OtherUsers
