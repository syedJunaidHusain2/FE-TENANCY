/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from 'react'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { getCSS, getCSSVariableValue } from '../../../../../_metronic/assets/ts/_utils'
import { useThemeMode } from '../../../../../_metronic/partials'
import { formattedNumberFields } from '../../../../../helpers/CommonHelpers'

type Props = {
    className: string,
    graphData: any
}

const PayStubChart: React.FC<Props> = ({ className, graphData }) => {
    const chartRef = useRef<HTMLDivElement | null>(null)
    const { mode } = useThemeMode()
    const refreshMode = () => {
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

    useEffect(() => {
        const chart = refreshMode()

        return () => {
            if (chart) {
                chart.destroy()
            }
        }
    }, [chartRef, graphData])

    return (
        <div className={`card ${className} shadow-sm`}>
            {/* begin::Header */}

            {/* end::Header */}
            {/* begin::Body */}
            <div className='card-body'>
                <div className='d-flex flex-wrap justify-content-center gap-3 '>
                    <div className='bi bi-circle-fill text-cmYellow' />
                    <div
                        className='text-cmGrey500'
                        style={{ fontWeight: '600', fontFamily: 'Manrope' }}
                    >
                        Earnings
                    </div>
                </div>
                {/* begin::Chart */}
                <div ref={chartRef} id='kt_charts_widget_3_chart' style={{ height: '350px' }}></div>
                {/* end::Chart */}
            </div>
            {/* end::Body */}
        </div>
    )
}

export { PayStubChart }

function getChartOptions(height: number, graphData: any): ApexOptions {
    var monthArr: any[] = []
    var monthAmountArr: any[] = []
    graphData?.length > 0 &&
        graphData?.map((item: any) => {
            monthArr.push(item?.month)
            monthAmountArr.push((item?.amount)?.toFixed(2) ?? 0)

        })
    return {
        series: [
            {
                name: 'Earnings',
                // data: [20, 30, 40, 40, 90, 90, 70, 70],
                data: monthAmountArr
            },
        ],
        chart: {
            fontFamily: 'inherit',
            type: 'line',
            height: 350,
            toolbar: {
                show: true,
            },
            zoom: {
                enabled: true,
                type: 'xy',
                autoScaleYaxis: true,
            },
        },
        plotOptions: {},
        legend: {
            show: false,
        },
        dataLabels: {
            enabled: false,
            // style: {
            //   colors: ['red'],

            // },
        },
        fill: {
            type: 'solid',
            opacity: 1,
        },

        stroke: {
            show: true,
            width: 3,
            colors: ['#6078EC'],
        },
        xaxis: {
            // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            categories: monthArr,

            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                style: {
                    colors: '#9E9E9E',
                    fontSize: '12px',
                    fontWeight: '600',
                },
            },
            crosshairs: {
                position: 'front',
                stroke: {
                    color: '#9E9E9E',
                    width: 1,
                    dashArray: 3,
                },
            },
            tooltip: {
                enabled: true,
                formatter: undefined,
                offsetY: 0,
                style: {
                    fontSize: '12px',
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#9E9E9E',
                    fontSize: '12px',
                    fontWeight: '600',
                },
            },
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
        colors: ['#FFE16A'],
        grid: {
            borderColor: '#e0e0e0',
            strokeDashArray: 4,
            yaxis: {
                lines: {
                    show: true,
                },
            },
            xaxis: {
                lines: {
                    show: true,
                },
            },
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 20,
            },
        },
        markers: {
            strokeColors: '#FFE16A',
            strokeWidth: 3,
        },
    }
}
