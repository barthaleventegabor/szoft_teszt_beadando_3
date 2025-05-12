function generateRandomPoint(max) {
    return { x: Math.random() * max, y: Math.random() * max };
}

function drawSquare(points) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.lineTo(points[0].x, points[0].y); 
    ctx.strokeStyle = "black";
    ctx.stroke();

    
    points.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
    });
}

function sortPoints(points) {
    const avgX = points.reduce((sum, point) => sum + point.x, 0) / points.length;
    const avgY = points.reduce((sum, point) => sum + point.y, 0) / points.length;

    const movedPoints = points.map(p => ({
        x: p.x - avgX,
        y: p.y - avgY
    }));

    movedPoints.sort((a, b) => Math.atan2(a.y, a.x) - Math.atan2(b.y, b.x));

    const sorted = movedPoints.map(p => ({
        x: p.x + avgX,
        y: p.y + avgY
    }));

    showTable(points, sorted, { x: avgX, y: avgY });

    return sorted;
}

function showTable(original, sorted, avg) {
    const koordinatak = document.getElementById('koordinatak');
    let html = "<h3>Pontok adatai</h3>";
    html += "<p><strong>Új origó (átlag):</strong> x = " + avg.x.toFixed(2) + ", y = " + avg.y.toFixed(2) + "</p>";
    html += "<table><tr><th>#</th><th>Eredeti (x, y)</th><th>Rendezett (x, y)</th></tr>";

    for (let i = 0; i < original.length; i++) {
        html += `<tr>
            <td>P${i + 1}</td>
            <td>${original[i].x.toFixed(2)}, ${original[i].y.toFixed(2)}</td>
            <td>${sorted[i].x.toFixed(2)}, ${sorted[i].y.toFixed(2)}</td>
        </tr>`;
    }

    html += "</table>";
    koordinatak.innerHTML = html;
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
