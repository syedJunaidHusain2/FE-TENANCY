import React from 'react'

const ReconcilliationCommanCard = ({
    borderColor,
    heading,
    Li1,
    Li1Data,
    Li2,
    Li2Data,
    Li3,
    Li3Data,
    Li4,
    Li4Data,
    Li5,
    Li5Data,
    Li6,
    Li6Data,
    TotalDue,
}) => {
    return (
        <div
            className={`bg-cmwhite my-0 card py-5 px-8 border border-${borderColor} w-100 h-275px shadow-sm`}
            style={{
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '500',
                fontFamily: 'Manrope',
            }}
        >
            {/* Begins body */}

            {/* Heading */}
            <div className=' d-flex align-items-center gap-5 mb-5'>
                <div className='text-cmGrey900' style={{fontWeight: '700'}}>
                    {heading}
                </div>
                {/* <div
          className='text-cminfo text-decoration-underline cursor-pointer'
          style={{fontWeight: '600'}}
        >
          View report
        </div> */}
            </div>
            {/* Data */}
            <div className='card-body my-0 p-0'>
                {/* 1 */}
                <div
                    className='d-flex align-items-center justify-content-between mb-2 text-cmGrey600'
                    style={{fontWeight: '600'}}
                >
                    <div>{Li1} </div>
                    <div>{Li1Data}</div>
                </div>
                {/* 2 */}
                <div
                    className='d-flex align-items-center justify-content-between mb-2 text-cmGrey600'
                    style={{fontWeight: '600'}}
                >
                    <div>{Li2}</div>
                    <div>{Li2Data}</div>
                </div>
                {/* 3 */}
                <div
                    className='d-flex align-items-center justify-content-between mb-2 text-cmGrey600'
                    style={{fontWeight: '600'}}
                >
                    <div>{Li3}</div>
                    <div>{Li3Data}</div>
                </div>
                {/* 4 */}
                <div
                    className='d-flex align-items-center justify-content-between mb-2 text-cmGrey600'
                    style={{fontWeight: '600'}}
                >
                    <div>{Li4}</div>
                    <div>{Li4Data}</div>
                </div>
                {/* 5 */}
                <div
                    className='d-flex align-items-center justify-content-between mb-2 text-cmGrey600'
                    style={{fontWeight: '600'}}
                >
                    <div>{Li5}</div>
                    <div>{Li5Data}</div>
                </div>
                {/* 6 */}
                <div
                    className='d-flex align-items-center justify-content-between mb-2 text-cmGrey600'
                    style={{fontWeight: '600'}}
                >
                    <div>{Li6}</div>
                    <div>{Li6Data}</div>
                </div>
            </div>
            {/* Footer */}
            <div
                className='card-footer border-0 my-0 p-0 d-flex justify-content-between align-items-center text-cmblack'
                style={{fontWeight: '800'}}
            >
                <div>Total Due</div>
                <div className={`${heading == 'Deductions' ? 'text-cmError' : ''}`}>{TotalDue}</div>
            </div>
        </div>
    )
}

export default ReconcilliationCommanCard
