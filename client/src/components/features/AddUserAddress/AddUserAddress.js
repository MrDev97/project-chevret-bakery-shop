import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addUserAddressRequest, getUser } from '../../../redux/usersRedux';
import UserAddressForm from '../../pages/UserAddressForm/UserAddressForm';

const AddUserAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(getUser);

  const handleSubmit = async (address) => {
    dispatch(addUserAddressRequest({ id: user.id, address }));
    navigate(`/users/${user.id}`);
  };

  return <UserAddressForm action={handleSubmit} actionText={'Add Address'} />;
};

export default AddUserAddress;
