import React, { useState, useEffect } from 'react'
import TopNav from '../../../components/admin/TopNav'
import SideNav from '../../../components/admin/SideNav'
import Footer from '../../../components/Footer'
import PageHeader from '../../../components/PageHeader'
import { useRouter } from 'next/router'
import moment from 'moment'
import adminStyles from '../../../styles/Admin.module.css'

export default function event({  }) {
    const router = useRouter()
    const [userName, setUsername] = useState()
    const readRole = () => {
        setUsername(localStorage.getItem('username'))
        const role = localStorage.getItem('role')
        if (role !== 'admin') {
            router.push('/login')
        }
    }
    useEffect(() => {
        readRole()
    }, [])
    return (
        <>
        <div className='z-10 fixed w-full py-3 px-14 bg-white flex flex-col font-mont text-gray-800'>
            <button className='self-end hover:text-gray-600 flex gap-x-1'>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <p className='font-bold'>Print</p>
            </button>
        </div>
        <div className='w-full h-screen flex flex-col items-center bg-gray-200 p-20'>
            <div className="card w-2/3 flex flex-col gap-y-5">
                <div className='flex w-full h-28 overflow-hidden'>
                    <img 
                        src="/images/Email Image.png"
                        className='max-w-full h-auto self-center'
                        alt="Banner Image"
                    />
                </div>
                <div className='mt-10'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius laudantium inventore quae exercitationem debitis 
                    minus itaque nihil nam autem fuga. Consectetur nihil quisquam tempora? Neque architecto repellendus sunt tempore 
                    totam? Quae corporis alias animi, tempore quos quidem, eligendi, veniam perspiciatis voluptatum itaque dolorem 
                    consequuntur doloribus! Veniam dignissimos, est iste nostrum vitae vel incidunt, quia odio, explicabo eius unde 
                    dolore sit.
                </div>
            </div>
        </div>
        </>
    )
}

// export const getServerSideProps = async ({ req, query }) => {
//     const api = process.env.NEXT_PUBLIC_DRF_API
//     const { event_id } = query
//     const jwt = req.cookies.jwt
//     const res1 = await fetch(`${api}event/${event_id}`, {
//         method : 'GET',
//         headers : {'Authorization' : 'Bearer'+' '+jwt}
//     })
//     const data1 = await res1.json()
//     const res2 = await fetch(`${api}admin_client/${data1.client}`, {
//         method : 'GET',
//         headers : {'Authorization' : 'Bearer'+' '+jwt}
//     })
//     const data2 = await res2.json()
//     return {
//         props : {
//             eventInfo : data1,
//             clientInfo : data2,
//         }
//     }
// }