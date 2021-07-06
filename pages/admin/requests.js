import React, { useEffect } from 'react'
import TopNav from '../../components/admin/TopNav'
import SideNav from '../../components/admin/SideNav'
import Footer from '../../components/admin/Footer'
import PageHeader from '../../components/admin/PageHeader'
import RequestItem from '../../components/admin/requests/RequestItem'
import adminStyles from '../../styles/Admin.module.css'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

export default function reports() {
    const router = useRouter()
    const axios = require('axios')
    const readCookie = () => {
        try {
            const jwt_token = Cookies.get('jwt')
            const decoded_token = jwt_decode(jwt_token)
            axios({
                method : 'GET',
                url : `http://localhost:8000/account/${decoded_token.user_id}`,
                headers : {'Authorization' : 'Bearer'+' '+ jwt_token}
            })
            .then((response) => {
                response.data.role !== 'admin' ? router.push('/login') : ''
            })
            .catch((error) => {
                Swal.fire({
                    icon : 'error',
                    title: 'Error',
                    text: `${error.response}`,
                    showCloseButton: true,
                    confirmButtonColor: '#0F766E',
                })
                console.log(error.response)
            })
            console.log(jwt_token)
        }
        catch {
            router.push('/login')
        }
    }
    useEffect(() => {
        readCookie()
    }, [])
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="partners" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav />
                <div className="row-start-2 w-full h-full bg-gray-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Affiliation Requests" />
                        <div className="card w-full flex flex-col gap-y-5">
                        <div className="w-full flex justify-between items-center">
                                <div className={ adminStyles.searchBarContainer }>
                                    <input 
                                        type="text"
                                        className={ adminStyles.searchBarInput }
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