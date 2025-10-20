let bg;
let bearImg;
let questionImg;
let showBear = false;
let showLetter = false;
let hugGif;
let arrowImg;
let showArrow = true;

let yesButton = {
  x: 0,
  y: 0,
  r: 60
};
let noButton = {
  x: 0,
  y: 0,
  r: 60
};

function preload() {
  bg = loadImage("background.jpg");
  bearImg = loadImage("bear w heart.png");
  questionImg = loadImage("question.png");
  hugGif = createImg("hug.gif");
  hugGif.hide();  
  arrowImg = loadImage("arrow.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noStroke();
  setupButtonPositions ();
}

function setupButtonPositions() {
  yesButton.x = width / 2 - 120;
  yesButton.y = height / 2 + 160;
  noButton.x = width / 2 + 120;
  noButton.y = height / 2 + 160;
}

function draw() {
  imageMode(CORNER);
  image(bg, 0, 0, width, height);

  const x = width / 2;
  const y = height / 2;
  const w = 300;
  const h = 200;


  let wiggleX = 0;
  let bobY = 0;


  if (!showBear) {
    if (mouseX > x - w / 2 && mouseX < x + w / 2 && mouseY > y - h / 2 && mouseY < y + h / 2) {
      wiggleX = sin(frameCount * 0.3) * 5;
      bobY = sin(frameCount * 0.25) * 3;
    }

    drawEnvelope(x + wiggleX, y + bobY, w, h);

    if (showArrow) {
      imageMode(CENTER);
      image(arrowImg, width / 2 - 40, height / 2 + 220, 150, 150);
    }
  }

  if (showBear) {
    imageMode(CENTER);
    image(bearImg, width / 2, height / 2, 300, 300);
    drawSpeechBubble(width / 2 + 200, height / 2 - 150, "I've been holding this for you! \n Click on the heart to reveal....");
  }
  if (showLetter) {
    imageMode(CENTER);
    image(questionImg, width / 2, height / 2, 900, 500);

    //buttons
    noStroke();
    fill('#F8AFA6');
    circle(yesButton.x, yesButton.y, yesButton.r * 2);
    fill('#D3D3D3');
    circle(noButton.x, noButton.y, noButton.r * 2);
    fill(0);
    textSize(22);
    text("Yes", yesButton.x, yesButton.y);
    text("No", noButton.x, noButton.y);
  }

}

// envelope
function drawEnvelope(x, y, w, h) {
  // body
  fill(255, 220, 180);
  rect(x, y, w * 1.2, h * 1.2);
  // top flap
  fill(255, 210, 160);
  triangle(
    x - (w * 1.2) / 2, y - (h * 1.2) / 2, x + (w * 1.2) / 2, y - (h * 1.2) / 2, x, y);
  // heart 
  drawHeart(x, y + 10, 40);
}


//heart
function drawHeart(x, y, size) {
  noStroke();
  fill(255, 100, 130);
  const r = size / 2;
  // two top lobes
  circle(x - r / 2 - 10, y - r / 2 - 10, 35);
  circle(x + r / 2 + 1, y - r / 2 - 10, 35);
  //filler circle
  circle(x - r + 17, y - r + 5, 20)
  // bottom tip
  triangle(
    x - r - 11.5, y - r / 3, x + r + 2.5, y - r / 3, x - 6, y + r + 3
  );
}


// speech bubble
function drawSpeechBubble(x, y, msg) {
  fill("#FFD1D9");
  noStroke();
  rect(x, y, 240, 100, 20);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(15);
  text(msg, x, y);
}

function showHugGif() {
  hugGif.position(0, 0);
  hugGif.size(windowWidth, windowHeight);
  hugGif.show();
}

function mousePressed() {

  const x = width / 2;
  const y = height / 2;
  const w = 300;
  const h = 200;

  if (!showBear) {
    if (mouseX > x - w / 2 && mouseX < x + w / 2 && mouseY > y - h / 2 && mouseY < y + h / 2) {
      showBear = true;
    }
  } else if (showBear && !showLetter) {

    const heartX = width / 2;
    const heartY = height / 2 + 10;
    const heartRadius = 70;

    const d = dist(mouseX, mouseY, heartX, heartY);
    if (d < heartRadius) {
      showLetter = true;
      return;
    }
  }
else if (showLetter) {
  if (dist(mouseX, mouseY, yesButton.x, yesButton.y) < yesButton.r) {
    showHugGif();
    return;
  }
  let d = dist(mouseX, mouseY, noButton.x, noButton.y);
  if (d < noButton.r + 40) { 
      noButton.x = random(100, width - 100);
      noButton.y = random(height / 2, height - 100);
    }
 }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setupButtonPositions();
  if (hugGif && hugGif.visible) {
    showHugGif();
  }
}