import React from 'react'
import TopNav from '../../components/partner/TopNav'
import SideNav from '../../components/partner/SideNav'
import Footer from '../../components/partner/Footer'

export default function messages() {
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="messages" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav />
                <div className="row-start-2 w-full h-full bg-gray-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <h4 className="text-xl font-bold">Messages</h4>
                        <div className="card w-full">
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
