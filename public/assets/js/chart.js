var dataRadar = {
    labels: ["Dao động cơ", "Sóng cơ", "Mạch LC", "Điện xoay chiều", "Sóng ánh sáng", "Lớp 11"],
    datasets: [
        {
            label: "Kỹ năng",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [5, 6, 7, 8, 9, 10],
            spanGaps: false,
        }
    ]
};

var dataBar = {
    labels: ["Dao động cơ", "Sóng cơ", "Mạch LC", "Điện xoay chiều", "Sóng ánh sáng", "Lớp 11"],
    datasets: [
        {
            label: "Kỹ năng",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [5, 6, 7, 8, 9, 10],
            spanGaps: false,
        }
    ]
};

var myRadarChart = new Chart(document.getElementById('radarchart'), {
    type: 'radar',
    data: dataRadar,
    options: {
        legend: {
            display: false,
        },
        scale: {
            ticks: {
                min: 0,
                max: 10
            }
        }
    }
});

var myBarChart = new Chart(document.getElementById('barchart'), {
    type: 'horizontalBar',
    data: dataBar,
    options: {
        legend: {
            display: false,
        },
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});