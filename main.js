setTimeout(() => {
    start();
}, 300);


const start = () => {
    var scanner = new jscanify();
    var paperWidth = 1000/(2**0.5)
    var paperHeight = 1000;
    var resultCanvas = scanner.extractPaper(image, paperWidth, paperHeight);
    document.body.appendChild(resultCanvas);
}