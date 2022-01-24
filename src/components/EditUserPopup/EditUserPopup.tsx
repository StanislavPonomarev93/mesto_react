import { useState } from 'react';
import { fethcEditUser } from "../../store/userDataSlice";
import { isPopupUser } from '../../store/popupSlice';
import close from '../../images/close.svg';
import { useForm, SubmitHandler } from "react-hook-form";
import type { UserType } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

function EditUserPopup() {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<UserType>({ mode: 'onChange' });
  const { userData, button } = useAppSelector(state => state.userData);
  const [nameValue, setNameValue] = useState(userData.name);
  const [aboutValue, setAboutValue] = useState(userData.about);

  const onSubmit: SubmitHandler<UserType> = (data) => dispatch(fethcEditUser(data)).then((res) => {
    if (res.meta.requestStatus === "fulfilled") dispatch(isPopupUser(false))
  });
  
  return (
    <>
      <div onClick={(e) => (e.target as HTMLDivElement).classList.contains('popup') && dispatch(isPopupUser(false))} className='popup popup_is-opened'>
        <div className="popup__content">
          <img onClick={(e) => (e.target as HTMLDivElement).classList.contains('popup__close') && dispatch(isPopupUser(false))} src={close} alt="" className="popup__close" />
          <h3 className="popup__title">Редактировать профиль</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="popup__form">
            <div className="input-container">
              <input
                {...register("name", {
                  required: 'Обязательное поле',
                  onChange: (e) => setNameValue(e.target.value),
                  minLength: {
                    value: 2,
                    message: 'От 2 символов'
                  },
                  maxLength: {
                    value: 30,
                    message: 'До 30 символов'
                  }
                })}
                className="popup__input popup__input_type_nameProfile" placeholder="Имя" value={nameValue}
              />
              <span className="error">{errors.name && errors.name.message}</span>
            </div>
            <div className="input-container">
              <input
                {...register("about", {
                  required: 'Обязательное поле',
                  onChange: (e) => setAboutValue(e.target.value),
                  minLength: {
                    value: 2,
                    message: 'От 2 символов'
                  },
                  maxLength: {
                    value: 30,
                    message: 'До 30 символов'
                  }
                })}
                className="popup__input popup__input_type_aboutMe" placeholder="О себе" value={aboutValue}
              />
              <span className="error">{errors.about && errors.about.message}</span>
            </div>
            <button className={`popup__button ${!isValid && 'button__disabled'}`} disabled={!button}>{button ? 'Сохранить' : 'Отправляется...'}</button>
          </form>
        </div>
      </div>
    </>
  )
}
export default EditUserPopup;