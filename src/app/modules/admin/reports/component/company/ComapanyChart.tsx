/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {getCSS, getCSSVariableValue} from '../../../../../../_metronic/assets/ts/_utils'
import {useThemeMode} from '../../../../../../_metronic/partials'
import {
    formattedNumberFields,
    formattedNumberFieldsWithoutDecimal,
} from '../../../../../../helpers/CommonHelpers'

type Props = {
    className: string
    graphData: any
}

const ComapanyChart: React.FC<Props> = ({className, graphData}) => {
    const chartRef = useRef<HTMLDivElement | null>(null)
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
            className={`card p-0 text-cmGrey500 shadow-sm`}
            style={{fontFamily: 'Manrope', fontWeight: '600', fontSize: '13px'}}
        >
            {/* begin::Header */}
            <div className='card-header border-0 p-0 d-flex justify-content-center align-items-center gap-10'>
                <div className='d-flex gap-3 align-items-center'>
                    <div className='rounded-pill bg-cmBlue-Crayola  w-20px h-10px'></div>
                    <div>Revenue</div>
                </div>
                <div className='d-flex gap-3 align-items-center'>
                    <div className='rounded-pill bg-cmOrange w-20px h-10px'></div>
                    <div>Cost</div>
                </div>
                <div className='d-flex gap-3 align-items-center'>
                    <div>
                        <div className='rounded-pill bg-cmSuccess w-20px h-10px mb-1'></div>
                        <div className='rounded-pill bg-cmError text-cmError w-20px h-10px'></div>
                    </div>
                    <div>Profitability</div>
                </div>
            </div>
            {/* end::Header */}

            {/* begin::Body */}
            <div className='card-body m-0 p-0'>
                {/* begin::Chart */}
                <div
                    ref={chartRef}
                    id='kt_charts_widget_5_chart'
                    className='w-sm-100'
                    // style={{width: '500px'}}
                ></div>
                {/* end::Chart */}
            </div>
            {/* end::Body */}
        </div>
    )
}

export {ComapanyChart}

function getChartOptions(height: number, graphData: any): ApexOptions {
    var months: any = []
    var revenue: any = []
    var profitability: any = []
    var profitabilityMinus: any = []
    var cost: any = []

    graphData &&
        Object.keys(graphData).map((keyName, i) => {
            revenue.push(graphData?.[keyName]?.revenue?.toFixed(2) ?? 0)
            profitability.push(
                graphData?.[keyName]?.profitability > 0
                    ? graphData?.[keyName]?.profitability?.toFixed(2)
                    : 0
            )
            profitabilityMinus.push(
                graphData?.[keyName]?.profitability < 0
                    ? graphData?.[keyName]?.profitability?.toFixed(2)
                    : 0
            )
            cost.push(graphData?.[keyName]?.costs?.toFixed(2) ?? 0)
            const finalItem = keyName?.split(' ')
            if (finalItem?.length > 1) months.push(finalItem)
            else months.push(finalItem?.[0])
        })
    const labelColor = getCSSVariableValue('--kt-gray-500')
    const borderColor = getCSSVariableValue('--kt-gray-200')
    const baseColor = getCSSVariableValue('--kt-primary')
    const secondaryColor = getCSSVariableValue('--kt-info')

    const maxValue = Math.max(...revenue, ...cost, ...profitability, ...profitabilityMinus) + 20

    return {
        series: [
            {
                name: 'Revenue',
                type: 'line',
                data: revenue,
                // data: [2000.23,1900.11],
            },
            {
                name: 'Cost',
                type: 'line',
                data: cost,
            },
            {
                name: '↑ Profitability',
                type: 'bar',
                data: profitability,
                // data: [301086.08, 2227759.1, 2865779.63],
            },
            {
                name: '↓ Profitability',
                type: 'bar',
                data: profitabilityMinus,
                // data: [0, 0, -2865459.63],
            },
        ],
        chart: {
            fontFamily: 'Manrope',
            // type: 'bar',
            stacked: false,
            height: 350,
            zoom: {
                enabled: true,
                type: 'xy',
                autoScaleYaxis: true,
            },

            toolbar: {
                show: true,
                // tools: {
                //   download: false,
                //   selection: true,
                //   zoom: false,
                //   zoomin: true,
                //   zoomout: true,
                //   pan: false,
                //   reset: true,
                // },
            },
        },

        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '10%',
                borderRadius: [5, 5],
            },
        },
        legend: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['#6078EC', '#FFB03A', 'transparent', 'transparent'],
        },
        xaxis: {
            categories: months,
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                rotate: 0,
                style: {
                    colors: labelColor,
                    fontSize: '12px',
                },
            },
        },
        yaxis: [
            {
                seriesName: 'Revenue',
                show: true,
                min: -maxValue,
                max: maxValue,
                labels: {
                    style: {
                        colors: labelColor,
                        fontSize: '12px',
                        fontFamily: 'Manrope',
                        fontWeight: '600',
                    },
                    formatter: function (val) {
                        return formattedNumberFieldsWithoutDecimal(val, '$')
                    },
                },
                title: {
                    text: 'Revenue / Costs',
                    style: {
                        fontSize: '14px',
                        fontFamily: 'Manrope',
                        fontWeight: '700',
                        color: '#000000',
                    },
                },
            },

            {
                seriesName: 'Cost',
                opposite: false,
                show: false,
                min: -maxValue,
                max: maxValue,
                labels: {
                    style: {
                        colors: labelColor,
                        fontSize: '10px',
                    },
                    formatter: function (val) {
                        return formattedNumberFieldsWithoutDecimal(val, '$')
                    },
                },
            },
            {
                seriesName: '↑ Profitability',
                opposite: true,
                show: false,
                min: -maxValue,
                max: maxValue,
                labels: {
                    style: {
                        colors: labelColor,
                        fontSize: '12px',
                    },
                },
            },
            {
                seriesName: '↓ Profitability',
                opposite: true,
                show: true,
                min: -maxValue,
                max: maxValue,
                labels: {
                    style: {
                        colors: labelColor,
                        fontSize: '12px',
                        fontFamily: 'Manrope',
                        fontWeight: '600',
                    },
                    formatter: function (val) {
                        return formattedNumberFieldsWithoutDecimal(val, '$')
                    },
                },
                title: {
                    text: 'Profitability',
                    style: {
                        fontSize: '14px',
                        fontFamily: 'Manrope',
                        fontWeight: '700',
                        color: '#000000',
                    },
                },
            },
        ],
        fill: {
            opacity: [1, 1, 1, 1],
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
                    return formattedNumberFieldsWithoutDecimal(val, '$')
                },
            },
        },
        // colors: [baseColor, secondaryColor, ],
        colors: ['#6078EC', '#FFB03A', '#00C247', '#FF3333'],
        grid: {
            borderColor: '#EAEAEA',
            strokeDashArray: 4,
            yaxis: {
                lines: {
                    show: true,
                },
            },
            padding: {
                top: 10,
                right: 50,
                bottom: 10,
                left: 50,
            },
        },
    }
}
