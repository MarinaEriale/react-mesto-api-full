import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupTypeDelete(props) {
  return (
    <PopupWithForm name="delete" title="Вы уверены?" isOpen={props.isOpen} buttonText="Да" >
      
    </PopupWithForm>
  );
}

export default PopupTypeDelete;