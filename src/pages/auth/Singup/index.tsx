import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './styles.scss'
import Button from '../../../components/Button'
import Input from '../../../components/Input'

export const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        navigate('/home')
    }

    return (
        <div className='container__signup'>
            <div className='signup__box'>
                <div className='signup__header'>
                    <div className='header__title'>
                        <img src="/logo.png" alt="Logo" />
                        <h1>Cadastrar</h1>
                    </div>
                    <div className='header__info'>
                        <h2>Bem-Vindo</h2>
                        <p>Faça o cadastro aqui!</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='signup__form'>
                    <Input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <Input type='password' placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <div className="form__remember-forgot">
                        <a href="#">Esqueceu a senha?</a>
                        <a href="/login">Login</a>
                    </div>
                    <div className='form__button'><Button type='submit' text='Cadastrar'/></div>
                </form>
            </div>
            <div className='signup__image'>
                <img src="" alt="Ilustraçõa" />
            </div>
        </div>
    )
}