import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchChatRooms } from '../redux/chatrooms/chatRooms.slice'
import BeatLoader from 'react-spinners/BeatLoader'

const ChatRooms = () => {

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.chatRoomsState)
    const [roomsList, setRoomsList] = useState([])

    useEffect(() => {
        dispatch(fetchChatRooms()).then(res => setRoomsList(res.payload))
    }, [])

    const chatRooms = roomsList.map((room) => {
        <div 
            className="flex items-center gap-x-2 pl-3 py-3 cursor-pointer hover:bg-gray-50 color-transition"
            key={ room.id }
            // onClick={ () => setChat(room.room_key, room.id) }
        >
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <p className="text-xs font-medium">{ room.room_name }</p>
        </div>
    })

    return (
        <>
            { loading ? <BeatLoader color="#DB2777" loading={ loading } size={15} className="align-middle" /> : chatRooms }
        </>
    )
}

export default ChatRooms