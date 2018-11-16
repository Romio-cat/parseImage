onmessage = function(msg) {
    const rgb = {
        r: [],
        g: [],
        b: []
    };
    const pixelsData = msg.data;

    for (let i = 0; i < pixelsData.length; i += 4) {
        rgb.r[i]     = pixelsData[i];
        rgb.r[i + 1] = 0;
        rgb.r[i + 2] = 0;
        rgb.r[i + 3] = pixelsData[i + 3];

        rgb.g[i]     = 0;
        rgb.g[i + 1] = pixelsData[i + 1];
        rgb.g[i + 2] = 0;
        rgb.g[i + 3] = pixelsData[i + 3];

        rgb.b[i]     = 0;
        rgb.b[i + 1] = 0;
        rgb.b[i + 2] = pixelsData[i + 2];
        rgb.b[i + 3] = pixelsData[i + 3];
    }

    postMessage(rgb);
};