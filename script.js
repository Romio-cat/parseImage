const input = document.getElementById('input');

const btn = document.getElementById('btn');
const getR = document.getElementById('getR');
const getG = document.getElementById('getG');
const getB = document.getElementById('getB');

const canvasContainer = document.getElementById('rgb-image-container');
const canvas = document.getElementById('canv');

const pixelParser = PixelParser(canvas);
const worker = new Worker('pixelParser.js');

btn.addEventListener('click', loadImg);
getR.addEventListener('click', R);
getG.addEventListener('click', G);
getB.addEventListener('click', B);

function loadImg() {
    const reader = new FileReader();
    const image = new Image();

    image.onload = function() {
        drawOnCanvas(image);
    };

    reader.onloadend = function () {
        image.src = reader.result;
    };

    if (input.files[0]) {
        reader.readAsDataURL(input.files[0]);
    } else {
        image.src = "";
    }
}

function drawOnCanvas(img) {
    const ctx = canvas.getContext('2d');

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
}

function PixelParser(canvas) {
    let canv = canvas;
    let context = canv.getContext('2d');
    let pixelsData;
    let rgb;

    return {
        addContext: function() {
            context = canv.getContext('2d');
            return this;
        },
        getSize: function() {
            return [canv.width, canv.height];
        },
        getRGB: function() {
            pixelsData = context.getImageData(0, 0, canv.width, canv.height).data;

            return new Promise(function (res, rej) {
                if (!rgb) {
                    worker.postMessage(pixelsData);
                    worker.onmessage = function(msg) {
                        rgb = msg.data;
                        res(rgb);
                    };
                }
            });
        }
    }
}

function DrawNewImage() {
    const newCanvas = document.createElement('canvas');
    const ctx = newCanvas.getContext('2d');
    const [canvasWidth, canvasHeight] = pixelParser.getSize();

    newCanvas.width = canvasWidth;
    newCanvas.height = canvasHeight;

    canvasContainer.appendChild(newCanvas);

    // return {
    //     drawR: function() {
    //         const canvasData = ctx.getImageData(0, 0, pixelParser.getSize()[0], newCanvas.height);
    //         const r = pixelParser.addContext().getR();
    //
    //         for (let i = 0; i < canvasData.data.length; i++) {
    //             canvasData.data[i] = r[i];
    //         }
    //
    //         ctx.putImageData(canvasData, 0, 0, 0, 0, newCanvas.width, newCanvas.height);
    //     },
    //     drawG: function() {
    //         const ctx = this.addCanvas();
    //         const canvasData = ctx.getImageData(pixelParser.getSize()[0], 0, pixelParser.getSize()[0], newCanvas.height);
    //         const g = pixelParser.addContext().getG();
    //
    //         for (let i = 0; i < canvasData.data.length; i++) {
    //             canvasData.data[i] = g[i];
    //         }
    //
    //         ctx.putImageData(canvasData, pixelParser.getSize()[0], 0, 0, 0, newCanvas.width, newCanvas.height);
    //     },
    //     drawB: function() {
    //         const ctx = this.addCanvas();
    //         const canvasData = ctx.getImageData(pixelParser.getSize()[0]*2, 0, pixelParser.getSize()[0], newCanvas.height);
    //         const b = pixelParser.addContext().getB();
    //
    //         for (let i = 0; i < canvasData.data.length; i++) {
    //             canvasData.data[i] = b[i];
    //         }
    //
    //         ctx.putImageData(canvasData, pixelParser.getSize()[0]*2, 0, 0, 0, pixelParser.getSize()[0], newCanvas.height);
    //     }
    // }
}

// const drawImage = new DrawNewImage();

function R() {
    const canvRGB = document.createElement('canvas');
    const [canvasWidth, canvasHeight] = pixelParser.getSize();

    canvRGB.width = canvasWidth;
    canvRGB.height = canvasHeight;
    const ctx = canvRGB.getContext('2d');
    canvasContainer.appendChild(canvRGB);

    pixelParser.getRGB().then((rgb) => {
        const canvasData = ctx.getImageData(0, 0, pixelParser.getSize()[0], canvRGB.height);
        const r = rgb.red;

        for (let i = 0; i < canvasData.data.length; i++) {
            canvasData.data[i] = r[i];
        }

        ctx.putImageData(canvasData, 0, 0, 0, 0, canvRGB.width, canvRGB.height);
    });
}

function G() {
    drawImage.drawG();
}

function B() {
    drawImage.drawB();
}

