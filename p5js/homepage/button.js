function Button(pos, dims, link, name) {
    this.pos = pos.sub(dims.x/2, dims.y/2);
    this.dims = dims;
    this.disp = 0;
    this.dispCount = 0;
    this.totDisp = 10;
    this.aTag = createA(link, name).size(dims.x, dims.y);
    
    this.aTag.style('font-family', 'Gill Sans, sans-serif');
    this.aTag.style('text-decoration:none');
    this.aTag.position(pos.x, pos.y);
    this.aTag.style('color:black');
    this.aTag.style('display:flex');
    this.aTag.style('justify-content:center');
    this.aTag.style('align-items:center');



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
        this.aTag.position(pos.x, pos.y);
    }

    this.changePos = function(pos) {
        this.pos = pos;
        this.pos = pos.sub(dims.x/2, dims.y/2);
        this.aTag.position(this.pos.x, this.pos.y);
    }

    this.update = function() {
        let changeDisp = false;
        if(this.contains(mouseX, mouseY)) {
            if(this.dispCount < 10) {
                this.dispCount++;
                changeDisp = true;
            }
        } else if (this.dispCount > 0) {
            this.dispCount--;
            changeDisp = true;
        }
        if(changeDisp == true) {
            this.disp = this.totDisp * 2 * ( 1 / (1 + pow(2.71828183, -this.dispCount)) - 1/2);
            this.aTag.position(this.pos.x - this.disp, this.pos.y - this.disp);
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
    }
}