import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'

const api = process.env.NEXT_PUBLIC_DRF_API
const jwt_token = Cookies.get('jwt')

const initialState = {
    events : [],
    eventsSummary : [],
    dashboardEvents : [],
    isLoading : false
}

export const fetchEventsSummary = createAsyncThunk(
    'events/fetchEventsSummary',
    async () => {
        const eventsSummary = await axios.get(`${api}events_summary/`, {
            headers : {'Authorization' : 'Bearer'+' '+jwt_token}
        })
        return JSON.parse(eventsSummary.data)
    }
)

export const fetchEventsList = createAsyncThunk(
    'events/fetchEventsList',
    async () => {
        const eventsList = await axios.get(`${api}events_list/`, {
            headers : {'Authorization' : 'Bearer'+' '+jwt_token}
        })
        return eventsList.data.results
    }
)

export const fetchDashboardEvents = createAsyncThunk(
    'events/fetchDashboardEvents',
    async () => {
        const dashboardEvents = await axios.get(`${api}dashboard_events/`, {
            headers : {'Authorization' : 'Bearer'+' '+jwt_token}
        })
        return dashboardEvents.data.results
    }
)

const eventsSlice = createSlice({
    name : 'events',
    initialState,
    reducers : {},
    extraReducers : builder => {
        // FETCH EVENTS
        builder.addCase(fetchEventsList.pending, (state) => {
            return {...state, isLoading : true}
        })
        builder.addCase(fetchEventsList.fulfilled, (state, action) => {
            return {...state, isLoading : false, events : action.payload}
        })
        builder.addCase(fetchEventsList.rejected, (state) => {
            return {...state, isLoading : false}
        })
        // FETCH EVENTS SUMMARY
        builder.addCase(fetchEventsSummary.pending, (state) => {
            return {...state, isLoading : true}
        })
        builder.addCase(fetchEventsSummary.fulfilled, (state, action) => {
            return {...state, isLoading : false, eventsSummary : action.payload}
        })
        builder.addCase(fetchEventsSummary.rejected, (state) => {
            return {...state, isLoading : false}
        })
        // FETCH DASHBOARD EVENTS
        builder.addCase(fetchDashboardEvents.pending, (state) => {
            return {...state, isLoading : true}
        })
        builder.addCase(fetchDashboardEvents.fulfilled, (state, action) => {
            return {...state, isLoading : false, dashboardEvents : action.payload}
        })
        builder.addCase(fetchDashboardEvents.rejected, (state) => {
            return {...state, isLoading : false}
        })
    }
})

export default eventsSlice.reducer