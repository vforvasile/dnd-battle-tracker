import React from 'react';
import { getDamageLevel } from '../../display/displayLogic';

function HealthPoints({
  short,
  hp,
  maxHp,
  tempHp,
  className,
  playerSession,
  armorClass,
  spellsLeft,
}) {
  const displayLong = !short && !playerSession;
  const displayTempHp = tempHp !== null && tempHp !== 0;
  const { level, display } = getDamageLevel(hp, maxHp);
  const classes = `health-points--${level} ${className}`;
  const hpLabel = playerSession ? 'Hit Points' : 'Current Hit Points';
  const acLabel = playerSession ? 'AC' : 'Armor Class';

  const shortTempHpDisplay = displayTempHp ? ` (+${tempHp})` : '';
  const shortHpDisplay = playerSession ? display : `${hp}${shortTempHpDisplay}`;
  const longHpDisplay = playerSession ? display : hp;

  return (
    <>
      {displayLong && (
        <div className={className}>
          <b>Max Hit Points</b>
          {' '}
          {maxHp}
        </div>
      )}
      {displayLong && displayTempHp && (
        <div className={className}>
          <b>Temporary Hit Points</b>
          {' '}
          {tempHp}
        </div>
      )}
      {armorClass && (
      <div style={{ marginRight: 15 }} className={classes}>
        {short && (
        <b>
          {`AC ${armorClass} `}
          {' '}
        </b>
        )}
        {!short && (
        <>
          <b>{acLabel}</b>
          {' '}
          {armorClass}
          {' '}
        </>
        )}
      </div>
      )}

      <div style={{ marginRight: 15 }} className={classes}>
        {short && `HP ${shortHpDisplay} `}
        {!short && (
          <>
            <b>{hpLabel}</b>
            {' '}
            {longHpDisplay}
            {' '}
          </>
        )}
      </div>
      {typeof spellsLeft === 'number' && (
      <div className={classes}>
        {' '}
        {' '}
        {short && `Spells: ${spellsLeft} `}
        {!short && (
        <>
          <b>Spell Slots:</b>
          {' '}
          {spellsLeft}
          {' '}
        </>
        )}
      </div>
      )}
    </>
  );
}

HealthPoints.defaultProps = {
  short: false,
};

export default HealthPoints;
