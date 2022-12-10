import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addLogoutRequest } from '../../../redux/usersRedux';

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(addLogoutRequest());
    navigate('/');
  }, [dispatch]);
};

export default LogOut;
