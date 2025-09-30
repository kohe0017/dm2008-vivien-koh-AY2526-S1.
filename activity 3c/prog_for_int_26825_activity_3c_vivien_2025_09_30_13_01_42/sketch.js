// 1) Palette + size
const palette = ["#FF008E84", "#0062FF9B", "#EAFF0084"];
let colorIndex = 0;
let sizeVal = 30;

// 2) Brush registry (array of functions)
const brushes = [brushCircle, brushSquare, brushStreak, eraseMode];
let currentBrush = 0; // 0, 1, or 2

function setup() {
  createCanvas(600, 600);
  background(240);
  rectMode(CENTER);
}

function draw() {
  // paint only while mouse is held
  if (mouseIsPressed) {
    const col = palette[colorIndex];
    // call the selected brush function
    brushes[currentBrush](mouseX, mouseY, col, sizeVal);
  }
}

// 3) Brush functions (students can customize/extend)
function brushCircle(x, y, c, s) {
  noStroke();
  fill(c);
  ellipse(x, y, s);
}

function brushSquare(x, y, c, s) {
  push();
  translate(x, y);
  noStroke();
  fill(c);
  rect(0, 0, s, s);
  pop();
}

function brushStreak(x, y, c, s) {
  stroke(c);
  strokeWeight(max(2, s / 8));
  line(x, y, x + 30, y + 10);
}

function eraseMode(x, y, c, s) {
  noStroke();
  fill("#eee");
  ellipse(x, y, s * 3);
}

// 4) Brush UI: select brush, cycle color, change size, clear
function keyPressed() {
  switch (key) {
    case "1":
      currentBrush = 0; // circle
      break;
    case "2":
      currentBrush = 1; // square
      break;
    case "3":
      currentBrush = 2; // streak
      break;
    case "0":
      currentBrush = 3; //erase
      break;
  }
  if (key == "C" || key == "c") {
    colorIndex = (colorIndex + 1) % palette.length; // cycle color
  }
  if (key == "+" || key == "=") {
    sizeVal += 4;
  }
  if (key == "-" || key == "_") {
    sizeVal = max(4, sizeVal - 4);
  }
  if (key == "X" || key == "x") {
    background(240); // clear canvas
  }

  // TODO: add an 'E' (eraser) mode by painting with background color
  // e.g., if eraserMode, use color(240) instead of palette[colorIndex]
}
