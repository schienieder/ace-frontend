import React, { useState, useEffect } from 'react'
import TopNav from '../../../components/admin/TopNav'
import SideNav from '../../../components/admin/SideNav'
import Footer from '../../../components/Footer'
import PageHeader from '../../../components/PageHeader'
import { useRouter } from 'next/router'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import mapStyles from '../../../mapStyles'
import BeatLoader from "react-spinners/BeatLoader";
import ReactMapGL from 'react-map-gl';

export default function locations() {
    const router = useRouter()
    const [userName, setUsername] = useState()
    const [viewport, setViewport] = useState({
        height : "100%",
        width : "100%",
        latitude: 7.448212,
        longitude: 125.809425,
        zoom: 8
    });
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
                        <PageHeader text="Event Locations">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-7 w-7 text-current" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </PageHeader>
                        <div className="card w-full h-screen">
                        <ReactMapGL 
                            {...viewport}
                            onViewportChange={nextViewport => setViewport(nextViewport)}
                            mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                        />
                        </div>
                        {/* {
                            !isLoaded ? (
                                <BeatLoader 
                                    color="#DB2777" 
                                    css={override} 
                                    size={35} 
                                />
                            ) : (
                                <div className="card w-full h-screen">
                                {
                                    !loadError ? (
                                        <GoogleMap 
                                            mapContainerStyle={ mapContainerStyle }
                                            zoom={ 10 }
                                            center={ center }
                                            options={ options }
                                        ></GoogleMap>
                                    ) : (
                                        <div className="flex gap-x-3">
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className="h-7 w-7 text-red-600" 
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <h4 className="text-xl font-bold dark:text-gray-300">Error Loading Maps</h4>
                                        </div>
                                    )
                                }
                            </div>
                            )
                        } */}
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
