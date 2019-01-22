class Scopa {
  constructor(cards) {
    this.cards = cards;
    this.table = [];
  }
  shuffle(array) {
    var m = array.length,
      t,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  }
  giveCard(player) {
    player.hand.push(this.cards.pop());
  }
  putCardsOnTable() {
    for (var i = 0; i < 4; i++) {
      this.table.push(this.cards.pop());
    }
  }

  howManyDiamonds(cards) {
    var count = 0
    cards.forEach((card => {
      if (card.name.split("")[1] === "D") {
        count++;
      }
    }))
    return count
  }
  //get the total value of the four best prime value
  checkHighestPrime(cards) {
    //sort by prime value
    var sortedCards = cards.sort(function (a, b) {
      return b.prime - a.prime;
    });
    //get first four
    var firstFour = sortedCards.slice(0, 4)
    //get total first four
    var total = firstFour.reduce(function (acc, current) {
      return acc + current.prime
    }, 0)

    return total
  }


}



