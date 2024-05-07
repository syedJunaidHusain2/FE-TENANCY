import React, {useEffect, useState} from 'react'

import {Sidebar} from 'primereact/sidebar'
import moment from 'moment'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {
    getUserRedlineService,
    upComingLocationRedlinesService,
} from '../../../../../../services/Services'
import CustomImage from '../../../../../../customComponents/customImage/CustomImage'
import RedirectToEmployeeProfile from '../../../../../../customComponents/redirectToEmployeeProfile/RedirectToEmployeeProfile'
import {getValidDate} from '../../../../../../constants/constants'
import {formattedNumberFields} from '../../../../../../helpers/CommonHelpers'

export default function ViewLocationRedlineChanges({toggleView, closeToggle, locationData}) {
    const [loading, setLoading] = useState(false)
    const [redlineData, setRedlineData] = useState([])
    useEffect(() => {
        setLoading(true)
        upComingLocationRedlinesService(locationData?.id)
            .then((res) => {
                setRedlineData(res?.data)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [locationData])

    return (
        <>
            <Sidebar
                visible={toggleView}
                position='right'
                onHide={closeToggle}
                className={'w-sm-25 w-100 px-0 mx-0'}
                icons={() => (
                    <div
                        className='w-100'
                        style={{
                            fontSize: '16px',
                            color: '#0D1821',
                            fontFamily: 'Manrope',
                            fontWeight: '700',
                        }}
                    >
                        Redline Changes
                    </div>
                )}
            >
                <div className='' id='kt_explore_body'>
                    <CustomLoader full visible={loading} />
                    <>
                        <div className='py-lg-0 py-5 mx-auto'>
                            <div
                                className='text-cmGrey700 '
                                style={{
                                    fontFamily: 'Manrope',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                }}
                            >
                                First Redline
                            </div>
                            <div
                                style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                className='row py-3 gap-5 me-sm-6 justify-content-between w-100 '
                            >
                                {/* Min */}
                                <div className='col-sm '>
                                    <div className='d-flex align-items-center gap-3'>
                                        <input
                                            type='radio'
                                            style={{marginTop: '1px'}}
                                            id='specifyColor'
                                            // name='radio7'
                                            value='GFG'
                                            checked
                                            readOnly
                                        />
                                        <label
                                            style={{fontSize: '16px', fontWeight: '600'}}
                                            className='text-cmGrey800 '
                                        >
                                            {formattedNumberFields(locationData?.redline_min)}
                                        </label>
                                    </div>
                                </div>

                                <div className='col-sm'>
                                    <div className='d-flex align-items-center gap-3'>
                                        <input
                                            type='radio'
                                            style={{marginTop: '1px'}}
                                            id='specifyColor1'
                                            // name='radio1'
                                            value='GFG'
                                            checked
                                            readOnly
                                            required
                                        />
                                        <label
                                            style={{fontSize: '16px', fontWeight: '600'}}
                                            className='text-cmGrey800 '
                                        >
                                            {formattedNumberFields(locationData?.redline_standard)}
                                        </label>
                                    </div>
                                </div>

                                <div className='col-sm'>
                                    <div className='d-flex align-items-center gap-3 '>
                                        <input
                                            type='radio'
                                            style={{marginTop: '1px'}}
                                            id='specifyColor2'
                                            // name='radio2'
                                            value='GFG'
                                            checked
                                            readOnly
                                        />
                                        <label
                                            style={{fontSize: '16px', fontWeight: '600'}}
                                            className='text-cmGrey800 '
                                        >
                                            {formattedNumberFields(locationData?.redline_max)}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className='py-3 mx-auto d-flex align-items-center gap-5'
                            style={{
                                fontFamily: 'Manrope',
                                fontSize: '14px',
                                fontWeight: '600',
                            }}
                        >
                            <div className='text-nowrap text-cmGrey700'>Effective From:</div>

                            <div className='text-nowrap text-cmGrey800'>
                                {getValidDate(locationData?.effective_date, 'MM/DD/YYYY')}
                            </div>
                        </div>
                        {/* Added by */}
                        <div
                            className='py-3 mx-auto d-flex flex-wrap align-items-center gap-5'
                            style={{
                                fontFamily: 'Manrope',
                                fontSize: '14px',
                                fontWeight: '600',
                            }}
                        >
                            <div className='text-cmGrey700 text-nowrap'>Added By:</div>

                            <div className='text-nowrap'>
                                <CustomImage
                                    src={locationData?.created_by?.image}
                                    className='avatar me-3'
                                />
                                {locationData?.created_by?.first_name ?? '-'}
                                {locationData?.created_by?.last_name ?? '-'}
                            </div>
                        </div>
                        <hr></hr>
                    </>
                    {redlineData?.map((item) => (
                        <div key={item?.id}>
                            <div className='py-lg-0 py-5 mx-auto mt-5'>
                                <div
                                    className='text-cmGrey700 d-flex justify-content-between'
                                    style={{
                                        fontFamily: 'Manrope',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                    }}
                                >
                                    Changes
                                </div>
                                <div
                                    style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                    className='row py-3 gap-5 me-sm-6 justify-content-between w-100 '
                                >
                                    {/* Min */}
                                    <div className='col-sm '>
                                        <div className='d-flex align-items-center gap-3'>
                                            <input
                                                type='radio'
                                                style={{marginTop: '1px'}}
                                                id='specifyColor'
                                                // name='radio7'
                                                value='GFG'
                                                checked
                                                readOnly
                                            />
                                            <label
                                                style={{fontSize: '16px', fontWeight: '600'}}
                                                className='text-cmGrey800 '
                                            >
                                                {formattedNumberFields(item?.redline_min)}
                                            </label>
                                        </div>
                                    </div>

                                    <div className='col-sm'>
                                        <div className='d-flex align-items-center gap-3'>
                                            <input
                                                type='radio'
                                                style={{marginTop: '1px'}}
                                                id='specifyColor1'
                                                // name='radio1'
                                                value='GFG'
                                                checked
                                                readOnly
                                                required
                                            />
                                            <label
                                                style={{fontSize: '16px', fontWeight: '600'}}
                                                className='text-cmGrey800 '
                                            >
                                                {formattedNumberFields(item?.redline_standard)}
                                            </label>
                                        </div>
                                    </div>

                                    <div className='col-sm'>
                                        <div className='d-flex align-items-center gap-3 '>
                                            <input
                                                type='radio'
                                                style={{marginTop: '1px'}}
                                                id='specifyColor2'
                                                // name='radio2'
                                                value='GFG'
                                                checked
                                                readOnly
                                            />
                                            <label
                                                style={{fontSize: '16px', fontWeight: '600'}}
                                                className='text-cmGrey800 '
                                            >
                                                {formattedNumberFields(item?.redline_max)}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Date */}
                            <div
                                className='py-3 mx-auto d-flex align-items-center gap-5'
                                style={{
                                    fontFamily: 'Manrope',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                }}
                            >
                                <div className='text-cmGrey700'>Effective From:</div>

                                <div className='text-cmGrey800'>
                                    {getValidDate(item?.effective_date, 'MM-DD-YYYY')}
                                </div>
                            </div>

                            <div
                                className='py-3 mx-auto d-flex align-items-center gap-5'
                                style={{
                                    fontFamily: 'Manrope',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                }}
                            >
                                <div className='text-cmGrey700'>Updated By:</div>

                                <div className='col-sm-6'>
                                    <RedirectToEmployeeProfile employeeId={item?.id}>
                                        <CustomImage
                                            src={item?.updated_by?.image}
                                            className='avatar me-3'
                                        />{' '}
                                        {`${item?.updated_by?.first_name} ${item?.updated_by?.last_name}` ??
                                            '-'}
                                    </RedirectToEmployeeProfile>
                                </div>
                            </div>
                            <hr></hr>
                        </div>
                    ))}
                </div>
            </Sidebar>
        </>
    )
}
