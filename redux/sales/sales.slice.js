import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'

const initialState = {
    monthlySales : [],
    isLoading : false
}

export const fetchSalesSummary = createAsyncThunk(
    'sales/fetchSalesSummary',
    async () => {
        const api = process.env.NEXT_PUBLIC_DRF_API
        const jwt_token = Cookies.get('jwt')
        const salesSummary = await axios.get(`${api}monthly_sales/`, {
            headers : {'Authorization' : 'Bearer'+' '+jwt_token}
        })
        return JSON.parse(salesSummary.data)
    }
)

const salesSlice = createSlice({
    name : 'sales',
    initialState,
    reducers : {},
    extraReducers : builder => {
        builder.addCase(fetchSalesSummary.pending, (state) => {
            return {...state, isLoading : true}
        })
        builder.addCase(fetchSalesSummary.fulfilled, (state, action) => {
            return {...state, isLoading : false, monthlySales : action.payload}
        })
        builder.addCase(fetchSalesSummary.rejected, (state) => {
            return {...state, isLoading : false}
        })
    }
})

export default salesSlice.reducer