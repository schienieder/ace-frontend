import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts'

const data = [
    {
        month : "May",
        events : "20"
    },
    {
        month : "June",
        events : "15"
    },
    {
        month : "July",
        events : "17"
    },
    {
        month : "August",
        events : "21"
    },
    {
        month : "September",
        events : "13"
    },
]

const SalesOverview = () => {
    return (
        <div className="w-full card flex flex-col gap-y-3">
            <h4 className="text-base font-bold dark:text-gray-300">Events Summary</h4>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={ data }
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
                            <stop offset="0%" stopColor="#DB2777" stopOpacity={ 0.9 } />
                            <stop offset="75%" stopColor="#DB2777" stopOpacity={ 0.6 } />
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
                        dataKey="events"
                        strokeWidth={0.5} 
                        axisLine={ true }
                        tickLine={ false }
                        tickFormatter={ number => `${number}` }
                        style={{
                            fontSize : '10px',
                        }}
                    />
                    <Tooltip />
                    <Bar dataKey="events" fill="url(#color)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SalesOverview
