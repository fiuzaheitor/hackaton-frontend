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
        fetch('http://localhost:4000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: "brunolustosads@gmail.com", subject: "Teste envio email Hackaton", message: "Sucesso!"})
        })

        console.log('Submit')
        navigate('/home')
    }

    return (
        <div className='container_login'>
            <div className='login__image'>
                <img src="" alt="Ilustraçõa" />
            </div>
            <div className='login__box'>
                <div className='login__header'>
                    <div className='header__title'>
                        <img src="/logo.png" alt="Logo" />
                        <h1>Login</h1>
                    </div>
                    <div className='header__info'>
                        <h2>Bem-Vindo</h2>
                        <p>Faça o login aqui!</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='login__form'>
                    <Input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <Input type='password' placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <div className="form__remember-forgot">
                        <a href="#">Esqueceu a senha?</a>
                        <a href="/signup">Cadastrar</a>
                    </div>
                    <div className='form__button'><Button type='submit' text='Login'/></div>
                </form>
            </div>
        </div>
    )
}