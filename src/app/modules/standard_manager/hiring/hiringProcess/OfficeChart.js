/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef, useState} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {KTSVG} from '../../../../../_metronic/helpers'
import {Dropdown1} from '../../../../../_metronic/partials'

import {getCSS, getCSSVariableValue} from '../../../../../_metronic/assets/ts/_utils'

import {useThemeMode} from '../../../../../_metronic/partials'
import {getHiringProgressChartService} from '../../../../../services/Services'
import {MAIN_POSITIONS} from '../../../../../constants/constants'
import CustomDropdown from '../../../../../customComponents/customInputs/customDropdown/CustomDropdown'

const OfficeChart = ({className, load, locationList, setSelectedLocation, selectedLocation}) => {
    const chartRef = useRef(null)
    const {mode} = useThemeMode()
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        if (selectedLocation) {
            load(true)
            const body = {
                office_id: selectedLocation,
            }
            getHiringProgressChartService(body)
                .then((res) => {
                    setChartData(res?.data[0])
                })
                .finally(() => {
                    load(false)
                })
        }
    }, [selectedLocation])

    useEffect(() => {
        const chart = refreshChart()
        return () => {
            if (chart) {
                chart.destroy()
            }
        }
    }, [chartRef, chartData])

    const refreshChart = () => {
        if (!chartRef.current) {
            return
        }

        const height = parseInt(getCSS(chartRef.current, 'height'))

        const chart = new ApexCharts(chartRef.current, getChartOptions(height, chartData))
        if (chart) {
            chart.render()
        }

        return chart
    }

    return (
        <div
            className={`bg-cmwhite`}
            style={{
                borderRadius: '0 10px 10px 10px',
                boxShadow:
                    'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            }}
        >
            {/* begin::Header */}
            <div className='w-sm-25 p-5'>
                {/* begin::Title */}

                {/* end::Title */}
                <div className='text-cmGrey500'>
                    <CustomDropdown
                        // label={'Office'}
                        searching={false}
                        showClear={false}
                        options={locationList}
                        onChange={(e) => {
                            setSelectedLocation(e?.target?.value)
                        }}
                        value={selectedLocation}
                    />
                </div>
            </div>

            <div className=' my-0'>
                <div ref={chartRef} id='kt_charts_widget_1_chart' style={{height: '350px'}} />
            </div>
            <div className='d-flex flex-center gap-10 pb-5'>
                <div className='d-flex flex-center gap-1'>
                    <i class='bi bi-square-fill' style={{color: '#FFB03A'}}></i>
                    <b className='text-cmGrey600 fs-8 '>Hirings</b>
                </div>
                <div className='d-flex flex-center gap-1'>
                    <i class='bi bi-square-fill' style={{color: '#E0E0E0'}}></i>
                    <b className='text-cmGrey600 fs-8'>Leads</b>
                </div>
            </div>
        </div>
    )
}

export {OfficeChart}

function getChartOptions(height, chartData) {
    const labelColor = getCSSVariableValue('--kt-gray-500')
    const borderColor = getCSSVariableValue('--kt-gray-200')

    // const newArray = Object.keys(chartData).filter((lead_count) => chartData.includes(lead_count))
    const keysData = Object.keys(chartData)
    const lead_count = keysData?.map((item) => chartData[item]?.lead_count)
    const hired_count = keysData?.map((item) => chartData[item]?.hired_count)
    return {
        series: [
            {
                name: 'Hirings',
                data: hired_count,
            },
            {
                name: 'Leads',
                data: lead_count,
            },
        ],
        chart: {
            fontFamily: 'inherit',
            type: 'bar',
            height: height,
            toolbar: {
                show: false,
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
                columnWidth: '50%',
                borderRadius: 5,
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
            colors: ['transparent'],
        },
        xaxis: {
            categories: Object.keys(chartData),
            // categories: ['Jan', 'Feb', 'Mar', 'Apr'],
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
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
        yaxis: {
            labels: {
                style: {
                    colors: labelColor,
                    fontSize: '12px',
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
        colors: ['#FFB03A', '#E0E0E0'],
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
