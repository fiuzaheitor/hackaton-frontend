import React, { useState } from 'react'

import './styles.scss'

import { MenuItem } from '../MenuItem'
import Button from '../Button'

export const Header: React.FC = () => {
    const [isOpenDropdown, setIsOpenDropdown] = useState(false)

    return (
        <div className='container__header'>
            <div className='header__logo'>
                <img src="/logo.png" alt="Logo" />
                <h1>Mulher</h1>
            </div>
            <div className='header__nav'>
                <MenuItem title="Home" icon={<img src="/icons/home.svg" alt="Home" />} onClick={() => {}}/>
                <MenuItem title="Agenda" icon={<img src="/icons/calendar.svg" alt="Agenda" />} onClick={() => {}}/>
                <MenuItem title="Contatos" icon={<img src="/icons/call.svg" alt="Contatos" />} onClick={() => {}}/>
            </div>
            <div className='header__user'>
                <div className='user__bell'>
                    <img src="/icons/bell.svg" alt="Sino"/>
                </div>
                <div className="user__info">
                    <div className="user__icon">
                        <img src="/icons/user.svg" alt="Usuário" />
                    </div>
                    <div className="user__name">
                        <span className="name__title">Nome</span>
                        <span className="name__func">Nome menor</span>
                    </div>
                    <div onClick={() => setIsOpenDropdown(!isOpenDropdown)} className={`dropdown_button ${isOpenDropdown&&'button--active'}`}>
                        <img src="/icons/chevron-down.svg" alt="Icone" />
                    </div>
                    <div className={`dropdown_options ${isOpenDropdown ? 'dropdown_options--active' : ''}`}>
                        <Button text="Logout" type="button" outline onClick={() => {}} Icon={<img src='/icons/arrow-right-start-on-rectangle.svg' alt='Icon'/>}/>
                    </div>
                </div>
            </div>
        </div>
    )
}