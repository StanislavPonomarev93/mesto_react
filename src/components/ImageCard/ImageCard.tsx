import { useContext, useState } from 'react';
import { CurrentCardContext } from "../../contexts/CurrentContext";
import ImagePopup from "../ImagePopup/ImagePopup";
import DeleteCard from "../DeleteCard/DeleteCard";
import { useAppSelector } from '../../hooks/hooks';

function ImageCard() {
  const { userData } = useAppSelector(state => state.userData);
  const element = useContext(CurrentCardContext);
  const [imagePopup, setImagePopup] = useState(false);

  return (
    <>
      <div onClick={() => setImagePopup(true)} className="place-card__image" style={{ backgroundImage: `url(${element.link}` }}>
        {element.owner._id === userData._id && <DeleteCard />}
      </div>
      {imagePopup && <ImagePopup link={element.link} setImagePopup={setImagePopup} />}
    </>
  )
}
export default ImageCard;