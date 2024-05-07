import React from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {fontsFamily} from '../../../../../assets/fonts/fonts'
import {useLocation, useNavigate} from 'react-router-dom'

const BillingSidebar = () => {
    const navigate = useNavigate()
    const {pathname} = useLocation()
    return (
        <div
            className='bg-cmwhite shadow-sm h-100 px-2 py-5 text-cmGrey600'
            style={{
                borderRadius: 10,
                fontFamily: fontsFamily.manrope,
                fontSize: '14px',
                fontWeight: 600,
            }}
        >
            <div className='text-cmGrey600 ps-4 mb-5' style={{fontSize: '16px'}}>
                BILLING DETAILS
            </div>
            <div
                className='d-flex flex-xxl-column gap-2 flex-wrap'
                style={{fontSize: 16, fontWeight: 600}}
            >
                {/* 1 */}
                <div
                    className={`${
                        pathname.includes('subscription') ? 'bg-cmBlue-Crayola' : ''
                    }  bg-opacity-10 px-3 py-3 d-flex gap-3 align-items-center cursor-pointer text-cmGrey700 w-100`}
                    style={{borderRadius: 10}}
                    onClick={() => navigate('subscription')}
                >
                    <KTSVG
                        path='/media/icons/duotune/art/crown.svg'
                        className='cursor-pointer'
                        svgClassName='w-20px h-20px'
                    />
                    <div>Subscriptions</div>
                </div>
                {/* 2 */}
                <div
                    className={`${
                        pathname.includes('addresses') ? 'bg-cmBlue-Crayola' : ''
                    }  bg-opacity-10 py-3 px-3 d-flex gap-3 align-items-center cursor-pointer text-cmGrey700 w-100`}
                    style={{borderRadius: 10}}
                    onClick={() => navigate('addresses')}
                >
                    <KTSVG
                        path='/media/icons/duotune/art/location.svg'
                        className='cursor-pointer'
                        svgClassName='w-20px h-20px'
                    />
                    <div>Addresses</div>
                </div>
                {/* 3 */}
                <div
                    className={`${
                        pathname.includes('billing-history') ? 'bg-cmBlue-Crayola' : ''
                    }  bg-opacity-10 py-3 px-3 d-flex gap-3 align-items-center cursor-pointer text-cmGrey700 w-100`}
                    style={{borderRadius: 10}}
                    onClick={() => navigate('billing-history')}
                >
                    <KTSVG
                        path='/media/icons/duotune/art/document-text.svg'
                        className='cursor-pointer'
                        svgClassName='w-20px h-20px'
                    />
                    <div>Billing history</div>
                </div>
            </div>
        </div>
    )
}

export default BillingSidebar
