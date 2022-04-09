import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'

const initialState = {
    messages : [],
    username : ''
}

export const fetchMessages = createAsyncThunk(
    'messages/fetchMessages', 
    async (room_id) => {
        const api = process.env.NEXT_PUBLIC_DRF_API
        const jwt_token = Cookies.get('jwt')
        const res = await axios({
            method: 'GET',
            url : `${api}room_chats/${room_id}`,
            headers : {
                'Authorization' : 'Bearer'+' '+jwt_token,
                'Content-Type' : 'application/json'
            }
        })
        return res.data.results
    }
)

const messagesSlice = createSlice({
    name : 'messages',
    initialState,
    reducers : {},
    extraReducers: builder => {
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
            return {...state, messages : action.payload}
        })
    }
})

// export const { fetchMessages } = messagesSlice.actions
export default messagesSlice.reducer