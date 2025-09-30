// let i;
// let j;

// function setup() {
//   createCanvas(400, 400);
//   // rectMode(CENTER);
// }

// function draw() {
//   background(220);

//   for (let i = 0; i < 5; i++);
//   for (let j = 0; j < 5; j++);
//    myShape(i * 100, j * 100, 150);
//   {
//     // push();
//     // rotate(QUARTER_PI);
//     // myShape(0, 0, 150);
//     // pop();
//   }
// }

// function myShape(x, y, s) {
//   noStroke();
//   fill(255, 30, 154, 50);
//  ellipse(this.x - this.sz/3, this.y - this.sz/3, 100);
//     ellipse(this.x + this.sz/3, this.y - this.sz/3, 100);
//     ellipse(this.x - this.sz/3, this.y + this.sz/3, 100);
//     ellipse(this.x + this.sz/3, this.y + this.sz/3, 100);
// }



let x;
let y;
let s;
let cookie;

function setup() {
createCanvas(400, 400);
}
    

function draw() {
  background("#D36F6F");
   for (let j = 0; j < 100; j++)
    for (let i = 0; i < 100; i++)
      { new Cookie(i * 80, j * 80, 60);
}
}

// Class definition

 function Cookie (x, y, r) {
    noStroke ();
    fill('#6101885C');
    ellipse(x, y, r);
   ellipse (x, y + 20, r);
    ellipse (x + 20, y + 10, r);
   // ellipse (x - 20, y + 10, r);
   
   noStroke ();
   fill ("#EB9B37")
      ellipse (x + 30, y + 30, r/4);
     ellipse (x - 30, y - 30, r/4);
   
   fill ("#0068FF")
   ellipse (x + 30, y + 30, r/8);
     ellipse (x - 30, y - 30, r/8);
  }
