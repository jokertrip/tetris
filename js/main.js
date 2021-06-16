const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

ctx.canvas.width = cols * block_size;
ctx.canvas.height = rows * block_size;

ctx.scale(block_size, block_size);

let board = new Board();
let score = 0;

moves = {
  [KEY.LEFT]:  p => ({ ...p, x: p.x - 1 }),
  [KEY.RIGHT]: p => ({ ...p, x: p.x + 1 }),
  [KEY.UP]:    p => (p.transform()),
  [KEY.DOWN]:  p => ({ ...p, y: p.y + 1 }),
  [KEY.SPACE]: p => ({ ...p, y: p.y + 1})
};

function play() {
  board.reset();
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  generateNewPiece();
};

document.addEventListener('keydown', event => {
  event.preventDefault();
  if (event.keyCode === KEY.SPACE){
    let p = moves[event.keyCode](board.piece);
    while (board.valid(p)){
      movePiece(p);
      p = moves[event.keyCode](board.piece);
    }
  }
  else if (event.keyCode === KEY.ENTER){
    play();
  }
  else if (moves[event.keyCode]) {
    let p = moves[event.keyCode](board.piece);
    if (board.valid(p)){
        movePiece(p);
      }
    }
});

function movePiece(p){
  board.piece.move(p);
  // Clear old position before drawing.
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  board.piece.draw();
  board.drawBoard();
}

//automatic move
function wayDown(p) {
  if (board.valid(p)){
    movePiece(p);
    p.y += 1;
    setTimeout(wayDown, 1000, p);
  }
  else {
    board.freeze();
    board.clearLines();
    document.getElementById("score").innerHTML = score;
    generateNewPiece();
  }
}

function generateNewPiece(){
  let piece = new Piece(ctx);
  //piece.draw();
  board.piece = piece;
  wayDown(board.piece);
}
