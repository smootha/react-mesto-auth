import { Link, Routes, Route } from "react-router-dom";

function Header({ loggedIn, onLogout, userEmail, isMenuOpen, setMenuOpen }) {



  function handleLogout() {
    onLogout();
  }

  return (
    <header className={`header ${loggedIn ? 'header_logged-in' : ''}`}>
      <div className={loggedIn ? 'header__icons-container' : ''}>
        <div className="header__logo"></div>
        {loggedIn &&
         <div className={`button header__burger-menu ${isMenuOpen ? 'header__burger-menu_opened' : ''}`} onClick={setMenuOpen}></div>
         }
      </div>
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
            <div className={`header__button-container ${isMenuOpen ? 'header__button-container_opened' : ''}`}>
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
