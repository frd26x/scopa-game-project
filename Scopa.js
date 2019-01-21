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

class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.dealer = false;
    this.pickedCards = [];
    this.scoreCurrentGame = 0;
    this.totalScore = 0;
    this.sevenDiamonds = false;
  }
  playCard(cardSelected) {
    for (var i = 0; i < 3; i++) {
      if (this.hand[i].name === cardSelected.name) {
        var cardPlayed = this.hand.splice(i, 1);
      }
    }
    //put card on the table
    this.table.push(cardPlayed);
    //if available get card(s) or just add to the table
  }
  checkAvailableMove(table, cardPlayed) {
    //find ALL the combination between the cards on the table
    function combine(a, min) {
      var fn = function (n, src, got, all) {
        if (n == 0) {
          if (got.length > 0) {
            all[all.length] = got;
          }
          return;
        }
        for (var j = 0; j < src.length; j++) {
          fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
        }
        return;
      };
      var all = [];
      for (var i = min; i < a.length; i++) {
        fn(i, a, [], all);
      }
      all.push(a);
      return all;
    }

    //get all combinations that sum up the value of the card played
    var availablePicks = [];

    //if it's possible to pick a single card you have to, no possible combination
    for (var i = 0; i < table.length; i++) {
      if (table[i].value === cardPlayed.value) {
        availablePicks.push(table[i]);
      }
    }

    //otherwise you can pick a combination (if available)
    if (availablePicks.length === 0) {
      //get all possible combination  from table cards
      var possibleTableCombinations = combine(table, 2);

      //get only the combination that sum up the value of the card played
      possibleTableCombinations.forEach(function (cardCombination) {
        if (
          cardCombination.reduce(function (acc, current) {
            return acc + current.value;
          }, 0) === cardPlayed.value
        )
          availablePicks.push(cardCombination);
      });
    }

    //if there are not available pick you can just add the card on the table
    if (availablePicks.length > 0) {
      return availablePicks;
    } else {
      return false;
    }
  }
  //for each move check wich cards are left on the table, it will return an array
  checkWhatLeft(availablePicks, table) {
    var tableValue = table.reduce(function (acc, current) {
      return acc + current.value;
    }, 0);
    //transform each pick in the total value of the card picked
    var availablePicksTotValue = availablePicks.map(function (pick) {
      return pick.reduce(function (acc, current) {
        return acc + current.value;
      }, 0)
      //return an array with the value left on table after each move
      return availablePicksTotValue.map(x => tableValue - x);
    });
  }

  checkValueTable(table) {
    return table.reduce(function (acc, current) {
      return acc + current.value;
    }, 0);
  }
  //are all out the cards able to do scopa?
  checkOddsScopa(table, myHand, myPicks, otherPlayerPick, valueTable) {
    var count = 0;
    table.forEach(x => {
      if (x.value === valueTable) {
        count++;
      }
    });
    myHand.forEach(x => {
      if (x.value === valueTable) {
        count++;
      }
    });
    myPicks.forEach(x => {
      if (x.value === valueTable) {
        count++;
      }
    });
    otherPlayerPick.forEach(x => {
      if (x.value === valueTable) {
        count++;
      }
    });

    if (count === 4) return true;
    return false;
  }
}

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