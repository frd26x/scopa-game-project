var cards = [
  { name: "1D", img: "1D.jpg",value:1 ,prime:16},
  { name: "2D", img: "2D.jpg",value:2 ,prime:12},
  { name: "3D", img: "3D.jpg",value:3 ,prime:13},
  { name: "4D", img: "4D.jpg",value:4 ,prime:14},
  { name: "5D", img: "5D.jpg",value:5, prime:15 },
  { name: "6D", img: "6D.jpg",value:6, prime:18},
  { name: "7D", img: "7D.jpg",value:7, prime:21 },
  { name: "JD", img: "JD.jpg",value:8 , prime:10},
  { name: "QD", img: "QD.jpg",value:9 ,prime:10},
  { name: "KD", img: "KD.jpg" ,value:10,prime:10},
  { name: "1C", img: "1C.jpg",value:1,prime:16 },
  { name: "2C", img: "2C.jpg",value:2 ,prime:12},
  { name: "3C", img: "3C.jpg",value:3,prime:13 },
  { name: "4C", img: "4C.jpg",value:4, prime:14 },
  { name: "5C", img: "5C.jpg" ,value:5, prime:15},
  { name: "6C", img: "6C.jpg",value:6, prime:18 },
  { name: "7C", img: "7C.jpg",value:7, prime:21 },
  { name: "JC", img: "JC.jpg",value:8 ,prime:10},
  { name: "QC", img: "QC.jpg",value:9 ,prime:10},
  { name: "KC", img: "KC.jpg",value:10,prime:10 },
  { name: "1S", img: "1S.jpg",value:1, prime:16 },
  { name: "2S", img: "2S.jpg",value:2,prime:12 },
  { name: "3S", img: "3S.jpg",value:3,prime:13 },
  { name: "4S", img: "4S.jpg",value:4 , prime:14},
  { name: "5S", img: "5S.jpg",value:5,prime:15 },
  { name: "6S", img: "6C.jpg",value:6, prime:18 },
  { name: "7S", img: "7C.jpg",value:7 ,prime:21 },
  { name: "JS", img: "JC.jpg" ,value:8,prime:10},
  { name: "QS", img: "QC.jpg",value:9 ,prime:10},
  { name: "KS", img: "KC.jpg",value:10,prime:10 },
  { name: "1H", img: "1H.jpg",value:1, prime:16},
  { name: "2H", img: "2H.jpg",value:2 ,prime:12},
  { name: "3H", img: "3H.jpg" ,value:3, prime:13},
  { name: "4H", img: "4H.jpg",value:4 ,prime:14},
  { name: "5H", img: "5H.jpg",value:5, prime:15 },
  { name: "6H", img: "6H.jpg",value:6,prime:18 },
  { name: "7H", img: "7H.jpg",value:7,prime:21 },
  { name: "JH", img: "JH.jpg",value:8,prime:10 },
  { name: "QH", img: "QH.jpg",value:9,prime:10 },
  { name: "KH", img: "KH.jpg",value:10,prime:10 }
];


var player
var game
var ai
$(document).ready(function(){
  game = new Scopa(cards)
  game.shuffle(cards)
  var html = ""
  game.cards.forEach(function (pic) {
    html += '<div class="card" data-card-name="'+ pic.name +'">';
    // html += '  <div class="back" name="'+ pic.img +'"></div>';
    html += '  <div class="card" style="background: url(images/'+ pic.img +') no-repeat"></div>';
    html += '</div>';
  });

  $('.deck').html(html);
console.log($('.deck'))


  player= new Player("player")
  ai = new Computer("ai")
  game.giveCard(player)
  game.giveCard(ai)
  game.giveCard(player)
  game.giveCard(ai)
  game.giveCard(player)
  game.giveCard(ai)
  game.putCardsOnTable()
  var move3=player.checkAvailableMove(game.table,player.hand[2])
  var move2 =player.checkAvailableMove(game.table,player.hand[1])
  var move1=player.checkAvailableMove(game.table,player.hand[0])
  

})
  

