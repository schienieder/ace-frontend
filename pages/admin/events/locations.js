import React, { useCallback, useState, useEffect, useRef, useMemo } from 'react'
import TopNav from '../../../components/admin/TopNav'
import SideNav from '../../../components/admin/SideNav'
import Footer from '../../../components/Footer'
import PageHeader from '../../../components/PageHeader'
import { useRouter } from 'next/router'
import BeatLoader from "react-spinners/BeatLoader"
import "mapbox-gl/dist/mapbox-gl.css"
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css"
import ReactMapGL, { Marker,FlyToInterpolator } from 'react-map-gl'
import Geocoder from "react-map-gl-geocoder"
import Image from 'next/image'


export default function locations({ eventsList, centerLat, centerLong }) {
    const router = useRouter()
    const [userName, setUsername] = useState()
    const [viewport, setViewport] = useState({
        height : "100%",
        width : "100%",
        latitude: centerLat ? parseFloat(centerLat) : 7.448212,
        longitude: centerLong ? parseFloat(centerLong) : 125.809425,
        zoom: 11
    });
    const handleViewPortChange = useCallback(nextViewport => setViewport(nextViewport), [])
    const mapRef = useRef();
    const readRole = () => {
        setUsername(localStorage.getItem('username'))
        const role = localStorage.getItem('role')
        if (role !== 'admin') {
            router.push('/login')
        }
    }
    useEffect( async () => {
        readRole()
    }, [])
    const goTo = (lat, long) => {
        setViewport({
            ...viewport,
            latitude: parseFloat(lat),
            longitude: parseFloat(long),
            transitionDuration: 1000,
            transitionInterpolator: new FlyToInterpolator()
        });
    }
    const markers = useMemo(() => 
    eventsList.results.map(venue => (
        <Marker 
            key={ venue.id } 
            latitude={ parseFloat(venue.venue_lat) } 
            longitude={ parseFloat(venue.venue_long) } 
            offsetLeft={20} 
            offsetTop={-20}
        >
            <button 
                className='cursor-pointer'
                onClick={ () => goTo(venue.venue_lat, venue.venue_long) }
            >
                <Image 
                    src="/images/marker.svg"
                    width={ 32 }
                    height={ 32 }
                    alt="Marker"
                />
            </button>
        </Marker>
    )), [eventsList])
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
                                ref={mapRef}
                                {...viewport}
                                onViewportChange={handleViewPortChange}
                                mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                                mapStyle="mapbox://styles/schienieder/ckxjy6oic1odh14ti6fcifuob"
                            >
                                { markers }
                                <Geocoder
                                    mapRef={mapRef}
                                    onViewportChange={handleViewPortChange}
                                    mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                                    position="top-right"
                                />
                            </ReactMapGL>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({ req, query }) => {
    const api = process.env.NEXT_PUBLIC_DRF_API
    const token = req.cookies.jwt
    const { lat, long } = query
    const res = await fetch(`${api}events_list/`,{
        method : 'GET',
        headers : {'Authorization' : 'Bearer'+' '+token}
    })
    const data = await res.json()
    return {
        props : {
            eventsList : data,
            centerLat : lat,
            centerLong : long
        }
    }
}