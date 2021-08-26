import React, { useState, useEffect } from 'react'
import TopNav from '../../components/admin/TopNav'
import SideNav from '../../components/admin/SideNav'
import Footer from '../../components/Footer'
import PageHeader from '../../components/PageHeader'
import ChatNames from '../../components/ChatNames'
import adminStyles from '../../styles/Admin.module.css'
import { useRouter } from 'next/router'

export default function reports() {
    const router = useRouter()
    const [userName, setUsername] = useState()
    const readRole = () => {
        setUsername(localStorage.getItem('username'))
        const role = localStorage.getItem('role')
        if (role !== 'admin') {
            router.push('/login')
        }
    }
    useEffect( async () => {
        await readRole()
    }, [])
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav username={ userName } />
                <div className="row-start-2 w-full h-full bg-true-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Messages">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-7 w-7 text-current" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                            </svg>
                        </PageHeader>
                        <div className="card w-full grid grid-cols-custom-layout gap-x-5">

                            {/* Chat names part */}
                            <div className="col-start-1 rounded-md flex flex-col border border-gray-300 p-5 gap-y-3">
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
                                        className={`${ adminStyles.addBtn } justify-center color-transition`}
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
                                        <p className="text-sm font-bold">New Chat</p>
                                    </button>
                                </div>
                                <div className="w-full h-screen py-3 divide-y divide-gray-200 overflow-y-auto">
                                    <ChatNames name="Angela Debut GC" time="3 seconds ago" />
                                    <ChatNames name="Kadayawan GC" time="1 minute ago" />
                                    <ChatNames name="Miakabudo Sewane" time="3 minutes ago" />
                                    <ChatNames name="Justine Rhei Torres" time="24 minutes ago" />
                                    <ChatNames name="Ailene Padaplin" time="17 hours ago" />
                                    <ChatNames name="Pepito Manaloto" time="1 day ago" />
                                    <ChatNames name="Kim Jeric Buemil" time="2 days ago" />
                                    <ChatNames name="Henry Mirafuentes" time="3 days ago" />
                                    <ChatNames name="Ovia Ganza" time="1 week ago" />
                                </div>
                            </div>

                            {/* Messages part */}
                            <div className="col-start-2 border border-gray-300 rounded-md flex flex-col p-5 gap-y-5">
                                <div className="w-full h-full bg-gray-100 rounded-md">

                                </div>
                                <div className="flex items-center gap-x-3 bottom-0">
                                    <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-teal-700 color-transition">
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
                                    <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-teal-700 color-transition">
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-4 w-4 text-current" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                        </svg>
                                    </button>
                                    <div 
                                        className="w-full px-3 flex items-center bg-gray-100 text-gray-400 rounded-md focus-within:text-teal-700 border-gray-200 focus-within:border-teal-700 focus-within:ring-1 focus-within:ring-teal-700"
                                    >
                                        <input 
                                            type="text"
                                            className="flex-1 px-1 bg-transparent placeholder-gray-400 rounded-l-full text-gray-700 text-sm border-none focus:outline-none focus:ring-transparent"
                                            placeholder="Type your message . . ."
                                        />
                                    </div>
                                    <button className="p-3 rounded-full bg-teal-800 hover:bg-teal-700 text-gray-50 color-transition">
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
                                </div>
                            </div>

                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}