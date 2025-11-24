// Create variables for images
let tab1, tab2, tab3;
let keep1, keep2, keep3;
let release1, release2, release3;
let gemfishImg, chatfishImg, claudefishImg;
let fishImages = [];
let fishData = []; // Array of objects for image and name
let picked = null;
var fishes = [];
let currentFishIndex = 0; // Add counter for sequential fish types
let gameState = 'playing'; // can be 'playing', 'choosing', or 'showing_result'
let keepButton, releaseButton;
let caughtFishType = ''; // Store the type of fish that was caught
let result = '';
let imageIndex = 0; // Add counter to track which image to show next
let resultTimer = 0;
let caughtFishImage = null; // Store the initial catch image
let backgroundImage = null; // Store the current background image
let useStartGameBackground = false;
let actionCount = 0;
let playerChoices = []; // Track sequence of keep/release actions
let maxFishes = 3; // Maximum number of fishes to show
let fishSpawnInterval = 2000; // Time between spawns in ms
let lastFishSpawnTime = 0;
let endButton;
let showEndScreen = false;
let showStartScreen = true;
let showStartGame = false;
let startGameBackground;
let startBackground;
let useKeepReleaseBackgrounds = false;
let splashSound;

function preload() {
  // Initial catch images
  tab1 = loadImage('tab1.png');
  tab2 = loadImage('tab2.png');
  tab3 = loadImage('tab3.png');
   tab4 = loadImage('tab4.png');
   tab5 = loadImage('tab5.png');
  startGameBackground = loadImage('startGame.png');
  endgame = loadImage('end.png');
  
  // Keep outcome images
  keep1 = loadImage('keep1.png');
  keep2 = loadImage('keep2.png');
keep3 = loadImage('keep3.png');
  // Release outcome images
  release1 = loadImage('release1.png');
  release2 = loadImage('release2.png');
  release3 = loadImage('release3.png');
  
  // Load the three different fish images
  gemfishImg = loadImage("gemfish.png");
  chatfishImg = loadImage("chatfish.png");
  claudefishImg = loadImage("claudefish.png");
  // Add the fish images to the array
  fishImages = [gemfishImg, claudefishImg, chatfishImg];
  // Add image and name pairs to fishData
  fishData = [
    { img: gemfishImg, name: 'Gem Fish' },
    { img: claudefishImg, name: 'Claude Fish' },
    { img: chatfishImg, name: 'Chat Fish' }
  ];
  
  // Start page background
  startBackground = loadImage('start.png'); // Add your start background image to the folder

  splashSound = loadSound('water_splash.mp3');

  bgMusic = loadSound('bg music.mp3');
}

// Create an array with the tab images
let paletteRelease = [release1, release2, release3];
let paletteKeep = [keep1, keep2, keep3];

function setup() {
  createCanvas(600, 750);
  // Verify all fish images loaded correctly
  console.log("Fish images loaded:", 
    gemfishImg ? "gemfish loaded" : "gemfish failed",
    chatfishImg ? "chatfish loaded" : "chatfish failed",
    claudefishImg ? "claudefish loaded" : "claudefish failed"
  );
  // Initialize palettes with different image sets
  catchPalette = [tab1, tab2, tab3, tab4, tab5];
  keepPalette = [keep1, keep2, keep3];
  releasePalette = [release1, release2, release3];
  fishes = [];
  lastFishSpawnTime = millis();
  
  // Create buttons
  keepButton = createButton('Keep');
  keepButton.position(width/2 - 80, height - 220);
  keepButton.mousePressed(keepFish);
  keepButton.hide();
  
  releaseButton = createButton('Release');
  releaseButton.position(width/2 + 40, height - 220);
  releaseButton.mousePressed(releaseFish);
  releaseButton.hide();

  // Create end screen button
  endButton = createButton('Restart Game');
  endButton.position(width/2 - 40, height/2 + 100);
  endButton.mousePressed(restartGame);
  endButton.hide();

  // Listen for space bar to start
  window.addEventListener('keydown', function(e) {
    if (showStartScreen && (e.code === 'Space' || e.key === ' ')) {
      showStartScreen = false;
      showStartGame = true;
      setTimeout(() => {
        showStartGame = false;
        useStartGameBackground = true;
      }, 2000);
    }
  });
}

