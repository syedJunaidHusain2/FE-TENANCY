/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from 'react'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { getCSS, getCSSVariableValue } from '../../../../../../../_metronic/assets/ts/_utils'
import { useThemeMode } from '../../../../../../../_metronic/partials'

type Props = {
    className: string
    chartData: any
}

const EarningDonutChart: React.FC<Props> = ({ chartData }) => {
    const chartRef = useRef<HTMLDivElement | null>(null)
    const { mode } = useThemeMode()
    const refreshChart = () => {
        if (!chartRef?.current) {
            return
        }

        const height = parseInt(getCSS(chartRef?.current, 'height'))

        const chart = new ApexCharts(chartRef?.current, getChartOptions(height, chartData))
        if (chart) {
            chart.render()
        }

        return chart
    }

    useEffect(() => {
        const chart = refreshChart()

        return () => {
            if (chart) {
                chart?.destroy()
            }
        }
    }, [chartRef, chartData])

    return <div ref={chartRef} id='kt_charts_widget_6_chart' className='m-0 p-0'></div>
}

export { EarningDonutChart }

function getChartOptions(height: number, chartData: any): ApexOptions {
    const labelColor = getCSSVariableValue('--kt-gray-500')
    const borderColor = getCSSVariableValue('--kt-gray-200')

    // const baseColor = getCSSVariableValue('--kt-primary')
    const baseLightColor = getCSSVariableValue('--kt-primary-light')
    // const secondaryColor = getCSSVariableValue('--kt-info')

    return {
        series: [chartData?.commission ?? 0, chartData?.overrides ?? 0, chartData?.other_item ?? 0],
        // series: [300,200,100],

        chart: {
            type: 'donut',
            // height: '100%',
            // width: '100%',

            toolbar: {
                show: false,
            },
        },
        legend: {
            show: false,
        },
        fill: {
            colors: ['#63EAC1', '#6078EC', '#FFE16A'],
        },
        // markers: {
        //   colors: ['#63EAC1', '#6078EC', '#FFE16A'],
        // },
        dataLabels: {
            style: {
                colors: ['balck'],
            },
        },
        // responsive: [
        //   {
        //     breakpoint: 480,
        //     options: {
        //       chart: {
        //         width: 250,
        //       },
        //     },
        //   },
        // ],
        // plotOptions: {
        //   bar: {
        //     horizontal: false,
        //     borderRadius: 4,
        //     columnWidth: '20%',
        //   },
        // },
        // legend: {
        //   show: true,
        // },
        // dataLabels: {
        //   enabled: false,
        // },
        stroke: {
            // curve: 'smooth',
            show: true,
            // width: 10,
            colors: ['transparent'],
        },
        // yaxis: {
        //   // max: 120,
        //   title: {
        //     text: 'Earnings in ($)',
        //     style: {
        //       fontSize: '10px',
        //       fontFamily: 'Manrope',
        //       fontWeight: '700',
        //       color: '#0D1821',
        //     },
        //   },
        //   labels: {
        //     style: {
        //       colors: labelColor,
        //       fontSize: '12px',
        //     },
        //   },
        // },
        // fill: {
        //   opacity: 1,
        // },
        // states: {
        //   normal: {
        //     filter: {
        //       type: 'none',
        //       value: 0,
        //     },
        //   },
        //   hover: {
        //     filter: {
        //       type: 'none',
        //       value: 0,
        //     },
        //   },
        //   active: {
        //     allowMultipleDataPointsSelection: false,
        //     filter: {
        //       type: 'none',
        //       value: 0,
        //     },
        //   },
        // },
        // tooltip: {
        //   style: {
        //     fontSize: '12px',
        //   },
        //   y: {
        //     formatter: function (val) {
        //       return '$' + val
        //     },
        //   },
        // },
        colors: ['balck'],
        // grid: {
        //   borderColor: borderColor,
        //   strokeDashArray: 4,
        //   yaxis: {
        //     lines: {
        //       show: true,
        //     },
        //   },

        //   padding: {
        //     top: 0,
        //     right: 40,
        //     bottom: 0,
        //     left: 40,
        //   },
        // },
    }
}
