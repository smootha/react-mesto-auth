import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { logError } from '../utils/utils';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRouteElement from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import Register from './Register';
import Login from './Login';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { register, authorize,  getTokenData } from '../utils/auth';


function App() {
  const navigate = useNavigate();
  // Хуки для титульных форм
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  // Хуки для определения пользователя и карточек
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  /* Хуки для открытия/закрытия попапов
  Попап статуса регистрации */
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [regStatus, setTooltipStatus] = useState(false);
  //Попап изменения инфо профиля
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
  // Хук состояния открытия меню в шапке сайта
  const [isMenuOpen, setMenuOpen] = useState(false);

  // Фуниция проверки токена
  function checkToken() {
    const token = localStorage.getItem('token');
    if(token){
      getTokenData(token)
      .then(res => res)
      .then((res) => {
        if(res) {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          navigate('/', {replace: true});
        }
      })
      .catch(err => logError(err));
    }
  }
  // Функция открытия меню в мобильной версии
  function handleOpenMenu() {
    setMenuOpen(!isMenuOpen);
  }
  // Функции для регистрации/логина
  function handleRegisterSubmit(regData) {

    register(regData)
    .then(() => {
      setTooltipStatus(true);
      navigate('/');
    })
    .catch(err => {
      setTooltipStatus(false);
      logError(err);
    })
    .finally(() => setInfoTooltipOpen(true));
  }
  // Функции для изменения статуса авторизации
  function handleLogin(formValue) {
    authorize(formValue)
      .then((data) => {
        if(data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('emailOfLastUser', formValue.email);
          setUserEmail(formValue.email);
          setLoggedIn(true);
          navigate('/', {replace: true});
        }
      })
      .catch((err) => {
        logError(err);
        setTooltipStatus(false);
        setInfoTooltipOpen(true);
      });
  }
  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/sign-in', { replace: true });
    setLoggedIn(false);
  }
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
    setInfoTooltipOpen(false);
    setAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    handleCardClick({}, false);
  }
// Стартовая подгрузка данных о пользователе и карточках с сервера
  useEffect(() => {
    if(loggedIn) {
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
  }}, [loggedIn]);
// Проверка токена
  useEffect(() => {
    checkToken();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {/* Popup статуса регистрации */}
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} regStatus={regStatus} />
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
        <Header
          loggedIn={loggedIn}
          userEmail={userEmail}
          onLogout={handleLogout}
          isMenuOpen={isMenuOpen}
          setMenuOpen={handleOpenMenu}
        />
        <Routes>
          <Route
            path="/sign-up"
            element={<Register onRegSubmit={handleRegisterSubmit} />}
          />
          <Route
            path="/sign-in"
            element={<Login
                      emailAutoFill={userEmail}
                      loggedIn={loggedIn}
                      onLogin={handleLogin}
                    />}
          />
          <Route
            path="/"
            element={
              <ProtectedRouteElement loggedIn={loggedIn}>
                <Main
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="*"
            element={loggedIn
              ? <Navigate to="/" />
              : <Navigate to="/sign-in" />
            }
          />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
