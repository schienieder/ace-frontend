import React from 'react'
import adminStyles from '../../../styles/Admin.module.css'

const InterviewItem = ({ name, location, date, time }) => {
    return (
        <tr className={`${adminStyles.tableRowClass} color-transition`}>
            <td className={ adminStyles.tableDataClass }>
                <p className={ adminStyles.tableDataTextClass }>{ name }</p>
            </td>
            <td className={ adminStyles.tableDataClass }>
                <p className="text-sm text-gray-800">{ location }</p>
            </td>
            <td className={ adminStyles.tableDataClass }>
                <p className={ adminStyles.tableDataTextClass }>{ date }</p>
            </td>
            <td className={ adminStyles.tableDataClass }>
                <p className={ adminStyles.tableDataTextClass }>{ time }</p>
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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

export default InterviewItem
