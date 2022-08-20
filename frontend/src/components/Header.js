import React from 'react';
import headerLogo from '../image/logo.svg';
import { Link, useLocation } from 'react-router-dom';


function Header (props) {

  const location = useLocation();
  
    return (
      <header className="header">
        <img src={headerLogo} alt="Крупная надпись латиницей место и маленькая надпись Russia сразу над правым верхним углом большей надписи" className="logo" />
        {location.pathname === "/signin" && (<Link to="/signup" className="header__link">
        Регистрация
        </Link>)}
        {location.pathname === "/signup" && (<Link to="/signin" className="header__link">
          Войти
        </Link>)}
        {props.loggedIn && (
          <p className="header__email">{props.email}
            <Link to="/signin" className="header__exit" onClick={props.onLogout}>
              Выйти
            </Link>
          </p>
        )}
      </header>
    )
};

export default Header;