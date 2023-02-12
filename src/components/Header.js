import { Link, Routes, Route } from "react-router-dom";

function Header({ onLogout, userEmail }) {



  function handleLogout() {
    onLogout();
  }

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
            <div className="header__button-container">
              <p className="header__email">{userEmail}</p>
              <Link to="/sign-in" className="link header__link" onClick={handleLogout}>Выйти</Link>
            </div>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
