import React, { useState } from 'react'
import './styles.scss'
import { AuthContext, useAuthContext } from '../../hoc/AuthContext';
import { MenuItem } from '../MenuItem'
import Button from '../Button'
import { ChevronDown, LogOut, User } from 'react-feather'
import { useNavigate } from 'react-router-dom';
import { useGetUser } from '../../utils/Queries';
import { getCookie } from '../../utils/cookies';

export const Header: React.FC = () => {
    const navigate = useNavigate()
    const [isOpenDropdown, setIsOpenDropdown] = useState(false)
    const logout = useAuthContext().logout

    const { data } = useGetUser(JSON.parse(getCookie('_bu_l') as string))

    return (
        <div className='container__header'>
            <div className='header__logo'>
                <img src="/logo.png" alt="Logo" />
                <h1></h1>
            </div>
            <div className='header__user'>
                <div className="user__info">
                    <div className="user__icon">
                        <User width={24} height={24}/>
                    </div>
                    <div className="user__name">
                        <span className="name__title">{data?.user?.name}</span>
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