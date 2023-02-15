import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logError } from "../utils/utils";
import { authorize } from "../utils/auth";

function Login(props) {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: props.userEmail,
    password: ''
  });

  function handleChange(e) {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  function handleLoginSubmit(e) {
    e.preventDefault();
    if(!formValue.email || !formValue.password) {
      return;
    }
    authorize(formValue)
      .then((data) => {
        if(data.token) {
          props.handleLogin();
          localStorage.setItem('emailOfLastUser', formValue.email);
          setFormValue({email: '', password: ''});
          navigate('/', {replace: true});
        }
      })
      .catch(err => logError(err));
  }

  useEffect(() => {
    setFormValue({...formValue, email: (localStorage.getItem('emailOfLastUser'))});
  }, []);

  return(
      <section className="user-form log-in">
        <div className="user-form__container">
          <h2 className="user-form__title">Вход</h2>
          <form
            className="form user-form__form"
            onSubmit={handleLoginSubmit}
          >
            <input
              className="form__input_data_email user-form__input"
              type="email"
              name="email"
              placeholder="Email"
              value={formValue.email}
              onChange={handleChange}
              required
            />
            <input
              className="form__input_data_password user-form__input"
              type="password"
              name="password"
              placeholder="Пароль"
              value={formValue.password}
              onChange={handleChange}
              required
            />
            <button className="user-form__submit" type="submit">Войти</button>
          </form>
        </div>
      </section>
    );
}

export default Login;
