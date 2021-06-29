import React, { useState } from "react";
import styles from "./Property.module.css";
import Input from "../Forms/Input";
import Textarea from "../Forms/Textarea";
import Button from "../Forms/Button";
import useFetch from "../../Hooks/useFetch";
import { PROPERTY_EDIT, PROPERTY_GET } from "../../api";

//component to create a new imóvel
const EditProperty = () => {
  const [title, setTitle] = useState("");
  const [rental, setRental] = useState("");
  const [sale, setSale] = useState("");
  const [description, setDescription] = useState("");

  const [success, setSuccess] = React.useState(null);
  const [error, setError] = React.useState(null);
  const { loading, request } = useFetch();
  const token = window.localStorage.getItem("token");

  //retorna o id da url
  const getId = () => {
    let url = window.location.pathname;
    let id = url.split("/");
    return id[2];
  };

  React.useEffect(() => {
    getProperty();
  }, []);

  async function getProperty() {
    let id;
    id = getId();
    const { url, options } = PROPERTY_GET(id, token);
    const { json } = await request(url, options);
    
    setTitle(json.data.title);
    setDescription(json.data.description);
    setRental(json.data.rental_price);
    setSale(json.data.sale_price);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSuccess(null);
    setError(null);

    const { url, options } = PROPERTY_EDIT({
      title: title,
      rental_price: rental,
      sale_price: sale,
      description: description,
      token: token,
      id: getId(),
    });

    const { response } = await request(url, options);

    // console.log(json)

    if (response.ok) {
      setSuccess("Imóvel atualizado com sucesso.");
    } else if (!response.ok) {
      setError("Dados Inválidos");
    }
  }

  return (
    title,
    description,
    rental,
    sale && (
      <div className="home">
        <h1>Editar Imóvel</h1>
        <form className={styles.newProperty} onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Titulo"
            placeholder="Titulo do Imóvel"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <Input
            type="text"
            label="Preço do Aluguel"
            placeholder="0.00"
            value={rental}
            onChange={({ target }) => setRental(target.value)}
          />
          <Input
            type="text"
            label="Preço para Venda"
            placeholder="0.00"
            value={sale}
            onChange={({ target }) => setSale(target.value)}
          />
          <Textarea
            id="description"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            label="Descrição"
          />
          {success && <p className={styles.success}>{success}</p>}

          {error && <p className={styles.error}>Dados Inválidos</p>}

          {loading ? (
            <Button value="Carregando..." style={{cursor: "wait"}} disabled />
          ) : (
            <Button value="Editar Imóvel" />
          )}
        </form>
      </div>
    )
  );
};

export default EditProperty;
