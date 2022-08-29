function Drawer(duckImg) {
  this.width = 1000;
  this.height = 1000;
  createCanvas(this.width, this.height);
  this.duck = duckImg;
  this.circ = function(x, y, radius, color) {
    fill(color);
    noStroke();
    ellipse(x,y,radius, radius);
    stroke(255, 255, 255);
  }
  
  this.line = function(x1, y1, x2, y2, weight, color) {
    stroke(color);
    strokeWeight(weight);
    line(x1,y1,x2,y2);
  }
  
  this.back = function(color) {
    //background(color);
  }
  
  this.flash = function(color) {
    noStroke();
    fill(255,255,255, 50);
    rect(0,0, this.width, this.height);
  }

  this.duck = function(x, y, dir) {
    imageMode(CENTER);
  
    image(duckImg, x, y, 30, 30);
  }
}