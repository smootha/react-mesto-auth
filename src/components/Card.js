import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const id = React.useContext(CurrentUserContext)._id;
  const isOwn = id === card.owner._id;
  const isLiked = card.likes.some((i) => i._id === id);
  const cardLikeButtonClassName = `cards__like button ${
    isLiked ? "cards__like_active" : ""
  }`;

  function handleClick() {
    onCardClick(card, true);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="cards__item" key={card._id}>
      <img
        onClick={handleClick}
        className="cards__image"
        height="282"
        src={card.link}
        alt={card.name}
      />
      {isOwn &&
        <button className="cards__delete button" type="button" onClick={handleDeleteClick} />
      }
      <div className="cards__text">
        <h2 className="cards__name">{card.name}</h2>
        <div className="cards__like-area">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          />
          <p className={`cards__like-counter cards__like-counter_visible`}>
            {card.likes.length}
          </p>
        </div>
      </div>
      </li>
  );
}

export default Card;
