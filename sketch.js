var balloon, background;
var database, height;
function preload() {
  backgroundImg = loadImage("1.png")
  balloonImage = loadAnimation("2.png", "3.png", "4.png");
}

function setup(){
   database = firebase.database();
   console.log(database);
   createCanvas(500,500);

  balloon = createSprite (100,400, 20, 20)
  balloon.addAnimation("balloon", balloonImage);
  balloon.scale = 0.4;

  balloonHeight = database.ref('balloon/position');
  balloonHeight.on("value", readHeight, showError);


}

function draw(){

    background(backgroundImg);

    textSize(15);
    stroke("navy");
    fill("grey");
    text("Use arrow keys to move the Hot Air Balloon", 60, 40);
  
        if(keyDown(LEFT_ARROW)){
            updateHeight(-10, 0);
        }
        else if(keyDown(RIGHT_ARROW)){
            updateHeight(10, 0);
        }
        else if(keyDown(UP_ARROW)){
            updateHeight(0, -10);
            balloon.scale = balloon.scale - 0.01;
        }
        else if(keyDown(DOWN_ARROW)){
            updateHeight(0, 10);
            balloon.scale = balloon.scale + 0.01;
        }
        drawSprites();
    }

    function updateHeight(x,y){

      balloonHeight.set({
        'x': height.x + x,
        'y': height.y + y
      })

    }

    function readHeight(data){
      height = data.val();
      console.log(height);
      balloon.x = height.x;
      balloon.y = height.y;
    }

    function showError(){
      console.log("Error in writing to the database");
    }
