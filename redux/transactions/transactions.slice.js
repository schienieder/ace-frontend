import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'

const initialState = {
    presentTransactions : [],
    pastTransactions : [],
    isLoadingTransactions : false
}

const api = process.env.NEXT_PUBLIC_DRF_API

export const fetchPastTransactions = createAsyncThunk(
    'transactions/fetchPastTransactions',
    async (transaction_year) => {
        const jwt_token = Cookies.get('jwt')
        const pastTransactions = await axios.get(`${api}past_transactions/${transaction_year}`, {
            headers : {'Authorization' : 'Bearer'+' '+jwt_token}
        })
        return JSON.parse(pastTransactions.data)
    }
)

const transactionsSlice = createSlice({
    name : 'transactions',
    initialState,
    reducers : {},
    extraReducers : builder => {
        // PAST TRANSACTIONS
        builder.addCase(fetchPastTransactions.pending, (state) => {
            return { ...state, isLoadingTransactions : true }
        })
        builder.addCase(fetchPastTransactions.fulfilled, (state, action) => {
            return { ...state, isLoadingTransactions : false, pastTransactions : action.payload }
        })
        builder.addCase(fetchPastTransactions.rejected, (state) => {
            return { ...state, isLoadingTransactions : false }
        })
    }
})

export default transactionsSlice.reducer