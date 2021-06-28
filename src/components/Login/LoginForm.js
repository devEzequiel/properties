import React from "react";
import { Link, Redirect } from "react-router-dom";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import "./LoginForm.css";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";
import { ROUTES } from "../../constants";

//formulário de login
const LoginForm = () => {
  const email = useForm("email");
  const password = useForm();
  
  const {loginError, userLogin, loading, loginRedirect} = React.useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();

    if (email.validate() && password.validate()) {
      userLogin(email.value, password.value)
    }
  }

  return (
    <div className="content">
      <h1>Login</h1>
      <form action="" className="form" onSubmit={handleSubmit}>
        <Input
          type="text"
          id="email"
          placeholder="email@example.com"
          label="Digite seu email"
          {...email}
        />

        <Input
          type="password"
          id="password"
          placeholder="senha"
          label="Digite sua senha"
          {...password}
        />

        {loading ? <Button value="Carregando..." /> : <Button value="Entrar" />}
        
        {loginError && <p className="loginError">{loginError}</p>}
        <Link to={ROUTES.SIGNUP} className="criar">
          Criar conta
        </Link>
      </form>
      {loginRedirect && <Redirect to={ROUTES.HOME} />}
    </div>
  );
};

export default LoginForm;
