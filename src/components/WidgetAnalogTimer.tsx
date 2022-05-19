let sixtySeconds: any = [];
const _makeSixtyArr = () => {
  for (let i = 0; i < 60; i++) {
    sixtySeconds.push(null);
  }
};
_makeSixtyArr();

const SixtySeconds = () => {
  return (
    <>
      {
        sixtySeconds.map((item: any, index: any) => {
          let angle = (index * (1 / 60)) * 360;
          return (
            <div key={index} className="line-holder" style={{
              transform: 'rotate(' + angle + 'deg)'
            }}>
              <div className="line"></div>
            </div>
          );
        })
      }
    </>
  );
};


const WidgetAnalogTimer = (props: any) => {
  const seconds = props.seconds;
  const minutes = props.minutes;

  let pointerMinutesAngle = (minutes * (1 / 60)) * 360;
  let pointerSecondsAngle = (seconds * (1 / 60)) * 360;

  return (
    <>
      <div className="widget-analog-timer">
        <div className="box">

          <SixtySeconds />

          <div className="line-holder" style={{
            transform: 'rotate(' + pointerMinutesAngle + 'deg)'
          }}>
            <div className="pointer-minutes"></div>
          </div>

          <div className="line-holder" style={{
            transform: 'rotate(' + pointerSecondsAngle + 'deg)'
          }}>
            <div className="pointer-seconds"></div>
          </div>

        </div>
      </div>
    </>
  );
};

export default WidgetAnalogTimer;