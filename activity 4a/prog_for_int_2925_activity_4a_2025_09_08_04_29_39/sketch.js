// DM2008 – Activity 4a
// Bake a Cookie (30 min)

let cookie;
let flavor = ["chocolate", "matcha", "rv"]

function setup() {
  createCanvas(400, 400);
  noStroke();

  // Step 3: make one cookie object
  cookie = new Cookie("chocolate", 80, width / 2, height / 2);
  cookie2 = new Cookie ("rgb(40,100,19) matcha", 80, width/2, 100);
  cookie3 = new Cookie ("rgb(95,4,4) rvelvet", 80, width/2, 3*height/4);
}

function draw() {
  background(230);

  // Step 4: call the cookie’s show() method
  cookie.show();
  cookie2.show();
  cookie3.show();
}

// Step 1: define the Cookie class
class Cookie {
  constructor(flavor, size, x, y) {
    // set up required properties
    this.flavor = flavor;
    this.size = size;
    this.x = x;
    this.y = y;
    this.color = color(196, 146, 96);
  }

  // Step 2: display the cookie
  show() {
    fill(this.color);
    // if (this.flavor == "chocolate") {
    //   fill(196, 146, 96);
    // } else {
    //   fill(220, 180, 120);
    // }
    ellipse(this.x, this.y, this.size);

    const s = this.size * 0.1;
    fill(60);
    ellipse(this.x - this.size * 0.22, this.y - this.size * 0.15, s);
    ellipse(this.x + this.size * 0.18, this.y - this.size * 0.1, s);
    ellipse(this.x - this.size * 0.05, this.y + this.size * 0.12, s);
    ellipse(this.x + this.size * 0.2, this.y + this.size * 0.18, s);
  }

  // Steps 5 & 6: Implement additional methods here
  move(arrow) {
    if (arrow === "right") this.x += 10;
    if (arrow === "left") this.x -= 10;
  }
  changeColor() {
    this.color = color(random(255), random(255), random(255));
  }
}

// Step 5: add movement (keyboard arrows)
function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    cookie.move("right");
    cookie2.move("left");
    cookie3.move("left");
  } else if (keyCode === LEFT_ARROW) {
    cookie.move("left");
    cookie2.move("right");
     cookie3.move("right");
  }
}

// Step 6: add flavor randomizer (mouse click)
function mousePressed() {
  cookie.changeColor();
  cookie2.changeColor();
  cookie3.changeColor();
}
