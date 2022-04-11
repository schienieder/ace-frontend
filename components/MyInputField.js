import React, { useState } from 'react'
import { useField } from '@formiz/core'
import MyFormSvg from './MyFormSvg'

const MyInputField = (props) => {
    const [showPassword, setShowPassword] = useState(false)
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
    const inputType = (type) => {
        if (type === 'password') {
            return showPassword ? 'text' : 'password'
        }
        return type
    }
    return (
        <div className="flex flex-col gap-y-2">
            <label className="text-sm font-bold">{ label }</label>
            <div className="flex gap-x-1 px-2 py-1 items-center border border-gray-300 focus-within:border-gray-600 rounded-lg">
                <MyFormSvg icon={ icon } />
                <input 
                    type={ inputType(type) }
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
                {
                    type === 'password' 
                    ? 
                    <button
                        type="button"
                        className="outline-none"
                        onClick={ () => setShowPassword(!showPassword) }
                        title="Show Password"
                    >
                        {
                            showPassword ?
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-5 w-5 text-pink-600" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor" 
                                strokeWidth={2}
                                >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                            :
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-5 w-5 text-gray-400 hover:text-gray-800 color-transition" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor" 
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        }
                    </button>
                    : null
                }
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
