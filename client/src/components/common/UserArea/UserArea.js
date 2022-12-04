import styles from './UserArea.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const UserArea = () => {
  return (
    <a href="/users/:id">
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

export default UserArea;
