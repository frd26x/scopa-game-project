const shuffle = (cards) => {
  let m = cards.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = cards[m];
    cards[m] = cards[i];
    cards[i] = t;
  }
  return cards;
};

//thanks https://gist.github.com/axelpale/3118596
function k_combinations(set, k) {
  var i, j, combs, head, tailcombs;

  // There is no way to take e.g. sets of 5 elements from
  // a set of 4.
  if (k > set.length || k <= 0) {
    return [];
  }

  // K-sized set has only one K-sized subset.
  if (k == set.length) {
    return [set];
  }

  // There is N 1-sized subsets in a N-sized set.
  if (k == 1) {
    combs = [];
    for (i = 0; i < set.length; i++) {
      combs.push([set[i]]);
    }
    return combs;
  }

  // Assert {1 < k < set.length}

  // Algorithm description:
  // To get k-combinations of a set, we want to join each element
  // with all (k-1)-combinations of the other elements. The set of
  // these k-sized sets would be the desired result. However, as we
  // represent sets with lists, we need to take duplicates into
  // account. To avoid producing duplicates and also unnecessary
  // computing, we use the following approach: each element i
  // divides the list into three: the preceding elements, the
  // current element i, and the subsequent elements. For the first
  // element, the list of preceding elements is empty. For element i,
  // we compute the (k-1)-computations of the subsequent elements,
  // join each with the element i, and store the joined to the set of
  // computed k-combinations. We do not need to take the preceding
  // elements into account, because they have already been the i:th
  // element so they are already computed and stored. When the length
  // of the subsequent list drops below (k-1), we cannot find any
  // (k-1)-combs, hence the upper limit for the iteration:
  combs = [];
  for (i = 0; i < set.length - k + 1; i++) {
    // head is a list that includes only our current element.
    head = set.slice(i, i + 1);
    // We take smaller combinations from the subsequent elements
    tailcombs = k_combinations(set.slice(i + 1), k - 1);
    // For each (k-1)-combination we join it with the current
    // and store it to the set of k-combinations.
    for (j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]));
    }
  }
  return combs;
}



const deck = [
  "1D",
  "2D",
  "3D",
  "4D",
  "5D",
  "6D",
  "7D",
  "8D",
  "9D",
  "10D",
  "1C",
  "2C",
  "3C",
  "4C",
  "5C",
  "6C",
  "7C",
  "8C",
  "9C",
  "10C",
  "1S",
  "2S",
  "3S",
  "4S",
  "5S",
  "6S",
  "7S",
  "8S",
  "9S",
  "10S",
  "1H",
  "2H",
  "3H",
  "4H",
  "5H",
  "6H",
  "7H",
  "8H",
  "9H",
  "10H",
];

const toPrime = (card) => {
  const num = toNum(card);

  const map = {
    1: 16,
    2: 12,
    3: 13,
    4: 14,
    5: 15,
    6: 18,
    7: 21,
    8: 10,
    9: 10,
    10: 10,
  };
  return map[num];
};

const calculatePrime = (picks) =>
          picks
            .map(toPrime)
            .sort(function (a, b) {
              return b - a;
            })
            .slice(0, 4)
            .reduce((accumulator, currentValue) => accumulator + currentValue);

