import React from 'react';
import successImage from '../image/Success.svg';

function PopupWithSuccess (props) {
    
    return (
    <div className={`popup popup_type_message ${
        props.isOpen ? "popup_opened" : ""
      }`}
      >
         <div className="popup__container">
             <img
               src={successImage}
               alt="Черный круг с галочкой внутри"
               className="popup__message-image"
             />
             <p className="popup__message">Вы успешно зарегистрировались!</p>      
             
         </div>
    </div>
    )
}

export default PopupWithSuccess;