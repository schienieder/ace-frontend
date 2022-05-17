import React, { useState, useEffect } from 'react'
import TopNav from '../../components/partner/TopNav'
import SideNav from '../../components/partner/SideNav'
import Footer from '../../components/partner/Footer'
import AuthErrorIcon from '../../components/AuthErrorIcon'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2'
import axios from 'axios'
import PartnerMobileNav from '../../components/partner/PartnerMobileNav'
import useDarkMode from '../../hooks/useDarkMode'
import PageHeader from '../../components/PageHeader'

export default function profile({ partnerProfile }) {
    const api = process.env.NEXT_PUBLIC_DRF_API
    const router = useRouter()
    const [userName, setUsername] = useState()
    const [showMobileNav, setShowMobileNav] = useState(false)
    const { isDarkMode } = useDarkMode()
    const readRole = () => {
        setUsername(localStorage.getItem('username'))
        const role = localStorage.getItem('role')
        if (role !== 'partner') {
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
        if (data.partner_permit.length) {
            formData.append('permit_profile', data.partner_permit[0])
        }
        formData.append('first_name', data.partner_fname)
        formData.append('last_name', data.partner_lname)
        formData.append('mobile_number', data.partner_mobile)
        formData.append('email', data.partner_email)
        formData.append('business_name', data.partner_bus_name)
        formData.append('type_of_business', data.partner_tob)
        formData.append('street_address', data.partner_st_add)
        formData.append('city', data.partner_city)
        formData.append('state_province', data.partner_province)
        formData.append('postal_zip', data.partner_zip)
        formData.append('services_offered', data.partner_services)
        console.log(formData)
        axios({
            method : 'POST',
            url : `${api}partner_profile/update`,
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer'+' '+ jwt_token
            },
            data : formData
        }).then(() => {
            Swal.fire({
                icon : 'success',
                title: 'Update Successful',
                timer : 3000,
                text: `Profile successfully updated!`,
                showCloseButton: true,
                confirmButtonColor: '#DB2777',
            })
            router.push('/partner/profile')
        }).catch(error => {
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
                <PartnerMobileNav 
                    isActive="" 
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
                            <PageHeader text="Business Profile">
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
                                className="w-full flex flex-col items-center gap-y-6 border border-gray-300 rounded-xl p-5 dark:text-gray-300"
                            >
                                <h4 className="text-base font-bold">Personal Information</h4>
                                
                                {/* This is for the name field */}
                                <div className="flex flex-col gap-y-2">
                                    <p className="inputFieldLabel dark:text-gray-300">Name</p>
                                    <div className="flex flex-col md:flex-row gap-y-5 gap-x-5">

                                        <div className="flex flex-col gap-y-1">
                                            <p className="text-xs">First Name</p>
                                            <div className="px-2 py-1 flex items-center bg-transparent gap-x-1 border border-gray-300 dark:border-gray-700 focus-within:border-gray-600 rounded-lg">
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
                                                    className="w-40 md:w-52 py-0 px-0 bg-transparent border-transparent border-none focus:outline-none focus:ring-transparent text-sm text-gray-800 dark:text-gray-300 appearance-none"
                                                    defaultValue={ partnerProfile.first_name || '' }
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
                                            <div className="px-2 py-1 flex items-center bg-transparent gap-x-1 border border-gray-300 dark:border-gray-700 focus-within:border-gray-600 rounded-lg">
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
                                                    className="w-40 md:w-52 py-0 px-0 bg-transparent border-transparent border-none focus:outline-none focus:ring-transparent text-sm text-gray-800 dark:text-gray-300 appearance-none"
                                                    defaultValue={ partnerProfile.last_name || '' }
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
                                    <p className="inputFieldLabel dark:text-gray-300">Contact</p>
                                    <div className="flex flex-col md:flex-row gap-x-5 gap-y-5">

                                        <div className="flex flex-col gap-y-1">
                                            <p className="text-xs">Mobile Number</p>
                                            <div className="px-2 py-1 flex items-center bg-transparent gap-x-1 border border-gray-300 dark:border-gray-700 focus-within:border-gray-600 rounded-lg">
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
                                                    { ...register("partner_mobile", { required : "This field cannot be empty" }) } 
                                                    className="w-40 md:w-52 py-0 px-0 bg-transparent border-transparent border-none focus:outline-none focus:ring-transparent text-sm text-gray-800 dark:text-gray-300 appearance-none"
                                                    defaultValue={ partnerProfile.mobile_number || '' }
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
                                            <div className="px-2 py-1 flex items-center bg-transparent gap-x-1 border border-gray-300 dark:border-gray-700 focus-within:border-gray-600 rounded-lg">
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
                                                    { ...register("partner_email", { required : "This field cannot be empty" }) } 
                                                    className="w-40 md:w-52 py-0 px-0 bg-transparent border-transparent border-none focus:outline-none focus:ring-transparent text-sm text-gray-800 dark:text-gray-300 appearance-none"
                                                    defaultValue={ partnerProfile.email || '' }
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

                                <h4 className="text-base font-bold mt-5">Business Information</h4>
                                
                                <div className="w-file-mobile md:w-full flex flex-col gap-y-2">
                                    <p className="text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300">Business Permit <span className='font-medium'>/</span> Work Profile</p>
                                    <div className="px-2 py-1 flex items-center bg-transparent gap-x-1 border border-gray-300 dark:border-gray-700 focus-within:border-gray-600 rounded-lg">
                                        <input
                                            type="file"
                                            { ...register("partner_permit") } 
                                            className="w-40 md:w-52 py-0 px-0 bg-transparent border-transparent border-none focus:outline-none focus:ring-transparent text-sm text-gray-800 dark:text-gray-300 appearance-none"
                                        />
                                    </div>
                                </div>

                                {/* This is for the company name & business type fields */}
                                <div className="flex flex-col md:flex-row gap-x-5 gap-y-5">

                                    <div className="flex flex-col gap-y-1">
                                        <label className="inputFieldLabel dark:text-gray-300">Business <span className='font-medium'>/</span> Work Name</label>
                                        <div className="px-2 py-1 flex items-center bg-transparent gap-x-1 border border-gray-300 dark:border-gray-700 focus-within:border-gray-600 rounded-lg">
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className="inputIcon" 
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            <input
                                                type="text"
                                                { ...register("partner_bus_name", { required : "This field cannot be empty" }) } 
                                                className="w-40 md:w-52 py-0 px-0 bg-transparent border-transparent border-none focus:outline-none focus:ring-transparent text-sm text-gray-800 dark:text-gray-300 appearance-none"
                                                defaultValue={ partnerProfile.business_name || '' }
                                            />
                                        </div>
                                        { 
                                            errors.partner_bus_name && 
                                            <div className="flex items-center gap-x-1 text-red-500">
                                                <AuthErrorIcon />
                                                <p className="text-xs">{ errors.partner_bus_name.message }</p>
                                            </div> 
                                        }
                                    </div>

                                    <div className="flex flex-col gap-y-1">
                                    <label className="inputFieldLabel dark:text-gray-300">Type of Business <span className='font-medium'>/</span> Work</label>
                                        <div className="px-2 py-1 flex items-center bg-transparent gap-x-1 border border-gray-300 dark:border-gray-700 focus-within:border-gray-600 rounded-lg">
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
                                                { ...register("partner_tob", { required : "This field cannot be empty" }) } 
                                                className="w-40 md:w-52 py-0 px-0 bg-transparent border-transparent border-none focus:outline-none focus:ring-transparent text-sm text-gray-800 dark:text-gray-300 appearance-none"
                                                defaultValue={ partnerProfile.type_of_business || '' }
                                            />
                                        </div>
                                        { 
                                            errors.partner_tob && 
                                            <div className="flex items-center gap-x-1 text-red-500">
                                                <AuthErrorIcon />
                                                <p className="text-xs">{ errors.partner_tob.message }</p>
                                            </div> 
                                        }
                                    </div>

                                </div>

                                {/* This is for the address field */}
                                <div className="flex flex-col gap-y-2">
                                    <p className="inputFieldLabel dark:text-gray-300">Address</p>

                                    <div className="flex flex-col gap-y-6">

                                    <div className="flex flex-col md:flex-row gap-x-5 gap-y-5">

                                        <div className="flex flex-col gap-y-1">
                                            <p className="text-xs">Street Address</p>
                                            <div className="px-2 py-1 flex items-center bg-transparent gap-x-1 border border-gray-300 dark:border-gray-700 focus-within:border-gray-600 rounded-lg">
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
                                                    { ...register("partner_st_add", { required : "This field cannot be empty" }) } 
                                                    className="w-40 md:w-52 py-0 px-0 bg-transparent border-transparent border-none focus:outline-none focus:ring-transparent text-sm text-gray-800 dark:text-gray-300 appearance-none"
                                                    defaultValue={ partnerProfile.street_address || '' }
                                                />
                                            </div>
                                            { 
                                                errors.partner_st_add && 
                                                <div className="flex items-center gap-x-1 text-red-500">
                                                    <AuthErrorIcon />
                                                    <p className="text-xs">{ errors.partner_st_add.message }</p>
                                                </div> 
                                            }
                                        </div>

                                        <div className="flex flex-col gap-y-1">
                                            <p className="text-xs">City</p>
                                            <div className="px-2 py-1 flex items-center bg-transparent gap-x-1 border border-gray-300 dark:border-gray-700 focus-within:border-gray-600 rounded-lg">
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
                                                    { ...register("partner_city", { required : "This field cannot be empty" }) } 
                                                    className="w-40 md:w-52 py-0 px-0 bg-transparent border-transparent border-none focus:outline-none focus:ring-transparent text-sm text-gray-800 dark:text-gray-300 appearance-none"
                                                    defaultValue={ partnerProfile.city || '' }
                                                />
                                            </div>
                                            { 
                                                errors.partner_city && 
                                                <div className="flex items-center gap-x-1 text-red-500">
                                                    <AuthErrorIcon />
                                                    <p className="text-xs">{ errors.partner_city.message }</p>
                                                </div> 
                                            }
                                        </div>

                                        </div>

                                        <div className="flex flex-col md:flex-row gap-x-5 gap-y-5">

                                            <div className="flex flex-col gap-y-1">
                                                <p className="text-xs">State / Province</p>
                                                <div className="px-2 py-1 flex items-center bg-transparent gap-x-1 border border-gray-300 dark:border-gray-700 focus-within:border-gray-600 rounded-lg">
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
                                                        { ...register("partner_province", { required : "This field cannot be empty" }) } 
                                                        className="w-40 md:w-52 py-0 px-0 bg-transparent border-transparent border-none focus:outline-none focus:ring-transparent text-sm text-gray-800 dark:text-gray-300 appearance-none"
                                                        defaultValue={ partnerProfile.state_province || '' }
                                                    />
                                                </div>
                                                { 
                                                    errors.partner_province && 
                                                    <div className="flex items-center gap-x-1 text-red-500">
                                                        <AuthErrorIcon />
                                                        <p className="text-xs">{ errors.partner_province.message }</p>
                                                    </div> 
                                                }
                                            </div>

                                            <div className="flex flex-col gap-y-1">
                                                <p className="text-xs">Postal / Zip Code</p>
                                                <div className="px-2 py-1 flex items-center bg-transparent gap-x-1 border border-gray-300 dark:border-gray-700 focus-within:border-gray-600 rounded-lg">
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
                                                        { ...register("partner_zip", { required : "This field cannot be empty" }) } 
                                                        className="w-40 md:w-52 py-0 px-0 bg-transparent border-transparent border-none focus:outline-none focus:ring-transparent text-sm text-gray-800 dark:text-gray-300 appearance-none"
                                                        defaultValue={ partnerProfile.postal_zip || '' }
                                                    />
                                                </div>
                                                { 
                                                    errors.partner_zip && 
                                                    <div className="flex items-center gap-x-1 text-red-500">
                                                        <AuthErrorIcon />
                                                        <p className="text-xs">{ errors.partner_zip.message }</p>
                                                    </div> 
                                                }
                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <div className="flex flex-col gap-y-1">
                                    <label className="inputFieldLabel dark:text-gray-300">Services Offered</label>
                                    <textarea 
                                        className="w-52 md:w-custom-textarea px-2 py-1 bg-transparent border border-gray-300 dark:border-gray-700 focus-within:border-gray-600 focus:outline-none focus:ring-transparent rounded-lg text-sm"
                                        { ...register("partner_services", { required : "This field cannot be empty" }) }
                                        // onChange={e => setAreaText(e.target.value)}
                                        defaultValue={ partnerProfile.services_offered || '' }
                                    ></textarea>
                                    { 
                                        errors.partner_services && 
                                        <div className="flex items-center gap-x-1 text-red-500">
                                            <AuthErrorIcon />
                                            <p className="text-xs">{ errors.partner_services.message }</p>
                                        </div> 
                                    }
                                </div>

                                <div className="w-full pl-2">
                                    <button 
                                        type="submit"
                                        className="px-5 py-2 bg-pink-600 hover:bg-pink-500 rounded-lg text-white color-transition focus:outline-none"
                                    >
                                        <p className="text-base font-bold tracking-wide">Save</p>
                                    </button>
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
    const res = await fetch(`${api}partner_profile/${decoded_token.user_id}`, {
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data = await res.json()
    return {
        props : {
            partnerProfile : data
        }
    }
}