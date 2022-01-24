import { isPopupAvatar } from '../../store/popupSlice';
import { fethcEditUserAvatar } from '../../store/userDataSlice';
import close from '../../images/close.svg';
import { useForm, SubmitHandler } from 'react-hook-form';
import type { UserType } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';


function EditAvatarPopup() {
  const dispatch = useAppDispatch();
  const { button } = useAppSelector(state => state.userData);
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<UserType>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<UserType> = (data) => dispatch(fethcEditUserAvatar(data)).then((res) => {
    if (res.meta.requestStatus === "fulfilled") dispatch(isPopupAvatar(false))
  });

  return (
    <>
      <div onClick={(e) => (e.target as HTMLDivElement).classList.contains('popup') && dispatch(isPopupAvatar(false))} className='popup popup__avatar popup_is-opened'>
        <div className="popup__content">
          <img onClick={(e) => (e.target as HTMLImageElement).classList.contains('popup__close') && dispatch(isPopupAvatar(false))} src={close} alt="" className="popup__close" />
          <h3 className="popup__title">Обновить аватар</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="popup__form">
            <div className="input-container">
              <input
                {...register("avatar", {
                  required: 'Обязательное поле',
                  pattern: {
                    value: /^([a-zA-Z]+):\/\//,
                    message: 'Здесь должна быть ссылка'
                  }
                })}
                className="popup__input popup__input_type_link-url"
                placeholder="Ссылка на картинку"
              />
              <span className="error">{errors.avatar && errors.avatar.message}</span>
            </div>
            <button className={`popup__button ${!isValid && 'button__disabled'}`} disabled={!button}>{button ? 'Сохранить' : 'Отправляется...'}</button>
          </form>
        </div>
      </div>
    </>
  )
}
export default EditAvatarPopup;