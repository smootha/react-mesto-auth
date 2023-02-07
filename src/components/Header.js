import { Link, Routes,Route } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <Routes>
        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="link header__link">Войти</Link>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="link header__link">Регистрация</Link>
          }
        />
        <Route
          path="/"
          element={
            <div>
              <p>Будет емайл</p>
              <Link to="/sign-in" className="link header__link">Выйти</Link>
            </div>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
