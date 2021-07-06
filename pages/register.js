import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import authStyles from '../styles/Auth.module.css'
import { Formiz, FormizStep, useForm } from '@formiz/core'
import { isLength, isMinLength, isNumber, } from '@formiz/validations'
import MyInputField from '../components/MyInputField'
import { useRouter } from 'next/router'

export default function register() {
    const router = useRouter()
    const Swal = require('sweetalert2')
    const myForm = useForm() // call useForm
    const handleSubmit = async (data) => {
        await fetch('http://localhost:8000/register/', {
            method : "POST",
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                first_name : data.register_fname,
                last_name : data.register_lname,
                mobile_number : data.register_mobile,
                username : data.register_uname,
                password : data.register_pass1,
                role : "client"
            })
        })
        Swal.fire({
            icon : 'success',
            title: 'Regristration Successsful!',
            timer : 3000,
            text: `Account ${data.register_uname} successfully registered!`,
            showCloseButton: true,
            confirmButtonColor: '#0F766E',
        })
        .then( async () => {
            await router.push('/login')
        })
    }
    return (
        <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2 place-items-center">
            <Link href="/" passHref>
                <a className="absolute flex gap-x-1 items-center mt-5 ml-10">
                    <svg width="50" height="38" viewBox="0 0 351 268" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M350.768 268L175.602 13.9056L0.435913 268H119.381C118.072 265.089 121.972 261.063 121.972 261.063C142.925 257.8 145.385 247.533 144.992 241.716C127.382 250.503 113.949 247.284 105.755 240.366C104.786 239.549 103.867 238.672 103.047 237.755C97.2165 231.348 94.4512 222.259 98.0461 213.954C98.4875 212.727 98.9832 211.521 99.5315 210.339C107.991 191.736 130.993 166.139 142.382 154.088C144.859 151.072 146.775 148.767 147.897 147.447V147.353C147.897 147.362 147.929 147.392 147.929 147.392C147.939 147.387 147.953 147.371 147.964 147.358L147.968 147.353V147.449C148.118 147.629 148.283 147.827 148.463 148.043C149.602 149.41 151.33 151.485 153.467 154.088C164.843 166.137 187.858 191.738 196.318 210.339C196.861 211.524 197.356 212.73 197.803 213.954H197.819C201.418 222.256 198.651 231.34 192.816 237.755C191.98 238.67 191.08 239.545 190.11 240.366C181.917 247.284 168.495 250.503 150.872 241.716C150.471 247.535 152.93 257.8 173.891 261.063C173.891 261.063 177.796 265.088 176.478 268H350.768Z" fill="#1F2937"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M350.768 268L175.602 13.9056L147.412 54.7979L294.227 268H350.768Z" fill="#134E4A"/>
                        <g clipPath="url(#clip0)">
                        <path d="M324.601 1.38494C324.256 0.546873 323.436 0 322.531 0C235.558 0 226.168 36.0443 226.168 51.5428C226.168 57.1185 227.405 62.3265 229.848 67.0192C230.224 67.7453 230.968 68.2068 231.784 68.2249C232.555 68.2024 233.366 67.8171 233.774 67.1045C239.645 56.9572 256.273 31.9117 283.735 18.6048C284.86 18.067 286.204 18.5286 286.738 19.6358C287.275 20.7518 286.809 22.0964 285.698 22.6342C283.627 23.6382 281.637 24.7318 279.687 25.8657C278.944 26.3003 278.222 26.7621 277.491 27.2147C276.393 27.896 275.309 28.5906 274.251 29.3078C273.198 30.016 272.158 30.7421 271.136 31.4861C270.818 31.7191 270.513 31.9567 270.199 32.1943C242.868 52.5603 226.168 85.0502 226.168 96.3629C226.168 97.5999 227.172 98.604 228.409 98.604C229.646 98.604 230.65 97.5999 230.65 96.3629C230.65 92.7504 233.111 85.4269 237.767 76.6915C244.526 82.2178 253.62 85.158 264.265 85.158C293.044 85.158 299.072 57.773 302.308 43.0586C306.665 23.2571 316.251 11.6892 324.113 3.82328C324.758 3.18229 324.947 2.223 324.601 1.38494Z" fill="#134E4A"/>
                        </g>
                        <defs>
                        <clipPath id="clip0">
                        <rect width="98.6038" height="98.6038" fill="white" transform="translate(226.168)"/>
                        </clipPath>
                        </defs>
                    </svg>
                    <h4 className="text-2xl font-source font-black">ACE</h4>
                </a>
            </Link>
            <div className="hidden md:flex justify-center items-center col-start-1 h-screen w-full bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 p-5">
                <Image 
                    src="/images/register_img.svg"
                    alt="Woman holding mobile phone image"
                    width={ 982.49 }
                    height={ 763.01 }
                    className="transform scale-95"
                />
            </div>
            <div className="col-start-1 md:col-start-2 h-screen w-full bg-white p-5 flex flex-col justify-center items-center">
            <Formiz
                connect={myForm}
                onSubmit={ handleSubmit }
            >
                <form 
                    noValidate
                    onSubmit={myForm.submitStep}
                    className={ authStyles.authFormStyle }
                >
                    <div className="flex flex-col mb-2">
                        <h4 className="text-3xl font-source font-black">Book Now!</h4>
                        <p className="text-sm mb-2">Complete registration to book an event.</p>
                        <p className="text-xs">(Step 
                            {' '} 
                            { myForm.currentStep && myForm.currentStep.index + 1 || 0 }
                            {' '} 
                            of 
                            {' '}
                            { myForm.steps.length }
                            )
                        </p>
                    </div>
                    {/* step 1 form fields */}
                    <FormizStep 
                        name="step1"
                        className="flex flex-col gap-y-4"
                    >
                        <MyInputField
                            name="register_fname"
                            label="First Name"
                            type="text"
                            required="This field is required!"
                            autoFocus
                        />
                        <MyInputField 
                            name="register_lname"
                            label="Last Name"
                            type="text"
                            required="This field is required!"
                        />
                        <MyInputField 
                            name="register_mobile"
                            label="Mobile Number"
                            type="text"
                            required="This field is required!"
                            validations={[
                                {
                                    rule : isNumber(),
                                    message : 'Numeric characters only!'
                                },
                                {
                                    rule : isLength(11),
                                    message : 'Must have 11 digit numbers!'
                                }
                            ]}
                            icon="mobile"
                        />
                    </FormizStep>
                    {/* step 2 form fields */}
                    <FormizStep 
                        name="step2" 
                        className="flex flex-col gap-y-4"
                    >
                        <MyInputField
                            name="register_uname"
                            label="Username"
                            type="text"
                            required="This field is required!"
                            icon="user"
                            autoFocus
                        />
                        <MyInputField 
                            name="register_pass1"
                            label="Password"
                            type="password"
                            required="This field is required!"
                            icon="lock"
                            validations={[
                                {
                                    rule : isMinLength(8),
                                    message : 'Must be at least 8 characters!'
                                },
                            ]}
                        />
                        <MyInputField 
                            name="register_pass2"
                            label="Confirm Password"
                            type="password"
                            required="This field is required!"
                            icon="icon"
                            validations={[
                                {
                                    rule : (value) => myForm.values.register_pass1 === value,
                                    deps : [myForm.values.register_pass1],
                                    message : 'Passwords do not match!'
                                }
                            ]}
                        />
                    </FormizStep>
                    {/* form buttons base from step */}
                    <div className="flex gap-x-3">
                        {
                            myForm.isLastStep ? (
                                <button 
                                    type="submit"
                                    className={`${!myForm.isValid && myForm.isStepSubmitted ? 'cursor-not-allowed opacity-50' : ''} form-btn w-28 color-transition`}
                                    disabled={!myForm.isValid && myForm.isStepSubmitted}
                                >Register</button>
                            ) : (
                                <button 
                                    type="submit"
                                    className={`${!myForm.isStepValid && myForm.isStepSubmitted ? 'cursor-not-allowed opacity-50' : ''} form-btn w-28 color-transition`}
                                    disabled={!myForm.isStepValid && myForm.isStepSubmitted}
                                >Next</button>
                            )
                        }
                        {
                            !myForm.isFirstStep && (
                            <button 
                                type="button"
                                className="font-bold px-5 py-2 flex items-center gap-x-1 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 rounded-sm focus:outline-none text-teal-700 color-transition"
                                onClick={myForm.prevStep}
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-5 w-5 text-current" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                                </svg>
                                Back
                            </button>
                        )}
                    </div>
                    <div className="flex items-center gap-x-1 text-sm mt-5">
                        <p>Already have an account?</p>
                        <Link href="/login" passHref>
                            <a className="font-medium text-teal-800">Login</a>
                        </Link>
                    </div>
                </form>
            </Formiz>
            </div>
        </div>
    )
}
