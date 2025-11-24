let colorBtn, sizeSlider, shapeSelect, opacitySlider, rotationSelect;
let shapeColor;
let opacity, a;
let cursorColor;
let cnv; // reference to the p5 canvas element

function setup() {
  cnv = createCanvas(640, 400);
  noStroke();
  textFont ("Comic Sans MS") 
  

  // starting color
  shapeColor = color(random(255), random(255), random(255), 50);

  // custom cursor: start black, hide system cursor over canvas
  cursorColor = color(0, 0, 0);
  noCursor();

  // Button: change color
  colorBtn = createButton("Change Shape Color");
  colorBtn.position(16, 16);
  colorBtn.mousePressed(randomShapeColor);
  
  function randomShapeColor() {
    // pick a random RGB but keep current opacity (if slider exists)
    let alphaVal = (typeof opacitySlider !== 'undefined') ? opacitySlider.value() : 255;
    shapeColor = color(random(255), random(255), random(255), alphaVal);
  }

  // Slider: controls size
  createP("Size").position(0, 50).style("margin", "4px 0 0 16px");
  sizeSlider = createSlider(20, 220, 100, 1);
  sizeSlider.position(15, 70);
  
  // Slider: controls opacity (alpha)
  createP("Opacity").position(0, 145).style("margin", "8px 0 0 16px");
  opacitySlider = createSlider(0, 255, 200, 1);
  opacitySlider.position(15, 170);
  // small live readout for current opacity value
  
  // Dropdown: choose shape
  createP("Shape").position(0, 90).style("margin", "8px 0 0 16px");
  shapeSelect = createSelect();
  shapeSelect.position(16, 125);
  shapeSelect.option("ellipse");
  shapeSelect.option("rect");
  shapeSelect.option("triangle");

  // Dropdown: choose rotation
  createP("Rotation").position(0, 185).style("margin", "8px 0 0 16px");
  rotationSelect = createSelect();
  rotationSelect.position(15, 215);
  rotationSelect.option("0");
  rotationSelect.option("90");
  rotationSelect.option("180");
  rotationSelect.option("270");
  rotationSelect.option("360");
  rotationSelect.selected("0");
}

function draw() {  
   background ("#FDFAFB");
  console.log (mouseX, mouseY);
  push();
  translate(width * 0.65, height * 0.5);
  let s = sizeSlider.value();  
  // current opacity from slider (or default 255)
  let a = (typeof opacitySlider !== 'undefined') ? opacitySlider.value() : 255;

  // draw with the shape's RGB but current alpha from slider
  let r = red(shapeColor);
  let g = green(shapeColor);
  let b = blue(shapeColor);
  fill(r, g, b, a);

  // apply rotation chosen by the user (around the shape center)
  let rot = (typeof rotationSelect !== 'undefined') ? Number(rotationSelect.value()) : 0;
  rotate(radians(rot));

  // draw chosen shape
  let choice = shapeSelect.value();
  if (choice === "ellipse") {
    ellipse(0, 0, s*3, s*3);
  } else if (choice === "rect") {
    rectMode(CENTER);
    rect(0, 0, s*3, s*3);
  } else if (choice === "triangle") {
    triangle(-s * 0.6, s * 0.5, 0, -s * 0.6, s * 0.6, s * 0.5);
  }
  pop();

  // draw custom cursor on top (only when mouse is inside canvas)
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    push();
    noStroke();
    // a slightly larger translucent ring for visibility
    fill(red(cursorColor), green(cursorColor), blue(cursorColor), 120);
    ellipse(mouseX, mouseY, 22, 22);
    fill(cursorColor);
    ellipse(mouseX, mouseY, 10, 10);
    pop();
  }

}

function mousePressed() {
  // If user clicked on a DOM control (input/select/button), ignore — allow the control to handle it.
  if (cnv) {
    const rect = cnv.elt.getBoundingClientRect();
    const clientX = rect.left + mouseX;
    const clientY = rect.top + mouseY;
    const el = document.elementFromPoint(clientX, clientY);
    if (el) {
      const tag = el.tagName.toLowerCase();
      if (tag === 'input' || tag === 'button' || tag === 'select' || tag === 'label') {
        return; // let the DOM control handle the click
      }
    }
  }

  // change cursor color to a random color on each canvas click
  cursorColor = color(random(255), random(255), random(255));
}