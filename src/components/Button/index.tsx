import React from 'react'

import './styles.scss'

interface ButtonProps {
    text: string
    type: 'submit' | 'button'
    onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({text, type, onClick}) => {
    return (
        <div className='container__button'>
            <button type={type} onClick={onClick} className='button'>
                <span>{text&&text}</span>
            </button>
        </div>
    )
}

export default Button