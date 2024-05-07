import React, {useState} from 'react'
import Select from '../../Icon/select.png'

import {KTSVG} from '../../../../../../_metronic/helpers'
import {Sidebar} from 'primereact/sidebar'
export default function ViewSummary({open, close}) {
    const [edit, setEdit] = useState(false)
    return (
        <>
            <Sidebar
                visible={open}
                position='right'
                onHide={close}
                showCloseIcon={false}
                className={'w-25'}
                icons={() => (
                    <div className='d-flex align-items-center my-2 justify-content-between  w-100 '>
                        <div
                            style={{
                                fontSize: '16px',
                                color: '#0D1821',
                                fontFamily: 'Manrope',
                                fontWeight: '700',
                            }}
                        >
                            Summary
                        </div>
                        <button
                            onClick={close}
                            style={{border: '1px solid #6078EC', marginTop: '-3px'}}
                            className=' btn btn-flex h-35px bg-body  shadow-sm fs-7 px-3 '
                        >
                            <span style={{color: '#6078EC'}}>Close Summary</span>
                        </button>
                    </div>
                )}
            >
                <div className=''>
                    <div style={{borderBottom: '1px solid #EEEEEE'}}></div>
                    <div className=' d-flex justify-content-center flex-column mt-10'>
                        <div className='d-flex justify-content-center'>
                            <div className='shadow mb-5 bg-white rounded'>
                                <div className='' style={{fontSize: '14px'}}>
                                    <div className='row g-2  p-2'>
                                        <div
                                            className='col-6 mt-4'
                                            style={{color: '#212121', fontFamily: 'Manrope'}}
                                        >
                                            Payroll Period
                                        </div>
                                        <div
                                            className='col-6 mt-4'
                                            style={{
                                                color: '#004CE8',
                                                textDecoration: 'underline',
                                                fontSize: '12px',
                                                fontFamily: 'Manrope',
                                                marginLeft: '-5px',
                                            }}
                                        >
                                            View past reports
                                        </div>
                                    </div>
                                </div>

                                <div className='container' style={{fontSize: '14px'}}>
                                    <div
                                        className='ms-4 mt-1  mb-1 text-black fw-bold d-flex flex-row'
                                        style={{
                                            background: '#EEEEEE',
                                            borderRadius: '6px',
                                            height: '43px',
                                            fontSize: '14px',
                                        }}
                                    >
                                        <select
                                            style={{
                                                fontWeight: 'bold',
                                                fontFamily: 'Manrope',
                                            }}
                                            name='status'
                                            defaultValue='1'
                                            className='form-select text-black fw-bold form-select-black form-select-sm bg-cmGrey200 cursor-pointer'
                                        >
                                            <option value='$ per KW'>03/23/22 - 03/30/22</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='container' style={{fontSize: '14px'}}>
                                    <div className='row g-2 p-2'>
                                        <div
                                            className='col-7 mt-4'
                                            style={{color: '#212121', fontFamily: 'Manrope'}}
                                        >
                                            Payroll Summary
                                        </div>
                                        <div
                                            className='col-5 mt-4'
                                            style={{
                                                color: '#00C247',
                                                marginLeft: '-5px',
                                            }}
                                        >
                                            <i
                                                style={{color: '#00C247'}}
                                                className='bi bi-arrow-up'
                                            ></i>
                                            10%
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className='container ms-1'
                                    style={{
                                        fontSize: '14px',
                                        color: '#757575',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <div className='row g-2 p-2 me-2'>
                                        <div className='col-6 mt-2'>Total (M1)</div>
                                        <div className='col-6 mt-2 text-end'>$106.58</div>
                                    </div>
                                </div>
                                <div
                                    className='container ms-1'
                                    style={{
                                        fontSize: '14px',
                                        color: '#757575',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <div className='row g-2 p-2 me-2'>
                                        <div className='col-6 mt-2'>Total (M2)</div>
                                        <div className='col-6 mt-2 text-end'>$106.58</div>
                                    </div>
                                </div>
                                <div
                                    className='container ms-1'
                                    style={{
                                        fontSize: '14px',
                                        color: '#757575',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <div className='row g-2 p-2 me-2'>
                                        <div className='col-6 mt-2'>Total Overrides</div>
                                        <div className='col-6 mt-2 text-end'>$106.58</div>
                                    </div>
                                </div>
                                <div
                                    className='container ms-1'
                                    style={{
                                        fontSize: '14px',
                                        color: '#757575',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <div className='row g-2 p-2 me-2'>
                                        <div className='col-8 mt-2'>Total Adjustments</div>
                                        <div className='col-4 mt-2 text-end'>$106.58</div>
                                    </div>
                                </div>

                                <div
                                    className='container ms-1'
                                    style={{
                                        fontSize: '14px',
                                        color: '#757575',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <div className='row g-2 p-2 me-2'>
                                        <div className='col-9 mt-3'>Total Reimbursements</div>
                                        <div className='col-3 mt-3 text-end'>$106</div>
                                    </div>
                                </div>
                                <div
                                    className='container ms-1'
                                    style={{
                                        fontSize: '14px',
                                        color: '#757575',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <div className='row g-2 p-2 me-2'>
                                        <div className='col-7 mt-3'>Total Deduction</div>
                                        <div className='col-5 mt-3 text-end'>$106</div>
                                    </div>
                                </div>

                                <div
                                    className='container'
                                    style={{fontSize: '14px', marginLeft: '1px'}}
                                >
                                    <div className='row g-2 p-2 ms-0'>
                                        <div
                                            className='col-6 mt-4'
                                            style={{
                                                color: '#212121',
                                                fontWeight: 'bold',
                                                fontFamily: 'Manrope',
                                            }}
                                        >
                                            Total Payroll
                                        </div>
                                        <div
                                            className='col-6 mt-4 text-end me-0'
                                            style={{
                                                color: '#212121',
                                                fontWeight: 'bold',
                                                fontFamily: 'Manrope',
                                            }}
                                        >
                                            $111,404
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <div className='shadow mt-3 w-md-250px d-flex justify-content-center h-md-200px mb-5 bg-white rounded'>
                                <div className='container' style={{fontSize: '14px'}}>
                                    <div className='row g-2 p-2 mt-0'>
                                        <div
                                            className='mt-4'
                                            style={{
                                                color: '#212121',
                                                fontWeight: 'bold',
                                                fontFamily: 'Manrope',
                                            }}
                                        >
                                            Earnings Summary
                                            <label
                                                style={{
                                                    color: '#FF3333',
                                                    marginLeft: '5px',
                                                }}
                                            >
                                                <i
                                                    style={{color: '#FF3333'}}
                                                    className='bi bi-arrow-down'
                                                ></i>
                                                5%
                                            </label>
                                        </div>
                                    </div>

                                    <div
                                        className='container mt-1'
                                        style={{
                                            fontSize: '14px',
                                            marginLeft: '-3px',
                                            color: '#757575',
                                            fontFamily: 'Manrope',
                                        }}
                                    >
                                        <div className='row g-2'>
                                            <div className='col-8 mt-3'>Better Earth PMT</div>
                                            <div className='col-4 mt-3 text-end'>$2,000.00</div>
                                        </div>
                                    </div>
                                    <div
                                        className='container mt-3'
                                        style={{
                                            fontSize: '14px',
                                            marginLeft: '-3px',
                                            color: '#757575',
                                            fontFamily: 'Manrope',
                                        }}
                                    >
                                        <div className='row g-2 me-3'>
                                            <div className='col-8 mt-3'>Legacy Pmt</div>
                                            <div className='col-4 mt-3 text-end'>$106,454.21</div>
                                        </div>
                                    </div>
                                    <div
                                        className='container mt-3'
                                        style={{
                                            fontSize: '14px',
                                            marginLeft: '-2px',
                                            color: '#757575',
                                            fontFamily: 'Manrope',
                                        }}
                                    >
                                        <div className='row g-2 '>
                                            <div className='col-8 mt-3'>SunPower</div>
                                            <div className='col-4 mt-3 text-end'>$3,486.00</div>
                                        </div>
                                    </div>
                                    <div className='container mt-2' style={{fontSize: '14px,'}}>
                                        <div className='row g-2 '>
                                            <div
                                                className='col-6 mt-4'
                                                style={{
                                                    color: '#212121',
                                                    fontWeight: 'bold',
                                                    fontFamily: 'Manrope',
                                                }}
                                            >
                                                Total Earnings
                                            </div>
                                            <div
                                                className='col-6 mt-4 text-end me-0'
                                                style={{
                                                    color: '#212121',
                                                    fontWeight: 'bold',
                                                    fontFamily: 'Manrope',
                                                }}
                                            >
                                                $111,404
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <Payrollby location */}
                        <div className='d-flex justify-content-center'>
                            <div className='shadow mt-3 w-md-250px d-flex justify-content-center h-md-225px bg-white rounded'>
                                <div className='container' style={{fontSize: '14px'}}>
                                    <div className='row g-2 p-2 mt-0'>
                                        <div
                                            className='mt-4'
                                            style={{
                                                color: '#212121',
                                                fontWeight: 'bold',
                                                fontFamily: 'Manrope',
                                            }}
                                        >
                                            Payroll by Location
                                            <label
                                                style={{
                                                    color: '#00C247',
                                                    marginLeft: '5px',
                                                }}
                                            >
                                                <i
                                                    style={{color: '#00C247'}}
                                                    className='bi bi-arrow-up'
                                                ></i>
                                                5%
                                            </label>
                                        </div>
                                    </div>

                                    <div
                                        className='container mt-1'
                                        style={{
                                            fontSize: '14px',
                                            marginLeft: '-3px',
                                            color: '#757575',
                                            fontFamily: 'Manrope',
                                        }}
                                    >
                                        <div className='row g-2'>
                                            <div className='col-8 mt-3'>Florida</div>
                                            <div className='col-4 mt-3 text-end'>$21,006.58</div>
                                        </div>
                                    </div>
                                    <div
                                        className='container mt-3'
                                        style={{
                                            fontSize: '14px',
                                            marginLeft: '-3px',
                                            color: '#757575',
                                            fontFamily: 'Manrope',
                                        }}
                                    >
                                        <div className='row g-2 me-0'>
                                            <div className='col-8 mt-3'>Vermont</div>
                                            <div className='col-4 mt-3 text-end'>$10,454.21</div>
                                        </div>
                                    </div>
                                    <div
                                        className='container mt-3'
                                        style={{
                                            fontSize: '14px',
                                            marginLeft: '-2px',
                                            color: '#757575',
                                            fontFamily: 'Manrope',
                                        }}
                                    >
                                        <div className='row g-2 '>
                                            <div className='col-8 mt-3'>Arizona</div>
                                            <div className='col-4 mt-3 text-end'>$3,486.00</div>
                                        </div>
                                    </div>
                                    <div
                                        className='container mt-3'
                                        style={{
                                            fontSize: '14px',
                                            marginLeft: '-2px',
                                            color: '#757575',
                                            fontFamily: 'Manrope',
                                        }}
                                    >
                                        <div className='row g-2 '>
                                            <div className='col-8 mt-3'>Idaho</div>
                                            <div className='col-4 mt-3 text-end'>$3,486.00</div>
                                        </div>
                                    </div>
                                    <div className='container mt-2' style={{fontSize: '14px,'}}>
                                        <div className='row g-2 '>
                                            <div
                                                className='col-6 mt-4'
                                                style={{
                                                    color: '#212121',
                                                    fontWeight: 'bold',
                                                    fontFamily: 'Manrope',
                                                }}
                                            >
                                                Total Payroll
                                            </div>
                                            <div
                                                className='col-6 mt-4 text-end me-0'
                                                style={{
                                                    color: '#212121',
                                                    fontWeight: 'bold',
                                                    fontFamily: 'Manrope',
                                                }}
                                            >
                                                $111,404
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-2 text-white'>d</div>
                    </div>
                </div>
            </Sidebar>
        </>
    )
}
