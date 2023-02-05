function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        {String.fromCharCode(169)} {(new Date).getFullYear()} Евгений Довганич
      </p>
    </footer>
  );
}

export default Footer;
