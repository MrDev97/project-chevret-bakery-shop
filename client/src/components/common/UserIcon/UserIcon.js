import styles from './UserIcon.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const UserIcon = () => {
  return (
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
  );
};

export default UserIcon;
