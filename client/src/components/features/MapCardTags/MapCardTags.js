import { Button } from 'react-bootstrap';
import styles from './MapCardTags.module.scss';

const MapCardTags = ({ tags, className }) => {
  return (
    <div className={`d-flex ${styles.tags} ${className}`}>
      {tags.map((tag, i) => {
        return (
          <Button
            key={i}
            className={`align-self-center mx-2 ${
              tag === 'NEW'
                ? styles.new
                : styles.button || tag === 'PROMO'
                ? styles.promo
                : styles.button
            }`}
          >
            {tag}
          </Button>
        );
      })}
    </div>
  );
};

export default MapCardTags;
