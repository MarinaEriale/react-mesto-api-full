import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupTypeAvatar(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(avatarRef.current.value);
    console.log(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        id="avatar_link"
        name="link"
        required
        placeholder="Ссылка на аватар"
        className="popup__text popup__text_type_link"
        ref={avatarRef}
      />
      <span id="avatar_link-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default PopupTypeAvatar;
