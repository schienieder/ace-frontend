import React, { useState, useEffect } from 'react'
import SideNav from '../../../components/client/SideNav'
import TopNav from '../../../components/client/TopNav'
import Footer from '../../../components/Footer'
import PageHeader from '../../../components/client/PageHeader'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function select_date() {
    const router = useRouter()
    const [userName, setUsername] = useState('')
    const readRole = () => {
        setUsername(localStorage.getItem('username'))
        const role = localStorage.getItem('role')
        if (role !== 'client') {
            router.push('/login')
        }
    }
    useEffect( async () => {
        await readRole()
    }, [])
    const proceed = () => {
        router.push('/client/bookings/select_package')
    }
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="booking" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav username={ userName } />
                <div className="row-start-2 w-full h-full bg-true-100">
                    <div className="p-8 flex flex-col items-center gap-y-5 min-h-screen">
                        <div className="w-client-profile-form-container">
                            <PageHeader text="Date Selection">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-7 w-7 text-current" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                    >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </PageHeader>
                        </div>
                        <div className="w-client-profile-form-container card flex flex-col items-center gap-y-5">
                            <div className="w-57 flex flex-col gap-y-1">
                                <label htmlFor="profile_birth" className="text-sm text-gray-700 font-normal">Select a date that you want your event to be held on:</label>
                                <div className="inputContainer">
                                    <input
                                        type="date"
                                        className="inputFieldDateTime appearance-none"
                                    />
                                </div>
                            </div>
                            <div className="w-57">
                                <button 
                                    className="px-5 py-2 bg-pink-600 hover:bg-pink-500 rounded-lg text-white color-transition focus:outline-none"
                                    onClick={ () => proceed() }
                                >
                                    <p className="text-base font-bold tracking-wide">Save</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
