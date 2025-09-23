// DM2008
// Activity 1b (Georg Nees)

let x;
let y;
let w;

function setup() {
  createCanvas(windowWidth, windowHeight)
  background(240);
}

function draw() {{}
  
  x = random(width);
  y = random(height);
  w = random(10, 80);
                 
if (mouseIsPressed === true) {
  stroke (random (255), random (255), random (255))
  strokeWeight(15)
 noFill()
  rect(x, y, w, w)
                }
                 
else (mouseIsPressed === false); {
  stroke (0,0,0);
  strokeWeight(random(0.5, 2));
 noFill()
  ellipse(x, y, w, w)
}
                }

                
