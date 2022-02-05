import React, { useState } from 'react'
import { useField } from '@formiz/core'

const MySelectField = (props) => {
    const { 
        setValue,
        value,
        errorMessage,
        isValid,
        isSubmitted, 
        isPristine
    } = useField(props)
    const { label, description, autoFocus, required, name, children } = props
    const [isFocused, setIsFocused] = useState(false)
    const showError = !isValid && !isFocused && (isSubmitted || !isPristine)
    return (
        <div className="w-full card flex flex-col gap-y-3">
            <h4 className="text-base font-bold">{ label }</h4>
            <p className="text-sm">{ description }</p>
            <select
                className="rateInputSelect rounded-lg"
                value={ value || "" }
                name={ name }
                onChange={ e => setValue(e.target.value) }
                onFocus={ () => setIsFocused(true) }
                onBlur={ () => setIsFocused(false) }
                aria-invalid={showError}
                aria-required={!!required}
                { ...autoFocus }
            >
                { children }
            </select>
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

export default MySelectField