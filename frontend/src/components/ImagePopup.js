import React from "react";
import popupClose from '../image/Close_Icon.svg';

function ImagePopup (props) {
    return (
        <div className={`popup popup_type_place ${ props.card ? "popup_opened" : "" }`}>
        <div className="popup__content">
          <button type="button" className="popup__close-popup" id="popup_type_place-close" onClick={props.onClose}>
            <img src={popupClose} alt="Белый крестик - значок закрытия формы" className="popup__close-button" />
          </button>
          <img className="popup__image" src={props.card ? props.card.link : ""} alt={props.card ? props.card.name : ""} />
          <p className="popup__image-name">{props.card ? props.card.name : ""}</p>
        </div>
      </div>
      
    )
}

export default ImagePopup;