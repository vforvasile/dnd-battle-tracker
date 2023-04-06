import React from 'react';
import { hotkeys, hotkeyDescriptions, playerSessionHotkeyDescriptions } from '../../../hotkeys/hotkeys';
import { objKeys } from '../../../util/util';

type Props = {
  playerSession: boolean;
}

export default function Shortcuts({ playerSession }:Props) {
  const hotkeysToDisplay = playerSession ? playerSessionHotkeyDescriptions : hotkeyDescriptions;
  return (
    <>
      <p>Mod is Ctrl or Cmd on Mac.</p>
      <ul>
        {objKeys(hotkeysToDisplay).map((key) => {
          const hotkey = hotkeys[key];
          const hotkeyDescription = hotkeysToDisplay[key];
          return (
            <li key={hotkey}>
              <b>{hotkey}</b>
              {' '}
              {hotkeyDescription}
            </li>
          );
        })}
      </ul>
    </>
  );
}
