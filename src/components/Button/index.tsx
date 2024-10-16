import React from 'react'

import './styles.scss'

interface ButtonProps {
    text: string
    type: 'submit' | 'button'
    onClick?: () => void
    Icon?: React.ReactElement
    outline?: boolean
}

const Button: React.FC<ButtonProps> = ({text, type, onClick, Icon, outline}) => {
    return (
        <div className='container__button'>
            <button type={type} onClick={onClick} className={`${outline?'button--outline':'button'}`}>
                {Icon&&Icon}
                <span>{text&&text}</span>
            </button>
        </div>
    )
}

export default Button