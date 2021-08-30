import React, { useState, useEffect } from 'react'
import SideNav from '../../../components/client/SideNav'
import TopNav from '../../../components/client/TopNav'
import Footer from '../../../components/client/Footer'
import PageHeader from '../../../components/client/PageHeader'
import clientStyles from '../../../styles/Client.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function package_list() {
    const router = useRouter()
    const [userName, setUsername] = useState()
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
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="booking" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav username={ userName } />
                <div className="row-start-2 w-full h-full bg-true-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Package List" />
                        <div className="grid grid-rows-2 grid-cols-2 gap-5 w-full text-gray-700">
                            <div className="card flex flex-col gap-y-5">
                                <div className="flex flex-col">
                                    <h4 className="text-base font-bold">Package 1</h4>
                                    <p className="text-xs">(Limited Offer)</p>
                                </div>
                                <Link href="/client/bookings/add_booking">
                                    <a
                                        className={`${clientStyles.addBtn} justify-center color-transition w-44`}
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-4 w-4 text-current"
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                        </svg>
                                        <p className="text-sm font-bold">Choose Package</p>
                                    </a>
                                </Link>
                            </div>
                            <div className="card flex flex-col gap-y-5">
                                <h4 className="text-base font-bold">Package 2</h4>
                                <button
                                    className={`${clientStyles.addBtn} justify-center color-transition w-44`}
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-4 w-4 text-current"
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                    </svg>
                                    <p className="text-sm font-bold">Choose Package</p>
                                </button>
                            </div>
                            <div className="card flex flex-col gap-y-5">
                                <h4 className="text-base font-bold">Package 3</h4>
                                <button
                                    className={`${clientStyles.addBtn} justify-center color-transition w-44`}
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-4 w-4 text-current"
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                    </svg>
                                    <p className="text-sm font-bold">Choose Package</p>
                                </button>
                            </div>
                            <div className="card flex flex-col gap-y-5">
                                <h4 className="text-base font-bold">Customized Package</h4>
                                <button
                                    className={`${clientStyles.addBtn} justify-center color-transition w-44`}
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-4 w-4 text-current" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                    </svg>
                                    <p className="text-sm font-bold">Choose Package</p>
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
