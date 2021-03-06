import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import Player from '..';

import css from '../style.css';

import Play from './assets/Play';
import Pause from './assets/Pause';

// Dummy time formatter
function secToHHMMSS(timeInSeconds) {
  if (Number.isNaN(parseFloat(timeInSeconds))) {
    return 'Not a valid number';
  }
  const pad = input => (input < 10 ? `0${input}` : `${input}`.slice(0, 2));
  const time = parseFloat(timeInSeconds).toFixed(3);
  const hours = Math.floor(time / 36000);
  const minutes = Math.floor(time / 60) % 60;
  const seconds = Math.floor(time - minutes * 60);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const src =
  'http://feedproxy.google.com/~r/thornmorris/~5/SxdFhtf6W1w/jjgo190423_ep581a.mp3';

const App = () => (
  <Player src={src}>
    {({
      canPlay,
      playing,
      pause,
      play,
      movePlayHead,
      playHeadMarginLeft,
      setOnPlayHead,
      onPlayHead,
      duration,
      timeLineRef,
      playHeadRef,
      playedTime,
    }) => (
      <Fragment>
        {canPlay ? (
          <div className={css.container}>
            <div onClick={playing ? pause : play}>
              {playing ? <Pause /> : <Play />}
            </div>
            <span className={css.timeLabel}>{secToHHMMSS(playedTime)}</span>
            <div
              className={css.timeLine}
              ref={timeLineRef}
              onClick={movePlayHead}
              onMouseMove={e => onPlayHead && movePlayHead(e)}
              onMouseDown={() => setOnPlayHead(true)}
              onMouseUp={() => setOnPlayHead(false)}
            >
              <div
                ref={playHeadRef}
                className={css.playHead}
                style={{ marginLeft: playHeadMarginLeft }}
              />
            </div>
            <span className={css.timeLabel}>{secToHHMMSS(duration)}</span>
          </div>
        ) : (
          <span>Unable to play audio</span>
        )}
      </Fragment>
    )}
  </Player>
);

ReactDOM.render(<App />, document.getElementById('root'));
