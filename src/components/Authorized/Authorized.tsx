import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fethcUserData } from '../../store/userDataSlice';
import { fethcCardsData } from '../../store/cardsSlice';
import { useAppSelector } from '../../hooks/hooks';
import User from '../User/User';
import Cards from '../Cards/Cards';
import Author from '../Author/Author';

const Authorized = () => {
  const { userData } = useAppSelector(state => state.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fethcUserData());
    dispatch(fethcCardsData());
  }, [dispatch]);

  return (
    <Routes>
      <Route path='/main' element={
        <>
          <User />
          {userData._id && <Cards />}
        </>
      } />
      <Route path='/author' element={<Author />} />
      <Route path="*" element={<Navigate to='/main' />} />
    </Routes>
  )
}

export default Authorized;
