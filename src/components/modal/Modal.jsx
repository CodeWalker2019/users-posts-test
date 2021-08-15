import style from './Modal.module.css';
import ReactDOM from 'react-dom';

export default function Modal({children}) {

  return ReactDOM.createPortal(
    <div className={style.modalContainer}>
      <div className={style.contentForm}>
        {children}
      </div>
    </div>,
    document.getElementById('modal'));
}
