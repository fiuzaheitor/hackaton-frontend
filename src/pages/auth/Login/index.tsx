import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { M_LOGIN } from "../../../graphql/Mutations";
import { useMutation } from "@apollo/client";
import { useAuth } from "../../../hoc/AuthContext";

export const Login: React.FC = () => {
  const isSignUp = new URLSearchParams(window.location.search).get("signup");
  const navigate = useNavigate();
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loginUser] = useMutation(M_LOGIN);

  // fetch('http://localhost:4000/send-email', {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({email: "brunolustosads@gmail.com", subject: "Teste envio email Hackaton", message: "Sucesso!"})
  // })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const res = await auth.authenticate(email as string, password as string);
      if (res === "success") {
        navigate("/home");
        toast.success("Login realizado com sucesso!");
      } else {
        toast.error("Email ou senha incorretos!");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (isSignUp) {
      toast.success("Cadastro realizado com sucesso!");
    }
  }, [isSignUp]);

  return (
    <div className="container_login">
      <ToastContainer position="top-left" />
      <div className="login__image">
        <img src="/banner-form.png" alt="Ilustração" />
      </div>
      <div className="login__box">
        <div className="login__header">
          <div className="header__title">
            <img src="/logo.png" alt="Logo" />
            <h1>Login</h1>
          </div>
          <div className="header__info">
            <h2>Bem-Vindo</h2>
            <p>Faça o login aqui!</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="login__form">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="form__remember-forgot">
            <a href="#">Esqueceu a senha?</a>
            <a href="/signup">Cadastrar</a>
          </div>
          <div className="form__button">
            <Button type="submit" text="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};
