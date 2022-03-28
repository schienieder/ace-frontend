import React, { useState, useEffect } from 'react'
import TopNav from '../../components/admin/TopNav'
import SideNav from '../../components/admin/SideNav'
import Footer from '../../components/Footer'
import PageHeader from '../../components/PageHeader'
import VenueForecast from '../../components/admin/reports/VenueForecast'
import CateringForecast from '../../components/admin/reports/CateringForecast'
import StylingForecast from '../../components/admin/reports/StylingForecast'
import MCForecast from '../../components/admin/reports/MCForecast'
import PresentationForecast from '../../components/admin/reports/PresentationForecast'
import CoutesyForecast from '../../components/admin/reports/CourtesyRate'
import { useRouter } from 'next/router'

export default function reports({ venueForecast, cateringForecast, stylingForecast, mcForecast, presentationForecast, courtesyForecast }) {
    
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
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="reports" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto overflow-x-hidden">
                <TopNav username={ userName } />
                <div className="row-start-2 w-full h-full bg-true-100">
                    <div className="p-8 flex flex-col gap-y-8 min-h-screen">
                        <PageHeader text="Satisfaction Forecast">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-7 w-7 text-current"
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </PageHeader>
                        <h4 className="text-base font-bold">Client Satisfaction Forecast</h4>
                        <VenueForecast data={ venueForecast } />
                        <CateringForecast data={ cateringForecast } />
                        <StylingForecast data={ stylingForecast } />
                        <MCForecast data={ mcForecast } />
                        <PresentationForecast data={ presentationForecast } />
                        <CoutesyForecast data={ courtesyForecast } />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({ req }) => {
    const api = process.env.NEXT_PUBLIC_DRF_API
    const token = req.cookies.jwt
    const res1 = await fetch(`${api}venue_forecast/`,{
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data1 = await res1.json()
    const res2 = await fetch(`${api}catering_forecast/`,{
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data2 = await res2.json()
    const res3 = await fetch(`${api}styling_forecast/`,{
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data3 = await res3.json()
    const res4 = await fetch(`${api}mc_forecast/`,{
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data4 = await res4.json()
    const res5 = await fetch(`${api}presentation_forecast/`,{
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data5 = await res5.json()
    const res6 = await fetch(`${api}coutesy_forecast/`,{
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data6 = await res6.json()
    return {
        props : {
            venueForecast : data1,
            cateringForecast : data2,
            stylingForecast : data3,
            mcForecast : data4,
            presentationForecast : data5,
            courtesyForecast : data6
        }
    }
}