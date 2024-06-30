import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import Button from "../../shared/ui/Button/Button";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../app/store";
import Modal from "../../shared/ui/Modal/Modal";
import Input from "../../shared/ui/Input/Input";
import { logout } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../features/auth/authApi";
import { LoginForm } from "../LoginForm/LoginForm";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.title}>
        Фильмопоиск
      </Link>

      {isAuthenticated ? (
        <Button variant="outlined" onClick={() => dispatch(logout())}>
          Выйти
        </Button>
      ) : (
        <Button variant="fullfied" onClick={() => setIsOpen(true)}>
          Войти
        </Button>
      )}

      <LoginForm
        //сброс значений формы по дефолту при закрытии окна
        key={Number(isOpen)}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </header>
  );
};
