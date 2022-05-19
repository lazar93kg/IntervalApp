import Header from "./Header";
import WidgetAnalogTimer from "./WidgetAnalogTimer";

const ScreenAnalogTimer = (props: any) => {
  return (
    <>
      <div className="screen screen-analog-timer">
        <Header cbMenuToggle={props.cbMenuToggle} />
        <div className="main">
          <WidgetAnalogTimer minutes={props.minutes} seconds={props.seconds} />
        </div>
        <footer>
          <div className="btn" onClick={() => { props.cbAbortTimer() }}>ABORT TIMER</div>
        </footer>
      </div>
    </>
  );
};

export default ScreenAnalogTimer;