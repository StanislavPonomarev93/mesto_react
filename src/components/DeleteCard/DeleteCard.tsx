import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { CurrentCardContext } from "../../contexts/CurrentContext";
import { fethcDeleteCard } from '../../store/cardsSlice';

function DeleteCard() {
  const element = useContext(CurrentCardContext);
  const dispatch = useDispatch();

  const removeCard: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(fethcDeleteCard(element));
  };

  return (
    <>
      <button onClick={removeCard} className="place-card__delete-icon"></button>
    </>
  )
}
export default DeleteCard;