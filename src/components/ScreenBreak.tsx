import Header from "./Header";
import WidgetDigitalTimer from "./WidgetDigitalTimer";

const ScreenBreak = (props: any) => {
  return (
    <>
      <div className="screen screen-break dark-theme">
        <Header cbMenuToggle={props.cbMenuToggle} />
        <div className="main">
          <div className="icon icon-break">
            <i className="fa fa-pause" aria-hidden="true"></i>
          </div>
          <h2>Pause & breath</h2>
          <WidgetDigitalTimer minutes={props.minutes} seconds={props.seconds} />
        </div>
        <footer>
          <div className="btn btn-dark" onClick={() => { props.cbAbortBreak() }}>NO PAUSE, GO NOW!</div>
        </footer>
      </div>
    </>
  );
};

export default ScreenBreak;