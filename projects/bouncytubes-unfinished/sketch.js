


var bird;
var drawer;
var pipes;
var canvasDims;
var gameCount;
var button;
var gameMode;
var score;
var pipeSpeed;
var TRAILLENGTH;
var realCanvasDims;
var HighScoreMenu;
var scrollSpeed;
var myCanvas;



function setup() {


  TRAILLENGTH = 50; 
  pipeSpeed = 3;
  pipes = [];
  scoreList = [];
  gameCount = 0;
  realCanvasDims = createVector(800, 400);
  canvasDims = createVector(realCanvasDims.x/2,realCanvasDims.y);
  myCanvas = createCanvas(realCanvasDims.x, realCanvasDims.y);
  drawer = new Drawer();
  bird = new Bird(drawer, createVector(150, 200));
  button = new Button(createVector(canvasDims.x/2, canvasDims.y/2), createVector(100,100), 'Play');
  score = new Score();
  highScoreMenu = new HighScoreMenu();
  gameMode = 'play menu';
  background(0);

  let peopleCount = 130;
  for(let i = 0; i < peopleCount; i++) {
    let name = "Person" + int(random(10000));
    let score = int(5 * random(peopleCount - i, peopleCount - i + 1));
    highScoreMenu.scoreList.push(new scoreObj(name, score));
  }
}

function Score() {
  this.visible = false;
  this.score = 0;
  this.textSize = 50;
  this.textPos = createVector(canvasDims.x/2, 70);
  
  this.draw = function() {
    if(this.visible == false) {
      return;
    }
    textFont('Gill Sans, sans-serif');
    textSize(this.textSize);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    
    //let sWidth = textWidth(str(this.score));
    //strokeWeight(50);
    //stroke(0);
    //line(this.textPos.x-sWidth/2+30, this.textPos.y,this.textPos.x+sWidth/2-30, this.textPos.y);
    stroke(0);
    strokeWeight(15);
    fill(150);
    text(this.score, this.textPos.x + 3, this.textPos.y + 3);
    strokeWeight(0);
    fill(255);
    text(this.score, this.textPos.x, this.textPos.y);
  }
  
  this.inc = function() {
    this.score++;
  }
  
  this.reset = function() {
    this.score = 0;
  }
}

function Pipe(drawer, pos) {
  this.oscSpeed = random(1,3);
  this.pos = pos;
  this.vel = createVector(-pipeSpeed, 0);
  this.drawer = drawer;
  this.angleCount = random(1000);
  this.height = 0;
  this.pipeDims = [0,0,0,0,0,0,0,0];
  this.scored = false;
  
  
  this.update = function() {
    this.angleCount+=this.oscSpeed;
    angleMode(DEGREES);
    this.height = 200 + 30 * sin(this.angleCount);
    this.pos.add(this.vel);

    
    this.pipeDims = this.drawer.pipe(this.pos.x, this.pos.y, 50, this.height);
    
  }
  
  this.containsSquare = function (x, y, width) {
    width = width/2;
    
    // [x1,y1,w1,h1,x2,y2,w2,h2];
    
    let bottomIntersect =  this.pipeDims[0] - width <= x && x <= this.pipeDims[0] + this.pipeDims[2] + width && this.pipeDims[1] - width + this.height <= y && y <= this.pipeDims[1] - this.pipeDims[3] + width;
    
    //let bottomIntersect =  this.pipeDims[4] - width <= x && x <= this.pipeDims[4] + this.pipeDims[6] + width && this.pipeDims[5] - width <= y && y <= this.pipeDims[5] - this.pipeDims[7] + width;
    
    let topIntersect =  this.pipeDims[0] - width <= x && x <= this.pipeDims[0] + this.pipeDims[2] + width && this.pipeDims[1] + width >= y && y <= this.pipeDims[1] - this.pipeDims[3] + width;

    return bottomIntersect || topIntersect;
  }
  
  this.offScreen = function() {
    return this.pos.x < -100;
  }
}

