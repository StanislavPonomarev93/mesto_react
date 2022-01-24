import { useContext } from 'react';
import { CurrentCardContext } from "../../contexts/CurrentContext";
import { useLike } from '../../hooks/useLike';


function Like() {
  const [like, likeHooc] = useLike(useContext(CurrentCardContext));

  return (
    <>
      <button onClick={likeHooc} className={`place-card__like-icon ${like.liked && 'place-card__like-icon_liked'}`}></button>
      <p className="place-card__like-number">{like.likes}</p>
    </>
  )
}
export default Like;