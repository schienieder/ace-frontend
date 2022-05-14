import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'
import moment from 'moment'

const initialState = {
    venue_forecast : [],
    catering_forecast : [],
    styling_forecast : [],
    mc_forecast : [],
    presentation_forecast : [],
    courtesy_forecast : [],
    isLoadingForecast : false
}

const api = process.env.NEXT_PUBLIC_DRF_API

export const fetchVenueForecast = createAsyncThunk(
    'forecast/fetchVenueForecast',
    async () => {
        const jwt_token = Cookies.get('jwt')
        const venueForecast = await axios.get(`${api}venue_forecast/`, {
            headers : {'Authorization' : 'Bearer'+' '+jwt_token}
        })
        const json_data = JSON.parse(venueForecast.data)
        const formattedData = json_data.map(date => {
            return {...date, event_date : moment(date.event_date).format('ll')}
        })
        return formattedData
    }
)

export const fetchCateringForecast = createAsyncThunk(
    'forecast/fetchCateringForecast',
    async () => {
        const jwt_token = Cookies.get('jwt')
        const cateringForecast = await axios.get(`${api}catering_forecast/`, {
            headers : {'Authorization' : 'Bearer'+' '+jwt_token}
        })
        const json_data = JSON.parse(cateringForecast.data)
        const formattedData = json_data.map(date => {
            return {...date, event_date : moment(date.event_date).format('ll')}
        })
        return formattedData
    }
)

export const fetchStylingForecast = createAsyncThunk(
    'forecast/fetchStylingForecast',
    async () => {
        const jwt_token = Cookies.get('jwt')
        const stylingForecast = await axios.get(`${api}styling_forecast/`, {
            headers : {'Authorization' : 'Bearer'+' '+jwt_token}
        })
        const json_data = JSON.parse(stylingForecast.data)
        const formattedData = json_data.map(date => {
            return {...date, event_date : moment(date.event_date).format('ll')}
        })
        return formattedData
    }
)

export const fetchMCForecast = createAsyncThunk(
    'forecast/fetchMCForecast',
    async () => {
        const jwt_token = Cookies.get('jwt')
        const mcForecast = await axios.get(`${api}mc_forecast/`, {
            headers : {'Authorization' : 'Bearer'+' '+jwt_token}
        })
        const json_data = JSON.parse(mcForecast.data)
        const formattedData = json_data.map(date => {
            return {...date, event_date : moment(date.event_date).format('ll')}
        })
        return formattedData
    }
)

export const fetchPresentationForecast = createAsyncThunk(
    'forecast/fetchPresentationForecast',
    async () => {
        const jwt_token = Cookies.get('jwt')
        const presentationForecast = await axios.get(`${api}presentation_forecast/`, {
            headers : {'Authorization' : 'Bearer'+' '+jwt_token}
        })
        const json_data = JSON.parse(presentationForecast.data)
        const formattedData = json_data.map(date => {
            return {...date, event_date : moment(date.event_date).format('ll')}
        })
        return formattedData
    }
)

export const fetchCourtesyForecast = createAsyncThunk(
    'forecast/fetchCourtesyForecast',
    async () => {
        const jwt_token = Cookies.get('jwt')
        const courtesyForecast = await axios.get(`${api}courtesy_forecast/`, {
            headers : {'Authorization' : 'Bearer'+' '+jwt_token}
        })
        const json_data = JSON.parse(courtesyForecast.data)
        const formattedData = json_data.map(date => {
            return {...date, event_date : moment(date.event_date).format('ll')}
        })
        return formattedData
    }
)

const forecastSlice = createSlice({
    name : 'forecast',
    initialState,
    reducers : {},
    extraReducers : builder => {
        // VENUE FORECAST
        builder.addCase(fetchVenueForecast.pending, (state) => {
            return {...state, isLoadingForecast : true}
        })
        builder.addCase(fetchVenueForecast.fulfilled, (state, action) => {
            return {...state, isLoadingForecast : false, venue_forecast : action.payload}
        })
        builder.addCase(fetchVenueForecast.rejected, (state) => {
            return {...state, isLoadingForecast : false}
        })
        // CATERING FORECAST
        builder.addCase(fetchCateringForecast.pending, (state) => {
            return {...state, isLoadingForecast : true}
        })
        builder.addCase(fetchCateringForecast.fulfilled, (state, action) => {
            return {...state, isLoadingForecast : false, catering_forecast : action.payload}
        })
        builder.addCase(fetchCateringForecast.rejected, (state) => {
            return {...state, isLoadingForecast : false}
        })
        // STYLING FORECAST
        builder.addCase(fetchStylingForecast.pending, (state) => {
            return {...state, isLoadingForecast : true}
        })
        builder.addCase(fetchStylingForecast.fulfilled, (state, action) => {
            return {...state, isLoadingForecast : false, styling_forecast : action.payload}
        })
        builder.addCase(fetchStylingForecast.rejected, (state) => {
            return {...state, isLoadingForecast : false}
        })
        // MC FORECAST
        builder.addCase(fetchMCForecast.pending, (state) => {
            return {...state, isLoadingForecast : true}
        })
        builder.addCase(fetchMCForecast.fulfilled, (state, action) => {
            return {...state, isLoadingForecast : false, mc_forecast : action.payload}
        })
        builder.addCase(fetchMCForecast.rejected, (state) => {
            return {...state, isLoadingForecast : false}
        })
        // PRESENTATION FORECAST
        builder.addCase(fetchPresentationForecast.pending, (state) => {
            return {...state, isLoadingForecast : true}
        })
        builder.addCase(fetchPresentationForecast.fulfilled, (state, action) => {
            return {...state, isLoadingForecast : false, presentation_forecast : action.payload}
        })
        builder.addCase(fetchPresentationForecast.rejected, (state) => {
            return {...state, isLoadingForecast : false}
        })
        // COURTESY FORECAST
        builder.addCase(fetchCourtesyForecast.pending, (state) => {
            return {...state, isLoadingForecast : true}
        })
        builder.addCase(fetchCourtesyForecast.fulfilled, (state, action) => {
            return {...state, isLoadingForecast : false, courtesy_forecast : action.payload}
        })
        builder.addCase(fetchCourtesyForecast.rejected, (state) => {
            return {...state, isLoadingForecast : false}
        })
    }
})

export default forecastSlice.reducer