// // Enemies our player must avoid
// var Enemy = function() {
//     // Variables applied to each of our instances go here,
//     // we've provided one for you to get started
//
//     // The image/sprite for our enemies, this uses
//     // a helper we've provided to easily load images
//     this.sprite = 'images/enemy-bug.png';
// };
//
// // Update the enemy's position, required method for game
// // Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function(dt) {
//     // You should multiply any movement by the dt parameter
//     // which will ensure the game runs at the same speed for
//     // all computers.
// };
//
// // Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//   var topEnemy = function() {
//     this.x = 0;
//     this.y = 0;
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
//   }
// };

const scoreElem = document.querySelector('#score');
const livesElem = document.querySelector('#lives');
let gotToWater = 0;
let lives = 3;
let score = 0;
let enemySpeed = 10;

class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.speed = parseInt(Math.random()*300+50);
  }
  update() {
    Enemy.prototype.update = function(dt) {
    }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  movement() {
    while (this.x <= 550) {
      setInterval( () => { this.x += 1 }, 8 );
      break;
    }
  }
}

const enemyReset = () => {
  this.x = parseInt(Math.random()*100-50);
}



class TopEnemy extends Enemy {
  constructor(x) {
    super(x)
       this.x = this.speed + x;
       console.log(this.x);
       this.y = 55;
       this.movement();
  }
}
class MiddleEnemy extends Enemy {
  constructor(x) {
    super(x)
       this.x = this.speed + x;
       this.movement();
       this.y = 137;
  }
}
class BottomEnemy extends Enemy {
  constructor(x) {
    super(x)
       this.x = this.speed + x;
       this.y = 220;
       this.movement();
  }
}

// class MiddleEnemy extends Enemy {
//   constructor() {
//     this.y = 200;
//   }
// }
// class BottomEnemy extends Enemy {
//   constructor() {
//     this.y = 300;
//   }
// }

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
  constructor(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
  }
  update(dt) {
    var moveLeft = function() {
      this.x = this.x - 100;
    }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  resetPosition() {
    this.x = 200;
    this.y = 400;
  }
  handleInput(keyPress) {
    //console.log(keyPress);
    console.log(this.x + '-' + this.y)
    switch (keyPress) {
      case 'left':
        if (this.x > 0) {
          detectCollision();
          this.x -=101;
        }
        break;
      case 'right':
        if (this.x < 400) {
          detectCollision();
          this.x +=101;
          break;
        }
      case 'up':
        if (this.y > 0) {
          detectCollision();
          this.y -=83;
          reachedWater()
        }
        break;
      case 'down':
        if (this.y < 400) {
          detectCollision();
          this.y += 83;
        }
        break;
    }
  }
}

const player = new Player;

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// create a random number of enemies between 15 and 20
// iterate through them and instantiate the Enemies
// assign them to the different rows y=100 y=200 y=300
// make them move at random speen, when they get to x=500 reset them randomly

const allEnemies = [];
const numEnemies = 12;

 for (i = 0; i < numEnemies; i++) {
     setTimeout(function() {
         allEnemies[i] = new TopEnemy(0);
         i++;
     }, i * 1000);
     //enemy[i].push(allEnemies);
   }
 for (i = 0; i < numEnemies; i++) {
     setTimeout(function() {
         allEnemies[i] = new MiddleEnemy(100);
         i++;
     }, i * 1000);
     //enemy[i].push(allEnemies);
   }
 for (i = 0; i < numEnemies; i++) {
     setTimeout(function() {
         allEnemies[i] = new BottomEnemy(200);
         i++;
     }, i * 1000);
     //enemy[i].push(allEnemies);
   }
 console.log(allEnemies);

 allEnemies.forEach(function(elem) {
   console.log(elem);
   if (elem.this.x > 550) {
     enemyReset();
     elem.this.movement();
   }
 });

// detect player has reached the water

function reachedWater() {
  //console.log(player.y);
  if (player.y == -15) {
    score += 100;
    scoreElem.innerText = score;
    player.resetPosition();
  }
}

// Write a collision detection function

var detectCollision = function() {
  allEnemies.forEach( enemy => {
    if ( (enemy.y === player.y) || (enemy.x === player.x) ) {
      lives -=1;
      player.resetPosition();
      livesElem.innerText = lives;
    }
  })

}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    console.log()
});
