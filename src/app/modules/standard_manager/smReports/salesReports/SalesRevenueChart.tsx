/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef, useState} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {getCSS, getCSSVariableValue} from '../../../../../_metronic/assets/ts/_utils'
import {useThemeMode} from '../../../../../_metronic/partials'
import {formattedNumberFieldsWithoutDecimal} from '../../../../../helpers/CommonHelpers'

type Props = {
    className: string
    salesData: any
}

const SalesRevenueChart: React.FC<Props> = ({salesData}) => {
    const chartRef = useRef<HTMLDivElement | null>(null)
    const {mode} = useThemeMode()
    const refreshChart = () => {
        if (!chartRef.current) {
            return
        }
        const height = parseInt(getCSS(chartRef.current, 'height'))

        const chart = new ApexCharts(chartRef.current, getChartOptions(height, salesData))
        if (chart) {
            chart.render()
        }

        return chart
    }
    useEffect(() => {}, [salesData])
    useEffect(() => {
        const chart = refreshChart()

        return () => {
            if (chart) {
                chart.destroy()
            }
        }
    }, [salesData, chartRef])

    return (
        <div className={`bg-cmwhite shadow-sm mt-10`} style={{borderRadius: '10px'}}>
            <div className=' border-0 pt-5 fw-bold fs-3 ps-5'>Revenue</div>
            <div ref={chartRef} className='w-100 px-3'></div>
        </div>
    )
}

export {SalesRevenueChart}

function getChartOptions(height: number, salesData: any): ApexOptions {
    var m1Arr: any[] = []
    var m2Arr: any[] = []
    var dateArr: any[] = []

    salesData?.length > 0 &&
        salesData?.map((item: any) => {
            m1Arr.push(item?.m1_amount)
            m2Arr.push(item?.m2_amount)
            // var dateDay = new Date(item?.date).toLocaleString('en-us',{day:'numeric'})
            // var dateMonth = new Date(item?.date).toLocaleString('en-us',{month:'short'})
            // let finalDate = dateDay + dateMonth
            const finalItem = item?.date?.split(' ')
            if (finalItem?.length > 1) dateArr.push(finalItem)
            else dateArr.push(finalItem?.[0])
        })
    const labelColor = getCSSVariableValue('--kt-gray-500')
    const borderColor = getCSSVariableValue('--kt-gray-200')

    const baseColor = getCSSVariableValue('--kt-primary')
    const baseLightColor = getCSSVariableValue('--kt-primary-light')
    const secondaryColor = getCSSVariableValue('--kt-info')

    return {
        series: [
            {
                name: 'M1',
                type: 'bar',
                data: m1Arr,
            },
            {
                name: 'M2',
                type: 'bar',
                data: m2Arr,
            },
        ],
        chart: {
            fontFamily: 'inherit',
            stacked: true,
            height: 300,
            toolbar: {
                show: true,
            },
            zoom: {
                enabled: true,
                type: 'xy',
                autoScaleYaxis: true,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 4,
                columnWidth: '30%',
            },
        },
        legend: {
            show: true,
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        xaxis: {
            categories: dateArr && dateArr,
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
        yaxis: {
            // max: 120,
            title: {
                text: 'Earnings',
                style: {
                    fontSize: '10px',
                    fontFamily: 'Manrope',
                    fontWeight: '700',
                    color: '#0D1821',
                },
            },

            labels: {
                style: {
                    colors: labelColor,
                    fontSize: '12px',
                },
                formatter: function (val) {
                    return formattedNumberFieldsWithoutDecimal(val, '$')
                },
            },
        },

        fill: {
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
                    return formattedNumberFieldsWithoutDecimal(val, '$')
                },
            },
        },
        colors: ['#5DB887', '#6078EC', baseLightColor],
        grid: {
            borderColor: borderColor,
            strokeDashArray: 4,
            yaxis: {
                lines: {
                    show: true,
                },
            },

            padding: {
                top: 0,
                right: 10,
                bottom: 0,
                left: 10,
            },
        },
    }
}
