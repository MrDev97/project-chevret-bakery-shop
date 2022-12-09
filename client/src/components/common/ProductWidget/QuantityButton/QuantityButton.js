import styles from './QuantityButton.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const QuantityButton = ({ action, add }) => {
  const handleClick = (e) => {
    e.preventDefault();
    action();
  };

  return (
    <button onClick={handleClick} className={styles.button}>
      <span className={`fa-stack fa-2x has-badge ${styles.background}`}>
        <FontAwesomeIcon
          icon={solid('circle')}
          className={`fa-stack-2x ${styles.background}`}
        />
        <FontAwesomeIcon
          icon={add === true ? faPlus : faMinus}
          className={`fa-stack-1x fa-inverse ${styles.icon}`}
        />
      </span>
    </button>
  );
};

export default QuantityButton;

QuantityButton.propTypes = {
  action: PropTypes.func.isRequired,
  add: PropTypes.bool,
};
