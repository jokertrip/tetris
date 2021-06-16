class Piece {
  x;
  y;
  color;
  shape;
  ctx;

  constructor(ctx){
    this.ctx = ctx;
    this.spawn();
  }

  spawn(){

    let numShape = Math.floor(Math.random() * 7);

    switch (numShape) {
      case 0:
        this.color = COLORS[0];;
        this.shape = [
          [0, 0, 0, 0],
          [1, 1, 1, 1],
          [0, 0 ,0, 0],
          [0, 0 ,0, 0]
        ];
        break;
      case 1:
        this.color = COLORS[1];;
        this.shape = [
          [2, 0, 0, 0],
          [2, 2, 2, 0],
          [0, 0 ,0, 0],
          [0, 0 ,0, 0]
        ];
        break;
      case 2:
        this.color = COLORS[2];;
        this.shape = [
          [0, 0, 3, 0],
          [3, 3, 3, 0],
          [0, 0 ,0, 0],
          [0, 0 ,0, 0]
        ];
        break;
      case 3:
        this.color = COLORS[3];;
        this.shape = [
          [0, 4, 4, 0],
          [0, 4, 4, 0],
          [0, 0 ,0, 0],
          [0, 0 ,0, 0]
        ];
        break;
      case 4:
        this.color = COLORS[4];;
        this.shape = [
          [0, 5, 5, 0],
          [5, 5, 0, 0],
          [0, 0 ,0, 0],
          [0, 0 ,0, 0]
        ];
        break;
      case 5:
        this.color = COLORS[5];;
        this.shape = [
          [0, 6, 0, 0],
          [6, 6, 6, 0],
          [0, 0 ,0, 0],
          [0, 0 ,0, 0]
        ];
        break;
      case 6:
        this.color = COLORS[6];;
        this.shape = [
          [7, 7, 0, 0],
          [0, 7, 7, 0],
          [0, 0 ,0, 0],
          [0, 0 ,0, 0]
        ];
        break;
    }


    this.x = 3;
    this.y = 0;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
        }
      });
    });
    }

  move(p) {
    this.x = p.x;
    this.y = p.y;
  }

//changing form when pressing up button
  transform(){
    let newShape = [
      [this.shape[3][0],this.shape[2][0],this.shape[1][0],this.shape[0][0]],
      [this.shape[3][1],this.shape[2][1],this.shape[1][1],this.shape[0][1]],
      [this.shape[3][2],this.shape[2][2],this.shape[1][2],this.shape[0][2]],
      [this.shape[3][3],this.shape[2][3],this.shape[1][3],this.shape[0][3]]
    ];
    this.shape = newShape;
    return this;
  }
}
