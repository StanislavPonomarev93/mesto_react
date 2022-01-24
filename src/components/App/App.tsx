import Header from '../Header/Header';
import Authorized from '../Authorized/Authorized';
import Unauthorized from '../Unauthorized/Unauthorized';
import { useAppSelector } from '../../hooks/hooks';
import '../../index.css';

function App() {
  const { auth } = useAppSelector((state) => state.auth);
 
  return (
    <div className="root">
      <Header />
      {auth && <Authorized />}
      {!auth && <Unauthorized />}
    </div>
  );
}

export default App;