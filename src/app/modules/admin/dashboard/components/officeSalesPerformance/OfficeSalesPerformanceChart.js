import React from 'react'
import ReactApexChart from 'react-apexcharts'
import {fontsFamily} from '../../../../../../assets/fonts/fonts'

const OfficeSalesPerformanceChart = ({chartData, thisLastValueDisplayKey}) => {
    const chartOptions = {
        series: [
            {
                name: `This ${thisLastValueDisplayKey}`,
                data: [
                    chartData?.totalSold ?? 0,
                    chartData?.m1Complete ?? 0,
                    chartData?.m2Complete ?? 0,
                    chartData?.cancelled ?? 0,
                    chartData?.clawback ?? 0,
                ],
            },
            {
                name: `Last ${thisLastValueDisplayKey}`,
                data: [
                    chartData?.lastTotalSold ?? 0,
                    chartData?.lastM1Complete ?? 0,
                    chartData?.lastM2Complete ?? 0,
                    chartData?.lastCancelled ?? 0,
                    chartData?.lastClawback ?? 0,
                ],
            },
        ],
        options: {
            chart: {
                type: 'bar',
            },
            xaxis: {
                categories: ['Sold', 'M1 complete', 'M2 Complete', 'Cancelled', 'Clawback'],
                labels: {
                    style: {
                        fontWeight: 600,
                        colors: '#212121',
                        fontSize: '11px',
                        fontfamily: fontsFamily.manrope,
                    },
                },
            },
            yaxis: {
                labels: {
                    style: {
                        fontWeight: 600,
                        colors: '#BDBDBD',
                        fontSize: '12px',
                    },
                },
                title: {
                    display: true,
                    text: 'Accounts',
                },
            },

            toolbar: {
                show: true, // Set to false to hide the toolbar
            },
            dataLabels: {
                total: {
                    enabled: true,
                    offsetX: 0,
                    style: {
                        fontSize: '13px',
                        fontWeight: 900,
                    },
                },
            },

            legend: {
                show: false,
            },

            colors: ['#6078EC', '#bdbdbd'],

            fill: {
                opacity: 1,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '35%',
                    colors: {
                        opacity: 0, // Set the opacity to 1 for full opacity
                    },
                },
            },
        },
    }
    return (
        <div className=''>
            <ReactApexChart
                options={chartOptions.options}
                series={chartOptions.series}
                type='bar'
                height={'300'}
            />
        </div>
    )
}

export default OfficeSalesPerformanceChart
