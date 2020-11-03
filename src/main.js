import Player from "./Player"
import Scopa from "./Scopa"
import Computer from "./Ai"
const defaultState = {
  cards:[],
  playerHand:[],
  cpuHand:[],
  playerPicks:[],
  cpuPicks:[]
}

var cards = [
  { name: "1D", img: "1D.jpg", value: 1, prime: 16 },
  { name: "2D", img: "2D.jpg", value: 2, prime: 12 },
  { name: "3D", img: "3D.jpg", value: 3, prime: 13 },
  { name: "4D", img: "4D.jpg", value: 4, prime: 14 },
  { name: "5D", img: "5D.jpg", value: 5, prime: 15 },
  { name: "6D", img: "6D.jpg", value: 6, prime: 18 },
  { name: "7D", img: "7D.jpg", value: 7, prime: 21 },
  { name: "JD", img: "JD.jpg", value: 8, prime: 10 },
  { name: "QD", img: "QD.jpg", value: 9, prime: 10 },
  { name: "KD", img: "KD.jpg", value: 10, prime: 10 },
  { name: "1C", img: "1C.jpg", value: 1, prime: 16 },
  { name: "2C", img: "2C.jpg", value: 2, prime: 12 },
  { name: "3C", img: "3C.jpg", value: 3, prime: 13 },
  { name: "4C", img: "4C.jpg", value: 4, prime: 14 },
  { name: "5C", img: "5C.jpg", value: 5, prime: 15 },
  { name: "6C", img: "6C.jpg", value: 6, prime: 18 },
  { name: "7C", img: "7C.jpg", value: 7, prime: 21 },
  { name: "JC", img: "JC.jpg", value: 8, prime: 10 },
  { name: "QC", img: "QC.jpg", value: 9, prime: 10 },
  { name: "KC", img: "KC.jpg", value: 10, prime: 10 },
  { name: "1S", img: "1S.jpg", value: 1, prime: 16 },
  { name: "2S", img: "2S.jpg", value: 2, prime: 12 },
  { name: "3S", img: "3S.jpg", value: 3, prime: 13 },
  { name: "4S", img: "4S.jpg", value: 4, prime: 14 },
  { name: "5S", img: "5S.jpg", value: 5, prime: 15 },
  { name: "6S", img: "6S.jpg", value: 6, prime: 18 },
  { name: "7S", img: "7S.jpg", value: 7, prime: 21 },
  { name: "JS", img: "JS.jpg", value: 8, prime: 10 },
  { name: "QS", img: "QS.jpg", value: 9, prime: 10 },
  { name: "KS", img: "KS.jpg", value: 10, prime: 10 },
  { name: "1H", img: "1H.jpg", value: 1, prime: 16 },
  { name: "2H", img: "2H.jpg", value: 2, prime: 12 },
  { name: "3H", img: "3H.jpg", value: 3, prime: 13 },
  { name: "4H", img: "4H.jpg", value: 4, prime: 14 },
  { name: "5H", img: "5H.jpg", value: 5, prime: 15 },
  { name: "6H", img: "6H.jpg", value: 6, prime: 18 },
  { name: "7H", img: "7H.jpg", value: 7, prime: 21 },
  { name: "JH", img: "JH.jpg", value: 8, prime: 10 },
  { name: "QH", img: "QH.jpg", value: 9, prime: 10 },
  { name: "KH", img: "KH.jpg", value: 10, prime: 10 }
];

var player;
var game;
var ai;
const startGame = function() {
  init();
  
  // setTimeout(giveCardPlayer,500)

  giveCardPlayer();

  giveCardAI();

  giveCardPlayer();

  giveCardAI();

  giveCardPlayer();

  giveCardAI();

  putCardsOnTable();

  //on click option to select card on hand
  allowSelectCards();

  //on click option in order to pick cards from table
  allowPickCards();

  //play card the button
  playCardPlayer();

  $(".help-button").click(function(){
    $(".help").toggleClass("hide-score")
  })
}
const start = document.getElementById("start")
start.addEventListener("click",startGame)

