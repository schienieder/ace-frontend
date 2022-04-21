import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'
import moment from 'moment'

const initialState = {
    eventsSummary : [],
    isLoading : false
}

export const fetchEventsSummary = createAsyncThunk(
    'events/fetchEventsSummary',
    async () => {
        const api = process.env.NEXT_PUBLIC_DRF_API
        const jwt_token = Cookies.get('jwt')
        const eventsSummary = await axios.get(`${api}events_summary/`, {
            headers : {'Authorization' : 'Bearer'+' '+jwt_token}
        })
        return JSON.parse(eventsSummary.data)
    }
)

const eventsSlice = createSlice({
    name : 'events',
    initialState,
    reducers : {},
    extraReducers : builder => {
        builder.addCase(fetchEventsSummary.pending, (state) => {
            return {...state, isLoading : true}
        })
        builder.addCase(fetchEventsSummary.fulfilled, (state, action) => {
            return {...state, isLoading : false, eventsSummary : action.payload}
        })
        builder.addCase(fetchEventsSummary.rejected, (state) => {
            return {...state, isLoading : false}
        })
    }
})

export default eventsSlice.reducer