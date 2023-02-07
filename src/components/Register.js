import { useState } from "react";
import { Link } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleRegisterSubmit(e) {
    e.preventDefault();
    props.onRegSubmit();
  }

  return(
    <>
      <InfoTooltip isOpen={props.isOpen} onClose={props.onClose} />
        <section className="user-form register">
          <div className="user-form__container">
            <h2 className="user-form__title">Регистрация</h2>
            <form className="form user-form__form" id="register" onSubmit={handleRegisterSubmit}>
              <input
                id="email-input"
                className="form__input_data_email user-form__input"
                type="email"
                name="email"
                onChange={handleEmailChange}
                value={email}
                placeholder="Email"
                required
              />
              <input
                id="password-input"
                className="form__input_data_password user-form__input"
                type="password"
                name="password"
                onChange={handlePasswordChange}
                value={password}
                placeholder="Пароль"
                required
              />
              <button className="user-form__submit" type="submit">Зарегистрироваться</button>
            </form>
            <div className="user-form__to-sign-up">
              <p className="user-form__to-sign-in_text">Уже зарегистрированы?</p>
              <Link to="/sign-in" className="user-form__to-sign-up_link link">Войти</Link>
            </div>
          </div>
        </section>
    </>
  );
}

export default Register;
