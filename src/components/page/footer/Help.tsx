import React from 'react';
import Disclosure from './Disclosure';
import Shortcuts from './Shortcuts';
import Info from './Info';
import DmTips from './DmTips';

type Props = {
  playerSession: boolean;
}

export default function Help({ playerSession }:Props) {
  return (
    <dl>
      {!playerSession
        && (
        <Disclosure id="dm-tips" name="Dungeon Master tips">
          <DmTips />
        </Disclosure>
        )}
      <Disclosure id="keyboard-shortcuts" name="Keyboard shortcuts">
        <Shortcuts playerSession={playerSession} />
      </Disclosure>
      <Disclosure id="info" name="Info">
        <Info />
      </Disclosure>
    </dl>
  );
}
