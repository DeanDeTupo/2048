export class Tile {
  constructor(gridElement) {
    this.tileElement = document.createElement('div');
    this.tileElement.classList.add('tile');
    this.setValue();
    this.setColor();
    gridElement.append(this.tileElement);
  }

  setXY(x, y) {
    this.x = x;
    this.y = y;
    this.tileElement.style.setProperty('--x', x);
    this.tileElement.style.setProperty('--y', y);
  }

  setValue(value) {
    this.value = Math.random() > 0.6 ? 4 : 2;
    // this.value = 32;
    this.tileElement.textContent = this.value;
  }

  setColor() {
    const bgLightness = 100 - Math.log2(this.value) * 9;
    this.tileElement.style.setProperty('--bg-lightness', `${bgLightness}%`);
    this.tileElement.style.setProperty(
      '--text-lightness',
      `${bgLightness < 30 ? 90 : 10}%`
    );
  }
  mergeWith(cell) {
    //притягивает к себе ячейку из заданной клетки cell
    const target = cell.linkedTile;
    target.setXY(this.x, this.y);
    target.removeFromDOM();
    cell.removeLinkedTile();
    this.updateValue();

    // this.tileElement.remove();
  }

  updateValue() {
    this.value *= 2;
    this.tileElement.textContent = this.value;
    this.setColor();
  }

  removeFromDOM() {
    this.tileElement.remove();
  }
}
// console.log(new Tile(document.querySelector('.game-board')));
