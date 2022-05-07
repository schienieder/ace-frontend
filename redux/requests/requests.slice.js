import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'

const api = process.env.NEXT_PUBLIC_DRF_API
const jwt_token = Cookies.get('jwt')

const initialState = {
    requests : [],
    dashboardRequests : [],
    isLoading : false
}

export const fetchRequests = createAsyncThunk(
    'requests/fetchRequests',
    async () => {
        const requestsList = await axios.get(`${api}affiliations_list/`, {
            headers : {'Authorization' : 'Bearer'+' '+jwt_token}
        })
        return requestsList.results
    }
)

export const fetchDashboardRequests = createAsyncThunk(
    'requests/fetchDashboardRequests',
    async () => {
        const dashboardRequests = await axios.get(`${api}dashboard_affiliations/`, {
            headers : {'Authorization' : 'Bearer'+' '+jwt_token}
        })
        return JSON.parse(dashboardRequests.data)
    }
)

const requestsSlice = createSlice({
    name : 'requests',
    initialState,
    reducers : {},
    extraReducers : builder => {
        // FETCH REQUESTS
        builder.addCase(fetchRequests.pending, (state) => {
            return {...state, isLoading : true}
        })
        builder.addCase(fetchRequests.fulfilled, (state, action) => {
            return {...state, isLoading : false, requests : action.payload}
        })
        builder.addCase(fetchRequests.rejected, (state) => {
            return {...state, isLoading : false}
        })
        // FETCH DASHBOARD REQUESTS
        builder.addCase(fetchDashboardRequests.pending, (state) => {
            return {...state, isLoading : true}
        })
        builder.addCase(fetchDashboardRequests.fulfilled, (state, action) => {
            return {...state, isLoading : false, dashboardRequests : action.payload}
        })
        builder.addCase(fetchDashboardRequests.rejected, (state) => {
            return {...state, isLoading : false}
        })
    }
})

export default requestsSlice.reducer