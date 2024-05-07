/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {getCSS, getCSSVariableValue} from '../../../../../_metronic/assets/ts/_utils'
import {useThemeMode} from '../../../../../_metronic/partials'

const EmployeePerformanceChart = ({className, reportData, head}) => {
    const chartRef = useRef(null)
    const {mode} = useThemeMode()
    const refreshChart = () => {
        if (!chartRef.current) {
            return
        }

        const height = parseInt(getCSS(chartRef.current, 'height'))

        const chart = new ApexCharts(chartRef.current, getChartOptions(height, reportData))
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
    }, [chartRef, reportData])

    return (
        <div className={`bg-cmwhite ${className} shadow-sm p-5 `} style={{borderRadius: '10px'}}>
            {/* begin::Header */}
            <div className='card-header border-0 pt-5 ps-5'>
                <h3 className='card-title align-items-start flex-column'>
                    <span
                        className='card-label mb-1 text-cmBlack '
                        style={{fontSize: '14px', fontWeight: '600'}}
                    >
                        Employee Performance{' '}
                        <span className='text-cmGrey700'>( {head ? head : 'This Year'} )</span>
                    </span>
                </h3>

                {/* begin::Toolbar */}
                <div className='card-toolbar' data-kt-buttons='true'>
                    {/* <a
            className='btn btn-sm btn-color-muted btn-active btn-active-primary active px-4 me-1'
            id='kt_charts_widget_5_year_btn'
          >
            Year
          </a>

          <a
            className='btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1'
            id='kt_charts_widget_5_month_btn'
          >
            Month
          </a>

          <a
            className='btn btn-sm btn-color-muted btn-active btn-active-primary px-4'
            id='kt_charts_widget_5_week_btn'
          >
            Week
          </a> */}
                </div>
                {/* end::Toolbar */}
            </div>
            {/* end::Header */}

            {/* begin::Body */}
            <div className='card-body'>
                {/* begin::Chart */}
                <div
                    ref={chartRef}
                    id='kt_charts_widget_5_chart'
                    style={{height: '350px', width: '100%'}}
                ></div>
                {/* end::Chart */}
            </div>
            {/* end::Body */}
        </div>
    )
}

export {EmployeePerformanceChart}

const getChartOptions = (height, reportData) => {
    const labelColor = getCSSVariableValue('--kt-gray-500')
    const borderColor = getCSSVariableValue('--kt-gray-200')

    const baseColor = getCSSVariableValue('--kt-primary')
    const secondaryColor = getCSSVariableValue('--kt-info')
    const cancelledArr = []
    const penndingArr = []
    const installeddArr = []
    const name = []

    if (reportData?.graph?.length > 0) {
        reportData?.graph?.map((val) => {
            cancelledArr.push(Number(val?.cancelled))
            installeddArr.push(Number(val?.install))
            penndingArr.push(Number(val?.pending))
            name.push(val?.userName)
        })
    }

    return {
        series: [
            {
                name: 'Pending',
                // data: [10],
                data: penndingArr,
            },
            {
                name: 'Installed',
                // data: [25, 25, 25, 25],
                data: installeddArr,
            },
            {
                name: 'Cancelled',
                // data: [50, 50, 50, 50],
                data: cancelledArr,
            },
        ],

        chart: {
            fontFamily: 'inherit',
            type: 'bar',
            stacked: true,
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
                columnWidth: '12%',
                borderRadius: 5,
            },
        },
        legend: {
            show: true,
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        xaxis: {
            // categories: [
            //   'Theresa Webb',
            //   'Jerome Bell',
            //   'Wade Warren',
            //   'Arlene McCoy',
            //   'Eleanor Pena',
            //   'Ralph Edwards',
            //   'Jacob Jones',
            //   'Brooklyn Simmons',
            //   'Savannah Nguyen',
            //   'Cameron Williamson',
            //   'Floyd Miles',
            // ],
            categories: name,
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                style: {
                    colors: '#616161',
                    fontSize: '10px',
                    fontWeight: '600',
                },
            },
        },
        yaxis: {
            //   min: -80,
            //   max: 80,
            labels: {
                style: {
                    colors: '#9E9E9E',
                    fontSize: '12px',
                },
            },
            title: {
                display: true,
                text: 'Accounts',
                style: {
                    colors: '#0D1821',
                    fontSize: '16.4px',
                },
            },
        },
        fill: {
            opacity: 1,
        },
        responsive: [
            {
                breakpoint: 700,
                options: {
                    plotOptions: {
                        bar: {
                            horizontal: true,
                        },
                    },
                },
            },
        ],
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
        colors: ['#5DB887', '#6078EC', '#FFE16A'],
        grid: {
            borderColor: borderColor,
            strokeDashArray: 4,
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
    }
}
