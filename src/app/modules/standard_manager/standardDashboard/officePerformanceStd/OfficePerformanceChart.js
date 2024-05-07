import React from 'react'
import ReactApexChart from 'react-apexcharts'
import {fontsFamily} from '../../../../../assets/fonts/fonts'

const OfficePerformanceChart = ({chartData, thisLastValueDisplayKey}) => {
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
                color: '#6078EC',
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
                color: '#bdbdbd',
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
            toolbar: {
                show: true, // Set to false to hide the toolbar
            },
            dataLabels: {
                enabled: false,
            },
            legend: {
                show: false,
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

            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '50%',
                    endingShape: 'rounded',
                    // colors: {
                    //     opacity: 1, // Set the opacity to 1 for full opacity
                    // },
                },
            },
        },
    }
    return (
        <div className='w-100'>
            <ReactApexChart
                options={chartOptions.options}
                series={chartOptions.series}
                type='bar'
                // height={'auto'}
            />
        </div>
    )
}

export default OfficePerformanceChart
