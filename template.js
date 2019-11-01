var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400); 
frameRate(60);


/*
    This is a basic program demonstrating particle systems and
    bezier shapes
*/

// Global variables
var particles = [];
var MAX_PARTICLES = 200;
var particleTicks = 0;

/*
    =====OBJECT DECLARATIONS=====
*/

var fountain = function(x, y) {
    this.x = x;
    this.y = y;
};

var particleObj = function(x, y) {
    this.x = x;
    this.y = y;
    this.r = random(0, 255);
    this.g = random(0, 255);
    this.b = random(0, 255);
    this.velocityX = random(-0.5, 0.5);
    this.velocityY = 1;
};

var catObj = function(x, y) {
    this.x = x;
    this.y = y;
    //Bezier parameters
    this.x1 = x - 50;
    this.y1 = y;
    this.x2 = x - 100;
    this.y2 = y + 30;
    this.cx1 = x - 37;
    this.cy1 = y + 50;
    this.cx2 = x - 125;
    this.cy2 = y - 75;
    this.cy2Dir = 1;
    this.x2Dir = -0.5;
};

/*
    =====DRAW FUNCTIONS FOR OBJECTS=====
*/

fountain.prototype.draw = function() {
    stroke(171, 171, 171);
    fill(235, 235, 235);
    rect(this.x - 50, this.y, 100, 40, 5);
    fill(187, 219, 240);
    ellipse(this.x, this.y, 100, 40);
    fill(235, 235, 235);
    rect(this.x - 15, this.y - 100, 30, 100);
};

particleObj.prototype.draw = function() {
    stroke(0, 136, 255);
    fill(this.r, this.g, this.b);
    ellipse(this.x, this.y, 10, 15);
};

catObj.prototype.draw = function() {
    stroke(0, 0, 0);
    fill(184, 184, 184);
    ellipse(this.x, this.y, 100, 40);
    rect(this.x - 30, this.y + 15, 10, 40);
    rect(this.x + 20, this.y + 15, 10, 40);
    ellipse(this.x + 50, this.y - 15, 35, 35);
    noFill();
    bezier(this.x1, this.y1, this.cx1, this.cy1, this.cx2, this.cy2, this.x2, this.y2);
    fill(0, 0, 0);
    ellipse(this.x + 60, this.y - 20, 5, 5);
};

/*
    Update function for the particle object. Increments its x and
    y position based on its velocity.
*/

particleObj.prototype.update = function() {
    this.x += this.velocityX;
    this.y += this.velocityY;
};

/*
    Update function for the cat object. Updates the control points for
    the bezier line (the cat's tail) to animate it.
*/

catObj.prototype.update = function() {
    if (this.cy2 < (this.y - 75) || this.cy2 > this.y) {
        this.cy2Dir *= -1;    
    }
    if (this.x2 < this.x - 140 || this.x2 > this.x - 90) {
        this.x2Dir *= -1;   
    }
    this.x2 += this.x2Dir;
    this.cy2 += this.cy2Dir;
};

var f1 = new fountain(200, 200);
var c1 = new catObj(300, 300);

/*
    Update function for the particle object. It spawns new particles 
    every 5 ticks if the max number of particles hasn't been reached.
    It also removes the particles when it reaches the bottom of the fountain.
*/

var updateParticles = function() {
    particleTicks++;
    if (particles.length < MAX_PARTICLES && particleTicks >= 5) {
        particles.push(new particleObj(random(190, 210), 110));
        particleTicks = 0;
    }
    for (var i = 0; i < particles.length; i++) {
        if (particles[i].y > 200) {
            particles.splice(i, 1);
            i--;
        }
        else {
            particles[i].update();
            particles[i].draw();
        }
    }
};

draw = function() {
    background(189, 253, 255);
    f1.draw();
    updateParticles();
    c1.draw();
    c1.update();
};



}};
