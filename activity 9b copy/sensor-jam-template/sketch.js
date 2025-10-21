let port; // Serial Communication port
let connectBtn;
let sensorVal, circleSize, x;

function setup() {
  createCanvas(windowWidth, windowHeight);
  port = createSerial(); // creates the Serial Port

  spacing = width/numLines;

  // Connection helpers
  connectBtn = createButton("Connect to Arduino");
  connectBtn.position(20, 20);
  connectBtn.mousePressed(connectBtnClick);
}

function draw() {
 background(220, 200, 0);
  let s = map(circleSize, 0, 1023, 10, 100);

  if (circleSize < 341) {
    fill(190, 0, 100)
    
  } else if (circleSize < 682) {
       fill(200, 0, 10, 50)
      
  } else {
    fill(200, 0, 10, 50);
  }
  noStroke()
    for (let j = 0; j < 10; j++)
      for (let i = 0; i < 10; i++) {
        ellipse(i * 150, j * 150, s);
      }
 
  

  // Receive data from Arduino
  if (port.opened()) {
    sensorVal = port.readUntil("\n");
    // Only log data that has information, not empty signals
    if (sensorVal[0]) {
      console.log(sensorVal);
      // Update circle's size with sensor's data
      // Reduce delay() value in Ardiuno to get smoother changes
      circleSize = sensorVal * 4;
      
    }
  }
}


// DO NOT REMOVE THIS FUNCTION
function connectBtnClick(e) {
  // If port is not already open, open on click,
  // otherwise close the port
  if (!port.opened()) {
    port.open(9600); // opens port with Baud Rate of 9600
    e.target.innerHTML = "Disconnect Arduino";
    e.target.classList.add("connected");
  } else {
    port.close();
    e.target.innerHTML = "Connect to Arduino";
    e.target.classList.remove("connected");
  }
}
