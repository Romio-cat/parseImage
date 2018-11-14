const input = document.getElementById('input');

const btn = document.getElementById('btn');
const getR = document.getElementById('getR');
const getG = document.getElementById('getG');
const getB = document.getElementById('getB');

const canvasContainer = document.getElementById('canvas-container');
const canvas = document.getElementById('canv');

const pixelParser = PixelParser(canvas);

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

btn.addEventListener('click', loadImg);
getR.addEventListener('click', R);
getG.addEventListener('click', G);
getB.addEventListener('click', B);

function PixelParser(canvas) {
    let canv = canvas;
    let context;
    let pixelsData;

    return {
        add: function() {
            context = canv.getContext('2d');
            return this;
        },
        getSize: function() {
            return [canv.width, canv.height];
        },
        getPixelsArray: function() {
            let rgba = [];

            pixelsData = context.getImageData(0, 0, canv.width, canv.height).data;

            // for (let i = 0; i < pixelsData.length; i += 4) {
            //     rgba.push([
            //         pixelsData[i],
            //         pixelsData[i + 1],
            //         pixelsData[i + 2],
            //         pixelsData[i + 3]
            //     ])
            // }

            return pixelsData;
            // return rgba;
        },
        getR: function() {
            let r = context.getImageData(0, 0, canv.width, canv.height).data;
            pixelsData = this.getPixelsArray();

            for (let i = 0; i < pixelsData.length; i += 4) {
                r[i] = pixelsData[i];
                r[i + 1] = 0;
                r[i + 2] = 0;
                r[i + 3] = pixelsData[i + 3];
            }

            return r;
        },
        getG: function() {
            let g = context.getImageData(0, 0, canv.width, canv.height).data;
            pixelsData = this.getPixelsArray();

            for (let i = 0; i < pixelsData.length; i += 4) {
                g[i] = 0;
                g[i + 1] = pixelsData[i + 1];
                g[i + 2] = 0;
                g[i + 3] = pixelsData[i + 3];
            }

            return g;
        },
        getB: function() {
            let b = context.getImageData(0, 0, canv.width, canv.height).data;
            pixelsData = this.getPixelsArray();

            for (let i = 0; i < pixelsData.length; i += 4) {
                b[i] = 0;
                b[i + 1] = 0;
                b[i + 2] = pixelsData[i + 2];
                b[i + 3] = pixelsData[i + 3];
            }

            return b;
        }

    }
}

function DrawNewImage() {
    const canvRGB = document.createElement('canvas');

    canvasContainer.appendChild(canvRGB);

    return {
        addCanvas: function() {
            // canvRGB = document.createElement('canvas');
            const ctx = canvRGB.getContext('2d');

            canvRGB.width = pixelParser.getSize()[0];
            canvRGB.height = pixelParser.getSize()[1];

            return ctx;
        },
        drawR: function() {
            // const canvRGB = this.addCanvas();
            const ctx = this.addCanvas();
            const canvasData = ctx.getImageData(0, 0, canvRGB.width, canvRGB.height);
            const r = pixelParser.add().getR();

            for (let i = 0; i < canvasData.data.length; i++) {
                canvasData.data[i] = r[i];
            }

            ctx.putImageData(canvasData, 0, 0, 0, 0, canvRGB.width, canvRGB.height);
        },
        drawG: function() {
            // const canvRGB = this.addCanvas();
            const ctx = this.addCanvas();
            const canvasData = ctx.getImageData(0, 0, canvRGB.width, canvRGB.height);
            const g = pixelParser.add().getG();

            for (let i = 0; i < canvasData.data.length; i++) {
                canvasData.data[i] = g[i];
            }

            ctx.putImageData(canvasData, canvRGB.width, 0, canvRGB.width, 0, canvRGB.width*2, canvRGB.height);
        },
        drawB: function() {
            const ctx = this.addCanvas().getContext('2d');
            const canvasData = ctx.getImageData(0, 0, canvB.width, canvB.width);
            const b = pixelParser.add().getB();

            for (let i = 0; i < canvasData.data.length; i++) {
                canvasData.data[i] = b[i];
            }

            ctx.putImageData(canvasData, 0, 0);
        }
    }
}

const drawImage = new DrawNewImage();

function R() {
    drawImage.drawR();
}

function G() {
    drawImage.drawG();
}

function B() {
    drawImage.drawB();
}