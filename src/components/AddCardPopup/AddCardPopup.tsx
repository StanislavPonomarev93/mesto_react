import close from '../../images/close.svg';
import { fethcAddCard } from '../../store/cardsSlice';
import { isPopupAddCard } from '../../store/popupSlice';
import { useForm, SubmitHandler } from 'react-hook-form';
import type { CardType } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

function AddCardPopup() {
  const dispatch = useAppDispatch();
  const { button } = useAppSelector(state => state.cards);
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<CardType>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<CardType> = (data) => dispatch(fethcAddCard(data)).then((res) => {
    if (res.meta.requestStatus === "fulfilled") dispatch(isPopupAddCard(false))
  });

  return (<>
    <div onClick={(e) => (e.target as HTMLDivElement).classList.contains('popup') && dispatch(isPopupAddCard(false))} className='popup popup__card popup_is-opened'>
      <div className="popup__content">
        <img onClick={(e) => (e.target as HTMLImageElement).classList.contains('popup__close') && dispatch(isPopupAddCard(false))} src={close} alt="" className="popup__close" />
        <h3 className="popup__title">Новое место</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="popup__form">
          <div className="input-container"></div>
          <div className="input-container">
            <input
              {...register("name", {
                required: 'Обязательное поле',
                minLength: {
                  value: 2,
                  message: 'От 2 символов'
                },
                maxLength: {
                  value: 30,
                  message: 'До 30 символов'
                }
              })}
              className="popup__input popup__input_type_name" placeholder="Название"
            />
            <span className="error">{errors.name && errors.name.message}</span>
          </div>
          <div className="input-container">
            <input
              {...register("link", {
                required: 'Это обязательное поле',
                pattern: {
                  value: /^([a-zA-Z]+):\/\//,
                  message: 'Здесь должна быть ссылка'
                }
              })}
              className="popup__input popup__input_type_link-url"
              placeholder="Ссылка на картинку"
            />
            <span className="error">{errors.link && errors.link.message}</span>
          </div>
          <button className={`popup__button ${!isValid && 'button__disabled'}`} disabled={!button}>{button ? '+' : 'Отправляется...'}</button>
        </form>
      </div>
    </div>
  </>)
}
export default AddCardPopup;