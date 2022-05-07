import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'

const initialState = {
    salesYears : [],
    monthlySales : [],
    totalSales : 0,
    yearSelected : new Date().getFullYear(),
    isLoading : false
}

const api = process.env.NEXT_PUBLIC_DRF_API

export const fetchSalesYears = createAsyncThunk(
    'sales/fetchSalesYears',
    async () => {
        const jwt_token = Cookies.get('jwt')
        const salesYears = await axios.get(`${api}sales_years/`, {
            headers : {'Authorization' : 'Bearer'+' '+jwt_token}
        })
        return JSON.parse(salesYears.data)
    }
)

export const fetchSalesSummary = createAsyncThunk(
    'sales/fetchSalesSummary',
    async (transaction_year) => {
        const jwt_token = Cookies.get('jwt')
        const salesSummary = await axios.get(`${api}monthly_sales/${transaction_year}`, {
            headers : {'Authorization' : 'Bearer'+' '+jwt_token}
        })
        return JSON.parse(salesSummary.data)
    }
)

export const fetchTotalSales = createAsyncThunk(
    'sales/fetchTotalSales',
    async (transaction_year) => {
        const jwt_token = Cookies.get('jwt')
        const totalSales = await axios.get(`${api}total_sales/${transaction_year}`, {
            headers : {'Authorization' : 'Bearer'+' '+jwt_token}
        })
        return JSON.parse(totalSales.data.total_sales)
    }
)

const salesSlice = createSlice({
    name : 'sales',
    initialState,
    reducers : {
        changeSelectedYear : (state, action) => {
            return {...state, yearSelected : action.payload}
        }
    },
    extraReducers : builder => {
        // SALES YEARS
        builder.addCase(fetchSalesYears.pending, (state) => {
            return {...state, isLoading : true}
        })
        builder.addCase(fetchSalesYears.fulfilled, (state, action) => {
            return {...state, isLoading : false, salesYears : action.payload}
        })
        builder.addCase(fetchSalesYears.rejected, (state) => {
            return {...state, isLoading : false}
        })
        // SALES SUMMARY
        builder.addCase(fetchSalesSummary.pending, (state) => {
            return {...state, isLoading : true}
        })
        builder.addCase(fetchSalesSummary.fulfilled, (state, action) => {
            return {...state, isLoading : false, monthlySales : action.payload}
        })
        builder.addCase(fetchSalesSummary.rejected, (state) => {
            return {...state, isLoading : false}
        })
        // TOTAL SALES
        builder.addCase(fetchTotalSales.pending, (state) => {
            return {...state, isLoading : true}
        })
        builder.addCase(fetchTotalSales.fulfilled, (state, action) => {
            return {...state, isLoading : false, totalSales : action.payload}
        })
        builder.addCase(fetchTotalSales.rejected, (state) => {
            return {...state, isLoading : false}
        })
    }
})

export const { changeSelectedYear } = salesSlice.actions

export default salesSlice.reducer