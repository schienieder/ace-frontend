import React, { useState, useEffect } from 'react'
import adminStyles from '../styles/Admin.module.css'
import { useSelector } from 'react-redux'

const ChatHeader = ({ roomKey }) => {

    const [userName, setUsername] = useState('')
    const { memberRooms } = useSelector(state => state.chatRoomsState)
    const chatRoom = memberRooms.find(room => room.room_key === roomKey)

    useEffect(() => {
        setUsername(localStorage.getItem('username'))
    }, [])
    

    return (
        <div className="w-full flex justify-between items-center">
            <h4 className="text-md font-bold dark:text-gray-300">{ chatRoom.room_key === userName ? 'Ace Cadayona' : chatRoom.room_name }</h4>
            {/* <button className="focus:outline-none text-gray-500 hover:text-gray-700 focus:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className={ adminStyles.actionBtnIcon } fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
            </button> */}
        </div>
    )
}

export default ChatHeader