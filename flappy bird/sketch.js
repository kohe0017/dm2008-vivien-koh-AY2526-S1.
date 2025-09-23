// Notes for students:
// 1) Add flap control in handleInput() (space / ↑ to jump)
// 2) Detect collisions between the bird and pipes → game over
// 3) Add scoring when you pass a pipe
// 4) (Stretch) Add start/pause/game-over states

/* ----------------- Globals ----------------- */
let bird;
let pipes = [];
let pos;
let vel;

let spawnCounter = 0; // simple timer
const SPAWN_RATE = 90; // ~ every 90 frames at 60fps ≈ 1.5s
const PIPE_SPEED = 2.5;
const PIPE_GAP = 120; // gap height (try 100–160)
const PIPE_W = 60;

let score = 0;

/* ----------------- Setup & Draw ----------------- */
function setup() {
  createCanvas(480, 640);
  noStroke();
  bird = new Bird(120, height / 2);
  // Start with one pipe so there’s something to see
  pipes.push(new Pipe(width + 40));
  pos = createVector(width / 2, height / 2);
  vel = createVector(2, 0);
}

function draw() {
  background(18, 22, 28);
  handleInput();

  // 2 update world
  bird.update();

  // spawn new pipes on a simple timer
  spawnCounter++;
  if (spawnCounter >= SPAWN_RATE) {
    pipes.push(new Pipe(width + 40));
    spawnCounter = 0;

    pos.add(vel);

    // wrap around edges
    if (pos.x > width) pos.x = 0;
    if (pos.x < 0) pos.x = width;
    if (pos.y > height) pos.y = 0;
    if (pos.y < 0) pos.y = height;
  }

  // update + draw pipes
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    pipes[i].show();

    // TODO (students): collision check with bird
    // If collision → stop the game or reset (add a game state if you want)
    if (pipes[i].hits(bird)) {
      textSize(24);
      textAlign(CENTER);
      fill(255);
      noStroke();

      text("game over!", width / 2, height / 2);
      text ("Press 'r' to restart", width / 2, height / 2 + 30);

      noLoop();
    
    }
    if (pipes[i].passed === false)
      if (pipes[i].x + pipes[i].w < bird.pos.x) {
        score = score + 1;
        pipes[i].passed = true;
     
        fill(250);
        textAlign(LEFT);
        textSize(15);
        text("Score:" + score, 50, 50);
      }

    // remove pipes that moved off screen
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }

    // 3 draw bird last so it’s on top
    bird.show();

    fill(250);
    textAlign(LEFT);
    textSize(15);
    text("Score: " + score, 50, 50);
  }
}

/* ----------------- Input ----------------- */
function handleInput() {
  // TODO (students): make the bird flap on key press
  // Hints:
  // - In keyPressed(): call bird.flap();
  // if (keyIsDown(32)) bird.flap(); // 32 = space
}

function resetGame() {
  bird = new Bird(120, height / 2);
  pipes = [];
  pipes.push(new Pipe(width + 40));
  spawnCounter = 0;
  score = 0;
}

function keyPressed() {
  bird.flap();
  if (key === "1") {
    vel.setHeading(-PI / 4);
  }
  // Add this to allow reset with 'R'
  if (key === 'r' || key === 'R') {
    resetGame();
    loop(); // restart the draw loop
  }
}

/* ----------------- Classes ----------------- */
class Bird {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 16; // for collision + draw
    this.gravity = 0.45; // constant downward force
    this.flapStrength = -8.0; // negative = upward
  }

  applyForce(fy) {
    this.acc.y += fy;
  }

  flap() {
    // instant upward kick
    this.vel.y = this.flapStrength;
  }

  update() {
    // gravity
    this.applyForce(this.gravity);

    // integrate
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // keep inside canvas vertically (simple constraints)
    if (this.pos.y < this.r) {
      this.pos.y = this.r;
      this.vel.y = 0;
    }
    if (this.pos.y > height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y = 0;
      // TODO (students): treat touching the ground as game over
    }
  }

  show() {
    fill(255, 205, 80);
    circle(this.pos.x, this.pos.y, this.r * 2);

    // (Optional) add a small eye
    fill(40);
    circle(this.pos.x + 6, this.pos.y - 4, 4);

    // checking collision?
    let d = dist(this.r, this.r, this.top, this.bottom);
    if (d < this.top + this.r && d < this.bottom + this.r) {
      background(0);
    }
  }
}

class Pipe {
  constructor(x) {
    this.x = x;
    this.w = PIPE_W;
    this.speed = PIPE_SPEED;

    // randomize gap position
    const margin = 40;
    const gapY = random(margin, height - margin - PIPE_GAP);

    this.top = gapY; // bottom of top pipe
    this.bottom = gapY + PIPE_GAP; // top of bottom pipe

    this.passed = false; // for scoring once per pipe
  }

  update() {
    this.x -= this.speed;
  }

  show() {
    // Change color if score >= 2
    if (score >= 1) {
      fill(random (255), random(255), random(255));
    } else {
      fill(120, 200, 160);
    }
    rect(this.x, 0, this.w, this.top); // top pipe
    rect(this.x, this.bottom, this.w, height - this.bottom); // bottom pipe
  }

  offscreen() {
    // look at MDN to understand what 'return' does
    // we will learn more about this in Week 6
    return this.x + this.w < 0;
  }

  // TODO (students): circle-rect collision (simple)
  // 1) Check if bird within pipe's x range.
  // 2) If yes, check if bird.y is outside the gap (above top OR below bottom).
  //    Then it’s a hit.
  //
  hits(bird) {
    const withinX =
      bird.pos.x + bird.r > this.x && bird.pos.x - bird.r < this.x + this.w;
    const aboveGap = bird.pos.y - bird.r < this.top;
    const belowGap = bird.pos.y + bird.r > this.bottom;
    return withinX && (aboveGap || belowGap);
  }
}
