import React, { useState, useEffect, useMemo } from 'react'
import TopNav from '../../components/admin/TopNav'
import SideNav from '../../components/admin/SideNav'
import Footer from '../../components/Footer'
import PageHeader from '../../components/PageHeader'
import adminStyles from '../../styles/Admin.module.css'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import axios from 'axios'
import moment from 'moment'
import Link from 'next/link'
import CommonTable2 from '../../components/CommonTable2'

export default function bookings({ bookingsList }) {
    const api = process.env.NEXT_PUBLIC_DRF_API
    const data = useMemo(() => bookingsList, [bookingsList.length])
    const bookingColumns = useMemo(() => [
        {
            Header : 'Client Name',
            accessor : 'client_name'
        },
        {
            Header : 'Event Type',
            accessor : 'type_of_event'
        },
        {
            Header : 'Desired Date',
            accessor : 'desired_date',
            Cell : ({row}) => (
                <p>{ moment(row.original.desired_date).format('LL') }</p>
            )
        },
        {
            Header : 'Event Budget',
            accessor : 'event_budget'
        },
        {
            Header : 'Actions',
            accessor : 'id',
            Cell : ({row}) => (
                <div className="flex gap-x-2">
                    <Link
                        href={`/admin/booking?booking_id=${row.original.id}&client_id=${row.original.booked_by}`}
                    >
                        <button
                            type="button"
                            className={`${adminStyles.actionBtn} color-transition`}
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`${adminStyles.actionBtnIcon} color-transition`} 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                    </Link>
                    <button
                        type="button"
                        onClick={ () => destroyBooking(row.original.id, row.original.type_of_event, row.original.desired_date) }
                        className={`${adminStyles.actionBtn} color-transition`}
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
                    </button>
                </div>
            )
        },
    ], [])
    const router = useRouter()
    const [userName, setUsername] = useState()
    const readRole = () => {
        setUsername(localStorage.getItem('username'))
        const role = localStorage.getItem('role')
        if (role !== 'admin') {
            router.push('/login')
        }
    }
    useEffect(() => {
        readRole()
    }, [])
    const destroyBooking = (booking_id, booking_type, booking_date) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Remove ${booking_type} booking on ${ moment(booking_date).format('ll') }?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DB2777',
            cancelButtonColor: '#9CA3AF',
            confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {
            const jwt_token = Cookies.get('jwt')
            if (result.isConfirmed) {
                axios({
                    method : 'DELETE',
                    url : `${api}client_booking/destroy/${booking_id}`,
                    headers : {'Authorization' : 'Bearer'+' '+ jwt_token}
                })
                .then(() => {
                    Swal.fire({
                        icon : 'success',
                        title : 'Deleted!',
                        text : 'Client booking has been deleted.',
                        confirmButtonColor: '#DB2777',
                        showCloseButton : true,
                        timer : 2000
                    })
                    router.push('/admin/bookings')
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
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="bookings" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav username={ userName } />
                <div className="row-start-2 w-full h-full bg-true-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Bookings List">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-7 w-7 text-current" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </PageHeader>
                        <div className="card w-full flex flex-col gap-y-5">
                            <CommonTable2 columns={ bookingColumns } data={ data } />
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
    const res1 = await fetch(`${api}bookings_list/`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data1 = await res1.json()
    const res2 = await fetch(`${api}clients_list/`,{
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data2 = await res2.json()
    let bookings_copy = data1.results
    for (let i = 0; i < data2.results.length; i++) {
        for (let j = 0; j < data1.results.length; j++) {
            data2.results[i].id === data1.results[j].booked_by ? bookings_copy[j].client_name = data2.results[i].first_name+" "+data2.results[i].last_name : ''
        }
    }
    return {
        props : {
            bookingsList : bookings_copy,
        }
    }
}