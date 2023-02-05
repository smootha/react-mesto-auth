import { useEffect } from "react";

function ImagePopup(props) {
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
    <section className={`popup preview ${props.card.link ? 'popup_opened' : ''}`} onClick={handleOverlayClick}>
      <figure className="preview__image-holder">
        <button className="preview__close-button close-button button" onClick={props.onClose} type="button"></button>
        <img className="preview__image" src={props.card.link} alt={props.card.name} />
        <figcaption className="preview__caption">{props.card.name}</figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;
