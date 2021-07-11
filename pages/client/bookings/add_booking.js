import React, { Fragment, useState, useEffect } from 'react'
import SideNav from '../../../components/client/SideNav'
import TopNav from '../../../components/client/TopNav'
import Footer from '../../../components/client/Footer'
import PageHeader from '../../../components/client/PageHeader'
import { useForm } from 'react-hook-form'
import AuthErrorIcon from '../../../components/AuthErrorIcon'
import { RadioGroup, Listbox, Transition } from '@headlessui/react'
import clientStyles from '../../../styles/Client.module.css'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import Select from 'react-select'

const eventTypeOptions = [
    { label : 'Wedding Event', value : 'Wedding Event' },
    { label : 'Debut Event', value : 'Debut Event' },
    { label : 'Corporate Event', value : 'Corporate Event' },
    { label : 'Conferences Event', value : 'Conferences Event' },
    { label : 'Dinner Galas Event', value : 'Dinner Galas Event' },
    { label : 'Fundraisers Event', value : 'Fundraisers Event' },
    { label : 'Long Service Awards Event', value : 'Long Service Awards Event' },
    { label : 'Grand Openings Event', value : 'Grand Openings Event' },
    { label : 'Family Day’s Event', value : 'Family Day’s Event' },
    { label : 'Pageantries Event', value : 'Pageantries Event' },
    { label : 'Conventions Event', value : 'Conventions Event' },
    { label : 'Private Event', value : 'Private Event' },
]
const serviceRequirementsOptions = [
    { label : 'Plated', value : 'Plated' },
    { label : 'Buffet', value : 'Buffet' },
    { label : 'Neither', value : 'Neither' },
]
const eventBeveragesOptions = [
    { label : 'Alcoholic', value : 'Alcoholic' },
    { label : 'Non-Alcoholic', value : 'Non-Alcoholic' },
    { label : 'Both', value : 'Both' },
    { label : 'Neither', value : 'Neither' },
]
const bestWayOptions = [
    { label : 'Phone Call', value : 'Phone Call' },
    { label : 'Text Messages', value : 'Text Messages' },
    { label : 'Facebook/Email', value : 'Facebook/Email' },
    { label : 'All', value : 'All' },
]

export default function add_booking() {
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
                response.data.role !== 'client' ? router.push('/login') : ''
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
    const { register, handleSubmit, formState : { errors } } = useForm()
    const handleFormSubmit = (data) => {
        console.log(data)
    }
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="booking" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav />
                <div className="row-start-2 w-full h-full bg-gray-100">
                    <div className="p-8 flex flex-col items-center gap-y-5 min-h-screen">
                        <div className="w-client-profile-form-container">
                            <PageHeader text="Book Event Schedule" />
                        </div>
                        <div className="card w-client-profile-form-container">
                            <form
                                onSubmit={ handleSubmit(handleFormSubmit) }
                                className="w-full rounded-md p-5 flex flex-col items-center border border-gray-300 gap-y-10"
                            >
                                {/* type of event & desired date fields */}
                                <div className="flex gap-x-5">
                                    <div className="flex flex-col gap-y-1">
                                        <label htmlFor="booking_event_type" className="inputFieldLabel">Type of Event</label>
                                        <Select 
                                            className="w-63"
                                            options={ eventTypeOptions }
                                        />
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
                                        <label htmlFor="booking_start_time" className="inputFieldLabel">Time Schedule</label>
                                        <div className="inputContainer">
                                            <input
                                                type="time"
                                                className="inputFieldDateTime appearance-none"
                                                { ...register("booking_start_time", { required: "This field should not be empty!" }) }
                                                autoComplete="off"
                                            />
                                        </div>
                                        { 
                                            errors.booking_start_time && 
                                            <div className="flex items-center gap-x-1 text-red-500">
                                                <AuthErrorIcon />
                                                <p className="text-xs">{ errors.booking_start_time.message }</p>
                                            </div> 
                                        }
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
                                {/* seating style & service requirements fields */}
                                <div className="flex gap-x-5">
                                    <div className="flex flex-col gap-y-1">
                                        <label htmlFor="booking_service_requirements" className="inputFieldLabel">Service Requirements</label>
                                        <Select 
                                            className="w-63"
                                            options={ serviceRequirementsOptions }
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-1">
                                        <label htmlFor="booking_beverages" className="inputFieldLabel">Beverages</label>
                                        <Select 
                                            className="w-63"
                                            options={ eventBeveragesOptions }
                                        />
                                    </div>
                                </div>
                                {/* best way to contact fields */}
                                <div className="w-full px-2">
                                    <div className="flex flex-col gap-y-1">
                                        <label htmlFor="booking_best_way" className="inputFieldLabel">Best way to contact you?</label>
                                        
                                    </div>
                                </div>
                                <div className="w-full pl-2">
                                    <button 
                                        className="max-w-2xl px-3 py-2 bg-teal-700 hover:bg-teal-800 color-transition border-teal-800 focus:bg-teal-800 ring-2 ring-offset-2 ring-transparent focus:ring-teal-800 focus:outline-none text-gray-50 rounded-sm flex justify-center items-center gap-x-1"
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-5 w-5 text-current" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        <p className="text-sm font-bold">Book Event</p>
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

function CheckIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
        <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
        <path
            d="M7 13l3 3 7-7"
            stroke="#fff"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        </svg>
    )
}