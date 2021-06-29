const NewClients = () => {
    return (
        <div className="w-2/5 card flex flex-col gap-y-5">
            <div className="w-full flex justify-between">
                <h4 className="text-base font-bold dark:text-gray-300">New Clients</h4>
                <a className="text-xs text-gray-500 hover:text-blue-600 cursor-pointer">View All</a>
            </div>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr className="text-left text-xs font-medium text-gray-700 dark:text-gray-400 uppercase tracking-wider">
                        <th scope="col" className="px-4 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Mobile Number
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    <tr className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-4 py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-800 dark:text-gray-300">Abdhul Dominador</p>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-800 dark:text-gray-300">09456339122</p>
                        </td>
                    </tr>
                    <tr className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-4 py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-800 dark:text-gray-300">Ella Khardashan</p>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-800 dark:text-gray-300">09879900311</p>
                        </td>
                    </tr>
                    <tr className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-4 py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-800 dark:text-gray-300">Jordan Magdaro</p>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-800 dark:text-gray-300">09466608456</p>
                        </td>
                    </tr>
                    <tr className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-4 py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-800 dark:text-gray-300">John Paul Sewane</p>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-800 dark:text-gray-300">09097890123</p>
                        </td>
                    </tr>
                    <tr className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-4 py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-800 dark:text-gray-300">Ailene Padaplin</p>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-800 dark:text-gray-300">09007600987</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default NewClients
