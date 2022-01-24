import { isPopupBigImage } from '../../store/popupSlice';
import close from '../../images/close.svg';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/hooks';

function ImagePopup(props: any) {
  const dispatch = useDispatch();
  const { popupImage } = useAppSelector(state => state.popup);

  return (
    <>
      <div onClick={(e) => {
        (e.target as HTMLDivElement).classList.contains('popup') && popupImage ?
          dispatch(isPopupBigImage(false)) : props.setImagePopup(false);
      }} className='popup popup__image popup_is-opened'>
        <div className="popup__container">
          <img onClick={(e) => {
            (e.target as HTMLImageElement).classList.contains('popup') && popupImage ?
              dispatch(isPopupBigImage(false)) : props.setImagePopup(false);
          }} src={close} alt="" className="popup__close" />
          <img src={props.link} alt="" className="popup__image-big" />
        </div>
      </div>
    </>
  )
}

export default ImagePopup;