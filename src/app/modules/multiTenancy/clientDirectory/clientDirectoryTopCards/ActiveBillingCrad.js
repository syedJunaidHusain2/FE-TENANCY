import React from 'react'
import CustomArrow, {ARROW_DIRECTION} from '../../../../../customComponents/customIcons/CustomIcons'
import {formattedNumberFields} from '../../../../../helpers/CommonHelpers'
import Chart from 'react-apexcharts'
import {Doughnut} from 'react-chartjs-2'

const ActiveBillingCrad = ({className, style}) => {
    const data = {
        labels: ['Not Billed', 'Billed', 'Paid'],

        datasets: [
            {
                data: [1, 2, 3],
                backgroundColor: ['#50CD89', '#00A3FF', '#E0E0E0'],
                display: true,
                borderColor: ['#50CD89', '#00A3FF', '#E0E0E0'],
            },
        ],
    }

    return (
        <div className={`bg-cmwhite shadow-sm ${className} `} style={{fontSize: '14px', ...style}}>
            <div className='d-flex align-items-center justify-content-end'>
                <div
                    className='text-cmGrey900'
                    style={{fontSize: 16, lineHeight: '30px', fontWeight: 600}}
                >
                    This Month
                </div>
                <CustomArrow arrowDirection={ARROW_DIRECTION.right} />
            </div>
            {/* Heading */}
            <div className='mb-5'>
                <div
                    className='text-cmGrey900'
                    style={{fontSize: 34, fontWeight: 700, lineHeight: '46.5px'}}
                >
                    6
                </div>
                <div
                    className='text-cmGrey600'
                    style={{fontSize: 16, fontWeight: 500, lineHeight: '30px'}}
                >
                    Active Billing
                </div>
            </div>
            <div className='d-flex align-items-center mb-5 gap-10'>
                <div className='w-100px'>
                    <Doughnut
                        data={data}
                        options={{
                            cutout: '70%',
                            plugins: {
                                legend: {
                                    display: false,
                                },
                                tooltip: {
                                    enabled: true,
                                },
                            },

                            maintainAspectRatio: true,
                            responsive: true,
                        }}
                    />
                </div>
                <div>
                    {/* line 1 */}
                    <div className='d-flex gap-xl-20 gap-10 mb-2' style={{fontSize: 14}}>
                        <div className='col d-flex align-items-center text-cmGrey600'>
                            <span
                                className='bullet w-10px h-5px rounded-2 me-3'
                                style={{backgroundColor: '#00A3FF'}}
                            ></span>
                            <span className='text-end'>Not Billed</span>
                        </div>
                        <div className='text-cmGrey700' style={{fontWeight: 700}}>
                            16
                        </div>
                    </div>
                    {/* line 2 */}
                    <div className='d-flex gap-xl-20 gap-10 mb-2' style={{fontSize: 14}}>
                        <div className='col d-flex align-items-center text-cmGrey600'>
                            <span
                                className='bullet w-10px h-5px rounded-2 me-3'
                                style={{backgroundColor: '#E4E6EF'}}
                            ></span>
                            <span className='text-end'>Billed</span>
                        </div>
                        <div className='text-cmGrey700' style={{fontWeight: 700}}>
                            16
                        </div>
                    </div>
                    {/* line 3 */}
                    <div className='d-flex gap-xl-20 gap-10' style={{fontSize: 14}}>
                        <div className='col d-flex align-items-center text-cmGrey600'>
                            <span
                                className='bullet w-10px h-5px rounded-2 me-3'
                                style={{backgroundColor: '#50CD89'}}
                            ></span>
                            <span className='text-end'>Paid</span>
                        </div>
                        <div className='text-cmGrey700' style={{fontWeight: 700}}>
                            16
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActiveBillingCrad
