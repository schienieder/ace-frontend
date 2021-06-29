const RecentActivities = () => {
    return (
        <div className="w-3/5 card flex flex-col gap-y-5">
            <div className="w-full flex justify-between">
                <h4 className="text-base font-bold dark:text-gray-300">Affiliation Requests</h4>
                <a className="text-xs text-gray-500 hover:text-blue-600 cursor-pointer">View All</a>
            </div>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr className="text-left text-xs uppercase tracking-wider text-gray-700 dark:text-gray-400">
                        <th 
                            scope="col" 
                            className="px-4 py-3"
                        >Description</th>
                        <th 
                            scope="col" 
                            className="px-6 py-3"
                        >Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td 
                            className="px-4 py-2 whitespace-nowrap flex flex-col"
                        >
                            <p className="text-sm text-gray-800 dark:text-gray-300 font-medium">Rose Garden</p>
                            <p className="text-xs text-gray-600 dark:text-gray-500">Mr. & Mrs Dominador Wedding</p>
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap">
                            <p className="text-sm text-teal-600">Accepted</p>
                        </td>
                    </tr>
                    <tr className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td 
                            className="px-4 py-2 whitespace-nowrap flex flex-col"
                        >
                            <p className="text-sm text-gray-800 dark:text-gray-300 font-medium">Sayaka Myoui</p>
                            <p className="text-xs text-gray-600 dark:text-gray-500">Mr. & Mrs Dominador Wedding</p>
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap">
                            <p className="text-sm text-yellow-500">Pending</p>
                        </td>
                    </tr>
                    <tr className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td 
                            className="px-4 py-2 whitespace-nowrap flex flex-col"
                        >
                            <p className="text-sm text-gray-800 dark:text-gray-300 font-medium">Puquiz Media Services</p>
                            <p className="text-xs text-gray-600 dark:text-gray-500">Mr. & Mrs Dominador Wedding</p>
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap">
                            <p className="text-sm text-yellow-500">Pending</p>
                        </td>
                    </tr>
                    <tr className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td 
                            className="px-4 py-2 whitespace-nowrap flex flex-col"
                        >
                            <p className="text-sm text-gray-800 dark:text-gray-300 font-medium">Buemil Catering Services</p>
                            <p className="text-xs text-gray-600 dark:text-gray-500">Mr. & Mrs Dominador Wedding</p>
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap">
                            <p className="text-sm text-teal-600">Accepted</p>
                        </td>
                    </tr>
                    <tr className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td 
                            className="px-4 py-2 whitespace-nowrap flex flex-col"
                        >
                            <p className="text-sm text-gray-800 dark:text-gray-300 font-medium">JM Foods</p>
                            <p className="text-xs text-gray-600 dark:text-gray-500">Mr. & Mrs Dominador Wedding</p>
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap">
                            <p className="text-sm text-red-500">Declined</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default RecentActivities
