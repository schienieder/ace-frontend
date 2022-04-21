import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'

const initialState = {
    rooms : [],
    memberRooms : [],
    loading : false
}

export const fetchChatRooms = createAsyncThunk(
    'chatrooms/fetchChatRooms', 
    async () => {
        const api = process.env.NEXT_PUBLIC_DRF_API
        const jwt_token = Cookies.get('jwt')
        const chatRooms = await axios.get(`${api}chatroom_list/`, {
            headers : {'Authorization' : 'Bearer'+' '+jwt_token}
        })
        return chatRooms.data.results
    }
)

export const fetchMemberRooms = createAsyncThunk(
    'chatrooms/fetchMemberRooms',
    async () => {
        const api = process.env.NEXT_PUBLIC_DRF_API
        const jwt_token = Cookies.get('jwt')
        const memberRooms = await axios.get(`${api}member_rooms/`, {
            headers : {'Authorization' : 'Bearer'+' '+jwt_token}
        })
        return memberRooms.data.results
    }
)

const chatRoomsSlice = createSlice({
    name : 'chatrooms',
    initialState,
    reducers : {},
    extraReducers : builder => {
        builder.addCase(fetchChatRooms.pending, (state) => {
            return {...state, loading : true}
        })
        builder.addCase(fetchChatRooms.fulfilled, (state, action) => {
            return {...state, rooms : action.payload, loading : false}
        })
        builder.addCase(fetchChatRooms.rejected, (state) => {
            console.log('Chat Rooms Fetch Failed')
            return {...state, loading : false}
        })
        builder.addCase(fetchMemberRooms.pending, (state) => {
            return {...state, loading : true}
        })
        builder.addCase(fetchMemberRooms.fulfilled, (state, action) => {
            return {...state, memberRooms : action.payload, loading : false}
        })
        builder.addCase(fetchMemberRooms.rejected, (state) => {
            console.log('Member Rooms Fetch Failed')
            return {...state, loading : false}
        })
    }
})

export default chatRoomsSlice.reducer