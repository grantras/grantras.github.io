/*
   This contains the basic code for the title screen of the game Jumper.
   Currently it contains instructions and basic button animations, as well
   as images of the sprites that will appear in the game.
*/

var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400); 
frameRate(60);

// Menu state constants
var STATE_MAINMENU = 0;
var STATE_INSTRUCTIONS = 1;

var menuState = STATE_MAINMENU;

/*
   =====OBJECT DECLARATIONS=====
*/

function titleObj(x, y) {
   this.x = x;
   this.y = y;
   this.alpha = 255;
   this.alphaChange = -1;
};

function instructionsObj(x, y) {
   this.x = x;
   this.y = y;
   this.width = 250;
   this.height = 35;
};

function backObj(x, y) {
   this.x = x;
   this.y = y;
   this.width = 250;
   this.height = 35;
};

// Images for buttons and sprites
var titleImg = loadImage("assets/jumper.png");
var instructionsImg = loadImage("assets/instructions.png");
var backImg = loadImage("assets/back.png");
var keyImg = loadImage("assets/key.png");
var playerImg = loadImage("assets/player.png");
var enemyImg = loadImage("assets/adversary1.png");
var doorImg = loadImage("assets/door.png");

/*
   Draw functions for the buttons
*/

titleObj.prototype.draw = function() {
   noStroke();
   fill(0, 0, 255, this.alpha);
   rect(this.x, this.y, 250, 75)
   image(titleImg, this.x, this.y, 250, 75);
};

instructionsObj.prototype.draw = function() {
   noStroke();
   fill(0, 0, 255);
   rect(this.x, this.y, this.width, this.height);
   image(instructionsImg, this.x, this.y, this.width, this.height);
};

backObj.prototype.draw = function() {
   noStroke();
   fill(0, 0, 255);
   rect(this.x, this.y, this.width, this.height);
   image(backImg, this.x, this.y, this.width, this.height);
};

/*
   Update function for the title image. The background fades in and out
   as time goes by to provide an animation.
*/

titleObj.prototype.update = function() {
   if (this.alpha >= 255) {
      this.alphaChange = -1;
   }
   else if (this.alpha <= 50) {
      this.alphaChange = 1;
   }
   this.alpha += this.alphaChange;
}

/*
   Update function for the instruction button object. If the mouse is within
   bounds of the button, the button will grow in size. If the user clicks while
   in bounds, the state will update to the instruction screen.
*/

instructionsObj.prototype.update = function() {
   if (mouseX < this.x + 250 && mouseX > this.x && mouseY > this.y && mouseY < this.y + 35) {
      this.width = 270;
      this.height = 40;
   }
   else {
      this.width = 250;
      this.height = 35;
   }
};

/*
   Update function for the back button. Similar to the instructions button, however
   the state will change to the main title screen when clicked.
*/

backObj.prototype.update = function() {
   if (mouseX < this.x + 250 && mouseX > this.x && mouseY > this.y && mouseY < this.y + 35) {
      this.width = 270;
      this.height = 40;
   }
   else {
      this.width = 250;
      this.height = 35;
   }
};


var title = new titleObj(75, 25);
var instructions = new instructionsObj(75, 200);
var back = new backObj(75, 350);

/*
   Determines whether or not the user clicks within the bounds of the instruction
   button or the back button.
*/

mouseClicked = function() {
   console.log("mouse pressed");
   if (mouseX < instructions.x + 250 && mouseX > instructions.x && mouseY > instructions.y && mouseY < instructions.y + 35 && menuState == STATE_MAINMENU) {
      menuState = STATE_INSTRUCTIONS;
   }
   if (mouseX < back.x + 250 && mouseX > back.x && mouseY > back.y && mouseY < back.y + 35 && menuState == STATE_INSTRUCTIONS) {
      menuState = STATE_MAINMENU;
   }
};

draw = function() {
   switch(menuState) {
      case STATE_MAINMENU:
         background(0, 255, 0);
         title.update();
         title.draw();
         instructions.update();
         instructions.draw();
         break;
      case STATE_INSTRUCTIONS:
         background(0, 255, 0);
         image(instructionsImg, 75, 25, 250, 35);
         back.update();
         back.draw();
         fill(0, 0, 0);
         image(keyImg, 15, 100, 20, 20);
         image(doorImg, 45, 100, 20, 20);
         image(playerImg, 30, 150, 30, 55);
         image(enemyImg, 17, 215, 55, 30);
         text("The goal of jumper is to reach the top of the level", 90, 100);
         text("and escape through the door. Watch out though, as", 90, 115);
         text("there is a boss guarding the door that holds the key", 90, 130);
         text("and you must obtain the key before you can escape.", 90, 145);
         text("Move your character left and right using the A and D", 90, 175);
         text("keys, and jump using the W key.", 90, 190);
         text("As you climb your way to the top, you will encounter", 90, 220);
         text("adversaries that will try to stop you. You can shoot", 90, 235);
         text("at them by clicking in their direction.", 90, 250);
   }
};

}};
