import React from 'react';
import errorImage from '../image//Error.svg';

function PopupWithError (props) {
    return (
    <div className={`popup popup_type_message ${
      props.isOpen ? "popup_opened" : ""
    }`}>
         <div className="popup__container">
             <img
               src={errorImage}
               alt="Красный круг с крестиком внутри"
               className="popup__message-image"
             />
             <p className="popup__message">Что-то пошло не так! Попробуйте ещё раз.</p>      
      
         </div>
    </div>
    )
}
export default PopupWithError;