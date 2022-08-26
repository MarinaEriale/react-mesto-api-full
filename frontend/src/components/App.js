import React, { useState } from "react";
import "../index.css";
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
import RequireAuth from "./RequireAuth";

import ImagePopup from "./ImagePopup";

import PopupTypeProfile from "./PopupTypeProfile";
import PopupTypeAdd from "./PopupTypeAdd";
import PopupTypeDelete from "./PopupTypeDelete";
import PopupTypeAvatar from "./PopupTypeAvatar";

import api from "../utils/Api";
import { checkToken } from "../utils/auth";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setselectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  React.useEffect(() => {
    console.log(cards)
  }, [cards]);
  
   React.useEffect(() => {
    if (localStorage.getItem("jwt") && loggedIn) {
      api
        .getCards()
        .then((cards) => {
          setCards(cards.data)})
        .catch((err) => console.log("Ошибка", err));
    }
  }, [loggedIn]);

    function handleCardLike(card) {
    
    const isLiked = card.likes.some((i) => i === currentUser._id);
            
    api
      .changeCardLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => {
            if(c._id === newCard.data._id) {
              return newCard.data;
            }
            return c;
          }));
      })
      .catch((err) => console.log("Ошибка", err));
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      // const newCards = cards.data
      setCards(cards.filter((item) => item._id !== card._id));
    })
    .catch((err) => console.log("Ошибка", err));
  }

  React.useEffect(() => {
    if (localStorage.getItem("jwt") && loggedIn) {
      api
      .getUserInfo()
      .then((userInfo) => {
        // console.log(userInfo);
        setCurrentUser(userInfo);
      })
      .catch((err) => console.log("Ошибка", err));
    }    
  }, [loggedIn]);


  function handleUpdateUser(data) {
    api
      .editUserInfo(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log("Ошибка", err));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log("Ошибка", err));
  }

  function handleUpdateAvatar(link) {
    // console.log(link);
    api
      .editAvatar(link)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => console.log("Ошибка", err));
  }

  function handleCardClick(card) {
    setselectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setselectedCard(null);
  }

  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  React.useEffect(() => {
    handleTokenCheck();
  },[]);

  const handleTokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      checkToken(jwt).then((res) => {
        if (res) {           
          setLoggedIn(true);
          setEmail(res.email);      
          navigate("/");
        }
      });
    }
  };  
   
  const handleLogin = () => {
    setLoggedIn(true);
    handleTokenCheck(); 
  }

  const handleLogout= (e) => {
    e.preventDefault();
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setEmail(''); 
    navigate('/login')
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="background">
        <div className="page">
          <Header onLogout={handleLogout} loggedIn={loggedIn} email={email} />
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route
                exact
                path="/"
                element={
                  <RequireAuth loggedIn={loggedIn}>
                    <Main
                        handleEditAvatarClick={handleEditAvatarClick}
                        handleEditProfileClick={handleEditProfileClick}
                        handleAddPlaceClick={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                      />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          {loggedIn && <Footer />}
          <PopupTypeProfile
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <PopupTypeAdd
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddCard={handleAddPlaceSubmit}
          />
          <PopupTypeDelete />
          <PopupTypeAvatar
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />          
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
