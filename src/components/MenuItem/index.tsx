import React from  'react'
import './styles.scss'

interface MenuItemProps {
    title: string
    icon?: React.ReactNode
    onClick: () => void
}

export const MenuItem: React.FC<MenuItemProps> = ({title, icon, onClick}) => {
    return(
        <div className='container__menu_item' onClick={onClick}>
            <div className='menu_item__icon'>
                {icon}
            </div>
            <div className='menu_item__title'>
                {title}
            </div>
        </div>
    )
}