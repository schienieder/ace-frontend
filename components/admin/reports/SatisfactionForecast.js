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
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
},
{
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
},
{
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
},
{
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
},
{
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
},
{
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
},
{
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
}
]

const SatisfactionForecast = () => {
    return (
        <div className="w-full card flex flex-col gap-y-3">
            <h4 className="text-base font-bold">Client Satisfaction Forecast</h4>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        bottom: 5
                    }}
                    >
                    <CartesianGrid opacity={ 0.3 } vertical={ false } />
                    <XAxis 
                        dataKey="name" 
                        tickLine={ false } 
                        strokeWidth={0.5} 
                        style={{
                            fontSize : '14px',
                        }}
                    />
                    <YAxis 
                        tickLine={ false } 
                        strokeWidth={0.5} 
                        style={{
                            fontSize : '12px',
                        }}
                    />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="pv"
                        stroke="#8884d8"
                        activeDot={{ r: 6 }}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="uv" 
                        stroke="#82ca9d" 
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SatisfactionForecast
