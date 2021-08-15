import style from './Modal.module.css';
import ReactDOM from 'react-dom';
import FadeIn from "react-fade-in";

export default function Modal({children}) {

  return ReactDOM.createPortal(
    <div className={style.modalContainer}>
      <FadeIn>
        <div className={style.contentForm}>
          {children}
        </div>
      </FadeIn>
    </div>,
    document.getElementById('modal'));
}
