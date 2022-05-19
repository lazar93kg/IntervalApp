import React, { useEffect, useReducer, useState } from "react";
import './App.scss';
import ScreenAlarm from "./components/ScreenAlarm";
import ScreenAnalogTimer from "./components/ScreenAnalogTimer";
import ScreenBreak from "./components/ScreenBreak";
import ScreenDigitalTimer from "./components/ScreenDigitalTimer";
import ScreenHome from "./components/ScreenHome";
import ScreenMenu from "./components/ScreenMenu";
import ScreenSetTimer from "./components/ScreenSetTimer";


const getMinutesSeconds = (ms: number) => {
  let minutes = Math.floor(ms / (60 * 1000));
  let seconds = Math.floor((ms - (minutes * (60 * 1000))) / 1000);
  return [minutes, seconds];
};

let intervalID: any = false;


const App = () => {
  const [refresh, setRefresh] = useState(0); // this state is just for refreshing the screen on every tick
  const [menuOpened, setMenuOpened] = useState(false);
  const [mode, setMode] = useState('ANALOG'); // ANALOG/DIGITAL


  // timer status
  const OFF = 'OFF';
  const SETTING = 'SETTING';
  const RUNNING = 'RUNNING';
  const BREAK = 'BREAK';
  const ALARM = 'ALARM';

  const initialState = {
    status: OFF,
    intervals: false,
    breaks: false,
    minutes: 0,
    milisecondsMax: 0,
  };

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case 'ABORT_TIMER':
        return {
          ...state,
          status: OFF
        };

      case 'SET_NEW_TIMER':
        return {
          ...state,
          status: SETTING
        };

      case 'START_TIMER':
        return {
          ...state,
          intervals: action.payload.intervals,
          breaks: action.payload.breaks,
          minutes: action.payload.minutes,
          milisecondsMax: Date.now() + (action.payload.minutes * (60 * 1000)),
          status: RUNNING
        };

      case 'START_BREAK':
        const fiveMinutes = 5;
        return {
          ...state,
          milisecondsMax: Date.now() + fiveMinutes * (60 * 1000),
          status: BREAK
        };

      case 'REPEAT_TIMER':
        return {
          ...state,
          milisecondsMax: Date.now() + (state.minutes * (60 * 1000)),
          status: RUNNING
        };

      case 'ALARM':
        return {
          ...state,
          milisecondsMax: 0,
          status: ALARM
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const tick = (state: any) => {
    const miliseconds = Date.now();
    
    if (state.status === RUNNING) {
      if (miliseconds >= state.milisecondsMax) {

        // time is up
        console.log('Time is up!');
        if (state.intervals === true) {
          if (state.breaks === true) {
            dispatch({
              type: 'START_BREAK'
            });
          } else {
            dispatch({
              type: 'REPEAT_TIMER'
            });
          }
        } else {
          dispatch({
            type: 'ALARM'
          });
        }
      }
    } else if (state.status === BREAK) {
      if (miliseconds >= state.milisecondsMax) {
        
        // break time is up
        console.log('Break time is up!');
        dispatch({
          type: 'REPEAT_TIMER'
        });
      }
    }

    // REFRESH SCREEN
    setRefresh(refresh => refresh + 1);
  };

  useEffect(() => {
    //
    if (intervalID) {
      clearTimeout(intervalID);
    }
    if (state.status === RUNNING || state.status === BREAK) {
      intervalID = setTimeout(() => {
        // call tick every second
        tick(state);
      }, 1000);
    }
  }, [tick, state]);


  // PREPARING DATA

  const cbSetMode = (x: any) => {
    setMode(x);
    setMenuOpened(false);
  };

  const cbMenuToggle = () => {
    setMenuOpened(opened => {
      if (opened) {
        return false;
      }
      return true;
    });
  };

  const cbSetNewTimer = () => {
    dispatch({
      type: 'SET_NEW_TIMER'
    });
  };

  const cbStartTimer = (payload: any) => {
    dispatch({
      type: 'START_TIMER',
      payload: payload
    });
  };

  const cbAbortTimer = (payload: any) => {
    dispatch({
      type: 'ABORT_TIMER',
      payload: payload
    });
  };

  const cbAbortBreak = () => {
    dispatch({
      type: 'REPEAT_TIMER'
    });
  };

  // calculate minutes and seconds to display
  let milisecondsLeft = 0;
  const delta = state.milisecondsMax - Date.now();

  if ((state.status === RUNNING || state.status === BREAK) && delta > 0) {
    milisecondsLeft = delta;
  }
  const [minutes, seconds] = getMinutesSeconds(milisecondsLeft);

  let jsxScreen = null;
  if (state.status === OFF) {
    jsxScreen = (
      <ScreenHome cbSetNewTimer={cbSetNewTimer} cbMenuToggle={cbMenuToggle} />
    );
  } else if (state.status === SETTING) {
    jsxScreen = (
      <ScreenSetTimer cbStartTimer={cbStartTimer} cbMenuToggle={cbMenuToggle} />
    );
  } else if (state.status === RUNNING) {
    if (mode === 'DIGITAL') {
      jsxScreen = (
        <ScreenDigitalTimer minutes={minutes} seconds={seconds} cbAbortTimer={cbAbortTimer} cbMenuToggle={cbMenuToggle} />
      );
    } else {
      jsxScreen = (
        <ScreenAnalogTimer minutes={minutes} seconds={seconds} cbAbortTimer={cbAbortTimer} cbMenuToggle={cbMenuToggle} />
      );
    }
  } else if (state.status === ALARM) {
    jsxScreen = (
      <ScreenAlarm cbSetNewTimer={cbSetNewTimer} cbMenuToggle={cbMenuToggle} />
    );
  } else if (state.status === BREAK) {
    jsxScreen = (
      <ScreenBreak minutes={minutes} seconds={seconds} cbAbortBreak={cbAbortBreak} cbMenuToggle={cbMenuToggle} />
    );
  }

  return (
    <>
      <div className="screen-wrapper">
        {jsxScreen}
        <div className={menuOpened ? "menu-container opened" : "menu-container"}>
          {
            menuOpened && (
              <ScreenMenu cbSetMode={cbSetMode} cbMenuToggle={cbMenuToggle} />
            )
          }
        </div>
      </div>
    </>
  );
};

export default App;
import React from 'react'

export default function App() {
  return (
    <div>Parcel - Getting Started</div>
  )
}
