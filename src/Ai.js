class Computer extends Player {
  constructor(
    name = "ai",
    hand = [],
    dealer = false,
    pickedCards = [],
    scoreCurrentGame = 0,
    totalScore = 0,
    sevenDiamonds = false

  ) {
    super(name, hand, dealer, pickedCards, scoreCurrentGame, totalScore, sevenDiamonds);
  }
}