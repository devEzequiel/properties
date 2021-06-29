import React, { useState } from "react";
import {
  PROPERTIES_GET,
  PROPERTY_DELETE,
  SAVED_PROPERTIES_GET,
  SAVED_PROPERTY_GET,
  SAVE_PROPERTY_POST,
} from "../../api";
import { Link } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import styles from "./Property.module.css";

const ListProperties = () => {
  const { request } = useFetch();
  const token = window.localStorage.getItem("token");
  const [properties, setProperties] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  
  // const [saved, setSaved] = useState(null);

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

  //recuperar os imoveis e os imoveis salvos ao carregar a página
  React.useEffect(async () => {
    getProperties();
    // let url = window.location.pathname;
  }, []);

  async function getProperties() {
    const { url, options } = PROPERTIES_GET(token);
    const { response, json } = await request(url, options);
    if (response.ok) {

      // let foo  = new Array(json.meta.last_page)
      console.table(json)

      json.data && setProperties(json.data);
    } else {
      setProperties(null);
    }
  }

  // manipular o clique nos icones
  const handleClick = React.useCallback(
    (id) => (event) => {
      if (event.target.id === "delete") deleteProperty(id);
      if (event.target.id === "save") saveProperty(id);
    },
    []
  );

  //salvar um imovel na tabela de salvos do usuário
  async function saveProperty(id) {
    if (window.confirm("Deseja salvar essa propriedade?")) {
      const { url, options } = SAVE_PROPERTY_POST(id, token);
      const { response } = await request(url, options);
      if (!response.ok) {
        window.alert("Imóvel já salvo");
      }
    }
  }

  //excluir um imóvel
  async function deleteProperty(id) {
    if (window.confirm("Deseja apagar esse imóvel")) {
      const { url, options } = PROPERTY_DELETE(id, token);
      const { response } = await request(url, options);
      if (response.ok) {
        getProperties();
      }
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
      <h2 className={styles.title}>Imovéis Cadastrados</h2>
      <div className={styles.propertyDiv}>
        <table className={styles.tableRow}>
          <thead className={styles.thead}>
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
                    <td className={styles.description}>{property.description}</td>
                    <td>{getMoney(property.rental_price)}</td>
                    <td>{getMoney(property.sale_price)}</td>
                    <td>
                      <Link to={"/imoveis/" + property.id + "/editar"}>
                        <i
                          className="fas fa-edit"
                          id="edit"
                          style={iconStyle}
                          title="editar"
                        />
                      </Link>{" "}
                      |{" "}
                      <i
                        className="fas fa-save"
                        id="save"
                        style={iconStyle}
                        onClick={handleClick(property.id)}
                        title="salvar"
                      />{" "}
                      |{" "}
                      <i
                        className="fas fa-trash-alt"
                        id="delete"
                        style={iconStyle}
                        onClick={handleClick(property.id)}
                        title="excluir"
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {properties &&
       (<div className={styles.pagination}>
        <a href="#">&laquo;</a>
        
          <Link  to="#" className={styles.active}>1</Link>
          <Link  to="#">2</Link>
          <Link  to="#">3</Link>
          <Link  to="#">4</Link>
        
        <a href="#">&raquo;</a>
      </div>)}
    </div>
  );
};

export default ListProperties;
