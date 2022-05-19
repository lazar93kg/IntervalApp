import Header from "./Header";

const ScreenAlarm = (props: any) => {
  return (
    <>
      <div className="screen screen-alarm dark-theme">
        <Header cbMenuToggle={props.cbMenuToggle} />
        <div className="main">
          <div className="icon icon-alarm">
            <i className="fa fa-bell-o" aria-hidden="true"></i>
          </div>
          <h2>Times up!</h2>
        </div>
        <footer>
          <div className="btn btn-dark" onClick={() => { props.cbSetNewTimer() }}>SET NEW TIMER</div>
        </footer>
      </div>
    </>
  );
};

export default ScreenAlarm;