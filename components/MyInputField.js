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
        <div className="flex flex-col gap-y-1">
            <label 
                className="inputFieldLabel"
            >{ label }</label>
            <div className="inputContainer">
                <MyFormSvg icon={ icon } />
                <input 
                    type={ type }
                    className="inputField"
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
                    <p className="text-xs">{ errorMessage }</p>
                </div>
            }
        </div>
    )
}

export default MyInputField
