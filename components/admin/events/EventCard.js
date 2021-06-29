import React, { Fragment } from 'react'
import adminStyles from '../../../styles/Admin.module.css'
import { Menu, Transition } from '@headlessui/react'

const EventCard = () => {
    return (
        <div className="relative card w-full flex flex-col gap-y-6">
            <h4 className="text-base font-semibold capitalize">Angel Malabarbas Debut</h4>
            <div className="flex flex-col gap-y-2">
                <div className="flex items-center gap-x-2">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 text-teal-700" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-sm font-medium">Venue Location</p>
                </div>
                <p className="text-gray-500 text-xs">Quezon St., Tagum City, Davao del Norte</p>
            </div>
            <div className="w-full flex justify-between">
                <div className="flex items-center gap-x-2">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 text-teal-700" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm font-medium">June 26, 2021</p>
                </div>
                <div className="flex items-center gap-x-2">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm font-medium">10:30 PM</p>
                </div>
            </div>
            <div className="flex flex-col gap-y-1">
                <div className="flex items-center gap-x-2">
                    <p className="text-xs font-medium">Progress</p>
                    <p className="text-sm font-normal">40%</p>
                </div>
                <div className="w-full h-2 rounded-md bg-teal-100">
                    <div className="w-1/4 h-2 rounded-md bg-teal-600"></div>
                </div>
            </div>
            <Menu as="div" className="w-full flex justify-end">
                <Menu.Button
                    className={ adminStyles.cardPopOverBtn }
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
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
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
    )
}

export default EventCard
