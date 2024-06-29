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
    console.log('a:', performance.now() - stime);
    const paperHeight = 1000;
    console.log('b:', performance.now() - stime);
    const resultCanvas = scanner.extractPaper(image, paperWidth, paperHeight);
    console.log('c:', performance.now() - stime);
    document.body.appendChild(resultCanvas);
    console.log('d:', performance.now() - stime);
    const delta = performance.now() - stime;
    console.log('Time:', delta);
};