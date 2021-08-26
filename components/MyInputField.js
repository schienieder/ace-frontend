import React, { useState } from 'react'
import { useField } from '@formiz/core'
import MyFormSvg from './MyFormSvg'

const MyInputField = (props) => {
    const { 
        errorMessage,
        isValid,
        isPristine,
        isSubmitted, 
        setValue, 
        value 
    } = useField(props)
    const { label, type, required, icon, autoFocus } = props
    const [isFocused, setIsFocused] = useState(false)
    const showError = !isValid && !isFocused && (isSubmitted || !isPristine)
    return (
        <div className="flex flex-col gap-y-2">
            <label className="text-sm font-bold">{ label }</label>
            <div className="flex gap-x-1 px-2 py-1 items-center border border-gray-300 focus-within:border-gray-600 rounded-lg">
                <MyFormSvg icon={ icon } />
                <input 
                    type={ type }
                    className="flex-1 px-0 py-0 border-transparent focus:outline-none focus:ring-transparent focus:border-transparent text-sm"
                    value={ value ?? '' } // Pass the value to the input
                    onChange={ e => setValue(e.target.value) } // Update the input value onChange
                    onFocus={ () => setIsFocused(true) }
                    onBlur={ () => setIsFocused(false) }
                    aria-invalid={showError}
                    aria-required={!!required}
                    autoComplete="off"
                    { ...autoFocus }
                />
            </div>
            { 
                showError &&
                <div 
                    className="flex items-center gap-x-1 text-red-500"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 text-current" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs">{ errorMessage }</p>
                </div>
            }
        </div>
    )
}

export default MyInputField
