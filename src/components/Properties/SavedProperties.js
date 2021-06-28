import React, { useState } from "react";
import { SAVED_PROPERTIES_GET, UNSAVE_PROPERTY } from "../../api";
import { Link } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import styles from "./Property.module.css";

const SavedProperties = () => {
  const { request } = useFetch();
  const token = window.localStorage.getItem("token");
  const [properties, setProperties] = useState(null);
  const [error, setError] = useState(null);

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
    const { url, options } = SAVED_PROPERTIES_GET(token);
    const { response, json } = await request(url, options);
    if (response.ok) {
      setProperties(json.data);
    } else {
      setProperties(null);
      setError("Nenhum imóvel salvo");
    }
  }


  // manipular o clique nos icones
  const handleClick = (id) => (event) => {
    if (window.confirm("Deseja remover o imóvel da lista de salvos?")) {
      if (event.target.id === "save") unsaveProperty(id);
    }
  };

  async function unsaveProperty(id) {
    
    const { url, options } = UNSAVE_PROPERTY(id, token);
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
    color: "rgb(33, 125, 245)",
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
                      <i
                        className="fas fa-save"
                        id="save"
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

export default SavedProperties;
