class Scopa {
  constructor(cards) {
    this.cards = cards;
    this.table = [];
    this.whoPickLastCard = undefined
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
  getTotalScore(player,ai){
    //check Prime, if equal nobody gain any point
var playerPrime = this.checkHighestPrime(player.pickedCards)
var aiPrime = this.checkHighestPrime(ai.pickedCards)
if(playerPrime>aiPrime){
  player.scoreCurrentGame++
}else if(playerPrime<aiPrime){
  aiPrime.scoreCurrentGame++
}

//check who has more card
if(player.pickedCards.length>ai.pickedCards.length){
  player.scoreCurrentGame++
}else if(player.pickedCards.length>ai.pickedCards.length){
  ai.scoreCurrentGame++
}

//check who has seven of diamonds
if(player.sevenDiamonds){
  player.scoreCurrentGame++
}else{
  ai.scoreCurrentGame++
}

//check who has more diamonds
var playerDiamonds = player.pickedCards.filter(x=>x.name.split("")[1]==="D").length
var aiDiamonds = ai.pickedCards.filter(x=>x.name.split("")[1]==="D").length
if(playerDiamonds>aiDiamonds){
  player.scoreCurrentGame++
}else if(playerDiamonds<aiDiamonds){
  ai.scoreCurrentGame++

}
return [{playerDiamonds:playerDiamonds, playerPrime:playerPrime},{aiDiamonds:aiDiamonds, aiPrime:aiPrime}]

  }

  cleanTable(whoPickLastCard){
    for(var i=0; i<this.table.length; i++){
      whoPickLastCard.pickedCards.push(this.table[i])
    }
  }


}



