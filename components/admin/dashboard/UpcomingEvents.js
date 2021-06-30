const UpcomingEvents = () => {
    return (
        <div className="w-1/2 card flex flex-col gap-y-5">
            <div className="w-full flex justify-between">
                <h4 className="text-base font-bold dark:text-gray-300">Upcoming Events</h4>
                <a className="text-xs text-gray-500 hover:text-blue-600 cursor-pointer">View All</a>
            </div>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr className="text-left text-xs font-medium text-gray-700 dark:text-gray-400 uppercase tracking-wider">
                        <th scope="col" className="px-4 py-3">
                            Event Name
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    <tr className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-4 py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-800 dark:text-gray-300">A Decade & Eight - Ailene Padaplin</p>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-800 dark:text-gray-300">July 13, 2021</p>
                        </td>
                    </tr>
                    <tr className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-4 py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-800 dark:text-gray-300">Pepito & Pepita Wedding</p>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-800 dark:text-gray-300">July 14, 2021</p>
                        </td>
                    </tr>
                    <tr className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-4 py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-800 dark:text-gray-300">Kadayawan sa Dabaw Sponsorship</p>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-800 dark:text-gray-300">July 15, 2021</p>
                        </td>
                    </tr>
                    <tr className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-4 py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-800 dark:text-gray-300">Harley & Joker Wedding</p>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-800 dark:text-gray-300">July 16, 2021</p>
                        </td>
                    </tr>
                    <tr className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-4 py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-800 dark:text-gray-300">Inato Corporate Event</p>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-800 dark:text-gray-300">July 17, 2021</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default UpcomingEvents
