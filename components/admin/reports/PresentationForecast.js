import React from 'react'
import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    AreaChart,
    Area
} from 'recharts'


const PresentationForecast = ({ data }) => {
    return (
        <div className="w-full card flex flex-col gap-y-3">
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart 
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
                    <defs>
                        <linearGradient id="color5" x1="0" y1="0" x2="0" y2="1" >
                            <stop offset="0%" stopColor="#0891B2" stopOpacity={ 0.9 } />
                            <stop offset="75%" stopColor="#0891B2" stopOpacity={ 0.6 } />
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
                        strokeWidth={0.5} 
                        axisLine={ true }
                        tickLine={ false }
                        tickFormatter={ number => `${number}` }
                        style={{
                            fontSize : '10px',
                        }}
                    />
                    <Area 
                        dataKey="presentation" 
                        stroke="#0891B2"
                        fill="url(#color5)" 
                        activeDot={{ r: 5 }}
                    />
                    <Tooltip />
                    <Legend />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PresentationForecast
