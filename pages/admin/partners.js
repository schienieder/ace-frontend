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
import debounce from 'debounce'
import useDarkMode from '../../hooks/useDarkMode'
import AdminMobileNav from '../../components/admin/AdminMobileNav'

export default function partners({ partnersList }) {
    const api = process.env.NEXT_PUBLIC_DRF_API
    const { isDarkMode } = useDarkMode()
    const data = useMemo(() => partnersList.results, [partnersList.count])
    const partnerColumns = useMemo(() => [
        {
            Header : 'Name',
            accessor : row => `${row.first_name} ${row.last_name}`,
            Cell : ({row}) => (
                <p className={`${adminStyles.tableDataTextClass} text-gray-800 dark:text-gray-300`}>
                {  row.original.first_name +' '+ row.original.last_name }
                </p>
            )
        },
        {
            Header : 'Role',
            accessor : 'business_name',
            Cell : ({row}) => (
                <p className="text-sm text-gray-800 dark:text-gray-300">{ row.original.business_name || 'N/A' }</p>
            )
        },
        {
            Header : 'Contact Number',
            accessor : 'mobile_number'
        },
        {
            Header : 'Actions',
            accessor : 'id',
            Cell : ({row}) => (
                <div className="flex gap-x-2">
                    <Link href={{
                        pathname : '/admin/partner',
                        query : { id : row.original.id }
                    }} >
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
                        onClick={ () => destroyPartner(row.original.id, row.original.business_name || row.original.first_name + ' ' + row.original.last_name) }
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
        }
    ], [])
    let [isOpen, setIsOpen] = useState(false)
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
    const { register, reset, handleSubmit, formState : { errors }, setError } = useForm()
    const [showPassword, setShowPassword] = useState(false)
    const [hasErrors, setHasErrors] = useState({
        mobile : '',
        email : '',
        username : ''
    })
    const addPartner = (data) => {
        axios({
            method : "POST",
            url : `${api}register/`,
            headers : {'Content-Type' : 'application/json'},
            data : {
                first_name : data.partner_fname,
                last_name : data.partner_lname,
                mobile_number : data.partner_mobile,
                email : data.partner_email,
                username : data.partner_uname,
                password : data.partner_pass,
                role : "partner"
            }
        }).then((response) => {
            if (response.status === 200) {
                reset()
                setIsOpen(false)
                Swal.fire({
                    icon : 'success',
                    title: 'Regristration Successsful',
                    timer : 3000,
                    text: `New business partner successfully added!`,
                    showCloseButton: true,
                    confirmButtonColor: '#DB2777',
                })
                router.push('/admin/partners')
            }
        }).catch((error) => {
            if (hasErrors.mobile.length) {
                setError("partner_mobile", {
                    type : "manual",
                    message : hasErrors.mobile
                })
            }
            if (hasErrors.email.length) {
                setError("partner_email", {
                    type : "manual",
                    message : hasErrors.email
                })
            }
            if (hasErrors.username.length) {
                setError("partner_uname", {
                    type : "manual",
                    message : hasErrors.username
                })
            }
            if (error.response.status > 404) {
                setIsOpen(false)
                Swal.fire({
                    icon : 'error',
                    title: 'Regristration Error',
                    timer : 3000,
                    text: error.message,
                    showCloseButton: true,
                    confirmButtonColor: '#DB2777',
                })
            }
            console.log('Request failed with error: ', error)
        })
    }
    const destroyPartner = (partner_id, partner_name) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Delete records of ${partner_name}?`,
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
                    url : `${api}partner_profile/destroy/${partner_id}`,
                    headers : {'Authorization' : 'Bearer'+' '+ jwt_token}
                })
                .then(() => {
                    Swal.fire({
                        icon : 'success',
                        title : 'Deleted!',
                        text : 'Business partner record has been deleted.',
                        confirmButtonColor: '#DB2777',
                        showCloseButton : true,
                        timer : 2000
                    })
                    router.push('/admin/partners')
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
    const openModal = () => {
        setIsOpen(true)
    }
    return (
        <div className={`${isDarkMode ? 'dark' : ''} w-full h-screen grid grid-cols-1 md:grid-cols-custom-layout font-mont text-gray-800`}>
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
                        <PageHeader text="Partner List">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="w-7 h-7 text-gray-800 dark:text-gray-300"
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </PageHeader>
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
                                <div className="inline-block w-80 md:w-client-profile-form-container my-8 p-5 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl border-b border-gray-200 rounded-xl">
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
                                            onSubmit={ handleSubmit(addPartner) }
                                        >

                                            <h4 className="text-sm md:text-base font-bold tracking-wide">New Business Partner</h4>

                                            {/* This is for the name field */}
                                            <div className="flex flex-col gap-y-2">
                                                <p className="inputFieldLabel">Name</p>
                                                <div className="flex flex-col md:flex-row gap-y-5 gap-x-5">

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
                                                                { ...register("partner_fname", { required : "This field cannot be empty" }) } 
                                                                className="inputField"
                                                            />
                                                        </div>
                                                        { 
                                                            errors.partner_fname && 
                                                            <div className="flex items-center gap-x-1 text-red-500">
                                                                <AuthErrorIcon />
                                                                <p className="text-xs">{ errors.partner_fname.message }</p>
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
                                                                { ...register("partner_lname", { required : "This field cannot be empty" }) } 
                                                                className="inputField"
                                                            />
                                                        </div>
                                                        { 
                                                            errors.partner_lname && 
                                                            <div className="flex items-center gap-x-1 text-red-500">
                                                                <AuthErrorIcon />
                                                                <p className="text-xs">{ errors.partner_lname.message }</p>
                                                            </div> 
                                                        }
                                                    </div>

                                                </div>
                                            </div>

                                            {/* This is for the contact field */}
                                            <div className="flex flex-col gap-y-2">
                                                <p className="inputFieldLabel">Contact</p>
                                                <div className="flex flex-col md:flex-row gap-y-5 gap-x-5">

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
                                                                { 
                                                                    ...register("partner_mobile", 
                                                                    { 
                                                                        required : "This field cannot be empty",
                                                                        minLength : { value : 11, message : "Must have 11 digit numbers!" },
                                                                        maxLength : { value : 11, message : "Must have 11 digit numbers!" },
                                                                        validate : debounce(async (value) => {
                                                                            try {
                                                                                const mobileExist = await axios.get(`${api}partner_mobile/${value}`)
                                                                                if (mobileExist.status === 200) {
                                                                                    setHasErrors({...hasErrors, mobile : 'Mobile number already used!'})
                                                                                    return false
                                                                                }
                                                                            }
                                                                            catch(e) {
                                                                                setHasErrors({...hasErrors, mobile : ''})
                                                                                return true
                                                                            }
                                                                        }, 500) 
                                                                    }) 
                                                                } 
                                                                className="inputField"
                                                            />
                                                        </div>
                                                        { 
                                                            errors.partner_mobile && 
                                                            <div className="flex items-center gap-x-1 text-red-500">
                                                                <AuthErrorIcon />
                                                                <p className="text-xs">{ errors.partner_mobile.message }</p>
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
                                                                type="email"
                                                                { 
                                                                    ...register("partner_email", 
                                                                    { 
                                                                        required : "This field cannot be empty",
                                                                        validate : debounce(async (value) => {
                                                                            try {
                                                                                const emailExist = await axios.get(`${api}partner_email/${value}`)
                                                                                if (emailExist.status === 200) {
                                                                                    setHasErrors({...hasErrors, email : 'Email already used!'})
                                                                                    return false
                                                                                }
                                                                            }
                                                                            catch(e) {
                                                                                setHasErrors({...hasErrors, email : ''})
                                                                                return true
                                                                            }
                                                                        }, 500)  
                                                                    }) 
                                                                } 
                                                                className="inputField"
                                                                autoComplete="off"
                                                            />
                                                        </div>
                                                        { 
                                                            errors.partner_email && 
                                                            <div className="flex items-center gap-x-1 text-red-500">
                                                                <AuthErrorIcon />
                                                                <p className="text-xs">{ errors.partner_email.message }</p>
                                                            </div> 
                                                        }
                                                    </div>

                                                </div>
                                            </div>

                                            {/* This is for the account fields */}
                                            <div className="w-50 md:w-full flex flex-col md:flex-row gap-y-5 gap-x-5">

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
                                                            { 
                                                                ...register("partner_uname", 
                                                                { 
                                                                    required : "This field cannot be empty",
                                                                    validate : debounce(async (value) => {
                                                                        try {
                                                                            const usernameExist = await axios.get(`${api}check_username/${value}`)
                                                                            if (usernameExist.status === 200) {
                                                                                setHasErrors({...hasErrors, username : 'Username already exist!'})
                                                                                return false
                                                                            }
                                                                        }
                                                                        catch(e) {
                                                                            setHasErrors({...hasErrors, username : ''})
                                                                            return true
                                                                        }
                                                                    }, 500)
                                                                }) 
                                                            } 
                                                            className="inputField"
                                                        />
                                                    </div>
                                                    { 
                                                        errors.partner_uname && 
                                                        <div className="flex items-center gap-x-1 text-red-500">
                                                            <AuthErrorIcon />
                                                            <p className="text-xs">{ errors.partner_uname.message }</p>
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
                                                            type={ showPassword ? "text" : "password" }
                                                            { ...register("partner_pass", { required : "This field cannot be empty" }) } 
                                                            className="inputFieldPassword"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="outline-none"
                                                            onClick={ () => setShowPassword(!showPassword) }
                                                            title="Show Password"
                                                        >
                                                            {
                                                                showPassword ?
                                                                <svg 
                                                                    xmlns="http://www.w3.org/2000/svg" 
                                                                    className="h-5 w-5 text-pink-600" 
                                                                    fill="none" 
                                                                    viewBox="0 0 24 24" 
                                                                    stroke="currentColor" 
                                                                    strokeWidth={2}
                                                                    >
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                                </svg>
                                                                :
                                                                <svg 
                                                                    xmlns="http://www.w3.org/2000/svg" 
                                                                    className="h-5 w-5 text-gray-400 hover:text-gray-800 color-transition" 
                                                                    fill="none" 
                                                                    viewBox="0 0 24 24" 
                                                                    stroke="currentColor" 
                                                                    strokeWidth={2}
                                                                >
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                </svg>
                                                            }
                                                        </button>
                                                    </div>
                                                    { 
                                                        errors.partner_pass && 
                                                        <div className="flex items-center gap-x-1 text-red-500">
                                                            <AuthErrorIcon />
                                                            <p className="text-xs">{ errors.partner_pass.message }</p>
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
                                                    onClick={closeModal}
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
                            <CommonTable columns={ partnerColumns } data={ data } onClick={ openModal } btnText="New Partner" cols={4} />
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
    const res = await fetch(`${api}partners_list/`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data = await res.json()
    return {
        props : {
            partnersList : data
        }
    }
}