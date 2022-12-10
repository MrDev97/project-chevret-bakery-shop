import styles from './UserAreaButton.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';

const UserAreaButton = () => {
  const user = useSelector(getUser);

  return (
    <a href={user ? `/users/${user.id}` : `/auth/login`}>
      <span className={`fa-stack fa-2x has-badge ${styles.background}`}>
        <FontAwesomeIcon
          icon={solid('circle')}
          className={`fa-stack-2x ${styles.background}`}
        />
        <FontAwesomeIcon
          icon={solid('user')}
          className={`fa-stack-1x fa-inverse ${styles.user}`}
        />
      </span>
    </a>
  );
};

export default UserAreaButton;
