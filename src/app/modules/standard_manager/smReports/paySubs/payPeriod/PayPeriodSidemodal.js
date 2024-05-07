import React, {useEffect, useState} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
export default function PayPeriodSidemodal({
    data,
    setData,
    editposition,
    setEditPosition,
    list,
    getPositionid,
    position,
    setPosition,
    edit,
    setEdit,
    override,
    setOverrides,
    deductions,
    setDeduction,
    setLoader,
}) {
    return (
        // <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Toggle right offcanvas</button>
        <div
            style={{overflowY: 'auto'}}
            className='offcanvas offcanvas-end w-md-500px'
            tabindex='-1'
            id='offcanvasRight3'
            aria-labelledby='offcanvasRightLabel'
        >
            <div className='card shadow-none w-100' style={{fontSize: '14px'}}>
                <div className='d-flex flex-row align-items-center justify-content-between ms-2 ms-9 py-3'>
                    <div
                        className='ms-2 text-cmblack'
                        style={{
                            fontSize: '16px',

                            fontFamily: 'Manrope',
                        }}
                    >
                        Jennifer Brown
                    </div>
                    <div
                        className='btn-close'
                        data-bs-dismiss='offcanvas'
                        aria-label='Close'
                        className='btn btn-sm me-4  btn-icon btn-active-color-primary'
                    >
                        <i
                            className='bi bi-x-circle'
                            style={{fontSize: '22px', color: '#616161'}}
                        ></i>
                    </div>
                </div>
                <div className='mt-0' style={{borderBottom: '1px solid #EFF2F5'}}></div>
                <div
                    style={{overflowX: 'hidden', fontSize: '14px'}}
                    className='card-body'
                    id='kt_explore_body'
                >
                    <div
                        id='kt_explore_scroll'
                        className='scroll-y me-n5 pe-5 d-flex justify-content-center flex-column mt-6'
                        data-kt-scroll='true'
                        data-kt-scroll-height='auto'
                        data-kt-scroll-wrappers='#kt_engage_demos_body'
                        data-kt-scroll-dependencies='#kt_engage_demos_header'
                        data-kt-scroll-offset='5px'
                    >
                        <div className='d-flex justify-content-center'>
                            <div
                                className='container w-md-400px ms-14'
                                style={{
                                    fontSize: '14px',
                                    marginLeft: '-3px',
                                    color: '#757575',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <div className='row g-2'>
                                    <div className='col-4  d-flex flex-row text-cmGrey800'>
                                        03/09/2022
                                        <label
                                            className='ms-4 mt-1'
                                            style={{
                                                width: '13px',
                                                borderRadius: '50%',
                                                height: '13px',
                                                border: '3px solid #FF3333',
                                            }}
                                        ></label>
                                    </div>
                                    <div
                                        className='col-5 badge bg-cmOrange p-2 text-cmBlack'
                                        style={{fontSize: '14px', marginLeft: '-10px'}}
                                    >
                                        Account Acquired
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className='container w-md-400px ms-sm-12 '
                            style={{
                                fontSize: '14px',
                                fontFamily: 'Manrope',
                            }}
                        >
                            <div className='row g-2'>
                                <div className='col-3 d-flex flex-row text-cmGrey800'></div>
                                <div className='col-3 ms-2'>
                                    <div
                                        style={{
                                            background: '#D0D0D0',
                                            width: '3px',
                                            height: '40px',
                                            marginLeft: '1px',
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <div
                                className='container w-md-400px ms-14 text-cmGrey600'
                                style={{
                                    fontSize: '14px',
                                    marginLeft: '-3px',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <div className='row g-2'>
                                    <div
                                        className='col-4  d-flex flex-row'
                                        style={{color: '#3F4254'}}
                                    >
                                        03/09/2022
                                        <label
                                            className='ms-4 mt-1'
                                            style={{
                                                width: '13px',
                                                borderRadius: '50%',
                                                height: '13px',
                                                border: '3px solid #00C247',
                                            }}
                                        ></label>
                                    </div>
                                    <div className='col-8' style={{marginLeft: '-10px'}}>
                                        Setter Paid{' '}
                                        <label
                                            className='ms-5'
                                            style={{
                                                textDecoration: 'underline',
                                                color: '#424242',
                                                fontFamily: 'Manrope',
                                                fontWeight: 'bold',
                                                marginTop: '-6px',
                                            }}
                                        >
                                            <img
                                                src={toAbsoluteUrl('/media/avatars/300-1.jpg')}
                                                className='avatar me-3'
                                            />{' '}
                                            Annette Black
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className='container w-md-400px ms-sm-12 '
                            style={{
                                fontSize: '14px',
                                color: '#757575',
                                fontFamily: 'Manrope',
                            }}
                        >
                            <div className='row g-2'>
                                <div
                                    className='col-3 d-flex flex-row'
                                    style={{color: '#3F4254'}}
                                ></div>
                                <div className='col-3 ms-2'>
                                    <div
                                        style={{
                                            background: '#D0D0D0',
                                            width: '3px',
                                            height: '40px',
                                            marginTop: '-5px',
                                            marginLeft: '1px',
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className='d-flex justify-content-center'>
                            <div
                                className='container w-md-400px ms-14'
                                style={{
                                    fontSize: '14px',
                                    marginLeft: '-3px',
                                    color: '#757575',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <div className='row g-2'>
                                    <div
                                        className='col-4  d-flex flex-row'
                                        style={{color: '#3F4254'}}
                                    >
                                        03/09/2022
                                        <label
                                            className='ms-4 mt-1'
                                            style={{
                                                width: '13px',
                                                borderRadius: '50%',
                                                height: '13px',
                                                border: '3px solid #00C247',
                                            }}
                                        ></label>
                                    </div>
                                    <div className='col-8' style={{marginLeft: '-10px'}}>
                                        Setter Paid{' '}
                                        <label
                                            className='ms-5'
                                            style={{
                                                textDecoration: 'underline',
                                                color: '#424242',
                                                fontFamily: 'Manrope',
                                                fontWeight: 'bold',
                                                marginTop: '-6px',
                                            }}
                                        >
                                            <img
                                                src={toAbsoluteUrl('/media/avatars/300-1.jpg')}
                                                className='avatar me-3'
                                            />{' '}
                                            Annette Black
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <yyy */}
                    </div>
                </div>
            </div>
        </div>
    )
}
