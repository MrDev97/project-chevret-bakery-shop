import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { Container } from 'react-bootstrap';
import styles from './MainView.module.scss';

const MainView = ({ children }) => (
  <div className={styles.margin}>
    <NavBar />
    <Container>{children}</Container>
    <Footer />
  </div>
);

export default MainView;
