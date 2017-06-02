/**
 * Returns string name for team.
 * @return {string} for example: 'Navi'
 */
function getName() {
	return "Killers";
};

/**
 * MISS -> missed attack
 * HIT ->	hited ship but ship is not sunk yet
 * SUNK -> ship is dead
 * DUPLICATED -> once again you are attacked this coordinates
 * @param {String} result one of HIT, MISS, SUNK, DUPLICATED.
 * @return {void}
 */
function attackResult(result) {
  const [x, y] = currentAttack;
  empty = empty.filter((i) => !(i[0] == x && i[1] == y));
  switch (result) {
    case 'MISS':
      field[x][y] = cellType.miss;
    break;
    case 'HIT':
      field[x][y] = cellType.hit;
    break;
    case 'SUNK':
      field[x][y] = cellType.hit;
      sunk(x, y);
    break;
    default:
      
  }
  
};
function sunk(x, y) {
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (i == 0 && j == 0 || field[x+i]) continue;
      if (field[x + i][y + j] == cellType.hit) sunk(x + i, y + j)
      field[x + i][y + j] = cellType.miss;
      empty = empty.filter((item) => !(item[0] == x + i && item[1] == y + j));
    }
  }
}

/**
 * Returns coordinates in which player want attack
 * First char is Letter=(A...J) rest chars represents a number=(0...10)
 * @return {string} for example: 'B10'
 */
function attack() {
  currentAttack = makeFire();
	return getCellName(currentAttack);
};

var cellType = { empty: 0, miss: 1, hit: 2 }

var field = [...Array(11)].map(() => [...Array(11)].map(() => cellType.empty))

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var alphabet = 'ABCDEFGHIJ';

function makeFire() {
  return empty[getRandomInt(0, empty.length)];
}

var empty = [...Array(100)].map((_, i) => [Math.floor(i / 10), i % 10]);



var currentAttack = [getRandomInt(0, 10), getRandomInt(0,10), cellType.empty];

function getCellName([x, y]) {
  return `${alphabet[x]}${y+1}`;
}

export {
  getCellName,
  empty,
  field,
  getName,
  attack,
  attackResult,
};
