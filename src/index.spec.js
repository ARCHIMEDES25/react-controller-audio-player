import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import Player from '.';

const src =
  'http://feedproxy.google.com/~r/thornmorris/~5/SxdFhtf6W1w/jjgo190423_ep581a.mp3';

const playerInitialState = {
  canPlay: false,
  duration: 0,
  onPlayHead: false,
  playing: false,
  playHeadMarginLeft: 0,
  playedTime: 0,
};

afterEach(cleanup);

describe('Player', () => {
  test('should mount', () => {
    const player = <Player />;
    expect(player).toBeDefined();
  });

  test('should call children on mounting', () => {
    const children = jest.fn();
    render(<Player src={src}>{children}</Player>);
    expect(children).toHaveBeenCalledTimes(1);
  });

  test('should render audio element with correct src', () => {
    const children = jest.fn();
    const player = render(<Player src={src}>{children}</Player>);
    const audio = player.getByTestId('audio-element');
    expect(audio.src).toBe(src);
  });

  test('should call children with initial expected state', () => {
    const children = jest.fn();
    render(<Player src={src}>{children}</Player>);

    expect(children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        ...playerInitialState,
        pause: expect.any(Function),
        play: expect.any(Function),
        movePlayHead: expect.any(Function),
        setOnPlayHead: expect.any(Function),
        timeLineRef: expect.any(Object),
        playHeadRef: expect.any(Object),
      }),
    );
  });

  test('should call children with expected state as per call stack', () => {
    const children = jest.fn();
    const player = render(<Player src={src}>{children}</Player>);
    const audio = player.getByTestId('audio-element');
    fireEvent.play(audio);

    expect(children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        playing: true,
      }),
    );

    fireEvent.ended(audio);
    expect(children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        playing: false,
      }),
    );

    fireEvent.play(audio);
    expect(children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        playing: true,
      }),
    );

    fireEvent.pause(audio);
    expect(children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        playing: false,
      }),
    );

    fireEvent.canPlayThrough(audio);
    expect(children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        canPlay: true,
      }),
    );
  });
});
