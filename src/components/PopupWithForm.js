import React from "react";

function PopupWithForm(props) {
/*Закрытие с помощью Esc*/
  React.useEffect(() => {
    function handleEscClose(evt) {
      evt.key === 'Escape' && props.onClose();
    }
    if(props.isOpen) {
      document.addEventListener('keydown', handleEscClose);
      return () => {
        document.removeEventListener('keydown', handleEscClose);
      };
    }
  }, [props.isOpen]);

  function handleOverlayClick(evt) {
    evt.currentTarget === evt.target && props.onClose();
  }

  return (
    <section className={`popup ${props.name} ${props.isOpen ? 'popup_opened' : ''}`} onClick={handleOverlayClick}>
      <div className="popup__container">
        <button className="popup__close-button close-button button" type="button" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className="form" name={props.name} id={props.name} onSubmit={props.onSubmit}>
          {props.children}
          <button className={`form__submit form__submit_popup_${props.name}`} type="submit">{props.loadingStatus ? 'Загружается...' : props.submitText}</button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
