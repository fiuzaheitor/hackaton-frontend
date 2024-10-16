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
            <button type={type} onClick={onClick}>{text&&text}</button>
        </div>
    )
}

export default Button