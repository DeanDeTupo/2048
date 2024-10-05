import { Tile } from './tile.js';

export class Cell {
  constructor(gridElement, x, y) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    gridElement.append(cell);
    this.x = x;
    this.y = y;
    // console.log(this);
  }

  linkTile(tile) {
    tile.setXY(this.x, this.y);
    this.linkedTile = tile; //создаём поле у тайла и вносим в него тайл
    // console.log(!this.linkedTile);
  }

  isEmpty() {
    return !this.linkedTile;
  }

  removeLinkedTile() {
    this.linkedTile = null;
  }
}

// const test = new Cell(document.querySelector('.game-board'), 1, 3);
// console.log(test);
// console.log(test.x);
// console.log(test.y);
