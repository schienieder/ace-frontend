import React, { useState, useCallback, useEffect } from 'react'
import SideNav from '../../components/client/SideNav'
import TopNav from '../../components/client/TopNav'
import Footer from '../../components/client/Footer'
import PageHeader from '../../components/client/PageHeader'
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

const data = [
    { name: "Finished Tasks", value: 80 },
    { name: "Unfinished Tasks", value: 20 }
];
const COLORS = ["#0F766E", "#F59E0B"];

export default function event() {
    const router = useRouter()
    const axios = require('axios')
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
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="event" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav />
                <div className="row-start-2 w-full h-full bg-gray-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Event Progress" />
                        <div className="card w-full grid grid-cols-2 justify-center place-items-center">
                            <div className="col-start-1 w-full">
                                <h4 className="text-base font-bold">Angel Malabarbas - A Decade & Eight</h4>
                                <PieChart width={800} height={400}>
                                    <Pie
                                        data={data}
                                        cx={200}
                                        outerRadius={150}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={true}
                                        labelLine={false}
                                        la
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </div>
                            <div className="col-start-2 w-full flex flex-col gap-y-5">
                                <div className="flex flex-col gap-y-2">
                                    <p className="text-sm font-bold">Finished Task(s):</p>
                                    <p className="text-xs">- Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    <p className="text-xs">- Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    <p className="text-xs">- Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    <p className="text-xs">- Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    <p className="text-xs">- Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </div>
                                <div className="flex flex-col gap-y-2">
                                    <p className="text-sm font-bold">Unfinished Task(s):</p>
                                    <p className="text-xs">- Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    <p className="text-xs">- Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    <p className="text-xs">- Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    <p className="text-xs">- Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    <p className="text-xs">- Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
