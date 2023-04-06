function rollDice(diceType:number = 20) {
  return Math.floor(Math.random() * diceType) + 1;
}

export default rollDice;
