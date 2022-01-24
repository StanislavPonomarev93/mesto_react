import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/hooks';
import { editAuth } from '../../store/authSlice';
import logo from '../../images/logo.svg';
import iconAuthor from '../../images/user.svg';
import iconHome from '../../images/home.svg';
import iconExit from '../../images/exit.svg';

function Header() {
  const { auth } = useAppSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <>
      <header className="header root__section">
        <img src={logo} alt="mesto logo" className="logo" />
        {
          auth &&
          <div>
            <Link to='/main'><img className='icon' src={iconHome} alt="главная" /></Link>
            <Link to='/author'><img className='icon' src={iconAuthor} alt="автор" /></Link>
            <img onClick={() => dispatch(editAuth(localStorage.removeItem('jwt')))} className='icon' src={iconExit} style={{ transform: 'rotate(180deg)' }} alt="выход" />
          </div>
        }

      </header>
    </>
  )
}
export default Header;