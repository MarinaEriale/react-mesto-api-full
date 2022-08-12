import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth.js";

import PopupWithSuccess from "./PopupWithSuccess";
import PopupWithError from "./PopupWithError";

function Register() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .register(values.email, values.password)
      .then((res) => {
        if (res.status !== 400) {
          setIsSuccessOpen(true);
          setTimeout(() => {
            navigate("/login");
            setIsSuccessOpen(false);
          }, 2000);
        }
      })
      .catch((err) => {
        console.log("Ошибка", err);
        setIsErrorOpen(true);
        setTimeout(() => {
          setIsErrorOpen(false);
        }, 2000);
      });
  };

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          className="register__text"
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={values.password}
          onChange={handleChange}
          className="register__text"
        />
        <button type="submit" className="register__save-button">
          Зарегистрироваться
        </button>
      </form>
      <Link to="login" className="register__entrance-link">
        Уже зарегистрированы? Войти
      </Link>
      <PopupWithSuccess isOpen={isSuccessOpen} />
      <PopupWithError isOpen={isErrorOpen} />
    </div>
  );
}

export default Register;
