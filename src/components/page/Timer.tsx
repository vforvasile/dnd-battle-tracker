import React from 'react';

function getTime(startTime:number, endTime?:number) {
  if (endTime) {
    return endTime - startTime;
  }
  return startTime;
}

function getRound(startRound?:number, endRound?:number) {
  if (startRound !== undefined && endRound !== undefined) {
    if (endRound === 0) {
      return endRound;
    }

    if (startRound === 0) {
      return endRound - startRound - 1;
    }

    return endRound - startRound;
  }
  return startRound;
}

type Props = {
  startRound?: number;
  endRound?: number;
  startTime: number;
  endTime?: number;
  className?: string;
}

function Timer({
  startRound,
  endRound,
  startTime,
  endTime,
  className,
}:Props) {
  const time = getTime(startTime, endTime);
  const round = getRound(startRound, endRound);
  const showRound = round !== undefined;
  const minutes = Math.floor(parseFloat(`${time}`) / 60.0);
  const remainingSeconds = time % 60;

  const roundAriaLabel = showRound ? `${round} rounds ` : '';
  const timeAriaLabel = `${minutes} minutes ${remainingSeconds} seconds`;

  return (
    <span className={className} aria-label={roundAriaLabel + timeAriaLabel}>
      {showRound && `${round}r `}
      {`${minutes}m `}
      {`${remainingSeconds}s`}
    </span>
  );
}

export default Timer;
