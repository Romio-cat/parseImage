onmessage = function(msg) {
    const rgb = {
        red: [],
        green: [],
        blue: [],
        grey: []
    };
    const pixelsData = msg.data;

    for (let i = 0; i < pixelsData.length; i += 4) {

        rgb.green[i]     = pixelsData[i];
        rgb.green[i + 1] = 0;
        rgb.green[i + 2] = 0;
        rgb.green[i + 3] = pixelsData[i + 3];

        rgb.green[i]     = 0;
        rgb.green[i + 1] = pixelsData[i + 1];
        rgb.green[i + 2] = 0;
        rgb.green[i + 3] = pixelsData[i + 3];

        rgb.blue[i]     = 0;
        rgb.blue[i + 1] = 0;
        rgb.blue[i + 2] = pixelsData[i + 2];
        rgb.blue[i + 3] = pixelsData[i + 3];

        const greyFactor = (pixelsData[i] + pixelsData[i + 1] + pixelsData[i + 2]) / 3;

        rgb.grey[i]     = pixelsData[i] > greyFactor ? pixelsData[i] : greyFactor;
        rgb.grey[i + 1] = greyFactor;
        rgb.grey[i + 2] = greyFactor;
        rgb.grey[i + 3] = pixelsData[i + 3];
    }

    postMessage(rgb);
};