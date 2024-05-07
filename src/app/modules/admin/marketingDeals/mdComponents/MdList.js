import React from 'react'

const MdList = () => {
    return (
        <div className={`card  shadow`} style={{fontFamily: 'Manrope'}}>
            {/* begin::Header */}
            <div className='ps-6 pt-6 border-0 py-0 '>
                <div
                    className=' fw-bold text-cmGrey900 '
                    style={{fontSize: '14px', fontWeight: '700'}}
                >
                    Reconciliation Benchmark
                </div>
            </div>

            {/* end::Header */}
            {/* begin::Body */}
            <div className='card-body pt-2 mx-3'>
                <div>
                    {/* row 1 */}
                    <div className='d-flex gap-5 align-items-center py-2'>
                        <div
                            style={{
                                fontWeight: '600',
                                fontSize: '14px',
                                fontFamily: 'Manrope',
                            }}
                            className='text-cmGrey500 text-decoration-line-through'
                        >
                            11/01/2022
                        </div>
                        {/* <div
              className='text-cmBlue-Crayola text-decoration-underline cursor-pointer'
              style={{fontWeight: '600', fontSize: '12px', fontFamily: 'Manrope'}}
            >
              View Report
            </div> */}
                    </div>
                    {/* row 2 */}
                    <div className='d-flex gap-5 align-items-center py-2'>
                        <div
                            style={{
                                fontWeight: '600',
                                fontSize: '14px',
                                fontFamily: 'Manrope',
                            }}
                            className='text-cmGrey700'
                        >
                            11/01/2022
                        </div>
                        <div
                            className='text-cmSuccess text-decoration-underline cursor-pointer'
                            style={{fontWeight: '600', fontSize: '12px', fontFamily: 'Manrope'}}
                        >
                            Start
                        </div>
                    </div>
                </div>
            </div>
            {/* end::Body */}
        </div>
    )
}

export default MdList
