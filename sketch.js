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

let baseSize = 80;
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

  c1 = color(220, 220, 220);
  c2 = color(63, 191, 191);
  c3 = color(63, 191, 80);
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

  gradientOffset = 0;
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

  while (textWidth(content) > width * 0.975 && textSizeValue > minSize) {
    textSizeValue--;
    textSize(textSizeValue);
  }

  textFont(font);
  textAlign(LEFT, TOP);
  fill(c4);
  text(content, textSizeValue / 2, textSizeValue / 2.5);

  pop();
}


// Export