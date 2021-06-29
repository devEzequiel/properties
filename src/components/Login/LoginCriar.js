import React from "react";
import { Link } from "react-router-dom";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import { USER_POST } from "../../api";
import useFetch from "../../Hooks/useFetch";

const LoginCriar = () => {
  const nome = useForm();
  const phone = useForm();
  const email = useForm("email");
  const password = useForm();
  const [success, setSuccess] = React.useState(null);
  const [createError, setCreateError] = React.useState(null);
  const { loading, request } = useFetch(); 

  async function handleSubmit(event) {
    event.preventDefault();
    //verificar se os campos estão preenchidos
    if (
      nome.validate() &&
      email.validate() &&
      phone.validate() &&
      password.validate()
    ) {
      const { url, options } = USER_POST({
        name: nome.value,
        phone: phone.value,
        email: email.value,
        password: password.value,
      });

      setSuccess(null);
      setCreateError(null);

      const {response} = await request(url, options);

      if (response.ok) {
        setSuccess("Usuário cadastrado com sucesso.");
      } else if (!response.ok) {
        setCreateError("Email já cadastrado");
      }
    }
  }

  return (
    <div className="content">
      <h1>Criar Conta</h1>
      <form action="" className="form" onSubmit={handleSubmit}>
        <Input
          type="text"
          id="nome"
          placeholder="Jhon Doe"
          label="Nome"
          {...nome}
        />

        <Input
          type="text"
          id="email"
          placeholder="email@example.com"
          label="Email"
          {...email}
        />

        <Input
          type="text"
          id="phone"
          placeholder="(00) 0 0000-0000"
          label="Telefone"
          {...phone}
        />

        <Input
          type="password"
          id="password"
          placeholder="senha"
          label="Senha"
          {...password}
        />
        {loading ? (
          <Button value="Cadastrando..." style={{cursor: "wait"}} disabled/>
        ) : (
          <Button value="Cadastrar"/>
        )}
        
        {createError && <p className="loginError">{createError}</p>}
        {success && <p className="success">{success}</p>}
        <p>
          Já possui conta?{" "}
          <Link to="/login" className="criar">
            Faça Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginCriar;
