import React from 'react'

import './styles.scss'

interface ButtonProps {
    text?: string
    type: 'submit' | 'button'
    onClick?: () => void
    Icon?: React.ReactNode
    outline?: boolean
    onlyIcon?: boolean
}

const Button: React.FC<ButtonProps> = ({text, type, onClick, Icon, outline, onlyIcon}) => {
    return (
        <div className='container__button'>
            <button type={type} onClick={onClick} className={`${outline?'button--outline':onlyIcon?'button--onlyIcon':'button'}`}>
                {onlyIcon?<span>{Icon}</span>:<span>{Icon&&Icon}{text&&text}</span>}
            </button>
        </div>
    )
}

export default Button