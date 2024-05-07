/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef} from 'react'
import ApexCharts from 'apexcharts'
import {getCSS} from '../../../../../../_metronic/assets/ts/_utils'
import {useThemeMode} from '../../../../../../_metronic/partials'
import {formattedNumberFields} from '../../../../../../helpers/CommonHelpers'

const CommissionBreakdownChart = ({className, graphData}) => {
    const chartRef = useRef(null)
    const {mode} = useThemeMode()
    const refreshChart = () => {
        if (!chartRef.current) {
            return
        }

        const height = parseInt(getCSS(chartRef.current, 'height'))

        const chart = new ApexCharts(chartRef.current, getChartOptions(height, graphData))
        if (chart) {
            chart.render()
        }

        return chart
    }
    useEffect(() => {}, [])

    useEffect(() => {
        const chart = refreshChart()

        return () => {
            if (chart) {
                chart.destroy()
            }
        }
    }, [chartRef, graphData])

    return (
        <div
            className={`bg-cmwhite shadow-sm  ${className}`}
            style={{
                borderRadius: '10px',
                fontFamily: 'Manrope',
                fontWeight: '600',
                fontSize: '12px',
            }}
        >
            {/* begin::Header */}

            <div className='text-cmGrey900 pt-5 ps-5' style={{fontWeight: 700, fontSize: '16px'}}>
                {' '}
                Commission breakdown
            </div>
            <div className='d-flex flex-wrap gap-10 justify-content-center align-items-center text-cmGrey500'>
                {/* 1 */}
                <div className='d-flex align-items-center gap-2'>
                    <div className='bi bi-dash-lg fs-1 text-cmSuccess' />
                    <div>Total Earnings</div>
                </div>
                {/* 2 */}
                <div className='d-flex align-items-center gap-2'>
                    <div className='bi bi-square-fill fs-5' style={{color: '#D3FEE4'}} />
                    <div>Total Due</div>
                </div>
                {/* 3 */}
                <div className='d-flex align-items-center gap-2'>
                    <div className='bi bi-dash-lg fs-1 text-cminfo' />
                    <div>M1</div>
                </div>
                {/* 4 */}
                <div className='d-flex align-items-center gap-2'>
                    <div className='bi bi-square-fill fs-5' style={{color: '#D2E1FF'}} />
                    <div>M1 Paid</div>
                </div>
                {/* 5 */}
                <div className='d-flex align-items-center gap-2'>
                    <div className='bi bi-dash-lg fs-1' style={{color: '#7239EA'}} />
                    <div>M2</div>
                </div>
                {/* 6 */}
                <div className='d-flex align-items-center gap-2'>
                    <div className='bi bi-square-fill fs-5' style={{color: '#E5D8FF'}} />
                    <div>M2 Paid</div>
                </div>
            </div>

            {/* end::Toolbar */}

            {/* end::Header */}

            {/* begin::Body */}
            <div className='card-body'>
                {/* begin::Chart */}
                <div ref={chartRef} id='kt_charts_widget_6_chart' style={{height: '350px'}}></div>
                {/* end::Chart */}
            </div>
            {/* end::Body */}
        </div>
    )
}

export {CommissionBreakdownChart}

function getChartOptions(height, graphData) {
    var months = []
    var M1 = []
    var M2 = []
    var totalE = []
    let keys = graphData && Object.keys(graphData)
    months = keys
    graphData &&
        Object.keys(graphData).map((keyName, i) => {
            M1.push(graphData[keyName].m1?.toFixed(2))
            M2.push(graphData[keyName].m2?.toFixed(2))
            totalE.push(graphData[keyName].total_earnings?.toFixed(2))
        })
    const maxValue = Math.round(Math.max(...totalE, ...M2, ...M1) + 20)

    return {
        series: [
            {
                name: 'Total Earnings',
                type: 'area',
                // data: [100, 50, 65, 70, 50, 30, 40, 50, 50 ,30, 20,10],
                data: totalE,
            },
            {
                name: 'M2',
                type: 'area',
                data: M2,
            },
            {
                name: 'M1',
                type: 'area',
                data: M1,
            },
        ],
        chart: {
            fontFamily: 'Manrope',
            // stacked: true,
            height: 350,
            type: 'area',
            toolbar: {
                show: true,
            },
            zoom: {
                enabled: true,
                type: 'xy',
                autoScaleYaxis: true,
            },
        },
        // plotOptions: {
        //   bar: {
        //     horizontal: false,
        //     borderRadius: 5,
        //     columnWidth: '12%',
        //   },
        // },
        legend: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'straight',
            show: true,
            width: 2,
            colors: ['#00C247', '#7239EA', '#004CE8'],
        },
        xaxis: {
            // categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            categories: months,
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                style: {
                    fontFamily: 'Manrope',
                    colors: '#9E9E9E',
                    fontSize: '10px',
                    fontWeight: '500',
                },
            },
        },
        yaxis: {
            max: maxValue,
            labels: {
                style: {
                    fontFamily: 'Manrope',
                    colors: '#9E9E9E',
                    fontSize: '10px',
                    fontWeight: '500',
                },
                formatter: function (val) {
                    return '$' + val?.toFixed(2) + 'K'
                },
            },
        },
        fill: {
            // type: 'light',
            opacity: 1,
        },

        states: {
            normal: {
                filter: {
                    type: 'none',
                    value: 0,
                },
            },
            hover: {
                filter: {
                    type: 'none',
                    value: 0,
                },
            },
            active: {
                allowMultipleDataPointsSelection: false,
                filter: {
                    type: 'none',
                    value: 0,
                },
            },
        },
        tooltip: {
            style: {
                fontSize: '12px',
            },
            y: {
                formatter: function (val) {
                    return '$' + val
                },
            },
        },
        colors: ['#00C247', '#7239EA', '#004CE8'],
        grid: {
            borderColor: '#E0E0E0',
            strokeDashArray: 4,
            yaxis: {
                lines: {
                    show: true,
                },
            },
            xaxis: {
                lines: {
                    show: false,
                },
            },
            padding: {
                top: 10,
                right: 20,
                bottom: 0,
                left: 20,
            },
        },
    }
}
