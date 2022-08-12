const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const initialCardsReversed = initialCards.reverse();

export const config = {
  formSelector: '.popup__edit-form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__error_visible'
};

export const containerSelector = '#elements-container';

export const nameInput = document.querySelector(".popup__text_type_name");
export const jobInput = document.querySelector(".popup__text_type_profession");

export const userNameElement = document.querySelector('.profile__name');
export const userAboutElement = document.querySelector('.profile__profession');
export const userAvatarElement = document.querySelector('.profile__avatar');


export const openAddPopupButton = document.getElementById("profile__add-button");

export const openPopupButton = document.querySelector(".profile__open-popup");
