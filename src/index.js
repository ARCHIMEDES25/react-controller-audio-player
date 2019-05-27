import React, { useState, useEffect, Fragment } from 'react';

export default function Player({ src, children }) {
  const [onPlayHead, setOnPlayHead] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [playHeadMarginLeft, setPlayHeadMarginLeft] = useState(0);
  const [playedTime, setPlayedTime] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = React.createRef();
  const timeLineRef = React.createRef();
  const playHeadRef = React.createRef();

  const getElementPosition = element => element && element.getBoundingClientRect().left;
  const getAudioCurrentTime = () => audioRef.current.currentTime;
  const getTimelineWidth = () => (timeLineRef.current && playHeadRef.current ?
    timeLineRef.current.offsetWidth - playHeadRef.current.offsetWidth :
    0);

  const movePlayHead = (e) => {
    const timelineWidth = getTimelineWidth();

    const updatedMarginLeft =
      e.clientX - getElementPosition(timeLineRef.current);

    if (updatedMarginLeft >= 0 && updatedMarginLeft <= timelineWidth) {
      setPlayHeadMarginLeft(updatedMarginLeft);
    }
    if (updatedMarginLeft < 0) {
      setPlayHeadMarginLeft(0);
    }
    if (updatedMarginLeft > timelineWidth) {
      setPlayHeadMarginLeft(timelineWidth);
    }

    setAudioCurrentTime(duration * (updatedMarginLeft / timelineWidth));
  };

  useEffect(() => {
    audioRef.current.currentTime = audioCurrentTime;
  }, [audioCurrentTime]);

  const play = () => audioRef.current.play();
  const pause = () => audioRef.current.pause();

  return (
    <Fragment>
      <audio
        data-testid='audio-element'
        ref={audioRef}
        src={src}
        onTimeUpdate={() => {
          const currentTime = getAudioCurrentTime();
          const playPercent = getTimelineWidth() * (currentTime / duration);
          setPlayHeadMarginLeft(playPercent);
          setPlayedTime(currentTime);
        }}
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        onCanPlayThrough={() => {
          setDuration(audioRef.current.duration);
          setCanPlay(true);
        }}
      >
        Your browser does not support the
        <code>audio</code> element.
      </audio>
      {children({
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
      })}
    </Fragment>
  );
}
