import styles from './SummaryHeader.module.scss';
import { Link } from 'react-router-dom';

const SummaryHeader = ({ text }) => {
  return (
    <div className={`d-flex mt-4 row ${styles.links}`}>
      <div className={`d-flex col-6 justify-content-start`}>
        <h2>{text}</h2>
      </div>
      <Link
        to={`/checkout/${text.toLowerCase()}`}
        className={`d-flex col-6  align-items-center justify-content-end`}
      >
        <h2 className={`align-self-end ${styles.edit}`}>Edit</h2>
      </Link>
    </div>
  );
};

export default SummaryHeader;
