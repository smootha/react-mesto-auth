import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, loadingStatus }) {

  const name = useRef();
  const link = useRef();

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name.current.value,
      link: link.current.value
    });
    setTimeout(() => e.target.reset(), 200);
  }

  return (
    <PopupWithForm
          name="add-card"
          title="Новое место"
          submitText="Создать"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleAddPlaceSubmit}
          loadingStatus={loadingStatus}
        >
          <input
            id="place-input"
            className="form__input form__input_data_place"
            type="text"
            name="place"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            ref={name}
            required
          />
          <span className="form__error form__error_place-input"></span>
          <input
            id="link-input"
            className="form__input form__input_data_link"
            type="url"
            name="url"
            placeholder="Ссылка на картинку"
            ref={link}
            required
          />
          <span className="form__error form__error_link-input"></span>
        </PopupWithForm>
  );
}

export default AddPlacePopup;
