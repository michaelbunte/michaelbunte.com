function Button(pos, dims, name) {
    this.textSize = 20;
    this.origPos = createVector(pos.x, pos.y);
    this.pos = pos.sub(dims.x/2, dims.y/2);
    this.dims = dims;
    this.disp = 0;
    this.dispCount = 0;
    this.totDisp = 10;
    //this.divTag = createDiv(name).size(dims.x, dims.y);
  
    // this.divTag.style('font-family', 'Gill Sans, sans-serif');
    // this.divTag.style('text-decoration:none');
    // this.divTag.position(pos.x, pos.y);
    // this.divTag.style('color:black');
    // this.divTag.style('font-size:2rem');
    // this.divTag.style('display:flex');
    // this.divTag.style('justify-content:center');
    // this.divTag.style('align-items:center');
    
    textStyle(NORMAL);
    textFont('Gill Sans, sans-serif');
    textSize(this.textSize);
    textAlign(CENTER, CENTER);
    fill(0);
    text(name, this.origPos.x, this.origPos.y);
  
    this.wasPressed = false;
  
  
    this.contains = function (x, y) {
        return this.pos.x <= x && x <= this.pos.x + this.dims.x && this.pos.y <= y && y <= this.pos.y + this.dims.y;
    }
  
    this.containsCircle = function (x, y, rad) {
        rad = rad/2;
        return this.pos.x - rad <= x && x <= this.pos.x + this.dims.x + rad && 
        this.pos.y - rad <= y && y <= this.pos.y + this.dims.y + rad;
    }
  
    this.updateTextPos = function() {  
      this.pos = pos.sub(dims.x/2, dims.y/2);
      //this.divTag.position(pos.x, pos.y);
    }
  
    this.changePos = function(pos) {
      this.pos = pos;
      this.pos = pos.sub(dims.x/2, dims.y/2);
        //this.divTag.position(this.pos.x, this.pos.y);
    }
  
    this.update = function() {
      let changeDisp = false;
      if(this.contains(mouseX, mouseY)) {
        if(this.dispCount < 10) {
            this.dispCount++;
            changeDisp = true;
        }
        if(mouseIsPressed === true) {
          this.wasPressed = true;
        }
      } else if (this.dispCount > 0) {
          this.dispCount--;
          changeDisp = true;
      }
      if(changeDisp == true) {
        this.disp = this.totDisp * 2 * ( 1 / (1 + pow(2.71828183, -this.dispCount)) - 1/2);
        //this.divTag.position(this.pos.x - this.disp, this.pos.y - this.disp);
      }
  
      noStroke();
  
      fill('#aeffa8');
      if(this.dispCount != 0) {
          beginShape();
          vertex(this.pos.x, this.pos.y + this.dims.y);
          vertex(this.pos.x + this.dims.x, this.pos.y + this.dims.y);
          vertex(this.pos.x + this.dims.x, this.pos.y);
          vertex(this.pos.x + this.dims.x - this.disp, this.pos.y - this.disp);
          vertex(this.pos.x - this.disp, this.pos.y - this.disp + this.dims.y);
          endShape(CLOSE);
      }
  
      fill('#81b57d');
      if(this.dispCount != 0) {
          beginShape();
          vertex(this.pos.x, this.pos.y + this.dims.y);
          vertex(this.pos.x + this.dims.x, this.pos.y + this.dims.y);
  
          vertex(this.pos.x + this.dims.x - this.disp, this.pos.y - this.disp + this.dims.y);
          vertex(this.pos.x - this.disp, this.pos.y - this.disp + this.dims.y);
          endShape(CLOSE);
      }
  
      fill('#ffbb80');
      rect(this.pos.x - this.disp, this.pos.y - this.disp, this.dims.x, this.dims.y);
      textStyle(NORMAL);
      textFont('Gill Sans, sans-serif');
      textSize(this.textSize);
      fill(0);
      textAlign(CENTER, CENTER);
      text(name, this.origPos.x - this.disp, this.origPos.y - this.disp);
    }
  }