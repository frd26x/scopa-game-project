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
  { name: "6S", img: "6C.jpg", value: 6, prime: 18 },
  { name: "7S", img: "7C.jpg", value: 7, prime: 21 },
  { name: "JS", img: "JC.jpg", value: 8, prime: 10 },
  { name: "QS", img: "QC.jpg", value: 9, prime: 10 },
  { name: "KS", img: "KC.jpg", value: 10, prime: 10 },
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
$(document).ready(function() {
  game = new Scopa(cards);
  game.shuffle(cards);
  var html = "";

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
    '<div class="top-card-deck" data-card-name="images/bg.jpg" style="background: url(images/bg.jpg) no-repeat">';

  html += "</div>";
  //make the deck
  $(".deck").html(html);

  player = new Player("player");
  ai = new Computer("ai");

  $(".start").click(function() {
    var firstCardPlayer = $(".deck > .card-deck")[
      $(".deck > .card-deck").length - 1
    ];
    $(".hand-player").append(firstCardPlayer);
    $(firstCardPlayer).toggleClass("card-deck");
    $(firstCardPlayer).toggleClass("card-hand onclick-option");
    game.giveCard(player);

    var firstCardAi = $(".deck > .card-deck")[
      $(".deck > .card-deck").length - 1
    ];
    $(firstCardAi).toggleClass("card-deck");
    $(firstCardAi).toggleClass("card-hand ai-show-back");
    $(".hand-ai").append(firstCardAi);
    game.giveCard(ai);

    var SecondCardPlayer = $(".deck > .card-deck")[
      $(".deck > .card-deck").length - 1
    ];
    $(".hand-player").append(SecondCardPlayer);
    $(SecondCardPlayer).toggleClass("card-deck");
    $(SecondCardPlayer).toggleClass("card-hand onclick-option");
    game.giveCard(player);

    var SecondCardAi = $(".deck > .card-deck")[
      $(".deck > .card-deck").length - 1
    ];
    $(SecondCardAi).toggleClass("card-deck");
    $(SecondCardAi).toggleClass("card-hand ai-show-back");
    $(".hand-ai").append(SecondCardAi);
    game.giveCard(ai);

    var thirdCardPlayer = $(".deck > .card-deck")[
      $(".deck > .card-deck").length - 1
    ];
    $(".hand-player").append(thirdCardPlayer);
    $(thirdCardPlayer).toggleClass("card-deck");
    $(thirdCardPlayer).toggleClass("card-hand onclick-option");
    game.giveCard(player);

    var thirdCardAi = $(".deck > .card-deck")[
      $(".deck > .card-deck").length - 1
    ];
    $(thirdCardAi).toggleClass("card-deck");
    $(thirdCardAi).toggleClass("card-hand ai-show-back");
    $(".hand-ai").append(thirdCardAi);
    game.giveCard(ai);

    var cardTableOne = $(".deck > .card-deck")[
      $(".deck > .card-deck").length - 1
    ];
    $(cardTableOne).toggleClass("card-deck table-card");
    $(cardTableOne).toggleClass("card-hand");
    $(".table").append(cardTableOne);

    var cardTableTwo = $(".deck > .card-deck")[
      $(".deck > .card-deck").length - 1
    ];
    $(cardTableTwo).toggleClass("card-hand table-card");
    $(cardTableTwo).toggleClass("card-deck");
    $(".table").append(cardTableTwo);

    var cardTableThree = $(".deck > .card-deck")[
      $(".deck > .card-deck").length - 1
    ];
    $(cardTableThree).toggleClass("card-hand table-card");
    $(cardTableThree).toggleClass("card-deck");
    $(".table").append(cardTableThree);

    var cardTableFour = $(".deck > .card-deck")[
      $(".deck > .card-deck").length - 1
    ];
    $(cardTableFour).toggleClass("card-hand table-card");
    $(cardTableFour).toggleClass("card-deck");
    $(".table").append(cardTableFour);
    game.putCardsOnTable();
    //select card to play

    $(".onclick-option").click(function(e) {
      $(".selected-card").toggleClass("selected-card");
      $(this).toggleClass("selected-card");
    });

    //select card to pick
    $(".table-card").click(function(e) {
      $(this).toggleClass("select-pick");
    });

    //play card
    $(".play-card-button").click(function() {
      console.log(game.table);
      var selected = $(".select-pick");
      var valueCardPlayed = $(".selected-card")
        .attr("data-card-name")
        .split("")[0];
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

      var possiblePicks = player.checkAvailableMove(
        game.table,
        $(".selected-card").attr("data-card-name")
      );
      //if value picking = value card plyed go on
      if (valueSelected === valueCardPlayed) {
        console.log("main", $(".selected-card").attr("data-card-name"));
        player.playCard(
          $(".selected-card").attr("data-card-name"),
          $(".select-pick"),
          game
        );
        $(".selected-card").remove();
        $(".select-pick").remove();
      }
      //if there are no available picking allow to just add card on the table
      else if ($(".select-pick").length === 0 && possiblePicks.length === 0) {
        player.addCardToTable(
          $(".selected-card").attr("data-card-name"),
          game.table
        );
        $(".table").append($(".selected-card"));
      } else {
        alert("you have to pick up something... picking available");
      }
    });
  });
});
