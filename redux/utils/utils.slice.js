import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDarkMode : false
}

const utilsSlice = createSlice({
    name : 'utils',
    initialState,
    reducers : {
        getDarkMode : (state) => {
            let darkState;
            if (localStorage.isDarkMode) {
                localStorage.isDarkMode === 'true' ? darkState = true : darkState = false
            }
            return {...state, isDarkMode : darkState}
        },
        handleDarkMode : (state) => {
            const { isDarkMode } = state
            return {...state, isDarkMode : !isDarkMode}
        }
    }
})

export const { handleDarkMode, getDarkMode } = utilsSlice.actions
export default utilsSlice.reducer