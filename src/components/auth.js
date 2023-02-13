import { logError } from "../utils/utils";

export const BASE_URL = 'https://auth.nomoreparties.co';

export function register(regData, setRegStatus, setInfoTooltipOpen) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(regData)
  })
    .then((res) => {
      try{
        if(res.status === 201) {
          setRegStatus(true);
          return res.stringify();
        }
      } catch(e) {
        return (e);
      }
    })
    .then((res) => {
      return res;
    })
    .catch(err => {
      setRegStatus(false);
      logError(err);
    })
    .finally(() => setInfoTooltipOpen(true));
}

export function authorize(userData) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(res => res.json())
  .then((data) => {
    if(data.token) {
      localStorage.setItem('token', data.token);
      return data;
    }
  })
  .catch(err => logError(err));
}

export function getTokenData(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .then(data => data)
  .catch(err => logError(err));
}
