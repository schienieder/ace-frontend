import React, { Fragment } from 'react'
import adminStyles from '../styles/Admin.module.css'
import { useTable, useGlobalFilter, usePagination } from 'react-table'
import currency from 'currency.js'

function SalesTable({ columns, data, onClick, btnText, totalSales }) {
    const peso = value => currency(value, { symbol : '₱', precision : 0 })
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
            <div className="searchBarContainer">
                <input 
                    type="text"
                    className="searchBarInput"
                    placeholder="Search here . . ."
                    value={ globalFilter || '' }
                    onChange={ e => setGlobalFilter(e.target.value) }
                />
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 text-current" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <button
                type="button" 
                onClick={ onClick }
                className={ adminStyles.addBtn }
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-current" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-sm font-bold">{ btnText }</p>
            </button>
        </div>
        <table 
            className="min-w-full divide-y divide-gray-200 border-b border-gray-200"
            { ...getTableProps() }
        >
            <thead className={ adminStyles.theadClass }>
                { 
                    headerGroups.map(headerGroup => (
                        <tr 
                            className="text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
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
                className={ adminStyles.tbodyClass }
                { ...getTableBodyProps() }
            >
                {
                    page.map(row => {
                        prepareRow(row)
                        return (
                            <tr
                                className={`${adminStyles.tableRowClass} color-transition`}
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
                }
                <tr
                    className={`${adminStyles.tableRowClass} color-transition`}
                >
                    <td 
                        className="bg-gray-100"
                        colSpan="3"
                    ><p className="text-xs font-bold text-gray-800 uppercase tracking-wide text-center">Total Sales</p></td>
                    <td 
                        className={`${adminStyles.tableDataClass} bg-gray-100`}
                    ><p className="text-sm text-gray-700 font-medium">{ peso(totalSales.total_sales).format() }</p></td>
                </tr>
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
                        className="searchBarInput"
                        placeholder="Page Number . . ."
                        defaultValue={pageIndex + 1}
                        onChange={ e =>  {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(pageNumber)
                        }}
                    />
                </div>
                <p className="font-normal">Page <span className="font-bold">{pageOptions.length ? pageIndex + 1 : pageIndex}</span> of <span className="font-bold">{pageOptions.length}</span></p>
            </div>
            {/* GO TO PAGE INPUT END */}
        </div>
        </Fragment>
    )
}

export default SalesTable
