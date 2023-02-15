export const BASE_URL = 'https://auth.nomoreparties.co';

function checkResponseStatus(res) {
  return res.ok
  ? res.json()
  : Promise.reject(`Error: ${res.status} ${res.statusText}`);
}

export function register(regData) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(regData)
  })
    .then(checkResponseStatus);
}

// Авторизация
export function authorize(userData) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(checkResponseStatus);
}

export function getTokenData(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(checkResponseStatus);
}
