import Link from "next/link"

const RecentActivities = ({ data }) => {
    return (
        <div className="w-1/2 card flex flex-col gap-y-5">
            <div className="w-full flex justify-between">
                <h4 className="text-base font-bold dark:text-gray-300">Affiliation Requests</h4>
                <Link href="/admin/requests">
                    <a className="text-xs text-gray-500 hover:text-blue-600 cursor-pointer">View All</a>
                </Link>
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
                    {
                        data.results.length ? 
                            data.results.map((request) => (
                                <tr 
                                    className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800"
                                    key={ request.id }
                                >
                                    <td 
                                        className="px-4 py-2 whitespace-nowrap flex flex-col"
                                    >
                                        <p className="text-sm text-gray-800 dark:text-gray-300 font-medium">Rose Garden</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-500">{ request.task }</p>
                                    </td>
                                    <td className="px-6 py-3 whitespace-nowrap">
                                        {
                                            request.status === 'Accepted' &&
                                            <p className="capitalize text-sm text-teal-600">{ request.status }</p>
                                        }
                                        {
                                            request.status === 'Pending' &&
                                            <p className="capitalize text-sm text-yellow-500">{ request.status }</p>
                                        }
                                        {
                                            request.status === 'Declined' &&
                                            <p className="capitalize text-sm text-red-500">{ request.status }</p>
                                        }
                                    </td>
                                </tr>
                            ))
                            :
                            <tr className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td 
                                    className="px-6 py-3 whitespace-nowrap text-center"
                                    colSpan={2}
                                >
                                    <p className="text-sm">Nothing to show.</p>
                                </td>
                            </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default RecentActivities
