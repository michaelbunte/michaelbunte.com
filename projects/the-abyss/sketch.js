var clearing;
var funcs;
var pointSeed;
var dontPrint;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  angleMode(DEGREES);
  clearing = 0;
  //funcs = [6, 1, 9, 6];
  setFuncs(); 
  dontPrint = false;
}

function getAngle(x1, y1, x2, y2) {
  let a = atan2(y1 - y2, x1 - x2);
  // a+=180;
  // if(a>180) {
  //   a-=360;
  // }
  return a;
}

function wiggle(vect) {
    vect.x *= sin(vect.y*4);
    vect.y += cos(vect.x *5) * 10;
}

function swoop(randPos) {
  randPos.mult((getAngle(randPos.x, randPos.y, width/2,height/2)%5)/3);
}

function tube(randPos) {
    randPos.x *= ((getAngle(randPos.x, randPos.y, width/2,height/2)%5)/3);
    randPos.y *= cos(randPos.y) * 1.5;
}

function sundial(randPos, center) {
  randPos.x *= ((getAngle(randPos.x, randPos.y, center.x,center.y)%5)/3);
}

function swiggles(randPos) {
    randPos.y *= getAngle(randPos.x, randPos.y, width/2, height/2)%sin(randPos.y);
    randPos.y = tan(randPos.x * 5)*20;
    randPos.x = sin(randPos.y * 10) * 10 + randPos.x;
  if(dist(randPos.x, randPos.y, 0, 0) > 100) {
    let dir = int(random(2))
    if(dir == 0)
      dir = -1;
    let tempX = randPos.x;
    randPos.x = abs(randPos.y) * dir * 1.1;
    randPos.y = 1.2 * tempX;
  } else {
    randPos.mult(0.9);
  }
}

function funPos(randPos) {
  randPos.mult(2);
  if(dist(randPos.x, randPos.y, 0, 0) > 100) {
    randPos.x *= ((getAngle(randPos.x, randPos.y, width/2,height/2)%5)/3);
    randPos.mult(getAngle(width/2, height/2, randPos.y, randPos.x)/50);
  } else {
    if(dist(randPos.x * 1.2, randPos.y * 1.2, 0, 0) > 100) {
      randPos.x = -randPos.x % 100;
      randPos.y = -randPos.y % 100;
      
      randPos.x *= ((getAngle(randPos.x, randPos.y, width/2,height/2)%5)/3);
      randPos.mult(getAngle(width/2, height/2, randPos.y, randPos.x)/50);
      return;
    }
    if(int(random(10)) != 3) {
      randPos.x = 10000;
      return;
    }
    let curr = randPos.x + randPos.y;
    randPos.x = 0;
    randPos.y = 0;
    randPos.x = sin(curr) * 300 - 70;
    randPos.y = cos(curr) * 300 + 10;
  }
}

function tiles(randPos) {
  randPos.mult(2);
  randPos.x *= ((getAngle(randPos.x, randPos.y, width/2,height/2)%5)/3);
  randPos.x = abs(randPos.x);
  randPos.y = abs(randPos.y);
  if(int(randPos.x / 25) % 2 == 0) {
    randPos.x = -randPos.x + randPos.y / 4;
  } else {
    randPos.x = randPos.x - randPos.y / 4;
  }
  if(int(randPos.y / 25) % 2 == 0) {
    randPos.y = -randPos.y - randPos.x / 4;
  } else {
    randPos.y = randPos.y - randPos.x / 4;
  }
  
  
  return randPos;
}

function star(randPos) {
  randPos.mult(getAngle(randPos.x, randPos.y, 0, 0)%40 * 0.5);
  if(int(random(2)) == 1)
    randPos.y = -randPos.y;
  return randPos;
}

function circles(randPos) {
  let distToCenter = dist(randPos.x, randPos.y, 0, 0);
  let oldDistToCenter = distToCenter;
  distToCenter/=5;
  distToCenter = int(distToCenter);
  randPos.x *= 10 * distToCenter / oldDistToCenter;
  randPos.y *= 10 * distToCenter / oldDistToCenter;
}

function lines(randPos) {
  randPos.y = int(randPos.y/10) * 10;
  randPos.mult(2);
}
function hatch(randPos) {
  var i = int(random(2));
  if(i == 0) {
    randPos.y = int(randPos.y/10) * 10;
    randPos.mult(2);
  } else {
    randPos.x = int(randPos.x/10) * 10;
    randPos.mult(2);
  }
}

