import { useEffect } from "react";
import regOkImg from '../images/success-sign.svg';
import regFailImg from '../images/error-sign.svg';

function InfoTooltip(props) {
    /*Закрытие с помощью Esc*/
    useEffect(() => {
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
      if(evt.currentTarget === evt.target) {
        props.onClose();
      }
    }

  return(
    <section className={`popup info-tool-tip ${props.isOpen ? 'popup_opened' : ''}`} onClick={handleOverlayClick}>
      <div className="popup__container">
      <button className="popup__close-button close-button button" type="button" onClick={props.onClose}></button>
      <img className="popup__reg-status" src={props.regStatus ? regOkImg : regFailImg} alt="Статус регистрации" />
        <h2 className="popup__reg-title">{
          props.regStatus
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."
        }</h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
