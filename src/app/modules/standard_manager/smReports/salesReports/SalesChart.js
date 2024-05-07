/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useMemo, useRef, useState} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {getCSS, getCSSVariableValue} from '../../../../../_metronic/assets/ts/_utils'
import {useThemeMode} from '../../../../../_metronic/partials'
import {array} from 'yup'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import CustomRadioButton from '../../../../../customComponents/customRadioButton/CustomRadioButton'

// type Props = {
//   className: string
//   chartData: any
//   selectedKWType: any
//   setSelectedKWType: any
//   yAxis: any
// }

const SalesChart = ({className, chartData, selectedKWType, setSelectedKWType}) => {
    const chartRef = useRef(null)
    const {mode} = useThemeMode()
    const [kw_installColor, setKw_InstallColor] = useState('#FFE16A')

    const refreshChart = () => {
        if (!chartRef.current) {
            return
        }

        const height = parseInt(getCSS(chartRef.current, 'height'))

        const chart = new ApexCharts(
            chartRef.current,
            getChartOptions(height, chartData, kw_installColor, selectedKWType)
        )
        if (chart) {
            chart.render()
        }

        return chart
    }
    useEffect(() => {}, [chartData])
    useEffect(() => {
        const chart = refreshChart()

        return () => {
            if (chart) {
                chart.destroy()
            }
        }
    }, [chartRef, chartData])

    return (
        <div
            className={`bg-cmwhite ${className} shadow-sm`}
            style={{fontFamily: 'Manrope', borderRadius: '10px ', position: 'relative'}}
        >
            {/* begin::Header */}
            <div className='d-flex justify-content-between flex-wrap align-items-center pt-5 ps-5'>
                <div className='text-cmGrey900 ' style={{fontWeight: '700', fontSize: '16px'}}>
                    Sales
                </div>
                {/* Selctions */}
                <div className='d-flex gap-10 align-items-center' style={{position: 'relative'}}>
                    <CustomRadioButton
                        childClass='d-flex gap-2 align-items-center'
                        value={'sold'}
                        name={'sold'}
                        handleChange={() => {
                            setSelectedKWType('sold')
                            setKw_InstallColor('#FFE16A')
                        }}
                        isChecked={selectedKWType == 'sold'}
                    >
                        <div className='rounded-pill px-3 badge text-cmYellow bg-cmYellow'>.</div>
                        <div
                            className='text-cmGrey500'
                            style={{fontWeight: '600', fontSize: '12px', fontFamily: 'Manrope'}}
                        >
                            KW Sold
                        </div>
                    </CustomRadioButton>
                    <CustomRadioButton
                        childClass='d-flex gap-2 align-items-center'
                        value={'install'}
                        name={'install'}
                        handleChange={() => {
                            setSelectedKWType('install')
                            setKw_InstallColor('#FFB03A')
                        }}
                        isChecked={selectedKWType == 'install'}
                    >
                        <div className='rounded-pill px-3 badge text-cmOrange bg-cmOrange'>.</div>
                        <div
                            className='text-cmGrey500'
                            style={{fontWeight: '600', fontSize: '12px', fontFamily: 'Manrope'}}
                        >
                            KW Installed
                        </div>
                    </CustomRadioButton>
                </div>
                <div></div>
            </div>
            {/* Selctions */}

            {/* end::Header */}

            {/* begin::Body */}
            <div className='card-body'>
                {/* begin::Chart */}
                <div ref={chartRef} id='kt_charts_widget_6_chart'></div>
                {/* end::Chart */}
            </div>
            {/* end::Body */}
        </div>
    )
}

export {SalesChart}

