import { Grid } from './grid.js';
import { Tile } from './tile.js';

const gameBoard = document.querySelector('.game-board');

const grid = new Grid(gameBoard);
grid.getRandomEmptyCell().linkTile(new Tile(gameBoard));

// добавим обработку нажатий клавиш
setInputOnce();

function setInputOnce() {
  window.addEventListener('keydown', handleInput, { once: true });
}

function handleInput(event) {
  switch (event.key) {
    case 'ArrowUp':
      moveUp();
      break;
    case 'ArrowDown':
      moveDown();
      break;
    case 'ArrowRight':
      moveRight();
      break;
    case 'ArrowLeft':
      moveLeft();
      break;
    default:
      //   setInputOnce();
      return;
  }
  setInputOnce();
}

function moveUp() {
  slideTiles(grid.cellsGroupedByColumn);
}
function moveDown() {
  slideTiles(grid.cellsGroupedByColumnReversed);
}
function moveLeft() {
  slideTiles(grid.cellsGroupedByRow);
}
function moveRight() {
  slideTiles(grid.cellsGroupedByRowReversed);
}

function slideTiles(groupedCells) {
  // создадим массив, вызывая функцию обработки поля внутри map, которая для каждого ряда/колонки будет выдавать его статус
  const movedGroups = groupedCells.map((group) => {
    return slideTilesInGroup(group);
  });
  // проверим, если хотябы 1 статус true, то вернём true
  const isSlidable = movedGroups.some((status) => {
    return status == true;
  });
  if (isSlidable) {
    grid.getRandomEmptyCell().linkTile(new Tile(gameBoard));
  }
  if (grid.isGameOver()) {
    window.removeEventListener('keydown', handleInput, { once: true });
    alert('Game Over');
  }
}

function slideTilesInGroup(group) {
  let isMoved = false;
  for (let i = 1; i < group.length; i++) {
    // console.log(true);
    //group[i] - это Cell экземпляр
    let cell = group[i];
    if (cell.isEmpty()) {
      continue;
    }

    let j = i - 1;
    let tileToSlide; //целевая ячейка, куда предварительно сдвинемся
    while (j >= 0) {
      if (group[j].isEmpty()) {
        //если ячейка пустая, назначаем её целевой
        tileToSlide = group[j];
      } else {
        //если непустая, то нужно понять, равна ли она i-той ячейке
        //НЕРАВЕНСТВО, текущая целевая ячейка остаётся, выходим из цикла
        if (group[j].linkedTile.value == cell.linkedTile.value) {
          // если i-ая и j-ая равны, нужно их склеить
          tileToSlide = group[j];
        } else {
        }
        break;
      }
      j--;
    }

    if (tileToSlide) {
      //если  ЕСТЬ целевая для склеивания/перемещения
      isMoved = true;
      if (tileToSlide.linkedTile) {
        // переместить плитку
        // что-то...
        // текущую передвигаем под целевую
        // изменяем значение целевой
        // удаляем текущую
        tileToSlide.linkedTile.mergeWith(cell);

        //отвязать плитку от ячейки
      } else {
        // если целевая пустая
        tileToSlide.linkTile(cell.linkedTile);
        //отвязать плитку от ячейки
        cell.removeLinkedTile();
      }
    }
    // здесь получаем targetToSlide
  }
  return isMoved;
}
