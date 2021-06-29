import React, { useState } from 'react'
import adminStyles from '../../../styles/Admin.module.css'

const RequestItem = ({ name, venue, task, status }) => {
    const redClass = status === 'declined' ? 'text-red-500' : ''
    const yellowClass = status === 'pending' ? 'text-yellow-500' : ''
    const tealClass = status === 'accepted' ? 'text-teal-500' : ''
    return (
        <tr className={`${adminStyles.tableRowClass} color-transition`}>
            <td className={ adminStyles.tableDataClass }>
                <p className={ adminStyles.tableDataTextClass }>{ name }</p>
            </td>
            <td className={ adminStyles.tableDataClass }>
                <p className="text-sm text-gray-800">{ venue }</p>
            </td>
            <td className={ adminStyles.tableDataClass }>
                <p className={ adminStyles.tableDataTextClass }>{ task }</p>
            </td>
            <td className={ adminStyles.tableDataClass }>
                <p className={`capitalize text-sm ${redClass + yellowClass + tealClass}`}>{ status }</p>
            </td>
            <td className={ adminStyles.tableDataClass }>
                <div className="flex gap-x-2">
                    <button
                        type="button"
                        className={`${adminStyles.actionBtn} color-transition`}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={ adminStyles.actionBtnIcon } 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        className={`${adminStyles.actionBtn} color-transition`}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={ adminStyles.actionBtnIcon } 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default RequestItem
