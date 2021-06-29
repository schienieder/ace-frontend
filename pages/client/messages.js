import React from 'react'
import SideNav from '../../components/client/SideNav'
import TopNav from '../../components/client/TopNav'
import Footer from '../../components/client/Footer'
import PageHeader from '../../components/client/PageHeader'

export default function messages() {
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="messages" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav />
                <div className="row-start-2 w-full h-full bg-gray-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Messages" />
                        
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
