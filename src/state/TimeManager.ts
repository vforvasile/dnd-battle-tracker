export default function getSecondsElapsed(round:number) {
  if (!round || round <= 0) {
    return 0;
  }
  return (round - 1) * 6;
}
