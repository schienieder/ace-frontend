import React, { Fragment, useState, useEffect, useMemo, useRef } from 'react'
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
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import AuthErrorIcon from '../../components/AuthErrorIcon'
import HoursOptions from '../../components/admin/events/HoursOptions'
import MinutesOptions from '../../components/admin/events/MinutesOptions'
import BeatLoader from "react-spinners/BeatLoader"
import CommonTable2 from '../../components/CommonTable2'
import useDarkMode from '../../hooks/useDarkMode'
import AdminMobileNav from '../../components/admin/AdminMobileNav'

export default function interviews({ interviewsList, allInterviews }) {
    const api = process.env.NEXT_PUBLIC_DRF_API
    const { isDarkMode } = useDarkMode()
    const data = useMemo(() => allInterviews, [allInterviews.length])
    const interviewColumns = useMemo(() => [
        {
            Header : 'Client Name',
            accessor : 'client_name'
        },
        {
            Header : 'Location',
            accessor : 'location'
        },
        {
            Header : 'Date',
            accessor : 'date',
            Cell : ({row}) => (
                <p>{ moment(row.original.date).format('LL') }</p>
            )
        },
        {
            Header : 'Time',
            accessor : 'time'
        },
        {
            Header : 'Actions',
            accessor : 'id',
            Cell : ({row}) => (
                <div className="flex gap-x-2">
                    <button
                        type="button"
                        className={`${adminStyles.actionBtn} color-transition`}
                        onClick={ () => openModal(row.index) }
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
                        onClick={ () => destroyInterview(row.original.id) }
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
            )
        },
    ], [])
    const router = useRouter()
    let [isOpen, setIsOpen] = useState(false)
    const editIndex = useRef(0)
    const [isLoading, setIsLoading] = useState(false)
    const { register, reset, handleSubmit, formState : { errors } } = useForm()
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
    const editSchedule = (data) => {
        setIsLoading(true)
        closeModal()
        const jwt_token = Cookies.get('jwt')
        axios({
            method : 'PATCH',
            url : `${api}interview/update/${data.interview_id}`,
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer'+' '+jwt_token
            },
            data : {
                location : data.interview_location,
                date : data.interview_date,
                time : data.interview_hour+':'+data.interview_minute+' '+data.interview_schedule
            }
        }).then(() => {
            reset()
            setIsLoading(false)
            setTimeout(() => 
                Swal.fire({
                    icon : 'success',
                    title: 'Schedule Updated',
                    timer : 3000,
                    text: `Interview schedule has been updated!`,
                    showCloseButton: true,
                    confirmButtonColor: '#DB2777',
                })
            , 500)
            router.push('/admin/interviews')
        }).catch(error => {
            setIsLoading(false)
            setTimeout(() => 
                Swal.fire({
                    icon : 'error',
                    title: 'Schedule Error',
                    timer : 3000,
                    text: error.message,
                    showCloseButton: true,
                    confirmButtonColor: '#DB2777',
                })
            , 500)
        })
    }
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
    const closeModal = () => {
        setIsOpen(false)
    }
    const openModal = (sched_index) => {
        setIsOpen(true)
        reset()
        editIndex.current = sched_index
    }
    return (
        <div className={`${ isDarkMode ? 'dark' : '' } w-full h-screen grid grid-cols-1 md:grid-cols-custom-layout font-mont text-gray-800`}>
            <div className={`absolute z-10 w-full h-full ${isLoading ? 'flex' : 'hidden'} flex-col justify-center items-center bg-white backdrop-filter backdrop-blur-sm`}>
                <BeatLoader 
                    color="#DB2777"
                    size={35} 
                />
                <h4 className="text-base">Processing, please wait</h4>
            </div>
            <SideNav isActive="bookings" />
            {
                showMobileNav ?
                <AdminMobileNav 
                    isActive="bookings"
                    onClick={ () => setShowMobileNav(!showMobileNav) }
                /> 
                : null
            }
            <div className="col-start-1 md:col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav 
                    username={ userName } 
                    onClick={ () => setShowMobileNav(!showMobileNav) }
                />
                <div className="row-start-2 w-full h-full bg-true-100 dark:bg-gray-800">
                    <div className="p-5 md:p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Interview Schedules">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-7 w-7 text-gray-800 dark:text-gray-300"
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </PageHeader>
                        {/* Start of Edit Modal */}
                        <Transition appear show={isOpen} as={Fragment}>
                            <Dialog
                                as="div"
                                className="fixed inset-0 z-20 overflow-y-auto backdrop-filter backdrop-brightness-50"
                                onClose={closeModal}
                            >
                            <div className="min-h-screen px-4 text-center">
                                <Transition.Child
                                    as={Fragment}
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
                                                onClick={closeModal}
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
                                            onSubmit={ handleSubmit(editSchedule) }
                                        >

                                            <h4 className="text-base font-bold">Edit Schedule</h4>

                                            {/* This is for the contact field */}
                                            <div className="flex gap-x-5">

                                                <div className="flex flex-col gap-y-1">
                                                    <label className="inputFieldLabel">Date</label>
                                                    <div className="inputContainer">
                                                    <input
                                                            type="hidden"
                                                            { ...register("interview_id") }
                                                            defaultValue={ interviewsList.results.length ? interviewsList.results[editIndex.current].id : '' }
                                                        />
                                                        <input
                                                            type="date"
                                                            { ...register("interview_date", { required : "This field cannot be empty" }) } 
                                                            className="inputFieldDateTime"
                                                            defaultValue={ interviewsList.results.length ? interviewsList.results[editIndex.current].date : '' }
                                                        />
                                                    </div>
                                                    { 
                                                        errors.interview_date && 
                                                        <div className="flex items-center gap-x-1 text-red-500">
                                                            <AuthErrorIcon />
                                                            <p className="text-xs">{ errors.interview_date.message }</p>
                                                        </div> 
                                                    }
                                                </div>

                                                <div className="flex flex-col gap-y-1">
                                                    <label className="inputFieldLabel">Time</label>
                                                    <div className='w-63 px-4 py-1 flex items-center justify-between bg-transparent gap-x-5 border border-gray-300 focus-within:border-gray-600 rounded-lg'>
                                                        <select 
                                                            className='customTime'
                                                            {...register("interview_hour")}
                                                        >
                                                            <HoursOptions />
                                                        </select>
                                                        <p className='text-sm font-medium text-gray-800 -mx-6'>:</p>
                                                        <select 
                                                            className='customTime'
                                                            {...register("interview_minute")}
                                                        >
                                                            <MinutesOptions />
                                                        </select>
                                                        <select 
                                                            className='customTime'
                                                            {...register("interview_schedule")}
                                                        >
                                                            <option value="AM">AM</option>
                                                            <option value="PM">PM</option>
                                                        </select>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="flex flex-col gap-y-1">
                                                <label className="inputFieldLabel">Location</label>
                                                <textarea 
                                                    className="inputTextArea"
                                                    { ...register("interview_location", { required : "This field cannot be empty" }) }
                                                    defaultValue={ interviewsList.results.length ? interviewsList.results[editIndex.current].location : '' }
                                                ></textarea>
                                                { 
                                                    errors.partner_services && 
                                                    <div className="flex items-center gap-x-1 text-red-500">
                                                        <AuthErrorIcon />
                                                        <p className="text-xs">{ errors.partner_services.message }</p>
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
                                                    onClick={ closeModal }
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
                        {/* End of Edit Modal */}
                        <div className="card w-65 md:w-full overflow-x-auto flex flex-col gap-y-5">
                            <CommonTable2 columns={ interviewColumns } data={ data } cols={5} />
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
    let interviews_copy = data1.results
    for (let i = 0; i < data2.results.length; i++) {
        for (let j = 0; j < data1.results.length; j++) {
            data2.results[i].id === data1.results[j].client ? interviews_copy[j].client_name = data2.results[i].first_name+" "+data2.results[i].last_name : ''
        }
    }
    return {
        props : {
            interviewsList : data1,
            allInterviews : interviews_copy,
        }
    }
}