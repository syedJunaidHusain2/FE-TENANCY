import React from 'react'
export default function Accounts({graphsData}) {
    return (
        <div className='px-2 py-4'>
            <div className='row mb-2 mx-auto'>
                <div className='col-6 d-flex gap-2 text-nowrap align-items-center'>
                    <i className='bi bi-circle-fill text-cmBlue-Crayola' />
                    <div
                        className='text-cmGrey600'
                        style={{fontFamily: 'Manrope', fontWeight: 500, fontSize: '12px'}}
                    >
                        M2 complete
                    </div>
                    <div
                        className='text-cmBlack'
                        style={{
                            fontSize: '14px',
                            fontFamily: 'Manrope',
                            fontWeight: '700',
                        }}
                    >
                        {graphsData?.m2_complete}
                    </div>
                </div>
                <div className='col-6 d-flex text-nowrap align-items-center gap-2'>
                    <i className='bi bi-circle-fill text-cmgreen' />

                    <div
                        className='text-cmGrey600'
                        style={{fontFamily: 'Manrope', fontSize: '12px', fontWeight: '500'}}
                    >
                        M2 pending
                    </div>
                    <div
                        className='text-cmBlack'
                        style={{
                            fontSize: '14px',
                            fontFamily: 'Manrope',
                            fontWeight: '700',
                        }}
                    >
                        {graphsData?.m2_pending}
                    </div>
                </div>
            </div>

            <div className='row mb-2 mx-auto'>
                <div className='col-6  d-flex text-nowrap align-items-center gap-2'>
                    <i className='bi bi-circle-fill text-cmYellow' />

                    <div
                        className='text-cmGrey600'
                        style={{fontFamily: 'Manrope', fontWeight: 500, fontSize: '12px'}}
                    >
                        Cancelled
                    </div>
                    <div
                        className='ms-2 text-cmBlack'
                        style={{
                            fontSize: '14px',
                            fontFamily: 'Manrope',
                            fontWeight: '700',
                        }}
                    >
                        {graphsData?.cancelled}
                    </div>
                </div>
                <div className='col-6 d-flex text-nowrap align-items-center gap-2'>
                    <i className='bi bi-circle-fill text-cmpink' />

                    <div
                        className='text-cmgrey600'
                        style={{fontFamily: 'Manrope', fontSize: '12px'}}
                    >
                        Clawback
                    </div>
                    <div
                        className='text-cmBlack'
                        style={{
                            fontSize: '14px',
                            fontFamily: 'Manrope',
                            fontWeight: '700',
                        }}
                    >
                        {graphsData?.clawback}
                    </div>
                </div>
            </div>
        </div>
    )
}
