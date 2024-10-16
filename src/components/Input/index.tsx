import React from 'react'

import './styles.scss'

interface InputProps {
    label?: string
    placeholder: string
    type: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
    value: string
    Icon?: never
}

const Input: React.FC<InputProps> = ({ label, placeholder, type, onChange, value, Icon}) => {
    return (
        <div className='container__input'>
            {label&&<label>{label}</label>}
            <input name='input' id='input' type={type} placeholder={placeholder} onChange={onChange} value={value} className={`input__form`}/>
            {Icon&&<label htmlFor="input"></label>}
        </div>
    )
}

export default Input
