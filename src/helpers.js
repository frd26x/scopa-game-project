export function shuffle(array) {
  const shouffledArray = array.slice(0)
  var m = array.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = shouffledArray[m];
    shouffledArray[m] = shouffledArray[i];
    shouffledArray[i] = t;
  }
  return shouffledArray
}


module.export