import React from 'react'
import TopNav from '../../components/admin/TopNav'
import SideNav from '../../components/admin/SideNav'
import Footer from '../../components/admin/Footer'
import PageHeader from '../../components/admin/PageHeader'
import InterviewItem from '../../components/admin/interviews/InterviewItem'
import adminStyles from '../../styles/Admin.module.css'

export default function interviews() {
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="bookings" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav />
                <div className="row-start-2 w-full h-full bg-gray-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Interview Schedules" />
                        <div className="card w-full flex flex-col gap-y-5">
                        <div className="w-full flex justify-between items-center">
                                <div className={ adminStyles.searchBarContainer }>
                                    <input 
                                        type="text"
                                        className={ adminStyles.searchBarInput }
                                        placeholder="Search Name . . ."
                                    />
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-5 w-5 text-current" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <button
                                    type="button" 
                                    className={ adminStyles.addBtn }
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
                                    <p className="text-sm font-bold">New Partner</p>
                                </button>
                            </div>
                            <table className="min-w-full divide-y divide-gray-200 border-b border-gray-200">
                                <thead className={ adminStyles.theadClass }>
                                    <tr className="text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Client Name
                                        </th>
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Location
                                        </th>
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Date
                                        </th>
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Time
                                        </th>
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className={ adminStyles.tbodyClass }>
                                    <InterviewItem name="Ailene Padaplin" location="Alas Creative Events Office" date="July 20, 2021" time="09:30 AM" />
                                    <InterviewItem name="Rey Carlo Piedad" location="Gourmet Restaurant, Tagum City" date="July 21, 2021" time="1:30 PM" />
                                    <InterviewItem name="Kim Jeric Buemil" location="Big 8 Hotel, Tagum City" date="July 22, 2021" time="5:00 PM" />
                                    <InterviewItem name="Ailene Padaplin" location="Alas Creative Events Office" date="July 20, 2021" time="09:30 AM" />
                                    <InterviewItem name="Rey Carlo Piedad" location="Gourmet Restaurant, Tagum City" date="July 21, 2021" time="1:30 PM" />
                                    <InterviewItem name="Kim Jeric Buemil" location="Big 8 Hotel, Tagum City" date="July 22, 2021" time="5:00 PM" />
                                    <InterviewItem name="Ailene Padaplin" location="Alas Creative Events Office" date="July 20, 2021" time="09:30 AM" />
                                    <InterviewItem name="Rey Carlo Piedad" location="Gourmet Restaurant, Tagum City" date="July 21, 2021" time="1:30 PM" />
                                    <InterviewItem name="Kim Jeric Buemil" location="Big 8 Hotel, Tagum City" date="July 22, 2021" time="5:00 PM" />
                                </tbody>
                            </table>
                            <div className="flex gap-x-2 text-sm">
                                <p className="font-normal">Total Interviews: </p>
                                <p className="font-bold">20</p>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}