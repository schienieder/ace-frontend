import React, { Fragment } from 'react'
import adminStyles from '../styles/Admin.module.css'
import { useTable, useGlobalFilter, usePagination } from 'react-table'

function CommonTable2({ columns, data, cols }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        canNextPage,
        previousPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable({ columns, data }, useGlobalFilter, usePagination)
    const { pageIndex, globalFilter } = state
    return (
        <Fragment>
        <div className="w-full flex justify-between items-center">
            <div className="searchBarContainer dark:border-gray-700">
                <input 
                    type="text"
                    className="searchBarInput dark:bg-gray-900 dark:text-gray-300"
                    placeholder="Search here . . ."
                    value={ globalFilter || '' }
                    onChange={ e => setGlobalFilter(e.target.value) }
                />
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="inputIcon dark:text-gray-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
        </div>
        <table 
            className="min-w-full divide-y divide-gray-200 border-b border-gray-200 dark:border-gray-700 dark:divide-gray-700"
            { ...getTableProps() }
        >
            <thead className="bg-gray-100 dark:bg-gray-800">
                { 
                    headerGroups.map(headerGroup => (
                        <tr 
                            className="text-left text-xs uppercase tracking-wider text-gray-700 dark:text-gray-400"
                            {...headerGroup.getHeaderGroupProps() }
                        >
                            {
                                headerGroup.headers.map(col => (
                                <th 
                                    scope="col" 
                                    className={ adminStyles.tableHeadingClass }
                                    { ...col.getHeaderProps() }
                                >
                                    {col.render('Header')}
                                </th>
                                ))
                            }
                        </tr>
                    )) 
                }
            </thead>
            <tbody 
                className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700"
                { ...getTableBodyProps() }
            >
                {
                    data.length ?
                    page.map(row => {
                        prepareRow(row)
                        return (
                            <tr
                                className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-300"
                                { ...row.getRowProps() }
                            >
                                {
                                    row.cells.map(cell => {
                                        return (
                                            <td 
                                                className={ adminStyles.tableDataClass }
                                                { ...cell.getCellProps() }
                                            >{ cell.render('Cell') }</td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                    : 
                    <tr className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td 
                            className="px-6 py-3 whitespace-nowrap text-center"
                            colSpan={cols}
                        >
                            <p className="text-sm dark:text-gray-300">Nothing to show.</p>
                        </td>
                    </tr>
                }
            </tbody>
        </table>
        <div className="flex justify-between items-start text-sm">
            {/* PAGINATION BUTTONS HERE */}
            <div className="flex flex-col gap-y-2">
                <div className="flex divide-x divide-gray-300">
                    <button
                        className={`flex items-center gap-x-1 px-3 py-1 bg-white border border-gray-300 ${canPreviousPage ? 'hover:bg-gray-100 cursor-pointer' : 'cursor-not-allowed' } focus:outline-none color-transition rounded-tl-lg rounded-bl-lg`}
                        onClick={ () => previousPage() }
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            className={adminStyles.actionBtnIcon} 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        <p className="font-normal text-sm">Prev</p>
                    </button>
                    <button
                        className={`flex items-center gap-x-1 px-3 py-1 bg-white border border-gray-300 ${canNextPage ? 'hover:bg-gray-100 cursor-pointer' : 'cursor-not-allowed' } focus:outline-none color-transition rounded-tr-lg rounded-br-lg`}
                        onClick={ () => nextPage() }
                    >
                        <p className="font-normal text-sm">Next</p>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={adminStyles.actionBtnIcon}
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
            {/* PAGINATION BUTTONS END */}
            {/* GO TO PAGE INPUT */}
            <div className="flex flex-col gap-y-2">
                <div className="searchBarContainer">
                    <input 
                        type="number"
                        className="searchBarInput dark:bg-gray-900 dark:text-gray-300"
                        placeholder="Page Number . . ."
                        defaultValue={pageIndex + 1}
                        onChange={ e =>  {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(pageNumber)
                        }}
                    />
                </div>
                <p className="font-normal dark:text-gray-300">Page <span className="font-bold">{pageOptions.length ? pageIndex + 1 : pageIndex}</span> of <span className="font-bold">{pageOptions.length}</span></p>
            </div>
            {/* GO TO PAGE INPUT END */}
        </div>
        </Fragment>
    )
}

export default CommonTable2