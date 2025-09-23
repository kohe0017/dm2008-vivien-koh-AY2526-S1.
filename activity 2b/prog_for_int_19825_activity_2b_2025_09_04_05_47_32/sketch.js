let counter = 0;
let i;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate (50);
}

function draw() {
    background(220, 200, 0);
  
  for (let j = 0; j < 100; j++)
    for (let i = 0; i < 100; i++) {
      noStroke();
      fill(200, 0, 10, 50);
       ellipse(i * 70, j * 70, counter);
    console/log(i);
  }
  
   if (mouseIsPressed == true);
  frameRate = frameRate*4;
  
  if (keyIsPressed == true);
  frameRate = frameRate/2;
  
  counter = sin(frameCount*0.01) * 100;
  console.log(counter);
}

