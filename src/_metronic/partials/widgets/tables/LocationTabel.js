/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {KTSVG} from '../../../helpers'
import Select from '../../../../app/modules/admin/Setting/Icon/select.png'
import Menu from '../../../../app/modules/admin/Setting/Icon/shape.png'
import {LocationEdit} from '../../../../app/modules/admin/Setting/components/Location/LocationEdit'

const LocationTabel = ({className}) => {
    const [add, setAdd] = useState(false)
    const handleClose = () => {
        setAdd(false)
    }
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
                                <th className='min-w-140px p-5' style={{color: '#424242'}}>
                                    State
                                </th>
                                <th className='min-w-120px p-5' style={{color: '#424242'}}>
                                    City
                                </th>
                                <th className='min-w-120px p-5' style={{color: '#424242'}}>
                                    Marketing Deal
                                </th>
                                <th className='min-w-120px p-5' style={{color: '#424242'}}>
                                    Installer
                                </th>
                                <th className='min-w-140px p-5' style={{color: '#424242'}}>
                                    Standard Redline
                                </th>
                                <th className='min-w-100px p-5' style={{color: '#212121'}}>
                                    People
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
                                    <div className=' ms-14 form-check form-check-sm form-check-custom form-check-solid'>
                                        {/* <input className='form-check-input widget-13-check' type='checkbox' value='1' /> */}
                                    </div>
                                </td>
                                <td
                                    className='p-4'
                                    style={{
                                        color: '#424242',
                                        fontSize: '14px',
                                        fontStyle: 'Medium',
                                    }}
                                >
                                    CT{' '}
                                </td>
                                <td
                                    className='p-4'
                                    style={{
                                        color: '#424242',
                                        fontSize: '14px',
                                        fontStyle: 'Medium',
                                    }}
                                >
                                    Austin{' '}
                                    <b
                                        style={{
                                            background: '#EEEEEE',
                                            fontSize: '14px',
                                            marginLeft: '5px',
                                            color: '#7239EA',
                                            fontWeight: '400',
                                            width: '47px',
                                        }}
                                    >
                                        Branch
                                    </b>
                                </td>
                                <td className='p-2'>
                                    <img
                                        className='avatar'
                                        src='https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg'
                                    />

                                    <b
                                        className='ms-4'
                                        style={{
                                            fontSize: '14px',
                                            textDecoration: 'underline',
                                            marginLeft: '5px',
                                            color: '#424242',
                                            fontWeight: '500',
                                        }}
                                    >
                                        Jenny Wilson{' '}
                                    </b>
                                </td>
                                <td className='p-4'>Parker Contruction</td>
                                <td className='p-4'>1.88</td>
                                <td className='p-4'>
                                    <img className='w-10px h-6' src={Menu} />{' '}
                                    <b
                                        className='ms-4'
                                        style={{
                                            fontSize: '14px',
                                            marginLeft: '5px',
                                            color: '#424242',
                                            fontWeight: '400',
                                        }}
                                    >
                                        1.88
                                    </b>
                                </td>
                                <td>
                                    <button
                                        onClick={() => setAdd(true)}
                                        className=' btn btn-sm btn-icon  btn-bg-light btn-active-color-primary'
                                        data-kt-menu-trigger='click'
                                        data-kt-menu-placement='bottom-end'
                                        data-kt-menu-flip='top-end'
                                    >
                                        <img
                                            style={{width: '14px'}}
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
            <LocationEdit show={add} handleClose={handleClose} />
        </div>
    )
}

export {LocationTabel}
