import React, { Fragment, useState, useEffect } from 'react'
import TopNav from '../../components/admin/TopNav'
import SideNav from '../../components/admin/SideNav'
import Footer from '../../components/Footer'
import { Dialog, Transition } from '@headlessui/react'
import PageHeader from '../../components/PageHeader'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import AuthErrorIcon from '../../components/AuthErrorIcon'
import axios from 'axios'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import moment from 'moment'
import HoursOptions from '../../components/admin/events/HoursOptions'
import MinutesOptions from '../../components/admin/events/MinutesOptions'
import BeatLoader from "react-spinners/BeatLoader"
import useDarkMode from '../../hooks/useDarkMode'
import AdminMobileNav from '../../components/admin/AdminMobileNav'

export default function booking({ bookingInfo, clientInfo }) {
    const api = process.env.NEXT_PUBLIC_DRF_API
    const { isDarkMode } = useDarkMode()
    const router = useRouter()
    const [userName, setUsername] = useState()
    const [showMobileNav, setShowMobileNav] = useState(false)
    let [isOpen, setIsOpen] = useState(false)
    const { register, reset, handleSubmit, formState : { errors } } = useForm()
    const [isLoading, setIsLoading] = useState(false)
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
    const setSchedule = (data) => {
        setIsLoading(true)
        closeModal()
        const jwt_token = Cookies.get('jwt')
        axios({
            method : 'POST',
            url : `${api}add_interview/`,
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer'+' '+jwt_token
            },
            data : {
                location : data.interview_location,
                date : data.interview_date,
                time : data.interview_hour+':'+data.interview_minute+' '+data.interview_schedule,
                client : clientInfo.id,
                booking : bookingInfo.id
            }
        }).then(() => {
            reset()
            setIsLoading(false)
            setTimeout(() => 
                Swal.fire({
                    icon : 'success',
                    title: 'Interview Scheduled',
                    timer : 3000,
                    text: `Interview schedule has been set!`,
                    showCloseButton: true,
                    confirmButtonColor: '#DB2777',
                })
            , 500)
            router.push('/admin/interviews')
        }).catch(error => {
            setIsLoading(false)
            setTimeout(() => 
                Swal.fire({
                    icon : 'error',
                    title: 'Schedule Error',
                    timer : 3000,
                    text: error.message,
                    showCloseButton: true,
                    confirmButtonColor: '#DB2777',
                })
            , 500)
        })
    }
    const declineBooking = (booking_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Decline client booking?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DB2777',
            cancelButtonColor: '#9CA3AF',
            confirmButtonText: 'Yes, decline it!'
        }).then((result) => {
            const jwt_token = Cookies.get('jwt')
            if (result.isConfirmed) {
                axios({
                    method : 'PATCH',
                    url : `${api}booking/update/${booking_id}`,
                    headers : {'Authorization' : 'Bearer'+' '+ jwt_token},
                    data : { status : 'Declined' }
                })
                .then(() => {
                    Swal.fire({
                        icon : 'success',
                        title : 'Declined!',
                        text : 'Client booking has been declined.',
                        confirmButtonColor: '#DB2777',
                        showCloseButton : true,
                        timer : 2000
                    })
                    router.push('/admin/bookings')
                })
                .catch((error) => {
                    Swal.fire({
                        icon : 'error',
                        title: 'Server Error',
                        timer : 3000,
                        text: error.message,
                        showCloseButton: true,
                        confirmButtonColor: '#DB2777',
                    })
                })
            }
        })
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    const openModal = () => {
        setIsOpen(true)
    }
    return (
        <div className={`${ isDarkMode ? 'dark' : '' } w-full h-screen grid grid-cols-1 md:grid-cols-custom-layout font-mont text-gray-800`}>
            <div className={`absolute z-10 w-full h-full ${isLoading ? 'flex' : 'hidden'} flex-col justify-center items-center bg-white backdrop-filter backdrop-blur-sm`}>
                <BeatLoader 
                    color="#DB2777"
                    size={35} 
                />
                <h4 className="text-base">Processing, please wait</h4>
            </div>
            <SideNav isActive="bookings" />
            {
                showMobileNav ?
                <AdminMobileNav 
                    isActive="bookings"
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
                    <div className="p-5 md:p-8 flex flex-col items-center gap-y-5 min-h-screen">
                        <div className='w-80 md:w-client-profile-form-container'>
                            <PageHeader text="Booking Details">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-6 w-6 text-gray-800 dark:text-gray-300" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </PageHeader>
                            {/* Start of Create Modal */}
                            <Transition appear show={isOpen} as={Fragment}>
                                <Dialog
                                    as="div"
                                    className="fixed inset-0 z-20 overflow-y-auto backdrop-filter backdrop-brightness-50"
                                    onClose={closeModal}
                                >
                                <div className="min-h-screen px-4 text-center">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="transform transition duration-[150ms]"
                                        enterFrom="scale-50"
                                        enterTo="scale-100"
                                        leave="transform transition duration-[150ms]"
                                        leaveFrom="scale-100"
                                        leaveTo="scale-50"
                                    >
                                        <Dialog.Overlay className="fixed inset-0" />
                                    </Transition.Child>

                                    {/* This element is to trick the browser into centering the modal contents. */}
                                    <span
                                        className="inline-block h-screen align-middle"
                                        aria-hidden="true"
                                    >
                                    &#8203;
                                    </span>
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                    <div className="inline-block w-80 md:w-client-profile-form-container my-8 p-5 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl border-b border-gray-200 rounded-xl">
                                        <div className="p-5 border border-gray-300 rounded-xl">
                                            
                                            <div className="w-full flex justify-end">
                                                <button
                                                    type="button"
                                                    className="p-2 text-sm font-medium text-gray-400 hover:text-gray-600 color-transition bg-transparent focus:outline-none rounded-full"
                                                    onClick={closeModal}
                                                >
                                                    <svg 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        className="h-5 w-5" 
                                                        fill="none" 
                                                        viewBox="0 0 24 24" 
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <form 
                                                className="flex flex-col items-center gap-y-6"
                                                onSubmit={ handleSubmit(setSchedule) }
                                            >

                                                <h4 className="text-base font-bold">Schedule Interview</h4>

                                                {/* This is for the contact field */}
                                                <div className="flex flex-col md:flex-row gap-y-5 gap-x-5">

                                                    <div className="flex flex-col gap-y-1">
                                                        <label className="inputFieldLabel">Date</label>
                                                        <div className="inputContainer">
                                                            <input
                                                                type="date"
                                                                { ...register("interview_date", { required : "This field cannot be empty" }) } 
                                                                className="inputFieldDateTime"
                                                            />
                                                        </div>
                                                        { 
                                                            errors.interview_date && 
                                                            <div className="flex items-center gap-x-1 text-red-500">
                                                                <AuthErrorIcon />
                                                                <p className="text-xs">{ errors.interview_date.message }</p>
                                                            </div> 
                                                        }
                                                    </div>

                                                    <div className="flex flex-col gap-y-1">
                                                        <label className="inputFieldLabel">Time</label>
                                                        <div className='w-52 md:w-63 px-4 py-1 flex items-center justify-between bg-transparent gap-x-5 border border-gray-300 focus-within:border-gray-600 rounded-lg'>
                                                            <select 
                                                                className='customTime'
                                                                {...register("interview_hour")}
                                                            >
                                                                <HoursOptions />
                                                            </select>
                                                            <p className='text-sm font-medium text-gray-800 -mx-6'>:</p>
                                                            <select 
                                                                className='customTime'
                                                                {...register("interview_minute")}
                                                            >
                                                                <MinutesOptions />
                                                            </select>
                                                            <select 
                                                                className='customTime'
                                                                {...register("interview_schedule")}
                                                            >
                                                                <option value="AM">AM</option>
                                                                <option value="PM">PM</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="flex flex-col gap-y-1">
                                                    <label className="inputFieldLabel">Location</label>
                                                    <textarea 
                                                        className="inputTextArea"
                                                        { ...register("interview_location", { required : "This field cannot be empty" }) }
                                                    ></textarea>
                                                    { 
                                                        errors.partner_services && 
                                                        <div className="flex items-center gap-x-1 text-red-500">
                                                            <AuthErrorIcon />
                                                            <p className="text-xs">{ errors.partner_services.message }</p>
                                                        </div> 
                                                    }
                                                </div>

                                                <div className="w-full pr-2 mt-5 flex justify-end gap-x-3">
                                                    <button
                                                        className="modalAddBtn color-transition"
                                                    >
                                                        <p className="btnText">Save</p>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="modalCloseBtn color-transition"
                                                        onClick={ closeModal }
                                                    >
                                                        <p className="btnText">Close</p>
                                                    </button>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                    </Transition.Child>
                                </div>
                                </Dialog>
                            </Transition>
                            {/* End of Create Modal */}
                        </div>
                        <div className='card w-80 md:w-client-profile-form-container'>
                            <div className='w-full rounded-xl px-16 py-8 flex flex-col items-center border border-gray-300 dark:border-gray-700 gap-y-8 md:gap-y-16'>
                                {/* Name & Event Type Start */}
                                <div className='w-full flex flex-col md:flex-row justify-between gap-y-5'>
                                    <div className='flex flex-col gap-y-1'>
                                        <h4 className='text-md font-bold text-gray-700 dark:text-gray-300'>Client Name</h4>
                                        <p className='text-sm text-gray-700 dark:text-gray-300'>{ clientInfo.first_name+' '+clientInfo.last_name }</p>
                                    </div>
                                    <div className='flex flex-col gap-y-1'>
                                        <h4 className='text-md font-bold text-gray-700 dark:text-gray-300'>Type of Event</h4>
                                        <p className='text-sm text-gray-700 dark:text-gray-300'>{ bookingInfo.type_of_event }</p>
                                    </div>
                                </div>
                                {/* Name & Event Type End */}
                                {/* Date/Time & Budget Start */}
                                <div className='w-full flex flex-col md:flex-row justify-between gap-y-5'>
                                    <div className='flex flex-col gap-y-1'>
                                        <h4 className='text-md font-bold text-gray-700 dark:text-gray-300'>Date & Time</h4>
                                        <p className='text-sm text-gray-700 dark:text-gray-300'>{ moment(bookingInfo.desired_date).format('ll')+' '+bookingInfo.time_schedule }</p>
                                    </div>
                                    <div className='flex flex-col gap-y-1'>
                                        <h4 className='text-md font-bold text-gray-700 dark:text-gray-300'>Budget</h4>
                                        <p className='text-sm text-gray-700 dark:text-gray-300'>{ bookingInfo.event_budget }</p>
                                    </div>
                                </div>
                                {/* Date/Time & Budget End */}
                                {/* Guests & Status Start */}
                                <div className='w-full flex flex-col md:flex-row justify-between gap-y-5'>
                                    <div className='flex flex-col gap-y-1'>
                                        <h4 className='text-md font-bold text-gray-700 dark:text-gray-300'>Guests No.</h4>
                                        <p className='text-sm text-gray-700 dark:text-gray-300'>{ bookingInfo.guests_no }</p>
                                    </div>
                                    <div className='flex flex-col gap-y-1'>
                                        <h4 className='text-md font-bold text-gray-700 dark:text-gray-300'>Status</h4>
                                        <p className='text-sm text-gray-700 dark:text-gray-300'>{ bookingInfo.status }</p>
                                    </div>
                                </div>
                                {/* Guests & Status End */}
                                <div className="w-full flex justify-end gap-x-5">
                                    <button 
                                        className="px-5 py-2 bg-pink-600 hover:bg-pink-500 rounded-lg text-white color-transition focus:outline-none"
                                        onClick={ openModal }
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-5 w-5 text-current block md:hidden" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                        </svg>
                                        {/* <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-5 w-5 text-current block md:hidden" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg> */}
                                        <p className="text-base font-bold tracking-wide hidden md:block">Set Interview</p>
                                    </button>
                                    <button 
                                        className='commonBtn2 color-transition'
                                        onClick={ () => declineBooking(bookingInfo.id) }
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-5 w-5 text-current block md:hidden" 
                                            viewBox="0 0 20 20" 
                                            fill="currentColor"
                                        >
                                            <path fillRule="evenodd" d="M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 2.414a1 1 0 00-1.414 1.414L10.586 10l-1.293 1.293a1 1 0 101.414 1.414L12 11.414l1.293 1.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414L12 8.586l-1.293-1.293z" clipRule="evenodd" />
                                        </svg>
                                        <p className="hidden md:block">Decline</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({ req, query }) => {
    const api = process.env.NEXT_PUBLIC_DRF_API
    const { booking_id, client_id } = query
    const jwt = req.cookies.jwt
    const res1 = await fetch(`${api}admin_client/${client_id}`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+jwt}
    })
    const data1 = await res1.json()
    const res2 = await fetch(`${api}booking/${booking_id}`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+jwt}
    })
    const data2 = await res2.json()
    return {
        props : {
            clientInfo : data1,
            bookingInfo : data2
        }
    }
}