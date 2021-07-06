import React, { useEffect } from 'react'
import TopNav from '../../../components/admin/TopNav'
import SideNav from '../../../components/admin/SideNav'
import Footer from '../../../components/admin/Footer'
import PageHeader from '../../../components/admin/PageHeader'
import CalendarHook from '../../../components/admin/events/CalendarHook'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

export default function cards() {
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
    const { calendarRows, selectedDate, todayFormatted, daysShort, monthNames, getNextMonth, getPrevMonth } = CalendarHook()
    const dateClickHandler = date => {
        console.log(date);
    }
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="events" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav />
                <div className="row-start-2 w-full h-full bg-gray-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Event Calendar" />
                        <div className="card w-full flex flex-col gap-y-3">
                            <div className="flex justify-between items-center px-5">
                                {/* This is the month name and year */}
                                <div className="flex gap-x-3">
                                    <h4 className="font-bold">{ monthNames[selectedDate.getMonth()] }</h4>
                                    <p className="font-normal">{ selectedDate.getFullYear() }</p>
                                </div>
                                {/* This is the buttons for next and prev */}
                                <div className="flex">
                                    <button
                                        type="button" 
                                        className="flex items-center gap-x-1 px-3 py-1 border border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none color-transition rounded-tl-md rounded-bl-md"
                                        onClick={ getPrevMonth }
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                        </svg>
                                        <p className="font-normal text-sm">Prev</p>
                                    </button>
                                    <button
                                        type="button" 
                                        className="flex items-center gap-x-1 px-3 py-1 border border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none color-transition rounded-tr-md rounded-br-md"
                                        onClick={ getNextMonth }
                                    >
                                        <p className="font-normal text-sm">Next</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <table className="divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr className="text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        {daysShort.map(day => (
                                            <th key={day} className="px-4 py-3">{day}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {
                                        Object.values(calendarRows).map(cols => {
                                        return <tr key={cols[0].date} className="text-sm font-medium text-gray-600">
                                            {cols.map(col => (
                                            col.date === todayFormatted
                                                ? <td key={col.date} className={`${col.classes} p-8 cursor-pointer bg-teal-700 text-gray-100 color-transition`} onClick={() => dateClickHandler(col.date)}>{ col.value }</td>
                                                : <td key={col.date} className={`${col.classes} p-8 cursor-pointer bg-transparent hover:bg-gray-100 color-transition`} onClick={() => dateClickHandler(col.date)}>{ col.value }</td>
                                            ))}
                                        </tr>
                                        })
                                    }
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