function swiggles2(randPos) {
  randPos.y = sin(10 * randPos.x) * 10 + int(randPos.y/20) * 20;
  randPos.x = cos(randPos.y * 10) * 10 + randPos.x;
  randPos.mult(2);
}

function curtain(randPos) {
  angleMode(RADIANS);
  let disp = (atan(((randPos.x + randPos.y)/2)/8-5)+PI/2) * 100;
  randPos.x-=disp;
  randPos.y-=disp;
  disp = (atan(randPos.x/8+5)+PI/2) * 100;
  randPos.add(-disp);
  disp = (sin(randPos.x/8+5)+PI/2) * 100;
  randPos.add(disp);
  randPos.y+=50;
  randPos.mult(2);
  angleMode(DEGREES);
}

function pushOut(randPos) {
  let dis = dist(randPos.x, randPos.y, 0, 0);
  let multiplier = 1 / ((dis/2 + 10)/100) + .5;
  if(multiplier < 1) {
    //multiplier = 1;
  }
  randPos.mult(multiplier);
}

function setFuncs() {
  funcs = [];
  let numFuncs = int(abs(randomGaussian(5,3)) + 1);
  for(let i = 0; i < numFuncs/2; i++) {
    funcs.push(int(random(8)));
  }
  for(let i = 0; i < numFuncs; i++) {
    funcs.push(int(random(8,14)));
  }
  if(random(-10,4) < 0) {
    funcs.push(13);
  }
  pointSeed = createVector(random(-1000,1000), random(-1000,1000));
  console.log(funcs);
}

function runFuncNum( num, randPos ) {
  if(num == 0) {
    tiles(randPos);
  } else if (num == 1) {
    circles(randPos);
  } else if (num == 2) {
    swiggles(randPos);
  } else if (num == 3) {
    swiggles2(randPos);
  } else if (num == 4) {
    wiggle(randPos);
  } else if (num == 5) {
    tube(randPos);
  } else if (num == 5) {
    star(randPos);
  } else if (num == 6) {
    circl(randPos);
  } else if (num == 7) {
    circl2(randPos);
  } else if (num == 8) {
    funPos(randPos);
  } else if (num == 9) {
    sundial(randPos, createVector(pointSeed.x,pointSeed.y));
  } else if (num == 10) {
    burst(randPos);
  } else if (num == 11) {
    burst(randPos);
    pushOut(randPos);
  } else if (num == 12) {
    //pushOut(randPos);
  } else if (num == 13) {
    flip(randPos);
  }
}

function runFuncs(randPos) {
  for(let i = 0; i < funcs.length; i++) {
    runFuncNum(funcs[i], randPos);
  }
}

function burst(randPos) {
  let dis = dist(randPos.x, randPos.y, 0, 0);
  dis = tan(dis);
  randPos.mult(dis * 2);
  // let dirX = 1;
  // let dirY = 1;
  // if(randPos.x < 0) {
  //   dirX = -1;
  // }
  // if(randPos.y < 0) {
  //   dirY = -1;
  // }
  // randPos.x = abs(randPos.x);
  // randPos.y = abs(randPos.y);
  // randPos.y = Math.cbrt(randPos.y);
  // randPos.x = Math.cbrt(randPos.x);
  // randPos.mult(10);
  // randPos.x *= dirX;
  // randPos.y *= dirY;
}

function circl(randPos) {
  let dis = dist(randPos.x, randPos.y, 0, 0);
  dis = sin(dis);
  randPos.mult(dis * 2);
}

function circl2(randPos) {
  let dis = dist(randPos.x, randPos.y, 0, 0);
  let multiplier = 1 / ((dis/2 + 10)/100);
  randPos.mult(multiplier);
}

function flip(randPos) {
  let xPos = randPos.x;
  randPos.x = randPos.y;
  randPos.y = xPos;
}

function draw() {
  stroke(255,255,255,100);
  strokeWeight(1);
  clearing--;
  if(keyIsDown(32)) {
    clearing = 1;
  }

  if(keyIsDown(80) && dontPrint == false) {
    saveCanvas( "myAbyss", "png");
    dontPrint = true;
  } else if( ! keyIsDown(80)) {
    dontPrint = false;
  }
  
  if(clearing < 0) {
    for(let i = 0; i < 300; i++) {
      let myPoint = createVector( width / 2, height / 2 );
      let sd = 50;
      let randPos = createVector(randomGaussian(0, sd), randomGaussian(0, sd));
      runFuncs(randPos);
      point(randPos.x + myPoint.x, randPos.y + myPoint.y);
    }
  } else {
    background(0);
  }
  //console.log(getAngle(mouseX, mouseY, 400, 400));
}