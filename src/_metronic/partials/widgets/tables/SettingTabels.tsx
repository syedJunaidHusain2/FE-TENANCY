/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTSVG} from '../../../helpers'

type Props = {
    className: string
}

const SettingTables: React.FC<Props> = ({className}) => {
    return (
        <div className={`card  ${className}`}>
            {/* begin::Header */}
            <div className='card-body py-0 px-0 mx-0' style={{marginTop: '-19px'}}>
                {/* begin::Table container */}
                <div className='table-responsive '>
                    {/* begin::Table */}
                    <table className='table table-row-bordered table-row-gray-100  gs-0 gy-3'>
                        {/* begin::Table head */}
                        <thead>
                            <tr
                                className='fw-bold text-muted'
                                style={{
                                    background: '#EEEEEE',
                                    color: '#212121',
                                    height: '48px',
                                    fontSize: '14px',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <th className='w-25px'>
                                    <div className='ms-14 form-check form-check-sm form-check-custom form-check-solid'>
                                        <input
                                            className='form-check-input'
                                            type='checkbox'
                                            value='1'
                                            data-kt-check='true'
                                            data-kt-check-target='.widget-13-check'
                                        />
                                    </div>
                                </th>
                                {/* <th className='min-w-150px' style={{color: 'grey'}}>
                  Order Id
                </th> */}

                                <th className='min-w-140px' style={{color: '#212121'}}>
                                    Override Type{' '}
                                </th>
                                <th className='min-w-120px' style={{color: '#212121'}}>
                                    Lock Pay Out Type{' '}
                                </th>
                                <th className='min-w-120px' style={{color: '#212121'}}>
                                    Max Limit{' '}
                                    <i
                                        className='bi bi-exclamation-circle ms-1 '
                                        style={{color: '#616161'}}
                                    ></i>
                                </th>
                                <th className='min-w-120px' style={{color: '#212121'}}>
                                    Personnel Limit{' '}
                                    <i
                                        className='bi bi-exclamation-circle ms-1 '
                                        style={{color: '#616161'}}
                                    ></i>
                                </th>
                                <th className='min-w-120px' style={{color: '#212121'}}>
                                    Min Position{' '}
                                    <i
                                        className='bi bi-exclamation-circle ms-1 '
                                        style={{color: '#616161'}}
                                    ></i>
                                </th>
                                <th className='min-w-100px text-end' style={{color: '#212121'}}>
                                    Level{' '}
                                    <i
                                        className='bi bi-exclamation-circle ms-1 '
                                        style={{color: '#616161'}}
                                    ></i>
                                </th>
                                <th className='min-w-120px'></th>
                                <th className='min-w-140px'></th>
                            </tr>
                        </thead>

                        {/* end::Table head */}
                        {/* begin::Table body */}
                        <tbody>
                            <tr>
                                <td>
                                    <div className=''>
                                        {/* <input className='form-check-input widget-13-check' type='checkbox' value='1' /> */}
                                    </div>
                                </td>
                                <td>
                                    <a
                                        href='#'
                                        className='text-dark fw-bold text-hover-primary fs-6'
                                    >
                                        Direct Overrides
                                    </a>
                                </td>
                                <td style={{color: '#757575', fontFamily: 'Manrope'}}>None</td>
                                <td>
                                    <span style={{color: '#757575'}}> $ 0</span>
                                </td>
                                <td style={{color: '#757575'}}>0 </td>
                                <td className=' text-hover-primary fs-6' style={{color: '#757575'}}>
                                    Name
                                </td>
                                {/* <td>
                  <span className='badge badge-light-success'>D1</span>
                </td> */}
                            </tr>

                            <tr
                                style={{background: '#F9F9F9', height: '55px'}}
                                className='mx-0 px-0'
                            >
                                <td>
                                    <div className='ms-14 form-check form-check-sm form-check-custom form-check-solid'>
                                        {/* <input className='form-check-input widget-13-check' type='checkbox' value='1' /> */}
                                    </div>
                                </td>
                                <td>
                                    <a
                                        href='#'
                                        className='text-dark fw-bold text-hover-primary fs-6'
                                    >
                                        Indirect Overrides
                                    </a>
                                </td>
                                <td style={{color: '#757575', fontFamily: 'Manrope'}}>None</td>
                                <td>
                                    <span style={{color: '#757575'}}> $ 0</span>
                                </td>
                                <td style={{color: '#757575'}}>0 </td>
                                <td className=' text-hover-primary fs-6' style={{color: '#757575'}}>
                                    Name
                                </td>
                                <td className='ms-20'>
                                    <span
                                        className='ms-20'
                                        style={{
                                            fontFamily: 'Manrope ',
                                            color: '#424242',
                                            fontSize: '14px',
                                        }}
                                    >
                                        D1
                                    </span>
                                </td>
                                <td></td>
                                <td></td>
                                {/* <td></td> */}
                            </tr>

                            <tr>
                                <td>
                                    <div className='ms-14 form-check form-check-sm form-check-custom form-check-solid'>
                                        {/* <input className='form-check-input widget-13-check' type='checkbox' value='1' /> */}
                                    </div>
                                </td>
                                <td>
                                    <a
                                        href='#'
                                        className='text-dark fw-bold text-hover-primary fs-6'
                                    >
                                        Office Overrides
                                    </a>
                                </td>
                                <td style={{color: '#757575', fontFamily: 'Manrope'}}>None</td>
                                <td>
                                    <span style={{color: '#757575'}}> $ 0</span>
                                </td>
                                <td style={{color: '#757575'}}>0 </td>
                                <td className=' text-hover-primary fs-6' style={{color: '#757575'}}>
                                    Name
                                </td>
                                {/* <td>
                  <span className='badge badge-light-success'>D1</span>
                </td> */}
                            </tr>
                        </tbody>
                        {/* end::Table body */}
                    </table>
                    {/* end::Table */}
                </div>
                {/* end::Table container */}
            </div>
            {/* begin::Body */}
        </div>
    )
}

export {SettingTables}
