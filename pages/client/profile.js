import React, { useState, useEffect } from 'react'
import SideNav from '../../components/client/SideNav'
import TopNav from '../../components/client/TopNav'
import Footer from '../../components/client/Footer'
import PageHeader from '../../components/client/PageHeader'
import AuthErrorIcon from '../../components/AuthErrorIcon'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2'
import axios from 'axios'
import useDarkMode from '../../hooks/useDarkMode'
import ClientMobileNav from '../../components/client/ClientMobileNav'


export default function profile({ clientProfile }) {
    const api = process.env.NEXT_PUBLIC_DRF_API
    const router = useRouter()
    const [userName, setUsername] = useState()
    const { isDarkMode } = useDarkMode()
    const [showMobileNav, setShowMobileNav] = useState(false)
    const readRole = () => {
        setUsername(localStorage.getItem('username'))
        const role = localStorage.getItem('role')
        if (role !== 'client') {
            router.push('/login')
        }
    }
    useEffect(() => {
        readRole()
    }, [])
    const { register, handleSubmit, formState : { errors } } = useForm()
    const handleSubmitForm = (data) => {
        const jwt_token = Cookies.get('jwt')
        const formData = new FormData()
        if (data.client_profile.length) {
            formData.append('profile_image', data.client_profile[0])
        } 
        formData.append('first_name', data.client_fname)
        formData.append('last_name', data.client_lname)
        formData.append('mobile_number', data.client_mobile)
        formData.append('email', data.client_email)
        formData.append('sex', data.client_sex)
        formData.append('birthdate', data.client_birth)
        formData.append('street_address', data.client_st_add)
        formData.append('city', data.client_city)
        formData.append('state_province', data.client_province)
        formData.append('postal_zip', data.client_zip)
        console.log(formData)
        axios({
            method : 'POST',
            url : `${api}client_profile/update`,
            headers : {
                'Authorization' : 'Bearer'+' '+jwt_token,
                'Content-Type' : 'multipart/form-data'
            },
            data : formData
        }).then(() => {
            console.log(data)
            Swal.fire({
                icon : 'success',
                title: 'Update Successful',
                timer : 3000,
                text: `Profile successfully updated!`,
                showCloseButton: true,
                confirmButtonColor: '#DB2777',
            })
            router.push('/client/profile')
        }).catch((error) => {
            Swal.fire({
                icon : 'error',
                title: 'Update Error',
                timer : 3000,
                text: error.message,
                showCloseButton: true,
                confirmButtonColor: '#DB2777',
            })
        })
    }
    return (
        <div className={`${isDarkMode ? 'dark' : ''} w-full h-screen grid grid-cols-1 md:grid-cols-custom-layout font-mont text-gray-800 dark:text-gray-300`}>
            <SideNav isActive="" />
            {
                showMobileNav ? 
                <ClientMobileNav 
                    isActive="messages" 
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
                    <div className="p-5 md:p-8 flex flex-col items-center gap-y-5 min-h-screen">
                        <div className="w-80 md:w-client-profile-form-container">
                            <PageHeader text="Client Profile">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="w-7 h-7 text-gray-800 dark:text-gray-300" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                </svg>
                            </PageHeader>
                        </div>
                        <div className="card w-80 md:w-client-profile-form-container">
                            <form 
                                onSubmit={ handleSubmit(handleSubmitForm) }
                                className="w-full rounded-xl p-5 flex flex-col items-center border border-gray-300 dark:border-gray-700 gap-y-7"
                            >

                                <div className="w-file-mobile md:w-full flex flex-col gap-y-2">
                                    <p className="inputFieldLabel dark:text-gray-300">Image</p>
                                    <div className="px-2 py-1 flex items-center bg-transparent gap-x-1 border border-gray-300 dark:border-gray-700 focus-within:border-gray-600 rounded-lg">
                                        <input
                                            type="file"
                                            { ...register("client_profile") } 
                                            className="w-40 md:w-52 py-0 px-0 bg-transparent border-transparent border-none focus:outline-none focus:ring-transparent text-sm text-gray-800 dark:text-gray-300 appearance-none"
                                        />
                                    </div>
                                </div>

                                {/* This is for the name field */}
                                <div className="flex flex-col gap-y-2">
                                    <p className="inputFieldLabel dark:text-gray-300">Name</p>
                                    <div className="flex flex-col md:flex-row gap-y-5 gap-x-5">

                                        <div className="flex flex-col gap-y-1">
                                            <p className="text-xs dark:text-gray-300">First Name</p>
                                            <div className="px-2 py-1 flex items-center bg-transparent gap-x-1 border border-gray-300 dark:border-gray-700 focus-within:border-gray-600 rounded-lg">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="h-5 w-5 text-gray-800 dark:text-gray-300" 
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                    >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <input
                                                    type="text"
                                                    { ...register("client_fname", { required : "This field cannot be empty" }) } 
                                                    className="w-40 md:w-52 py-0 px-0 bg-transparent border-transparent border-none focus:outline-none focus:ring-transparent text-sm text-gray-800 dark:text-gray-300 appearance-none"
                                                    defaultValue={ clientProfile.first_name }
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
                                            <p className="text-xs dark:text-gray-300">Last Name</p>
                                            <div className="px-2 py-1 flex items-center bg-transparent gap-x-1 border border-gray-300 dark:border-gray-700 focus-within:border-gray-600 rounded-lg">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="h-5 w-5 text-gray-800 dark:text-gray-300"
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                    >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <input
                                                    type="text"
                                                    { ...register("client_lname", { required : "This field cannot be empty" }) } 
                                                    className="w-40 md:w-52 py-0 px-0 bg-transparent border-transparent border-none focus:outline-none focus:ring-transparent text-sm text-gray-800 dark:text-gray-300 appearance-none"
                                                    defaultValue={ clientProfile.last_name }
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
                                    <p className="inputFieldLabel dark:text-gray-300">Contact</p>
                                    <div className="flex flex-col md:flex-row gap-y-5 gap-x-5">

                                        <div className="flex flex-col gap-y-1">
                                            <p className="text-xs dark:text-gray-300">Mobile Number</p>
                                            <div className="px-2 py-1 flex items-center bg-transparent gap-x-1 border border-gray-300 dark:border-gray-700 focus-within:border-gray-600 rounded-lg">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="h-5 w-5 text-gray-800 dark:text-gray-300"
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                </svg>
                                                <input
                                                    type="text"
                                                    { ...register("client_mobile", { required : "This field cannot be empty" }) } 
                                                    className="w-40 md:w-52 py-0 px-0 bg-transparent border-transparent border-none focus:outline-none focus:ring-transparent text-sm text-gray-800 dark:text-gray-300 appearance-none"
                                                    defaultValue={ clientProfile.mobile_number }
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
                                            <p className="text-xs dark:text-gray-300">Email Address</p>
                                            <div className="px-2 py-1 flex items-center bg-transparent gap-x-1 border border-gray-300 dark:border-gray-700 focus-within:border-gray-600 rounded-lg">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="h-5 w-5 text-gray-800 dark:text-gray-300"
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <input
                                                    type="text"
                                                    { ...register("client_email", { required : "This field cannot be empty" }) } 
                                                    className="w-40 md:w-52 py-0 px-0 bg-transparent border-transparent border-none focus:outline-none focus:ring-transparent text-sm text-gray-800 dark:text-gray-300 appearance-none"
                                                    defaultValue={ clientProfile.email || '' }
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

                                <div className="flex flex-col md:flex-row gap-y-5 gap-x-5">

                                    <div className="flex flex-col gap-y-1">
                                            <label htmlFor="profile_sex" className="inputFieldLabel dark:text-gray-300">Sex</label>
                                            <select
                                                className="w-50 md:w-63 px-2 py-1 bg-transparent border-transparent text-sm text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-700 focus-within:border-gray-600 focus:outline-none focus:ring-transparent rounded-lg"
                                                {...register("client_sex")}
                                                defaultValue={ clientProfile.sex || '' }
                                            >
                                                <option value="0" className="dark:text-gray-800 text-xs md:text-sm">Male</option>
                                                <option value="1" className="dark:text-gray-800 text-xs md:text-sm">Female</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-y-1">
                                            <label htmlFor="profile_birth" className="inputFieldLabel dark:text-gray-300">Birth Date</label>
                                            <div className="px-2 py-1 flex items-center bg-transparent gap-x-1 border border-gray-300 dark:border-gray-700 focus-within:border-gray-600 rounded-lg">
                                                <input
                                                    type="date"
                                                    className="w-48 md:w-57 px-0 py-0 bg-transparent border-transparent border-none focus:outline-none focus:ring-transparent text-sm rounded-lg text-gray-800 dark:text-gray-300 appearance-none"
                                                    { ...register("client_birth", { required: "This field should not be empty!" }) }
                                                    autoComplete="off"
                                                    defaultValue={ clientProfile.birthdate || '' }
                                                />
                                            </div>
                                            { 
                                                errors.client_birth && 
                                                <div className="flex items-center gap-x-1 text-red-500">
                                                    <AuthErrorIcon />
                                                    <p className="text-xs">{ errors.client_birth.message }</p>
                                                </div> 
                                            }
                                        </div>
                                    
                                </div>

                                {/* This is for the address field */}
                                <div className="flex flex-col gap-y-2">
                                    <p className="inputFieldLabel dark:text-gray-300">Address</p>

                                    <div className="flex flex-col gap-y-7">

                                    <div className="flex flex-col md:flex-row gap-y-5 gap-x-5">

                                        <div className="flex flex-col gap-y-1">
                                            <p className="text-xs dark:text-gray-300">Street Address</p>
                                            <div className="px-2 py-1 flex items-center bg-transparent gap-x-1 border border-gray-300 dark:border-gray-700 focus-within:border-gray-600 rounded-lg">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="h-5 w-5 text-gray-800 dark:text-gray-300"
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                    >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <input
                                                    type="text"
                                                    { ...register("client_st_add", { required : "This field cannot be empty" }) } 
                                                    className="w-40 md:w-52 py-0 px-0 bg-transparent border-transparent border-none focus:outline-none focus:ring-transparent text-sm text-gray-800 dark:text-gray-300 appearance-none"
                                                    defaultValue={ clientProfile.street_address || '' }
                                                />
                                            </div>
                                            { 
                                                errors.client_st_add && 
                                                <div className="flex items-center gap-x-1 text-red-500">
                                                    <AuthErrorIcon />
                                                    <p className="text-xs">{ errors.client_st_add.message }</p>
                                                </div> 
                                            }
                                        </div>

                                        <div className="flex flex-col gap-y-1">
                                            <p className="text-xs dark:text-gray-300">City</p>
                                            <div className="px-2 py-1 flex items-center bg-transparent gap-x-1 border border-gray-300 dark:border-gray-700 focus-within:border-gray-600 rounded-lg">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="h-5 w-5 text-gray-800 dark:text-gray-300"
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                    >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <input
                                                    type="text"
                                                    { ...register("client_city", { required : "This field cannot be empty" }) } 
                                                    className="w-40 md:w-52 py-0 px-0 bg-transparent border-transparent border-none focus:outline-none focus:ring-transparent text-sm text-gray-800 dark:text-gray-300 appearance-none"
                                                    defaultValue={ clientProfile.city || '' }
                                                />
                                            </div>
                                            { 
                                                errors.client_city && 
                                                <div className="flex items-center gap-x-1 text-red-500">
                                                    <AuthErrorIcon />
                                                    <p className="text-xs">{ errors.client_city.message }</p>
                                                </div> 
                                            }
                                        </div>

                                        </div>

                                        <div className="flex flex-col md:flex-row gap-y-5 gap-x-5">

                                        <div className="flex flex-col gap-y-1">
                                            <p className="text-xs dark:text-gray-300">State / Province</p>
                                            <div className="px-2 py-1 flex items-center bg-transparent gap-x-1 border border-gray-300 dark:border-gray-700 focus-within:border-gray-600 rounded-lg">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="h-5 w-5 text-gray-800 dark:text-gray-300"
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                    >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <input
                                                    type="text"
                                                    { ...register("client_province", { required : "This field cannot be empty" }) } 
                                                    className="w-40 md:w-52 py-0 px-0 bg-transparent border-transparent border-none focus:outline-none focus:ring-transparent text-sm text-gray-800 dark:text-gray-300 appearance-none"
                                                    defaultValue={ clientProfile.state_province || '' }
                                                />
                                            </div>
                                            { 
                                                errors.client_province && 
                                                <div className="flex items-center gap-x-1 text-red-500">
                                                    <AuthErrorIcon />
                                                    <p className="text-xs">{ errors.client_province.message }</p>
                                                </div> 
                                            }
                                        </div>

                                        <div className="flex flex-col gap-y-1">
                                            <p className="text-xs dark:text-gray-300">Postal / Zip Code</p>
                                            <div className="px-2 py-1 flex items-center bg-transparent gap-x-1 border border-gray-300 dark:border-gray-700 focus-within:border-gray-600 rounded-lg">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="h-5 w-5 text-gray-800 dark:text-gray-300"
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                    >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <input
                                                    type="text"
                                                    { ...register("client_zip", { required : "This field cannot be empty" }) } 
                                                    className="w-40 md:w-52 py-0 px-0 bg-transparent border-transparent border-none focus:outline-none focus:ring-transparent text-sm text-gray-800 dark:text-gray-300 appearance-none"
                                                    defaultValue={ clientProfile.postal_zip || '' }
                                                />
                                            </div>
                                            { 
                                                errors.client_zip && 
                                                <div className="flex items-center gap-x-1 text-red-500">
                                                    <AuthErrorIcon />
                                                    <p className="text-xs">{ errors.client_zip.message }</p>
                                                </div> 
                                            }
                                        </div>

                                        </div>

                                    </div>

                                </div>

                                <div className="w-full pl-2">
                                    <button 
                                        className="px-5 py-2 bg-pink-600 hover:bg-pink-500 rounded-lg text-white color-transition focus:outline-none"
                                    >
                                        <p className="text-base font-bold tracking-wide">Save</p>
                                    </button>
                                </div>

                                <div className='self-start flex flex-col gap-y-1 text-xs'>
                                    <h4 className='text-sm font-medium dark:text-gray-300'>Note:</h4>
                                    <p className="dark:text-gray-300">This website follows the Data Privacy Act of the Philippines or <a href="https://www.privacy.gov.ph/data-privacy-act/" target="_blank" rel="noreferrer" className='text-pink-600 font-medium hover:underline'>RA 10173</a>, all 
                                    information collected in this website are confidential and will not be shared into anyone.</p>
                                </div>

                            </form>
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
    const decoded_token = jwt_decode(token)
    const res = await fetch(`${api}client_profile/${decoded_token.user_id}`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data = await res.json()
    return {
        props : {
            clientProfile : data
        }
    }
}