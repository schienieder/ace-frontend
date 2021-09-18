import React from 'react'

const FilteringInput = ({ filter, setFilter }) => {
    return (
        <div className="searchBarContainer">
            <input 
                type="text"
                className="searchBarInput"
                placeholder="Search here . . ."
                value={ filter || '' }
                onChange={ e => setFilter(e.target.value) }
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
    )
}

export default FilteringInput
