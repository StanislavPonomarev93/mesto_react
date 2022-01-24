import { Link, useNavigate } from "react-router-dom";
import { fethcRegister, editError } from "../../store/registerSlice";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import type { RegisterType } from '../../types/types';
import { useEffect } from "react";

function Register() {
  const { error, button } = useAppSelector(state => state.register);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterType>({ mode: 'onChange' });


  const onSubmit: SubmitHandler<RegisterType> = (data) => {
    if (data.password === data.replayPassword) {
      dispatch(fethcRegister(data)).then((jes) => jes.meta.requestStatus === "fulfilled" && navigate('/login'));
      return;
    }
    dispatch(editError('пароли не совпадают'));
  };

  useEffect(() => {
    dispatch(editError(''));
  }, [dispatch]);

  return (
    <div className='register'>
      <div className="register__container">
        <h1 className='register__title'>Регистрация</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='register__form'>
          <input
            {...register("login", { required: 'Обязательное поле' })}
            placeholder="Логин" className='register__input' />
          <span className="error">{errors.login && errors.login.message}</span>
          <input
            {...register("email", { required: 'Обязательное поле' })}
            type="email" placeholder="Email" className='register__input' />
          <span className="error">{errors.email && errors.email.message}</span>
          <input
            {...register("password", { required: 'Обязательное поле' })}
            type="password" placeholder="Пароль" className='register__input' />
          <span className="error">{errors.login && errors.login.message}</span>
          <input
            {...register("replayPassword", { required: 'Обязательное поле' })}
            type="password" placeholder="Подтвердите пароль" className='register__input' />
          <span className="error">{errors.replayPassword && errors.replayPassword.message}</span>
          <button className='register__button' disabled={!button}>{button ? 'Зарегистрироваться' : 'Отправляется...'}</button>
          <span className="error">{error}</span>
        </form>
        <Link to="/login" className='entrance__link'>Войти</Link>
      </div>
    </div>
  )
}
export default Register;