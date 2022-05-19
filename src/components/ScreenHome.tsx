import Hamburger from "./Hamburger";

const ScreenHome = (props: any) => {
  return (
    <>
      <div className="screen screen-home dark-theme bg-black">
        <div className="main">
          <div className="logo" onClick={() => { props.cbSetNewTimer() }}>
            <Hamburger />
            <div className="logo-title">INTERVAL</div>
            <p>For all you timing needs</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScreenHome;