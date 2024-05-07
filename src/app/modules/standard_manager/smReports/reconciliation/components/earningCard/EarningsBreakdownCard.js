import React from 'react'
import {EarningDonutChart} from './EarningDonutChart'
import EarningTable from './EarningTable'

const EarningsBreakdownCard = ({cardData}) => {
    return (
        <div
            className={`bg-cmwhite my-0 card py-5 px-8 h-md-300px shadow-sm`}
            style={{
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '500',
                fontFamily: 'Manrope',
            }}
        >
            {/* Begins body */}

            {/* Heading */}

            <div className='text-cmGrey900' style={{fontWeight: '700', fontSize: '16px'}}>
                Earnings Breakdown
            </div>

            {/* Data */}
            <div className=' d-flex align-items-center flex-wrap justify-content-sm-between flex-sm-row flex-column-reverse my-0 p-0'>
                <div className='w-md-50 w-100 my-sm-0 my-5 border-end'>
                    <EarningTable tableData={cardData} />
                </div>
                <div className='w-md-50 w-100 my-sm-0 my-5 '>
                    <EarningDonutChart chartData={cardData} />
                </div>
            </div>
        </div>
    )
}

export default EarningsBreakdownCard
