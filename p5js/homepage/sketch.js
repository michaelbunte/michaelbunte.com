var bigG;
var orbs;
var canWidth;
var canHeight;
var universalFriction;
var mouseBalls;
var buttons;
var duck;
var links;
var names;
var buttonPosits;
var ballCount;
function setup() {
  links = ['../pages/about.html', '../pages/progressblog.html','../pages/thegarden.html'];
  names = ['about me', 'progress blog', 'the garden'];
  universalFriction = 1;
  ballCount = 10;
  canWidth = windowWidth;
  canHeight = windowHeight;
  angleMode(DEGREES);
  duckImg = loadImage('p5js/homepage/duck.png');
  drawer = new Drawer(duckImg);
  createCanvas(canWidth, canHeight);
  background(0);
  
  buttons = [];
  for(let i = 0; i < names.length; i++) {
    buttons.push(new Button(createVector(canWidth / 2, 300 + 120 * i), createVector(200, 100), links[i], names[i]));
  }

  fixButtonPosits();

  mouseBalls = [];
  mouseBalls.push(new MouseBall(drawer, random(canWidth), random(canHeight), buttons, true));
  for(var j = 0; j < ballCount - 1; j++) {
    mouseBalls.push(new MouseBall(drawer, random(canWidth), random(canHeight), buttons, false));
  }
  bigG = 5;
}

function updateOrbs() {
  for(var i = 0; i < orbs.length; i++) {
    for(var j = 0; j < orbs.length; j++) {
      if(i != j) {
        orbs[i].pull(orbs[j].xPos, orbs[j].yPos, orbs[j].size);
      }
    }
    orbs[i].update();
  }
}

function fixButtonPosits() {
  let buttonCount = names.length;
  buttonPosits = [];
  let verticalButtonCount = floor((canHeight - 100)/120);
  let rowsNeeded = ceil(buttonCount / verticalButtonCount);

  if(buttonCount <= verticalButtonCount) {
    for(let i = 0; i < buttonCount; i++) {
      let vertPos = canHeight / 2 - (buttonCount / 2) * 120 + 120 * i + 50;
      let horzPos = canWidth / 2;
      buttons[i].changePos(createVector(horzPos, vertPos));
    }
  } else {
    let totRows = ceil(buttonCount / verticalButtonCount);

    for(let i = 0; i < buttonCount; i++) {
      let vertPos = canHeight / 2 - (verticalButtonCount / 2) * 120 + 120 * ( i % verticalButtonCount ) + 50;
      let horzPos = canWidth / 2 - totRows / 2 * 220 + 220 * floor(i / verticalButtonCount) + 100;

      let dispRowCount = verticalButtonCount - (verticalButtonCount * ceil( (buttonCount) / verticalButtonCount ) - buttonCount);
      console.log(dispRowCount);

      if(i % verticalButtonCount >= dispRowCount) {
        horzPos+=110;
      }

      buttons[i].changePos(createVector(horzPos, vertPos));
    }
  }
  console.log('fixing');
}

function windowResized() {
  canHeight = windowHeight;
  canWidth = windowWidth;
  resizeCanvas(canWidth, canHeight);
  fixButtonPosits();
}


function draw() {
  background(0, 0, 0);
  
  for(let j = 0; j < mouseBalls.length; j++) {
    mouseBalls[j].update(mouseX, mouseY);
  }
  for(let i = 0; i < buttons.length; i++) {
    buttons[i].update();
  }
  //fixButtonPosits();
}