let lineAndHook = {
  //fishing line and hook
  display: function () {
    noFill();
    strokeWeight(3);
    stroke(0);
    line(mouseX, mouseY, mouseX, mouseY + 150); //hook
    line(mouseX, mouseY, mouseX + 450, mouseY + 255); //fishing line
  },
};

class Fish {
  constructor(x, y) {
    this.x = random(0);
    this.y = random(500, 710); // Adjust vertical position range
    this.xSpeed = random(1, 2);
    this.ySpeed = random(-1, 1);
    this.isCaught = false;  // Add this to track if fish is caught
  // Use fishData for both image and name
  let fishInfo = fishData[currentFishIndex];
  this.fishImg = fishInfo.img;
  this.fishType = fishInfo.name;
  // Update the fish index for the next fish
  currentFishIndex = (currentFishIndex + 1) % fishData.length;
  }

  move() {
    if (!this.isCaught) {  // Only move if not caught
      this.x += this.xSpeed;
      this.y += this.ySpeed;
      if (this.y < 500 || this.y > 710) {
        //if fish is above water or too far below the canvas, reverse ySpeed
        this.ySpeed = -this.ySpeed; // Reverse direction when hitting boundaries
      }
      if (this.x > 600) {
        //if fish has moved past the right edge of the canvas, set new random position
        this.x = random(-300, -200);
        this.y = random(500, 700);
      }
    }
  }

  display() {
    image(this.fishImg, this.x, this.y, 70, 60);
  }

  fished() {
    if (
      gameState === 'playing' &&
      !this.isCaught &&
      mouseX > this.x &&
      mouseX < this.x + 110 &&
      mouseY + 125 > this.y &&
      mouseY + 125 < this.y + 46
    ) {
      if (mouseIsPressed === true) {
        this.isCaught = true;
        playSplash(); // use helper that lowers bg music, plays splash, then restores
        caughtFishImage = catchPalette[imageIndex];
        picked = caughtFishImage;
        caughtFishType = this.fishType;
        imageIndex = (imageIndex + 1) % catchPalette.length;
        gameState = 'choosing';
        keepButton.show();
        releaseButton.show();
      }
    }
  }
}


function draw() {
  if (bgMusic && !bgMusic.isPlaying() && !showStartScreen && !showEndScreen) {
    bgMusic.setVolume(0.3);
    bgMusic.loop();
  }
  // Stagger fish spawning
  if (gameState === 'playing' && fishes.length < maxFishes) {
    if (millis() - lastFishSpawnTime > fishSpawnInterval) {
      fishes.push(new Fish());
      lastFishSpawnTime = millis();
    }
  }
  if (showStartScreen) {
    // Start screen
    if (startBackground) {
      image(startBackground, 0, 0, width, height);
    } else {
      background(50, 100, 200);
    }
    keepButton.hide();
    releaseButton.hide();
    endButton.hide();
    return;
  }

  if (showStartGame) {
    if (startGameBackground) {
      image(startGameBackground, 0, 0, width, height);
    } else {
      background(100, 150, 200);
    }
    keepButton.hide();
    releaseButton.hide();
    endButton.hide();
    return;
  }
  if (showEndScreen) {
    if (backgroundImage) {
      image(backgroundImage, 0, 0, width, height);
    } else {
      background(30, 30, 80);
    }
      textSize(32);
      fill(255);
      textAlign(CENTER);
      textFont('Comic Sans MS');
      text('Game Over!', width/2, height/2 - 200);
    image (endgame, width/2 - 150, height/2 - 100, 300, 225);
    endButton.show();
    keepButton.hide();
    releaseButton.hide();
    return;
  } else {
    endButton.hide();
  }

  // Set the background
  if (useStartGameBackground && startGameBackground && !useKeepReleaseBackgrounds) {
  image(startGameBackground, 0, 0, width, height);
} else if (backgroundImage) {
  image(backgroundImage, 0, 0, width, height);
} else {
  background(220);
}

  // Show catch tab image if in choosing state
  if (gameState === 'choosing' && picked) {
    fill(255, 255, 255, 128);
    noStroke();
    image(picked, width/2 - 150, height/2 - 200, 300, 375); // Position relative to center
    
    // Add fish type caption
    textSize(20);
    textAlign(CENTER);
    fill(0);
    text('You caught a ' + caughtFishType + '!', width/2, height/2 - 150);
  }

  // Display the fishing line and hook
  lineAndHook.display();

  // Update and display each fish
  for (let fish of fishes) {
    fish.move();
    fish.display();
    fish.fished();
  }

  // Display result text
  if (gameState === 'showing_result') {
    textSize(24);
    textAlign(CENTER);
    fill(255);
    stroke(0);
    strokeWeight(2);
    text(result, width/2, height - 100);
    noStroke();
  }
}

