import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

import './styles.scss'

import Button from '../../../components/Button'
import Input from '../../../components/Input'

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        console.log('Submit')
        navigate('/home')
    }

    return (
        <div className='container_login'>
            <div className='login__box'>
                <div className='login__header'>
                    <div className='header__title'>
                        <h1>Login</h1>
                    </div>
                    <div className='header__info'>
                        <h2>Bem-Vindo!</h2>
                        <p>Faça o login aqui.</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='login__form'>
                    <div className='form__inputs'>
                        <Input placeholder="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <Input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className='form__button'>
                        <Button type='submit' text='Login'/>
                    </div>
                </form>
            </div>
        </div>
    )
}