
this.getXVel = function(vel, dir) {
  return cos(dir) * vel;
}
this.getYVel = function(vel, dir) {
  return -sin(dir) * vel;
}

this.randOrbSize = function(){
  return 10 * sq(sq(randomGaussian())) + 7;
}

this.outOfBounds = function(x, y) {
  var boundSize = 100;
  if(x < -boundSize) {
    return true;
  } 
  if(y < -boundSize) {
    return true;
  }
  if(x > boundSize + canWidth) {
    return true;
  }
  if(y > boundSize + canHeight) {
    return true;
  }
  return false;
}