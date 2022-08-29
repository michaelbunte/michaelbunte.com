function MouseBall(drawer, x, y, buttons, duck) {
  if(duck) {
    this.fullSize = 20;
  } else {
    this.fullSize = random(2,20);
  }
  this.curSize = this.fullSize;
  this.pos = createVector(x,y);
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.drift = createVector(randomGaussian(0, 0.07), randomGaussian(0, 0.07));
  this.pullPower = abs(randomGaussian(1, 0.5));
  this.color = color(random(100,255), random(100,255), random(100,255));
  //this.colors = [color(70,70,255), color(0,255,0), color(255,70,70),color(0,255,255), color(255,255,0), color(255,0,255)];
  //this.color = this.colors[int(random(0,5))];
  //console.log("color", this.colors[random(0,4)]);
  this.friction = .98;
  this.offset = 2.5;
  angleMode(DEGREES);
  
  this.offsetPower = function(xx, yy) {
    this.distance = dist(this.pos.x, this.pos.y, xx, yy);
    //console.log(this.distance);
    angleMode(RADIANS);
    this.ret = this.offset * (2 * atan(this.distance/50 - 5) + PI - 0.395);
    angleMode(DEGREES);
    return 0;
    // return this.ret;
  }
  this.pull = function(xx, yy) {
    this.targetPos = createVector(xx, yy);
    this.netAcc = 1;
    
    // console.log(this.offsetPower(xx, yy));
    this.dirs = atan((yy - this.pos.y) / (xx - this.pos.x)) + this.offsetPower(xx, yy);
    if(xx < this.pos.x) {
      this.dirs = this.dirs + 180;
    }
    this.acc.x = this.netAcc * cos(this.dirs);
    this.acc.y = this.netAcc * sin(this.dirs);
    // if(dist(xx, yy, this.pos.x, this.pos.y) < 3 && this.vel.mag() < 1) {
    //   this.pos = this.targetPos;
    //   this.vel = createVector(0, 0);
    //   this.acc = createVector(0, 0);
    // }
  }
  
  this.update = function(xx, yy)
  {
    this.oldPos = createVector(this.pos.x, this.pos.y);
    this.pull(xx, yy);
    this.vel.add(this.acc);
    this.vel.add(this.drift);
    this.vel.mult(this.friction);
    this.pos.add(this.vel);
    for(let i = 0; i < buttons.length; i++) {
      if(buttons[i].containsCircle(this.pos.x, this.pos.y, this.fullSize)) {
        if( ! buttons[i].containsCircle(this.oldPos.x, this.pos.y, this.fullSize)) {
          this.vel.x *=-1;
          this.pos.x += this.vel.x;
        } else if( ! buttons[i].containsCircle(this.pos.x, this.oldPos.y, this.fullSize)) {
          this.vel.y *=-1;
          this.pos.y += this.vel.y;
        }
      }
    }
    
    // var rand = int(random(1000));
    // if(rand == 1) {
    //   this.pos = createVector(random(canWidth), random(canHeight));
    //   this.curSize = 0;
    //   this.oldPos = this.pos;
    // }
    // if(this.curSize < this.fullSize) {
    //   this.curSize+=.2;
    // }
    
    if (duck == true) {
      drawer.duck(this.pos.x, this.pos.y, 90);
    } else {
      drawer.line(this.oldPos.x, this.oldPos.y, this.pos.x, this.pos.y, this.curSize, this.color);
    }
      //image(this.img, this.pos.x, this.pos.y, 20, 20);
    
    
    //drawer.circ(this.pos.x, this.pos.y, this.curSize, this.color);
  }
}