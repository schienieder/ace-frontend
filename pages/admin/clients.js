import React, { Fragment, useEffect, useState, useMemo } from 'react'
import TopNav from '../../components/admin/TopNav'
import SideNav from '../../components/admin/SideNav'
import Footer from '../../components/Footer'
import PageHeader from '../../components/PageHeader'
import AuthErrorIcon from '../../components/AuthErrorIcon'
import adminStyles from '../../styles/Admin.module.css'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import axios from 'axios'
import CommonTable from '../../components/CommonTable'
import Link from 'next/link'

export default function clients({ clientsList }) {
    const api = process.env.NEXT_PUBLIC_DRF_API
    const data = useMemo(() => clientsList.results, [clientsList.count])
    const clientColumns = useMemo(() => [
        {
            Header : 'Name',
            accessor : 'first_name',
            Cell : ({row}) => (
                <p className={ adminStyles.tableDataTextClass }>{ row.original.first_name +' '+ row.original.last_name }</p>
            )
        },
        {
            Header : 'Address',
            accessor : 'street_address',
            Cell : ({row}) => (
                <p className={ adminStyles.tableDataTextClass }>{ row.original.street_address && row.original.city && row.original.state_province ? `${row.original.street_address}, ${row.original.city}, ${row.original.state_province}` : 'N/A' }</p>
            )
        },
        {
            Header : 'Mobile Number',
            accessor : 'mobile_number'
        },
        {
            Header : 'Actions',
            accessor : 'id',
            Cell : ({row}) => (
                <div className="flex gap-x-2">
                    <Link href={{
                        pathname : '/admin/client',
                        query : { id : row.original.id }
                    }}>
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
                    </Link>
                    <button
                        type="button"
                        className={`${adminStyles.actionBtn} color-transition`}
                        onClick={ () => destroyClient(row.original.id, row.original.first_name, row.original.last_name) }
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
    let [addClientOpen, setAddClientOpen] = useState(false)
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
    const { register, reset, handleSubmit, formState : { errors } } = useForm()
    const addClient = (data) => {
        axios({
            method : "POST",
            url : `${api}register/`,
            headers : {'Content-Type' : 'application/json'},
            data : {
                first_name : data.client_fname,
                last_name : data.client_lname,
                mobile_number : data.client_mobile,
                email : data.client_email,
                username : data.client_uname,
                password : data.client_pass,
                role : "client"
            }
        }).then(() => {
            console.log(data)
            Swal.fire({
                icon : 'success',
                title: 'Regristration Successsful',
                timer : 3000,
                text: `New client successfully added!`,
                showCloseButton: true,
                confirmButtonColor: '#DB2777',
            })
            router.push('/admin/clients')
        }).catch((error) => {
            Swal.fire({
                icon : 'error',
                title: 'Regristration Error',
                timer : 3000,
                text: error.message,
                showCloseButton: true,
                confirmButtonColor: '#DB2777',
            })
        })
        reset()
        setAddClientOpen(false)
    }
    const destroyClient = (client_id, client_fname, client_lname) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Delete records of ${client_fname} ${client_lname}?`,
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
                    url : `${api}client_profile/destroy/${client_id}`,
                    headers : {'Authorization' : 'Bearer'+' '+ jwt_token}
                })
                .then(() => {
                    Swal.fire({
                        icon : 'success',
                        title : 'Deleted!',
                        text : 'Client record has been deleted.',
                        confirmButtonColor: '#DB2777',
                        showCloseButton : true,
                        timer : 2000
                    })
                    router.push('/admin/clients')
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
        setAddClientOpen(false)
    }
    const openAddModal = () => {
        setAddClientOpen(true)
    }
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="clients" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav username={ userName } />
                <div className="row-start-2 w-full h-full bg-true-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Client List">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-7 w-7 text-current" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                            </svg>
                        </PageHeader>
                        <div className="card w-full flex flex-col gap-y-5">
                            <Transition appear show={ addClientOpen } as={ Fragment }>
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
                                                onSubmit={ handleSubmit(addClient) }
                                            >

                                                <h4 className="text-base font-bold">New Client</h4>

                                                {/* This is for the name field */}
                                                <div className="flex flex-col gap-y-2">
                                                    <p className="inputFieldLabel">Name</p>
                                                    <div className="flex gap-x-5">

                                                        <div className="flex flex-col gap-y-1">
                                                            <p className="text-xs">First Name</p>
                                                            <div className="inputContainer">
                                                                <svg 
                                                                    xmlns="http://www.w3.org/2000/svg" 
                                                                    className="inputIcon" 
                                                                    fill="none" 
                                                                    viewBox="0 0 24 24" 
                                                                    stroke="currentColor"
                                                                    >
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                <input
                                                                    type="text"
                                                                    { ...register("client_fname", { required : "This field cannot be empty" }) } 
                                                                    className="inputField"
                                                                />
                                                            </div>
                                                            { 
                                                                errors.client_fname && 
                                                                <div className="flex items-center gap-x-1 text-red-500">
                                                                    <AuthErrorIcon />
                                                                    <p className="text-xs">{ errors.client_fname.message }</p>
                                                                </div> 
                                                            }
                                                        </div>

                                                        <div className="flex flex-col gap-y-1">
                                                            <p className="text-xs">Last Name</p>
                                                            <div className="inputContainer">
                                                                <svg 
                                                                    xmlns="http://www.w3.org/2000/svg" 
                                                                    className="inputIcon" 
                                                                    fill="none" 
                                                                    viewBox="0 0 24 24" 
                                                                    stroke="currentColor"
                                                                    >
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                <input
                                                                    type="text"
                                                                    { ...register("client_lname", { required : "This field cannot be empty" }) } 
                                                                    className="inputField"
                                                                />
                                                            </div>
                                                            { 
                                                                errors.client_lname && 
                                                                <div className="flex items-center gap-x-1 text-red-500">
                                                                    <AuthErrorIcon />
                                                                    <p className="text-xs">{ errors.client_lname.message }</p>
                                                                </div> 
                                                            }
                                                        </div>

                                                    </div>
                                                </div>

                                                {/* This is for the contact field */}
                                                <div className="flex flex-col gap-y-2">
                                                    <p className="inputFieldLabel">Contact</p>
                                                    <div className="flex gap-x-5">

                                                        <div className="flex flex-col gap-y-1">
                                                            <p className="text-xs">Mobile Number</p>
                                                            <div className="inputContainer">
                                                                <svg 
                                                                    xmlns="http://www.w3.org/2000/svg" 
                                                                    className="inputIcon" 
                                                                    fill="none" 
                                                                    viewBox="0 0 24 24" 
                                                                    stroke="currentColor"
                                                                >
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                                </svg>
                                                                <input
                                                                    type="number"
                                                                    { ...register("client_mobile", { required : "This field cannot be empty" }) } 
                                                                    className="inputField"
                                                                />
                                                            </div>
                                                            { 
                                                                errors.client_mobile && 
                                                                <div className="flex items-center gap-x-1 text-red-500">
                                                                    <AuthErrorIcon />
                                                                    <p className="text-xs">{ errors.client_mobile.message }</p>
                                                                </div> 
                                                            }
                                                        </div>

                                                        <div className="flex flex-col gap-y-1">
                                                            <p className="text-xs">Email Address</p>
                                                            <div className="inputContainer">
                                                                <svg 
                                                                    xmlns="http://www.w3.org/2000/svg" 
                                                                    className="inputIcon" 
                                                                    fill="none" 
                                                                    viewBox="0 0 24 24" 
                                                                    stroke="currentColor"
                                                                >
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                                </svg>
                                                                <input
                                                                    type="text"
                                                                    { ...register("client_email", { required : "This field cannot be empty" }) } 
                                                                    className="inputField"
                                                                    autoComplete="off"
                                                                />
                                                            </div>
                                                            { 
                                                                errors.client_email && 
                                                                <div className="flex items-center gap-x-1 text-red-500">
                                                                    <AuthErrorIcon />
                                                                    <p className="text-xs">{ errors.client_email.message }</p>
                                                                </div> 
                                                            }
                                                        </div>

                                                    </div>
                                                </div>

                                                {/* This is for the account fields */}
                                                <div className="flex gap-x-5">

                                                    <div className="flex flex-col gap-y-1">
                                                        <label className="inputFieldLabel">Username</label>
                                                        <div className="inputContainer">
                                                            <svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                className="inputIcon" 
                                                                fill="none" 
                                                                viewBox="0 0 24 24" 
                                                                stroke="currentColor"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                            </svg>
                                                            <input
                                                                type="text"
                                                                { ...register("client_uname", { required : "This field cannot be empty" }) } 
                                                                className="inputField"
                                                            />
                                                        </div>
                                                        { 
                                                            errors.client_uname && 
                                                            <div className="flex items-center gap-x-1 text-red-500">
                                                                <AuthErrorIcon />
                                                                <p className="text-xs">{ errors.client_uname.message }</p>
                                                            </div> 
                                                        }
                                                    </div>

                                                    <div className="flex flex-col gap-y-1">
                                                        <label className="inputFieldLabel">Password</label>
                                                        <div className="inputContainer">
                                                            <svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                className="inputIcon" 
                                                                fill="none" 
                                                                viewBox="0 0 24 24" 
                                                                stroke="currentColor"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                            </svg>
                                                            <input
                                                                type="password"
                                                                { ...register("client_pass", { required : "This field cannot be empty" }) } 
                                                                className="inputField"
                                                            />
                                                        </div>
                                                        { 
                                                            errors.client_pass && 
                                                            <div className="flex items-center gap-x-1 text-red-500">
                                                                <AuthErrorIcon />
                                                                <p className="text-xs">{ errors.client_pass.message }</p>
                                                            </div> 
                                                        }
                                                    </div>

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
                            <CommonTable columns={ clientColumns } data={ data } onClick={ openAddModal } btnText="New Client" />
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
    const res = await fetch(`${api}clients_list/`,{
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data = await res.json()
    return {
        props : {
            clientsList : data
        }
    }
}