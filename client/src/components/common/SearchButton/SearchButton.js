import styles from './SearchButton.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const SearchButton = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    props.action();
  };

  return (
    <button onClick={handleClick} className={styles.button}>
      <span className={`fa-stack fa-2x has-badge ${styles.background}`}>
        <FontAwesomeIcon icon={solid('circle')} className="fa-stack-2x" />
        <FontAwesomeIcon
          icon={solid('magnifying-glass')}
          className={`fa-stack-1x fa-inverse ${styles.glass}`}
        />
      </span>
    </button>
  );
};

export default SearchButton;
