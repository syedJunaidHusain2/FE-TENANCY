import React from 'react'
import clsx from 'clsx'
import moment from 'moment'
import {useState} from 'react'
import DatePicker from 'react-datepicker'
import {KTSVG} from '../../../../../_metronic/helpers'
import MarketingTable from './MarketingTable'

const MarketingDealCard = () => {
    const [startDate, setStartDate] = useState(moment().add(-30, 'day').toDate())
    const [endDate, setEndDate] = useState(new Date())
    return (
        <div style={{borderRadius: '0px 10px 10px 10px'}}>
            <div className='w-100 mb-3 d-sm-flex flex-wrap justify-content-between align-items-center bg-white py-5 px-5 shadow-sm'>
                {/* Search tab */}
                <div
                    style={{borderRadius: '20px'}}
                    className='w-sm-275px w-75 mx-sm-0 mx-auto mb-1 me-sm-12'
                    id='kt_chat_contacts_header'
                >
                    <form
                        className='position-relative'
                        style={{borderRadius: '90px'}}
                        autoComplete='off'
                    >
                        <KTSVG
                            path='/media/icons/duotune/general/gen021.svg'
                            className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-3 translate-middle-y'
                        />

                        <input
                            style={{
                                borderRadius: '10px',
                            }}
                            type='text'
                            className='form-control form-control-solid px-12 bg-cmGrey100 text-cmGrey900'
                            name='search'
                            placeholder='Search'
                        />
                    </form>
                </div>

                {/* DropDown */}

                {/* search date */}
                <div className='d-sm-flex flex-wrap align-items-center my-sm-0 my-5 text-center'>
                    <div
                        style={{
                            overflow: 'hidden',
                            borderRadius: '6px',
                        }}
                        className='form-group  d-flex flex-row mx-auto bg-cmGrey100 w-sm-150px'
                    >
                        <label className='mt-3'>
                            <i className='bi bi-calendar-week fs-4 me-3 pt-2 mt-4 ms-3'></i>
                        </label>
                        <DatePicker
                            className='border-0 bg2 text-cmGrey800 fw-bold'
                            placeholderText={'Start Date'}
                            // onChange={(event) => setStartDate(moment(event).format('YYYY-MM-DD'))}
                            name='startDate'
                            dateFormat='YYYY-MM-DD'
                            clearIcon={false}
                            calendarIcon={false}
                            // value={startDate}
                        />
                    </div>
                    <label className='m-4 ms-6 me-6 text-cmGrey600' style={{fontWeight: '500'}}>
                        to
                    </label>
                    <div
                        style={{
                            overflow: 'hidden',
                            borderRadius: '6px',
                        }}
                        className='form-group bg-cmGrey100 d-flex flex-row mx-auto  w-sm-150px'
                    >
                        <label className='mt-3'>
                            <i className='bi bi-calendar-week fs-4 me-3 pt-2 mt-4 ms-3'></i>
                        </label>
                        <DatePicker
                            className='border-0 bg2 fw-bold'
                            placeholderText={'End Date'}
                            onChange={(event) => setEndDate(moment(event).format('YYYY-MM-DD'))}
                            name='startDate'
                            dateFormat='YYYY-MM-DD'
                            clearIcon={false}
                            calendarIcon={false}
                            // value={endDate}
                        />
                    </div>
                </div>

                {/* Export */}
                <div className='text-center'>
                    <a
                        href='/'
                        className={clsx(
                            'btn btn-sm btn-flex justify-content-center fw-bold text-cmGrey600 bg-cmGrey100 me-5    '
                        )}
                        data-kt-menu-trigger='click'
                        data-kt-menu-placement='bottom-end'
                        style={{
                            fontSize: '14px',
                            fontFamily: 'Manrope',
                            fontWeight: '600',
                        }}
                    >
                        <KTSVG
                            path='/media/icons/duotune/general/gen031.svg'
                            className='me-3 svg-icon-6 svg-icon-muted me-1'
                        />
                        Export
                    </a>

                    <a
                        href='/'
                        className={clsx(
                            'btn btn-sm btn-flex justify-content-center fw-bold text-cmGrey600 bg-cmGrey100'
                        )}
                        data-kt-menu-trigger='click'
                        data-kt-menu-placement='bottom-end'
                        style={{
                            fontSize: '14px',
                            fontFamily: 'Manrope',
                            fontWeight: '600',
                        }}
                    >
                        <KTSVG
                            path='/media/icons/duotune/general/gen031.svg'
                            className='me-3 svg-icon-6 svg-icon-muted me-1'
                        />
                        Export
                    </a>

                    <a className='me-0'>
                        <button
                            style={{
                                fontSize: '14px',
                                fontStyle: '600',
                            }}
                            className='btn btn-sm btn-icon mt-2 btn-bg-white btn-active-color-primary'
                        >
                            <i
                                style={{marginTop: '-6px'}}
                                className='bi ms-4 bi-three-dots-vertical text-cmGrey800 fs-3'
                            ></i>
                        </button>
                    </a>
                </div>
            </div>
            <div>
                <MarketingTable />
            </div>
        </div>
    )
}

export default MarketingDealCard
