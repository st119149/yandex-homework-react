import React from "react";
import styles from "./Button.module.scss";
import classnames from "classnames";

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isDisabled?: boolean;
  variant?: "outlined" | "text" | "icon" | "fullfied";
  isActive?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  loading?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  className,
  isDisabled = false,
  type,
  variant = "fullfied",
  children = "Button",
  isActive = false,
  loading = false,
  ...rest
}) => {
  return (
    <button
      className={classnames(styles.button, styles[variant])}
      type={type}
      disabled={isActive}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
