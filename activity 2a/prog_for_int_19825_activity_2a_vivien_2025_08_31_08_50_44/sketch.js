// DDM2008 — Activity 2a
// (Mode Switch, 20 min)

let x = 0; // ellipse x-position
let size = 50; // ellipse size (you can change this in your if/else)
let bgColor; // background color set by switch(key)
let mouseX;

function setup() {
  createCanvas(400, 400);
  bgColor = color(220);

}

function draw() {
  background(bgColor);
  ellipse(x, height / 2, size);

   if (x > width + size / 2) {
    x = 0;
  }
  
  // Wrap around when it exits the right edge
  if (mouseX > width / 2) {
    x += 10; // faster on right
     } if (mouseY > height/4) {
    x -=2;
  } else {
    x += 12; 
  }
  
if (mouseIsPressed == true) {
  fill (random (255), random (255), random (255));
}
  
}

// --- Mode switching with number keys: 1, 2, 3 ---
function keyPressed() {
  switch (key) {
    case "1":
      bgColor = color(200, 100, 100); // red
      break;
    case "2":
      bgColor = color(100, 200, 150); // green
      break;
    case "3":
      bgColor = color(100, 100, 190); // blue
      break;
    default:
      bgColor = color( random(255), random(255), random(255)); // grey
  }
}


