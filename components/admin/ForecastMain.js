import React, { useState, useEffect } from 'react'
import TopNav from '../../components/admin/TopNav'
import SideNav from '../../components/admin/SideNav'
import Footer from '../../components/Footer'
import PageHeader from '../../components/PageHeader'
import VenueForecast from '../../components/admin/reports/VenueForecast'
import CateringForecast from '../../components/admin/reports/CateringForecast'
import StylingForecast from '../../components/admin/reports/StylingForecast'
import MCForecast from '../../components/admin/reports/MCForecast'
import PresentationForecast from '../../components/admin/reports/PresentationForecast'
import CoutesyForecast from '../../components/admin/reports/CourtesyRate'
import { useRouter } from 'next/router'
import useDarkMode from '../../hooks/useDarkMode'
import AdminMobileNav from '../../components/admin/AdminMobileNav'

const ForecastMain = () => {
    const { isDarkMode } = useDarkMode()
    const router = useRouter()
    const [userName, setUsername] = useState()
    const [showMobileNav, setShowMobileNav] = useState(false)
    const readRole = () => {
        setUsername(localStorage.getItem('username'))
        const role = localStorage.getItem('role')
        if (role !== 'admin') {
            router.push('/login')
        }
    }
    
    useEffect(() => {
        readRole()
    }, [])
    return (
        <div className={`${ isDarkMode ? 'dark' : '' } w-full h-screen grid grid-cols-1 md:grid-cols-custom-layout font-mont text-gray-800`}>
            <SideNav isActive="reports" />
            {
                showMobileNav ?
                <AdminMobileNav 
                    isActive="reports"
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
                    <div className="p-5 md:p-8 flex flex-col gap-y-8 min-h-screen">
                        <PageHeader text="Satisfaction Forecast">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-7 w-7 text-gray-800 dark:text-gray-300"
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor" 
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                            </svg>
                        </PageHeader>
                        <VenueForecast />
                        <CateringForecast />
                        <StylingForecast />
                        <MCForecast />
                        <PresentationForecast />
                        <CoutesyForecast />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default ForecastMain