import Player from "./Player"
class Computer extends Player {
  constructor(
    name = "ai",
    hand = [],
    dealer = false,
    pickedCards = [],
    scoreCurrentGame = 0,
    totalScore = 0,
    sevenDiamonds = false,
    scopa=0

  ) {
    super(name, hand, dealer, pickedCards, scoreCurrentGame, totalScore, sevenDiamonds,scopa);
  }
}

export default Computer