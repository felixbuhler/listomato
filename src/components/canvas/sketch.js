export const playlistCover = (p) => {

    // Canvas Size

    let canvasSize = window.getComputedStyle(document.documentElement).getPropertyValue('--canvas-size');
    canvasSize = canvasSize.substring(0, canvasSize.length - 2);


    console.log(canvasSize)
    // Variables

    let colorWhite, colorBlack, colorTop, colorBottom;

    // Noise Generator

    let noiseLayer;

    function generateNoise(pg) {
        pg.loadPixels();
        for (let i = 0; i < pg.pixels.length; i += 4) {
            let val = p.random(255);
            pg.pixels[i] = val;
            pg.pixels[i + 1] = val;
            pg.pixels[i + 2] = val;
            pg.pixels[i + 3] = 15;
        }
        pg.updatePixels();
    }

    // SETUP

    p.setup = () => {

        let canvas = p.createCanvas(canvasSize, canvasSize);
        canvas.parent('playlist-cover');

        // Noise

        noiseLayer = p.createGraphics(canvasSize, canvasSize);
        generateNoise(noiseLayer);
    }

    // DRAW

    p.draw = () => {
        colorWhite = p.color(240, 240, 240);
        colorBlack = p.color(40, 40, 40)

        colorTop = p.color(240, 120, 20) // document.getElementById("c1").value;
        colorBottom = p.color(240, 0, 20) // document.getElementById("c2").value;

        // Rectangles

        let gradientOffset = 0;
        let gradient = p.drawingContext.createLinearGradient(0, gradientOffset, 0, canvasSize);
        p.noStroke();

        // Rectangle Left

        p.push();

        gradientOffset = 300;
        gradient = p.drawingContext.createLinearGradient(0, gradientOffset, 0, canvasSize);
        gradient.addColorStop(0, colorWhite);
        gradient.addColorStop(0.5, colorTop);
        gradient.addColorStop(1, colorBottom);
        p.drawingContext.fillStyle = gradient;

        p.rectMode(p.CENTER);
        p.rect(canvasSize / 4, canvasSize / 2, canvasSize / 2, canvasSize);

        p.pop();

        // Rectangle Right

        p.push();

        gradientOffset = 50;
        gradient = p.drawingContext.createLinearGradient(0, gradientOffset, 0, canvasSize);
        gradient.addColorStop(0, colorWhite);
        gradient.addColorStop(0.5, colorTop);
        gradient.addColorStop(1, colorBottom);
        p.drawingContext.fillStyle = gradient;

        p.rectMode(p.CENTER);
        p.rect(canvasSize / 4 * 3, canvasSize / 2, canvasSize / 2, canvasSize);

        p.pop();

        // Noise

        p.image(noiseLayer, 0, 0);



    }

}