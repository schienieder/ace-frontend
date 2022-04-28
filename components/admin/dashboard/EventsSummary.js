import React, { useState, useEffect } from 'react'
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEventsSummary } from '../../../redux/events/events.slice'
import moment from 'moment'
import BeatLoader from 'react-spinners/BeatLoader'

// const events = [
//     {"month" : "January", "total" : "19"},
//     {"month" : "February", "total" : "27"},
//     {"month" : "March", "total" : "23"}, 
//     {"month" : "April", "total" : "21"},
//     {"month" : "May", "total" : "18"},
//     {"month" : "June", "total" : "26"},
//     {"month" : "July", "total" : "22"},
//     {"month" : "August", "total" : "19"},
//     {"month" : "September", "total" : "20"},
//     {"month" : "October", "total" : "23"},
//     {"month" : "November", "total" : "16"},
//     {"month" : "December", "total" : "24"},
// ]

const SalesOverview = () => {
    
    const dispatch = useDispatch()
    const { isLoading } = useSelector(state => state.eventsState)
    const [events, setEvents] = useState([])
    useEffect(() => {
        dispatch(fetchEventsSummary()).then(res => {
            const formattedData = res.payload.map(event => {
                return {...event, month : moment(event.month).format('MMMM')}
            })
            setEvents(formattedData)
        })
    }, [])

    return (
        <div className="w-full card flex flex-col gap-y-3">
            <h4 className="text-base font-bold dark:text-gray-300">Events Summary</h4>
            {
                isLoading ?
                <div className="flex justify-center">
                    <BeatLoader color="#9ca3af" loading={ isLoading } size={15} />
                </div>
                :
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={ events }
                        margin={{
                            top: 10,
                            bottom: 5,
                            left : -35
                        }}
                        style={{
                            fontSize : '12px'
                        }}
                    >
                        <defs>
                            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1" >
                                <stop offset="10%" stopColor="#DB2777" stopOpacity={ 0.9 } />
                                <stop offset="90%" stopColor="#DB2777" stopOpacity={ 0.3 } />
                            </linearGradient>
                        </defs>
                        <CartesianGrid opacity={ 0.3 } vertical={ false } />
                        <XAxis 
                            dataKey="month"
                            strokeWidth={0.5}
                            axisLine={ true }
                            tickLine={ false } 
                            style={{
                                fontSize : '12px',
                            }} 
                        />
                        <YAxis 
                            dataKey="total"
                            strokeWidth={0.5} 
                            axisLine={ true }
                            tickLine={ false }
                            tickFormatter={ number => `${number}` }
                            style={{
                                fontSize : '10px',
                            }}
                        />
                        <Tooltip cursor={{fill: 'rgba(171, 183, 183, 0.15)'}} content={<CustomToolTip />} />
                        <Bar dataKey="total" fill="url(#color)" />
                    </BarChart>
                </ResponsiveContainer>
            }
        </div>
    )
}

function CustomToolTip({ active, payload, label }) {
    if (active && payload) {
        return (
            <div className="bg-white p-2 flex flex-col shadow border-b border-gray-300">
                <h4 className="font-bold">{ label }</h4>
                <p className="capitalize"><span className="text-pink-600">Events: </span>{ payload[0].value }</p>
            </div>
        )
    }
    return null
}

export default SalesOverview
