import styles from './Footer.module.scss';

const Footer = () => (
  <footer
    id="sticky-footer"
    className={`py-4 mt-5 fixed-bottom ${styles.footer}`}
  >
    <div className="text-center">
      <small>Copyright &copy; Chevret Bakery 2022. All rights reserved.</small>
    </div>
  </footer>
);

export default Footer;