function keepFish() {
  gameState = 'showing_result';
  playerChoices.push('keep');
  let keepIndex = playerChoices.filter(c => c === 'keep').length - 1;
  backgroundImage = keepPalette[keepIndex] || keepPalette[keepPalette.length - 1];
  useStartGameBackground = false;
useKeepReleaseBackgrounds = true;
  result = 'You kept the fish!';
  resultTimer = millis();
  keepButton.hide();
  releaseButton.hide();
  actionCount++;
  fishes = fishes.filter(fish => !fish.isCaught);
  fishes.push(new Fish());
  if (actionCount >= 3) {
    showEndScreen = true;
  } else {
    setTimeout(() => {
      result = '';
      gameState = 'playing';
  // imageIndex increment now handled when fish is caught
    }, 2000);
  }
}

function releaseFish() {
  gameState = 'showing_result';
  playerChoices.push('release');
  let releaseIndex = playerChoices.filter(c => c === 'release').length - 1;
  backgroundImage = releasePalette[releaseIndex] || releasePalette[releasePalette.length - 1];
  useStartGameBackground = false;
  useKeepReleaseBackgrounds = true;
  result = 'You released the fish!';
  resultTimer = millis();
  keepButton.hide();
  releaseButton.hide();
  actionCount++;

  // if any caught fish exists, play the splash once and reset them
  const anyCaught = fishes.some(f => f.isCaught);
  if (anyCaught) playSplash();

  fishes.forEach(fish => {
    if (fish.isCaught) {
      fish.isCaught = false;
      fish.x = random(-300, -200);
      fish.y = random(500, 700);
    }
  });

  if (actionCount >= 3) {
    showEndScreen = true;
  } else {
    setTimeout(() => {
      result = '';
      gameState = 'playing';
    }, 2000);
  }
}

// function playSplash() {
//   if (!splashSound) return;
//   const restoreVolume = 0.05; // target base volume
//   const loweredVolume = 0.02; // lower while splash plays
//   if (bgMusic && bgMusic.isPlaying && bgMusic.isPlaying()) {
//     bgMusic.setVolume(loweredVolume);
//   }
//   splashSound.play();
//   // try to restore after splash duration (duration() returns seconds)
//   let durMs = 800;
//   if (splashSound && typeof splashSound.duration === 'function') {
//     const d = splashSound.duration();
//     if (d > 0) durMs = Math.round(d * 1000) + 100;
//   }
//   setTimeout(() => {
//     if (bgMusic && bgMusic.isPlaying && bgMusic.isPlaying()) {
//       bgMusic.setVolume(restoreVolume);
//     }
//   }, durMs);
// }


function restartGame() {
  playerChoices = [];
  actionCount = 0;
  showEndScreen = false;
  backgroundImage = null;
  useStartGameBackground = true;
  useKeepReleaseBackgrounds = false;
  result = '';
  gameState = 'playing';
  picked = null;
  currentFishIndex = 0;  // Reset the fish index to start the cycle over
  fishes = [];
  lastFishSpawnTime = millis();
  endButton.hide();
}
