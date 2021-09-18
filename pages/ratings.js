import React from 'react'
import { Formiz, FormizStep, useForm } from '@formiz/core'
import MyInputField from '../components/MyInputField'
import Link from 'next/link'
import Image from 'next/image'
import PageHeader from '../components/PageHeader'

export default function ratings() {
    const myForm = useForm() // call useForm
    return (
        <div className="relative min-h-screen w-full bg-gray-100 flex flex-col justify-center items-center gap-y-5 font-mont text-gray-800">
            <nav 
                className="w-full absolute flex items-center justify-between top-0 px-10 py-5 font-mont text-gray-800"
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
                    <Link href="/">
                        <a 
                            className="flex items-center gap-x-1 cursor-pointer"
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
                        </a>
                    </Link>
                </div>
            </nav>
            <div className="flex flex-col gap-y-5">
                <PageHeader text="Event Feedback">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-7 w-7 text-current" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                </PageHeader>
                <Formiz
                    connect={myForm}
                >
                    <form
                        onSubmit={myForm.submitStep}
                        className="w-full flex flex-col gap-y-5"
                    >
                        <FormizStep
                            name="step1"
                            className="card max-w-lg flex flex-col gap-y-8"
                        >
                            <div className="flex flex-wrap">
                                Thank you for having your event with us! We hope your event was a huge success.
                                Alas Creative Events goal is to provide exceptional service to our clientele and guests.
                                We hope you had as much fun attending as we did our very best organizing it.
                            </div>
                            <div className="flex flex-wrap">
                                Please take a few moments to provide us with your feedback 
                                so that we can continuously improve our services and exceed our guest's expectations 
                                (your answers will be much appreciated).
                            </div>
                        </FormizStep>
                        <FormizStep
                            name="step2"
                            className="max-w-lg flex flex-col gap-y-8"
                        >
                            <div className="card w-full flex flex-col gap-y-5">
                                <h4 className="text-base font-bold">Venue</h4>
                                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed dolor sollicitudin, molestie lectus vitae, tristique neque.</p>
                                <select
                                    className="inputSelect rounded-lg"
                                >
                                    <option value="5">Excellent</option>
                                    <option value="4">Great</option>
                                    <option value="3">Good</option>
                                    <option value="2">Bad</option>
                                    <option value="1">Worst</option>
                                </select>
                            </div>
                            <div className="card w-full flex flex-col gap-y-5">
                                <h4 className="text-base font-bold">Catering</h4>
                                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed dolor sollicitudin, molestie lectus vitae, tristique neque.</p>
                                <select
                                    className="inputSelect rounded-lg"
                                >
                                    <option value="5">Excellent</option>
                                    <option value="4">Great</option>
                                    <option value="3">Good</option>
                                    <option value="2">Bad</option>
                                    <option value="1">Worst</option>
                                </select>
                            </div>
                            <div className="card w-full flex flex-col gap-y-5">
                                <h4 className="text-base font-bold">Styling</h4>
                                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed dolor sollicitudin, molestie lectus vitae, tristique neque.</p>
                                <select
                                    className="inputSelect rounded-lg"
                                >
                                    <option value="5">Excellent</option>
                                    <option value="4">Great</option>
                                    <option value="3">Good</option>
                                    <option value="2">Bad</option>
                                    <option value="1">Worst</option>
                                </select>
                            </div>
                            <div className="card w-full flex flex-col gap-y-5">
                                <h4 className="text-base font-bold">MC</h4>
                                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed dolor sollicitudin, molestie lectus vitae, tristique neque.</p>
                                <select
                                    className="inputSelect rounded-lg"
                                >
                                    <option value="5">Excellent</option>
                                    <option value="4">Great</option>
                                    <option value="3">Good</option>
                                    <option value="2">Bad</option>
                                    <option value="1">Worst</option>
                                </select>
                            </div>
                            <div className="card w-full flex flex-col gap-y-5">
                                <h4 className="text-base font-bold">Presentation</h4>
                                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed dolor sollicitudin, molestie lectus vitae, tristique neque.</p>
                                <select
                                    className="inputSelect rounded-lg"
                                >
                                    <option value="5">Excellent</option>
                                    <option value="4">Great</option>
                                    <option value="3">Good</option>
                                    <option value="2">Bad</option>
                                    <option value="1">Worst</option>
                                </select>
                            </div>
                            <div className="card w-full flex flex-col gap-y-5">
                                <h4 className="text-base font-bold">Courtesy</h4>
                                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed dolor sollicitudin, molestie lectus vitae, tristique neque.</p>
                                <select
                                    className="inputSelect rounded-lg"
                                >
                                    <option value="5">Excellent</option>
                                    <option value="4">Great</option>
                                    <option value="3">Good</option>
                                    <option value="2">Bad</option>
                                    <option value="1">Worst</option>
                                </select>
                            </div>
                        </FormizStep>
                        <FormizStep
                            name="step3"
                            className="max-w-lg flex flex-col gap-y-8"
                        >
                            <div className="flex gap-x-5">
                                <div className="flex flex-col gap-y-1">
                                    <label className="inputFieldLabel">Courtesy & Helpfulness</label>
                                    <select
                                        className="inputSelect"
                                    >
                                        <option value="Excellent">Excellent</option>
                                        <option value="Very Good">Very Good</option>
                                        <option value="Good">Good</option>
                                        <option value="Fair">Fair</option>
                                        <option value="Poor">Poor</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-y-1">
                                    <label className="inputFieldLabel">Overall Service Rating?</label>
                                    <select
                                        className="inputSelect"
                                    >
                                        <option value="Excellent">Excellent</option>
                                        <option value="Very Good">Very Good</option>
                                        <option value="Good">Good</option>
                                        <option value="Fair">Fair</option>
                                        <option value="Poor">Poor</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-x-5">
                                <div className="flex flex-col gap-y-1">
                                    <label className="inputFieldLabel">How satisfied were you as client, guest or attendee?</label>
                                    <select
                                        className="inputSelect"
                                    >
                                        <option value="Excellent">Excellent</option>
                                        <option value="Very Good">Very Good</option>
                                        <option value="Good">Good</option>
                                        <option value="Fair">Fair</option>
                                        <option value="Poor">Poor</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-y-1">
                                    <label className="inputFieldLabel">Overall, how will you rate your event with us?</label>
                                    <select
                                        className="inputSelect"
                                    >
                                        <option value="Excellent">Excellent</option>
                                        <option value="Very Good">Very Good</option>
                                        <option value="Good">Good</option>
                                        <option value="Fair">Fair</option>
                                        <option value="Poor">Poor</option>
                                    </select>
                                </div>
                            </div>
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
