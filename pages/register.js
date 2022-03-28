import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import authStyles from '../styles/Auth.module.css'
import { Formiz, FormizStep, useForm } from '@formiz/core'
import { isEmail, isLength, isMinLength, isNumber, } from '@formiz/validations'
import MyInputField from '../components/MyInputField'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

export default function register() {
    const api = process.env.NEXT_PUBLIC_DRF_API
    const router = useRouter()
    const myForm = useForm() // call useForm
    const handleSubmit = async (data) => {
        await fetch(`${api}register/`, {
            method : "POST",
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                first_name : data.register_fname,
                last_name : data.register_lname,
                mobile_number : data.register_mobile,
                email : data.register_email,
                username : data.register_uname,
                password : data.register_pass1,
                role : "client"
            })
        }).then( async (response) => {
            if (!response.ok) {
                throw new Error('Credentials already exists!')
            }
        }).then(async () => {
            await Swal.fire({
                icon : 'success',
                title: 'Regristration Successsful',
                timer : 3000,
                text: `Account ${data.register_uname} successfully registered!`,
                showCloseButton: true,
                confirmButtonColor: '#DB2777',
            })
            await router.push('/login')
        }).catch(async (error) => {
            await Swal.fire({
                icon : 'error',
                title: 'Registration Error',
                timer : 3000,
                text: error,
                showCloseButton: true,
                confirmButtonColor: '#DB2777',
            })
        })
    }
    return (
        <div className="relative w-full h-screen bg-gray-200 flex justify-center items-center font-mont text-gray-800 overflow-hidden">
            <nav className="absolute w-full top-0 py-5 px-5 md:px-10 flex justify-between items-center">
                <Link href="/">
                    <div className="flex items-center gap-x-3 cursor-pointer">
                        <div className="hidden md:block">
                            <Image 
                                src="/images/logo.svg"
                                width={ 50 }
                                height={ 50 }
                                alt="Logo"
                            />
                        </div>
                        <div className="block md:hidden">
                            <Image 
                                src="/images/logo.svg"
                                width={ 45 }
                                height={ 45 }
                                alt="Logo"
                            />
                        </div>
                        <h4 className="text-2xl font-source font-black">Marahuyo</h4>
                    </div>
                </Link>
                <div className="hidden md:flex gap-x-3 text-gray-600">
                    <Link href="/login">
                        <a className="text-base font-medium hover:text-pink-600 color-transition cursor-pointer">Login</a>
                    </Link>
                    <div className="border-r border-gray-600"></div>
                    <Link href="/register">
                        <a className="text-base font-medium hover:text-pink-600 color-transition cursor-pointer">Register</a>
                    </Link>
                </div>
            </nav>
            <div className={`w-custom1 ${ authStyles.authCardHeight } bg-white rounded-xl shadow-sm border-b border-gray-200 grid grid-cols-1 md:grid-cols-2`}>
                <div className="col-start-2 md:col-start-1 bg-register-img bg-cover bg-center rounded-tl-xl rounded-bl-xl"></div>
                <div className="col-start-1 md:col-start-2 flex flex-col justify-center items-center">
                    <Formiz
                        connect={ myForm }
                        onSubmit={ handleSubmit }
                    >
                        <form
                            noValidate
                            onSubmit={myForm.submitStep} 
                            className="flex flex-col gap-y-4"
                        >
                            <div className="flex flex-col items-center mb-2">
                                <h4 className="text-2xl font-black font-source">Book Now!</h4>
                                <p className="text-sm">Complete registration to book an event.</p>
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
                            </FormizStep>
                            <FormizStep 
                                name="step2"
                                className="flex flex-col gap-y-4"
                            >
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
                                    autoFocus
                                />
                                <MyInputField 
                                    name="register_email"
                                    label="Email Address"
                                    type="email"
                                    required="This field is required!"
                                    validations={[
                                        {
                                            rule : isEmail(),
                                            message : 'This is not a valid email!'
                                        }
                                    ]}
                                    
                                    icon="email"
                                />
                            </FormizStep>
                            {/* step 3 form fields */}
                            <FormizStep 
                                name="step3" 
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
                                            rule : isMinLength(12),
                                            message : 'Must be at least 12 characters!'
                                        },
                                    ]}
                                />
                            </FormizStep>
                            {
                                myForm.isLastStep ? (
                                    <button
                                        type="submit" 
                                        className={`${!myForm.isValid && myForm.isStepSubmitted ? 'cursor-not-allowed opacity-50' : ''} px-5 py-2 bg-pink-600 hover:bg-pink-500 color-transition rounded-lg text-white font-bold text-base tracking-wide focus:outline-none`}
                                        disabled={!myForm.isValid && myForm.isStepSubmitted}
                                    >Submit</button>
                                ) : (
                                    <button 
                                        className={`${!myForm.isStepValid && myForm.isStepSubmitted ? 'cursor-not-allowed opacity-50' : ''} px-5 py-2 bg-pink-600 hover:bg-pink-500 color-transition rounded-lg text-white font-bold text-base tracking-wide focus:outline-none`}
                                        disabled={!myForm.isStepValid && myForm.isStepSubmitted}
                                    >Next</button>
                                )
                            }
                            {
                                !myForm.isFirstStep && (
                                <button 
                                    type="button"
                                    className="px-5 py-2 bg-gray-100 hover:bg-gray-200 color-transition rounded-lg text-pink-600 font-bold text-base tracking-wide focus:outline-none"
                                    onClick={myForm.prevStep}
                                >Previous</button>
                            )}
                            <div className="flex items-center gap-x-1 text-sm mt-2">
                                <p>Already have an account?</p>
                                <Link href="/login" passHref>
                                    <a className="font-medium text-pink-600">Login</a>
                                </Link>
                            </div>
                        </form>
                    </Formiz>
                </div>
            </div>
        </div>
    )
}
