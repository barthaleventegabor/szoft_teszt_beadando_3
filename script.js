
function generateRandomPoint(max) {
    return { x: Math.random() * max, y: Math.random() * max };
}

function drawSquare(points) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach(point => {
        ctx.lineTo(point.x, point.y);
    });
    ctx.closePath();
    ctx.stroke();
}


function sortPoints(pontok) {
    const avgX = pontok.reduce((sum, point) => sum + point.x, 0) / pontok.length;
    const avgY = pontok.reduce((sum, point) => sum + point.y, 0) / pontok.length;


    const movedPoints = pontok.map(p => ({
        x: p.x - avgX,
        y: p.y - avgY
    }));


    movedPoints.sort((a, b) => Math.atan2(a.y, a.x) - Math.atan2(b.y, b.x));


    return movedPoints.map(p => ({
        x: p.x + avgX,
        y: p.y + avgY
    }));
}

function draw() {
 
    const points = [
        generateRandomPoint(300),
        generateRandomPoint(300),
        generateRandomPoint(300),
        generateRandomPoint(300)
    ];
   
    const sortedPoints = sortPoints(points);    

    drawSquare(sortedPoints);
}


draw();
