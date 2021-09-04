import React from 'react'
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts'

const data = [
    {
        month : "January",
        venue : 4.3, 
        catering : 4.6,
        styling : 5,
        mc : 4.8,
        presentation : 5,
        courtesy : 5,
    },
    {
        month : "February",
        venue : 4.5, 
        catering : 4.8,
        styling : 4.9,
        mc : 4.5,
        presentation : 4.9,
        courtesy : 5,
    },
    {
        month : "March",
        venue : 4.1, 
        catering : 4.4,
        styling : 5,
        mc : 4.6,
        presentation : 4.7,
        courtesy : 4.9,
    },
    {
        month : "April",
        venue : 4.8, 
        catering : 4.4,
        styling : 4.5,
        mc : 4.1,
        presentation : 4.5,
        courtesy : 4.6,
    },
    {
        month : "May",
        venue : 4.4, 
        catering : 4.3,
        styling : 5,
        mc : 5,
        presentation : 4.8,
        courtesy : 5,
    },
    {
        month : "June",
        venue : 4.8, 
        catering : 4.9,
        styling : 4.9,
        mc : 4.4,
        presentation : 4.2,
        courtesy : 4.9,
    },
    {
        month : "July",
        venue : 4.0, 
        catering : 4.3,
        styling : 5,
        mc : 4.8,
        presentation : 4.3,
        courtesy : 4.5,
    },
    {
        month : "August",
        venue : 5, 
        catering : 4.7,
        styling : 4.5,
        mc : 4.8,
        presentation : 5,
        courtesy : 5,
    },
    {
        month : "September",
        venue : 4.3, 
        catering : 4.6,
        styling : 5,
        mc : 4.8,
        presentation : 5,
        courtesy : 5,
    },
    {
        month : "October",
        venue : 4.8, 
        catering : 4.9,
        styling : 4.9,
        mc : 4.4,
        presentation : 4.2,
        courtesy : 4.9,
    },
    {
        month : "November",
        venue : 4.1, 
        catering : 4.4,
        styling : 5,
        mc : 4.6,
        presentation : 4.7,
        courtesy : 4.9,
    },
    {
        month : "December",
        venue : 4.8, 
        catering : 4.9,
        styling : 4.9,
        mc : 4.4,
        presentation : 4.2,
        courtesy : 4.9,
    },
]

const SatisfactionForecast = () => {
    return (
        <div className="w-full card flex flex-col gap-y-3">
            <h4 className="text-base font-bold">Client Satisfaction Forecast</h4>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart 
                    data={ data }
                    margin={{
                        top: 10,
                        bottom: 5,
                        left: -35
                    }}
                    style={{
                        fontSize : '12px'
                    }}
                >
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
                        strokeWidth={0.5} 
                        axisLine={ true }
                        tickLine={ false }
                        tickFormatter={ number => `${number}` }
                        style={{
                            fontSize : '10px',
                        }}
                    />
                    <Line 
                        dataKey="venue" 
                        stroke="#059669" 
                        fill="url(#color)" 
                        activeDot={{ r: 5 }}
                    />
                    <Line 
                        dataKey="catering" 
                        stroke="#FBBF24" 
                        fill="url(#color)" 
                        activeDot={{ r: 5 }}
                    />
                    <Line 
                        dataKey="styling" 
                        stroke="#EC4899" 
                        fill="url(#color)" 
                        activeDot={{ r: 5 }}
                    />
                    <Line 
                        dataKey="mc" 
                        stroke="#7C3AED" 
                        fill="url(#color)" 
                        activeDot={{ r: 5 }}
                    />
                    <Line 
                        dataKey="presentation" 
                        stroke="#0891B2" 
                        fill="url(#color)" 
                        activeDot={{ r: 5 }}
                    />
                    <Line 
                        dataKey="courtesy" 
                        stroke="#9F1239" 
                        fill="url(#color)" 
                        activeDot={{ r: 5 }}
                    />
                    <Tooltip />
                    <Legend />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SatisfactionForecast
