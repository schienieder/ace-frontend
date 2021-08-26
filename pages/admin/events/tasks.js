import React, { useState, useEffect } from 'react'
import TopNav from '../../../components/admin/TopNav'
import SideNav from '../../../components/admin/SideNav'
import Footer from '../../../components/Footer'
import PageHeader from '../../../components/PageHeader'
import { useRouter } from 'next/router'
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
    const [userName, setUsername] = useState()
    const readRole = () => {
        setUsername(localStorage.getItem('username'))
        const role = localStorage.getItem('role')
        if (role !== 'admin') {
            router.push('/login')
        }
    }
    useEffect( async () => {
        await readRole()
    }, [])
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="events" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav username={ userName } />
                <div className="row-start-2 w-full h-full bg-true-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Mr. & Mrs Delos Reyes Wedding">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-7 w-7 text-current" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                        </PageHeader>
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
