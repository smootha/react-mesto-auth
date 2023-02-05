import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, loadingStatus }) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  function handleEditProfileSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
          name="edit-profile"
          title="Редактировать профиль"
          submitText={"Сохранить"}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleEditProfileSubmit}
          loadingStatus={loadingStatus}
        >
          <input
            id="name-input"
            className="form__input form__input_data_name"
            type="text"
            name="name"
            placeholder="Имя"
            required
            minLength="2"
            maxLength="40"
            value={name}
            onChange={handleChangeName}
          />
          <span className="form__error form__error_name-input"></span>
          <input
            id="about-input"
            className="form__input form__input_data_about"
            type="text"
            name="about"
            placeholder="Вид деятельности"
            required
            minLength="2"
            maxLength="200"
            value={description}
            onChange={handleChangeDescription}
          />
          <span className="form__error form__error_about-input"></span>
        </PopupWithForm>
  )
}

export default EditProfilePopup;
