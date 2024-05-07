/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTSVG} from '../../../helpers'
import Select from '../../../../app/modules/admin/Setting/Icon/select.png'
type Props = {
    className: string
}

const OverridesTabels: React.FC<Props> = ({className}) => {
    return (
        <div className={`card  ${className}`}>
            {/* begin::Header */}
            <div className='card-body py-0  px-0 mx-0' style={{marginTop: '-19px'}}>
                {/* begin::Table container */}
                <div className='table-responsive'>
                    {/* begin::Table */}
                    <table
                        // style={{marginLeft: '-5px'}}
                        className='table table-row-bordered table-row-gray-100  gs-0 gy-3'
                    >
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
                                    Max Limit
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
                                    <div className='ms-14 form-check form-check-sm form-check-custom form-check-solid'>
                                        <input
                                            className='form-check-input widget-13-check'
                                            type='checkbox'
                                            value='1'
                                        />
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
                                <td>
                                    <div className='d-flex align-items-center'>
                                        <div
                                            className=' mt-1'
                                            style={{
                                                width: '160px',
                                                height: '34px',
                                                borderRadius: '6px',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                marginTop: '',
                                            }}
                                        >
                                            <select
                                                style={{
                                                    width: '160px',
                                                    height: '34px',
                                                    fontWeight: '800',
                                                    color: '#424242',
                                                }}
                                                // style={{background: '#EEEEEE'}
                                                name='status'
                                                data-control='select2'
                                                data-hide-search='true'
                                                className='form-select form-select-black form-select-sm bg-cmGrey200 cursor-pointer'
                                                defaultValue='1'
                                            >
                                                <option value='1'>$ 100 per KW</option>
                                                <option value='1'>$ 100 per KW</option>
                                            </select>
                                        </div>
                                    </div>
                                    {/* <span className='text-muted fw-semibold text-muted d-block fs-7'>Code: PH</span> */}
                                </td>
                                <td>
                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                        <div
                                            style={{
                                                color: '#616161',
                                                marginRight: '5px',
                                                marginTop: '6px',
                                                fontSize: '14px',
                                            }}
                                        >
                                            $
                                        </div>
                                        <div
                                            style={{
                                                width: '50px',
                                                height: '34px',
                                                background: '#FAFAFA',
                                                border: '1px solid #D8D8D8',
                                                color: '#BDBDBD',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <input
                                                style={{
                                                    width: '25px',
                                                    marginLeft: '2px',
                                                    height: '30px',
                                                    background: '#FAFAFA',
                                                    color: '#BDBDBD',
                                                    border: '1px solid #FAFAFA',
                                                }}
                                                value='0'
                                                type='text'
                                            ></input>
                                        </div>
                                    </div>
                                    {/* <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    05/28/2020
                  </a> */}
                                </td>
                                <td>
                                    <div
                                        style={{
                                            width: '50px',
                                            height: '34px',
                                            background: '#FAFAFA',
                                            border: '1px solid #D8D8D8',
                                            color: '#BDBDBD',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <input
                                            style={{
                                                width: '25px',
                                                marginLeft: '2px',
                                                height: '30px',
                                                background: '#FAFAFA',
                                                color: '#BDBDBD',
                                                border: '1px solid #FAFAFA',
                                            }}
                                            value='0'
                                            type='text'
                                        ></input>
                                    </div>
                                </td>
                                <td className='text-dark fw-bold text-hover-primary fs-6'>
                                    <div className='d-flex align-items-center'>
                                        <div
                                            className=' mt-1'
                                            style={{
                                                width: '160px',
                                                height: '34px',
                                                borderRadius: '6px',
                                                fontWeight: '800px',

                                                display: 'flex',
                                                flexDirection: 'row',
                                                marginTop: '',
                                            }}
                                        >
                                            <select
                                                style={{
                                                    width: '160px',
                                                    height: '34px',
                                                    fontWeight: '800px',
                                                    color: '#616161',
                                                    fontFamily: 'Manrope',
                                                    fontStyle: 'Medium',
                                                }}
                                                // style={{background: '#EEEEEE'}
                                                name='status'
                                                data-control='select2'
                                                data-hide-search='true'
                                                className='form-select form-select-black form-select-sm cursor-pointer bg-cmGrey200'
                                                defaultValue='1'
                                            >
                                                <option value='1'>Position</option>
                                                <option value='1'>$ 100 per KW</option>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                                <td className='text-dark fw-bold text-hover-primary fs-6'></td>
                                {/* <td className='text-end'></td> */}
                            </tr>

                            <tr style={{background: '#F9F9F9', height: '55px'}}>
                                <td>
                                    <div className='ms-14 form-check form-check-sm form-check-custom form-check-solid'>
                                        <input
                                            className='form-check-input widget-13-check'
                                            type='checkbox'
                                            value='1'
                                        />
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
                                <td>
                                    <div className='d-flex align-items-center'>
                                        <div
                                            className=' mt-1'
                                            style={{
                                                width: '160px',
                                                height: '34px',
                                                borderRadius: '6px',
                                                fontWeight: '800px',

                                                display: 'flex',
                                                flexDirection: 'row',
                                                marginTop: '',
                                            }}
                                        >
                                            <select
                                                style={{
                                                    width: '160px',
                                                    height: '34px',
                                                    fontWeight: '800',
                                                    color: '#424242',
                                                }}
                                                // style={{background: '#EEEEEE'}
                                                name='status'
                                                data-control='select2'
                                                data-hide-search='true'
                                                className='form-select form-select-black form-select-sm bg-cmGrey200 cursor-pointer'
                                                defaultValue='1'
                                            >
                                                <option value='1'>$ 100 per KW</option>
                                                <option value='1'>$ 100 per KW</option>
                                            </select>
                                        </div>
                                    </div>
                                    {/* <span className='text-muted fw-semibold text-muted d-block fs-7'>Code: PH</span> */}
                                </td>
                                <td>
                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                        <div
                                            style={{
                                                color: '#616161',
                                                marginRight: '5px',
                                                marginTop: '6px',
                                                fontSize: '14px',
                                            }}
                                        >
                                            $
                                        </div>
                                        <div
                                            style={{
                                                width: '50px',
                                                height: '34px',
                                                background: '#FAFAFA',
                                                border: '1px solid #D8D8D8',
                                                color: '#BDBDBD',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <input
                                                style={{
                                                    width: '25px',
                                                    marginLeft: '2px',
                                                    height: '30px',
                                                    background: '#FAFAFA',
                                                    color: '#BDBDBD',
                                                    border: '1px solid #FAFAFA',
                                                }}
                                                value='0'
                                                type='text'
                                            ></input>
                                        </div>
                                    </div>
                                    {/* <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    05/28/2020
                  </a> */}
                                </td>
                                <td>
                                    <div
                                        style={{
                                            width: '50px',
                                            height: '34px',
                                            background: '#FAFAFA',
                                            border: '1px solid #D8D8D8',
                                            color: '#BDBDBD',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <input
                                            style={{
                                                width: '25px',
                                                marginLeft: '2px',
                                                height: '30px',
                                                background: '#FAFAFA',
                                                color: '#BDBDBD',
                                                border: '1px solid #FAFAFA',
                                            }}
                                            value='0'
                                            type='text'
                                        ></input>
                                    </div>
                                </td>
                                <td className='text-dark fw-bold text-hover-primary fs-6'>
                                    <div className='d-flex align-items-center'>
                                        <div
                                            className=' mt-1'
                                            style={{
                                                width: '160px',
                                                height: '34px',
                                                borderRadius: '6px',

                                                display: 'flex',
                                                flexDirection: 'row',
                                                marginTop: '',
                                            }}
                                        >
                                            <select
                                                style={{
                                                    width: '160px',
                                                    height: '34px',
                                                    fontWeight: '800',

                                                    fontFamily: 'Manrope',
                                                    fontStyle: 'Medium',
                                                }}
                                                // style={{background: '#EEEEEE'}
                                                name='status'
                                                data-control='select2'
                                                data-hide-search='true'
                                                className='form-select form-select-black form-select-sm cursor-pointer bg-cmGrey200'
                                                defaultValue='1'
                                            >
                                                <option value='1'>Position</option>
                                                <option value='1'>$ 100 per KW</option>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                                <td className='text-dark fw-bold text-hover-primary fs-6'>
                                    <div className=''>
                                        <div
                                            className=' mt-1'
                                            style={{
                                                width: '73px',
                                                height: '34px',
                                                borderRadius: '6px',
                                                fontWeight: '800px',

                                                display: 'flex',
                                                flexDirection: 'row',
                                                marginTop: '',
                                                marginLeft: '25px',
                                            }}
                                        >
                                            <select
                                                style={{
                                                    width: '73px',
                                                    height: '34px',
                                                    fontWeight: '800px',

                                                    fontFamily: 'Manrope',
                                                    fontStyle: 'Medium',
                                                }}
                                                // style={{background: '#EEEEEE'}
                                                name='status'
                                                data-control='select2'
                                                data-hide-search='true'
                                                className='form-select form-select-black form-select-sm bg-cmGrey200 cursor-pointer'
                                                defaultValue='1'
                                            >
                                                <option value='1'>D1</option>
                                                <option value='1'>$ 100 per KW</option>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>

                            <tr>
                                <td>
                                    <div className='ms-14 form-check form-check-sm form-check-custom form-check-solid'>
                                        <input
                                            className='form-check-input widget-13-check'
                                            type='checkbox'
                                            value='1'
                                        />
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
                                <td>
                                    <div className='d-flex align-items-center'>
                                        <div
                                            className=' mt-1'
                                            style={{
                                                background: '#EEEEEE',
                                                width: '160px',
                                                height: '34px',
                                                borderRadius: '6px',
                                                fontWeight: '800px',
                                                color: '#424242',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                marginTop: '',
                                            }}
                                        >
                                            <select
                                                style={{
                                                    width: '160px',
                                                    height: '34px',
                                                    fontWeight: '800px',
                                                }}
                                                // style={{background: '#EEEEEE'}
                                                name='status'
                                                data-control='select2'
                                                data-hide-search='true'
                                                className='form-select form-select-black form-select-sm cursor-pointer bg-cmGrey200'
                                                defaultValue='1'
                                            >
                                                <option value='1'>$ 100 per KW</option>
                                                <option value='1'>$ 100 per KW</option>
                                            </select>
                                        </div>
                                    </div>
                                    {/* <span className='text-muted fw-semibold text-muted d-block fs-7'>Code: PH</span> */}
                                </td>
                                <td>
                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                        <div
                                            style={{
                                                color: '#616161',
                                                marginRight: '5px',
                                                marginTop: '6px',
                                                fontSize: '14px',
                                            }}
                                        >
                                            $
                                        </div>
                                        <div
                                            style={{
                                                width: '50px',
                                                height: '34px',
                                                background: '#FAFAFA',
                                                border: '1px solid #D8D8D8',
                                                color: '#BDBDBD',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <input
                                                style={{
                                                    width: '25px',
                                                    marginLeft: '2px',
                                                    height: '30px',
                                                    background: '#FAFAFA',
                                                    color: '#BDBDBD',
                                                    border: '1px solid #FAFAFA',
                                                }}
                                                value='0'
                                                type='text'
                                            ></input>
                                        </div>
                                    </div>
                                    {/* <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                    05/28/2020
                  </a> */}
                                </td>
                                <td>
                                    <div
                                        style={{
                                            width: '50px',
                                            height: '34px',
                                            background: '#FAFAFA',
                                            border: '1px solid #D8D8D8',
                                            color: '#BDBDBD',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <input
                                            style={{
                                                width: '25px',
                                                marginLeft: '2px',
                                                height: '30px',
                                                background: '#FAFAFA',
                                                color: '#BDBDBD',
                                                border: '1px solid #FAFAFA',
                                            }}
                                            value='0'
                                            type='text'
                                        ></input>
                                    </div>
                                </td>
                                <td className='text-dark fw-bold text-hover-primary fs-6'>
                                    <div className='d-flex align-items-center'>
                                        <div
                                            className=' mt-1'
                                            style={{
                                                background: '#EEEEEE',
                                                width: '160px',
                                                height: '34px',
                                                borderRadius: '6px',
                                                fontWeight: '800px',
                                                color: '#424242',
                                                display: 'flex',
                                                flexDirection: 'row',
                                            }}
                                        >
                                            <select
                                                style={{
                                                    width: '160px',
                                                    height: '34px',
                                                    fontWeight: '800px',
                                                    fontFamily: 'Manrope',
                                                    fontStyle: 'Medium',
                                                }}
                                                // style={{background: '#EEEEEE'}
                                                name='status'
                                                data-control='select2'
                                                data-hide-search='true'
                                                className='form-select form-select-black form-select-sm bg-cmGrey200 cursor-pointer'
                                                defaultValue='1'
                                            >
                                                <option value='1'>Position</option>
                                                <option value='1'>$ 100 per KW</option>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                                <td className='text-dark fw-bold text-hover-primary fs-6'></td>
                                <td className=''></td>
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

export {OverridesTabels}