function aiGame() {
  
  var arrayMove = [];
  for (var i = 0; i < ai.hand.length; i++) {
    arrayMove.push(ai.checkAvailableMove(game.table, ai.hand[i]));
  }
 
  //if no moves available just add card to table
  if (arrayMove.every(move => move.length === 0)) {
    //pick a card to add to the table
    console.log("NO PICKING AVAILABLE");
   
    //choose the one with the highest value
    var cardToPlayPosition = 0;
    if (ai.hand.length > 1) {
      for (var i = 1; i < ai.hand.length; i++) {
        if (ai.hand[i].value > ai.hand[cardToPlayPosition]) {
          cardToPlayPosition = ai.hand[i];
        }
      }
    }

    //append the choosed card to the table
    var cardToPlay = $(".hand-ai").children()[cardToPlayPosition];
    $(cardToPlay).removeClass('ai-show-back')
   setTimeout(function(){
    $(".table").append(cardToPlay);
    $(cardToPlay).unbind("click");
    $(cardToPlay).removeClass("selected-card onclick-option");
    $(cardToPlay).click(function(e) {
      $(this).toggleClass("select-pick");
    });
    //update AI LOGIC 
    ai.addCardToTable(ai.hand[cardToPlayPosition].name, game.table);
    if(game.cards.length===0 && player.hand.length===0 && ai.hand.length===0){
      game.cleanTable(game.whoPickLastCard)
    }
    
   },2000)
    
    //if there are at least 6 cards on the deck start a new turn
    setTimeout(checkGameOver,5000)
   
   
  }
  //if there are moves available
  else {
    console.log("THERE ARE MOVES AVAILABLE");

    
    
    //get card to play (for now play the one can get card)
    //find index card that can pick

    var cardToPlay = arrayMove.indexOf(
      arrayMove.filter(move => move.length > 0)[0]
    );
   


    //show card before to play it
    $($(".hand-ai").children()[cardToPlay]).removeClass('ai-show-back')
    setTimeout(function(){
      //remove the played card from the hand
      
    
      
    

    //DOM
    //get card to pick (for now play the one can get card)
    var nameCardsToPick = [];

    //array to pass to the logic
    var cardPicked = [];

    
    for (var i = 0; i < arrayMove[cardToPlay][0].length; i++) {
      nameCardsToPick.push(arrayMove[cardToPlay][0][i].name);
    }
    
    var table = $(".table").children();
    var tableCardToRemove=[]
    for (var i = 0; i < nameCardsToPick.length; i++) {
      for (var j = 0; j < table.length; j++) {
        if ($(table[j]).attr("data-card-name") === nameCardsToPick[i]) {
          $(table[j]).addClass("select-pick-ai")
          cardPicked.push($(table[j]));
          
          
          tableCardToRemove.push(table[j]);

          
         
        }
      }
    }
    setTimeout(function(){
for(var i=0; i<tableCardToRemove.length;i++){
  $(tableCardToRemove[i]).remove()
}
$($(".hand-ai").children()[cardToPlay]).remove();
    },1500)

    //update logic after card is played
    ai.playCard(ai.hand[cardToPlay].name, cardPicked, game);
    if(ai.pickedCards.length>1){
      $(".pick-ai").removeClass("hide-score")
    }
    game.whoPickLastCard=ai
    if(game.cards.length===0 && player.hand.length===0 && ai.hand.length===0){
      game.cleanTable(game.whoPickLastCard)
    }

    },2000)
    
    //if there are at least 6 cards on the deck and the players don't have any card on their hands start a new turn
    setTimeout(checkGameOver,5000)
   
    
  }
}

////////////////////////GIVE CARD AI
function giveCardAI() {
  var card = $(".deck > .card-deck")[$(".deck > .card-deck").length - 1];
  $(card).toggleClass("card-deck");
  $(card).toggleClass("card-hand ai-show-back");
  $(".hand-ai").append(card);
  game.giveCard(ai);
}

