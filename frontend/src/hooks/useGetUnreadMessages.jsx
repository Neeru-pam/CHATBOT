import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUnreadMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';

const useGetUnreadMessages = () => {
    const dispatch = useDispatch();
    const { socket } = useSelector(store => store.socket);
    const { unreadMessages } = useSelector(store => store.message);
    const { selectedUser } = useSelector(store => store.user);

    useEffect(() => {
        const fetchUnreadMessages = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${BASE_URL}/api/v1/message/unread`);
                dispatch(setUnreadMessages(res.data));
            } catch (error) {
                console.log(error);
            }
        };
        fetchUnreadMessages();
    }, [dispatch]);

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            // If the chat with the sender is already open, do not increment unread count
            if (selectedUser?._id === newMessage.senderId) {
                return;
            }

            const { senderId } = newMessage;
            const newUnread = { ...unreadMessages };
            newUnread[senderId] = (newUnread[senderId] || 0) + 1;
            dispatch(setUnreadMessages(newUnread));
        };

        socket?.on("newMessage", handleNewMessage);

        return () => {
            socket?.off("newMessage", handleNewMessage);
        };
    }, [socket, dispatch, unreadMessages, selectedUser]);
};

export default useGetUnreadMessages;