export const createGame = (
  displayPlayerHand,
  displayTable,
  displayPlayCard,
  displayPickCards
) => {
  let state = {
    deck,
    playerHand: [],
    playerPicks: [],
    playerPicksScopa: 0,
    cpuHand: [],
    cpuPicks: [],
    cpuPicksScopa: 0,
    table: [],
  };

  const listeners = [];
  const getState = () => state;
  const setState = (newState) => {
    state = newState;
    listeners.forEach((update) => update(state));
  };
  const toNum = (card) => Number(card.slice(0, -1));

  const sum = (arr) =>
    arr.reduce(function (accumulator, currentValue, currentIndex, array) {
      return accumulator + currentValue;
    });
  const getCardsToPick = (cardPlayed, table) => {
    const cardPlayedNum = toNum(cardPlayed);
    let combinations = table.map(toNum);
    console.log({table,cardPlayed,DOM:document.getElementById("table").childNodes})

    let availableCombs = table.filter((ct) => toNum(ct) === cardPlayedNum);

    if (availableCombs.length === 1) {
      return availableCombs;
    }
    if (availableCombs.length > 1) {

      return [availableCombs[0]];
      //let him choose
    }

    for (let i = 2; i <= table.length; i++) {
      const combs = k_combinations(table, i);
      const availableCombs = combs.filter(
        (c) => sum(c.map(toNum)) === cardPlayedNum
      );

      if (availableCombs.length === 1) {
        // return comb.map((c) => table.find((tc) => toNum(tc) === c));
        return availableCombs[0];
      }
      if (availableCombs.length > 1) {

        return availableCombs[0];
        // let choose
        // keep availableCombs on state then call displayAvailable
      }
    }
  };
const calculateScore=()=>{
  const state = getState()
  let playerPoints = state.playerPicksScopa;
  let cpuPoints = state.cpuPicksScopa;
  const recap = {
    cpuCards: state.cpuPicks.length,
    playerCards: state.playerPicks.length,
    settebello: state.cpuPicks.includes("7D") ? "cpu" : "player",
    diamonds:
      state.cpuPicks.filter((c) => c[c.length - 1] === "D") === 5
        ? null
        : state.cpuPicks.filter((c) => c[c.length - 1] === "D") > 5
        ? "cpu"
        : "player",
    primiera:
      calculatePrime(state.cpuPicks) === calculatePrime(state.playerPicks)
        ? null
        : calculatePrime(state.cpuPicks) >
          calculatePrime(state.playerPicks)
        ? "cpu"
        : "player",
  };
  const cards =
    state.cpuPicks.length === 20
      ? null
      : state.cpuPicks.length > 20
      ? ++cpuPoints
      : ++playerPoints;
  const setteBello = state.cpuPicks.includes("7D")
    ? ++cpuPoints
    : ++playerPoints;
  const diamonds =
    state.cpuPicks.filter((c) => c[c.length - 1] === "D") === 5
      ? null
      : state.cpuPicks.filter((c) => c[c.length - 1] === "D") > 5
      ? ++cpuPoints
      : ++playerPoints;
  const primiera =
    calculatePrime("cpuPicks") === calculatePrime("playerPicks")
      ? null
      : calculatePrime("cpuPicks") > calculatePrime("playerPicks")
      ? ++cpuPoints
      : ++playerPoints;

  return;
}

const dealCard = (target) => {
  const state = getState();
  const deck = state.deck;
  const hand = state[target];
  const nextHand = [...hand, deck[0]];
  const nextDeck = deck.slice(1);
  setState({ ...state, [target]: nextHand, deck: nextDeck });
};

const dealCardsToPlayers = () => {
  for (let i = 0; i < 6; i++) {
    i % 2 === 0 ? dealCard("playerHand") : dealCard("cpuHand");
  }
};
  const playCard = async (card, player) => {
    const state = getState();
    const table = state.table;
    const cardsToPick = getCardsToPick(card, table);
    console.log({cardsToPick})
    if (cardsToPick) {
      const picks = player === "playerHand" ? "playerPicks" : "cpuPicks";
      pickCard([...cardsToPick],[card], picks);
    } else {
      //just put card on the table
      const nextHand = state[player].filter((c) => c !== card);
      const nextTable = [...table, card];
      setState({ ...state, table: nextTable, [player]: nextHand });
      await displayPlayCard(card, player);
    }
    const isTurnFinished = !getState().cpuHand.length && !getState().playerHand.length;
    const isLastTurn = !state.deck.length;
    if (isTurnFinished) {
      if (isLastTurn) { 
      pickCard(getState().table,[], getState().lastPicked);
      calculateScore()
      return
      }
      dealCardsToPlayers()
      displayPlayerHand("playerHand",getState().playerHand);
      displayPlayerHand("cpuHand",getState().cpuHand);
    }
  };

  const pickCard = (cards,cardPlayed, picks) => {
    const state = getState();
    const target = picks === "playerPicks" ? "playerHand" : "cpuHand"
    const nextHand = state[target].filter(c=>c!==cardPlayed[0])
    const nextTable = state.table.filter((c) => !cards.includes(c)&&!cardPlayed.includes(c));
    console.log({nextTable,prevTable:state.table,cards,cardPlayed})
    const nextPicks = [...state[picks], ...cards,...cardPlayed];
    if (!nextTable.length && getState().deck.length>0) {
      setState({
        ...state,
        [target]:nextHand,
        table: nextTable,
        [picks]: nextPicks,
        lastPicked: picks,
        [`${picks}Scopa`]: state[`${picks}Scopa`] + 1,
      });
      displayPickCards(cards,cardPlayed,target);
      return;
    }
    setState({
      ...state,
      [target]:nextHand,
      table: nextTable,
      [picks]: nextPicks,
      lastPicked: picks,
    });
    displayPickCards(cards,cardPlayed,target);
  };

  

  const dealCardToTable = () => {
    const state = getState();
    const deck = state.deck;
    const nextTable = [...state.table, deck[0]];
    const nextDeck = deck.slice(1);
    setState({ ...state, table: nextTable, deck: nextDeck });
  };

  const shuffleDeck = () => {
    const deck = state.deck;
    shuffle(deck);
  };
 

  const init = () => {
    shuffleDeck();
    dealCardsToPlayers();
    for (let i = 0; i < 4; i++) {
      dealCardToTable();
    }
    displayTable(state.table);
    displayPlayerHand("playerHand", state.playerHand);
    displayPlayerHand("cpuHand", state.cpuHand);
  };
  init();

  return {
    shuffleDeck,
    dealCard,
    pickCard,
    playCard,
    getState,
    dealCardToTable,
  };
};
