import React from 'react'
import {formattedNumberFields} from '../../../../../helpers/CommonHelpers'
import {KTSVG} from '../../../../../_metronic/helpers'

const TotalSalesCard = ({className, style}) => {
    return (
        <div className={`bg-cmwhite shadow-sm ${className} `} style={{fontSize: '14px', ...style}}>
            {/* Heading */}
            <div className='mb-5'>
                <div
                    className='text-cmGrey900'
                    style={{fontSize: 34, fontWeight: 700, lineHeight: '46.5px'}}
                >
                    {formattedNumberFields(1000.0)}
                </div>
                <div
                    className='text-cmGrey600'
                    style={{fontSize: 16, fontWeight: 500, lineHeight: '30px'}}
                >
                    Total Sales
                </div>
            </div>
            {/* body */}
            <div>
                {/* line 1 */}
                <div className='d-flex gap-xl-20 gap-10 mb-2' style={{fontSize: 14}}>
                    <div className='col d-flex align-items-center text-cmGrey600'>
                        <span className='text-end'>Avg. Client Billing</span>
                    </div>
                    <div className='text-cmGrey900' style={{fontWeight: 700, fontSize: '16px'}}>
                        <KTSVG
                            path='/media/icons/duotune/art/Up-right copy.svg'
                            svgClassName='w-20px h-20px cursor-pointer '
                            className='me-2'
                        />
                        16
                    </div>
                </div>
                <hr className='border-bottom border-dashed border-cmGrey500' />
                {/* line 2 */}
                <div className='d-flex gap-xl-20 gap-10' style={{fontSize: 14}}>
                    <div className='col d-flex align-items-center text-cmGrey600'>
                        <span className='text-end'>Lowest Client Check</span>
                    </div>
                    <div className='text-cmGrey900' style={{fontWeight: 700, fontSize: '16px'}}>
                        <KTSVG
                            path='/media/icons/duotune/art/Down-left.svg'
                            svgClassName='w-20px h-20px cursor-pointer'
                            className='me-2'
                        />
                        16
                    </div>
                </div>
                <hr className='border-bottom border-dashed border-cmGrey500' />

                {/* line 3 */}
                <div className='d-flex gap-xl-20 gap-10' style={{fontSize: 14}}>
                    <div className='col d-flex align-items-center text-cmGrey600'>
                        <span className='text-end'>Avg no. of Users</span>
                    </div>
                    <div className='text-cmGrey900' style={{fontWeight: 700, fontSize: '16px'}}>
                        <KTSVG
                            path='/media/icons/duotune/art/Up-right copy.svg'
                            svgClassName='w-20px 2-30px cursor-pointer '
                            className='me-2'
                        />
                        16
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TotalSalesCard
