import Header from "./Header";
import WidgetDigitalTimer from "./WidgetDigitalTimer";

const ScreenDigitalTimer = (props: any) => {
  return (
    <>
      <div className="screen screen-digital-timer">
        <Header cbMenuToggle={props.cbMenuToggle} />
        <div className="main">
          <WidgetDigitalTimer minutes={props.minutes} seconds={props.seconds} cbMenuToggle={props.cbMenuToggle} />
        </div>
        <footer>
          <div className="btn" onClick={() => { props.cbAbortTimer() }}>ABORT TIMER</div>
        </footer>
      </div>
    </>
  );
};

export default ScreenDigitalTimer;