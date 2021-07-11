import React, { useEffect } from 'react'
import TopNav from '../../components/partner/TopNav'
import SideNav from '../../components/partner/SideNav'
import Footer from '../../components/partner/Footer'
import partnerStyles from '../../styles/Partner.module.css'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

export default function tasks() {
    const router = useRouter()
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
                response.data.role !== 'partner' ? router.push('/login') : ''
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
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="tasks" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav />
                <div className="row-start-2 w-full h-full bg-gray-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <h4 className="text-xl font-bold">Events & Tasks</h4>
                        <div className="card w-full">
                        <table className="min-w-full divide-y divide-gray-200 border-b border-gray-200">
                            <thead className={ partnerStyles.theadClass }>
                                <tr className="text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    <th scope="col" className={ partnerStyles.tableHeadingClass }>
                                        Event Name
                                    </th>
                                    <th scope="col" className={ partnerStyles.tableHeadingClass }>
                                        Date
                                    </th>
                                    <th scope="col" className={ partnerStyles.tableHeadingClass }>
                                        Venue
                                    </th>
                                    <th scope="col" className={ partnerStyles.tableHeadingClass }>
                                        Task
                                    </th>
                                    <th scope="col" className={ partnerStyles.tableHeadingClass }>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className={ partnerStyles.tbodyClass }>
                                <tr
                                    className={`${partnerStyles.tableRowClass} color-transition`}
                                >
                                    <td className={ partnerStyles.tableDataClass }>
                                        <p className={ partnerStyles.tableDataTextClass }>Gwapo & Tangkag Dream Wedding</p>
                                    </td>
                                    <td className={ partnerStyles.tableDataClass }>
                                        <p className="text-sm text-gray-800">July 19, 2022</p>
                                    </td>
                                    <td className={ partnerStyles.tableDataClass }>
                                        <p className={ partnerStyles.tableDataTextClass }>Big 8 Hotel, Tagum City</p>
                                    </td>
                                    <td className={ partnerStyles.tableDataClass }>
                                        <p className={ partnerStyles.tableDataTextClass }>Taste Testing</p>
                                    </td>
                                    <td className={ partnerStyles.tableDataClass }>
                                        <div className="flex gap-x-2">
                                            <button
                                                type="button"
                                                className={`${partnerStyles.actionBtn} color-transition`}
                                            >
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className={ partnerStyles.actionBtnIcon } 
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                            <button
                                                type="button"
                                                className={`${partnerStyles.actionBtn} color-transition`}
                                                onClick={ () => destroyPartner(partner.id, partner.business_name || partner.first_name + ' ' + partner.last_name) }
                                            >
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className={ partnerStyles.actionBtnIcon } 
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
                            </tbody>
                        </table>
                        <div className="flex gap-x-2 text-sm">
                            <p className="font-normal">Total Requests: </p>
                            <p className="font-bold">9</p>
                        </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
