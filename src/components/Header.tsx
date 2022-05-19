import Hamburger from "./Hamburger";

const Header = (props: any) => {
  return (
    <>
      <header>
        <Hamburger cbMenuToggle={props.cbMenuToggle} />
        <span>Interval</span>
      </header>
    </>
  );
};

export default Header;