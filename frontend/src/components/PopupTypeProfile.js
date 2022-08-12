import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function PopupTypeProfile(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="user-name"
        name="name"
        required
        placeholder=""
        className="popup__text popup__text_type_name"
        minLength="2"
        maxLength="40"
        onChange={handleChangeName}
        value={name || ""}
      />
      <span id="user-name-error" className="popup__error"></span>
      <input
        type="text"
        id="about"
        name="about"
        required
        placeholder=""
        className="popup__text popup__text_type_profession"
        minLength="2"
        maxLength="200"
        onChange={handleChangeDescription}
        value={description || ""}
      />
      <span id="about-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default PopupTypeProfile;
