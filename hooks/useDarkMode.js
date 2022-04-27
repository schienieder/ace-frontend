import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { handleDarkMode, getDarkMode } from '../redux/utils/utils.slice'

const useDarkMode = () => {

    const { isDarkMode } = useSelector(state => state.utilsState)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDarkMode())
    }, [])
    

    const handleModeChange = () => {
        dispatch(handleDarkMode())
        localStorage.isDarkMode = isDarkMode ? 'false' : 'true'
    }

    return { isDarkMode, handleModeChange }
}

export default useDarkMode