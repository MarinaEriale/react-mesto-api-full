import React from "react";
import cardDelete from "../image/vector_delete.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.data.owner._id === currentUser._id;

  const cardDeleteButtonClassName = `element__delete-button ${
    isOwn ? "" : "element__delete-button_hidden"
  }`;

  const isLiked = props.data.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? "element__like-button_active" : ""
  }`;

  function handleClick() {
    props.onCardClick(props.data);
  }

  function handleLikeClick() {    
    props.onCardLike(props.data);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.data);
  }

  return (
    <div className="element">
      <img
        className="element__image"
        src={props.data.link}
        alt={props.data.name}
        onClick={handleClick}
      />
      <button
        type="button"
        className={`element__delete-button ${cardDeleteButtonClassName}`}
        onClick={handleDeleteClick}
      >
        <img
          src={cardDelete}
          alt="Мусорная корзина - значок удаления"
          className="element__delete"
        />
      </button>
      <div className="element__info">
        <h2 className="element__text">{props.data.name}</h2>
        <div className="element__like">
          <button
            type="button"
            className={`element__like-button ${cardLikeButtonClassName}`}
            onClick={handleLikeClick}
          ></button>
          <p className="element__likes-quantity">{props.data.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
