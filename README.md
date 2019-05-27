# react-controller-audio-player

This is a HTML5 audio player react component. It uses a [render
prop][use-a-render-prop] which gives you maximum flexibility with a minimal API
because you are responsible for the rendering of everything and you simply apply
props to what you're rendering.

## Install:

```
npm install react-controller-audio-player --save
```

## Usage

```jsx
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Player from 'react-controller-audio-player';
// sample style
import from 'react-controller-audio-player/dist/style.css';

const sampleClassNames = {
  container: 'container',
  timeLine: 'timeLine',
  playHead: 'playHead',
  timeLabel: 'timeLabel'
};

const Play = () => (
  <svg height='50px' version='1.1' viewBox='0 0 20 20' width='50px'>
    <g fill='none' fillRule='evenodd' stroke='none' strokeWidth='1'>
      <g fill='#E98074' transform='translate(-126.000000, -85.000000)'>
        <g transform='translate(126.000000, 85.000000)'>
          <path d='M10,0 C4.5,0 0,4.5 0,10 C0,15.5 4.5,20 10,20 C15.5,20 20,15.5 20,10 C20,4.5 15.5,0 10,0 L10,0 Z M8,14.5 L8,5.5 L14,10 L8,14.5 L8,14.5 Z' />
        </g>
      </g>
    </g>
  </svg>
);

const Pause = () => (
  <svg height='50px' version='1.1' viewBox='0 0 20 20' width='50px'>
    <g fill='none' fillRule='evenodd' stroke='none' strokeWidth='1'>
      <g fill='#E98074' transform='translate(0.000000, -85.000000)'>
        <g transform='translate(0.000000, 85.000000)'>
          <path d='M10,0 C4.5,0 0,4.5 0,10 C0,15.5 4.5,20 10,20 C15.5,20 20,15.5 20,10 C20,4.5 15.5,0 10,0 L10,0 Z M9,14 L7,14 L7,6 L9,6 L9,14 L9,14 Z M13,14 L11,14 L11,6 L13,6 L13,14 L13,14 Z' />
        </g>
      </g>
    </g>
  </svg>
);

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

const src = 'some audio source';

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
      playedTime
    }) => (
      <Fragment>
        {canPlay ? (
          <div className={sampleClassNames.container}>
            <div onClick={playing ? pause : play}>
              {playing ? <Pause /> : <Play />}
            </div>
            <span className={sampleClassNames.timeLabel}>{secToHHMMSS(playedTime)}</span>
            <div
              className={sampleClassNames.timeLine}
              ref={timeLineRef}
              onClick={movePlayHead}
              onMouseMove={e => onPlayHead && movePlayHead(e)}
              onMouseDown={() => setOnPlayHead(true)}
              onMouseUp={() => setOnPlayHead(false)}
            >
              <div
                ref={playHeadRef}
                className={sampleClassNames.playHead}
                style={{ marginLeft: playHeadMarginLeft }}
              />
            </div>
            <span className={sampleClassNames.timeLabel}>{secToHHMMSS(duration)}</span>
          </div>
        ) : (
          <span>Unable to play audio</span>
        )}
      </Fragment>
    )}
  </Player>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

Component [Inspired by][inspired-by]

Contributions of any kind welcome!

## LICENSE

MIT

[inspired-by]: https://codepen.io/katzkode/pen/Kfgix
[use-a-render-prop]: https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce
