import React, { useState, useEffect } from 'react'
import TopNav from '../../components/admin/TopNav'
import SideNav from '../../components/admin/SideNav'
import Footer from '../../components/Footer'
import PageHeader from '../../components/PageHeader'
import adminStyles from '../../styles/Admin.module.css'
import { useRouter } from 'next/router'
import moment from 'moment'
import Swal from 'sweetalert2'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function interviews({ interviewsList, clientsList }) {
    const api = process.env.NEXT_PUBLIC_DRF_API
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
    const destroyInterview = (interview_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Delete interview schedule?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DB2777',
            cancelButtonColor: '#9CA3AF',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            const jwt_token = Cookies.get('jwt')
            if (result.isConfirmed) {
                axios({
                    method : 'DELETE',
                    url : `${api}interview/destroy/${interview_id}`,
                    headers : {'Authorization' : 'Bearer'+' '+ jwt_token}
                })
                .then(() => {
                    Swal.fire({
                        icon : 'success',
                        title : 'Deleted!',
                        text : 'Interview record has been deleted.',
                        confirmButtonColor: '#DB2777',
                        showCloseButton : true,
                        timer : 2000
                    })
                    router.push('/admin/interviews')
                })
                .catch((error) => {
                    Swal.fire({
                        icon : 'error',
                        title: 'Delete Error',
                        timer : 3000,
                        text: error.message,
                        showCloseButton: true,
                        confirmButtonColor: '#DB2777',
                    })
                })
            }
        })
    }
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="bookings" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav username={ userName } />
                <div className="row-start-2 w-full h-full bg-true-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Interview Schedules">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-7 w-7 text-current"
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </PageHeader>
                        <div className="card w-full flex flex-col gap-y-5">
                        <div className="w-full flex justify-between items-center">
                                <div className="searchBarContainer">
                                    <input 
                                        type="text"
                                        className="searchBarInput"
                                        placeholder="Search Name . . ."
                                    />
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-4 w-4 text-current" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                            <table className="min-w-full divide-y divide-gray-200 border-b border-gray-200">
                                <thead className={ adminStyles.theadClass }>
                                    <tr className="text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Client Name
                                        </th>
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Location
                                        </th>
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Date
                                        </th>
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Time
                                        </th>
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className={ adminStyles.tbodyClass }>
                                    {
                                        interviewsList.results.map((interview, index) => (
                                            <tr 
                                                className={`${adminStyles.tableRowClass} color-transition`}
                                                key={ index }
                                            >
                                                <td className={ adminStyles.tableDataClass }>
                                                    <p className={ adminStyles.tableDataTextClass }>
                                                        {
                                                            clientsList.results.map((client) => {
                                                                if (client.id === interview.client) return client.first_name + ' ' + client.last_name
                                                            })
                                                        }
                                                    </p>
                                                </td>
                                                <td className={ adminStyles.tableDataClass }>
                                                    <p className="text-sm text-gray-800">{ interview.location }</p>
                                                </td>
                                                <td className={ adminStyles.tableDataClass }>
                                                    <p className={ adminStyles.tableDataTextClass }>{ moment(interview.date).format('ll') }</p>
                                                </td>
                                                <td className={ adminStyles.tableDataClass }>
                                                    <p className={ adminStyles.tableDataTextClass }>{ interview.time }</p>
                                                </td>
                                                <td className={ adminStyles.tableDataClass }>
                                                    <div className="flex gap-x-2">
                                                        <button
                                                            type="button"
                                                            className={`${adminStyles.actionBtn} color-transition`}
                                                        >
                                                            <svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                className={ adminStyles.actionBtnIcon } 
                                                                fill="none" 
                                                                viewBox="0 0 24 24" 
                                                                stroke="currentColor"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={`${adminStyles.actionBtn} color-transition`}
                                                            onClick={ () => destroyInterview(interview.id) }
                                                        >
                                                            <svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                className={ adminStyles.actionBtnIcon } 
                                                                fill="none" 
                                                                viewBox="0 0 24 24" 
                                                                stroke="currentColor"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div className="flex gap-x-2 text-sm">
                                <p className="font-normal">Total Interviews: </p>
                                <p className="font-bold">{ interviewsList.count }</p>
                            </div>
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
    const jwt = req.cookies.jwt
    const res1 = await fetch(`${api}interviews_list/`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+jwt}
    })
    const data1 = await res1.json()
    const res2 = await fetch(`${api}clients_list/`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+jwt}
    })
    const data2 = await res2.json()
    return {
        props : {
            interviewsList : data1,
            clientsList : data2
        }
    }
}