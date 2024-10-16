import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

import './styles.scss'

import Button from '../../../components/Button'
import Input from '../../../components/Input'

export const Sign: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        console.log('Submit')
        navigate('/home')
    }

    return (
        <div className='container__sign'>
            <div className='sign__box'>
                <div className='sign__header'>
                    <div className='header__title'>
                        <h1>Login</h1>
                    </div>
                    <div className='header__info'>
                        <h2>Bem-Vindo!</h2>
                        <p>Faça o login aqui.</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='sign__form'>
                    <div className='form__inputs'>
                        <Input placeholder="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <Input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className='form__button'>
                        <Button type='submit' text='Login'/>
                    </div>
                </form>
            </div>
            <div className='sign__box'>
                <div className='sign__header'>
                    <div className='header__title'>
                        <h1>Cadastre-se</h1>
                    </div>
                    <div className='header__info'>
                        <h2>Primeira vez?</h2>
                        <p>Cadastre-se aqui.</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='sign__form'>
                    <div className='form__inputs'>
                        <Input placeholder="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <Input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className='form__button'>
                        <Button type='submit' text='Cadastro'/>
                    </div>
                </form>
            </div>
            <div className='sign__image'>
                <img src="" alt="" />
            </div>
        </div>
    )
}