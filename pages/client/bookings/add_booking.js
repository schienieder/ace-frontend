import React, { Fragment, useState, useEffect } from 'react'
import SideNav from '../../../components/client/SideNav'
import TopNav from '../../../components/client/TopNav'
import Footer from '../../../components/client/Footer'
import PageHeader from '../../../components/client/PageHeader'
import { useForm } from 'react-hook-form'
import AuthErrorIcon from '../../../components/AuthErrorIcon'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2'
import axios from 'axios'
import HoursOptions from '../../../components/admin/events/HoursOptions'
import MinutesOptions from '../../../components/admin/events/MinutesOptions'

export default function add_booking({ clientProfile }) {
    const api = process.env.NEXT_PUBLIC_DRF_API
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
    const { register, reset, handleSubmit, formState : { errors } } = useForm()
    const handleFormSubmit = (data) => {
        const jwt_token = Cookies.get('jwt')
        axios({
            method : 'POST',
            url : `${api}add_booking/`,
            headers : {
                'Authorization' : 'Bearer'+' '+jwt_token,
                'Content-Type' : 'application/json'
            },
            data : {
                type_of_event : data.booking_event_type,
                venue_name : data.booking_venue_name,
                event_budget : data.booking_budget,
                desired_date : data.booking_des_date,
                time_schedule : data.booking_hour+':'+data.booking_minute+' '+data.booking_schedule,
                guests_no : data.booking_guests_no,
                booked_by : clientProfile.id
            }
        }).then(() => {
            reset()
            Swal.fire({
                icon : 'success',
                title: 'Booking Successsful',
                timer : 3000,
                text: `Your booking has been successfully created!`,
                showCloseButton: true,
                confirmButtonColor: '#DB2777',
            })
            router.push('/client/bookings')
        }).catch((error) => {
            Swal.fire({
                icon : 'error',
                title: 'Booking Error',
                timer : 3000,
                text: error.message,
                showCloseButton: true,
                confirmButtonColor: '#DB2777',
            })
        })
    }
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="booking" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav username={ userName } />
                <div className="row-start-2 w-full h-full bg-true-100">
                    <div className="p-8 flex flex-col items-center gap-y-5 min-h-screen">
                        <div className="w-client-profile-form-container">
                            <PageHeader text="Book Event">
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
                        </div>
                        <div className="card w-client-profile-form-container">
                            <form
                                onSubmit={ handleSubmit(handleFormSubmit) }
                                className="w-full rounded-xl p-5 flex flex-col items-center border border-gray-300 gap-y-10"
                            >
                                {/* type of event & desired date fields */}
                                <div className="flex gap-x-5">
                                    <div className="flex flex-col gap-y-1">
                                        <label htmlFor="booking_event_type" className="inputFieldLabel">Type of Event</label>
                                        <select
                                            className="inputSelect rounded-lg"
                                            {...register("booking_event_type")}
                                        >
                                            <option value="Wedding Event">Wedding Event</option>
                                            <option value="Debut Event">Debut Event</option>
                                            <option value="Corporate Event">Corporate Event</option>
                                            <option value="Conferences Event">Conferences Event</option>
                                            <option value="Dinner Galas Event">Dinner Galas Event</option>
                                            <option value="Fundraisers Event">Fundraisers Event</option>
                                            <option value="Long Service Awards Event">Long Service Awards Event</option>
                                            <option value="Grand Openings Event">Grand Openings Event</option>
                                            <option value="Family Day’s Event">Family Day’s Event</option>
                                            <option value="Pageantries Event">Pageantries Event</option>
                                            <option value="Conventions Event">Conventions Event</option>
                                            <option value="Private Event">Private Event</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-y-1">
                                        <label htmlFor="booking_venue_name" className="inputFieldLabel">Venue Name</label>
                                        <div className="inputContainer">
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className="inputIcon" 
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                stroke="currentColor"
                                                >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <input
                                                type="text"
                                                className="inputField appearance-none"
                                                { ...register("booking_venue_name", { required: "This field should not be empty!" }) }
                                                autoComplete="off"
                                            />
                                        </div>
                                        { 
                                            errors.booking_venue_name && 
                                            <div className="flex items-center gap-x-1 text-red-500">
                                                <AuthErrorIcon />
                                                <p className="text-xs">{ errors.booking_venue_name.message }</p>
                                            </div> 
                                        }
                                    </div>
                                </div>
                                {/* event budget & desired date fields */}
                                <div className="flex gap-x-5">
                                    <div className="flex flex-col gap-y-1">
                                        <label htmlFor="booking_guests_no" className="inputFieldLabel">Event Budget</label>
                                        <div className="inputContainer">
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className="inputIcon" 
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            <input
                                                type="number"
                                                className="inputField appearance-none"
                                                { ...register("booking_budget", { required: "This field should not be empty!" }) }
                                                autoComplete="off"
                                            />
                                        </div>
                                        { 
                                            errors.booking_budget && 
                                            <div className="flex items-center gap-x-1 text-red-500">
                                                <AuthErrorIcon />
                                                <p className="text-xs">{ errors.booking_budget.message }</p>
                                            </div> 
                                        }
                                    </div>
                                    <div className="flex flex-col gap-y-1">
                                        <label htmlFor="booking_des_date" className="inputFieldLabel">Desired Date</label>
                                        <div className="inputContainer">
                                            <input
                                                type="date"
                                                className="inputFieldDateTime appearance-none"
                                                { ...register("booking_des_date", { required: "This field should not be empty!" }) }
                                                autoComplete="off"
                                            />
                                        </div>
                                        { 
                                            errors.booking_des_date && 
                                            <div className="flex items-center gap-x-1 text-red-500">
                                                <AuthErrorIcon />
                                                <p className="text-xs">{ errors.booking_des_date.message }</p>
                                            </div> 
                                        }
                                    </div>
                                </div>
                                {/* time sched & guests no fields */}
                                <div className="flex gap-x-5">
                                    <div className="flex flex-col gap-y-1">
                                        <label className="inputFieldLabel">Time Schedule</label>
                                        <div className='w-63 px-4 py-1 flex items-center justify-between bg-transparent gap-x-5 border border-gray-300 focus-within:border-gray-600 rounded-lg'>
                                            <select 
                                                className='customTime'
                                                {...register("booking_hour")}
                                            >
                                                <HoursOptions />
                                            </select>
                                            <p className='text-sm font-medium text-gray-800 -mx-6'>:</p>
                                            <select 
                                                className='customTime'
                                                {...register("booking_minute")}
                                            >
                                                <MinutesOptions />
                                            </select>
                                            <select 
                                                className='customTime'
                                                {...register("booking_schedule")}
                                            >
                                                <option value="AM">AM</option>
                                                <option value="PM">PM</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-y-1">
                                        <label htmlFor="booking_guests_no" className="inputFieldLabel">No. of Guests</label>
                                        <div className="inputContainer">
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className="inputIcon" 
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                stroke="currentColor"
                                                >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <input
                                                type="number"
                                                className="inputField appearance-none"
                                                { ...register("booking_guests_no", { required: "This field should not be empty!" }) }
                                                autoComplete="off"
                                            />
                                        </div>
                                        { 
                                            errors.booking_guests_no && 
                                            <div className="flex items-center gap-x-1 text-red-500">
                                                <AuthErrorIcon />
                                                <p className="text-xs">{ errors.booking_guests_no.message }</p>
                                            </div> 
                                        }
                                    </div>
                                </div>
                                <div className="w-full pl-2">
                                    <button 
                                        className="px-5 py-2 bg-pink-600 hover:bg-pink-500 rounded-lg text-white color-transition focus:outline-none"
                                    >
                                        <p className="text-base font-bold tracking-wide">Save</p>
                                    </button>
                                </div>
                                <p className="pl-2 text-sm"><span className="font-bold">Note:</span> As for the mode of payment, it will be on the contract signing for the finalization of the event.</p>
                            </form>
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
    const decoded_token = jwt_decode(token)
    const res = await fetch(`${api}client_profile/${decoded_token.user_id}`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data = await res.json()
    return {
        props : {
            clientProfile : data
        }
    }
}