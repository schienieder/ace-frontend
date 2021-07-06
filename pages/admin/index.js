import React, { useState, useEffect } from 'react'
import TopNav from '../../components/admin/TopNav'
import SideNav from '../../components/admin/SideNav'
import Footer from '../../components/admin/Footer'
import PageHeader from '../../components/admin/PageHeader'
import SalesOverview from '../../components/admin/dashboard/SalesOverview'
import AffiliationRequest from '../../components/admin/dashboard/AffiliationRequest'
import UpcomingEvents from '../../components/admin/dashboard/UpcomingEvents'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

export default function dashboard() {
    const router = useRouter()
    const axios = require('axios')
    const readCookie = () => {
        try {
            const jwt_token = Cookies.get('jwt')
            const decoded_token = jwt_decode(jwt_token)
            axios({
                method : 'GET',
                url : `http://localhost:8000/account/${decoded_token.user_id}`,
                headers : {'Authorization' : 'Bearer'+' '+ jwt_token}
            })
            .then((response) => {
                response.data.role !== 'admin' ? router.push('/login') : ''
            })
            .catch((error) => {
                Swal.fire({
                    icon : 'error',
                    title: 'Error',
                    text: `${error.response}`,
                    showCloseButton: true,
                    confirmButtonColor: '#0F766E',
                })
                console.log(error.response)
            })
            console.log(jwt_token)
        }
        catch {
            router.push('/login')
        }
    }
    useEffect(() => {
        readCookie()
    }, [])
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
