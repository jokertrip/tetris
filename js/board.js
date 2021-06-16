class Board {

  grid;
  piece;

  // Reset the board when we start a new game.
  reset() {
    this.grid = this.getEmptyBoard();
  }

  // Get matrix filled with zeros.
  getEmptyBoard() {
    return Array(rows).fill().map(() => Array(cols).fill(0));
  }

//check if the move is valid
  valid(p) {
    return p.shape.every((row, dy) => {
      return row.every((value, dx) => {
        let x = p.x + dx;
        let y = p.y + dy;
        return (
          value === 0 ||
         (this.insideWalls(x) &&
          this.aboveFloor(y) && this.notOccupied(x, y))
      )});
    });
    }

  insideWalls(x) {
    return x >= 0 && x < cols;
  }

  aboveFloor(y) {
    return y >= 0 && y < rows;
  }

  notOccupied(x, y) {
    return this.grid[y] && this.grid[y][x] === 0;
  }

  freeze() {
    const nArr = this.piece.shape.reverse();
     nArr.forEach((row, y) => {
       row.forEach((value, x) => {
         if (value > 0) {
           this.grid[this.piece.y - y + 2][x + this.piece.x] = value;
         }
       });
     });
  }

  drawBoard() {
    this.grid.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          ctx.fillStyle = COLORS[value-1];
          ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }

  clearLines() {
    let lines = 0;

    this.grid.forEach((row, y) => {

      // If every value is greater than 0.
      if (row.every(value => value > 0)) {
        lines++;

        // Remove the row.
        this.grid.splice(y, 1);

        // Add zero filled row at the top.
        this.grid.unshift(Array(cols).fill(0));
      }
    });

    if (lines === 1){
      score += 40;
    }
    else if (lines === 2){
      score += 100;
    }
    else if (lines === 3){
      score += 300;
    }
    else if (lines > 3) {
      score += 1200;
    }
  }
  }
