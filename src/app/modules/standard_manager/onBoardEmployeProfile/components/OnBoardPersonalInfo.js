import React, {useState} from 'react'
import {formattedPhoneNumber} from '../../../../../helpers/CommonHelpers'
import {useLocation} from 'react-router-dom'

const OnBoardPersonalInfo = ({userData, getData}) => {
    const location = useLocation()
    return (
        <div className='bg-cmwhite shadow-sm' style={{borderRadius: '10px'}}>
            <div style={{fontFamily: 'Manrope', fontSize: '14px'}}>
                {/* first line */}
                <div className='row py-5 px-lg-20 px-10' style={{fontWeight: 600}}>
                    <div className='col-sm d-flex gap-lg-10 gap-5 '>
                        <div className='text-cmGrey600'> First Name:</div>{' '}
                        <div className='text-cmgrey900'>{userData?.first_name}</div>
                    </div>

                    <div className='col-sm d-flex gap-lg-10 gap-5 ' style={{fontWeight: 600}}>
                        <div className='text-cmGrey600 '>Last Name:</div>
                        <div className='text-cmgrey900 '>{userData?.last_name}</div>
                    </div>
                    <div className='col-sm'></div>
                </div>
                {/* Second line */}
                <div className='row py-5 px-lg-20 px-10 '>
                    <div className='col-sm d-flex gap-lg-10 gap-4 ' style={{fontWeight: 600}}>
                        <div className='text-cmGrey600'>Email</div>
                        <div className='text-cmgrey900'>{userData?.email}</div>
                    </div>
                    <div className='col-sm d-flex gap-lg-10 gap-5' style={{fontWeight: 600}}>
                        <div className='text-cmGrey600'>Phone</div>
                        <div className='text-cmgrey900 text-nowrap'>
                            {formattedPhoneNumber(userData?.mobile_no)}
                        </div>
                    </div>
                    <div className='col-sm'></div>
                </div>
                {/* third line */}

                {/* 4th line */}
                <div className='row py-5 px-lg-20 px-10'>
                    <div className='col-sm d-flex gap-10 w-sm-25' style={{fontWeight: 600}}>
                        <div className='text-cmGrey600'>Home State</div>
                        <div className='text-cmgrey900'>{userData?.state_name}</div>
                    </div>
                    <div className='col-sm'></div>
                    <div className='col-sm'></div>
                </div>
            </div>
        </div>
    )
}

export default OnBoardPersonalInfo
