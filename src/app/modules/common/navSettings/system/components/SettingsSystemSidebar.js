import React from 'react'
import {fontsFamily} from '../../../../../../assets/fonts/fonts'
import {useLocation, useNavigate} from 'react-router'
import {KTSVG} from '../../../../../../_metronic/helpers'

const SettingsSystemSidebar = () => {
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
                SYSTEM
            </div>
            <div
                className='d-flex flex-xxl-column gap-2 flex-wrap'
                style={{fontSize: 16, fontWeight: 600}}
            >
                {/* 1 */}
                <div
                    className={`${
                        pathname.includes('general') ? 'bg-cmBlue-Crayola' : ''
                    }  bg-opacity-10 px-3 py-3 d-flex gap-3 align-items-center cursor-pointer text-cmGrey700 w-100`}
                    style={{borderRadius: 10}}
                    onClick={() => navigate('general')}
                >
                    <KTSVG
                        path='/media/icons/duotune/art/setting-general.svg'
                        className='cursor-pointer'
                        svgClassName='w-20px h-20px'
                    />
                    <div>General</div>
                </div>
                {/* 2 */}
                <div
                    className={`${
                        pathname.includes('emails') ? 'bg-cmBlue-Crayola' : ''
                    }  bg-opacity-10 py-3 px-3 d-flex gap-3 align-items-center cursor-pointer text-cmGrey700 w-100`}
                    style={{borderRadius: 10}}
                    onClick={() => navigate('emails')}
                >
                    <KTSVG
                        path='/media/icons/duotune/art/sms-tracking.svg'
                        className='cursor-pointer'
                        svgClassName='w-20px h-20px'
                    />
                    <div>Emails</div>
                </div>
                {/* 3 */}
                <div
                    className={`${
                        pathname.includes('notification') ? 'bg-cmBlue-Crayola' : ''
                    }  bg-opacity-10 py-3 px-3 d-flex gap-3 align-items-center cursor-pointer text-cmGrey700 w-100`}
                    style={{borderRadius: 10}}
                    onClick={() => navigate('notification')}
                >
                    <KTSVG
                        path='/media/icons/duotune/art/notification.svg'
                        className='cursor-pointer'
                        svgClassName='w-20px h-20px'
                    />
                    <div>Notification</div>
                </div>
            </div>
        </div>
    )
}

export default SettingsSystemSidebar
