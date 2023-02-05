import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { logError } from '../utils/utils';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  // Хуки для определения пользователя и карточек
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  /* Хуки для открытия/закрытия попапов
  Попап изменения инфо профиля */
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditProfileLoading, setEditProfileLoading] =useState(false);
  // Попап изменения аватара
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = useState(false);
  const [isAvatarLoading, setAvatarLoading] = useState(false);
  // Попап добавления карточки
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isPlaceLoading, setPlaceLoading] = useState(false);
  // Попап полноэкранного открытия выбранной карточки
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  // Функции для настроек профиля
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
    setEditProfileLoading(false);
  }
  function handleUpdateUser({ name, about }) {
    api.sendUserData(name, about)
      .then((userData) => {
        setEditProfileLoading(true);
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => logError(err));
  }
  function handleEditAvatarClick() {
    setAvatarPopupOpen(true);
    setAvatarLoading(false);
  }
  function handleUpdateAvatar(avatar) {
    api.sendNewAvatar(avatar)
      .then((userData) => {
        setAvatarLoading(true);
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => logError(err));
  }
  // Функции для карточек
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
    setPlaceLoading(false);
  }
  function handleUpdateCards(card) {
    api.sendNewCard(card)
    .then((newCard) => {
      setPlaceLoading(true);
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => { logError(err) });
  }
  function handleCardClick(card, isOpen) {
    setImagePopupOpen(isOpen)
    setTimeout(() => { setSelectedCard(card)}, 200);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    })
    .catch((err) => logError(err));
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards(cards.filter((c) => c._id !== card._id));
    })
    .catch((err) => logError(err));
  }
  function closeAllPopups() {
    setAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    handleCardClick({}, false);
  }
// Стартовая подгрузка данных о пользователе и карточках с сервера
  useEffect(() => {
    api
      .getInitialData()
      .then((data) => {
        const[user, initCards] = data;
        setCurrentUser(user);
        setCards(initCards);
      })
      .catch((err) => {
        logError(err);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {/* Popup смены данных пользователя */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          loadingStatus={isEditProfileLoading}
        />
        {/* Popup изменения аватара */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          loadingStatus={isAvatarLoading}
        />
        {/* Popup добавления фотографии */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleUpdateCards}
          loadingStatus={isPlaceLoading}
        />
        {/* Popup удаления карточки */}
        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          submitText="Да"
          isOpen=""
        />
        {/* Popup карточки */}
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />
        <Header />
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
