import React, { useState, useEffect, useMemo } from 'react'
import TopNav from '../../components/admin/TopNav'
import SideNav from '../../components/admin/SideNav'
import Footer from '../../components/Footer'
import PageHeader from '../../components/PageHeader'
import SalesTable from '../../components/SalesTable'
import HistoryTable from '../../components/HistoryTable'
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
import { fetchSalesSummary, fetchSalesYears, fetchTotalSales, changeSelectedYear } from '../../redux/sales/sales.slice'
import { fetchPastTransactions } from '../../redux/transactions/transactions.slice'
import BeatLoader from 'react-spinners/BeatLoader'
import useDarkMode from '../../hooks/useDarkMode'
import AdminMobileNav from '../../components/admin/AdminMobileNav'

const SalesMain = () => {
    const { isDarkMode } = useDarkMode()
    const { isLoading, salesYears, yearSelected, totalSales } = useSelector(state => state.salesState)
    const { pastTransactions } = useSelector(state => state.transactionState)
    const [salesSummary, setSalesSummary] = useState([])
    const dispatch = useDispatch()
    const peso = value => currency(value, { symbol : '₱', precision : 0 })
    const table_data = useMemo(() => pastTransactions, [pastTransactions.length, dispatch])
    const eventsColumns = useMemo(() => [
        {
            Header : 'Event Name',
            accessor : 'event_name'
        },
        {
            Header : 'Schedule',
            accessor : 'event_schedule',
            Cell : ({row}) => (
                <p className="text-sm text-gray-800 dark:text-gray-300">{ moment(row.original.event_schedule).format('ll') }</p>
            )
        },
        {
            Header : 'Package Cost',
            accessor : 'package_cost',
            Cell : ({row}) => (
                <p className="text-sm text-gray-800 dark:text-gray-300">{ peso(row.original.package_cost).format() }</p>
            )
        },
        {
            Header : 'Total Payment',
            accessor : 'client_payment',
            Cell : ({row}) => (
                <p className="text-sm text-gray-800 dark:text-gray-300">{ peso(row.original.client_payment).format() }</p>
            )
        },
        {
            Header : 'Last Update',
            accessor : 'last_update',
            Cell : ({row}) => (
                <p className="text-sm text-gray-800 dark:text-gray-300">{ moment(row.original.event_schedule).format('ll') }</p>
            )
        },
        {
            Header : 'Status',
            accessor : 'payment_status',
            Cell : ({row}) => (
                <p className={row.original.payment_status === 'Partially Paid' ? `text-sm text-yellow-500` : `text-sm text-teal-600` }>{ row.original.payment_status}</p>
            )
        },
    ], [])
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
    useEffect(() => {
        const dateToday = new Date()
        dispatch(fetchSalesSummary(dateToday.getFullYear())).then(res => {
            const formattedData = res.payload.map(sale => {
                return {...sale, month : moment(sale.month).format('MMMM')}
            })
            setSalesSummary(formattedData)
        })
        dispatch(fetchSalesYears())
        dispatch(fetchTotalSales(dateToday.getFullYear()))
        dispatch(fetchPastTransactions(dateToday.getFullYear()))
    }, [dispatch])
    const options = {
        useKeysAsHeaders: true,
        filename : 'Sales Reports'
    }
    const csvExporter = new ExportToCsv(options);
    const exportData = () => {
        // incuredEvents.forEach((event) => {
        //     event.date_schedule = moment(event.date_schedule).format('ll')
        //     delete event.id
        //     delete event.venue_location
        //     delete event.venue_name
        //     delete event.venue_lat
        //     delete event.venue_long
        //     delete event.client_payment
        //     delete event.payment_status
        //     delete event.time_schedule
        //     delete event.created_at
        //     delete event.updated_at
        //     delete event.client
        // })
        const csvTransaction = pastTransactions.map((val) => {
            return {
                event_name : val.event_name,
                schedule : moment(val.event_schedule).format('ll'),
                package_cost : val.package_cost,
                total_payment : val.client_payment,
                last_update : moment(val.last_update).format('ll'),
                status : val.payment_status
            }
        })
        csvExporter.generateCsv(csvTransaction);
    }
    const handleYearChange = (year) => {
        dispatch(changeSelectedYear(year))
        dispatch(fetchSalesSummary(year)).then(res => {
            const formattedData = res.payload.map(sale => {
                return {...sale, month : moment(sale.month).format('MMMM')}
            })
            setSalesSummary(formattedData)
        })
        dispatch(fetchTotalSales(year))
        dispatch(fetchPastTransactions(year))
    }
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
                        <div className="flex justify-between items-center">
                            <PageHeader text={`Sales Report (${yearSelected})`}>
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-7 w-7 text-gray-800 dark:text-gray-300" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </PageHeader>
                            <div className="searchBarContainer">
                                <select 
                                    className="searchBarInput dark:bg-gray-800 dark:text-gray-300"
                                    onChange={ e => handleYearChange(e.target.value) }
                                    defaultValue={ yearSelected }
                                >
                                    {
                                        salesYears.map(syear => (
                                            <option 
                                                key={ syear.transaction_year }
                                                value={ syear.transaction_year }
                                            >{ syear.transaction_year }</option>
                                        ))
                                    }
                                    {/* <option value={2021}>2021</option>
                                    <option value={2020}>2020</option> */}
                                </select>
                            </div>
                        </div>
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
                        {/* <div className="card w-full flex flex-col gap-y-5">
                            <SalesTable 
                                columns={ eventsColumns } 
                                data={ table_data } 
                                onClick={ exportData } 
                                btnText="Export Data" 
                                totalSales={ totalSales }
                            />
                        </div> */}
                        <div className="card w-65 md:w-full overflow-x-auto flex flex-col gap-y-5">
                            <HistoryTable 
                                columns={ eventsColumns } 
                                data={ table_data }
                                onClick={ exportData } 
                                btnText="Export Data" 
                                totalSales={ totalSales }
                            />                
                        </div>
                        {/* <div className="card w-full flex flex-col gap-y-5">
                            <h4 className="text-base font-bold dark:text-gray-300">Transaction History</h4>
                        </div> */}
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

function CustomToolTip({ active, payload, label }) {
    const peso = value => currency(value, { symbol : '₱', precision : 0 })
    if (active && payload) {
        return (
            <div className="bg-white p-2 flex flex-col shadow border-b border-gray-300">
                <h4 className="font-bold">{ label }</h4>
                <p className="text-pink-600">{ peso(payload[0].value).format() }</p>
            </div>
        )
    }
    return null
}

export default SalesMain