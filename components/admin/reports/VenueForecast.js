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


const VenueForecast = ({ data }) => {
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
                        <linearGradient id="color" x1="0" y1="0" x2="0" y2="1" >
                            <stop offset="0%" stopColor="#115e59" stopOpacity={ 0.9 } />
                            <stop offset="75%" stopColor="#115e59" stopOpacity={ 0.6 } />
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
                        dataKey="venue"
                        stroke="#115e59"  
                        fill="url(#color)" 
                        activeDot={{ r: 5 }}
                    />
                    <Tooltip />
                    <Legend />
                </AreaChart>
            </ResponsiveContainer>
            {/* <ResponsiveContainer width="100%" height={400}>
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
                        textAnchor="Venue"
                    /> */}
                    {/* <Line 
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
                    /> */}
                    {/* <Tooltip />
                    <Legend />
                </LineChart>
            </ResponsiveContainer> */}
        </div>
    )
}

export default VenueForecast
