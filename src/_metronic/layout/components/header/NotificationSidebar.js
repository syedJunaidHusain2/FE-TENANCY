import {Sidebar} from 'primereact/sidebar'
import React, {useState} from 'react'
import {fontsFamily} from '../../../../assets/fonts/fonts'
import {KTSVG} from '../../../helpers'
import CustomLink from '../../../../customComponents/customButtton/CustomLink'

const NotificationSidebar = ({open, onClose}) => {
    const [notificationData, setNotificationData] = useState([1, 2])

    return (
        <Sidebar
            visible={open}
            position='right'
            onHide={onClose}
            showCloseIcon={false}
            // className={'p-sidebar-md '}
            className={'w-sm-25 w-100'}
            icons={() => (
                <div className='d-flex align-items-center my-2 justify-content-between  w-100 '>
                    <div
                        className='text-cmBlack'
                        style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            lineHeight: '24px',
                            fontFamily: fontsFamily.manrope,
                        }}
                    >
                        Notifications (6)
                    </div>
                    <div
                        className='bi bi-x-lg fs-3 bg-hover-cmGrey200 text-cmBlack rounded-circle px-1 '
                        onClick={onClose}
                    ></div>
                </div>
            )}
        >
            <div
                className='d-flex align-items-center gap-5 text-cmGrey500'
                style={{fontSize: '14px', fontWeight: 700}}
            >
                <KTSVG
                    path='/media/icons/duotune/art/Double-Check.svg'
                    className='cursor-pointer'
                    svgClassName='w-20px '
                />
                <div>Mark all as read</div>
            </div>
            {notificationData.map((i) => (
                <div
                    className='ps-0 p-5 border-bottom border-cmGrey200'
                    style={{fontSize: '14px', fontWeight: 600}}
                >
                    <div className='d-flex gap-3 align-items-center'>
                        <i class='bi bi-circle-fill fs-9 text-cmgreen'></i>
                        <div className='text-cmBlack' style={{fontWeight: 700}}>
                            Integrations done!
                        </div>
                    </div>
                    <div className='d-flex gap-3 align-items-center mb-2'>
                        <i class='text-cmwhite bi bi-circle-fill fs-9'></i>
                        <div className='text-cmGrey600'>
                            Hubspot has been successfully integrate.
                        </div>
                    </div>
                    <div className='d-flex gap-3 align-items-center'>
                        <i class='text-cmwhite bi bi-circle-fill fs-9'></i>
                        <div>
                            <CustomLink label={'View Now'} />
                        </div>
                    </div>
                </div>
            ))}
        </Sidebar>
    )
}

export default NotificationSidebar
