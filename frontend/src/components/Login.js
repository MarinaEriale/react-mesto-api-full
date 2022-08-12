import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from '../utils/auth.js';

function Login({ onLogin }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

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
        .authorize(values.email, values.password)
        .then((res) => {
          console.log(res)
          if (res.token) {
            setValues({
              email: "",
              password: "",
            });
            localStorage.setItem("jwt", res.token);
            onLogin();
            navigate("/");
          }          
        })
        .catch((err) => console.log("Ошибка", err));
  };

  return (
    <div className="login">        
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
      <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          className="login__text"
        />        
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={values.password}
          onChange={handleChange}
          className="login__text"
        />      
        <button type="submit" className="login__enter-button">Войти</button>
      </form>
  </div> 
  )
}

export default Login;
