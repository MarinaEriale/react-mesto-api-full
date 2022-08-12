import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupTypeAdd(props) {
  const [placeName, setPlaceName] = React.useState('');
  const [placeLink, setPlaceLink] = React.useState('');

  function handleAddPlaceName(e) {
    setPlaceName(e.target.value);
  }

  function handleAddPlaceLink(e) {
    setPlaceLink(e.target.value);
  }

  function handleAddSubmit(e) {
    e.preventDefault();
    props.onAddCard({
      name: placeName,
      link: placeLink,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Создать"
      onSubmit={handleAddSubmit}
    >
      <input
        type="text"
        id="name-card"
        name="name"
        required
        placeholder="Название"
        className="popup__text popup__text_type_name"
        minLength="2"
        maxLength="30"
        value={placeName}
        onChange={handleAddPlaceName}
      />
      <span id="name-card-error" className="popup__error"></span>
      <input
        type="url"
        id="link"
        name="link"
        required
        placeholder="Ссылка на картинку"
        className="popup__text popup__text_type_link"
        value={placeLink}
        onChange={handleAddPlaceLink}
      />
      <span id="link-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default PopupTypeAdd;
