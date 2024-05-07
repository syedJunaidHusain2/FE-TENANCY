/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {getRecentlyHiredListService} from '../../../../../services/Services'

import {formattedPhoneNumber} from '../../../../../helpers/CommonHelpers'

const RecentlyHiredList = ({className, selectedLocation}) => {
    const [data, setData] = useState([])

    useEffect(() => {
        if (selectedLocation) {
            getRecentlyHiredListService(selectedLocation).then((res) => {
                // setData(res?.data?.reverse())
                setData(res?.data)
            })
        }
    }, [selectedLocation])

    return (
        <div
            className={`card ${className} shadow-sm`}
            style={{fontFamily: 'Manrope', borderRadius: 10}}
        >
            {/* begin::Header */}
            <div className='ps-6 pt-6 border-0 py-0 '>
                <div
                    className=' fw-bold text-cmGrey900 '
                    style={{fontSize: '16px', fontWeight: '700'}}
                >
                    Recently Hired
                </div>
            </div>
            <div className='my-3 mx-6 border border-cmGrey200' />
            {/* end::Header */}
            {/* begin::Body */}
            <div className='card-body pt-2 mx-3'>
                {data?.length <= 0 ? (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <p>No data found</p>
                    </div>
                ) : (
                    <div>
                        {data?.length > 0 &&
                            data?.map((item) => (
                                <div key={item.id}>
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <span
                                                style={{
                                                    fontWeight: '500',
                                                    fontSize: '14px',
                                                    fontFamily: 'Manrope',
                                                }}
                                                className='text-cmGrey800'
                                            >
                                                {item?.first_name} {item?.last_name}
                                            </span>
                                            <span
                                                className={
                                                    `badge ms-2` +
                                                    (item.position_name === 'Setter'
                                                        ? ' bg-cminfo bg-opacity-10 text-cminfo'
                                                        : ' bg-info bg-opacity-10 text-info')
                                                }
                                                style={{
                                                    fontSize: '12px',
                                                    fontWeight: '500',
                                                }}
                                            >
                                                {item?.sub_position_name}
                                            </span>
                                        </div>
                                        <div
                                            className='text-cmGrey700'
                                            style={{fontWeight: '500', fontSize: '14px'}}
                                        >
                                            {formattedPhoneNumber(item?.mobile_no)}
                                        </div>
                                    </div>
                                    <hr style={{borderTop: '1px dashed grey'}} />
                                </div>
                            ))}
                    </div>
                )}
            </div>
            {/* end::Body */}
        </div>
    )
}

export {RecentlyHiredList}
