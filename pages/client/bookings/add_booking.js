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

const eventTypeArr = [
    { name : 'Wedding Event' },
    { name : 'Debut Event' },
    { name : 'Corporate Event' },
    { name : 'Conferences Event' },
    { name : 'Dinner Galas Event' },
    { name : 'Fundraisers Event' },
    { name : 'Long Service Awards Event' },
    { name : 'Grand Openings Event' },
    { name : 'Family Day’s Event' },
    { name : 'Pageantries Event' },
    { name : 'Conventions Event' },
    { name : 'Private Event' },
]
const serviceRequirementsArr = [
    { name : 'Plated' },
    { name : 'Buffet' },
    { name : 'Neither' },
]
const eventBeveragesArr = [
    { name : 'Alcoholic' },
    { name : 'Non-Alcoholic' },
    { name : 'Both' },
    { name : 'Neither' },
]
const bestWayArr = [
    { name : 'Phone Call' },
    { name : 'Text Messages' },
    { name : 'Facebook/Email' },
    { name : 'All' },
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
    const [eventType, setEventType] = useState(eventTypeArr[0])
    const [serviceRequirements, setServiceRequirements] = useState(serviceRequirementsArr[0])
    const [eventBeverages, setEventBeverages] = useState(eventBeveragesArr[0])
    const [bestWay, setBestWay] = useState(bestWayArr[0])
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
                                        <Listbox as="div" className="w-63" value={eventType} onChange={setEventType}>
                                            <div className="relative">
                                            <Listbox.Button className="relative text-left text-sm w-full px-3 py-1 bg-gray-200 text-gray-500 focus-within:text-teal-700 border-gray-200 focus:outline-none focus-within:border-teal-700 focus-within:ring-1 focus-within:ring-teal-700 rounded-sm">
                                                <span className="block truncate text-gray-500">{eventType.name}</span>
                                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="inputIcon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                                </svg>
                                                </span>
                                            </Listbox.Button>
                                            <Transition
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-sm bg-white rounded-md shadow-lg max-h-60 focus:outline-none sm:text-xs border border-gray-300">
                                                {eventTypeArr.map((event, eventIdx) => (
                                                    <Listbox.Option
                                                    key={eventIdx}
                                                    className={({ active }) =>
                                                        `${active ? 'text-gray-700 bg-gray-100' : 'text-gray-700'}
                                                            cursor-default select-none relative py-2 pl-10 pr-4`
                                                    }
                                                    value={event}
                                                    >
                                                    {({ selected, active }) => (
                                                        <>
                                                        <span
                                                            className={`${
                                                            eventType ? 'font-medium' : 'font-normal'
                                                            } block truncate`}
                                                        >
                                                            {event.name}
                                                        </span>
                                                        {selected ? (
                                                            <span
                                                            className={`${
                                                                active ? 'text-teal-700' : 'text-teal-700'
                                                            }
                                                                    absolute inset-y-0 left-0 flex items-center pl-3`}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="inputIcon" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                            </span>
                                                        ) : null}
                                                        </>
                                                    )}
                                                    </Listbox.Option>
                                                ))}
                                                </Listbox.Options>
                                            </Transition>
                                            </div>
                                        </Listbox>
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
                                        <Listbox as="div" className="w-63" value={serviceRequirements} onChange={setServiceRequirements}>
                                            <div className="relative">
                                            <Listbox.Button className="relative text-left text-sm w-full px-3 py-1 bg-gray-200 text-gray-500 focus-within:text-teal-700 border-gray-200 focus:outline-none focus-within:border-teal-700 focus-within:ring-1 focus-within:ring-teal-700 rounded-sm">
                                                <span className="block truncate text-gray-500">{serviceRequirements.name}</span>
                                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="inputIcon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                                </svg>
                                                </span>
                                            </Listbox.Button>
                                            <Transition
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-sm bg-white rounded-md shadow-lg max-h-60 focus:outline-none sm:text-xs border border-gray-300">
                                                {serviceRequirementsArr.map((service, serviceIdx) => (
                                                    <Listbox.Option
                                                    key={serviceIdx}
                                                    className={({ active }) =>
                                                        `${active ? 'text-gray-700 bg-gray-100' : 'text-gray-700'}
                                                            cursor-default select-none relative py-2 pl-10 pr-4`
                                                    }
                                                    value={service}
                                                    >
                                                    {({ selected, active }) => (
                                                        <>
                                                        <span
                                                            className={`${
                                                            serviceRequirements ? 'font-medium' : 'font-normal'
                                                            } block truncate`}
                                                        >
                                                            {service.name}
                                                        </span>
                                                        {selected ? (
                                                            <span
                                                            className={`${
                                                                active ? 'text-teal-700' : 'text-teal-700'
                                                            }
                                                                    absolute inset-y-0 left-0 flex items-center pl-3`}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="inputIcon" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                            </span>
                                                        ) : null}
                                                        </>
                                                    )}
                                                    </Listbox.Option>
                                                ))}
                                                </Listbox.Options>
                                            </Transition>
                                            </div>
                                        </Listbox>
                                    </div>
                                    <div className="flex flex-col gap-y-1">
                                        <label htmlFor="booking_beverages" className="inputFieldLabel">Beverages</label>
                                        <Listbox as="div" className="w-63" value={eventBeverages} onChange={setEventBeverages}>
                                            <div className="relative">
                                            <Listbox.Button className="relative text-left text-sm w-full px-3 py-1 bg-gray-200 text-gray-500 focus-within:text-teal-700 border-gray-200 focus:outline-none focus-within:border-teal-700 focus-within:ring-1 focus-within:ring-teal-700 rounded-sm">
                                                <span className="block truncate text-gray-500">{eventBeverages.name}</span>
                                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="inputIcon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                                </svg>
                                                </span>
                                            </Listbox.Button>
                                            <Transition
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-sm bg-white rounded-md shadow-lg max-h-60 focus:outline-none sm:text-xs border border-gray-300">
                                                {eventBeveragesArr.map((beverages, beveragesIdx) => (
                                                    <Listbox.Option
                                                    key={beveragesIdx}
                                                    className={({ active }) =>
                                                        `${active ? 'text-gray-700 bg-gray-100' : 'text-gray-700'}
                                                            cursor-default select-none relative py-2 pl-10 pr-4`
                                                    }
                                                    value={beverages}
                                                    >
                                                    {({ selected, active }) => (
                                                        <>
                                                        <span
                                                            className={`${
                                                            eventBeverages ? 'font-medium' : 'font-normal'
                                                            } block truncate`}
                                                        >
                                                            {beverages.name}
                                                        </span>
                                                        {selected ? (
                                                            <span
                                                            className={`${
                                                                active ? 'text-teal-700' : 'text-teal-700'
                                                            }
                                                                    absolute inset-y-0 left-0 flex items-center pl-3`}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="inputIcon" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                            </span>
                                                        ) : null}
                                                        </>
                                                    )}
                                                    </Listbox.Option>
                                                ))}
                                                </Listbox.Options>
                                            </Transition>
                                            </div>
                                        </Listbox>
                                    </div>
                                </div>
                                {/* best way to contact fields */}
                                <div className="w-full px-2">
                                    <RadioGroup value={bestWay} onChange={setBestWay} className="flex flex-col gap-y-1">
                                        <RadioGroup.Label className="inputFieldLabel">Best way to contact you?</RadioGroup.Label>
                                        <div className="grid grid-cols-2 grid-rows-2 gap-y-3 gap-x-5">
                                            {bestWayArr.map((best) => (
                                            <RadioGroup.Option
                                                key={best.name}
                                                value={best}
                                                className={({ active, checked }) =>
                                                `${
                                                    active
                                                    ? 'border-teal-700'
                                                    : ''
                                                }
                                                ${
                                                    checked
                                                    ? 'border-teal-700'
                                                    : ''
                                                }
                                                    relative rounded-sm shadow p-5 cursor-pointer flex focus:outline-none border border-gray-300`
                                                }
                                            >
                                                {({ active, checked }) => (
                                                <>
                                                    <div className="flex items-center justify-between w-full">
                                                    <div className="flex items-center">
                                                        <div className="text-sm">
                                                        <RadioGroup.Label
                                                            as="p"
                                                            className={`font-medium  ${
                                                            checked ? 'text-teal-700' : 'text-gray-700'
                                                            }`}
                                                        >
                                                            {best.name}
                                                        </RadioGroup.Label>
                                                        </div>
                                                    </div>
                                                    {checked && (
                                                        <div className="flex-shrink-0 text-white bg-teal-700 rounded-full">
                                                            <CheckIcon className="w-6 h-6" />
                                                        </div>
                                                    )}
                                                    </div>
                                                </>
                                                )}
                                            </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup>
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