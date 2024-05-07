import React from 'react'

const SetupPaperwork = () => {
    return (
        <div
            className='bg-cmwhite shadow-sm pb-10'
            style={{borderRadius: '10px', fontSize: '14px', fontFamily: 'Manrope'}}
        >
            {/* Begins header */}
            <div className='p-5'>
                <div
                    className='d-flex align-items-center gap-5 mx-sm-0 mx-auto'
                    style={{fontSize: '18px', fontFamily: 'Manrope', fontWeight: '600'}}
                >
                    <div>Company Paperwork</div>
                </div>
            </div>
            <hr className='py-0 my-0 text-cmGrey500' />
            <div className='my-10 text-center text-cmGrey400 fs-2'>Iframe goes here</div>
        </div>
    )
}

export default SetupPaperwork
