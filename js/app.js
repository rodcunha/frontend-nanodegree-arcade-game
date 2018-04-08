// // Enemies our player must avoid

const scoreElem = document.querySelector('#score'); //html score element
const livesElem = document.querySelector('#lives'); // html lives element
const startModal = document.querySelector('#start-game'); // start game Modal
const gameCanvas = document.getElementsByTagName('canvas'); // selects the canvas element
const span = document.getElementsByClassName("close")[0]; // close button of modal element
const startBtn = document.querySelector('#btnStart');
const enemySprite = 'images/enemy-bug.png';
const allEnemies = []; // array to store the enemies
let gotToWater = 0;
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

// create the super class for all the elements of the game
class Element {
  constructor(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

//create the Enemy object and assigns the values
class Enemy extends Element {
  constructor(x, y, sprite) {
    super(x, y, sprite);
    // this.x = random_x();
    // this.y = random_y();
    this.speed = random_speed();
    // this.sprite = 'images/enemy-bug.png';
    this.position = parseInt(Math.random()*300-500);
  }
  // loops the enemies on the canvas
  update(dt) {
    if (this.x > 600) {
      this.loopEnemy();
    }
    this.x += this.speed * dt;
  }
  loopEnemy() {
    allEnemies.forEach( bug => {
      if (bug.x > 600) {
        //console.log(bug); // logs the full object to the console.
        bug.x = random_x();
        bug.y = random_y();
        bug.speed = random_speed();
      }
  });
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Create the Player class
class Player extends Element {
  constructor(x, y, sprite) {
    super(x, y, sprite);
    this.lives = 3;
  }
  //update the player
  update(dt) {
    for(var i =0; i< allEnemies.length;i++){
        if ( (this.y == allEnemies[i].y) && (this.x < allEnemies[i].x + 35) && (this.x > allEnemies[i].x - 20) ) {
          this.die();
        }
    }
  }
  // gain a life when collecting a heart
  gainLife() {
    this.lives +=1;
  }
  // player loses a life when hit by a bug
  die() {
    this.lives -=1;
    this.resetPosition();
    // check that lives are zero and return game over modal
    if (player.lives + 1 === 1) {
      console.log('game over!!!!');
    }
    showLives();
  }
  //detects if the player has reached the water
  reachedWater() {
      score += 100;
      showScore();
      this.resetPosition();
  }
  //player wins the game
  hasWon() {
    if (score >= 1000) {

      gameIsRunning = false;
    }
  }
  //reset the player position when reaching the water or getting killed by a bug
  resetPosition() {
    this.x = 200;
    this.y = 400;
  }
  //handle the keypress
  handleInput(keyPress) {
    //console.log(keyPress);
    player.hasWon();
    switch (keyPress) {
      case 'left':
        if (this.x > 0) {
          this.x -=100;
        }
        gems.getGem(player, gems);
        break;
      case 'right':
        if (this.x < 400) {
          this.x +=100;
          gems.getGem(player, gems);
          break;
        }
      case 'up':
        if (this.y > 0) {
          this.y -=83;
          if (this.y < 68) {
            this.reachedWater();
          }
          gems.getGem(player, gems);
        }
        break;
      case 'down':
        if (this.y < 400) {
          this.y += 83;
          gems.getGem(player, gems);
        }
        break;
    }
  }
}

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
    name: 'green_gem',
    sprite: 'images/Star.png'
  },
  {
    name: 'heart',
    sprite: 'images/Heart.png'
  }
];

const gemImage = gemSprites[Math.floor( Math.random() * Math.floor(gemSprites.length) )].sprite;;
const gemXLocation = [0, 100, 200, 300, 400, -100]; // possible x locations for the gems minus 100 means that one location is off canvas
const gemRandomX = gemXLocation.length;
const getXLocation = (num) => {
  return gemXLocation[Math.floor( Math.random() * Math.floor(num) )];
}

//Create the gems object (class)
class Gem extends Element {
  constructor(x, y, sprite) {
    super(x, y, sprite);
    // this.x = this.getXLocation(gemRandomX);
    // this.y = random_y();
    // this.sprite = this.getSprite(gemImage);
  }
  // gets a random gem sprite
  // getSprite(num) {
  //   return gemSprites[Math.floor( Math.random() * Math.floor(num) )].sprite;
  // }
  //gets a random location for x
  // getXLocation(num) {
  //   return gemXLocation[Math.floor( Math.random() * Math.floor(num) )];
  // }
  // issues the score
  gemPoints(sprite) {
    if ( sprite == 'images/Heart.png') {
      player.gainLife();
      this.clearGem();
    } else if (sprite == 'images/Gem_Blue.png') {
      score += 10;
      this.clearGem();
    } else if ( sprite == 'images/Gem_Green.png') {
      score += 20;
      this.clearGem();
    } else if ( sprite == 'images/Gem_Orange.png') {
      score += 30;
      this.clearGem();
    } else if (sprite == 'images/Star.png') {
      score += 50;
      this.clearGem();
    }
  }
  // checks if the player and the gem are in the same square and calls the points method
  getGem(player, gems) {
    if ( player.y ==  this.y && player.x == this.x ) {
      this.gemPoints(this.sprite);
    }
  }
  //sends the gem off screen and updates the score and lives
  clearGem() {
    this.x = -100;
    this.y = -100;
    showScore();
    showLives();
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// create a random number of enemies between 15 and 20
// iterate through them and instantiate the Enemies
// assign them to the different rows y=100 y=200 y=300
// make them move at random speen, when they get to x=500 reset them randomly

// create the enemies
var create_enemies = (num) => {
  var bugs = num;

  for (var i = 0; i < bugs; i++) {
      var bug = new Enemy(random_x(), random_y(), enemySprite);
      bug.speed = random_speed();
      // bug.y = random_y();
      // bug.x = random_x();

      // push to array
      allEnemies.push(bug);
    }
};


//modal trigger on load
window.onload = () => {
    startModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    startModal.style.display = "none";
}

//

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == startModal) {
        startModal.style.display = "none";
    }
}

let player = new Player;
let gems = new Gem;

// start game function
function startGame() {
  startModal.style.display = "none";
  score = 0;
  lives = 3;
  gameIsRunning = true;
  create_enemies(8);


  player = new Player(200, 400, 'images/char-boy.png'); // creates a new player object
  //console.log(player);
  player.render();

  // create a gem every 4 seconds at a random location.
  gems = new Gem((gemRandomX), random_y(), gemImage);
  //console.log('gemx: ' + gems.x + 'gemy: ' + gems.y + ' gemsprite: ' + gems.sprite);
  gems.render();

  setInterval( () => {
    gems = new Gem(getXLocation(gemRandomX), random_y(), gemImage);
  //  console.log('Gem X: ' + gems.x + ' Gem Y: ' + gems.y + ' Sprite: ' + gems.sprite);
  }, 4000);

  showLives();
  showScore();
}



// Display the score on the header
const showScore = () => {
   scoreElem.innerText = score;
}

// display the number of lives of the player
const showLives = () => {
  livesElem.innerText = player.lives;
}



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
