import React from 'react'
import './styles.scss'


interface HamburguerIconProps {
    onClick?: () => void
    open?: boolean
}

export const HamburguerIcon: React.FC<HamburguerIconProps> = ({onClick, open}) => {
    return (
        <div className={`container__hamburguer ${open&&"container__hamburguer--open"}`} onClick={onClick}>
            <div className='hamburguer__line'></div>
            <div className='hamburguer__line'></div>
            <div className='hamburguer__line'></div>
        </div>
    )
}

