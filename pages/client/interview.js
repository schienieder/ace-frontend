import React from 'react'
import SideNav from '../../components/client/SideNav'
import TopNav from '../../components/client/TopNav'
import Footer from '../../components/client/Footer'
import PageHeader from '../../components/client/PageHeader'
import InterviewCard from '../../components/client/InterviewDetailCard'

export default function interview() {
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="interview" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav />
                <div className="row-start-2 w-full h-full bg-gray-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Interview Schedules" />
                        <div className="flex gap-x-5">
                            {/* profile & interview sched/location card */}
                            <div className="card w-2/5 h-screen flex flex-col gap-y-5 text-gray-700">
                                <div className="w-full flex flex-col justify-center gap-y-5">
                                    <div className="flex flex-col items-center gap-y-3 mt-5">
                                        <div className="h-28 w-28 bg-gray-200 rounded-full"></div>
                                        <h4 className="text-lg font-bold">Justine Rhei Torres</h4>
                                    </div>
                                    <div className="w-full flex flex-col justify-start">
                                        <div className="flex flex-col border-t border-gray-200 py-3 gap-y-5">
                                            <h4 className="font-bold">Contact Details</h4>
                                            <div className="flex items-center gap-x-1">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="h-5 w-5 text-current" 
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                </svg>
                                                <p className="text-xs">09063536212</p>
                                            </div>
                                            <div className="flex items-center gap-x-1">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="h-5 w-5 text-current" 
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <p className="text-xs">miakabudo_miakaki@yahoo.com</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col border-t border-b border-gray-200 py-3 gap-y-4">
                                            <h4 className="font-bold">Interview Details</h4>
                                            <div className="flex items-center gap-x-1">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="h-6 w-6 text-current" 
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <p className="text-xs">Gourmet Restaurant, Quezon Street, Tagum City</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="flex items-center gap-x-1">
                                                    <svg 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        className="h-6 w-6 text-current" 
                                                        fill="none" 
                                                        viewBox="0 0 24 24" 
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <p className="text-xs">July 29, 2021</p>
                                                </div>
                                                <div className="flex items-center gap-x-1">
                                                    <svg 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        className="h-6 w-6 text-current" 
                                                        fill="none" 
                                                        viewBox="0 0 24 24" 
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <p className="text-xs">10:30 AM</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* booking details card */}
                            <div className="w-3/5 flex flex-col gap-y-5 text-gray-700">
                                <h4 className="font-bold">Interview Details</h4>
                                <div className="w-full grid grid-cols-2 gap-x-5">
                                    <InterviewCard 
                                        title="Location" 
                                        text="Gourmet Restaurant, Quezon Street, Tagum City"
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-5 w-5 text-current" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </InterviewCard>
                                    <InterviewCard 
                                        title="Date & Time" 
                                        text="Gourmet Restaurant, Quezon Street, Tagum City"
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-5 w-5 text-current" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </InterviewCard>
                                </div>
                                <h4 className="font-bold">Booking Details</h4>
                                <div className="w-full grid grid-rows-3 gap-5">
                                    <InterviewCard 
                                        title="Location" 
                                        text="Gourmet Restaurant, Quezon Street, Tagum City"
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-5 w-5 text-current" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </InterviewCard>
                                    <InterviewCard 
                                        title="Date & Time" 
                                        text="Gourmet Restaurant, Quezon Street, Tagum City"
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-5 w-5 text-current" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </InterviewCard>
                                    <InterviewCard 
                                        title="Location" 
                                        text="Gourmet Restaurant, Quezon Street, Tagum City"
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-5 w-5 text-current" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </InterviewCard>
                                </div>
                                {/* <h4 className="font-bold">Booking Details</h4>
                                <div className="grid grid-cols-2">
                                    <BookingDetailItem title="Type of Event" subtext="Wedding Event" />
                                    <BookingDetailItem title="Venue" subtext="Big 8 Hotel, Tagum City, Davao del Norte" />
                                </div>
                                <div className="grid grid-cols-2">
                                    <BookingDetailItem title="Type of Venue" subtext="Indoor" />
                                    <BookingDetailItem title="No. of Guests" subtext="80" />
                                </div>
                                <div className="grid grid-cols-2">
                                    <BookingDetailItem title="Seating Style" subtext="Theatre Style" />
                                    <BookingDetailItem title="Time Schedule" subtext="7:00 PM" />
                                </div>
                                <div className="grid grid-cols-2">
                                    <BookingDetailItem title="Desired Date" subtext="July 16, 1999" />
                                    <BookingDetailItem title="Service Requirements" subtext="Buffet" />
                                </div>
                                <div className="grid grid-cols-2">
                                    <BookingDetailItem title="Beverages" subtext="July 16, 1999" />
                                    <BookingDetailItem title="Best way to contact you?" subtext="Facebook/Email" />
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
