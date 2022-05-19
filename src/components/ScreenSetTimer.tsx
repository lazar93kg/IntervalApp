import { useState } from "react";
import Header from "./Header";


const ScreenSetTimer = (props: any) => {
  const [minutes, setMinutes] = useState(1);
  const [intervals_, setintervals_] = useState(true);
  const [breaks_, setBreaks_] = useState(true);

  const maxMinutes = 60;

  const handleMinutesPlus = () => {
    setMinutes((state: any) => {
      if (state < maxMinutes) {
        return state + 1;
      }
      return maxMinutes;
    });
  };

  const handleMinutesMinus = () => {
    setMinutes((state: any) => {
      if (state > 1) {
        return state - 1;
      }
      return 1;
    });
  };

  const handleStart = () => {
    if (typeof props.cbStartTimer === 'function') {
      props.cbStartTimer({
        minutes: minutes,
        intervals: intervals_,
        breaks: breaks_
      });
    }
  };
  return (
    <>
      <div className="screen screen-set-timer">
        <Header />
        <div className="main">
          <div className="set-minutes-group">
            <div className="btn-plus-minus" onClick={handleMinutesMinus}>&lt;</div>
            <div className="minutes">{minutes}</div>
            <div className="btn-plus-minus" onClick={handleMinutesPlus}>&gt;</div>
          </div>
          <div className="form">
            <div>
              <input type="checkbox" name="intervals_" checked={intervals_} onChange={(e) => { setintervals_(e.target.checked) }} />
              <label>Intervals</label>
            </div>
            <div>
              <input type="checkbox" name="breaks_" checked={breaks_} onChange={(e) => { setBreaks_(e.target.checked) }} />
              <label>5 min. break / interval</label>
            </div>
          </div>
        </div>
        <footer>
          <div className="btn btn-big" onClick={handleStart}>START TIMER</div>
        </footer>
      </div>
    </>
  );
};

export default ScreenSetTimer;