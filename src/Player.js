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
  playCard(cardSelected,cardsPicked,game) {
    console.log("cardsPicked", $(cardsPicked).get())
    console.log("cardSelected",cardSelected)
    console.log('table',game.table)
   //need to keep track of cards picked
   //need to get object card played and push it in this.pickedCards
   this.pickedCards.push(this.hand.filter(card=>card.name===cardSelected)[0])
   
   //need to get the object of every card picked and push them in this.pickedCards
   for(var i=0; i<cardsPicked.length;i++){
     for(var j=0; j<game.table.length;j++){
       console.log('game.table[j] BEFORE IF STATEMENT and $(cardsPicked[i]).attr("data-card-name") ',game.table[j],$(cardsPicked[i]).attr("data-card-name") )
       if($(cardsPicked[i]).attr("data-card-name")===game.table[j].name){
        console.log('game.table[j] AFTER IF STATEMENT  ',game.table[j]) 
        this.pickedCards.push(game.table[j])}
     }
   }
   console.log("final pick",this.pickedCards)

   this.hand=this.hand.filter(card=>{
      
      return card.name!==cardSelected})

      for(var i=0; i<cardsPicked.length;i++){
        this.pickedCards.push(cardsPicked[i]) 
  game.table = game.table.filter(card=>{
    return card.name!==$(cardsPicked[i]).attr("data-card-name")})
}


    //put card on the table
    // game.table.push(cardPlayed);
    //if available get card(s) or just add to the table
  }
  addCardToTable(cardPlayed, table){
    
    
    for (var i = 0; i < this.hand.length; i++) {
         if (this.hand[i].name === cardPlayed) {
           
          // table.push(this.hand.splice(i, 1)[0]);
          table.push(this.hand[i])

           
         }
       }
    
    this.hand=this.hand.filter(card=>{
    return card.name!==cardPlayed})
    
  }
  checkAvailableMove(table, cardPlayed) {
   

    // var cardPlayed 
   
    // for (var i = 0; i < this.hand.length; i++) {
    //   if (this.hand[i].name === cardPlayed) {
    //     // cardPlayed= this.hand.splice(i, 1)[0];
    //     cardPlayed= this.hand[i]
    //   }
    // }
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
        availablePicks.push([table[i]]);
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
      return [];
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
        
        return acc + current[0].value;
      }, 0)
      //return an array with the value left on table after each move
      
    });
    return availablePicksTotValue.map(x => tableValue - x);
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
//check how many diamonds for the single combination
  checkHowManyDiamondsInCombination(availablePicks,cardPlayed){
   var mappedPicks= availablePicks.map(function(pick){
      return pick.filter(card=>card.name.split("")[1]==="D").length
     })
    //if also  the card played is diamonds add 1 to each pick
    if(cardPlayed.name.split("")[1]==="D"){
      return mappedPicks.map(pick=>pick+=1)
    }
    
  }
//

}