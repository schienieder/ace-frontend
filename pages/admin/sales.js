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
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import { useDispatch, useSelector } from 'react-redux'
import { fetchSalesSummary } from '../../redux/sales/sales.slice'
import BeatLoader from 'react-spinners/BeatLoader'

// const salesSummary = [
//     {
//         month : "January",
//         total : 2525000
//     },
//     {
//         month : "February",
//         total : 4120000
//     },
//     {
//         month : "March",
//         total : 3250000
//     },
//     {
//         month : "May",
//         total : 2725000
//     },
//     {
//         month : "June",
//         total : 3225000
//     },
//     {
//         month : "July",
//         total : 4115000
//     },
//     {
//         month : "August",
//         total : 2500000
//     },
//     {
//         month : "September",
//         total : 3100000
//     },
//     {
//         month : "October",
//         total : 2915000
//     },
//     {
//         month : "November",
//         total : 1975000
//     },
//     {
//         month : "December",
//         total : 3915000
//     }
// ]

export default function sales({ incuredEvents, totalSales }) {
    const { isLoading } = useSelector(state => state.salesState)
    const [salesSummary, setSalesSummary] = useState([])
    const dispatch = useDispatch()
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
        dispatch(fetchSalesSummary()).then(res => {
            const formattedData = res.payload.map(sale => {
                return {...sale, month : moment(sale.month).format('MMMM')}
            })
            setSalesSummary(formattedData)
        })
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
                            {
                                isLoading ? 
                                <div className="flex justify-center">
                                    <BeatLoader color="#9ca3af" loading={ isLoading } size={15} />
                                </div>
                                :
                                <ResponsiveContainer width="100%" height={400}>
                                    <AreaChart 
                                        data={ salesSummary }
                                        style={{
                                            fontSize : '12px'
                                        }}
                                        margin={{
                                            top: 10,
                                            bottom: 5,
                                            left : -20
                                        }}
                                    >
                                        <defs>
                                            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1" >
                                                <stop offset="10%" stopColor="#DB2777" stopOpacity={ 1 } />
                                                <stop offset="90%" stopColor="#DB2777" stopOpacity={ 0.3 } />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid opacity={ 0.3 } vertical={ false } />
                                        <YAxis
                                            strokeWidth={0.5} 
                                            axisLine={ true }
                                            tickLine={ false }
                                            tickFormatter={ number => `₱${number}` }
                                            style={{
                                                fontSize : '10px',
                                            }}
                                        />
                                        <XAxis 
                                            dataKey="month"
                                            strokeWidth={0.5}
                                            axisLine={ true }
                                            tickLine={ false } 
                                            style={{
                                                fontSize : '12px',
                                            }} 
                                        />
                                        <Tooltip content={<CustomToolTip />} />
                                        <Legend />
                                        <Area 
                                            dataKey="total" 
                                            stroke="#f472b6" 
                                            activeDot={{ r: 5 }} 
                                            fill="url(#color)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            }
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

function CustomToolTip({ active, payload, label }) {
    const peso = value => currency(value, { symbol : '₱', precision : 0 })
    if (active) {
        return (
            <div className="bg-white p-2 flex flex-col shadow border-b border-gray-300">
                <h4 className="font-bold">{ label }</h4>
                <p className="text-pink-600">{ peso(payload[0].value).format() }</p>
            </div>
        )
    }
    return null
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