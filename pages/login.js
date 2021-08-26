import authStyles from '../styles/Auth.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import AuthErrorIcon from '../components/AuthErrorIcon'
import { useRouter } from 'next/router'
import jwt_decode from 'jwt-decode'
import Cookies2 from 'universal-cookie'
import Cookies from 'js-cookie'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function login() {
    const router = useRouter()
    const { register, handleSubmit, formState : { errors } } = useForm()
    const cookies = new Cookies2()
    const onSubmit = async (data) => {
        const formData = new FormData()
        formData.append('username', data.login_uname)
        formData.append('password', data.login_pass)
        axios({
            method : 'POST',
            url : 'http://localhost:8000/api/token/',
            headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
            data : formData
        })
        .then((response) => {
            const jwt_token = response.data.access
            let decoded_token = jwt_decode(jwt_token)
            cookies.set('jwt', jwt_token, [
                { httpOnly : true }
            ])
            axios({
                method : 'GET',
                url : `http://localhost:8000/account/${decoded_token.user_id}`,
                headers : {'Authorization' : 'Bearer'+' '+ jwt_token}
            })
            .then((response) => {
                localStorage.setItem('id', response.data.id.toString())
                localStorage.setItem('username', response.data.username)
                localStorage.setItem('role', response.data.role)
                router.push(`/${response.data.role}`)
            })
            .catch((error) => {
                Swal.fire({
                    icon : 'error',
                    title: 'Error',
                    text: `${error.response}`,
                    showCloseButton: true,
                    confirmButtonColor: '#DB2777',
                })
                console.log(error.response)
            })
        })
        .catch((error) => {
            Swal.fire({
                    icon : 'error',
                    title: 'Login Error',
                    text: `Invalid login credentials!`,
                    showCloseButton: true,
                    confirmButtonColor: '#DB2777',
            })
            console.log(error.response)
        })
    }
    return (
        <div className="relative w-full h-screen bg-gray-200 flex justify-center items-center font-mont text-gray-800 overflow-hidden">
            <Link href="/">
                <a className="absolute top-5 left-10 text-2xl font-source font-black">ACE</a>
            </Link>
            <div className="w-custom1 h-4/5 bg-white rounded-xl shadow-sm border-b border-gray-200 grid grid-cols-2">
                <div className="col-start-1 flex flex-col justify-center items-center">
                    <form
                        onSubmit={ handleSubmit(onSubmit) }
                        className="flex flex-col gap-y-4"
                    >
                        <div className="flex flex-col items-center mb-2">
                            <h4 className="text-2xl font-black font-source">Welcome Back!</h4>
                            <p className="text-sm">Login account credentials to proceed.</p>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label className="text-sm font-bold">Username</label>
                            <div className="flex gap-x-1 px-2 py-1 items-center border border-gray-300 focus-within:border-gray-600 rounded-lg">
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
                                    className="flex-1 px-0 py-0 border-transparent focus:outline-none focus:ring-transparent focus:border-transparent text-sm"
                                    id="login_uname"
                                    autoComplete="off"
                                    autoFocus
                                    { ...register("login_uname", { required : "Username cannot be empty!" }) }
                                />
                            </div>
                            { 
                                errors.login_uname && 
                                <div className="flex items-center gap-x-1 text-red-500">
                                    <AuthErrorIcon />
                                    <p className="text-xs">{ errors.login_uname.message }</p>
                                </div> 
                            }
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label className="text-sm font-bold">Password</label>
                            <div className="flex gap-x-1 px-2 py-1 items-center border border-gray-300 focus-within:border-gray-600 rounded-lg">
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
                                    className="flex-1 px-0 py-0 border-transparent focus:outline-none focus:ring-transparent focus:border-transparent text-sm"
                                    id="login_pass"
                                    autoComplete="off"
                                    { ...register("login_pass", { required : "Password cannot be empty!" }) }
                                />
                            </div>
                            { 
                                errors.login_pass && 
                                <div className="flex items-center gap-x-1 text-red-500">
                                    <AuthErrorIcon />
                                    <p className="text-xs">{ errors.login_pass.message }</p>
                                </div> 
                            }
                        </div>
                        <button 
                            className="px-5 py-2 bg-gradient-to-r bg-pink-600 hover:bg-pink-500 color-transition rounded-lg text-white font-bold text-base tracking-wide"
                        >Login</button>
                        <div className="flex items-center gap-x-1 text-sm mt-2">
                            <p>Don't have an account?</p>
                            <Link href="/register" passHref>
                                <a className="font-medium text-pink-600">Register</a>
                            </Link>
                        </div>
                    </form>
                </div>
                <div className="col-start-2 bg-login-img bg-cover bg-center rounded-tr-xl rounded-br-xl"></div>
            </div>
        </div>
    )
}
