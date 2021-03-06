import React, { Fragment, useEffect, useState, useRef } from 'react'
import TopNav from '../../../components/admin/TopNav'
import SideNav from '../../../components/admin/SideNav'
import Footer from '../../../components/Footer'
import PageHeader from '../../../components/PageHeader'
import Link from 'next/link'
import AuthErrorIcon from '../../../components/AuthErrorIcon'
import adminStyles from '../../../styles/Admin.module.css'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import moment from 'moment'
import HoursOptions from '../../../components/admin/events/HoursOptions'
import MinutesOptions from '../../../components/admin/events/MinutesOptions'
import AutocompletePlace from '../../../components/admin/events/AutocompletePlace'
import { ExportToCsv } from 'export-to-csv'
import currency from 'currency.js'
import useDarkMode from '../../../hooks/useDarkMode'
import AdminMobileNav from '../../../components/admin/AdminMobileNav'

export default function cards({ clientsList, eventsList, totalList, completedList, csvEvents }) {
    const api = process.env.NEXT_PUBLIC_DRF_API
    const { isDarkMode } = useDarkMode()
    const [showMobileNav, setShowMobileNav] = useState(false)
    const peso = value => currency(value, { symbol : '₱', precision : 0 })
    let [isOpen, setIsOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false);
    const router = useRouter()
    const [userName, setUsername] = useState()
    const [place, setPlace] = useState()
    const editIndex = useRef(0)
    const addPlaceRef = useRef()
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
    const { register, reset, handleSubmit, formState : { errors }, setError, clearErrors } = useForm()
    const { register : register2, reset : reset2, handleSubmit : handleSubmit2, formState : { errors : errors2 } } = useForm()
    const handleLocationVal = (place) => {
        setPlace(place)
        clearErrors("venue_location")
        // console.log(place)
        // console.log(place.place_name)
    }
    const onAddEvent = () => {
        if (!addPlaceRef.current.value) {
            setError("venue_location", {
                type: "focus",
                message : "This field cannot be empty"
            })
        }
    }
    const addEvent = (data) => {
        let payment_status = data.package_cost === data.client_payment ? "Fully Paid" : "Partially Paid"
        const jwt_token = Cookies.get('jwt')
        if (!addPlaceRef.current.value) {
            setError("venue_location", {
                type: "focus",
                message : "This field cannot be empty"
            })
        }
        else {
            setPlace(undefined)
            clearErrors("venue_location")
            axios({
                method : 'POST',
                url : `${api}add_event/`,
                headers : {
                    'Authorization' : 'Bearer'+' '+jwt_token,
                    'Content-Type' : 'application/json'
                },
                data : {
                    event_name : data.event_name,
                    venue_location : place.place_name,
                    venue_name : data.venue_name,
                    venue_lat : place.geometry.coordinates[1],
                    venue_long : place.geometry.coordinates[0],
                    package_cost : data.package_cost,
                    client_payment : data.client_payment,
                    payment_status : payment_status,
                    date_schedule : data.date_schedule,
                    time_schedule : data.event_hour+':'+data.event_minute+' '+data.event_schedule,
                    client : data.event_client
                }
            }).then(() => {
                reset()
                Swal.fire({
                    icon : 'success',
                    title: 'Event Creation Successsful',
                    timer : 3000,
                    text: `Event has been successfully created!`,
                    showCloseButton: true,
                    confirmButtonColor: '#DB2777',
                })
                setIsOpen(false)
                router.push('/admin/events')
            }).catch((error) => {
                Swal.fire({
                    icon : 'error',
                    title: 'Event Creation Error',
                    timer : 3000,
                    text: error.message,
                    showCloseButton: true,
                    confirmButtonColor: '#DB2777',
                })
            })
        }
    }
    const updateEvent = (data) => {
        let payment_status = data.update_package_cost === data.update_client_payment ? "Fully Paid" : "Partially Paid"
        let time_sched = data.update_event_hour+':'+data.update_event_minute+' '+data.update_event_schedule
        let formData = {
            event_name : data.update_event_name,
            venue_name : data.update_venue_name,
            package_cost : data.update_package_cost,
            client_payment : data.update_client_payment,
            payment_status : payment_status,
            date_schedule : data.update_date_schedule,
            time_schedule : time_sched,
            client : data.update_event_client
        }
        if (place) {
            formData["venue_location"] = place.place_name
            formData["venue_lat"] = place.geometry.coordinates[1]
            formData["venue_long"] = place.geometry.coordinates[0]
        }
        const jwt_token = Cookies.get('jwt')
        axios({
            method : 'PATCH',
            url : `${api}update_event/${data.update_event_id}`,
            headers : {
                'Authorization' : 'Bearer'+' '+jwt_token,
                'Content-Type' : 'application/json'
            },
            data : formData
        }).then(() => {
            reset2()
            Swal.fire({
                icon : 'success',
                title: 'Update Successsful',
                timer : 3000,
                text: `Event has been successfully updated!`,
                showCloseButton: true,
                confirmButtonColor: '#DB2777',
            })
            setIsEditOpen(false)
            router.push('/admin/events')
        }).catch((error) => {
            Swal.fire({
                icon : 'error',
                title: 'Event Update Error',
                timer : 3000,
                text: error.message,
                showCloseButton: true,
                confirmButtonColor: '#DB2777',
            })
        })
    }
    const deleteEvent = (event_id, event_name) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Delete event records for ${event_name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DB2777',
            cancelButtonColor: '#9CA3AF',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            const jwt_token = Cookies.get('jwt')
            if (result.isConfirmed) {
                axios({
                    method : 'DELETE',
                    url : `${api}event/destroy/${event_id}`,
                    headers : {'Authorization' : 'Bearer'+' '+ jwt_token}
                })
                .then(() => {
                    Swal.fire({
                        icon : 'success',
                        title : 'Deleted!',
                        text : 'Event record has been deleted.',
                        confirmButtonColor: '#DB2777',
                        showCloseButton : true,
                        timer : 2000
                    })
                    editIndex.current = 0
                    router.push('/admin/events')
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
    const closeModal = () => {
        setIsOpen(false)
    }
    const openModal = () => {
        setIsOpen(true)
    }
    const closeEditModal = () => {
        setIsEditOpen(false)
    }
    const openEditModal = (event_index) => {
        reset2()
        setIsEditOpen(true)
        editIndex.current = event_index
    }
    const options = {
        useKeysAsHeaders: true,
        filename : 'Event Reports'
    }
    const csvExporter = new ExportToCsv(options);
    const exportData = () => {
        csvEvents.forEach((event) => {
            event.date_schedule = moment(event.date_schedule).format('ll')
            delete event.id
            delete event.venue_lat
            delete event.venue_long
            delete event.payment_status
            delete event.created_at
            delete event.updated_at
            delete event.client
        })
        csvExporter.generateCsv(csvEvents);
    }
    const getDefaultHours = (hours) => {
        const defaultHours = hours.slice(0, -6)
        console.log(defaultHours)
        return defaultHours
    }
    const getDefaultMinutes = (minutes) => {
        const defaultMinutes = minutes.slice(-5, -3)
        console.log(defaultMinutes)
        return defaultMinutes
    }
    return (
        <div className={`${isDarkMode ? 'dark' : ''} w-full h-screen grid grid-cols-1 md:grid-cols-custom-layout font-mont text-gray-800`}>
            <SideNav isActive="events" />
            {
                showMobileNav ?
                <AdminMobileNav 
                    isActive="events"
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
                        <div className="w-full flex justify-between items-center">
                            <PageHeader text="Events">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-7 w-7 text-gray-800 dark:text-gray-300"
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                            </PageHeader>
                            <div className='flex gap-x-3 md:gap-x-5'>
                                {
                                    csvEvents.length ? 
                                    <button
                                        type="button"
                                        className="px-3 md:px-5 py-2 bg-transparent hover:bg-pink-600 border border-pink-600 rounded-lg text-pink-600 hover:text-white font-bold text-base tracking-wide flex justify-center items-center gap-x-1 focus:outline-none color-transition"
                                        onClick={ () => exportData() }
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-5 w-5 text-current" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p className="hidden md:block text-sm font-bold">Export Data</p>
                                    </button>
                                    : null
                                }
                                <button
                                    type="button" 
                                    onClick={ openModal }
                                    className={`${adminStyles.addBtn} color-transition`}
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
                                    <p className="hidden md:block text-sm font-bold">New Event</p>
                                </button>
                            </div>
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
                                                onSubmit={ handleSubmit(addEvent) }
                                            >

                                                <h4 className="text-base font-bold">New Event</h4>

                                                {/* This is for the event name field and venue location */}
                                                <div className="flex flex-col md:flex-row gap-y-5 gap-x-5">

                                                    <div className="flex flex-col gap-y-1">
                                                        <label className="inputFieldLabel">Event Name</label>
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
                                                                { ...register("event_name", { required : "This field cannot be empty" }) } 
                                                                className="inputField"
                                                                autoComplete='off'
                                                            />
                                                        </div>
                                                        { 
                                                            errors.event_name && 
                                                            <div className="flex items-center gap-x-1 text-red-500">
                                                                <AuthErrorIcon />
                                                                <p className="text-xs">{ errors.event_name.message }</p>
                                                            </div> 
                                                        }
                                                    </div>

                                                    <div className="flex flex-col gap-y-1">
                                                        <label className="inputFieldLabel">Venue Location</label>
                                                        <div className="inputContainer">
                                                            <svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                className="inputIcon" 
                                                                fill="none" 
                                                                viewBox="0 0 24 24" 
                                                                stroke="currentColor"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            <AutocompletePlace 
                                                                onSelect={place => handleLocationVal(place)}
                                                                { ...register("venue_location") }
                                                                placeRef={ addPlaceRef }
                                                            />
                                                        </div>
                                                        { 
                                                            errors.venue_location && 
                                                            <div className="flex items-center gap-x-1 text-red-500">
                                                                <AuthErrorIcon />
                                                                <p className="text-xs">{ errors.venue_location.message }</p>
                                                            </div> 
                                                        }
                                                        {/* {
                                                            noPlace ?
                                                            <div className="flex items-center gap-x-1 text-red-500">
                                                                <AuthErrorIcon />
                                                                <p className="text-xs">This field cannot be empty</p>
                                                            </div>
                                                            : null
                                                        }  */}
                                                    </div>

                                                </div>

                                                {/* This is for the venue name & package cost */}
                                                <div className="flex flex-col md:flex-row gap-y-5 gap-x-5">

                                                    <div className="flex flex-col gap-y-1">
                                                        <label className="inputFieldLabel">Venue Name</label>
                                                        <div className="inputContainer">
                                                            <svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                className="inputIcon" 
                                                                fill="none" 
                                                                viewBox="0 0 24 24" 
                                                                stroke="currentColor"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                            </svg>
                                                            <input
                                                                type="text"
                                                                { ...register("venue_name", { required : "This field cannot be empty" }) } 
                                                                className="inputField"
                                                                autoComplete='off'
                                                            />
                                                        </div>
                                                        { 
                                                            errors.venue_name && 
                                                            <div className="flex items-center gap-x-1 text-red-500">
                                                                <AuthErrorIcon />
                                                                <p className="text-xs">{ errors.venue_name.message }</p>
                                                            </div> 
                                                        }
                                                    </div>

                                                    <div className="flex flex-col gap-y-1">
                                                        <label className="inputFieldLabel">Package Cost</label>
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
                                                                { ...register("package_cost", { required : "This field cannot be empty" }) } 
                                                                className="inputField"
                                                                autoComplete='off'
                                                            />
                                                        </div>
                                                        { 
                                                            errors.package_cost && 
                                                            <div className="flex items-center gap-x-1 text-red-500">
                                                                <AuthErrorIcon />
                                                                <p className="text-xs">{ errors.package_cost.message }</p>
                                                            </div> 
                                                        }
                                                    </div>

                                                </div>

                                                {/* This is for the schedule fields */}
                                                <div className="flex flex-col md:flex-row gap-y-5 gap-x-5">

                                                    <div className="flex flex-col gap-y-1 md:w-63">
                                                        <label className="inputFieldLabel">Date Schedule</label>
                                                        <div className="inputContainer">
                                                            <input
                                                                type="date"
                                                                { ...register("date_schedule", { required : "This field cannot be empty" }) } 
                                                                className="inputFieldDateTime"
                                                            />
                                                        </div>
                                                        { 
                                                            errors.date_schedule && 
                                                            <div className="flex items-center gap-x-1 text-red-500">
                                                                <AuthErrorIcon />
                                                                <p className="text-xs">{ errors.date_schedule.message }</p>
                                                            </div> 
                                                        }
                                                    </div>

                                                    <div className="flex flex-col gap-y-1">
                                                        <label className="inputFieldLabel">Time Schedule</label>
                                                        <div className='w-50 md:w-63 px-4 py-1 flex items-center justify-between bg-transparent gap-x-5 border border-gray-300 focus-within:border-gray-600 rounded-lg'>
                                                            <select 
                                                                className='customTime'
                                                                {...register("event_hour")}
                                                            >
                                                                <HoursOptions />
                                                            </select>
                                                            <p className='text-sm font-medium text-gray-800 -mx-6'>:</p>
                                                            <select 
                                                                className='customTime'
                                                                {...register("event_minute")}
                                                            >
                                                                <MinutesOptions />
                                                            </select>
                                                            <select 
                                                                className='customTime'
                                                                {...register("event_schedule")}
                                                            >
                                                                <option value="AM">AM</option>
                                                                <option value="PM">PM</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                </div>

                                                {/* This is for the payment & client fields */}
                                                <div className="flex flex-col md:flex-row gap-y-5 gap-x-5">

                                                    <div className="flex flex-col gap-y-1">
                                                        <label className="inputFieldLabel">Client Payment</label>
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
                                                                { ...register("client_payment", { required : "This field cannot be empty" }) } 
                                                                className="inputField"
                                                                autoComplete='off'
                                                            />
                                                        </div>
                                                        { 
                                                            errors.client_payment && 
                                                            <div className="flex items-center gap-x-1 text-red-500">
                                                                <AuthErrorIcon />
                                                                <p className="text-xs">{ errors.client_payment.message }</p>
                                                            </div> 
                                                        }
                                                    </div>
                                                    <div className="flex flex-col gap-y-1">
                                                        <label className="inputFieldLabel">Event Client</label>
                                                        <select
                                                            className="inputSelect rounded-lg"
                                                            {...register("event_client")}
                                                        >
                                                            {
                                                                clientsList.results.map((client) => (
                                                                    <option 
                                                                        key={ client.id }
                                                                        value={ client.id }
                                                                    >{ client.first_name + ' ' +client.last_name }</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="w-full pr-4 md:pr-2 mt-5 flex justify-end gap-x-3">
                                                    <button
                                                        className="modalAddBtn color-transition"
                                                        onClick={ onAddEvent }
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
                            {/* Start of Edit Modal */}
                            <Transition appear show={isEditOpen} as={Fragment}>
                                <Dialog
                                    as="div"
                                    className="fixed inset-0 z-20 overflow-y-auto backdrop-filter backdrop-brightness-50"
                                    onClose={closeEditModal}
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
                                                    onClick={closeEditModal}
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
                                                onSubmit={ handleSubmit2(updateEvent) }
                                            >

                                                <h4 className="text-base font-bold">Update Event</h4>

                                                {/* This is for the name field */}
                                                <div className="flex flex-col md:flex-row gap-y-5 gap-x-5">

                                                    <div className="flex flex-col gap-y-1">
                                                        <label className="inputFieldLabel">Event Name</label>
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
                                                                type="hidden"
                                                                { ...register2("update_event_id") }
                                                                defaultValue={eventsList.results.length ? eventsList.results[editIndex.current].id : ''}
                                                            />
                                                            <input
                                                                type="text"
                                                                { ...register2("update_event_name", { required : "This field cannot be empty" }) } 
                                                                className="inputField"
                                                                autoComplete='off'
                                                                defaultValue={ eventsList.results.length ? eventsList.results[editIndex.current].event_name : '' }
                                                            />
                                                        </div>
                                                        { 
                                                            errors2.update_event_name && 
                                                            <div className="flex items-center gap-x-1 text-red-500">
                                                                <AuthErrorIcon />
                                                                <p className="text-xs">{ errors2.update_event_name.message }</p>
                                                            </div> 
                                                        }
                                                    </div>

                                                    <div className="flex flex-col gap-y-1">
                                                        <label className="inputFieldLabel">Venue Location</label>
                                                        <div className="inputContainer">
                                                            <svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                className="inputIcon" 
                                                                fill="none" 
                                                                viewBox="0 0 24 24" 
                                                                stroke="currentColor"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            <AutocompletePlace
                                                                onSelect={place => handleLocationVal(place)}
                                                                defaultPlace={ eventsList.results.length ? eventsList.results[editIndex.current].venue_location : '' }
                                                            />
                                                        </div>
                                                    </div>

                                                </div>

                                                {/* This is for the venue name & package cost */}
                                                <div className="flex flex-col md:flex-row gap-y-5 gap-x-5">

                                                    <div className="flex flex-col gap-y-1">
                                                        <label className="inputFieldLabel">Venue Name</label>
                                                        <div className="inputContainer">
                                                            <svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                className="inputIcon" 
                                                                fill="none" 
                                                                viewBox="0 0 24 24" 
                                                                stroke="currentColor"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                            </svg>
                                                            <input
                                                                type="text"
                                                                { ...register2("update_venue_name", { required : "This field cannot be empty" }) } 
                                                                className="inputField"
                                                                autoComplete='off'
                                                                defaultValue={ eventsList.results.length ? eventsList.results[editIndex.current].venue_name : '' }
                                                            />
                                                        </div>
                                                        { 
                                                            errors.update_venue_name && 
                                                            <div className="flex items-center gap-x-1 text-red-500">
                                                                <AuthErrorIcon />
                                                                <p className="text-xs">{ errors.update_venue_name.message }</p>
                                                            </div> 
                                                        }
                                                    </div>

                                                    <div className="flex flex-col gap-y-1">
                                                        <label className="inputFieldLabel">Package Cost</label>
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
                                                                { ...register2("update_package_cost", { required : "This field cannot be empty" }) } 
                                                                className="inputField"
                                                                autoComplete='off'
                                                                defaultValue={ eventsList.results.length ? eventsList.results[editIndex.current].package_cost : '' }
                                                            />
                                                        </div>
                                                        { 
                                                            errors.update_package_cost && 
                                                            <div className="flex items-center gap-x-1 text-red-500">
                                                                <AuthErrorIcon />
                                                                <p className="text-xs">{ errors.update_package_cost.message }</p>
                                                            </div> 
                                                        }
                                                    </div>

                                                </div>

                                                {/* This is for the contact field */}
                                                <div className="flex flex-col md:flex-row gap-y-5 gap-x-5">

                                                    <div className="flex flex-col gap-y-1">
                                                        <label className="inputFieldLabel">Date Schedule</label>
                                                        <div className="inputContainer">
                                                            <input
                                                                type="date"
                                                                { ...register2("update_date_schedule", { required : "This field cannot be empty" }) } 
                                                                className="inputFieldDateTime"
                                                                defaultValue={ eventsList.results.length ? eventsList.results[editIndex.current].date_schedule : '' }
                                                            />
                                                        </div>
                                                        { 
                                                            errors2.update_date_schedule && 
                                                            <div className="flex items-center gap-x-1 text-red-500">
                                                                <AuthErrorIcon />
                                                                <p className="text-xs">{ errors2.update_date_schedule.message }</p>
                                                            </div> 
                                                        }
                                                    </div>

                                                    <div className="flex flex-col gap-y-1">
                                                        <label className="inputFieldLabel">Time Schedule</label>
                                                        <div className='w-40 md:w-63 px-4 py-1 flex items-center justify-between bg-transparent gap-x-5 border border-gray-300 focus-within:border-gray-600 rounded-lg'>
                                                            <select 
                                                                className='customTime'
                                                                {...register2("update_event_hour")}
                                                                defaultValue={ eventsList.results.length ? eventsList.results[editIndex.current].time_schedule.slice(0, -6) : '' }
                                                            >
                                                                <HoursOptions />
                                                            </select>
                                                            <p className='text-sm font-medium text-gray-800 -mx-6'>:</p>
                                                            <select 
                                                                className='customTime'
                                                                {...register2("update_event_minute")}
                                                                defaultValue={ eventsList.results.length ? eventsList.results[editIndex.current].time_schedule.slice(-5, -3) : '' }
                                                            >
                                                                <MinutesOptions />
                                                            </select>
                                                            <select 
                                                                className='customTime'
                                                                {...register2("update_event_schedule")}
                                                            >
                                                                <option value="AM">AM</option>
                                                                <option value="PM">PM</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                </div>

                                                {/* This is for the account fields */}
                                                <div className="flex flex-col md:flex-row gap-y-5 gap-x-5">

                                                    <div className="flex flex-col gap-y-1">
                                                        <label className="inputFieldLabel">Client Payment</label>
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
                                                                { ...register2("update_client_payment", { required : "This field cannot be empty" }) } 
                                                                className="inputField"
                                                                autoComplete='off'
                                                                defaultValue={ eventsList.results.length ? eventsList.results[editIndex.current].client_payment : '' }
                                                            />
                                                        </div>
                                                        { 
                                                            errors2.update_client_payment && 
                                                            <div className="flex items-center gap-x-1 text-red-500">
                                                                <AuthErrorIcon />
                                                                <p className="text-xs">{ errors2.update_client_payment.message }</p>
                                                            </div> 
                                                        }
                                                    </div>
                                                    <div className="flex flex-col gap-y-1">
                                                        <label className="inputFieldLabel">Event Client</label>
                                                        <select
                                                            className="inputSelect rounded-lg"
                                                            {...register2("update_event_client")}
                                                            defaultValue={ eventsList.results.length ? eventsList.results[editIndex.current].client : ''} 
                                                        >
                                                            {
                                                                clientsList.results.map((client) => (
                                                                    <option 
                                                                        key={ client.id }
                                                                        value={ client.id }
                                                                    >{ client.first_name + ' ' +client.last_name }</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
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
                                                        onClick={ closeEditModal }
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
                            {/* End of Edit Modal */}
                        </div>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center items-stretch gap-5">
                            {
                                eventsList.results.map((event, event_index) => (
                                    <div
                                        key={ event.id }
                                        className="relative card w-full flex flex-col gap-y-6"
                                    >
                                        <h4 className="text-base font-semibold capitalize dark:text-gray-300">{ event.event_name }</h4>
                                        <div className="flex flex-col gap-y-2">
                                            <div className="flex items-center gap-x-2">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="h-5 w-5 text-pink-600" 
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <p className="text-sm font-medium dark:text-gray-300">Venue Name</p>
                                            </div>
                                            <Link 
                                                href={`/admin/events/locations?lat=${event.venue_lat}&long=${event.venue_long}`}
                                                passHref
                                            >
                                                <a 
                                                    className="text-gray-500 dark:text-gray-300 hover:text-pink-600 hover:underline text-xs"
                                                >
                                                    { event.venue_name }
                                                </a>
                                            </Link>
                                        </div>
                                        <div className="flex flex-col gap-y-6">
                                            <div className="w-full flex justify-between">
                                                <div className="flex items-center gap-x-2">
                                                    <svg 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        className="h-5 w-5 text-pink-600" 
                                                        fill="none" 
                                                        viewBox="0 0 24 24" 
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <p className="text-sm font-medium dark:text-gray-300">{ moment(event.date_schedule).format('ll') }</p>
                                                </div>
                                                <div className="flex items-center gap-x-2">
                                                    <svg 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <p className="text-sm font-medium dark:text-gray-300">{ event.time_schedule }</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-x-2">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="h-5 w-5 text-pink-600" 
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                <p className="text-sm font-medium dark:text-gray-300">{peso(event.package_cost).format()}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-y-1">
                                            <div className="flex items-center gap-x-2">
                                                <p className="text-xs font-medium dark:text-gray-300">Progress</p>
                                                <p className="text-sm font-normal dark:text-gray-300">{ completedList[event_index] === 0 ? 0 : Math.round((completedList[event_index] / totalList[event_index]) * 100) }%</p>
                                            </div>
                                            <div className="w-full h-2 rounded-md bg-gray-200">
                                                <div className="h-2 rounded-md bg-pink-600" style={{width : completedList[event_index] === 0 ? 0 : Math.round((completedList[event_index] / totalList[event_index]) * 100) + '%'}}></div>
                                            </div>
                                        </div>
                                        <Menu as="div" className="w-full flex justify-end">
                                            <Menu.Button
                                                className={`bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 focus:bg-gray-200 focus:outline-none text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:text-gray-700 dark:focus:text-gray-300 ${adminStyles.cardPopOverBtn}`  }
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className={ adminStyles.actionBtnIcon } fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                                </svg>
                                            </Menu.Button>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute z-10 w-56 mt-10 bg-white divide-y divide-gray-200 rounded-md shadow-lg border border-gray-300 py-1">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                        <Link 
                                                            as={`/admin/events?event_id=${event.id}`}
                                                            href={{
                                                                pathname : "/admin/events/event",
                                                                query : { id : event.id }
                                                            }}
                                                        >
                                                        <button
                                                            className={`${adminStyles.cardPopOverItem} color-transition`}
                                                        >
                                                            <svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                className={ adminStyles.actionBtnIcon } 
                                                                fill="none" 
                                                                viewBox="0 0 24 24" 
                                                                stroke="currentColor"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                            <p className="text-xs font-medium">View Event</p>
                                                        </button>
                                                        </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                        <button
                                                            className={`${adminStyles.cardPopOverItem} color-transition`}
                                                            onClick={ () => openEditModal(event_index) }
                                                        >
                                                            <svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                className={ adminStyles.actionBtnIcon } 
                                                                fill="none" 
                                                                viewBox="0 0 24 24" 
                                                                stroke="currentColor"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                            <p className="text-xs font-medium">Edit Event</p>
                                                        </button>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                        <button
                                                            className={`${adminStyles.cardPopOverItem} color-transition`}
                                                            onClick={ () => deleteEvent(event.id, event.event_name) }
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
                                                            <p className="text-xs font-medium">Delete Event</p>
                                                        </button>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                ))
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
    const api = process.env.NEXT_PUBLIC_DRF_API
    const token = req.cookies.jwt
    let completed_counter = 0
    const completed_arr = []
    let total_counter = 0
    const total_arr = []
    const res1 = await fetch(`${api}clients_list/`,{
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data1 = await res1.json()
    const res2 = await fetch(`${api}events_list/`,{
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data2 = await res2.json()
    const res3 = await fetch(`${api}tasks_list`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data3 = await res3.json()
    const res4 = await fetch(`${api}completed_list`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data4 = await res4.json()
    // FOR THE TOTAL OVERALL TASKS
    for (let i = 0; i < data2.results.length; i++) {
        total_counter = 0
        for (let j = 0; j < data3.results.length; j++) {
            if (data3.results[j].event === data2.results[i].id) {
                total_counter++
            }
        }
        total_arr.push(total_counter++)
    }
    // FOR THE TOTAL COMPLETED TASKS
    for (let i = 0; i < data2.results.length; i++) {
        completed_counter = 0
        for (let j = 0; j < data4.results.length; j++) {
            if (data4.results[j].event === data2.results[i].id) {
                completed_counter++
            }
        }
        completed_arr.push(completed_counter++)
    }
    let events_copy = data2.results
    for (let i = 0; i < data1.results.length; i++) {
        for (let j = 0; j < data2.results.length; j++) {
            data2.results[j].client === data1.results[i].id ? events_copy[j].client_name = data1.results[i].first_name+" "+data1.results[i].last_name : ""
        }
    }
    return {
        props : {
            clientsList : data1,
            eventsList : data2,
            totalList : total_arr,
            completedList : completed_arr,
            csvEvents : events_copy
        }
    }
}