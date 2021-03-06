import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';

const Unauthorized = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path="*" element={<Navigate to='/login' />} />
    </Routes>
  )
}

export default Unauthorized;
