import React from 'react'
import Chart from 'react-apexcharts'

const CustomOfficeSalesRadialChart = ({
    TotalHeadValue,
    TotalHeadName,
    MajorValueName,
    MajorValue,
    MinorValueName,
    MinorValue,
    MajorValueColor,
    progressColor,
    nonProgressColor,
    percentage,
}) => {
    const chartData = {
        series: [percentage],
        options: {
            chart: {
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    size: '20%',
                    hollow: {
                        margin: 15,
                        size: '60%',
                    },
                    dataLabels: {
                        value: {
                            fontSize: '22px',
                            show: false,
                        },
                        name: {
                            show: true,
                        },

                        total: {
                            show: true,
                            label: `${percentage}%`,
                            fontSize: '24px',
                            fontWeight: 700,
                            fontFamily: 'Manrope',
                        },
                    },
                    track: {
                        background: nonProgressColor,
                    },
                },
            },
            colors: [progressColor],
            stroke: {
                lineCap: 'round', // Add rounded line cap effect
            },
        },
    }
    return (
        <div style={{fontFamily: 'Manrope'}} className='text-center'>
            {/* Heding */}
            <div>
                <div className='text-cmGrey600' style={{fontSize: '12px', fontWeight: 600}}>
                    {TotalHeadName}
                </div>
                <div className='text-cmGrey900' style={{fontSize: '14px', fontWeight: 700}}>
                    {TotalHeadValue}
                </div>
            </div>
            <div className='w-sm-225px h-sm-225px mx-auto p-0 m-0'>
                <Chart
                    options={chartData.options}
                    series={chartData.series}
                    track={chartData.track}
                    type='radialBar'
                    height='100%'
                />
            </div>
            {/* Labels */}
            <div className='d-flex flex-column flex-center'>
                {/* Line 1 */}
                <div className='d-flex align-items-center gap-5 mb-5'>
                    <div className={`bg-${MajorValueColor}  rounded h-25px w-25px`} />
                    {/* Title */}
                    <div>
                        <div style={{fontSize: 12, fontWeight: 600}}>{MajorValueName}</div>
                        <div className='text-cmGrey900' style={{fontWeight: 700}}>
                            {MajorValue}
                        </div>
                    </div>
                </div>
                {/* Line 1 */}
                <div className='d-flex align-items-center gap-5 mb-5'>
                    <div className={`bg-${MajorValueColor} bg-opacity-20 rounded h-25px w-25px`} />
                    {/* Title */}
                    <div>
                        <div style={{fontSize: '12px', fontWeight: 600}}>{MinorValueName}</div>
                        <div className='text-cmGrey900' style={{fontWeight: 700}}>
                            {MinorValue}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomOfficeSalesRadialChart
