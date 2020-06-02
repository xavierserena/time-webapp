// Canvas setup //
let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let cont = canvas.getContext('2d');

// Conversion //
function degreesToRad(degree) {
    return degree*Math.PI/180;
}

function radToDegrees(radians) {
    return radians*180/Math.PI;
}

// Time //
let running = true;
let startTime = new Date();
function reset() {
    startTime = new Date();
}

function start() {
    if (!running) {
        running = true;
        // load stop and lap buttons
    }
}

function stopTime() {
    if (running) {
        running = false;
        // load start button
    }
}

function elapsedTime() {
    let thisTime = new Date();
    let ms = thisTime - startTime;
    let hrs = Math.floor(ms/3.6000E+6);
    ms %= 3.6000E+6;
    let min = ms/60_000;
    ms %= 60_000;
    let sec = ms/1_000;
    ms %= 1_000;
    return {hrs, min, sec, ms}
}

function drawTime() {
    if (!running) {
        return;
    }
    // Background
    cont.fillStyle = 'black';
    cont.fillRect(0, 0, canvas.width, canvas.height);

    // Get time
    let {hrs, min, sec, ms} = elapsedTime();
    // Start angle for all timers
    const startAngle = degreesToRad(270);

    // Static timer design
    const lineWidth = 10;
    const spacingConst = 1.75;
    const secColor = '#03a9fc';
    const minColor = '#ff6496';
    const hrsColor = '#ffb964';
    cont.lineWidth = lineWidth;
    cont.lineCap = 'round';

    // Seconds
    cont.strokeStyle = secColor;
    const radius_sec = 250;
    let endAngle_sec = degreesToRad(sec*360/60);
    cont.beginPath();
    cont.arc(canvas.width/2, canvas.height/2, radius_sec, startAngle, endAngle_sec + startAngle);
    cont.stroke();
    
    // Minutes
    cont.strokeStyle = minColor;
    const radius_min = radius_sec - spacingConst*lineWidth;
    let endAngle_min = degreesToRad(min*360/60);
    cont.beginPath();
    cont.arc(canvas.width/2, canvas.height/2, radius_min, startAngle, endAngle_min + startAngle);
    cont.stroke();
    
    // Hours
    cont.strokeStyle = hrsColor;
    const radius_hrs = radius_min - spacingConst*lineWidth;
    let endAngle_hrs = degreesToRad(hrs*360/12);
    cont.beginPath();
    cont.arc(canvas.width/2, canvas.height/2, radius_hrs, startAngle, endAngle_hrs + startAngle);
    cont.stroke();

    const fontSize = 50;
    const textSpace = fontSize*0.6;
    cont.font = `${fontSize}px Arial`;
    const textStartX = canvas.width/2 - fontSize*2;

    cont.fillStyle = hrsColor;
    const hrsFormat = Math.floor(hrs).toString().padStart(2, '0');
    cont.fillText(`${hrsFormat}`, textStartX, canvas.height/2);
    
    cont.fillStyle = minColor;
    const minFormat = Math.floor(min).toString().padStart(2, '0');
    cont.fillText(`${minFormat}`, textStartX + 2*textSpace, canvas.height/2);
    
    cont.fillStyle = secColor;
    const secFormat = Math.floor(sec).toString().padStart(2, '0');
    cont.fillText(`${secFormat}`, textStartX + 4*textSpace, canvas.height/2);

    cont.font = `${fontSize/2}px Arial`
    const msFormat = Math.floor(ms/10).toString().padStart(2, '0');
    cont.fillText(`${msFormat}`, textStartX + 6*textSpace, canvas.height/2);
}

const fps = 30;
setInterval(drawTime, 1000/fps);  // 25 fps
