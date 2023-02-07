import { Link } from "react-router-dom";

function Login() {

  return(
      <section className="user-form log-in">
        <div className="user-form__container">
          <h2 className="user-form__title">Вход</h2>
          <form className="form user-form__form">
            <input
              className="form__input_data_email user-form__input"
              type="email"
              placeholder="Email"
            />
            <input
              className="form__input_data_password user-form__input"
              type="password"
              placeholder="Пароль"
            />
            <button className="user-form__submit" type="submit">Войти</button>
          </form>
        </div>
      </section>
    );
}

export default Login;
