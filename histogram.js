
const ctx = document.getElementById('histogram').getContext('2d');
const data_age = [19, 28, 20, 16, 21, 34, 23, 43, 22, 42, 12, 22, 27, 28, 29, 27];
const lable = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: lable,
        datasets: [{
            label: 'Number of Arrivals',
            data: data_age,
            backgroundColor: 'blue',
        }]
    },
    options: {
        scales: {
            xAxes: [{
                display: false,
                barPercentage: 1.4,
                ticks: {
                    max: 3,
                }
            }, {
                display: true,
                ticks: {
                    autoSkip: false,
                    max: 10,
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

