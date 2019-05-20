class Block {

  constructor(_x, _y, _id) {
    this.xStart = _x;
    this.yStart = _y;
    this.idStart = _id;
    this.id = 'block' + _id;
    this.sort();
  }

  sort() {
    this.x = this.xStart;
    this.y = this.yStart;
    this.rightPlace = true;
    document.getElementById(this.id).style.left = this.x * 100 + 'px';
    document.getElementById(this.id).style.top = this.y * 100 + 'px';
    //console.log('Sorting done: x ' + this.x * 100 + ' y ' + this.y * 100 + ' id ' + this.id);
  }

  position(x_, y_) {
    this.x = x_;
    this.y = y_;
    document.getElementById(this.id).style.left = this.x * 100 + 'px';
    document.getElementById(this.id).style.top = this.y * 100 + 'px';
    //console.log('Scrambling done: x ' + this.x * 100 + ' y ' + this.y * 100 + ' id ' + this.id);
  }

  checkMove() {
    if (block[15].x === this.x && block[15].y === this.y - 1) {
      this.moveUp();
    } else if (block[15].x === this.x && block[15].y === this.y + 1) {
      this.moveDown();
    } else if (block[15].x === this.x - 1 && block[15].y === this.y) {
      this.moveLeftBool = true;
      this.moveLeft();
    } else if (block[15].x === this.x + 1 && block[15].y === this.y) {
      this.moveRightBool = true;
      this.moveRight();
    }
  }

  checkWin() {
    let countRight = 0;
    for (var i = 0; i < 15; i++) {
      if (block[i].rightPlace) {
        countRight++;
      } else {
        break;
      }
    }
    if (countRight === 15) {
      document.getElementById('popup').classList.remove('hidden');
    } else {
      countRight = 0;
    }
  }

  moveUp() {
    this.y = this.y - 1;
    document.getElementById(this.id).style.top = this.y * 100 + 'px';
    block[15].y = block[15].y + 1;
    document.getElementById(block[15].id).style.top = block[15].y * 100 + 'px';
    if (this.x === this.xStart && this.y === this.yStart) {
      this.rightPlace = true;
      this.checkWin();
      console.log('right');
    } else {
      this.rightPlace = false;
    }
  }

  moveDown() {
    this.y = this.y + 1;
    document.getElementById(this.id).style.top = this.y * 100 + 'px';
    block[15].y = block[15].y - 1;
    document.getElementById(block[15].id).style.top = block[15].y * 100 + 'px';
    if (this.x === this.xStart && this.y === this.yStart) {
      this.rightPlace = true;
      this.checkWin();
      console.log('right');
    } else {
      this.rightPlace = false;
    }
  }

  moveLeft() {
    this.x = this.x - 1;
    document.getElementById(this.id).style.left = this.x * 100 + 'px';
    block[15].x = block[15].x + 1;
    document.getElementById(block[15].id).style.left = block[15].x * 100 + 'px';
    if (this.x === this.xStart && this.y === this.yStart) {
      this.rightPlace = true;
      this.checkWin();
      console.log('right');
    } else {
      this.rightPlace = false;
    }
  }

  moveRight() {
    this.x = this.x + 1;
    document.getElementById(this.id).style.left = this.x * 100 + 'px';
    block[15].x = block[15].x - 1;
    document.getElementById(block[15].id).style.left = block[15].x * 100 + 'px';
    if (this.x === this.xStart && this.y === this.yStart) {
      this.rightPlace = true;
      this.checkWin();
      console.log('right');
    } else {
      this.rightPlace = false;
    }
  }

}

var block = [];

for (i = 0; i < 16; i++) {
  var x;
  var y;
  var id = i;
  if (i < 4) {
    x = i;
    y = 0;
  } else if (i > 3 && i < 8) {
    x = i - 4
    y = 1;
  } else if (i > 7 && i < 12) {
    x = i - 8
    y = 2;
  } else if (i > 11) {
    x = i - 12
    y = 3;
  }
  block[i] = new Block(x, y, id);
}

function sortAll() {
  for (var i = 0; i < 16; i++) {
    block[i].sort();
  }
}

// function swap() {
//   document.getElementById('block0').style.zIndex = 1;
//   document.getElementById('block1').style.zIndex = 0;
//   for (i = 0; i < 100; i += 0.01) {
//     document.getElementById('block0').style.marginRight = i;
//     document.getElementById('block1').style.marginLeft = i;
//   }
//   document.getElementById('block0').style.order = 1;
//   document.getElementById('block1').style.order = 2;
//   document.getElementById('block0').style.marginRight = 0;
//   document.getElementById('block1').style.marginLeft = 0;
// }

function scramble() {
  var num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  var temp;
  var ran1;
  var ran2;
  var x;
  var y;
  for (var i = 0; i < 100; i++) {
    ran1 = Math.round(Math.random() * 15);
    ran2 = Math.round(Math.random() * 15);
    temp = num[ran1];
    num[ran1] = num[ran2];
    num[ran2] = temp;
  }
  console.log(num);

  for (i = 0; i < 16; i++) {
    numVal = num[i];
    if (numVal < 4) {
      x = numVal;
      y = 0;
    } else if (numVal > 3 && numVal < 8) {
      x = numVal - 4
      y = 1;
    } else if (numVal > 7 && numVal < 12) {
      x = numVal - 8
      y = 2;
    } else if (numVal > 11) {
      x = numVal - 12
      y = 3;
    }
    block[i].position(x, y);
    block[i].rightPlace = false;
  }

}

document.getElementById('block0').addEventListener("click", function () {
  block[0].checkMove();
});
document.getElementById('block1').addEventListener("click", function () {
  block[1].checkMove();
});
document.getElementById('block2').addEventListener("click", function () {
  block[2].checkMove();
});
document.getElementById('block3').addEventListener("click", function () {
  block[3].checkMove();
});
document.getElementById('block4').addEventListener("click", function () {
  block[4].checkMove();
});
document.getElementById('block5').addEventListener("click", function () {
  block[5].checkMove();
});
document.getElementById('block6').addEventListener("click", function () {
  block[6].checkMove();
});
document.getElementById('block7').addEventListener("click", function () {
  block[7].checkMove();
});
document.getElementById('block8').addEventListener("click", function () {
  block[8].checkMove();
});
document.getElementById('block9').addEventListener("click", function () {
  block[9].checkMove();
});
document.getElementById('block10').addEventListener("click", function () {
  block[10].checkMove();
});
document.getElementById('block11').addEventListener("click", function () {
  block[11].checkMove();
});
document.getElementById('block12').addEventListener("click", function () {
  block[12].checkMove();
});
document.getElementById('block13').addEventListener("click", function () {
  block[13].checkMove();
});
document.getElementById('block14').addEventListener("click", function () {
  block[14].checkMove();
});
document.getElementById('great').addEventListener("click", function () {
  document.getElementById('popup').classList.add('hidden');
});
document.getElementById('again').addEventListener("click", function () {
  document.getElementById('popup').classList.add('hidden');
  scramble();
});
//document.getElementById('block15').addEventListener("click", function () {
//  checkMove();
//});