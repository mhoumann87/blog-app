const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <p>
        Copyright &copy;{year}&nbsp;
        <a href='https://www.michael-h.dk' target='_blank' rel='noreferrer'>
          Michael Houmann
        </a>
      </p>
    </footer>
  );
};
export default Footer;
