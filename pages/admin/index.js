import React, { useState } from 'react'
import TopNav from '../../components/admin/TopNav'
import SideNav from '../../components/admin/SideNav'
import Footer from '../../components/admin/Footer'
import PageHeader from '../../components/admin/PageHeader'
import SalesOverview from '../../components/admin/dashboard/SalesOverview'
import AffiliationRequest from '../../components/admin/dashboard/AffiliationRequest'
import UpcomingEvents from '../../components/admin/dashboard/UpcomingEvents'


export default function dashboard() {
    const [isDark, setIsDark] = useState(false)
    const handleDark = () => {
        setIsDark(true)
    }
    return (
        <div className={`${isDark ? 'dark' : ''} w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800 dark:text-gray-300`}>
            <SideNav isActive="dashboard" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav handleDark={ handleDark } dark={ isDark } />
                <div className="row-start-2 w-full h-full bg-gray-100 dark:bg-gray-800">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Dashboard" />
                        <SalesOverview />
                        <div className="w-full flex gap-x-5">
                            <AffiliationRequest />
                            <UpcomingEvents />
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
