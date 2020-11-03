import "./style.scss";
import { createGame } from "./game";

const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve("done");
    }, ms);
  });

const cardFactory = () => {
  const imgClone = document.createElement("img");
  const divClone = document.createElement("div");
  const imageBG = require(`./images/bg.jpg`);
  imgClone.className = "img";
  const createPlayerCard = (cardId, onClick) => {
    const image = require(`./images/${cardId}.jpg`);
    const img = imgClone.cloneNode(true);
    img.src = image.default;
    img.id = cardId;
    img.addEventListener("click", () => onClick(cardId));
    return img;
  };

  const createOpponentCard = (cardId) => {
    const divParent = divClone.cloneNode(true);
    divParent.className = "scene scene--card img";
    divParent.id = cardId;

    const cardDiv = divClone.cloneNode(true);
    cardDiv.className = "card-cpu";
    cardDiv.id = cardId + "Card";

    divParent.appendChild(cardDiv);

    const cardFace = divClone.cloneNode(true);
    cardFace.className = "card__face card__face--front";

    cardDiv.appendChild(cardFace);

    const imgFront = imgClone.cloneNode(true);
    imgFront.src = imageBG.default;
    imgFront.className = "img-cpu";

    cardFace.appendChild(imgFront);

    const cardBack = divClone.cloneNode(true);
    cardBack.className = "card__face card__face--back";
    cardBack.id = cardId + "Back";

    cardDiv.appendChild(cardBack);

    const image = require(`./images/${cardId}.jpg`);
    const img = imgClone.cloneNode(true);
    img.src = image.default;
    img.className = "img-cpu";
    img.id = cardId + "Img";

    cardBack.appendChild(img);
    return divParent;
  };
  return { createPlayerCard, createOpponentCard };
};
const { createPlayerCard, createOpponentCard } = cardFactory();

const displayOpponentHand = (target, hand) => {
  const documentFragment = document.createDocumentFragment();

  hand.forEach((c) => {
    const divParent = createOpponentCard(c);
    documentFragment.appendChild(divParent);
  });
  document.getElementById(target).appendChild(documentFragment);
};

const displayPlayerHand = (target, hand) => {
  if (target === "cpuHand") {
    displayOpponentHand(target, hand);
    return;
  }
  const documentFragment = document.createDocumentFragment();

  hand.forEach((c) => {
    const img = createPlayerCard(c, onClick);
    documentFragment.appendChild(img);
  });

  document.getElementById(target).appendChild(documentFragment);
};

const displayPlayCard = async (cardId, target) => {
  // console.log("DISPLAY PLAY CARD",{cardId,target})
  if (target === "cpuHand") {
    flipCard(cardId);
    await delay(1000);
    const div = document.getElementById(cardId);

    const cardImg = document.getElementById(cardId + "Img");
    cardImg.id = cardId;
    cardImg.className = "img";
    //  console.log({cardImg})

    document.getElementById("table").appendChild(cardImg);

    document.getElementById(target).removeChild(div);
    // document.getElementById(cardId+"Back").classList.toggle = "is-flipped"
    return;
  }

  const card = document
    .getElementById(target)
    .removeChild(document.getElementById(cardId));
  // console.log({card}, "CARD REMOVED FROM HAND player")
  // if(target === "playerHand"){
  //   document.getElementById(cardId).className = "img float"
  //   await delay(2000)
  // }

  // const card = document.getElementById(target).removeChild(document.getElementById(cardId));
  document.getElementById("table").appendChild(card);

  await delay(1000);
  return;
};

const displayPickCards = async (cards, cardPlayed, target) => {
  // console.log("DISPLAY PICK CARDS",{cards,cardPlayed})
  if (target === "cpuHand" && cardPlayed[0]) {
    // console.log("FLIP",{cardPlayed})
    flipCard(cardPlayed[0]);
    await delay(1000);
    // const cardImg = document.getElementById(cardPlayed[0]+"Img")
    // cardImg.id = cardPlayed[0]
    // cardImg.className = "img"
    // console.log("REMOVING FROM HAND CARD: ",cardPlayed[0])
    document
      .getElementById(target)
      .removeChild(document.getElementById(cardPlayed[0]));

    // document.getElementById("table").appendChild(cardImg);
    const table = document.getElementById("table");
    // console.log({table})
    cards.forEach((c) => {
      // console.log("REMOVING FROM TABLE CARD: ",c)
      const node = document.getElementById(c);
      if (node) {
        table.removeChild(node);
      }
    });
    return;
  }

  const table = document.getElementById("table");
  // console.log("player",{table})

  cards.forEach((c) => {
    const toRemove = document.getElementById(c);
    // console.log("REMOVING",toRemove)
    if (toRemove) {
      table.removeChild(toRemove);
    }
  });
  const hand = document.getElementById(target);
  cardPlayed.forEach((c) => {
    hand.removeChild(document.getElementById(c));
  });
};

const displayTable = (table) => {
  const documentFragment = document.createDocumentFragment();
  table.forEach((c) => {
    const img = createPlayerCard(c, onClick);
    documentFragment.appendChild(img);
  });
  document.getElementById("table").appendChild(documentFragment);
};
const {
  shuffleDeck,
  dealCard,
  pickCard,
  playCard,
  getState,
  dealCardToTable,
} = createGame(
  displayPlayerHand,
  displayTable,
  displayPlayCard,
  displayPickCards
);

function flipCard(id) {
  // if (switching) {
  //    return false
  // }
  // switching = true
  let cardTransitionTime = 500;
  document.getElementById(id).className = "scene scene--card is-switched img";
  window.setTimeout(function () {
    document.getElementById(id).className =
      "scene scene--card is-active is-switched img";
    //  switching = false
  }, cardTransitionTime / 2);
}
function onClick(card) {
  playCard(card, "playerHand");

  setTimeout(() => playCard(getState().cpuHand[0], "cpuHand"), 3000);
}
