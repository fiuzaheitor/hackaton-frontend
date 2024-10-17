import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { ToastContainer, toast } from "react-toastify";
import { M_CREATE_USER } from "../../../graphql/Mutations";
import { useMutation } from "@apollo/client";

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [createUser] = useMutation(M_CREATE_USER);

  const handleSubmit = async (e: any) => {
    if (!name || !phone || !email || !password) {
      setError("Preencha todos os campos!");
      toast.error("Preencha todos os campos corretamente!");
      return;
    }

    try {
      const newUser = createUser({
        variables: {
          data: {
            name: name,
            phone: phone,
            email: email,
            password: password,
          },
        },
      });

      navigate("/login?signup=true");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container__signup">
      <ToastContainer position="top-left" />
      <div className="signup__box">
        <div className="signup__header">
          <div className="header__title">
            <img src="/logo.png" alt="Logo" />
            <h1>Cadastrar</h1>
          </div>
          <div className="header__info">
            <h2>Bem-Vindo</h2>
            <p>Faça o cadastro aqui!</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="signup__form">
          <div className="signup__div">
            <Input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="phone"
              placeholder="Telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
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
            <a href="/login">Login</a>
          </div>
          <div className="form__button">
            <Button type="submit" text="Cadastrar" />
          </div>
        </form>
      </div>
      <div className="signup__image">
        <img src="/banner-form.png" alt="Ilustraçõa" />
      </div>
    </div>
  );
};
