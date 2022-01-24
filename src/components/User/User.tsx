import { useDispatch } from 'react-redux';
import { isPopupUser, isPopupAvatar, isPopupAddCard, isPopupBigImage } from '../../store/popupSlice';
import EditUserPopup from '../EditUserPopup/EditUserPopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import AddCardPopup from '../AddCardPopup/AddCardPopup';
import { useAppSelector } from '../../hooks/hooks';
import ImagePopup from '../ImagePopup/ImagePopup';
import avatarIcon from '../../images/avatar-icon.svg';
import searchIcon from '../../images/search.svg';
import iconAdd from '../../images/add.svg';
import iconWriting from '../../images/writing.svg';

function User() {
  const dispatch = useDispatch();
  const { userData } = useAppSelector(state => state.userData);
  const { popupUser, popupAvatar, popupCard, popupImage } = useAppSelector(state => state.popup);

  return (
    <>
      <div className="profile root__section">
        {!userData._id && <div className="cssload-container"><div className="cssload-zenith"></div></div>}
        {userData._id && <div className="user-info">
          <div className="user-info__photo" style={{ backgroundImage: `url(${userData.avatar})` }}>
            <img onClick={() => dispatch(isPopupAvatar(true))} src={avatarIcon} className="user-info__avatar-icon" alt="" />
            <img onClick={() => dispatch(isPopupBigImage(true))} src={searchIcon} className="user-info__search-icon" alt="" />
          </div>
          <div className="user-info__data">
            <h1 className="user-info__name">{userData.name}</h1>
            <p className="user-info__job">{userData.about}</p>
            <img onClick={() => dispatch(isPopupAddCard(true))} className='icon' src={iconAdd} alt="добавить" />
          </div>
          <img onClick={() => dispatch(isPopupUser(true))} className='icon' src={iconWriting} alt="редактировать" />
        </div>}
      </div>

      {popupUser && <EditUserPopup />}
      {popupCard && <AddCardPopup />}
      {popupAvatar && <EditAvatarPopup />}
      {popupImage && <ImagePopup link={userData.avatar} />}
    </>
  )
}

export default User;