function getChartOptions(height, chartData, kw_installColor, selectedKWType) {
    const labelColor = '#9E9E9E'
    const borderColor = getCSSVariableValue('--kt-gray-200')
    //

    const baseColor = '#FFE16A'
    const baseLightColor = getCSSVariableValue('--kt-primary-light')
    const secondaryColor = getCSSVariableValue('--kt-info')
    var m1Arr = []
    var m2Arr = []
    var clawArr = []
    var dateArr = []
    var kwArr = []

    chartData?.map((item) => {
        m1Arr.push(item?.m1_account?.toFixed(2) ?? 0)
        m2Arr.push(item?.m2_account?.toFixed(2) ?? 0)
        clawArr.push(item?.claw_back?.toFixed(2) ?? 0)
        kwArr.push(item?.total_kw?.toFixed(2) ?? 0)

        // var dateDay = new Date(item.date).toLocaleString('en-us', { day: 'numeric' })
        // var dateMonth = new Date(item.date).toLocaleString('en-us', { month: 'short' })
        // let finalDate = dateDay + dateMonth
        const finalItem = item?.date?.split(' ')
        if (finalItem?.length > 1) dateArr.push(finalItem)
        else dateArr.push(finalItem?.[0])
    })
    const maxValue = Math.max(...m1Arr, ...clawArr, ...m2Arr) + 20

    return {
        series: [
            {
                name: 'M1',
                type: 'line',
                // data: [10, 20, 30, 40, 50, 60, 70, 200, 90, 100, 110, 50],
                data: m1Arr,
            },
            {
                name: 'M2',
                type: 'line',
                data: m2Arr,
                // data: [10, 20, 30, 40, 50, 60, 70, 200, 90, 100, 110, 50],
            },
            {
                name: 'Clawback',
                type: 'line',
                data: clawArr,
                // data: [10, 20, 30, 40, 50, 60, 70, 200, 90, 100, 110, 50],
            },
            {
                name: `${selectedKWType == 'sold' ? 'KW Sold' : 'KW Installed'}`,
                type: 'bar',
                data: kwArr,
            },
        ],
        chart: {
            fontFamily: 'inherit',
            stacked: false,
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
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 5,
                columnWidth: '12%',
            },
        },
        legend: {
            show: true,
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            // curve: 'smooth',
            show: true,
            width: 2,
            // colors: ['#000', '#6078EC', '#5DB887', '#FE679D'],
        },
        xaxis: {
            categories: dateArr,
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
                seriesName: 'M1',
                show: true,
                title: {
                    text: 'Accounts',
                    style: {
                        fontFamily: 'Manrope',
                        fontWeight: '700',
                        fontSize: '12px',
                        color: '#0D1821',
                    },
                },
                max: maxValue,
                min: 0,
                labels: {
                    formatter: function (val) {
                        return val.toFixed(0)
                    },
                    style: {
                        colors: labelColor,
                        fontSize: '12px',
                    },
                },
            },

            {
                seriesName: 'M2',
                show: false,
                title: {
                    text: 'Accounts',
                    style: {
                        fontFamily: 'Manrope',
                        fontWeight: '700',
                        fontSize: '12px',
                        color: '#0D1821',
                    },
                },
                max: maxValue,
                min: 0,
                labels: {
                    style: {
                        colors: labelColor,
                        fontSize: '12px',
                        fontFamily: 'Manrope',
                        fontWeight: '500',
                    },
                },
            },

            {
                seriesName: 'Clawback',
                show: false,
                max: maxValue,
                min: 0,
                title: {
                    text: 'Accounts',
                    style: {
                        fontFamily: 'Manrope',
                        fontWeight: '700',
                        fontSize: '12px',
                        color: '#0D1821',
                    },
                },
                labels: {
                    style: {
                        colors: labelColor,
                        fontSize: '12px',
                        fontFamily: 'Manrope',
                        fontWeight: '500',
                    },
                },
            },

            {
                seriesName: 'KW Sold',
                opposite: true,
                show: true,
                title: {
                    text: `${selectedKWType == 'sold' ? 'KW Sold' : 'KW Installed'}`,
                    style: {
                        fontFamily: 'Manrope',
                        fontWeight: '700',
                        fontSize: '12px',
                        color: '#0D1821',
                    },
                },
                labels: {
                    formatter: function (val) {
                        return val.toFixed(0)
                    },
                    style: {
                        colors: labelColor,
                        fontSize: '12px',
                        fontFamily: 'Manrope',
                        fontWeight: '500',
                    },
                },
            },
        ],

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
                    return val
                },
            },
        },
        // colors: [baseColor, secondaryColor, baseLightColor],
        colors: ['#6078EC', '#00C247', '#FE679D', kw_installColor],
        grid: {
            borderColor: borderColor,
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
