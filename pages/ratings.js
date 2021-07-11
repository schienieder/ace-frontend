import React from 'react'
import { Formiz, FormizStep, useForm } from '@formiz/core'
import MyInputField from '../components/MyInputField'

export default function ratings() {
    const myForm = useForm() // call useForm
    return (
        <div className="min-h-screen w-full bg-gray-100 flex flex-col justify-center items-center gap-y-5 font-mont text-gray-800">
            <div className="card flex flex-col gap-y-5">
                <Formiz
                    connect={myForm}
                >
                    <form
                        onSubmit={myForm.submitStep}
                        className="w-full flex flex-col gap-y-5"
                    >
                        <h4 className="text-xl font-bold">Event Feedback</h4>
                        <FormizStep
                            name="step1"
                            className="max-w-lg flex flex-col gap-y-8"
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
                            <div className="flex gap-x-5">
                                <MyInputField
                                    name="rating_fname"
                                    label="First Name"
                                    type="text"
                                    required="This field is required!"
                                    autoFocus
                                />
                                <MyInputField 
                                    name="rating_lname"
                                    label="Last Name"
                                    type="text"
                                    required="This field is required!"
                                />
                            </div>
                            <div className="flex gap-x-5">
                                <MyInputField
                                    name="rating_event_type"
                                    label="Event Type"
                                    type="text"
                                    required="This field is required!"
                                    autoFocus
                                />
                                <MyInputField 
                                    name="rating_event_name"
                                    label="Event Name"
                                    type="text"
                                    required="This field is required!"
                                />
                            </div>
                            <div className="flex gap-x-5">
                                <MyInputField
                                    name="rating_event_role"
                                    label="Role in the Event"
                                    type="text"
                                    required="This field is required!"
                                />
                                <MyInputField 
                                    name="rating_event_date"
                                    label="Event Date"
                                    type="text"
                                    required="This field is required!"
                                />
                            </div>
                        </FormizStep>
                        <FormizStep
                            name="step3"
                            className="max-w-lg flex flex-col gap-y-8"
                        >
                            <div className="flex gap-x-5">
                                <div className="flex flex-col gap-y-1">
                                    <label className="inputFieldLabel">Venue</label>
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
                                    <label className="inputFieldLabel">Event Styling / Set-Up</label>
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
                                    <label className="inputFieldLabel">Light, Sound Effect & Audio Visual</label>
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
                                    <label className="inputFieldLabel">Catering Services</label>
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
                                    <label className="inputFieldLabel">Photo & Video</label>
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
                                    <label className="inputFieldLabel">Wardrobe / Make-Up</label>
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
                        <FormizStep
                            name="step4"
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
                                        className={`${!myForm.isValid && myForm.isStepSubmitted ? 'cursor-not-allowed opacity-50' : ''} form-btn w-28 color-transition`}
                                        disabled={!myForm.isValid && myForm.isStepSubmitted}
                                    >Finish</button>
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
