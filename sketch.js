// Get Canvas Size From CSS

let canvasSize = window.getComputedStyle(document.documentElement).getPropertyValue('--canvas-size');
canvasSize = canvasSize.substring(0, canvasSize.length - 2);

// Noise Generator

let noiseLayer;

function generateNoise(pg) {
  pg.loadPixels();
  for (let i = 0; i < pg.pixels.length; i += 4) {
    let val = random(255);
    pg.pixels[i] = val;
    pg.pixels[i + 1] = val;
    pg.pixels[i + 2] = val;
    pg.pixels[i + 3] = 15;
  }
  pg.updatePixels();
}

// Variables

let c1, c2, c3, c4, title;

let baseSize = 100;
let minSize = 10;

// –––––––––––––––––––––––

// LOAD FONT

let font;

function preload() {
  font = loadFont('/Geist-Medium.ttf');
}

// SETUP

function setup() {

  // Create Canvas

  let canvas = createCanvas(canvasSize, canvasSize);
  canvas.parent('cover');

  noiseLayer = createGraphics(windowWidth, windowHeight);
  noiseLayer.clear();

  title = select("#title");
}

// DRAW

function draw() {

  frameRate(1);

  // Variables

  let centerX = canvasSize / 2;
  let centerY = canvasSize / 2;

  c1 = color(240, 240, 240);
  c2 = document.getElementById("c1").value;
  c3 = document.getElementById("c2").value;
  c4 = color(40, 40, 40)

  let gradientOffset = 0;
  let gradient = this.drawingContext.createLinearGradient(0, gradientOffset, 0, canvasSize);

  // Draw

  noStroke();

  // Rect Left

  push();
  gradientOffset = 300;
  gradient = this.drawingContext.createLinearGradient(0, gradientOffset, 0, canvasSize);

  gradient.addColorStop(0, c1);
  gradient.addColorStop(0.5, c2);
  gradient.addColorStop(1, c3);
  this.drawingContext.fillStyle = gradient;

  rectMode(CENTER);
  rect(canvasSize / 4, canvasSize / 2, canvasSize / 2, canvasSize);

  pop();

  // Rect Right

  push();

  gradientOffset = 50;
  gradient = this.drawingContext.createLinearGradient(0, gradientOffset, 0, canvasSize);

  gradient.addColorStop(0, c1);
  gradient.addColorStop(0.5, c2);
  gradient.addColorStop(1, c3);
  this.drawingContext.fillStyle = gradient;

  rectMode(CENTER);
  rect(canvasSize / 4 * 3, canvasSize / 2, canvasSize / 2, canvasSize)
  pop();

  // Noise

  generateNoise(noiseLayer);
  image(noiseLayer, 0, 0);

  // Text

  push();

  let content = title.value();

  let textSizeValue = baseSize;
  textSize(textSizeValue);

  let width = canvasSize - textSizeValue / 2;

  while (textWidth(content) > width * 0.85 && textSizeValue > minSize) {
    textSizeValue--;
    textSize(textSizeValue);
  }

  textFont(font);
  textAlign(LEFT, TOP);
  fill(c4);
  textLeading(textSizeValue);
  text(content, textSizeValue / 2, textSizeValue / 3);

  pop();


  push();
  fill(c4);
  ellipse(canvasSize - baseSize, canvasSize - baseSize, baseSize * 0.7, baseSize * 0.7)
  pop();

  push();
  stroke(c4);
  strokeWeight(10);
  noFill();
  ellipse(canvasSize - baseSize * 1.8, canvasSize - baseSize, baseSize * 0.7 - 10, baseSize * 0.7 - 10)
  pop();
}


// Export

function fileexport() {
  let playlistTitleRaw = document.getElementById("title").value.toUpperCase();
  let playlistTitle = playlistTitleRaw.replace(/[ \t]+(?=\r?\n)/g, "");
  playlistTitle = playlistTitle.replace(/\r?\n/g, "_");
  playlistTitle = playlistTitle.replace(/[ \t]/g, "_");

  saveCanvas("LISTOMATO_" + playlistTitle, 'png')
}

console.log(document.getElementById("c1").value)