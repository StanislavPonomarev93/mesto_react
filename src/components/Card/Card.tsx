import { useContext } from 'react';
import { CurrentCardContext } from "../../contexts/CurrentContext";
import Like from "../Like/Like";
import ImageCard from "../ImageCard/ImageCard";

function Card() {
  const element = useContext(CurrentCardContext);

  return (
    <>
      <div className="place-card">
        <ImageCard />
        <div className="place-card__description">
          <h3 className="place-card__name">{element.name}</h3>
          <div className="place-card__like-container">
            <Like />
          </div>
        </div>
      </div>
    </>
  )
}
export default Card;