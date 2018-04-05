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

const scoreElem = document.querySelector('#score'); //html score element
const livesElem = document.querySelector('#lives'); // html lives element
let gotToWater = 0;
let lives = 3;
let score = 0;
let gameIsRunning = true;

// adds a random speed to the bugs
var random_speed = () => {
    return Math.floor(Math.random() * 100) + 100;
};

// creates a random position within the x axis for the bugs outside of the canvas
var random_x = () => {
    return Math.floor(Math.random() * (900)) - 1000;
};

// create a random position on one of the three rows for the bugs
var random_y = () => {
    const positions = [68, 151, 234];
    return positions[Math.floor(Math.random() * 3)];
};

class Enemy {
  constructor() {
    this.x = random_x();
    this.y = random_y();
    this.speed = random_speed();
    this.sprite = 'images/enemy-bug.png';
    this.position = parseInt(Math.random()*300-500);
  }
  update(dt) {
    if (this.x > 600) {
      loopEnemy();
    }
    this.x += this.speed * dt;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}
//
// class TopEnemy extends Enemy {
//   constructor(x) {
//     super(x)
//        this.x = this.position + x;
//        console.log(this.x);
//        this.y = 55;
//        this.movement(this.speed);
//
//   }
// }
// class MiddleEnemy extends Enemy {
//   constructor(x) {
//     super(x)
//        this.x = this.position + x;
//        this.y = 137;
//        this.movement();
//   }
// }
// class BottomEnemy extends Enemy {
//   constructor(x) {
//     super(x)
//        this.x = this.position + x;
//        this.y = 220;
//        this.movement();
//   }
// }

// Loops the enemies when these reach the end of the canvas
  function loopEnemy() {
     allEnemies.forEach(function(bug) {
       if (bug.x > 600) {
         console.log(bug);
         bug.x = random_x();
         bug.y = random_y();
         bug.speed = random_speed();
       }
   });
  }

class Player {
  constructor(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
  }
  update(dt) {

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
    console.log('x: ' + this.x + ' y: ' + this.y)
    switch (keyPress) {
      case 'left':
        if (this.x > 0) {
          detectCollision(player, allEnemies);
          this.x -=100;
        }
        break;
      case 'right':
        if (this.x < 400) {
          detectCollision(player, allEnemies);
          this.x +=100;
          break;
        }
      case 'up':
        if (this.y > 0) {
          detectCollision(player, allEnemies);
          this.y -=83;
          reachedWater(player, allEnemies)
        }
        break;
      case 'down':
        if (this.y < 400) {
          detectCollision(player, allEnemies);
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
//const numEnemies = 2;


 // for (i = 0; i < numEnemies; i++) {
 //     setTimeout(function() {
 //         allEnemies[i] = new TopEnemy(0, enemySpeed);
 //         i++;
 //     }, i * 3000);
 //     //enemy[i].push(allEnemies);
 //   }
 // for (i = 0; i < numEnemies; i++) {
 //     setTimeout(function() {
 //         allEnemies[i] = new MiddleEnemy(100, enemySpeed);
 //         i++;
 //     }, i * 3000);
 //     //enemy[i].push(allEnemies);
 //   }
 // for (i = 0; i < numEnemies; i++) {
 //     setTimeout(function() {
 //         allEnemies[i] = new BottomEnemy(200, enemySpeed);
 //         i++;
 //     }, i * 3000);
 //     //enemy[i].push(allEnemies);
 //   }
 // console.log(allEnemies);



var create_enemies = (num) => {
  var bugs = num;

  for (var i = 0; i < bugs; i++) {
      var bug = new Enemy();
      bug.speed = random_speed();
      bug.y = random_y();
      bug.x = random_x();

      // push to array
      allEnemies.push(bug);
    }
};
create_enemies(8);

// //add movement to the bugs
// var counter = 0
//   function setDelay() {
//     setTimeout(() => {
//       //allEnemies[counter].update()
//       counter++
//       if (counter < allEnemies.length) { setDelay(); }
//     }, 1000);
//   }
//
//   setDelay();

// //function to loop enemies based on time
// setInterval( () => {
//   allEnemies.forEach( bug => {
//     if (bug.x >= 1000 & gameIsRunning === true) {
//         loopEnemy();
//     }
//   })
// }, 1);

// Array of gem sprites
const gemSprites = [
  {
    name: 'blue_gem',
    sprite: 'images/Gem_Blue.png'
  },
  {
    name: 'orange_gem',
    sprite: 'images/Gem_Orange.png'
  },
  {
    name: 'green_gem',
    sprite: 'images/Gem_Green.png'
  },
  {
    name: 'heart',
    sprite: 'images/Heart.png'
  }
];

const gemXLocation = [0, 100, 200, 300, 400];

//Create the gems object (class)
class Gem {
  constructor() {
    this.x = this.getXLocation(gemXLocation.length);
    this.y = random_y();
    this.sprite = this.getSprite(gemSprites.length);
  }
  getSprite(num) {
    return gemSprites[Math.floor( Math.random() * Math.floor(num) )].sprite;
  }
  getXLocation(num) {
    return gemXLocation[Math.floor( Math.random() * Math.floor(num) )];
  }
  timeOut() {

  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
  }
}
var gem1 = new Gem;
console.log('Gem X: ' + gem1.x + ' Gem Y: ' + gem1.y + ' Sprite: ' + gem1.sprite);



// detect player has reached the water
const reachedWater = () => {
  //console.log(player.y);
  if (player.y == -15) {
    score += 100;
    scoreElem.innerText = score;
    player.resetPosition();
  }
}

// when coliding with a bug the player loses one life
const die = () => {
  lives -= 1;
  player.resetPosition();
  // check that lives are zero and return game over modal
  if (lives + 1 === 1) {
    console.log('game over!!!!')
  }
  livesElem.innerText = lives;
}

// collision detection function
const detectCollision = (player, enemy) => {
  enemy.forEach( ( bug ) => {
    // top row
    if ( player.y == 68 && bug.y == 68 ) {
      if ( player.x >=0 && player.x < 100 && bug.x >=0 && bug.x <100 ) {
        die();
      } else if ( player.x >=100 && player.x < 200 && bug.x >=100 && bug.x <200 ) {
        die();
      } else if ( player.x >=200 && player.x < 300 && bug.x >=200 && bug.x <300 ) {
        die();
      } else if ( player.x >=300 && player.x < 400 && bug.x >=300 && bug.x <400 ) {
        die();
      }
    }
    // middle row
    if ( player.y == 151 && bug.y == 151 ) {
      if ( player.x >=0 && player.x < 100 && bug.x >=0 && bug.x <100 ) {
        die();
      } else if ( player.x >=100 && player.x < 200 && bug.x >=100 && bug.x <200 ) {
        die();
      } else if ( player.x >=200 && player.x < 300 && bug.x >=200 && bug.x <300 ) {
        die();
      } else if ( player.x >=300 && player.x < 400 && bug.x >=300 && bug.x <400 ) {
        die();
      }
    }
    //bottom row
    if ( player.y == 234 && bug.y == 234 ) {
      if ( player.x >=0 && player.x < 100 && bug.x >=0 && bug.x <100 ) {
        die();
      } else if ( player.x >=100 && player.x < 200 && bug.x >=100 && bug.x <200 ) {
        die();
      } else if ( player.x >=200 && player.x < 300 && bug.x >=200 && bug.x <300 ) {
        die();
      } else if ( player.x >=300 && player.x < 400 && bug.x >=300 && bug.x <400 ) {
        die();
      }
    }
  });
}
setInterval( () =>  {
  detectCollision(player, allEnemies);
}, 1)

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', e => {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
