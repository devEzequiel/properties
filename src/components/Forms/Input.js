import React from "react";
import styles from "./Input.module.css";

const Input = ({
  type,
  id,
  placeholder,
  label,
  name,
  value,
  onChange,
  error,
  onBlur,
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        className={styles.input}
        type={type}
        id={id}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        autoComplete="on"
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
