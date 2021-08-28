import React, { useState, useEffect } from 'react'
import TopNav from '../../../components/admin/TopNav'
import SideNav from '../../../components/admin/SideNav'
import Footer from '../../../components/Footer'
import PageHeader from '../../../components/PageHeader'
import CalendarHook from '../../../components/admin/events/CalendarHook'
import { useRouter } from 'next/router'

export default function cards() {
    const router = useRouter()
    const [userName, setUsername] = useState()
    const readRole = () => {
        setUsername(localStorage.getItem('username'))
        const role = localStorage.getItem('role')
        if (role !== 'admin') {
            router.push('/login')
        }
    }
    useEffect( async () => {
        await readRole()
    }, [])
    const { calendarRows, selectedDate, todayFormatted, daysShort, monthNames, getNextMonth, getPrevMonth } = CalendarHook()
    const dateClickHandler = date => {
        console.log(date);
    }
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="events" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav username={ userName } />
                <div className="row-start-2 w-full h-full bg-true-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Event Calendar">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-7 w-7 text-current"
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </PageHeader>
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
                                                ? <td key={col.date} className={`${col.classes} p-8 cursor-pointer bg-pink-600 text-white color-transition`} onClick={() => dateClickHandler(col.date)}>{ col.value }</td>
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