//////////////////GIVE CARD PLAYER
function giveCardPlayer() {
  var CardPlayer = $(".deck > .card-deck")[$(".deck > .card-deck").length - 1];
  $(".hand-player").append(CardPlayer);
  $(CardPlayer).toggleClass("card-deck");
  $(CardPlayer).toggleClass("card-hand onclick-option");
  game.giveCard(player);
}

///////////////////////////MAKE CARD HAND PLAYER SELECTABLE
function makeCardsPlayerSelectable() {
  $(".onclick-option").click(function(e) {
    // console.log('selected',e)

    $(".selected-card").toggleClass("selected-card");

    $(this).toggleClass("selected-card");
  });
}
//in the begining of the game put 4 card on the table
function putCardsOnTable() {
  
  for (var i = 0; i < 4; i++) {
    var cardTable = $(".deck > .card-deck")[$(".deck > .card-deck").length - 1];
    $(cardTable).toggleClass("card-deck table-card");
    $(cardTable).toggleClass("card-hand");
  //  setTimeout(function(){
    $(".table").append(cardTable);
  //  },500)
  }
  game.putCardsOnTable();
}

function init() {
  game = new Scopa(cards);
  game.shuffle(cards);
  var html = "";
  //card creation
  game.cards.forEach(function(pic) {
    html +=
      '<div class="card-deck" data-card-name="' +
      pic.name +
      '" style="background: url(images/' +
      pic.img +
      ') no-repeat">';

    html += "</div>";
  });
  html +=
    `<div class="top-card-deck" data-card-name="images/bg.jpg" style="background: url('./images/bg.jpg') no-repeat">`;

  html += "</div>";
  //make the deck
  $(".deck").html(html);
  //create player 1
  player = new Player("player");
  //create AI player
  ai = new Computer("ai");

  $(".display-score").click(function(){
    $(".counting-score").toggleClass("hide-score")
  })
}

function allowSelectCards() {
  $(".onclick-option").click(function(e) {
    

    $(".selected-card").toggleClass("selected-card");

    $(this).toggleClass("selected-card");
  });
}

function allowPickCards() {
  $(".table-card").click(function(e) {
    $(this).toggleClass("select-pick");
  });
}

function playCardPlayer() {
  $(".play-card-button").click(function() {
    var selected = $(".select-pick");
    
    var valueCardPlayed = $(".selected-card").attr("data-card-name").split("")[0];
    if (valueCardPlayed === "K") {
      valueCardPlayed = 10;
    }
    if (valueCardPlayed === "Q") {
      valueCardPlayed = 9;
    }
    if (valueCardPlayed === "J") {
      valueCardPlayed = 8;
    }
    valueCardPlayed = parseInt(valueCardPlayed);

    var valueSelected = 0;
   
      for (var i = 0; i < selected.length; i++) {
        var value = $(selected[i])
          .attr("data-card-name")
          .split("")[0];
        if (value === "K") {
          value = 10;
        }
        if (value === "Q") {
          value = 9;
        }
        if (value === "J") {
          value = 8;
        }
        valueSelected += parseInt(value);
      }
    
    
var selectForLogic = player.hand.filter(card=>card.name==$(".selected-card").attr("data-card-name"))[0]
    var possiblePicks = player.checkAvailableMove(
      game.table,
      selectForLogic
    );
    // possiblePicks=possiblePicks.filter(x=>x.value!=undefined)
   console.log('possible picks', possiblePicks) 
    //if value picking = value card plyed go on
    if (valueSelected === valueCardPlayed) {
      
      //update LOGIC Player
      player.playCard(
        $(".selected-card").attr("data-card-name"),
        $(".select-pick"),
        game
      );
      $(".selected-card").remove();
      $(".select-pick").remove();
      game.whoPickLastCard=player
      if(game.cards.length===0 && player.hand.length===0 && ai.hand.length===0){
        game.cleanTable(game.whoPickLastCard)
      }
      if(player.pickedCards.length>1){
        $(".pick-player").removeClass("hide-score")
      }
      aiGame();
    }
    //if there are no available picking allow to just ADD card on the table
    else if ($(".select-pick").length === 0 && possiblePicks.length === 0) {  
      
      //update LOGIC player
      player.addCardToTable(
        $(".selected-card").attr("data-card-name"),
        game.table
      );
      if(game.cards.length===0 && player.hand.length===0 && ai.hand.length===0){
        game.cleanTable(game.whoPickLastCard)
      }

      //add card on table(DOM)
      $(".table").append($(".selected-card"));
      //add class table-card to new entry
      $(".selected-card").addClass("table-card");
      //remove onlick attribute from new entry
      $($(".table-card")[$(".table-card").length - 1]).unbind("click");
      //remove class selected-card(for border highlight) and onclick-option
      $(".selected-card").removeClass("selected-card onclick-option");
      //add to the new entry the onclick option as pickable-card
      $($(".table-card")[$(".table-card").length - 1]).click(function(e) {
        $(this).toggleClass("select-pick");
      });

      //ai play
      aiGame();
    } else {
      //You can't add a card if on the table there is a combination of card that sum up the value of the card
      
      $(".alert-move").toggle()
      setTimeout(function(){
        $(".alert-move").toggle()
      },4000)
    }
  });
}


