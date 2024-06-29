setTimeout(() => {
    start();
}, 300);

const scanner = new jscanify();

const start = () => {
    scan();
};

const scan = () => {
    const stime = performance.now();
    const paperWidth = 1000/(2**0.5)
    const paperHeight = 1000;

    // render webcam image to canvas
    const webcam = document.getElementById('webcam');
    const webcamCanvas = document.createElement('canvas');
    webcamCanvas.width = webcam.videoWidth;
    webcamCanvas.height = webcam.videoHeight;
    const webcamCtx = webcamCanvas.getContext('2d');
    webcamCtx.drawImage(webcam, 0, 0, webcamCanvas.width, webcamCanvas.height);
    const resultCanvas = scanner.extractPaper(webcamCanvas, paperWidth, paperHeight);
    // const resultCanvas = scanner.extractPaper(image, paperWidth, paperHeight);
    if (scanContainer.children && scanContainer.children.length > 0) {
        scanContainer.children[0].remove();
    }
    scanContainer.appendChild(resultCanvas);
    const delta = performance.now() - stime;
    console.log('Time:', delta);
};

// Get the video element
const video = document.getElementById('webcam');

// Check if the browser supports getUserMedia
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Request access to the webcam
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            // Assign the stream to the video element's srcObject
            video.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Error accessing the webcam: ", error);
        });
} else {
    console.error("getUserMedia not supported by this browser.");
}