function Bird(drawer, pos) {
  this.size = 20;
  this.startPos = createVector(pos.x, pos.y);
  this.pos = pos;
  this.vel = createVector(0,-10);
  this.drawer = drawer;
  this.keyMode = 'frozen';
  this.dead = false;
  this.extraDead = false;
  this.firstDead = false;
  this.particles = [];
  this.particleCount = 50;
  this.trailDots = [];
  this.color = color(255, 0, 0);
  
  this.reset = function() {
    this.pos = createVector(this.startPos.x, this.startPos.y);
    this.vel = createVector(0,-10);
    this.extraDead = false;
    this.dead = false;
    this.firstDead = false;
    this.keyMode = 'frozen';
  }
  
  this.update = function() {
    if(this.dead == false) {
      if(this.pos.y + this.size >= canvasDims.y || this.pos.y - this.size <= 0 ) {
        this.die();
      }
      
      this.vel.y+=0.5;

      let isInput = keyIsDown(32) || mouseIsPressed;

      if(isInput && this.keyMode == 'unfrozen') {
        this.vel.y = -10;
        this.keyMode = 'frozen';
      } else if ( ! isInput) {
        this.keyMode = 'unfrozen';
      }
      this.pos.add(this.vel);
      this.drawer.circ(this.pos.x, this.pos.y, this.size, this.color);
      return;
    }
    
    for(var i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
    }
    if(this.particles.length > 0 && this.particles[0].alpha <=0) {
      this.particles.shift();
    } else if (this.particles.length < this.particleCount) {
      this.particles = [];
      this.extraDead = true;
    }

    // this.trailDots.push(new BirdSpawn(drawer, this.pos.x, this.pos.y, this.size));
    // for(var i = 0; i < this.trailDots.length; i) {
    //     this.trailDots[i].update();
    // }

  }
  
  this.die = function() {
    if(this.firstDead == true) {
      return;
    }
    this.dead = true;
    this.firstDead = true;
    for(var i = 0; i < this.particleCount; i++) {
      this.particles.push(new Particle(drawer, createVector(this.pos.x, this.pos.y)));
    }
  }
}

function BirdSpawn(drawer, pos, size) {
    this.size = size;
    this.origSize = size;
    this.pos = createVector(pos.x, pos.y);
    this.alpha = 255;

    
    this.update = function() {
        this.pos.x-=pipeSpeed;
        this.size -= this.origSize / TRAILLENGTH;
        this.alpha -= 255 / TRAILLENGTH;
        drawer.circ(this.pos.x, this.pos.y, this.size, color(255,0,0,this.alpha));
    }
}

function Particle(drawer, pos) {
  this.evapSpeed = random(5,15);
  this.size = random(1,10);
  this.pos = pos;
  this.vel = createVector(random(-5, 5),random(-5, 5));
  this.alpha = 160;
  
  this.update = function() {
    this.pos.add(this.vel);
    this.pos.x -= pipeSpeed;
    drawer.circ(this.pos.x, this.pos.y, this.size, color(255,50,50, this.alpha));
    
    if(this.alpha <= this.evapSpeed) {
      this.alpha = 0;
    } else {
      this.alpha-=this.evapSpeed;
    }
  }
}

function runGame() {
  drawer.clear();
  
  if(gameCount%64 == 0) {
    pipes.push(new Pipe(drawer, createVector(canvasDims.x + 100, canvasDims.y/2 + random(-canvasDims.y,canvasDims.y)/4)));
  }
  
  
  for(var i = 0; i < pipes.length; i++) {
    pipes[i].update();
    if(pipes[i].containsSquare(bird.pos.x, bird.pos.y, bird.size)) {
      bird.die();
    }
    if(pipes[i].scored == false && pipes[i].pos.x + 25 < bird.pos.x && bird.dead == false) {
      score.inc();
      pipes[i].scored = true;
    }
  }
  
  bird.update();  
  
  if(pipes.length > 0 && pipes[0].offScreen()) {
    pipes.shift();
  }
  
  gameCount++;
}

function scoreObj(name, score) {
  this.name = name;
  this.score = score;
}

function mouseWheel(event) {
  scrollSpeed = event.delta;
}

