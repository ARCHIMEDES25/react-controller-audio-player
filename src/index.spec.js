import React from 'react';
import Player from '.';

test('mounts', () => {
  const player = <Player />;
  expect(player).toBeDefined();
});
