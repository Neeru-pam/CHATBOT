import {createSlice} from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name:"message",
    initialState:{
        messages:null,
        unreadMessages: {},
    },
    reducers:{
        setMessages:(state,action)=>{
            state.messages = action.payload;
        },
        setUnreadMessages:(state, action) => {
            state.unreadMessages = action.payload;
        },
        decrementUnreadMessages:(state, action) => {
            const senderId = action.payload;
            if (state.unreadMessages[senderId]) {
                delete state.unreadMessages[senderId];
            }
        }
    }
});
export const {setMessages, setUnreadMessages, decrementUnreadMessages} = messageSlice.actions;
export default messageSlice.reducer;

