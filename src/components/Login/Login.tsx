import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fethcLogin, editError } from "../../store/loginSlice";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppSelector } from '../../hooks/hooks';
import type { LoginType } from '../../types/types';
import { useEffect } from "react";

function Login() {
  const { error, button } = useAppSelector(state => state.login);
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginType>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<LoginType> = (data) => dispatch(fethcLogin(data));

  useEffect(() => {
    dispatch(editError(''));
  }, [dispatch]);

  return (
    <div className='entrance'>
      <div className="entrance__container">
        <h1 className='entrance__title'>Вход</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='entrance__form'>
          <input
            {...register("login", { required: 'Обязательное поле' })}
            placeholder="Логин" className='entrance__input' />
          <span className="error">{errors.login && errors.login.message}</span>
          <input
            {...register("password", { required: 'Обязательное поле' })}
            type="password" placeholder="Пароль" className='entrance__input' />
          <span className="error">{errors.password && errors.password.message}</span>
          <button className='entrance__button' disabled={!button} >{button ? 'Войти' : 'Отправляется...'}</button>
          <span className="error">{error}</span>
        </form>
        <Link to="/register" className='register__link'>Зарегистрироваться</Link>
      </div>
    </div>
  )
}
export default Login;