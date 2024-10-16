import React, { useState } from 'react'

import './styles.scss'

import { Navbar } from '../../components/Navbar'
import { HamburguerIcon } from '../../components/HamburguerIcon'

export const Header: React.FC = () => {
    const [open, setOpen] = useState(false)

    const handleNavBar = () => {
        console.log('clicked')
        setOpen(!open)
    }

    return (
        <div className="container__nav">
            <div className='nav__header'>
                <HamburguerIcon onClick={handleNavBar} open={open}/>
            </div>
            <Navbar open={open}/>
        </div>
    )
}