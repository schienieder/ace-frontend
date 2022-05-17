import React, { useState, useEffect } from 'react'
import TopNav from '../../components/partner/TopNav'
import SideNav from '../../components/partner/SideNav'
import Footer from '../../components/partner/Footer'
import partnerStyles from '../../styles/Partner.module.css'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import moment from 'moment'
import PageHeader from '../../components/PageHeader'
import Swal from 'sweetalert2'
import axios from 'axios'
import PartnerMobileNav from '../../components/partner/PartnerMobileNav'
import useDarkMode from '../../hooks/useDarkMode'

export default function requests({ requestList, eventsList }) {
    const api = process.env.NEXT_PUBLIC_DRF_API
    const router = useRouter()
    const [userName, setUsername] = useState()
    const [showMobileNav, setShowMobileNav] = useState(false)
    const { isDarkMode } = useDarkMode()
    const readRole = () => {
        setUsername(localStorage.getItem('username'))
        const role = localStorage.getItem('role')
        if (role !== 'partner') {
            router.push('/login')
        }
    }
    useEffect(() => {
        readRole()
    }, [])
    const acceptRequest = (request_id) => {
        Swal.fire({
            title: 'Accept Request',
            text: `Do you want to accept request?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#DB2777',
            cancelButtonColor: '#9CA3AF',
            confirmButtonText: 'Yes, accept it!'
        }).then((result) => {
            const jwt_token = Cookies.get('jwt')
            if (result.isConfirmed) {
                axios({
                    method : 'PATCH',
                    url : `${api}request_update/${request_id}`,
                    headers : {'Authorization' : 'Bearer'+' '+ jwt_token},
                    data : { status : "Accepted" }
                })
                .then(() => {
                    Swal.fire({
                        icon : 'success',
                        title : 'Accepted!',
                        text : 'Affiliation request has been accepted.',
                        confirmButtonColor: '#DB2777',
                        showCloseButton : true,
                        timer : 2000
                    })
                    router.push('/partner/requests')
                })
                .catch((error) => {
                    Swal.fire({
                        icon : 'error',
                        title: 'Error',
                        timer : 3000,
                        text: error.message,
                        showCloseButton: true,
                        confirmButtonColor: '#DB2777',
                    })
                })
            }
        })
    }
    const declineRequest = (request_id) => {
        Swal.fire({
            title: 'Decline Request',
            text: `Do you want to decline request?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#DB2777',
            cancelButtonColor: '#9CA3AF',
            confirmButtonText: 'Yes, decline it!'
        }).then((result) => {
            const jwt_token = Cookies.get('jwt')
            if (result.isConfirmed) {
                axios({
                    method : 'PATCH',
                    url : `${api}request_update/${request_id}`,
                    headers : {'Authorization' : 'Bearer'+' '+ jwt_token},
                    data : { status : "Declined" }
                })
                .then(() => {
                    Swal.fire({
                        icon : 'info',
                        title : 'Declined!',
                        text : 'Affiliation request has been declined.',
                        confirmButtonColor: '#DB2777',
                        showCloseButton : true,
                        timer : 2000
                    })
                    router.push('/partner/requests')
                })
                .catch((error) => {
                    Swal.fire({
                        icon : 'error',
                        title: 'Error',
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
        <div className={`${isDarkMode ? 'dark' : ''} w-full h-screen grid grid-cols-1 md:grid-cols-custom-layout font-mont text-gray-800 dark:text-gray-300`}>
            <SideNav isActive="requests" />
            {
                showMobileNav ? 
                <PartnerMobileNav 
                    isActive="requests" 
                    onClick={ () => setShowMobileNav(!showMobileNav) }
                />
                : null
            }
            <div className="col-start-1 md:col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav 
                    username={ userName }
                    onClick={ () => setShowMobileNav(!showMobileNav) }
                />
                <div className="row-start-2 w-full h-full bg-true-100 dark:bg-gray-800">
                    <div className="p-5 md:p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Affiliation Requests">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-7 w-7 text-gray-800 dark:text-gray-300"
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </PageHeader>
                        <div className="card w-65 md:w-full overflow-x-auto flex flex-col gap-y-5">
                        <table className="min-w-full divide-y divide-gray-200 border-b border-gray-200 dark:border-gray-700 dark:divide-gray-700">
                                <thead className="bg-gray-100 dark:bg-gray-800">
                                    <tr className="text-left text-xs uppercase tracking-wider text-gray-700 dark:text-gray-400">
                                        <th scope="col" className={ partnerStyles.tableHeadingClass }>
                                            Event Name
                                        </th>
                                        <th scope="col" className={ partnerStyles.tableHeadingClass }>
                                            Date
                                        </th>
                                        <th scope="col" className={ partnerStyles.tableHeadingClass }>
                                            Time
                                        </th>
                                        <th scope="col" className={ partnerStyles.tableHeadingClass }>
                                            Venue
                                        </th>
                                        <th scope="col" className={ partnerStyles.tableHeadingClass }>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                    {
                                        requestList.results.length ?
                                            requestList.results.map((request) => (
                                                <tr 
                                                    className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-300"
                                                    key={request.id}
                                                >
                                                    <td className={ partnerStyles.tableDataClass }>
                                                        <p className={ partnerStyles.tableDataTextClass }>
                                                            {
                                                                eventsList.results.map((event) => {
                                                                    if (event.id === request.event) {
                                                                        return event.event_name
                                                                    }
                                                                })
                                                            }
                                                        </p>
                                                    </td>
                                                    <td className={ partnerStyles.tableDataClass }>
                                                        <p className="text-sm text-gray-800">
                                                            {
                                                                eventsList.results.map((event) => {
                                                                    if (event.id === request.event) {
                                                                        return moment(event.date_schedule).format('LL')
                                                                    }
                                                                })
                                                            }
                                                        </p>
                                                    </td>
                                                    <td className={ partnerStyles.tableDataClass }>
                                                        <p className="text-sm text-gray-800">
                                                            {
                                                                eventsList.results.map((event) => {
                                                                    if (event.id === request.event) {
                                                                        return event.time_schedule
                                                                    }
                                                                })
                                                            }
                                                        </p>
                                                    </td>
                                                    <td className={`${partnerStyles.tableDataClass} max-w-xs`}>
                                                        <p className="text-sm text-gray-800 overflow-ellipsis overflow-hidden">
                                                            {
                                                                eventsList.results.map((event) => {
                                                                    if (event.id === request.event) {
                                                                        return event.venue_name
                                                                    }
                                                                })
                                                            }
                                                        </p>
                                                    </td>
                                                    <td className={ partnerStyles.tableDataClass }>
                                                        <div className="flex gap-x-2">
                                                            <button
                                                                type="button"
                                                                className={`${partnerStyles.actionBtn} color-transition`}
                                                                onClick={ () => acceptRequest(request.id) }
                                                            >
                                                                <svg 
                                                                    xmlns="http://www.w3.org/2000/svg" 
                                                                    className={ partnerStyles.actionBtnIcon } 
                                                                    fill="none" 
                                                                    viewBox="0 0 24 24" 
                                                                    stroke="currentColor"
                                                                >
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg> 
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className={`${partnerStyles.actionBtn} color-transition`}
                                                                onClick={ () => declineRequest(request.id) }
                                                            >
                                                                <svg 
                                                                    xmlns="http://www.w3.org/2000/svg" 
                                                                    className={ partnerStyles.actionBtnIcon } 
                                                                    viewBox="0 0 20 20" 
                                                                    fill="currentColor"
                                                                >
                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        : 
                                        <tr className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800">
                                            <td 
                                                className="px-6 py-3 whitespace-nowrap text-center"
                                                colSpan={5}
                                            >
                                                <p className="text-sm dark:text-gray-300">Nothing to show.</p>
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                            <div className="flex gap-x-2 text-sm dark:text-gray-300">
                                <p className="font-normal">Total Requests: </p>
                                <p className="font-bold">{ requestList.count }</p>
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
    const res2 = await fetch(`${api}partner_requests/`,{
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data2 = await res2.json()
    const res3 = await fetch(`${api}events_list/`,{
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data3 = await res3.json()
    return {
        props : {
            requestList : data2,
            eventsList : data3,
        }
    }
}