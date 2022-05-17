import React, { useEffect } from 'react'
import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LineChart,
    Line
} from 'recharts'
import { fetchPresentationForecast } from '../../../redux/forecast/forecast.slice'
import { useDispatch, useSelector } from 'react-redux'
import BeatLoader from 'react-spinners/BeatLoader'


const PresentationForecast = () => {

    const dispatch = useDispatch()
    const { presentation_forecast, isLoadingForecast } = useSelector(state => state.forecastState)
    useEffect(() => {
        dispatch(fetchPresentationForecast())
    }, [dispatch])

    return (
        <div className="w-full card flex flex-col gap-y-3">
            <h4 className="text-gray-800 dark:text-gray-300 font-bold">Presentation Satisfaction</h4>
            {
                isLoadingForecast ?
                <div className="flex justify-center">
                    <BeatLoader color="#9ca3af" loading={ isLoadingForecast } size={15} />
                </div>
                :
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart 
                        data={ presentation_forecast }
                        margin={{
                            top: 10,
                            bottom: 5,
                            left: -35
                        }}
                        style={{
                            fontSize : '12px'
                        }}
                    >
                        <defs>
                            <linearGradient id="color5" x1="0" y1="0" x2="0" y2="1" >
                                <stop offset="0%" stopColor="#0891B2" stopOpacity={ 0.9 } />
                                <stop offset="75%" stopColor="#0891B2" stopOpacity={ 0.6 } />
                            </linearGradient>
                        </defs>
                        <CartesianGrid opacity={ 0.3 } vertical={ false } />
                        <XAxis 
                            dataKey="event_date"
                            strokeWidth={0.5}
                            axisLine={ true }
                            tickLine={ false } 
                            style={{
                                fontSize : '12px',
                            }} 
                        />
                        <YAxis
                            strokeWidth={0.5} 
                            axisLine={ true }
                            tickLine={ false }
                            tickFormatter={ number => `${number}` }
                            domain={[1, 5]}
                            style={{
                                fontSize : '10px',
                            }}
                        />
                        <Line 
                            dataKey="forecast_presentation_rate" 
                            stroke="#0891B2"
                            fill="url(#color5)" 
                            activeDot={{ r: 5 }}
                        />
                        <Tooltip cursor={{fill: 'rgba(171, 183, 183, 0.15)'}} content={<CustomToolTip />} />
                        <Legend />
                    </LineChart>
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
                <p className="capitalize">Rate: { payload[0].value }</p>
            </div>
        )
    }
    return null
}

export default PresentationForecast
