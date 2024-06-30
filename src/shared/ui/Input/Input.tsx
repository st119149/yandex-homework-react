import React from "react";
import styles from "./Input.module.scss";

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: boolean;
  type?: "text" | "password";
}

const Input: React.FC<InputProps> = ({
  label = "",
  value,
  onChange,
  required = false,
  error = false,
  type = "text",
  placeholder,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={styles.inputContainer}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        className={`${styles.input} ${error && styles.error}`}
      />
    </div>
  );
};

export default Input;
