import React, {useState} from 'react'
import {KTSVG} from '../../../../../../_metronic/helpers'
import clsx from 'clsx'
import Select from '../../Icon/select.png'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import Card from './Crad'
import CustomArrow, {
    ARROW_DIRECTION,
} from '../../../../../../customComponents/customIcons/CustomIcons'
export default function Company() {
    const [value, setValue] = useState()
    const handledate = (event) => {
        setValue(moment(event).format('MM-DD-YYYY'))
    }
    return (
        <>
            <div className='card shadow-none'>
                <div className='card-body shadow-none'>
                    <div className='bg-white' style={{fontSize: '14px', fontFamily: 'Manrope'}}>
                        <div className='w-100 mt-5 d-flex flex-wrap justify-content-between'>
                            <div
                                className=' mb-2 mt- d-flex flex-row mt-2'
                                id='kt_chat_contacts_header'
                            >
                                <label
                                    style={{
                                        color: '#212121',
                                        fontFamily: 'Manrope',
                                        fontWeight: 'bold',
                                        fontSize: '17px',
                                    }}
                                >
                                    Location:
                                    <label
                                        style={{fontWeight: '400', fontFamily: 'Manrope'}}
                                        className='ms-2'
                                    >
                                        All <CustomArrow arrowDirection={ARROW_DIRECTION.down} />
                                    </label>
                                </label>
                            </div>
                            <label
                                className='mb-4 d-flex flex-row w-175px'
                                style={{
                                    borderRadius: '6px',
                                    height: '43px',
                                    fontSize: '14px',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <select
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '800',
                                    }}
                                    name='status'
                                    className='form-select form-select-black form-select-sm bg-cmGrey200 cursor-pointer'
                                >
                                    <option value='$ per KW'>This Year</option>
                                </select>
                            </label>
                            <div className='d-flex flex-row flex-wrap'>
                                <div
                                    style={{
                                        background: '#F5F5F5',
                                        overflow: 'hidden',
                                        borderRadius: '6px',
                                    }}
                                    className='form-group mb-4 d-flex flex-row'
                                >
                                    <label className='mt-3' style={{background: '#F5F5F5'}}>
                                        <i
                                            style={{
                                                color: '#d8d8d8',
                                                background: '#F5F5F5                      ',
                                                fontSize: '20px',
                                            }}
                                            className='bi bi-calendar4 me-3 pt-2 mt-4 ms-3'
                                        ></i>
                                    </label>
                                    <DatePicker
                                        className='border-0 bg2'
                                        placeholderText={'Start Date'}
                                        onChange={(event) => handledate(event)}
                                        name='startDate'
                                        dateFormat='MM/dd/yyyy'
                                        clearIcon={false}
                                        calendarIcon={false}
                                        value={value}
                                    />
                                </div>
                                <label className='m-4 ms-6 me-6' style={{color: '#757575'}}>
                                    to
                                </label>
                                <div
                                    style={{
                                        background: '#F5F5F5',
                                        overflow: 'hidden',
                                        borderRadius: '6px',
                                    }}
                                    className='form-group mb-4 d-flex flex-row'
                                >
                                    <label className='mt-3' style={{background: '#F5F5F5'}}>
                                        <i
                                            style={{
                                                color: '#d8d8d8',
                                                background: '#F5F5F5                      ',
                                                fontSize: '20px',
                                            }}
                                            className='bi bi-calendar4 me-3 pt-2 mt-4 ms-3'
                                        ></i>
                                    </label>
                                    <DatePicker
                                        className='border-0 bg2'
                                        placeholderText={'End Date'}
                                        onChange={(event) => handledate(event)}
                                        name='startDate'
                                        dateFormat='MM/dd/yyyy'
                                        clearIcon={false}
                                        calendarIcon={false}
                                        value={value}
                                    />
                                </div>
                            </div>
                            <div className=' '>
                                <a
                                    href=''
                                    className={clsx('btn btn-sm btn-flex fw-bold')}
                                    data-kt-menu-trigger='click'
                                    data-kt-menu-placement='bottom-end'
                                    style={{
                                        background: '#F5F5F5',
                                        color: '#757575',
                                        fontSize: '14px',
                                        fontFamily: 'Manrope',
                                        width: '99px',
                                        height: '43px',
                                    }}
                                >
                                    <KTSVG
                                        path='/media/icons/duotune/general/gen031.svg'
                                        className='me-3 svg-icon-6 svg-icon-muted me-1'
                                    />
                                    Export
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Card />
        </>
    )
}
