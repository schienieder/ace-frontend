import React, { useState, useEffect } from 'react'
import TopNav from './TopNav'
import SideNav from './SideNav'
import AdminMobileNav from './AdminMobileNav'
import Footer from '../Footer'
import PageHeader from '../PageHeader'
// import TopNav from '../../components/admin/TopNav'
// import SideNav from '../../components/admin/SideNav'
// import Footer from '../../components/Footer'
// import PageHeader from '../../components/PageHeader'
import EventsSummary from '../../components/admin/dashboard/EventsSummary'
import AffiliationRequest from '../../components/admin/dashboard/AffiliationRequest'
import UpcomingEvents from '../../components/admin/dashboard/UpcomingEvents'
import { useRouter } from 'next/router'
import useDarkMode from '../../hooks/useDarkMode'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDashboardEvents } from '../../redux/events/events.slice' 
import { fetchDashboardRequests } from '../../redux/requests/requests.slice' 

const DashboardMain = () => {

    const { isDarkMode } = useDarkMode()
    const router = useRouter()
    const [userName, setUsername] = useState()
    const [showMobileNav, setShowMobileNav] = useState(false)
    const dispatch = useDispatch()
    const { dashboardEvents, dashboardRequests } = useSelector(state => ({
        dashboardEvents : state.eventsState.dashboardEvents,
        dashboardRequests : state.requestsState.dashboardRequests
    }))

    const readRole = () => {
        setUsername(localStorage.getItem('username'))
        const role = localStorage.getItem('role')
        if (role !== 'admin') {
            router.push('/login')
        }
    }

    useEffect(() => {
        dispatch(fetchDashboardEvents())
        dispatch(fetchDashboardRequests())
    }, [dispatch])
    

    useEffect(() => {
        readRole()
    }, [])

    return (
        <div className={`${isDarkMode ? 'dark' : ''} w-full h-screen grid grid-cols-1 md:grid-cols-custom-layout font-mont text-gray-800`}>
            <SideNav isActive="dashboard" />
            {
                showMobileNav ?
                <AdminMobileNav 
                    isActive="dashboard"
                    onClick={ () => setShowMobileNav(!showMobileNav) }
                /> 
                : null
            }
            <div className="col-start-1 md:col-start-2 grid grid-rows-custom-layout overflow-y-auto overflow-x-hidden">
                <TopNav 
                    username={ userName } 
                    onClick={ () => setShowMobileNav(!showMobileNav) }
                />
                <div className="row-start-2 w-full h-full bg-true-100 dark:bg-gray-800">
                    <div className="p-5 md:p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Dashboard">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-7 w-7 text-gray-800 dark:text-gray-300" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </PageHeader>
                        <EventsSummary />
                        <div className="w-full flex flex-col md:flex-row gap-y-5 gap-x-5">
                            <AffiliationRequest data={ dashboardRequests } />
                            <UpcomingEvents data={ dashboardEvents } />
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )

}

export default DashboardMain