import React, { useState, useEffect } from 'react'
import TopNav from '../../components/admin/TopNav'
import SideNav from '../../components/admin/SideNav'
import Footer from '../../components/Footer'
import PageHeader from '../../components/PageHeader'
import RequestItem from '../../components/admin/requests/RequestItem'
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
            <SideNav isActive="partners" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav username={ userName } />
                <div className="row-start-2 w-full h-full bg-true-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Affiliation Requests">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="w-7 h-7 text-current"
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </PageHeader>
                        <div className="card w-full flex flex-col gap-y-5">
                        <div className="w-full flex justify-between items-center">
                                <div className="searchBarContainer">
                                    <input 
                                        type="text"
                                        className="searchBarInput"
                                        placeholder="Search Name . . ."
                                    />
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-4 w-4 text-current" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <button
                                    type="button" 
                                    className={ adminStyles.addBtn }
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
                                    <p className="text-sm font-bold">New Request</p>
                                </button>
                            </div>
                            <table className="min-w-full divide-y divide-gray-200 border-b border-gray-200">
                                <thead className={ adminStyles.theadClass }>
                                    <tr className="text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Event Name
                                        </th>
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Venue
                                        </th>
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Task
                                        </th>
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Status
                                        </th>
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className={ adminStyles.tbodyClass }>
                                    <RequestItem name="Dong & Day Wedding" venue="Molave Hotel, Tagum City" task="Flower Decorator" status="pending" />
                                    <RequestItem name="A Decade & Eight - Rosana" venue="Big 8 Hotel, Tagum City" task="Cake Sheeee" status="accepted" />
                                    <RequestItem name="UniStandards Company Bonding" venue="Dahican Beach, Mati City" task="Emci Sheeee" status="declined" />
                                    <RequestItem name="Dong & Day Wedding" venue="Molave Hotel, Tagum City" task="Flower Decorator" status="pending" />
                                    <RequestItem name="A Decade & Eight - Rosana" venue="Big 8 Hotel, Tagum City" task="Cake Sheeee" status="pending" />
                                    <RequestItem name="UniStandards Company Bonding" venue="Dahican Beach, Mati City" task="Emci Sheeee" status="accepted" />
                                    <RequestItem name="Dong & Day Wedding" venue="Molave Hotel, Tagum City" task="Flower Decorator" status="accepted" />
                                    <RequestItem name="A Decade & Eight - Rosana" venue="Big 8 Hotel, Tagum City" task="Cake Sheeee" status="declined" />
                                    <RequestItem name="UniStandards Company Bonding" venue="Dahican Beach, Mati City" task="Emci Sheeee" status="pending" />
                                </tbody>
                            </table>
                            <div className="flex gap-x-2 text-sm">
                                <p className="font-normal">Total Requests: </p>
                                <p className="font-bold">9</p>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}