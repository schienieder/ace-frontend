import React, { Fragment, useState, useEffect } from 'react'
import TopNav from '../../components/admin/TopNav'
import SideNav from '../../components/admin/SideNav'
import Footer from '../../components/Footer'
import PageHeader from '../../components/PageHeader'
import adminStyles from '../../styles/Admin.module.css'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import AuthErrorIcon from '../../components/AuthErrorIcon'

export default function reports({ affiliationsList, eventsList, partnersList }) {
    const api = process.env.NEXT_PUBLIC_DRF_API
    const router = useRouter()
    const [userName, setUsername] = useState()
    const [addRequestOpen, setAddRequestOpen] = useState(false)
    const { register, reset, handleSubmit, formState : { errors } } = useForm()
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
    const addRequest = (data) => {
        console.log(data)
        const jwt_token = Cookies.get('jwt')
        axios({
            method : "POST",
            url : `${api}add_affiliation/`,
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer'+' '+jwt_token
            },
            data : {
                event : data.request_event,
                partner : data.request_partner,
                task : data.request_task,
            }
        }).then(() => {
            console.log(data)
            Swal.fire({
                icon : 'success',
                title: 'Request Successsful',
                timer : 3000,
                text: `New request successfully added!`,
                showCloseButton: true,
                confirmButtonColor: '#DB2777',
            })
            router.push('/admin/requests')
        }).catch((error) => {
            Swal.fire({
                icon : 'error',
                title: 'Request Error',
                timer : 3000,
                text: error.message,
                showCloseButton: true,
                confirmButtonColor: '#DB2777',
            })
        })
        reset()
        setAddRequestOpen(false)
    }
    const closeAddModal = () => {
        setAddRequestOpen(false)
    }
    const openAddModal = () => {
        setAddRequestOpen(true)
    }
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="partners" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav username={ userName } />
                <div className="row-start-2 w-full h-full bg-true-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Affiliation Requests">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="w-7 h-7 text-current"
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
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
                                <button
                                    type="button" 
                                    className={ adminStyles.addBtn }
                                    onClick={ openAddModal }
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
                                    <p className="text-sm font-bold">New Request</p>
                                </button>
                                <Transition appear show={ addRequestOpen } as={ Fragment }>
                                    <Dialog
                                        as="div"
                                        className="fixed inset-0 z-20 overflow-y-auto backdrop-filter backdrop-brightness-50"
                                        onClose={ closeAddModal }
                                    >
                                    <div className="min-h-screen px-4 text-center">
                                        <Transition.Child
                                            as={ Fragment }
                                            enter="transform transition duration-[150ms]"
                                            enterFrom="scale-50"
                                            enterTo="scale-100"
                                            leave="transform transition duration-[150ms]"
                                            leaveFrom="scale-100"
                                            leaveTo="scale-50"
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
                                        <div className="inline-block w-client-profile-form-container my-8 p-5 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl border-b border-gray-200 rounded-xl">
                                            <div className="p-5 border border-gray-300 rounded-xl">
                                                
                                                <div className="w-full flex justify-end">
                                                    <button
                                                        type="button"
                                                        className="p-2 text-sm font-medium text-gray-400 hover:text-gray-600 color-transition bg-transparent focus:outline-none rounded-full"
                                                        onClick={ closeAddModal }
                                                    >
                                                        <svg 
                                                            xmlns="http://www.w3.org/2000/svg" 
                                                            className="h-5 w-5" 
                                                            fill="none" 
                                                            viewBox="0 0 24 24" 
                                                            stroke="currentColor"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                
                                                <form 
                                                    className="flex flex-col items-center gap-y-6"
                                                    onSubmit={ handleSubmit(addRequest) }
                                                >

                                                    <h4 className="text-base font-bold">New Request</h4>

                                                    <div className="flex gap-x-5">

                                                        <div className="flex flex-col gap-y-1">
                                                            <label className="inputFieldLabel">Event Name</label>
                                                            <select
                                                                className="inputSelect rounded-lg"
                                                                {...register("request_event")}
                                                            >
                                                                {
                                                                    eventsList.results.map((event) => (
                                                                        <option 
                                                                            key={ event.id }
                                                                            value={ event.id }
                                                                        >{ event.event_name }</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>

                                                        <div className="flex flex-col gap-y-1">
                                                            <label className="inputFieldLabel">Partner Name</label>
                                                            <select
                                                                className="inputSelect rounded-lg"
                                                                {...register("request_partner")}
                                                            >
                                                                {
                                                                    partnersList.results.map((partner) => (
                                                                        <option 
                                                                            key={ partner.id }
                                                                            value={ partner.id }
                                                                        >{ partner.first_name+' '+partner.last_name }</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>

                                                    </div>

                                                    <div className="flex flex-col gap-y-1">
                                                        <label className="inputFieldLabel">Task</label>
                                                        <textarea 
                                                            className="inputTextArea"
                                                            { ...register("request_task", { required : "This field cannot be empty" }) }
                                                        ></textarea>
                                                        { 
                                                            errors.request_task && 
                                                            <div className="flex items-center gap-x-1 text-red-500">
                                                                <AuthErrorIcon />
                                                                <p className="text-xs">{ errors.request_task.message }</p>
                                                            </div> 
                                                        }
                                                    </div>

                                                    <div className="w-full pr-2 mt-5 flex justify-end gap-x-3">
                                                        <button 
                                                            className="modalAddBtn color-transition"
                                                        >
                                                            <p className="btnText">Save</p>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="modalCloseBtn color-transition"
                                                            onClick={ closeAddModal }
                                                        >
                                                            <p className="btnText">Close</p>
                                                        </button>
                                                    </div>

                                                </form>

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
                                            Event
                                        </th>
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Partner
                                        </th>
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Task
                                        </th>
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Status
                                        </th>
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className={ adminStyles.tbodyClass }>
                                    {
                                        affiliationsList.results.map((request) => (
                                            <tr 
                                                className={`${adminStyles.tableRowClass} color-transition`}
                                                key={request.id}
                                            >
                                                <td className={ adminStyles.tableDataClass }>
                                                    <p className={ adminStyles.tableDataTextClass }>
                                                        {
                                                            eventsList.results.map((event) => {
                                                                if (event.id === request.event) {
                                                                    return event.event_name
                                                                }
                                                            })
                                                        }
                                                    </p>
                                                </td>
                                                <td className={ adminStyles.tableDataClass }>
                                                    <p className="text-sm text-gray-800">
                                                        {
                                                            partnersList.results.map((partner) => {
                                                                if (partner.id === request.partner) {
                                                                    return partner.business_name
                                                                }
                                                            })
                                                        }
                                                    </p>
                                                </td>
                                                <td className={ adminStyles.tableDataClass }>
                                                    <p className={ adminStyles.tableDataTextClass }>{ request.task }</p>
                                                </td>
                                                <td className={ adminStyles.tableDataClass }>
                                                    {
                                                        request.status === 'Accepted' &&
                                                        <p className="capitalize text-sm text-teal-600">{ request.status }</p>
                                                    }
                                                    {
                                                        request.status === 'Pending' &&
                                                        <p className="capitalize text-sm text-yellow-500">{ request.status }</p>
                                                    }
                                                    {
                                                        request.status === 'Declined' &&
                                                        <p className="capitalize text-sm text-red-500">{ request.status }</p>
                                                    }
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
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </button>
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
                                <p className="font-normal">Total Requests: </p>
                                <p className="font-bold">{ affiliationsList.count }</p>
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
    const token = req.cookies.jwt
    const res1 = await fetch(`${api}affiliations_list/`,{
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data1 = await res1.json()
    const res2 = await fetch(`${api}partners_list/`,{
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data2 = await res2.json()
    const res3 = await fetch(`${api}events_list/`,{
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data3 = await res3.json()
    return {
        props : {
            affiliationsList : data1,
            partnersList : data2,
            eventsList : data3
        }
    }
}