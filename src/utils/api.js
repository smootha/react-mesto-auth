class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }
  // Функция проверки ответа с сервера
  _checkResponseStatus(response) {
    return response.ok
      ? response.json()
      : Promise.reject(`Error: ${response.status} ${response.statusText}`);
  }
  // Получение данных пользователя с сервера
  getUserData() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  }
  // Отправление данных пользователя на сервер
  sendUserData(name, about) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponseStatus);
  }
  // Отправление аватара пользователя на сервер
  sendNewAvatar(avatar) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkResponseStatus);
  }
  // Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  }
  // Отправка новой карточки на сервер
  sendNewCard({ name, link }) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponseStatus);
  }
  // Удаление карточки с сервера
  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponseStatus);
  }
  // Добавление лайка
  addLike(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponseStatus);
  }
  // Удаление лайка
  deleteLike(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponseStatus);
  }
  // Изменение статуса лайка
  changeLikeCardStatus(id, isLiked) {
    return isLiked
    ? this.deleteLike(id)
    : this.addLike(id);
  }
  // Получение данных пользователя и предзагруженных карт
  getInitialData() {
    return Promise.all([this.getUserData(), this.getInitialCards()]);
  }
}

const apiConfig = {
  url: "https://mesto.nomoreparties.co/v1/cohort-54/",
  headers: {
    "Content-type": "application/json",
    authorization: "49831d17-f3f1-4637-907e-4e644dcd95e5",
  },
};
export const api = new Api(apiConfig);
