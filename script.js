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
DrawNewImage();
function DrawNewImage() {
    const canvRGB = document.createElement('canvas');
    const ctx = canvRGB.getContext('2d');
    // canvRGB.width = pixelParser.getSize()[0]*3;
    // canvRGB.height = pixelParser.getSize()[1];
    canvasContainer.appendChild(canvRGB);



    // return {
    //     drawR: function() {
    //         const canvasData = ctx.getImageData(0, 0, pixelParser.getSize()[0], canvRGB.height);
    //         const r = pixelParser.addContext().getR();
    //
    //         for (let i = 0; i < canvasData.data.length; i++) {
    //             canvasData.data[i] = r[i];
    //         }
    //
    //         ctx.putImageData(canvasData, 0, 0, 0, 0, canvRGB.width, canvRGB.height);
    //     },
    //     drawG: function() {
    //         const ctx = this.addCanvas();
    //         const canvasData = ctx.getImageData(pixelParser.getSize()[0], 0, pixelParser.getSize()[0], canvRGB.height);
    //         const g = pixelParser.addContext().getG();
    //
    //         for (let i = 0; i < canvasData.data.length; i++) {
    //             canvasData.data[i] = g[i];
    //         }
    //
    //         ctx.putImageData(canvasData, pixelParser.getSize()[0], 0, 0, 0, canvRGB.width, canvRGB.height);
    //     },
    //     drawB: function() {
    //         const ctx = this.addCanvas();
    //         const canvasData = ctx.getImageData(pixelParser.getSize()[0]*2, 0, pixelParser.getSize()[0], canvRGB.height);
    //         const b = pixelParser.addContext().getB();
    //
    //         for (let i = 0; i < canvasData.data.length; i++) {
    //             canvasData.data[i] = b[i];
    //         }
    //
    //         ctx.putImageData(canvasData, pixelParser.getSize()[0]*2, 0, 0, 0, pixelParser.getSize()[0], canvRGB.height);
    //     }
    // }
}

// const drawImage = new DrawNewImage();

function R() {
    pixelParser.getRGB().then((rgb) => {
        console.log(rgb);
    });
}

function G() {
    drawImage.drawG();
}

function B() {
    drawImage.drawB();
}

