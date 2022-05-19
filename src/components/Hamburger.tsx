const Hamburger = (props: any) => {

    return (
      <div className="hamburger" onClick={() => { props.cbMenuToggle() }}>
      <div className="line line-1"></div>
      <div className="line line-2"></div>
      <div className="line line-3"></div>
      <div className="line line-4"></div>
      </div>
    );
  };
  
  export default Hamburger;

