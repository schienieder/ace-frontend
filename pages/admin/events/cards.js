import React from 'react'
import TopNav from '../../../components/admin/TopNav'
import SideNav from '../../../components/admin/SideNav'
import Footer from '../../../components/admin/Footer'
import PageHeader from '../../../components/admin/PageHeader'
import EventCards from '../../../components/admin/events/EventCards'

export default function cards() {
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="events" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav />
                <div className="row-start-2 w-full h-full bg-gray-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Event Cards" />
                        <EventCards />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
