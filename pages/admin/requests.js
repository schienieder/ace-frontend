import React, { Fragment, useState, useEffect, useMemo } from 'react'
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
import CommonTable from '../../components/CommonTable'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPartners } from '../../redux/partners/partners.slice'
import { fetchEventsList } from '../../redux/events/events.slice'
import MultiSelect from '../../components/MultiSelect'
import useDarkMode from '../../hooks/useDarkMode'
import AdminMobileNav from '../../components/admin/AdminMobileNav'

// const colourOptions = [
//     { value: "ocean1", label: "Ocean" },
//     { value: "blue", label: "Blue" },
//     { value: "purple", label: "Purple" },
//     { value: "red", label: "Red" },
//     { value: "orange", label: "Orange" },
//     { value: "yellow", label: "Yellow" },
//     { value: "green", label: "Green" },
//     { value: "forest", label: "Forest" },
//     { value: "slate", label: "Slate" },
//     { value: "silver", label: "Silver" }
// ];

export default function reports({ affiliationsList }) {
    const api = process.env.NEXT_PUBLIC_DRF_API
    const dispatch = useDispatch()
    const { isDarkMode } = useDarkMode()
    const data = useMemo(() => affiliationsList, [affiliationsList.length])
    const requestColumns = useMemo(() => [
        {
            Header : 'Event Name',
            accessor : 'event__event_name'
        },
        {
            Header : 'Partner',
            accessor : row => `${row.partner__first_name} ${row.partner__last_name}`,
            Cell : ({ row }) => (
                <div className="dark:text-gray-300">
                    {`${row.original.partner__first_name} ${row.original.partner__last_name}`}
                </div>
            )
        },
        {
            Header : 'Status',
            accessor : 'status',
            Cell : ({ row }) => (
                <div>
                    {
                        row.original.status === 'Accepted' &&
                        <p className="capitalize text-sm text-teal-600">{ row.original.status }</p>
                    }
                    {
                        row.original.status === 'Pending' &&
                        <p className="capitalize text-sm text-yellow-500">{ row.original.status }</p>
                    }
                    {
                        row.original.status === 'Declined' &&
                        <p className="capitalize text-sm text-red-500">{ row.original.status }</p>
                    }
                </div>
            )
        },
        {
            Header : 'Actions',
            accessor : 'id',
            Cell : ({row}) => (
                <div className="flex gap-x-2">
                    <button
                        type="button"
                        className={`${adminStyles.actionBtn} color-transition`}
                        onClick={ () => destroyRequest(row.original.id) }
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
    const [userName, setUsername] = useState()
    const [showMobileNav, setShowMobileNav] = useState(false)
    const [addRequestOpen, setAddRequestOpen] = useState(false)
    const [selectedPartners, setSelectedPartners] = useState([])
    const [noPartners, setNoPartners] = useState(false)
    const [noEvent, setNoEvent] = useState(false)
    const { register, reset, handleSubmit, formState : { errors } } = useForm()
    const { partners, isLoading : isLoadingPartner } = useSelector(state => state.partnersState)
    const { events, isLoading : isLoadingEvent } = useSelector(state => state.eventsState)
    const readRole = () => {
        setUsername(localStorage.getItem('username'))
        const role = localStorage.getItem('role')
        if (role !== 'admin') {
            router.push('/login')
        }
    }
    useEffect(() => {
        dispatch(fetchPartners())
        dispatch(fetchEventsList())
        readRole()
    }, [])
    const addRequest = (data) => {
        if (!selectedPartners.length || !data.request_event.length) {
            !selectedPartners.length ? setNoPartners(true) : setNoPartners(false)
            !data.request_event.length ? setNoEvent(true) : setNoEvent(false)
            return
        }
        else {
            setNoPartners(false)
            setNoEvent(false)
            selectedPartners[0].value === '*' ? selectedPartners.shift() : null
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
                    partners : selectedPartners
                }
            }).then(() => {
                reset()
                setSelectedPartners([])
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
            setAddRequestOpen(false)
        }
    }
    const destroyRequest = (request_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Delete affiliation request?`,
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
                    url : `${api}request/destroy/${request_id}`,
                    headers : {'Authorization' : 'Bearer'+' '+ jwt_token}
                })
                .then(() => {
                    Swal.fire({
                        icon : 'success',
                        title : 'Deleted!',
                        text : 'Affiliation request has been deleted.',
                        confirmButtonColor: '#DB2777',
                        showCloseButton : true,
                        timer : 2000
                    })
                    router.push('/admin/requests')
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
    const closeAddModal = () => {
        setSelectedPartners([])
        setAddRequestOpen(false)
        setNoPartners(false)
        setNoEvent(false)
    }
    const openAddModal = () => {
        setAddRequestOpen(true)
    }
    const handleChange = (val) => {
        setSelectedPartners(val)
    }
    return (
        <div className={`${ isDarkMode ? 'dark' : '' } w-full h-screen grid grid-cols-1 md:grid-cols-custom-layout font-mont text-gray-800`}>
            <SideNav isActive="partners" />
            {
                showMobileNav ?
                <AdminMobileNav 
                    isActive="partners"
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
                        <PageHeader text="Affiliation Requests">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="w-7 h-7 text-gray-800 dark:text-gray-300"
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </PageHeader>
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
                                <div className="inline-block w-80 md:w-client-profile-form-container my-8 p-5 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl border-b border-gray-200 rounded-xl">
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

                                            <div className="flex flex-col gap-y-1">
                                                <label className="inputFieldLabel">Event Name</label>
                                                <select
                                                    className="requestSelect rounded-lg"
                                                    {...register("request_event")}
                                                >
                                                    {
                                                        isLoadingEvent ? null :
                                                        events.map((event) => (
                                                            <option 
                                                                key={ event.id }
                                                                value={ event.id }
                                                            >{ event.event_name }</option>
                                                        ))
                                                    }
                                                </select>
                                                { 
                                                    noEvent && 
                                                    <div className="flex items-center gap-x-1 text-red-500">
                                                        <AuthErrorIcon />
                                                        <p className="text-xs">This field cannot be empty</p>
                                                    </div> 
                                                }
                                            </div>

                                            <div className="flex flex-col gap-y-1">
                                                <label className="inputFieldLabel">Partner Name</label>
                                                <MultiSelect 
                                                    options={ partners } 
                                                    changeHandler={ handleChange }
                                                    selectedPartners={ selectedPartners }
                                                />
                                                { 
                                                    noPartners && 
                                                    <div className="flex items-center gap-x-1 text-red-500">
                                                        <AuthErrorIcon />
                                                        <p className="text-xs">This field cannot be empty</p>
                                                    </div> 
                                                }
                                            </div>

                                            {/* <div className="flex gap-x-5">

                                                <div className="flex flex-col gap-y-1">
                                                    <label className="inputFieldLabel">Event Name</label>
                                                    <select
                                                        className="inputSelect rounded-lg"
                                                        {...register("request_event")}
                                                    >
                                                        {
                                                            isLoadingEvent ? null :
                                                            events.map((event) => (
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
                                                            isLoadingPartner ? null :
                                                            partners.map((partner) => (
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
                                            </div> */}

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
                        <div className="card w-65 md:w-full overflow-x-auto flex flex-col gap-y-5">
                            <CommonTable columns={ requestColumns } data={ data } onClick={ openAddModal } btnText="New Request" cols={4} />
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
    const res = await fetch(`${api}affiliations_list/`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data = await res.json()
    return {
        props : {
            affiliationsList : JSON.parse(data),
        }
    }
}