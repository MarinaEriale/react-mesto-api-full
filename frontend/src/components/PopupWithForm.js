import React from "react";
import popupClose from "../image/Close_Icon.svg";

function PopupWithForm(props) {
  return (
    <>
      <div
        className={`popup popup_type_${props.name} ${
          props.isOpen ? "popup_opened" : ""
        }`}
      >
        <div className="popup__container">
          <button
            type="button"
            className="popup__close-popup"
            onClick={props.onClose}
          >
            <img
              src={popupClose}
              alt="Белый крестик - значок закрытия формы"
              className="popup__close-button"
              id="popup_close-button"
            />
          </button>
          <h2 className="popup__title">{props.title}</h2>
          <form
            className="popup__edit-form"
            name={props.name}
            onSubmit={props.onSubmit}
          >
            {props.children}
            <button type="submit" className="popup__save-button">
              {props.buttonText}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PopupWithForm;