function startNewTurn(){
  giveCardPlayer()
  giveCardAI()
  giveCardPlayer()
  giveCardAI()
  giveCardPlayer()
  giveCardAI()
  makeCardsPlayerSelectable()
}

function checkGameOver(){
  if(game.cards.length>=6 && ai.hand.length===0 && player.hand.length===0){
    startNewTurn()
  }else if(game.cards.length===0&& ai.hand.length===0 && player.hand.length===0){
    //who has picked the last card get all the card left on the table
    game.cleanTable(game.whoPickLastCard)
    //remove cards from table
    $(".table").remove()

    // alert("GAME END")
    //update score current game
    var score = game.getTotalScore(player,ai)
    // alert("Total score Player: "+player.scoreCurrentGame)
    // alert("Total score COMPUTER"+ai.scoreCurrentGame)
    player.totalScore+=player.scoreCurrentGame
    ai.totalScore+=ai.scoreCurrentGame
    $("#player-name-score").html(player.name)
    $("#ai-name-score").html(ai.name)
    $("#player-score").html(player.scoreCurrentGame)
    $("#ai-score").html(ai.scoreCurrentGame)
    $("#scopa-player").html(player.scopa)
    $("#scopa-ai").html(ai.scopa)
    $("#cards-player").html(player.pickedCards.length)
    $("#cards-ai").html(ai.pickedCards.length)
    $("#diamonds-player").html(score[0].playerDiamonds)
    $("#diamonds-ai").html(score[1].aiDiamonds)
    $("#7ofDiamonds-player").html(player.sevenDiamonds)
    $("#7ofDiamonds-ai").html(ai.sevenDiamonds)
    $("#prime-player").html(score[0].playerPrime)
    $("#prime-ai").html(score[1].aiPrime)

    $("#overallScore-player").html(player.totalScore)
    $("#overallScore-ai").html(ai.totalScore)
    $(".display-scores").toggleClass("hide-score")







    if(ai.totalScore>=21 && player.totalScore<21){
      // alert("YOU LOSE")
    }
    if(player.totalScore>=21 && ai.totalScore<21){
      // alert("YOU WON")
    }
    if(player.totalScore>=21 && ai.totalScore>=21){
      if(player.totalScore>ai.totalScore){
        // alert("YOU WON")
      }else if(player.totalScore<ai.totalScore){
        // alert("YOU LOSE")
      }else{
        //you need to start a new game
      }
    }
    if(ai.totalScore<21 && player.totalScore<21){
      //you need to start a new game
    }

    
  }
}


//to use when in the begining of the game there are 3 cards with the same value
function reset(){

game.table =[]
game.card=cards
player.hand=[]
ai.hand=[]

//remove all the cards from the dom
$($(".table").children()).remove()
$($(".hand-player").children()).remove()
$($(".hand-ai").children()).remove()




}