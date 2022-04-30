import React, { useState, useEffect } from 'react'
import TopNav from '../../components/partner/TopNav'
import SideNav from '../../components/partner/SideNav'
import Footer from '../../components/partner/Footer'
import partnerStyles from '../../styles/Partner.module.css'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import moment from 'moment'
import PageHeader from '../../components/PageHeader'
import Link from 'next/link'

export default function requests({ requestList, eventsList }) {
    const router = useRouter()
    const [userName, setUsername] = useState()
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
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="requests" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav username={ userName } />
                <div className="row-start-2 w-full h-full bg-true-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Affiliation Requests">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-7 w-7 text-current" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </PageHeader>
                        <div className="card w-full flex flex-col gap-y-5">
                        <table className="w-full divide-y divide-gray-200 border-b border-gray-200">
                                <thead className={ partnerStyles.theadClass }>
                                    <tr className="text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        <th scope="col" className={ partnerStyles.tableHeadingClass }>
                                            Event Name
                                        </th>
                                        <th scope="col" className={ partnerStyles.tableHeadingClass }>
                                            Date
                                        </th>
                                        <th scope="col" className={ partnerStyles.tableHeadingClass }>
                                            Venue
                                        </th>
                                        <th scope="col" className={ partnerStyles.tableHeadingClass }>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className={ partnerStyles.tbodyClass }>
                                    {
                                        requestList.results.length ?
                                            requestList.results.map((request) => (
                                                <tr 
                                                    className={`${partnerStyles.tableRowClass} color-transition`}
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
                                                                        return moment(event.event_date).format('ll')
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
                                                            <Link href={`/partner/request?request_id=${request.id}`}>
                                                                <button
                                                                    type="button"
                                                                    className={`${partnerStyles.actionBtn} color-transition`}
                                                                >
                                                                    <svg 
                                                                        xmlns="http://www.w3.org/2000/svg" 
                                                                        className={ partnerStyles.actionBtnIcon } 
                                                                        fill="none" 
                                                                        viewBox="0 0 24 24" 
                                                                        stroke="currentColor"
                                                                    >
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                    </svg>
                                                                </button>
                                                            </Link>
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
                                                <p className="text-sm">Nothing to show.</p>
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                            <div className="flex gap-x-2 text-sm">
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