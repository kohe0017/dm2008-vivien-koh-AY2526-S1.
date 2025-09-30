let balls = [];

function setup() {
  createCanvas(400, 400);
  // make 2 balls to start
   for (let i = 0; i < 10; i++) {
  balls.push(new Ball(width/2, height/2));
  rectMode (CENTER);
}
}

function draw() {
  background(230);

  // update & display each ball
  for (let i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].show();
    // check collision with others
    balls[i].checkCollision(balls);
  }
}

class Ball {
  constructor(x, y) {
    this.r = random (10, 40);
    this.pos = createVector(x, y);
    this.vel = createVector(random(0, 15), random(0, 15));
  }

  move() {
    this.pos.add(this.vel);
    // wrap around edges
    if (this.pos.x < this.r || this.pos.x > width - this.r) {this.vel.x *= -1;}
    if (this.pos.y < this.r || this.pos.y > height - this.r) {this.vel.y *= -1;}
   
  }

 show() {
    fill(100, 180, 220);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }

  checkCollision(others) {
    for (let i = 0; i < others.length; i++) {
      // Make sure we do not compare the ball to itself
      if (others[i] !== this) {
        let other = others[i];
        let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        if (d < this.r + other.r) {
          push();
          // stroke(200, 60, 60);
          // strokeWeight(4);
          // noFill();
          fill (random (255), random (255), random (255));
          ellipse(this.pos.x, this.pos.y, this.r*2); // highlight on collision
          // noFill();
          // rect(this.pos.x, this.pos.y, 200);
          pop();
          
          // this.r = this.r + 2;
        }
      }
    }
  }
}
