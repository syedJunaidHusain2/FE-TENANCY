import React from 'react'
import {Bar} from 'react-chartjs-2'
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend} from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)
export default function Chart() {
    const chartData = {
        labels: [
            'Jan',
            'Febuary',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ],
        datasets: [
            // {
            //   label: 'KW sold',
            //   data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            //   backgroundColor: ['#FFE16A'],
            //   barThickness: 20,
            //   borderRadius: 5,
            //   type: 'line',
            //   order: 3,
            //   // yAxisID: 'start',
            // },
            {
                label: 'Profitability',
                data: [-10, -15, -20, 40, 10, 20, 22, 10, -8, 30, 20, -20],
                backgroundColor: [
                    '#FF3333',
                    '#FF3333',
                    '#FF3333',
                    '#00C247',
                    '#00C247',
                    '#00C247',
                    '#00C247',
                    '#00C247',
                    '#FF3333',
                    '#00C247',
                    '#00C247',
                    '#FF3333',
                ],
                barThickness: 10,
                borderRadius: 5,
                type: 'bar',
                order: 3,
                // yAxisID: 'start',
            },
            {
                label: 'Revenue',
                data: [0, 0, 3, 4, 8, 3, 8, 8, 9, 8, 5, 3],
                borderColor: ['#6078EC'],
                type: 'line',
                tension: 0.4,
                order: 2,
            },
            {
                label: 'Cost',
                data: [0, 4, 30, 30, 20, 30, 10, 7, 9, 12, 20, 30],
                borderColor: ['#FFB03A'],
                type: 'line',
                tension: 0.4,
                order: 1,
            },
        ],
    }
    return (
        <div className='bg-white p-5 w-1175px rounded shadow mt-9'>
            <Bar
                data={chartData}
                height={375}
                options={{
                    type: 'scatter',
                    data: {chartData},
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        aspectRatio: 2,
                        scales: {
                            start: {
                                beginAtZero: true,
                                ticks: {
                                    display: false,
                                },
                            },
                        },
                    },
                }}
            />
        </div>
    )
}
