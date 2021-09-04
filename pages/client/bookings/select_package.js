import React, { useState, useEffect } from 'react'
import SideNav from '../../../components/client/SideNav'
import TopNav from '../../../components/client/TopNav'
import Footer from '../../../components/Footer'
import PageHeader from '../../../components/client/PageHeader'
import clientStyles from '../../../styles/Client.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'


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
                        <PageHeader text="Budget Planning">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-7 w-7 text-current" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </PageHeader>
                        <div className="card w-full grid grid-cols-custom-layout gap-x-5">
                            {/* SEARCH-CATEGORY HERE */}
                            <div className="col-start-1 rounded-lg flex flex-col border border-gray-300 p-5 gap-y-5">
                                <div className="searchBarContainer">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-5 w-5 text-current" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <input 
                                        type="number"
                                        className="searchBarInput"
                                        placeholder="Enter Budget . . ."
                                    />
                                </div>
                                <p className="text-sm font-bold">Add Ons</p>
                                <div className="flex-1 flex items-center gap-x-3">
                                    <input 
                                        type="checkbox"
                                        value="5000"
                                        id="addon1"
                                        className="inputCheckbox"
                                    />
                                    <label htmlFor="addon1" className="text-sm text-gray-800 cursor-pointer">Unlimited Photobooth</label>
                                </div>
                                <div className="flex-1 flex items-center gap-x-3">
                                    <input 
                                        type="checkbox"
                                        value="5000"
                                        id="addon2"
                                        className="inputCheckbox"
                                    />
                                    <label htmlFor="addon2" className="text-sm text-gray-800 cursor-pointer">Aerial Videography</label>
                                </div>
                                <div className="flex-1 flex items-center gap-x-3">
                                    <input 
                                        type="checkbox"
                                        value="5000"
                                        id="addon3"
                                        className="inputCheckbox"
                                    />
                                    <label htmlFor="addon3" className="text-sm text-gray-800 cursor-pointer">Church Decor</label>
                                </div>
                                <div className="flex-1 flex items-center gap-x-3">
                                    <input 
                                        type="checkbox"
                                        value="15000"
                                        id="addon4"
                                        className="inputCheckbox"
                                    />
                                    <div className="flex flex-col">
                                        <label htmlFor="addon4" className="text-sm text-gray-800 cursor-pointer">Same Day Video Edit</label>
                                        <p className="text-xs">(with save the date video)</p>
                                    </div>
                                </div>
                                <div className="flex-1 flex items-center gap-x-3">
                                    <input 
                                        type="checkbox"
                                        value="5000"
                                        id="addon5"
                                        className="inputCheckbox"
                                    />
                                    <label htmlFor="addon5" className="text-sm text-gray-800 cursor-pointer">Confitte Blasters</label>
                                </div>
                                <div className="flex-1 flex items-center gap-x-3">
                                    <input 
                                        type="checkbox"
                                        value="10000"
                                        id="addon6"
                                        className="inputCheckbox"
                                    />
                                    <label htmlFor="addon6" className="text-sm text-gray-800 cursor-pointer">Indoor Fireworks</label>
                                </div>
                                <div className="flex-1 flex items-center gap-x-3">
                                    <input 
                                        type="checkbox"
                                        value="5000"
                                        id="addon7"
                                        className="inputCheckbox"
                                    />
                                    <label htmlFor="addon7" className="text-sm text-gray-800 cursor-pointer">Low Lying Fogs</label>
                                </div>
                                <div className="flex-1 flex items-center gap-x-3">
                                    <input 
                                        type="checkbox"
                                        value="5000"
                                        id="addon8"
                                        className="inputCheckbox"
                                    />
                                    <label htmlFor="addon8" className="text-sm text-gray-800 cursor-pointer">Pica - Pica</label>
                                </div>
                                <div className="flex-1 flex items-center gap-x-3">
                                    <input 
                                        type="checkbox"
                                        value="4000"
                                        id="addon9"
                                        className="inputCheckbox"
                                    />
                                    <label htmlFor="addon9" className="text-sm text-gray-800 cursor-pointer">Van on Wedding Day</label>
                                </div>
                                <p className="text-sm font-bold">Total Cost: </p>
                            </div>
                            {/* SEARCH-CATEGORY END */}

                            {/* RESULTS HERE */}
                            <div className="h-full col-start-2 flex flex-col gap-y-5">
                                {
                                    eventResults.length ? 
                                    eventResults.map((event, index) => (
                                        <div
                                            key={ index }
                                            className="flex flex-col gap-y-1 bg-gray-100 rounded-lg p-5"
                                        >
                                            <p className="text-sm font-bold">Event: <span className="font-normal">{ event.event }</span></p>
                                            <p className="text-sm font-bold">Cost: <span className="font-normal">{ event.budget }</span></p>
                                            <p className="text-sm font-bold">Venue: <span className="font-normal">{ event.venue }</span></p>
                                            <p className="text-sm font-bold">Add Ons:</p>
                                            <p className="font-normal">{ event.add_ons }</p>
                                        </div>
                                    ))
                                    :
                                    <p className="text-base text-center">No results found.</p>
                                }
                            </div>
                            {/* RESULTS END */}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
