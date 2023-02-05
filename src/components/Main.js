import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const cardsList = cards.map((card) => (
    <Card
      card={card}
      onCardClick={onCardClick}
      onCardLike={onCardLike}
      onCardDelete={onCardDelete}
    />
  ));

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__card">
          <div className="profile__avatar-overlay" onClick={onEditAvatar}></div>
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар пользователя"
          />
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button button"
              type="button"
              onClick={onEditProfile}
            ></button>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="gallery">
        <ul className="cards">{cardsList}</ul>
      </section>
    </main>
  );
}

export default Main;
