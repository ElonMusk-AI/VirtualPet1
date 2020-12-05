var database;
var foodStock;

var dog, dogImage, dogHappyImage;
function preload()
{
  dogImage = loadImage("images/dogImg.png");
  
  dogHappyImage = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(800,800);
  
  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  dog = createSprite(400,400);
  dog.addImage(dogImage);
  dog.scale = 0.3;
  
}


function draw() {  
  background(20, 0, 100);

  if (keyWentDown(UP_ARROW)){
    writeStock(foodStock);
    dog.addImage(dogHappyImage);
    dog.scale = 0.3;
  }

  textSize(22);
  fill("lightblue");
  text("Food Stock : "+foodStock,300,200);

  drawSprites();

  textSize(25)
  fill("White");
  stroke("lightblue")
  strokeWeight(2);
  text("Press UP-ARROW to feed the dog!",220,50);
}

function readStock(data){
  food = data.val();
  foodStock = food;
  console.log(foodStock);
}

function writeStock(x){
  if (x<=0){
    x = 0;
  }else{
    x = x-1;
  }

  database.ref('/').update({
    food:x
  })
}



