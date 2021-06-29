import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
} from 'recharts'

const data = [
    {
        month : "January",
        sales : "400000"
    },
    {
        month : "February",
        sales : "600000"
    },
    {
        month : "March",
        sales : "545000"
    },
    {
        month : "April",
        sales : "745000"
    },
    {
        month : "May",
        sales : "538000"
    },
]

const SalesOverview = () => {
    return (
        <div className="w-full card flex flex-col gap-y-3">
            <h4 className="text-base font-bold dark:text-gray-300">Sales Overview</h4>
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart 
                    data={ data }
                    margin={{
                        top: 10,
                        bottom: 5
                    }}
                    style={{
                        fontSize : '12px'
                    }}
                >
                    <defs>
                        <linearGradient id="color" x1="0" y1="0" x2="0" y2="1" >
                            <stop offset="0%" stopColor="#6366F1" stopOpacity={ 0.8 } />
                            <stop offset="75%" stopColor="#6366F1" stopOpacity={ 0.2 } />
                        </linearGradient>
                    </defs>
                    <CartesianGrid opacity={ 0.3 } vertical={ false } />
                    <Area dataKey="sales" stroke="#6366F1" fill="url(#color)" />
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
                        dataKey="sales"
                        strokeWidth={0.5} 
                        axisLine={ true }
                        tickLine={ false }
                        tickFormatter={ number => `₱${number}` }
                        style={{
                            fontSize : '10px',
                        }}
                    />
                    <Tooltip />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SalesOverview
