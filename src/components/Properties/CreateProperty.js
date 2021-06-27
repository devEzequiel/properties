import React from "react";
import styles from "./Property.module.css";
import Input from "../Forms/Input";
import Textarea from "../Forms/Textarea";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { PROPERTY_POST } from "../../api";

//component to create a new imóvel
const CreateProperty = () => {
  const title = useForm();
  const rentalPrice = useForm();
  const salePrice = useForm();
  const description = useForm();
  const [success, setSuccess] = React.useState(null);
  const [error, setError] = React.useState(null);
  const { loading, request } = useFetch();
  const token = window.localStorage.getItem("token");

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      title.validate() &&
      rentalPrice.validate() &&
      salePrice.validate() &&
      description.validate()
    ) {
      const { url, options } = PROPERTY_POST(
        {
          title: title.value,
          rental_price: rentalPrice.value,
          sale_price: salePrice.value,
          description: description.value,
        },
        token
      );

      setSuccess(null);
      setError(null);

      const { response } = await request(url, options);

      if (response.ok) {
        setSuccess("Usuário cadastrado com sucesso.");
      } else {
        setError("Email já cadastrado");
      }
    }
  }

  return (
    <div className="home">
      <h1>Adicionar novo imóvel</h1>
      <form className={styles.newProperty} onSubmit={handleSubmit}>
        <Input
          type="text"
          label="Titulo"
          placeholder="Titulo do Imóvel"
          {...title}
        />
        <Input
          type="text"
          label="Preço do Aluguel"
          placeholder="0,00"
          {...rentalPrice}
        />
        <Input
          type="text"
          label="Preço para Venda"
          placeholder="0,00"
          {...salePrice}
        />
        <Textarea id="description" {...description} label="Descrição" />
        {loading ? (
          <Button value="Carregando..." disabled />
        ) : (
          <Button value="Adicionar Imóvel" />
        )}
      </form>
    </div>
  );
};

export default CreateProperty;
