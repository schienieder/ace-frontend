import React, { useEffect } from 'react'
import TopNav from '../../../components/admin/TopNav'
import SideNav from '../../../components/admin/SideNav'
import Footer from '../../../components/admin/Footer'
import PageHeader from '../../../components/admin/PageHeader'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import Board from 'react-trello'
const data = {
    lanes: [
        {
        id: 'lane1',
        title: 'Available Tasks',
        cards: [
            {id: 'Card1', title: 'Client Interview', description: 'Assigned to: Miakabudo Sewane'},
            {id: 'Card2', title: 'Wedding Pictorial', description: 'Assigned to: Abdhul Dominador'},
            {id: 'Card3', title: 'Taste Testing', description: 'Assigned to: Pepito Manaloto'},
        ],
        style : {
            backgroundColor : "#ffffff"
        }
        },
        {
            id: 'lane2',
            title: 'In Progress',
            cards: [],
            style : {
                backgroundColor : "#ffffff"
            }
        },
        {
        id: 'lane3',
        title: 'Completed',
        cards: [],
        style : {
            backgroundColor : "#ffffff"
        }
        },
    ]
}

export default function tasks() {
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
                response.data.role !== 'admin' ? router.push('/login') : ''
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
            <SideNav isActive="events" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav />
                <div className="row-start-2 w-full h-full bg-gray-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Mr. & Mrs Delos Reyes Wedding" />
                        <Board
                            className="w-full grid grid-cols-3"
                            style={{
                                backgroundColor : "transparent",
                                padding : 0
                            }}
                            cardStyle={{
                                backgroundColor: '#F5F5F5',
                            }}
                            data={ data } 
                            editable
                        />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
