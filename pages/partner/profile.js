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

export default function profile({ partnerProfile }) {
    const api = process.env.NEXT_PUBLIC_DRF_API
    const router = useRouter()
    const [userName, setUsername] = useState()
    const readRole = () => {
        setUsername(localStorage.getItem('username'))
        const role = localStorage.getItem('role')
        if (role !== 'partner') {
            router.push('/login')
        }
    }
    useEffect( async () => {
        await readRole()
    }, [])
    const { register, handleSubmit, formState : { errors } } = useForm()
    const handleSubmitForm = (data) => {
        console.log(data.partner_services)
        const jwt_token = Cookies.get('jwt')
        axios({
            method : 'POST',
            url : `${api}partner_profile/update`,
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer'+' '+ jwt_token
            },
            data : {
                first_name : data.partner_fname,
                last_name : data.partner_lname,
                mobile_number : data.partner_mobile,
                email : data.partner_email,
                business_name : data.partner_bus_name,
                type_of_business : data.partner_tob,
                street_address : data.partner_st_add,
                city : data.partner_city,
                state_province : data.partner_province,
                postal_zip : data.partner_zip,
                services_offered : data.partner_services,
            }
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
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav username={ userName } />
                <div className="row-start-2 w-full h-full bg-true-100">
                    <div className="p-8 flex flex-col items-center gap-y-5 min-h-screen">
                        <div className="w-client-profile-form-container">
                        <h4 className="text-xl font-bold">Business Profile</h4>
                        </div>
                        
                        <div className="card w-client-profile-form-container">
                            <form
                                onSubmit={ handleSubmit(handleSubmitForm) }
                                className="w-full flex flex-col items-center gap-y-6 border border-gray-300 rounded-xl p-5"
                            >
                                <h4 className="text-base font-bold">Personal Information</h4>
                                
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
                                                    { ...register("partner_fname", { required : "This field cannot be empty" }) } 
                                                    className="inputField"
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
                                                    { ...register("partner_mobile", { required : "This field cannot be empty" }) } 
                                                    className="inputField"
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
                                                    { ...register("partner_email", { required : "This field cannot be empty" }) } 
                                                    className="inputField"
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
                                

                                {/* This is for the company name & business type fields */}
                                <div className="flex gap-x-5">

                                    <div className="flex flex-col gap-y-1">
                                        <label className="inputFieldLabel">Business Name</label>
                                        <div className="inputContainer">
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
                                                className="inputField"
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
                                    <label className="inputFieldLabel">Type of Business</label>
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
                                                { ...register("partner_tob", { required : "This field cannot be empty" }) } 
                                                className="inputField"
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
                                    <p className="inputFieldLabel">Address</p>

                                    <div className="flex flex-col gap-y-6">

                                    <div className="flex gap-x-5">

                                        <div className="flex flex-col gap-y-1">
                                            <p className="text-xs">Street Address</p>
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
                                                    { ...register("partner_st_add", { required : "This field cannot be empty" }) } 
                                                    className="inputField"
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
                                                    { ...register("partner_city", { required : "This field cannot be empty" }) } 
                                                    className="inputField"
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

                                        <div className="flex gap-x-5">

                                        <div className="flex flex-col gap-y-1">
                                            <p className="text-xs">State / Province</p>
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
                                                    { ...register("partner_province", { required : "This field cannot be empty" }) } 
                                                    className="inputField"
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
                                                    { ...register("partner_zip", { required : "This field cannot be empty" }) } 
                                                    className="inputField"
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
                                    <label className="inputFieldLabel">Services Offered</label>
                                    <textarea 
                                        className="inputTextArea"
                                        { ...register("partner_services", { required : "This field cannot be empty" }) }
                                        // onChange={e => setAreaText(e.target.value)}
                                        defaultValue={ partnerProfile.services_offered }
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