import React from "react";
import styles from "./Input.module.css";

const Textarea = ({
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
      <textarea
        className={styles.textarea}
        type={type}
        id={id}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        // autoComplete="off"
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Textarea;
