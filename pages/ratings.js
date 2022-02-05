import React from 'react'
import { Formiz, FormizStep, useForm } from '@formiz/core'
import MyInputField from '../components/MyInputField'
import MySelectField from '../components/MySelectField'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from "next/router"
import axios from 'axios'
import Swal from 'sweetalert2'

export default function ratings() {
    const api = process.env.NEXT_PUBLIC_DRF_API
    const myForm = useForm() // call useForm
    const handleSubmit = (data) => {
        axios({
            method : "POST",
            url : `${api}add_rating/`,
            data : {
                event_name : data.rating_event,
                event_date : data.rating_date,
                venue_rate : data.rating_venue,
                catering_rate : data.rating_catering,
                styling_rate : data.rating_styling,
                mc_rate : data.rating_mc,
                presentation_rate : data.rating_presentation,
                courtesy_rate : data.rating_courtesy
            }
        })
        .then(() => {
            Swal.fire({
                icon : 'success',
                title: 'Thank You',
                timer : 3000,
                text: `You rating for ${data.rating_event} has been successful!`,
                showCloseButton: true,
                confirmButtonColor: '#DB2777',
            })
            setTimeout(() => router.push('/'), 3000)
        })
        .catch((error) => {
            Swal.fire({
                icon : 'error',
                title: 'Rating Error',
                timer : 3000,
                text: error,
                showCloseButton: true,
                confirmButtonColor: '#DB2777',
            })
        })
    }
    const router = useRouter()
    return (
            <div className="w-full min-h-screen grid grid-rows-ratings-layout font-mont text-gray-800 bg-true-100">
            <nav 
                className="row-start-1 w-full flex items-center justify-between top-0 px-10 py-5 font-mont text-gray-800"
            >
                <Link href="/">
                    <div className="flex items-center gap-x-3 cursor-pointer">
                        <Image 
                            src="/images/logo.svg"
                            width={ 50 }
                            height={ 50 }
                            alt="Logo"
                        />
                        <h4 className="text-2xl font-source font-black">Marahuyo</h4>
                    </div>
                </Link>
                <div className="flex items-center gap-x-8 text-gray-500 hover:text-pink-600 color-transition z-10">
                    <button 
                        className="flex items-center gap-x-1 cursor-pointer"
                        onClick={ () => router.back() }
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-6 w-6 text-current" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        <p className="text-base font-medium">Back</p>
                    </button>
                </div>
            </nav>
            <div className="row-start-2 w-full flex flex-col justify-center items-center gap-y-5 p-8">
                <div className="flex items-center gap-x-2 w-custom-textarea">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-7 w-7 text-current" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    <h4 className="text-xl font-bold dark:text-gray-300">Event Feedback</h4>
                </div>
                <Formiz
                    connect={myForm}
                    onSubmit={ handleSubmit }
                >
                    <form
                        noValidate
                        onSubmit={myForm.submitStep}
                        className="flex flex-col gap-y-5"
                    >
                        <FormizStep
                            name="step1"
                            className="w-custom-textarea flex flex-col gap-y-8"
                        >
                            <div className='w-full card flex flex-col gap-y-5'>
                                <div className="flex flex-wrap text-sm">
                                    Thank you for having your event with us! We hope your event was a huge success.
                                    Alas Creative Events goal is to provide exceptional service to our clientele and guests.
                                    We hope you had as much fun attending as we did our very best organizing it.
                                </div>
                                <div className="flex flex-wrap text-sm">
                                    Please take a few moments to provide us with your feedback 
                                    so that we can continuously improve our services and exceed our guest's expectations 
                                    (your answers will be much appreciated).
                                </div>
                            </div>
                            <div className='w-full card'>
                                <MyInputField
                                    name="rating_event"
                                    label="What was the name of the event?"
                                    type="text"
                                    required="This field is required!"
                                    autoFocus
                                />
                            </div>
                            <div className='w-full card'>
                                <MyInputField 
                                    name="rating_date"
                                    label="What was the date of the event?"
                                    type="date"
                                    required="This field is required!"
                                />
                            </div>
                        </FormizStep>
                        <FormizStep
                            name="step2"
                            className="w-custom-textarea flex flex-col gap-y-8"
                        >
                            <MySelectField 
                                id="rating_venue"
                                name="rating_venue"
                                label="Venue" 
                                description="How would you rate the venue?"
                                autoFocus
                                required="This field is required!"
                            >
                                <option disabled></option>
                                <option value="5">Very Satisfied</option>
                                <option value="4">Satisfied</option>
                                <option value="3">Neutral</option>
                                <option value="2">Not Satisfied</option>
                                <option value="1">Very Dissatisfied</option>
                            </MySelectField>
                            <MySelectField 
                                id="rating_catering"
                                name="rating_catering"
                                label="Catering" 
                                description="How was the catering services of the event?"
                                required="This field is required!"
                            >
                                <option disabled></option>
                                <option value="5">Very Satisfied</option>
                                <option value="4">Satisfied</option>
                                <option value="3">Neutral</option>
                                <option value="2">Not Satisfied</option>
                                <option value="1">Very Dissatisfied</option>
                            </MySelectField>
                            <MySelectField 
                                id="rating_styling"
                                name="rating_styling"
                                label="Styling" 
                                description="What did you feel with the styling of the event?"
                                required="This field is required!"
                            >
                                <option disabled></option>
                                <option value="5">Very Satisfied</option>
                                <option value="4">Satisfied</option>
                                <option value="3">Neutral</option>
                                <option value="2">Not Satisfied</option>
                                <option value="1">Very Dissatisfied</option>
                            </MySelectField>
                        </FormizStep>
                        <FormizStep
                            name="step3"
                            className="w-custom-textarea flex flex-col gap-y-8"
                        >
                            <MySelectField 
                                id="rating_mc"
                                name="rating_mc"
                                label="MC" 
                                description="How would you rate the event MC?"
                                autoFocus
                                required="This field is required!"
                            >
                                <option disabled></option>
                                <option value="5">Excellent</option>
                                <option value="4">Great</option>
                                <option value="3">Fine</option>
                                <option value="2">Bad</option>
                                <option value="1">Worst</option>
                            </MySelectField>
                            <MySelectField 
                                id="rating_presentation"
                                name="rating_presentation"
                                label="Styling" 
                                description="What is your impression with the event presentation?"
                                required="This field is required!"
                            >
                                <option disabled></option>
                                <option value="5">Very Satisfied</option>
                                <option value="4">Satisfied</option>
                                <option value="3">Neutral</option>
                                <option value="2">Not Satisfied</option>
                                <option value="1">Very Dissatisfied</option>
                            </MySelectField>
                            <MySelectField 
                                id="rating_courtesy"
                                name="rating_courtesy"
                                label="Courtesy" 
                                description="How was the show of courtesy of the event organizers and staffs?"
                                required="This field is required!"
                            >
                                <option disabled></option>
                                <option value="5">Excellent</option>
                                <option value="4">Great</option>
                                <option value="3">Fine</option>
                                <option value="2">Bad</option>
                                <option value="1">Worst</option>
                            </MySelectField>
                        </FormizStep>
                        <div className="flex gap-x-3">
                            {
                                myForm.isLastStep ? (
                                    <button 
                                        type="submit"
                                        className={`${!myForm.isValid && myForm.isStepSubmitted ? 'cursor-not-allowed opacity-50' : ''} commonBtn color-transition`}
                                        disabled={!myForm.isValid && myForm.isStepSubmitted}
                                    >Finish</button>
                                ) : (
                                    <button 
                                        type="submit"
                                        className={`${!myForm.isStepValid && myForm.isStepSubmitted ? 'cursor-not-allowed opacity-50' : ''} commonBtn color-transition`}
                                        disabled={!myForm.isStepValid && myForm.isStepSubmitted}
                                    >Next</button>
                                )
                            }
                            {
                                !myForm.isFirstStep && (
                                <button 
                                    type="button"
                                    className="font-bold px-5 py-2 flex items-center gap-x-1 bg-gray-500 hover:bg-gray-400 focus:bg-gray-400 rounded-lg focus:outline-none text-white color-transition tracking-wide"
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
                        <p className="text-xs">(Step 
                            {' '} 
                            { myForm.currentStep && myForm.currentStep.index + 1 || 0 }
                            {' '} 
                            of 
                            {' '}
                            { myForm.steps.length }
                            )
                        </p>
                    </form>
                </Formiz>
            </div>
        </div>
    )
}
