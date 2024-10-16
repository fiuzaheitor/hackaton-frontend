import React, { useState } from 'react'
import './styles.scss'
import { AuthContext, useAuthContext } from '../../hoc/AuthContext';
import { MenuItem } from '../MenuItem'
import Button from '../Button'
import { ChevronDown, LogOut } from 'react-feather'
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
    const navigate = useNavigate()
    const [isOpenDropdown, setIsOpenDropdown] = useState(false)
    const logout = useAuthContext().logout

    return (
        <div className='container__header'>
            <div className='header__logo'>
                <img src="/logo.png" alt="Logo" />
                <h1></h1>
            </div>
            {/*<div className='header__nav'>
                <MenuItem title="Home" icon={<img src="/icons/home.svg" alt="Home" />} onClick={() => {}}/>
                <MenuItem title="Agenda" icon={<img src="/icons/calendar.svg" alt="Agenda" />} onClick={() => {}}/>
                <MenuItem title="Contatos" icon={<img src="/icons/call.svg" alt="Contatos" />} onClick={() => {}}/>
            </div>*/}
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
                        <ChevronDown width={24} height={24}/>
                    </div>
                    <div className={`dropdown_options ${isOpenDropdown ? 'dropdown_options--active' : ''}`}>
                        <Button text="Logout" type="button" outline onClick={() => {
                            logout()
                            navigate('/login')
                        }} Icon={<LogOut/>}/>
                    </div>
                </div>
            </div>
        </div>
    )
}