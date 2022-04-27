import React, { Fragment, useState, useEffect, useMemo, useRef } from 'react'
import TopNav from '../../components/admin/TopNav'
import SideNav from '../../components/admin/SideNav'
import Footer from '../../components/Footer'
import PageHeader from '../../components/PageHeader'
import adminStyles from '../../styles/Admin.module.css'
import { useRouter } from 'next/router'
import { Dialog, Transition, Menu } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMessages } from '../../redux/messages/messages.slice'
import { fetchChatRooms } from '../../redux/chatrooms/chatRooms.slice'
import BeatLoader from 'react-spinners/BeatLoader'
import ChatHeader from '../../components/ChatHeader'
import ScrollableFeed from 'react-scrollable-feed'
import randomstring from 'randomstring'
import useDarkMode from '../../hooks/useDarkMode'

export default function messages() {
    const api = process.env.NEXT_PUBLIC_DRF_API
    const socket_api = process.env.NETXT_PUBLIC_DRF_SOCKET
    const router = useRouter()
    const [userName, setUsername] = useState()
    const [isOpen, setIsOpen] = useState(false);
    
    const [userChat, setUserChat] = useState('')
    const [chatMessages, setChatMessages] = useState([]);
    const [roomName, setRoomName] = useState('');
    const [roomSearch, setRoomSearch] = useState('')
    
    const dispatch = useDispatch()
    const { isLoading } = useSelector(state => state.messagesState)
    const { rooms, loading } = useSelector(state => state.chatRoomsState)
    const [roomsList, setRoomsList] = useState([])
    const messagesContainerRef = useRef()

    const { isDarkMode } = useDarkMode()
    
    const readRole = () => {
        setUsername(localStorage.getItem('username'))
        const role = localStorage.getItem('role')
        if (role !== 'admin') {
            router.push('/login')
        }
    }
    const client = useMemo(() => {
        return new W3CWebSocket(`ws://${socket_api}/ws/chat/${roomName ? roomName : userName}/`)
    }, [roomName])
    useEffect(() => {
        dispatch(fetchChatRooms()).then(res => setRoomsList(res.payload))
        readRole()
        client.onopen = () => {
            console.log('WebSocket Connection Successful!')
        }
    }, [])
    useEffect(() => {
        client.onmessage = (message) => {
            const serverData = JSON.parse(message.data)
            if (serverData) {
                setChatMessages([
                    ...chatMessages,
                    serverData
                ])
            }
        }
    }, [chatMessages])
    useEffect(() => {
        let searchTimeOut;
        if (rooms.length) {
            searchTimeOut = setTimeout(() => {
                const filteredRooms = rooms.filter(room => {
                    if (roomSearch === '') {
                        return room
                    }
                    else if (room.room_name.toLowerCase().includes(roomSearch.toLowerCase())) {
                        return room
                    }
                })
                setRoomsList(filteredRooms)
            }, 800)
        }
        return () => {
            clearTimeout(searchTimeOut)
        }
    }, [roomSearch])
    
    const { register, reset, handleSubmit, formState : { errors } } = useForm()
    const closeModal = () => {
        setIsOpen(false)
    }
    const openModal = () => {
        setIsOpen(true)
    }
    const addRoomGroup = (data) => {
        const jwt_token = Cookies.get('jwt')
        axios({
            method : 'POST',
            url : `${api}new_chatroom/`,
            headers : {
                'Authorization' : 'Bearer'+' '+jwt_token,
                'Content-Type' : 'application/json'
            },
            data : {
                room_name : data.room_name,
                room_key : data.room_key
            }
        }).then(() => {
            setIsOpen(false)
            reset()
            Swal.fire({
                icon : 'success',
                title: 'Group Creation Successsful',
                timer : 3000,
                text: `Group has been successfully created!`,
                showCloseButton: true,
                confirmButtonColor: '#DB2777',
            })
            dispatch(fetchChatRooms()).then(res => setRoomsList(res.payload))
        }).catch((error) => {
            Swal.fire({
                icon : 'error',
                title: 'Server Error',
                timer : 3000,
                text: error.message,
                showCloseButton: true,
                confirmButtonColor: '#DB2777',
            })
        })
    }
    const onSearchRoom = (room) => {
        setRoomSearch(room)
    }
    const sendChat = (e) => {
        e.preventDefault()
        if (!roomName.length) {
            Swal.fire({
                icon : 'error',
                title: 'Invalid Action',
                timer : 3000,
                text: 'Select a chat room first!',
                showCloseButton: true,
                confirmButtonColor: '#DB2777',
            })
        }
        else {
            client.send(JSON.stringify({
                type : 'message',
                content : userChat,
                username : userName
            }))
            setUserChat('')
        }
    }
    const setChat = (room_key, room_id) => {
        setChatMessages([])
        setRoomName(room_key)
        dispatch(fetchMessages(room_id)).then(res => setChatMessages(res.payload))
        console.log(messagesContainerRef)
        // messagesContainerRef.current.style.overflowY = "auto"
    }
    return (
        <div className={`${isDarkMode ? 'dark' : ''} w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800`}>
            <SideNav isActive="" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav username={ userName } />
                <div className="row-start-2 w-full h-full bg-true-100 dark:bg-gray-800">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Messages">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-7 w-7 text-gray-800 dark:text-gray-300" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                            </svg>
                        </PageHeader>
                        {/* Start of Create Modal */}
                        <Transition appear show={isOpen} as={Fragment}>
                            <Dialog
                                as="div"
                                className="fixed inset-0 z-20 overflow-y-auto backdrop-filter backdrop-brightness-50"
                                onClose={closeModal}
                            >
                            <div className="min-h-screen px-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition duration-[150ms]"
                                    enterFrom="scale-50"
                                    enterTo="scale-100"
                                    leave="transform transition duration-[150ms]"
                                    leaveFrom="scale-100"
                                    leaveTo="scale-50"
                                >
                                    <Dialog.Overlay className="fixed inset-0" />
                                </Transition.Child>

                                {/* This element is to trick the browser into centering the modal contents. */}
                                <span
                                    className="inline-block h-screen align-middle"
                                    aria-hidden="true"
                                >
                                &#8203;
                                </span>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                <div className="inline-block w-client-profile-form-container my-8 p-5 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl border-b border-gray-200 rounded-xl">
                                    <div className="p-5 border border-gray-300 rounded-xl">
                                        
                                        <div className="w-full flex justify-end">
                                            <button
                                                type="button"
                                                className="p-2 text-sm font-medium text-gray-400 hover:text-gray-600 color-transition bg-transparent focus:outline-none rounded-full"
                                                onClick={closeModal}
                                            >
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="h-5 w-5" 
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                        <form 
                                            className="flex flex-col items-center gap-y-6"
                                            onSubmit={ handleSubmit(addRoomGroup) }
                                        >

                                            <h4 className="text-base font-bold">New Group Chat</h4>

                                            {/* This is for the name field */}

                                            <div className="flex flex-col gap-y-1">
                                                <label className="inputFieldLabel">Room Name</label>
                                                <div className="inputContainer">
                                                    <svg 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        className="inputIcon" 
                                                        fill="none" 
                                                        viewBox="0 0 24 24" 
                                                        stroke="currentColor"
                                                        >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <input
                                                        type="text"
                                                        { ...register("room_name", { required : "This field cannot be empty" }) } 
                                                        className="w-64 py-0 px-0 border-transparent border-none focus:outline-none focus:ring-transparent text-sm text-gray-800"
                                                        autoComplete='off'
                                                    />
                                                </div>
                                                { 
                                                    errors.room_name && 
                                                    <div className="flex items-center gap-x-1 text-red-500">
                                                        <AuthErrorIcon />
                                                        <p className="text-xs">{ errors.room_name.message }</p>
                                                    </div> 
                                                }
                                            </div>
                                                
                                            <div className="flex flex-col gap-y-1">
                                                <label className="inputFieldLabel">Room Key</label>
                                                <div className="inputContainer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="inputIcon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                                    </svg>
                                                    <input
                                                        type="text"
                                                        { ...register("room_key", { required : "This field cannot be empty" }) } 
                                                        className="w-64 py-0 px-0 border-transparent border-none focus:outline-none focus:ring-transparent text-sm text-gray-800"
                                                        autoComplete='off'
                                                        readOnly
                                                        defaultValue={ randomstring.generate(25) }
                                                    />
                                                </div>
                                                { 
                                                    errors.room_key && 
                                                    <div className="flex items-center gap-x-1 text-red-500">
                                                        <AuthErrorIcon />
                                                        <p className="text-xs">{ errors.room_key.message }</p>
                                                    </div> 
                                                }
                                            </div>

                                            <div className="w-full pr-2 mt-5 flex justify-end gap-x-3">
                                                <button
                                                    className="modalAddBtn color-transition"
                                                >
                                                    <p className="btnText">Save</p>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="modalCloseBtn color-transition"
                                                    onClick={ closeModal }
                                                >
                                                    <p className="btnText">Close</p>
                                                </button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                                </Transition.Child>
                            </div>
                            </Dialog>
                        </Transition>
                        {/* End of Create Modal */}
                        <div className="card w-full grid grid-cols-custom-layout gap-x-5">

                            {/* Chat names part */}
                            <div className="col-start-1 rounded-xl flex flex-col border border-gray-300 dark:border-gray-700 p-5 gap-y-3">
                                <div className="flex flex-col gap-y-2">
                                    <div className="searchBarContainer dark:border-gray-700">
                                        <input 
                                            type="text"
                                            className="searchBarInput dark:bg-gray-900 dark:text-gray-300"
                                            placeholder="Search Room Name . . ."
                                            onChange={ e => onSearchRoom(e.target.value) }
                                        />
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="inputIcon dark:text-gray-500" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <button 
                                        className={`${ adminStyles.addBtn } color-transition`}
                                        onClick={ openModal }
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-5 w-5 text-current" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        <p className="text-sm font-bold">New Group</p>
                                    </button>
                                </div>
                                <div className="w-full h-screen py-3 divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto">
                                    {
                                        loading ? <div className="flex justify-center"><BeatLoader color="#9ca3af" loading={ loading } size={15} /></div>
                                        : roomsList.map(room => (
                                            <div 
                                                className="flex items-center gap-x-2 pl-3 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800  color-transition"
                                                key={ room.id }
                                                onClick={ () => setChat(room.room_key, room.id) }
                                            >
                                                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                                <p className="text-xs font-medium dark:text-gray-300">{ room.room_name }</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            {/* Messages part */}
                            <div className="col-start-2 w-full h-full border border-gray-300 dark:border-gray-700 rounded-xl flex flex-col p-5 gap-y-5">
                                { roomName ? <ChatHeader roomKey={ roomName } /> : null }
                                <div
                                    id="messagesContainer"
                                    ref={ messagesContainerRef } 
                                    className="w-full h-messages-container bg-gray-100 dark:bg-gray-800 rounded-xl p-5 flex flex-col justify-end gap-y-5 overflow-y-auto"
                                >
                                    {/* {
                                        isLoading ?
                                        <div className="flex flex-col h-full justify-center items-center">
                                            <h4 className="text-md">Loading</h4>
                                            <BeatLoader color="#9ca3af" loading={ isLoading } size={15} />
                                        </div>
                                        : messages.map((message, index) => (
                                            <div 
                                                className={`${message.username === userName ? 'chatPositionEnd' : 'chatPositionStart'}`}
                                                key={index}
                                            >
                                                <div className='w-14 h-14 bg-white rounded-full shadow-sm'></div>
                                                <div className={`${message.username === userName ? 'selfMessage' : 'chatMessage'}`}>
                                                    <h4 className='text-sm font-bold'>{ message.sender_name }</h4>
                                                    <p className='text-xs'>{ message.content }</p>
                                                </div>
                                            </div>
                                        ))
                                    } */}
                                    {
                                        isLoading ? 
                                        <div className="flex flex-col h-full justify-center items-center">
                                            <h4 className="text-md">Loading</h4>
                                            <BeatLoader color="#9ca3af" loading={ isLoading } size={15} />
                                        </div>
                                        : chatMessages.map((message, index) => (
                                            <div 
                                                className={`${message.username === userName ? 'chatPositionEnd' : 'chatPositionStart'}`}
                                                key={index}
                                            >
                                                <div className='w-14 h-14 bg-white rounded-full shadow-sm'></div>
                                                <div className={`${message.username === userName ? 'selfMessage' : 'chatMessage'}`}>
                                                    <h4 className='text-sm font-bold'>{ message.sender_name }</h4>
                                                    <p className='text-xs max-w-xs'>{ message.content }</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <form 
                                    className="flex items-center gap-x-3 bottom-0"
                                    onSubmit={ sendChat }
                                >
                                    {/* <button className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-pink-600 color-transition">
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-4 w-4 text-current" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                    <button className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-pink-600 color-transition">
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-4 w-4 text-current" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                        </svg>
                                    </button> */}
                                    <div 
                                        className="w-full flex gap-x-1 px-2 py-1 items-center border border-gray-300 dark:border-gray-700 focus-within:border-gray-600 rounded-lg"
                                    >
                                        <input 
                                            type="text"
                                            className="flex-1 px-0 py-0 border-transparent focus:outline-none focus:ring-transparent focus:border-transparent text-sm dark:bg-gray-900 dark:text-gray-300"
                                            placeholder="Type your message . . ."
                                            onChange={ e => setUserChat(e.target.value) }
                                            value={ userChat }
                                        />
                                    </div>
                                    <button className="p-3 rounded-lg bg-pink-600 hover:bg-pink-500 text-white color-transition">
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-4 w-4 text-current transform rotate-90" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    </button>
                                </form>
                            </div>

                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

// export const getServerSideProps = async ({ req }) => {
//     const api = process.env.NEXT_PUBLIC_DRF_API
//     const token = req.cookies.jwt
//     const res1 = await fetch(`${api}chatroom_list/`,{
//         method : 'GET',
//         headers : {'Authorization' : 'Bearer'+' '+token}
//     })
//     const data1 = await res1.json()
//     return {
//         props : {
//             chatRooms : data1
//         }
//     }
// }