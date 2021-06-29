import React from 'react'
import TopNav from '../../components/admin/TopNav'
import SideNav from '../../components/admin/SideNav'
import Footer from '../../components/admin/Footer'
import PageHeader from '../../components/admin/PageHeader'
import ClientItem from '../../components/admin/clients/ClientItem'
import adminStyles from '../../styles/Admin.module.css'

export default function clients() {
    return (
        <div className="w-full h-screen grid grid-cols-custom-layout font-mont text-gray-800">
            <SideNav isActive="clients" />
            <div className="col-start-2 grid grid-rows-custom-layout overflow-y-auto">
                <TopNav />
                <div className="row-start-2 w-full h-full bg-gray-100">
                    <div className="p-8 flex flex-col gap-y-5 min-h-screen">
                        <PageHeader text="Client List" />
                        <div className="card w-full flex flex-col gap-y-5">
                            <div className="w-full flex justify-between items-center">
                                <div className={ adminStyles.searchBarContainer }>
                                    <input 
                                        type="text"
                                        className={ adminStyles.searchBarInput }
                                        placeholder="Search Name . . ."
                                    />
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-5 w-5 text-current" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className={ adminStyles.theadClass }>
                                    <tr className="text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Name
                                        </th>
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Address
                                        </th>
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Mobile Number
                                        </th>
                                        <th scope="col" className={ adminStyles.tableHeadingClass }>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className={ adminStyles.tbodyClass }>
                                    <ClientItem name="Abdhul Dominador" address="Prk. Tulalian, Carmen Municipality, Davao del Norte" mobile="09456339122" />
                                    <ClientItem name="Abdhul Dominador" address="Prk. Tulalian, Carmen Municipality, Davao del Norte" mobile="09456339122" />
                                    <ClientItem name="Abdhul Dominador" address="Prk. Tulalian, Carmen Municipality, Davao del Norte" mobile="09456339122" />
                                    <ClientItem name="Abdhul Dominador" address="Prk. Tulalian, Carmen Municipality, Davao del Norte" mobile="09456339122" />
                                    <ClientItem name="Abdhul Dominador" address="Prk. Tulalian, Carmen Municipality, Davao del Norte" mobile="09456339122" />
                                    <ClientItem name="Abdhul Dominador" address="Prk. Tulalian, Carmen Municipality, Davao del Norte" mobile="09456339122" />
                                    <ClientItem name="Abdhul Dominador" address="Prk. Tulalian, Carmen Municipality, Davao del Norte" mobile="09456339122" />
                                    <ClientItem name="Abdhul Dominador" address="Prk. Tulalian, Carmen Municipality, Davao del Norte" mobile="09456339122" />
                                    <ClientItem name="Abdhul Dominador" address="Prk. Tulalian, Carmen Municipality, Davao del Norte" mobile="09456339122" />
                                    <ClientItem name="Abdhul Dominador" address="Prk. Tulalian, Carmen Municipality, Davao del Norte" mobile="09456339122" />
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
