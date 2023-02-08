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
      console.log(err);
    })
    .finally(() => setInfoTooltipOpen(true));
}

export function authirize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
        'password': password,
        'email': email
    }
  })
  .then(res => {})
  .catch(err => console.log(err));
}

export function checkToken(token) {

}
