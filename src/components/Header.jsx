import Nav from './Nav';

const Header = ({ title, search, setSearch }) => {
  return (
    <header>
      <div className='container flex'>
        <h1>{title}</h1>
        <Nav search={search} setSearch={setSearch} />
      </div>
    </header>
  );
};
export default Header;
