import styles from './HomeButton.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';

const HomeButton = () => {
  return (
    <Link to={`/`}>
      <span className={`fa-stack fa-2x has-badge ${styles.background}`}>
        <FontAwesomeIcon
          icon={solid('circle')}
          className={`fa-stack-2x ${styles.background}`}
        />
        <FontAwesomeIcon
          icon={solid('house')}
          className={`fa-stack-1x fa-inverse ${styles.home}`}
        />
      </span>
    </Link>
  );
};

export default HomeButton;
