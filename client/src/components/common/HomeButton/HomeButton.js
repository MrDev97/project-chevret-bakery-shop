import styles from './HomeButton.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const HomeButton = () => {
  return (
    <a href="/">
      <span className={`fa-stack fa-2x has-badge ${styles.background}`}>
        <FontAwesomeIcon icon={solid('circle')} className="fa-stack-2x" />
        <FontAwesomeIcon
          icon={solid('house')}
          className={`fa-stack-1x fa-inverse ${styles.home}`}
        />
      </span>
    </a>
  );
};

export default HomeButton;
