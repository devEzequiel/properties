import React, { useState } from "react";
import { PROPERTIES_GET, PROPERTY_DELETE, SAVE_PROPERTY_POST } from "../../api";
import { Link } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import styles from "./Property.module.css";

const ListProperties = () => {
  const { request } = useFetch();
  const token = window.localStorage.getItem("token");
  const [properties, setProperties] = useState(null);

  //funções para editar o formato da moeda
  function getMoney(value) {
    let amount = parseInt(value.replace(/[\D]+/g, ""));
    return formatReal(amount);
  }

  function formatReal(amount) {
    var value = amount + "";
    value = value.replace(/([0-9]{2})$/g, ",$1");
    if (value.length > 6)
      value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

    return "R$ " + value;
  }

  //recuperar as propriedades ao carregar a página
  React.useEffect(() => {
    getProperties();
  }, []);

  async function getProperties() {
    const { url, options } = PROPERTIES_GET(token);
    const { json } = await request(url, options);
    setProperties(json.data);
  }

  // manipular o clique nos icones
  const handleClick = (id) => (event) => {
    if (event.target.id === "delete") deleteProperty(id);
    if (event.target.id === "save") saveProperty(id);
  };

  //salvar um imovel na tabela de salvos do usuário
  async function saveProperty(id) {
    const { url, options } = SAVE_PROPERTY_POST(id, token);
    const { response } = await request(url, options);
    if (response.ok) {
    }
  }

  //excluir um imóvel
  async function deleteProperty(id) {
    const { url, options } = PROPERTY_DELETE(id, token);
    const { response } = await request(url, options);
    if (response.ok) {
      getProperties();
    }
  }

  //estilização dos icons
  const iconStyle = {
    fontSize: "25px",
    margin: " 5px 5px",
    cursor: "pointer",
    color: "rgb(35, 124, 94)",
  };

  // console.log(data)
  return (
    <div className="home">
      <h2>Imovéis</h2>
      <div className={styles.propertyDiv}>
        <table className={styles.tableRow}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
              <th>Valor do Aluguel</th>
              <th>Valor de Venda</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {properties &&
              properties.map((property, i) => {
                return (
                  <tr key={i}>
                    <td>{property.title} </td>
                    <td>{property.description}</td>
                    <td>{getMoney(property.rental_price)}</td>
                    <td>{getMoney(property.sale_price)}</td>
                    <td>
                      <Link to={"/imoveis/" + property.id + "/editar"}>
                        <i
                          className="fas fa-edit"
                          id="edit"
                          style={iconStyle}
                        />
                      </Link>{" "}
                      |{" "}
                      <i
                        className="fas fa-save"
                        id="save"
                        style={iconStyle}
                        onClick={handleClick(property.id)}
                      />{" "}
                      |{" "}
                      <i
                        className="fas fa-trash-alt"
                        id="delete"
                        style={iconStyle}
                        onClick={handleClick(property.id)}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProperties;