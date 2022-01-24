import { CurrentCardContext } from "../../contexts/CurrentContext";
import { useAppSelector } from '../../hooks/hooks';
import Card from "../Card/Card";

function Cards() {
  const { cards } = useAppSelector(state => state.cards);

  return (
    <>
      {cards.length < 1 && <div className="cssload-container"><div className="cssload-zenith"></div></div>}
      {cards.length > 0 &&
        <div className="places-list root__section">
          {cards.map((el) => <CurrentCardContext.Provider key={el._id} value={el}><Card /></CurrentCardContext.Provider>)}
        </div>
      }
    </>);
}
export default Cards;