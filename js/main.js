class Grafico {
    constructor(elementId) {
        this.elementId = elementId;
        this.points = [['X', 'Y']];
        google.charts.load('current', {'packages':['corechart']});
    }

    addPoint(x, y) {
        this.points.push([x, y]);
    }

    draw() {
        google.charts.setOnLoadCallback(() => this.drawChart());
    }

    drawChart() {
        var data = google.visualization.arrayToDataTable(this.points);

        var options = {
            hAxis: {title: 'X', viewWindow: {min: -10, max: 10}},
            vAxis: {title: 'Y', viewWindow: {min: -10, max: 10}},
            curveType: 'function',
            legend: 'none',
            pointSize: 2
        };

        var chart = new google.visualization.LineChart(document.getElementById(this.elementId));
        chart.draw(data, options);
    }
}

class GraficoRetta extends Grafico {
    drawFromFormula(a, b, c) {
        this.points = [['X', 'Y']];
        for (let x = -10; x <= 10; x += 0.1) {
            let y = (-a * x - c) / b;
            this.addPoint(x, y);
        }
        this.draw();
    }
}

class GraficoParabola extends Grafico {
    drawFromFormula(a, b, c) {
        this.points = [['X', 'Y']];
        for (let x = -10; x <= 10; x += 1) {
            let y = a * x * x + b * x + c;
            this.addPoint(x, y);
        }
        this.draw();
    }
}

class GraficoCirconferenza extends Grafico {
    drawFromFormula(a, b, r) {
        this.points = [['X', 'Y']];
        for (let i = 0; i <= 2 * Math.PI; i += 0.1) {
            let x = a + r * Math.cos(i);
            let y = b + r * Math.sin(i);
            this.addPoint(x, y);
        }
        this.draw();
    }
}

let selectedGraph = undefined;

function selectGraph(val) {
    selectedGraph = val.value;
}

function createGrafico() {
    if (!selectedGraph) {
        alert("Please select a graph type.");
        return;
    }

    let chart;
    let a = parseFloat(document.getElementById("a").value);
    let b = parseFloat(document.getElementById("b").value);
    let c = parseFloat(document.getElementById("c").value);

    switch (selectedGraph) {
        case "retta":
            chart = new GraficoRetta('curve_chart');
            break;
        case "parabola":
            chart = new GraficoParabola('curve_chart');
            break;
        case "circonferenza":
            chart = new GraficoCirconferenza('curve_chart');
            break;
        default:
            alert("Invalid graph type selected.");
            return;
    }

    chart.drawFromFormula(a, b, c);
}