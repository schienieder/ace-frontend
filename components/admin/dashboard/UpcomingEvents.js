import Link from "next/link"
import moment from "moment"

const UpcomingEvents = ({ data }) => {
    return (
        <div className="w-1/2 card flex flex-col gap-y-5">
            <div className="w-full flex justify-between">
                <h4 className="text-base font-bold dark:text-gray-300">Upcoming Events</h4>
                <Link href="/admin/events">
                    <a className="text-xs text-gray-500 hover:text-blue-600 cursor-pointer">View All</a>
                </Link>
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
                    {
                        data.results.length ? 
                            data.results.map((event) => (
                                <tr 
                                    className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800"
                                    key={ event.id }
                                >
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <p className="text-sm text-gray-800 dark:text-gray-300">{ event.event_name }</p>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <p className="text-sm text-gray-800 dark:text-gray-300">{ moment(event.date_schedule).format('LL') }</p>
                                    </td>
                                </tr>
                            ))
                        :
                        <tr className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td 
                                className="px-6 py-3 whitespace-nowrap text-center"
                                colSpan={2}
                            >
                                <p className="text-sm dark:text-gray-400">Nothing to show.</p>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UpcomingEvents
