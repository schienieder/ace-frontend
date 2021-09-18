import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import AuthErrorIcon from '../../AuthErrorIcon'
import axios from 'axios'
import Swal from 'sweetalert2'

const PartnerModal = ({ onClose }) => {
    const { register, reset, handleSubmit, formState : { errors } } = useForm()
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
        }).then(() => {
            console.log(data)
            Swal.fire({
                icon : 'success',
                title: 'Regristration Successsful',
                timer : 3000,
                text: `New business partner successfully added!`,
                showCloseButton: true,
                confirmButtonColor: '#DB2777',
            })
            router.push('/admin/partners')
        }).catch((error) => {
            Swal.fire({
                icon : 'error',
                title: 'Regristration Error',
                timer : 3000,
                text: error.message,
                showCloseButton: true,
                confirmButtonColor: '#DB2777',
            })
        })
        reset()
        setIsOpen(false)
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
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-20 overflow-y-auto backdrop-filter backdrop-brightness-50"
                onClose={onClose}
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
                <div className="inline-block w-client-profile-form-container my-8 p-5 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl border-b border-gray-200 rounded-xl">
                    <div className="p-5 border border-gray-300 rounded-xl">
                        
                        <div className="w-full flex justify-end">
                            <button
                                type="button"
                                className="p-2 text-sm font-medium text-gray-400 hover:text-gray-600 color-transition bg-transparent focus:outline-none rounded-full"
                                onClick={onClose}
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

                            <h4 className="text-base font-bold tracking-wide">New Business Partner</h4>

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
                            <div className="flex gap-x-5">

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
                                            { ...register("partner_uname", { required : "This field cannot be empty" }) } 
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
                                            type="password"
                                            { ...register("partner_pass", { required : "This field cannot be empty" }) } 
                                            className="inputField"
                                        />
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
                                    onClick={onClose}
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
    )
}

export default PartnerModal
