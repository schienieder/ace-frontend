import React, { useState, useEffect } from 'react'
import SideNav from '../../components/client/SideNav'
import TopNav from '../../components/client/TopNav'
import Footer from '../../components/client/Footer'
import PageHeader from '../../components/client/PageHeader'
import AuthErrorIcon from '../../components/AuthErrorIcon'
import { Listbox, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2'
import axios from 'axios'

export default function profile({ clientProfile }) {
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
                response.data.role !== 'client' ? router.push('/login') : ''
                axios({
                    method : 'GET',
                    url : `http://localhost:8000/client_profile/${decoded_token.user_id}`,
                    headers : {'Authorization' : 'Bearer'+' '+jwt_token}
                })
                .then((response) => {
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error.response)
                })
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
    const { register, handleSubmit, formState : { errors } } = useForm()
    const handleSubmitForm = (data) => {
        const jwt_token = Cookies.get('jwt')
        axios({
            method : 'PUT',
            url : 'http://localhost:8000/client_profile/update',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer'+' '+jwt_token
            },
            data : {
                first_name : data.client_fname,
                last_name : data.client_lname,
                mobile_number : data.client_mobile,
                email : data.client_email,
                sex : data.client_sex,
                birthdate : data.client_birth,
                street_address : data.client_st_add,
                city : data.client_city,
                state_province : data.client_province,
                postal_zip : data.client_zip
            }
        }).then(() => {
            console.log(data)
            Swal.fire({
                icon : 'success',
                title: 'Update Successful',
                timer : 3000,
                text: `Profile successfully updated!`,
                showCloseButton: true,
                confirmButtonColor: '#0F766E',
            })
            router.push('/client/profile')
        }).catch((error) => {
            Swal.fire({
                icon : 'error',
                title: 'Update Error',
                timer : 3000,
                text: error.message,
                showCloseButton: true,
                confirmButtonColor: '#0F766E',
            })
        })
    }
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav />
                <div className="row-start-2 w-full h-full bg-gray-100">
                    <div className="p-8 flex flex-col items-center gap-y-5 min-h-screen">
                        <div className="w-client-profile-form-container">
                            <PageHeader text="Client Profile" />
                        </div>
                        <div className="card w-client-profile-form-container">
                            <form 
                                onSubmit={ handleSubmit(handleSubmitForm) }
                                className="w-full rounded-md p-5 flex flex-col items-center border border-gray-300 gap-y-7"
                            >
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
                                                    type="text"
                                                    { ...register("client_mobile", { required : "This field cannot be empty" }) } 
                                                    className="inputField"
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

                                <div className="flex gap-x-5">

                                    <div className="flex flex-col gap-y-1">
                                            <label htmlFor="profile_sex" className="inputFieldLabel">Sex</label>
                                            <select
                                                className="inputSelect"
                                                {...register("client_sex")}
                                                defaultValue={ clientProfile.sex || '' }
                                            >
                                                <option value="0">Male</option>
                                                <option value="1">Female</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-y-1">
                                            <label htmlFor="profile_birth" className="inputFieldLabel">Birth Date</label>
                                            <div className="inputContainer">
                                                <input
                                                    type="date"
                                                    className="inputFieldDateTime appearance-none"
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
                                    <p className="inputFieldLabel">Address</p>

                                    <div className="flex flex-col gap-y-7">

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
                                                    { ...register("client_st_add", { required : "This field cannot be empty" }) } 
                                                    className="inputField"
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
                                                    { ...register("client_city", { required : "This field cannot be empty" }) } 
                                                    className="inputField"
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
                                                    { ...register("client_province", { required : "This field cannot be empty" }) } 
                                                    className="inputField"
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
                                                    { ...register("client_zip", { required : "This field cannot be empty" }) } 
                                                    className="inputField"
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
                                        className="w-24 px-3 py-2 bg-teal-800 hover:bg-teal-700 color-transition border-teal-800 focus:bg-teal-700 ring-2 ring-offset-2 ring-transparent focus:ring-teal-700 focus:outline-none text-gray-50 rounded-sm"
                                    >
                                        <p className="text-base font-medium">Save</p>
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
    const token = req.cookies.jwt
    const decoded_token = jwt_decode(token)
    const res = await fetch(`http://localhost:8000/client_profile/${decoded_token.user_id}`, {
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