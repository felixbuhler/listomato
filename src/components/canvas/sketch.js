export const playlistCover = (p) => {

    // Canvas Size

    let canvasSize = window.getComputedStyle(document.documentElement).getPropertyValue('--canvas-size');
    canvasSize = canvasSize.substring(0, canvasSize.length - 2);

    // Variables

    let colorWhite, colorBlack, colorTop, colorBottom, font;
    let baseSize = 100;
    let minSize = 10;

    window.p = p;

    // Noise Generator

    let noiseLayer;

    function generateNoise(pg, blockSize = 1.5) {
        pg.noStroke();
        for (let y = 0; y < pg.height; y += blockSize) {
            for (let x = 0; x < pg.width; x += blockSize) {
                let val = p.random(255);
                pg.fill(val, 10); // Grauwert + Alpha
                pg.rect(x, y, blockSize, blockSize);
            }
        }

    }

    // SETUP

    p.setup = async () => {

        font = await p.loadFont('fonts/Geist-Medium.ttf');

        let canvas = p.createCanvas(canvasSize, canvasSize);
        canvas.parent('playlist-cover');

        // Noise

        noiseLayer = p.createGraphics(canvasSize, canvasSize);
        noiseLayer.pixelDensity(1);
        generateNoise(noiseLayer);

        // Text

        title = p.select("#title");

    }

    // DRAW

    p.draw = () => {
        colorWhite = p.color(240, 240, 240);
        colorBlack = p.color(40, 40, 40)

        colorTop = document.getElementById("color-top").value;
        colorBottom = document.getElementById("color-bottom").value;


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

        // Text

        p.push();

        let content = title.value();

        let textSizeValue = baseSize;
        p.textSize(textSizeValue);

        let width = canvasSize - textSizeValue / 2;

        while (p.textWidth(content) > width * 0.85 && textSizeValue > minSize) {
            textSizeValue--;
            p.textSize(textSizeValue);
        }

        p.fill(colorBlack);
        p.textFont(font);
        p.textAlign(p.LEFT, p.TOP);
        p.textLeading(textSizeValue);
        p.text(content, textSizeValue / 2, textSizeValue / 3);

        p.pop();

        // Text Dots

        p.push();

        p.fill(colorBlack);
        p.ellipse(canvasSize - baseSize, canvasSize - baseSize, baseSize * 0.7, baseSize * 0.7)

        p.pop();

        p.push();

        p.stroke(colorBlack);
        p.strokeWeight(10);
        p.noFill();
        p.ellipse(canvasSize - baseSize * 1.8, canvasSize - baseSize, baseSize * 0.7 - 10, baseSize * 0.7 - 10)

        p.pop();

    }

    // Export

    function fileexport() {
        let playlistTitleRaw = document.getElementById("title").value.toUpperCase();
        let playlistTitle = playlistTitleRaw.replace(/[ \t]+(?=\r?\n)/g, "");
        playlistTitle = playlistTitle.replace(/\r?\n/g, "_");
        playlistTitle = playlistTitle.replace(/[ \t]/g, "_");

        p.saveCanvas("LISTOMATO_" + playlistTitle, 'png')
    }

    const download = document.getElementById("download")

    download.addEventListener("click", function (e) {
        fileexport();
    });
}