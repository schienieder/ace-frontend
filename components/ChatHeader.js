import React, { Fragment } from 'react'
import adminStyles from '../styles/Admin.module.css'
import { Transition, Menu } from '@headlessui/react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'

const ChatHeader = ({ roomKey }) => {

    const api = process.env.NEXT_PUBLIC_DRF_API
    const { rooms } = useSelector(state => state.chatRoomsState)
    const chatRoom = rooms.find(room => room.room_key === roomKey)

    const deleteChatRoom = (room_name, room_key) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Delete chatroom ${room_name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DB2777',
            cancelButtonColor: '#9CA3AF',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            const jwt_token = Cookies.get('jwt')
            if (result.isConfirmed) {
                axios({
                    method : 'DELETE',
                    url : `${api}chatroom/destroy/${room_key}`,
                    headers : {'Authorization' : 'Bearer'+' '+ jwt_token}
                })
                .then(() => {
                    Swal.fire({
                        icon : 'success',
                        title : 'Deleted!',
                        text : 'ChatRoom has been deleted.',
                        confirmButtonColor: '#DB2777',
                        showCloseButton : true,
                        timer : 2000
                    })
                    setTimeout(() => {
                        location.reload()
                    }, 2000)
                })
                .catch((error) => {
                    Swal.fire({
                        icon : 'error',
                        title: 'Delete Error',
                        timer : 3000,
                        text: error.message,
                        showCloseButton: true,
                        confirmButtonColor: '#DB2777',
                    })
                })
            }
        })
    }

    return (
        <div className="w-full flex justify-between items-center">
            <h4 className="text-md font-bold dark:text-gray-300">{ chatRoom.room_name }</h4>
            <Menu as="div" className="flex justify-end">
                <Menu.Button
                    className="focus:outline-none text-gray-500 hover:text-gray-700 focus:text-gray-700"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={ adminStyles.actionBtnIcon } 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute z-10 w-56 mt-10 bg-white dark:bg-gray-800 divide-y divide-gray-200 rounded-md shadow-lg border border-gray-300 dark:border-gray-700 py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    // onClick={ handleLogOut }
                                    className={`${active ? adminStyles.popOverItemActive : adminStyles.popOverItem} w-full color-transition dark:hover:bg-gray-800`}
                                    onClick={ () => deleteChatRoom(chatRoom.room_name, chatRoom.room_key) }
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className={ adminStyles.actionBtnIcon }
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    <p className={ adminStyles.popOverText }>Delete Room</p>
                                </button>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
            {/* <Menu as="div">
                <Menu.Button
                    type="button"
                    className="flex items-center gap-x-1 p-2 focus:outline-none cursor-pointer"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={ adminStyles.actionBtnIcon } 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                </Menu.Button>
                <Transition
                    as="div"
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-300"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                >
                    <Menu.Items className={`${adminStyles.popOverContainer} ${isDarkMode ? adminStyles.popOverContainerDarkBg : adminStyles.popOverContainerBg}`}>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    // onClick={ handleLogOut }
                                    className={`${active ? adminStyles.popOverItemActive : adminStyles.popOverItem} color-transition dark:hover:bg-gray-800`}
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className={ adminStyles.actionBtnIcon }
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    <p className={ adminStyles.popOverText }>Delete Room</p>
                                </button>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu> */}
            {/* <button className="focus:outline-none text-gray-500 hover:text-gray-700 focus:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className={ adminStyles.actionBtnIcon } fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
            </button> */}
        </div>
    )
}

export default ChatHeader