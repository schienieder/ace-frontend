import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'

const api = process.env.NEXT_PUBLIC_DRF_API


const initialState = {
    partners : [],
    isLoading : false
}

export const fetchPartners = createAsyncThunk(
    'partners/fetchPartners',
    async () => {
        const jwt_token = Cookies.get('jwt')
        const partnersList = await axios.get(`${api}partners_list/`, {
            headers : {'Authorization' : 'Bearer'+' '+jwt_token}
        })
        const allPartners = partnersList.data.results.map(p => {
            return {value : p.id, label : p.first_name+' '+p.last_name}
        })
        return allPartners
    }
)

const partnersSlice = createSlice({
    name : 'partners',
    initialState,
    reducers : {},
    extraReducers : builder => {
        builder.addCase(fetchPartners.pending, (state) => {
            return {...state, isLoading : true}
        })
        builder.addCase(fetchPartners.fulfilled, (state, action) => {
            return {...state, isLoading : false, partners : action.payload}
        })
        builder.addCase(fetchPartners.rejected, (state) => {
            return {...state, isLoading : false}
        })
    }
})

export default partnersSlice.reducer