function dButton(text, pos, dir) {
  this.text = text;
  this.pos = pos.copy();
  this.height = 20;
  this.width = 40;
  this.clicked = "false";
  
  this.update = function() {
    let inRange = '';
    if(dir == 'right') {
      inRange = dist(mouseX, mouseY, this.pos.x - this.width/2, this.pos.y + this.height/2) < 30;
    } else {
      inRange = dist(mouseX, mouseY, this.pos.x + this.width/2, this.pos.y + this.height/2) < 30;
    }

    if(inRange) {
      fill(150);
      if(mouseIsPressed && this.clicked == "false") {
        this.clicked = "just clicked";
      }
    } else {
      fill(255);
    }
    //rect(this.pos.x, this.pos.y, this.dims.x, this.dims.y);
    if(dir == 'left') {
      triangle(this.pos.x, this.pos.y + this.height/2, this.pos.x + this.width, this.pos.y,this.pos.x + this.width, this.pos.y+this.height);
    } else {
      triangle(this.pos.x, this.pos.y + this.height/2, this.pos.x - this.width, this.pos.y,this.pos.x - this.width, this.pos.y+this.height);
    }

    if( ! mouseIsPressed ) {
      this.clicked = "false";
    }
  }
}

function HighScoreMenu() {
  this.scoreList = [];
  this.scrollDisp = 20;
  this.textHeight = 11.5;
  this.page = 0;
  this.scoresOnPage = 30;
  
  
  this.leftAlignment = canvasDims.x + 20;
  this.rightAlignment = realCanvasDims.x - 20;
  this.leftButton = new dButton("<-", createVector(this.leftAlignment, realCanvasDims.y - 30), "left");
  this.rightButton = new dButton("->", createVector(this.rightAlignment, realCanvasDims.y - 30), "right");



  this.update = function() {
    // draws background on right side of screen
    fill(color(10,100,100));
    strokeWeight(0);
    rect(realCanvasDims.x - canvasDims.x, 0, realCanvasDims.x - canvasDims.x, realCanvasDims.y);
    textFont('Gill Sans, sans-serif');
    textStyle(BOLD);
    fill(255);
    textSize(12);
    
    for(let i = 0; i < this.scoresOnPage; i++) {
      let textY =  20 + this.textHeight * i;
      let scoreIndex = i + this.page * this.scoresOnPage;
      if(scoreIndex >= this.scoreList.length) {
        break;
      }
      textAlign(LEFT, CENTER);
      text(str(i + this.page * this.scoresOnPage + 1), this.leftAlignment, textY);
      text(this.scoreList[scoreIndex].name , this.leftAlignment + 30, textY);
      
      textAlign(RIGHT, CENTER);
      text(this.scoreList[scoreIndex].score, this.rightAlignment, textY);
    }
    if(this.page > 0) {
      this.leftButton.update();
      if(this.leftButton.clicked == "just clicked") {
        this.page--;
        this.leftButton.clicked = "pressed";
      }
    }

    if(this.page < this.scoreList.length / this.scoresOnPage - 1) { 
      this.rightButton.update();

      if(this.rightButton.clicked == "just clicked") {
        this.page++;
        this.rightButton.clicked = "pressed";
      }
    }

    textSize(20);
    textAlign(CENTER, CENTER);
    fill(255);
    text("LEADERBOARD", (realCanvasDims.x + canvasDims.x)/2, realCanvasDims.y - 20);
  }
   

}

function draw() {
  if (bird.extraDead == true) {
    gameMode = 'play menu';
    button.wasPressed = false;
    bird.reset();
  } else if(button.wasPressed == true && gameMode == 'play menu') {
    gameMode = 'playing';
    pipes = [];
    score.reset();
    score.visible = true;
  } else if (gameMode == 'playing') {
    runGame();
  } else if (gameMode == 'play menu') {
    drawer.clear();
    button.update();
  }
  score.draw();
  highScoreMenu.update();
}



/* 

<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBxh8zHXt7BjQrfGvIvX5DrTJZBMQ-HAIE",
    authDomain: "bouncy-tube-game.firebaseapp.com",
    databaseURL: "https://bouncy-tube-game-default-rtdb.firebaseio.com",
    projectId: "bouncy-tube-game",
    storageBucket: "bouncy-tube-game.appspot.com",
    messagingSenderId: "57074948552",
    appId: "1:57074948552:web:c89e51202386cec67f08fd",
    measurementId: "G-BN6GPTKNK9"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>g);
const analytics = getAnalytics(app);

*/