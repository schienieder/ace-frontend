import React, { useState, useEffect, useMemo } from 'react'
import TopNav from '../../components/admin/TopNav'
import SideNav from '../../components/admin/SideNav'
import Footer from '../../components/Footer'
import PageHeader from '../../components/PageHeader'
import SalesTable from '../../components/SalesTable'
import moment from 'moment'
import { useRouter } from 'next/router'
import { ExportToCsv } from 'export-to-csv'
import currency from 'currency.js'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const data = [
    {
        month: "January",
        sales: 800000,
    },
    {
        month: "February",
        sales: 850000,
    },
];

export default function sales({ incuredEvents, totalSales }) {
    const peso = value => currency(value, { symbol : '₱', precision : 0 })
    const table_data = useMemo(() => incuredEvents, [incuredEvents.length])
    const eventsColumns = useMemo(() => [
        {
            Header : 'Event Name',
            accessor : 'event_name'
        },
        {
            Header : 'Client Name',
            accessor : 'client_name'
        },
        {
            Header : 'Date Schedule',
            accessor : 'date_schedule',
            Cell : ({row}) => (
                <p className="text-sm text-gray-800">{ moment(row.original.date_schedule).format('LL') }</p>
            )
        },
        {
            Header : 'Package Cost',
            accessor : 'package_cost',
            Cell : ({row}) => (
                <p className="text-sm text-gray-800">{ peso(row.original.package_cost).format() }</p>
            )
        }
    ], [])
    const router = useRouter()
    const [userName, setUsername] = useState()
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
    const options = {
        useKeysAsHeaders: true,
        filename : 'Sales Reports'
    }
    const csvExporter = new ExportToCsv(options);
    const exportData = () => {
        incuredEvents.forEach((event) => {
            event.date_schedule = moment(event.date_schedule).format('ll')
            delete event.id
            delete event.venue_location
            delete event.venue_name
            delete event.venue_lat
            delete event.venue_long
            delete event.client_payment
            delete event.payment_status
            delete event.time_schedule
            delete event.created_at
            delete event.updated_at
            delete event.client
        })
        csvExporter.generateCsv(incuredEvents);
    }
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="reports" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto overflow-x-hidden">
                <TopNav username={ userName } />
                <div className="row-start-2 w-full h-full bg-true-100">
                    <div className="p-8 flex flex-col gap-y-8 min-h-screen">
                        <PageHeader text="Sales Report">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        </PageHeader>
                        <div className='w-full card'>
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart
                                    data={data}
                                    margin={{
                                        top: 10,
                                        bottom: 5,
                                        left: -35
                                    }}
                                    style={{
                                        fontSize : '12px'
                                    }}
                                    >
                                    <CartesianGrid opacity={ 0.3 } vertical={ false } />
                                    <XAxis 
                                        dataKey="month"
                                        strokeWidth={0.5}
                                        axisLine={ true }
                                        tickLine={ false } 
                                        style={{
                                            fontSize : '12px',
                                        }} 
                                    />
                                    <YAxis
                                        strokeWidth={0.5} 
                                        axisLine={ true }
                                        tickLine={ false }
                                        tickFormatter={ number => `${number}` }
                                        style={{
                                            fontSize : '12px',
                                        }}
                                    />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="sales"
                                        stroke="#db2777"
                                        activeDot={{ r: 8 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="card w-full flex flex-col gap-y-5">
                            <SalesTable 
                                columns={ eventsColumns } 
                                data={ table_data } 
                                onClick={ exportData } 
                                btnText="Export Data" 
                                totalSales={ totalSales }
                            />
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({ req }) => {

    const api = process.env.NEXT_PUBLIC_DRF_API
    const token = req.cookies.jwt
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    
    const res1 = await fetch(`${api}incured_events/`,{
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data1 = await res1.json()
    const res2 = await fetch(`${api}clients_list/`,{
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data2 = await res2.json()
    const res3 = await fetch(`${api}total_sales/`,{
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data3 = await res3.json()
    const incuredCopy = data1.results
    for (let i = 0; i < data1.results.length; i++) {
        for (let j = 0; j < data2.results.length; j++) {
            data1.results[i].client === data2.results[j].id ? incuredCopy[i].client_name = data2.results[j].first_name +' '+ data2.results[j].last_name : ''
        }
    }

    return {
        props : {
            incuredEvents : incuredCopy,
            totalSales : data3,
        }
    }

}