/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {FC} from 'react'

import {KTSVG} from '../../../helpers'
import Select from '../../../../app/modules/admin/Setting/Icon/select.png'
import Menu from '../../../../app/modules/admin/Setting/Icon/shape.png'
import {RightToolbar} from '../../layout/RightToolbar'

import {DemosToggleDrawer} from '../../layout/demos-drawer/DemosToggleDrawer'
import {HelpDrawer} from '../../layout/help-drawer/HelpDrawer'
import {ToggleHelpDrawer} from '../../layout/help-drawer/ToggleHelpDrawer'
import {PurchaseButton} from '../../layout/purchase/PurchaseButton'
import {ThemeModeProvider} from '../../layout/theme-mode/ThemeModeProvider'
type Props = {
    className: string
}

const CompensationTabel: React.FC<Props> = ({className}) => {
    return (
        <div className={`card  ${className}`}>
            {/* begin::Header */}
            <div className='card-body py-0 px-0 mx-0' style={{marginTop: '-5px'}}>
                {/* begin::Table container */}
                <div className='table-responsive'>
                    {/* begin::Table */}
                    <table
                        style={{height: '50px'}}
                        className='table table-row-bordered table-row-gray-100 gs-0 gy-3'
                    >
                        {/* begin::Table head */}
                        <thead>
                            <tr
                                className='text-muted'
                                style={{
                                    background: '#EEEEEE',
                                    color: '#424242',
                                    height: '48px',
                                    fontSize: '14px',
                                    fontFamily: 'Manrope',
                                }}
                            >
                                <th className='w-25px'>
                                    <div className='form-check form-check-sm form-check-custom form-check-solid'>
                                        <input
                                            className='form-check-input'
                                            type='checkbox'
                                            value='1'
                                            data-kt-check='true'
                                            data-kt-check-target='.widget-13-check'
                                        />
                                    </div>
                                </th>
                                {/* <th className='min-w-150px'>Order Id</th> */}
                                <th className='min-w-140px' style={{color: '#424242'}}>
                                    Plan Name
                                </th>
                                <th className='min-w-140px' style={{color: '#424242'}}>
                                    Position
                                </th>
                                <th className='min-w-120px' style={{color: '#424242'}}>
                                    Commission
                                </th>
                                <th className='min-w-120px' style={{color: '#424242'}}>
                                    Scale
                                </th>
                                <th className='min-w-120px' style={{color: '#424242'}}>
                                    Upfront
                                </th>
                                <th className='min-w-140px' style={{color: '#424242'}}>
                                    Override Scale
                                </th>

                                <th className='min-w-140px' style={{color: '#424242'}}>
                                    People
                                </th>
                                {/* <th className='min-w-100px' style={{color: '#212121'}}>
                  People
                </th> */}
                                <th className='min-w-120px'></th>
                                <th className='min-w-140px'></th>
                            </tr>
                        </thead>
                        {/* end::Table head */}
                        {/* begin::Table body */}
                        <tbody>
                            <tr>
                                <td style={{marginTop: '10px'}}>
                                    <div className=' ms-14 form-check form-check-sm form-check-custom form-check-solid'>
                                        {/* <input className='form-check-input widget-13-check' type='checkbox' value='1' /> */}
                                    </div>
                                </td>

                                {/* <button
        id='kt_engage_demos_toggle'
        className='engage-demos-toggle btn btn-flex h-35px bg-body btn-color-gray-700 btn-active-color-gray-900 shadow-sm fs-6 px-4 rounded-top-0'
        title={`Check out ${process.env.REACT_APP_THEME_NAME} more demos`}
        data-bs-toggle='tooltip'
        data-bs-placement='left'
        data-bs-dismiss='click'
        data-bs-trigger='hover'
      >
        <span id='kt_engage_demos_label'>Demos</span>
      </button> */}

                                <td
                                    id='kt_engage_demos_toggle'
                                    className='engage-demos-toggle '
                                    title={`Check out ${process.env.REACT_APP_THEME_NAME} more demos`}
                                    data-bs-toggle='tooltip'
                                    data-bs-placement='left'
                                    data-bs-dismiss='click'
                                    data-bs-trigger='hover'
                                    style={{
                                        color: '#424242',
                                        marginTop: '10px',
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                        fontStyle: 'Medium',
                                        textDecoration: 'underline',
                                    }}
                                >
                                    <span
                                        id='kt_engage_demos_label'
                                        style={{color: 'red'}}
                                        className='bi bi-person'
                                    ></span>{' '}
                                    Setter Plan A
                                </td>

                                <td
                                    style={{
                                        color: '#424242',
                                        fontSize: '14px',
                                        fontStyle: 'Medium',
                                    }}
                                >
                                    {' '}
                                    Setter{' '}
                                </td>
                                {/* <td style={{color: '#424242', fontSize: '14px', fontStyle: 'Medium'}}>Sales </td> */}
                                <td style={{color: '#9E9E9E', fontWeight: '400'}}>
                                    {/* <img
                    className='avatar'
                    src='https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg'
                  /> */}
                                    40%
                                </td>
                                <td style={{color: '#9E9E9E', fontWeight: '400'}}>
                                    {/* <img
                    className='avatar'
                    src='https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg'
                  /> */}
                                    Tired{' '}
                                    <span
                                        className='ms-2'
                                        style={{
                                            background: 'rgba(114, 57, 234, 0.1)',
                                            color: '#7239EA',
                                            width: '169px',
                                            height: '29px',
                                            fontSize: '14px',
                                            borderRadius: '34px',
                                        }}
                                    >
                                        Incremental
                                    </span>
                                </td>

                                <td style={{color: '#9E9E9E', fontWeight: '400'}}>
                                    {/* <img
                    className='avatar'
                    src='https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg'
                  /> */}
                                    $100 per KW
                                </td>
                                <td style={{color: '#9E9E9E', fontWeight: '400'}}>
                                    {/* <img
                    className='avatar'
                    src='https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg'
                  /> */}
                                    Tiered
                                    <span
                                        className='ms-2'
                                        style={{
                                            background: 'rgba(114, 57, 234, 0.1)',
                                            color: '#7239EA',
                                            width: '169px',
                                            height: '29px',
                                            fontSize: '14px',
                                            borderRadius: '34px',
                                        }}
                                    >
                                        Incremental
                                    </span>
                                </td>
                                <td style={{color: '#9E9E9E', fontWeight: '400'}}>
                                    <img className='w-10px h-6' src={Menu} />{' '}
                                    <b
                                        className='ms-1'
                                        style={{
                                            fontSize: '14px',
                                            marginLeft: '5px',
                                            color: '#9E9E9E',
                                            fontWeight: '400',
                                        }}
                                    >
                                        1.88
                                    </b>
                                </td>

                                <td>
                                    {' '}
                                    <button
                                        className=' btn btn-sm btn-icon engage-demos-toggle  btn-bg-light btn-active-color-primary'
                                        id='kt_engage_demos_toggle'
                                        title={`Check out ${process.env.REACT_APP_THEME_NAME} more demos`}
                                        data-bs-toggle='tooltip'
                                        data-bs-placement='left'
                                        data-bs-dismiss='click'
                                        data-bs-trigger='hover'
                                    >
                                        <img
                                            style={{width: '14px'}}
                                            id='kt_engage_demos_label'
                                            src='https://img.icons8.com/ultraviolet/40/null/pencil--v1.png'
                                        />
                                        {/* <i className='bi bi-three-dots fs-3'></i> */}
                                    </button>
                                </td>
                                {/* <td className='text-end'></td> */}
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

export {CompensationTabel}
