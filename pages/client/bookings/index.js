import React, { useState, useEffect } from 'react'
import SideNav from '../../../components/client/SideNav'
import TopNav from '../../../components/client/TopNav'
import Footer from '../../../components/client/Footer'
import PageHeader from '../../../components/client/PageHeader'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

export default function bookings({ bookingDetails }) {
    const router = useRouter()
    const axios = require('axios')
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
                    <div className="p-8 flex flex-col items-center gap-y-5 min-h-screen">
                        <div className="w-client-profile-form-container">
                            <PageHeader text="Booking Details" />
                        </div>
                        <div className="card w-client-profile-form-container flex flex-col items-center gap-y-10">
                            {
                                bookingDetails.id ? (
                                    <>
                                        <div className="flex gap-x-5">
                                            <div className="flex flex-col gap-y-1 w-63">
                                                <h4 className="text-sm font-bold">Type of Event</h4>
                                                <p className="text-xs">{ bookingDetails.type_of_event }</p>
                                            </div>
                                            <div className="flex flex-col gap-y-1 w-63">
                                                <h4 className="text-sm font-bold">Venue Name</h4>
                                                <p className="text-xs">{ bookingDetails.venue_name }</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-x-5">
                                            <div className="flex flex-col gap-y-1 w-63">
                                                <h4 className="text-sm font-bold">Event Budget</h4>
                                                <p className="text-xs">{`₱${bookingDetails.event_budget}`}</p>
                                            </div>
                                            <div className="flex flex-col gap-y-1 w-63">
                                                <h4 className="text-sm font-bold">Desired Date</h4>
                                                <p className="text-xs">{ new Date(bookingDetails.desired_date).toDateString() }</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-x-5">
                                            <div className="flex flex-col gap-y-1 w-63">
                                                <h4 className="text-sm font-bold">Time Schedule</h4>
                                                <p className="text-xs">{ bookingDetails.time_schedule }</p>
                                            </div>
                                            <div className="flex flex-col gap-y-1 w-63">
                                                <h4 className="text-sm font-bold">No. of Guests</h4>
                                                <p className="text-xs">{ bookingDetails.guests_no }</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-x-5">
                                            <div className="flex flex-col gap-y-1 w-63">
                                                <h4 className="text-sm font-bold">Service Requirements</h4>
                                                <p className="text-xs">{ bookingDetails.service_requirements }</p>
                                            </div>
                                            <div className="flex flex-col gap-y-1 w-63">
                                                <h4 className="text-sm font-bold">Beverages</h4>
                                                <p className="text-xs">{ bookingDetails.beverages }</p>
                                            </div>
                                        </div>
                                        <div className="w-custom-textarea flex flex-col gap-y-1">
                                            <h4 className="text-sm font-bold">Best way to contact you?</h4>
                                            <p className="text-xs">{ bookingDetails.best_way_contact }</p>
                                        </div>
                                    </>
                                ) : (
                                    <h4>You currently don't have any bookings.</h4>
                                )
                            }
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({ req }) => {
    const token = req.cookies.jwt
    const decoded_token = jwt_decode(token)
    const res1 = await fetch(`http://localhost:8000/client_profile/${decoded_token.user_id}`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data1 = await res1.json()
    const res2 = await fetch(`http://localhost:8000/client_booking/${data1.id}`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data2 = await res2.json()
    return {
        props : {
            bookingDetails : data2
        }
    }
}