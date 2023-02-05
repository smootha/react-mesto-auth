import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, loadingStatus }) {
  const avatar = React.useRef();

  function handleEditAvatarSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatar.current.value);
    setTimeout(() => e.target.reset(), 200);
  }

  return (
    <PopupWithForm
          name="edit-avatar"
          title="Обновить аватар"
          submitText="Сохранить"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleEditAvatarSubmit}
          loadingStatus={loadingStatus}
        >
          <input
            id="avatar-input"
            className="form__input form__input_data_avatar"
            type="url"
            name="avatar"
            placeholder="Ссылка на картинку"
            ref={avatar}
            required
          />
          <span className="form__error form__error_avatar-input"></span>
        </PopupWithForm>
  )
}

export default EditAvatarPopup;
