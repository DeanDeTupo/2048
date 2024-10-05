import { Cell } from './cell.js';

const GRID_SIZE = 4;
const CELLS_COUNT = GRID_SIZE * GRID_SIZE;

export class Grid {
  constructor(gridElement) {
    this.cells = [];
    for (let i = 0; i < CELLS_COUNT; i++) {
      this.cells.push(
        new Cell(gridElement, i % GRID_SIZE, Math.floor(i / GRID_SIZE))
      );
    }
    this.cellsGroupedByColumn = this.cells.reduce((groupedCells, cell) => {
      groupedCells[cell.x] = groupedCells[cell.x] || [];
      groupedCells[cell.x][cell.y] = cell;
      return groupedCells;
    }, []);

    this.cellsGroupedByRow = this.cells.reduce((groupedCells, cell) => {
      groupedCells[cell.y] = groupedCells[cell.y] || [];
      groupedCells[cell.y][cell.x] = cell;
      return groupedCells;
    }, []);

    this.cellsGroupedByColumnReversed = [...this.cellsGroupedByColumn].map(
      (col) => [...col].reverse()
    );

    this.cellsGroupedByRowReversed = [...this.cellsGroupedByRow].map((row) =>
      [...row].reverse()
    );
  }

  getRandomEmptyCell() {
    const emptyCells = this.cells.filter((cell) => cell.isEmpty());
    const randomIndex = Math.floor(emptyCells.length * Math.random());
    return emptyCells[randomIndex];
  }

  //можно ли оптимизировать, если хранить this.emptyCells?
  canSlide(array) {
    return array
      .map((column) => {
        for (let i = 1; i < column.length; i++) {
          if (column[i].linkedTile.value == column[i - 1].linkedTile.value)
            return true;
        }
        return false;
      })
      .some((stat) => stat == true);
  }

  isGameOver() {
    const emptyCells = this.cells.filter((cell) => cell.isEmpty());
    if (!!emptyCells.length) return false;

    // если не можем ходить по вертикали или горизонтали, то возвратим  true
    if (
      !this.canSlide(this.cellsGroupedByColumn) &&
      !this.canSlide(this.cellsGroupedByRow)
    )
      return true;
    return false;
  }
}
