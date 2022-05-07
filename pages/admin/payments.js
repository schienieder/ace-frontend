import React, { useEffect, useState, useMemo } from 'react'
import TopNav from '../../components/admin/TopNav'
import SideNav from '../../components/admin/SideNav'
import Footer from '../../components/Footer'
import PageHeader from '../../components/PageHeader'
import adminStyles from '../../styles/Admin.module.css'
import { useRouter } from 'next/router'
import CommonTable2 from '../../components/CommonTable2'
import moment from 'moment'
import currency from 'currency.js'

export default function clients({ eventTransactions }) {
    const api = process.env.NEXT_PUBLIC_DRF_API
    const peso = value => currency(value, { symbol : '₱', precision : 0 })
    const data = useMemo(() => eventTransactions, [eventTransactions.count])
    const clientColumns = useMemo(() => [
        {
            Header : 'Event Name',
            accessor : 'event_name',
        },
        {
            Header : 'Schedule',
            accessor : 'date_schedule',
            Cell : ({row}) => (
                <p className={ adminStyles.tableDataTextClass }>{ moment(row.original.date_schedule).format('ll') }</p>
            )
        },
        {
            Header : 'Cost',
            accessor : 'package_cost',
            Cell : ({row}) => (
                <p className="text-sm text-gray-800">{ peso(row.original.package_cost).format() }</p>
            )
        },
        {
            Header : 'Payment',
            accessor : 'client_payment',
            Cell : ({row}) => (
                <p className="text-sm text-gray-800">{ peso(row.original.client_payment).format() }</p>
            )
        },
        {
            Header : 'Status',
            accessor : 'payment_status',
            Cell : ({row}) => (
                <p className={row.original.payment_status === 'Partially Paid' ? `text-sm text-yellow-500` : `text-sm text-teal-600` }>{ row.original.payment_status}</p>
            )
        },
        {
            Header : 'Last Update',
            accessor : 'last_update',
            Cell : ({row}) => (
                <p className={ adminStyles.tableDataTextClass }>{ moment(row.original.updated_at).format('ll') }</p>
            )
        },
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
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="reports" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav username={ userName } />
                <div className="row-start-2 w-full h-full bg-true-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Payment Logs">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-7 w-7 text-current"
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </PageHeader>
                        <div className="card w-full flex flex-col gap-y-5">
                            <CommonTable2 columns={ clientColumns } data={ data } cols={6} />
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
    const res = await fetch(`${api}present_transactions/`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data = await res.json()
    return {
        props : {
            eventTransactions : JSON.parse(data)
        }
    }
}