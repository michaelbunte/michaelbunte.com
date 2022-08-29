function Drawer() {
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
    
    this.rectangle = function(x, y, width, height, color) {
      fill(color);
      rect(x,y, width, height);
    }
    
    this.pipe = function(x, y, width, gap) {
      noStroke();
      fill(color(0,255,0));
      let x1 = x - width/2;
      let x2 = x1;
      let y1 = y - gap/2;
      let y2 = y + gap/2;
      let w1 = width;
      let w2 = width;
      let h1 = -500;
      let h2 = 500;
      rect(x1, y1, w1, h1);
      rect(x2, y2, w2, h2);
      return [x1,y1,w1,h1,x2,y2,w2,h2];
    }
    
    this.clear = function() {
      background(0);
    }
  }