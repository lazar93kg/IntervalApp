const WidgetDigitalTimer = (props: any) => {
    const seconds = props.seconds;
    const minutes = props.minutes;
  
    return (
      <>
        <div className="widget-digital-timer">
          {minutes}<span>:</span>{("00" + seconds).slice(-2)}
        </div>
      </>
    );
  };
  
  export default WidgetDigitalTimer;