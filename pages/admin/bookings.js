import React from 'react'
import TopNav from '../../components/admin/TopNav'
import SideNav from '../../components/admin/SideNav'
import Footer from '../../components/admin/Footer'
import PageHeader from '../../components/admin/PageHeader'
import BookingItem from '../../components/admin/bookings/BookingItem'
import adminStyles from '../../styles/Admin.module.css'

export default function bookings() {
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="bookings" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav />
                <div className="row-start-2 w-full h-full bg-gray-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Bookings List" />
                        <div className="card w-full">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className={ adminStyles.theadClass }>
                                    <tr className="text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Name
                                        </th>
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Preferred Date
                                        </th>
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Budget
                                        </th>
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Booking Motif
                                        </th>
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className={ adminStyles.tbodyClass }>
                                    <BookingItem name="Abdhul Dominador" date="June 26, 2021" budget="₱250000" motif="Wedding Event" />
                                    <BookingItem name="Abdhul Dominador" date="June 26, 2021" budget="₱250000" motif="Wedding Event" />
                                    <BookingItem name="Abdhul Dominador" date="June 26, 2021" budget="₱250000" motif="Wedding Event" />
                                    <BookingItem name="Abdhul Dominador" date="June 26, 2021" budget="₱250000" motif="Wedding Event" />
                                    <BookingItem name="Abdhul Dominador" date="June 26, 2021" budget="₱250000" motif="Wedding Event" />
                                    <BookingItem name="Abdhul Dominador" date="June 26, 2021" budget="₱250000" motif="Wedding Event" />
                                    <BookingItem name="Abdhul Dominador" date="June 26, 2021" budget="₱250000" motif="Wedding Event" />
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
