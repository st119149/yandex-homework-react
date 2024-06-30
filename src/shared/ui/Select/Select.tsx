import React from "react";
import styles from "./Select.module.scss";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  options: Option[];
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedLabel =
    options.find((option) => option.value === value)?.label || placeholder;

  return (
    <div className={styles.selectContainer} onClick={toggleDropdown}>
      <div className={styles.selectHeader}>
        <span>{selectedLabel}</span>
        <span className={isOpen ? styles.chevronUp : styles.chevronDown}></span>
      </div>
      {isOpen && (
        <ul className={styles.optionsList}>
          {options.map((option, index) => (
            <li
              key={index}
              className={styles.option}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
