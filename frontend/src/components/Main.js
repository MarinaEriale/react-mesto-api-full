import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import profileEdit from "../image/Vector.svg";
import profileAdd from "../image/Vector_plus.svg";
import Card from "./Card";

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__personal">
          <button
            onClick={props.handleEditAvatarClick}
            type="button"
            className="profile__avatar-edit"
            style={{ backgroundImage: `url(${currentUser.data.avatar})` }}
          >
            {/* <img alt="Аватар пользователя" className="profile__avatar" /> */}
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.data.name}</h1>
            <button
              onClick={props.handleEditProfileClick}
              type="button"
              className="profile__open-popup"
            >
              <img
                src={profileEdit}
                alt="Значок редактирования - карандаш"
                className="profile__edit"
              />
            </button>
            <p className="profile__profession">{currentUser.data.about}</p>
          </div>
        </div>
        <button
          onClick={props.handleAddPlaceClick}
          type="button"
          className="profile__add-button"
          id="profile__add-button"
        >
          <img
            src={profileAdd}
            alt="Значок добавления - плюс"
            className="profile__add"
          />
        </button>
      </section>
      <section className="elements" id="elements">
        <div className="elements__list" id="elements-container">
          {props.cards.map((item) => {
            return (
              <Card
                data={item}
                key={item._id}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Main;
