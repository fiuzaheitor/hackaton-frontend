import React from 'react'

import './styles.scss'

import { MenuItem } from '../../components/MenuItem'
import { redirect } from 'react-router-dom'

interface NavbarProps {
    open: boolean
}

export const Navbar: React.FC<NavbarProps> = ({open}) => {
    return (
        <div className={`navbar__menu ${open?"navbar__menu--open":"navbar__menu--closed"}`}>
            <MenuItem title='pag1' onClick={() => redirect("")}/>
            <MenuItem title='pag1' onClick={() => redirect("")}/>
            <MenuItem title='pag1' onClick={() => redirect("")}/>
        </div>
    )
}