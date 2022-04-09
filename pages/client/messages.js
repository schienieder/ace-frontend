import React, { Fragment, useState, useMemo, useEffect } from 'react'
import SideNav from '../../components/client/SideNav'
import TopNav from '../../components/client/TopNav'
import Footer from '../../components/client/Footer'
import PageHeader from '../../components/client/PageHeader'
import clientStyles from '../../styles/Client.module.css'
import { useRouter } from 'next/router'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import jwt_decode from 'jwt-decode'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMessages } from '../../redux/messages/messages.slice'

export default function messages({ clientProfile, memberRooms, allRooms }) {
    const api = process.env.NEXT_PUBLIC_DRF_API
    const router = useRouter()
    const [userName, setUsername] = useState()
    const [isOpen, setIsOpen] = useState(false)

    const dispatch = useDispatch()
    const messages = useSelector(state => state.messagesState.messages)

    const [userChat, setUserChat] = useState('')
    const [chatMessages, setChatMessages] = useState([]);
    const [roomName, setRoomName] = useState('');
    
    const readRole = () => {
        setUsername(localStorage.getItem('username'))
        const role = localStorage.getItem('role')
        if (role !== 'client') {
            router.push('/login')
        }
    }
    const client = useMemo(() => {
        return new W3CWebSocket(`ws://localhost:8000/ws/chat/${roomName ? roomName : userName}/`)
    }, [roomName])
    useEffect(() => {
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
    const { register, reset, handleSubmit, formState : { errors } } = useForm()
    const closeModal = () => {
        setIsOpen(false)
    }
    const openModal = () => {
        setIsOpen(true)
    }
    const addRoomGroup = (data) => {
        console.log(data)
        const jwt_token = Cookies.get('jwt')
        console.log(jwt_token)
        axios({
            method : 'GET',
            url : `${api}group_room/${data.room_key}`,
            headers : {
                'Authorization' : 'Bearer'+' '+jwt_token,
                'Content-Type' : 'application/json'
            }
        }).then((res) => {
            if (res.status === 200) {
                console.log(res.data)
                console.log(clientProfile.id)
                axios({
                    method : 'POST',
                    url : `${api}add_client_group/`,
                    headers : {
                        'Authorization' : 'Bearer'+' '+jwt_token,
                        'Content-Type' : 'application/json'
                    },
                    data : {
                        client : clientProfile.id,
                        group_room : res.data.id
                    }
                }).then(() => {
                    reset()
                    Swal.fire({
                        icon : 'success',
                        title: 'Group Joining Successsful',
                        timer : 3000,
                        text: `Group has been successfully joined!`,
                        showCloseButton: true,
                        confirmButtonColor: '#DB2777',
                    })
                    setIsOpen(false)
                    router.push('/client/messages')
                }).catch((err) => {
                    reset()
                    Swal.fire({
                        icon : 'error',
                        title: 'Server Error',
                        timer : 3000,
                        text: err.message,
                        showCloseButton: true,
                        confirmButtonColor: '#DB2777',
                    })
                    setIsOpen(false)
                })
            }
        }).catch((error) => {
            reset()
            Swal.fire({
                icon : 'error',
                title: 'Not Found',
                timer : 3000,
                text: 'Group Chat Room Does Not Exist',
                showCloseButton: true,
                confirmButtonColor: '#DB2777',
            })
            setIsOpen(false)
        })
    }
    const sendChat = (e) => {
        client.send(JSON.stringify({
            type : 'message',
            message : userChat,
            username : userName
        }))
        setUserChat('')
        e.preventDefault()
    }
    const setChat = (room_key, room_id) => {
        setChatMessages([])
        setRoomName(room_key)
        dispatch(fetchMessages(room_id))
    }
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="messages" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav username={ userName } />
                <div className="row-start-2 w-full h-full bg-true-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Messages" />
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

                                            <h4 className="text-base font-bold">Join Group Chat</h4>

                                            {/* This is for the name field */}
                                                
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
                            <div className="col-start-1 rounded-xl flex flex-col border border-gray-300 p-5 gap-y-3">
                                <div className="flex flex-col gap-y-2">
                                    <div className="searchBarContainer">
                                        <input 
                                            type="text"
                                            className="searchBarInput"
                                            placeholder="Search Name . . ."
                                        />
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-5 w-5 text-current" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <button 
                                        className={`${ clientStyles.addBtn } justify-center color-transition`}
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
                                        <p className="text-sm font-bold">Join Group</p>
                                    </button>
                                </div>
                                <div className="w-full h-screen py-3 divide-y divide-gray-200 overflow-y-auto">
                                        {
                                            memberRooms.results.map(member => (
                                                allRooms.results.map(room => (
                                                    member.room === room.id ?
                                                    <div 
                                                        key={ room.id }
                                                        className="flex items-center gap-x-2 pl-3 py-3 cursor-pointer hover:bg-gray-50 color-transition"
                                                        onClick={ () => setChat(room.room_key, room.id) }
                                                    >
                                                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                                        <p className="text-xs font-medium">{ room.room_key === userName ? 'Ace Cadayona' : room.room_name }</p>
                                                    </div>
                                                    : null
                                                ))
                                            ))
                                        }
                                </div>
                            </div>

                            {/* Messages part */}
                            <div className="col-start-2 max-h-full border border-gray-300 rounded-xl flex flex-col p-5 gap-y-5 overflow-y-hidden">
                                <div className="w-full h-full bg-gray-100 rounded-xl p-5 flex flex-col justify-end gap-y-5 overflow-y-scroll">
                                    {
                                        messages.length ? messages.map((message, index) => (
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
                                        )) : null
                                    }
                                    {
                                        chatMessages.map((message, index) => (
                                            <div 
                                                className={`${message.username === userName ? 'chatPositionEnd' : 'chatPositionStart'}`}
                                                key={index}
                                            >
                                                <div className='w-14 h-14 bg-white rounded-full shadow-sm'></div>
                                                <div className={`${message.username === userName ? 'selfMessage' : 'chatMessage'}`}>
                                                    <h4 className='text-sm font-bold'>{ message.sender }</h4>
                                                    <p className='text-xs'>{ message.message }</p>
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
                                        className="w-full flex gap-x-1 px-2 py-1 items-center border border-gray-300 focus-within:border-gray-600 rounded-lg"
                                    >
                                        <input 
                                            type="text"
                                            className="flex-1 px-0 py-0 border-transparent focus:outline-none focus:ring-transparent focus:border-transparent text-sm"
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

export const getServerSideProps = async ({ req }) => {
    const api = process.env.NEXT_PUBLIC_DRF_API
    const token = req.cookies.jwt
    const decoded_token = jwt_decode(token)
    const res1 = await fetch(`${api}client_profile/${decoded_token.user_id}`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data1 = await res1.json()
    const res2 = await fetch(`${api}member_rooms/`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data2 = await res2.json()
    const res3 = await fetch(`${api}chatroom_list/`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data3 = await res3.json()
    return {
        props : {
            clientProfile : data1,
            memberRooms : data2,
            allRooms : data3
        }
    }
}