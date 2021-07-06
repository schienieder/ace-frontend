import React, { Fragment, useEffect, useState } from 'react'
import TopNav from '../../components/admin/TopNav'
import SideNav from '../../components/admin/SideNav'
import Footer from '../../components/admin/Footer'
import PageHeader from '../../components/admin/PageHeader'
import PartnerItem from '../../components/admin/partners/PartnerItem'
import adminStyles from '../../styles/Admin.module.css'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

export default function partners() {
    let [isOpen, setIsOpen] = useState(false)
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
    const closeModal = () => {
        setIsOpen(false)
    }
    
    const openModal = () => {
        setIsOpen(true)
    }
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="partners" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav />
                <div className="row-start-2 w-full h-full bg-gray-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Partners List" />
                        <div className="card w-full flex flex-col gap-y-5">
                            <div className="w-full flex justify-between items-center">
                                <div className={ adminStyles.searchBarContainer }>
                                    <input 
                                        type="text"
                                        className={ adminStyles.searchBarInput }
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
                                <button
                                    type="button" 
                                    onClick={ openModal }
                                    className={ adminStyles.addBtn }
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-5 w-5 text-current" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <p className="text-sm font-bold">New Partner</p>
                                </button>
                                <Transition appear show={isOpen} as={Fragment}>
                                    <Dialog
                                    as="div"
                                    className="fixed inset-0 z-20 overflow-y-auto backdrop-filter backdrop-blur-md"
                                    onClose={closeModal}
                                    >
                                    <div className="min-h-screen px-4 text-center">
                                        <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                        >
                                        <Dialog.Overlay className="fixed inset-0" />
                                        </Transition.Child>

                                        {/* This element is to trick the browser into centering the modal contents. */}
                                        <span
                                        className="inline-block h-screen align-middle"
                                        aria-hidden="true"
                                        >
                                        &#8203;
                                        </span>
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl border-b border-gray-200 rounded-md">
                                            <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                            >
                                            Payment successful
                                            </Dialog.Title>
                                            <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Your payment has been successfully submitted. We’ve sent
                                                your an email with all of the details of your order.
                                            </p>
                                            </div>

                                            <div className="mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                                onClick={closeModal}
                                            >
                                                Got it, thanks!
                                            </button>
                                            </div>
                                        </div>
                                        </Transition.Child>
                                    </div>
                                    </Dialog>
                                </Transition>
                            </div>
                            <table className="min-w-full divide-y divide-gray-200 border-b border-gray-200">
                                <thead className={ adminStyles.theadClass }>
                                    <tr className="text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Name
                                        </th>
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Type of Business
                                        </th>
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Contact Number
                                        </th>
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className={ adminStyles.tbodyClass }>
                                    <PartnerItem name="Rose Garden" operation="Flower & Boquet Gifts Services" number="09456339122" />
                                    <PartnerItem name="Troy Puquiz" operation="Marriage Photo & Video Editor" number="09456339122" />
                                    <PartnerItem name="Venerando Antiporta Jr." operation="Alas Creative Events - Head Coordinator" number="09456339122" />
                                    <PartnerItem name="Rose Garden" operation="Flower & Boquet Gifts Services" number="09456339122" />
                                    <PartnerItem name="Troy Puquiz" operation="Marriage Photo & Video Editor" number="09456339122" />
                                    <PartnerItem name="Venerando Antiporta Jr." operation="Alas Creative Events - Head Coordinator" number="09456339122" />
                                    <PartnerItem name="Rose Garden" operation="Flower & Boquet Gifts Services" number="09456339122" />
                                    <PartnerItem name="Troy Puquiz" operation="Marriage Photo & Video Editor" number="09456339122" />
                                    <PartnerItem name="Venerando Antiporta Jr." operation="Alas Creative Events - Head Coordinator" number="09456339122" />
                                </tbody>
                            </table>
                            <div className="flex gap-x-2 text-sm">
                                <p className="font-normal">Total Partners: </p>
                                <p className="font-bold">20</p>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}