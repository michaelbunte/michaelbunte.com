function Orb(drawer, xx, yy, size, vel, dir, color) {
  this.drawer = drawer;
  this.xPos = xx;
  this.yPos = yy;
  this.size = size;
  this.xVel = getXVel(vel, dir);
  this.yVel = getYVel(vel, dir);
  this.dir = dir;
  this.color = color;
  this.netAcc = 0;
  this.xAcc = 0;
  this.yAcc = 0;
  this.opacity = 255;
  this.opacCounter = 0;
  
  this.pull = function(xxx, yyy, mass) {
    if(dist(xxx, yyy, this.xPos, this.yPos) < 20 && mass < this.size) {
      return;
    }
    if(dist(xxx, yyy, this.xPos, this.yPos) < 40 && mass >= this.size) {
      return;
    }
    
    this.force = bigG *( ( this.size * mass)  / ( (sq(this.xPos - xxx) + sq(this.yPos - yyy))));
    this.netAcc = (bigG * mass) / ( sq(xxx - this.xPos) + sq(yyy - this.yPos));
    // if(this.netAcc > 1) {
    //   this.netAcc = 1;
    // }
    this.drawer.circ(this.xPos, this.yPos, sqrt(this.size) + 1, this.color);
    
    
    this.dirs = atan((yyy - this.yPos) / (xxx - this.xPos));
    
    this.xVel *= universalFriction;
    this.yVel *= universalFriction;
    if(xxx >= this.xPos) {
      this.xAcc = this.netAcc * cos(this.dirs);
      this.yAcc = this.netAcc * sin(this.dirs);
    } else {
      this.xAcc = - this.netAcc * cos(this.dirs);
      this.yAcc = - this.netAcc * sin(this.dirs);
    }
    this.xVel+=this.xAcc;
    this.yVel+=this.yAcc;
    
    strokeWeight(4);
    // line(this.xPos, this.yPos, this.xPos + this.xAcc * 10000, this.yPos + this.yAcc * 10000);
  }
  
  this.update = function() {
    if(outOfBounds(this.xPos, this.yPos) == true) {
      this.yPos = random(0, canHeight);
      this.xPos = random(0, canWidth);
      this.xVel = 0;
      this.yVel = 0;
      this.xAcc = 0;
      this.yAcc = 0;
      this.opacity = 0;
      this.color.setAlpha(this.opacity);
    }
    
    if(this.opacity < 255) {
      this.opacCounter++;
      if(this.opacCounter%5==0) {
        this.opacity+=1;
      }
      this.color.setAlpha(this.opacity);
    }
    
    //this.pull(mouseX, mouseY, 1000);
    
    this.xPos+=this.xVel;
    this.yPos+=this.yVel;
    this.drawer.circ(this.xPos, this.yPos, sqrt(this.size) + 1, this.color);
  }
}