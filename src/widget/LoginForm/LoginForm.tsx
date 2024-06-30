import React, { useState } from "react";
import Modal from "../../shared/ui/Modal/Modal";
import Input from "../../shared/ui/Input/Input";
import Button from "../../shared/ui/Button/Button";
import { useLoginMutation } from "../../features/auth/authApi";

export type LoginFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const LoginForm = ({ isOpen, onClose }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isError }] = useLoginMutation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <h4>Авторизация</h4>
        <Input
          value={username}
          onChange={setUsername}
          label="Логин"
          required
          placeholder="Введите логин"
          error={isError}
        />
        <Input
          value={password}
          onChange={setPassword}
          type="password"
          label="Пароль"
          required
          placeholder="Введите пароль"
          error={isError}
        />
        <div>
          <Button
            onClick={() => login({ username, password }).unwrap().then(onClose)}
          >
            Войти
          </Button>
          <Button variant="outlined">Отменить</Button>
        </div>
      </div>
    </Modal>
  );
};
