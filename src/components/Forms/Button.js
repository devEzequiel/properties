import React from "react";
import styles from "./Button.module.css";

const Button = ({value, style}) => {
  return <button style={style} className={styles.button}>{value}</button>;
};

export default Button;
