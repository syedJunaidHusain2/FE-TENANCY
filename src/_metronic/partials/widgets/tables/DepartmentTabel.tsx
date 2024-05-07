/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {KTSVG} from '../../../helpers'
import Select from '../../../../app/modules/admin/Setting/Icon/select.png'

import Menu from '../../../../app/modules/admin/Setting/Icon/shape.png'
type Props = {
    className: string
}

const DepartmentTabel: React.FC<Props> = ({className}) => {
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
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
                                    <div className='form-check form-check-sm form-check-custom form-check-solid'></div>
                                </th>
                                {/* <th className='min-w-150px'>Order Id</th> */}
                                <th className='min-w-140px p-5' style={{color: '#424242'}}>
                                    Departments
                                </th>
                                <th className='min-w-120px p-5' style={{color: '#424242'}}>
                                    Sub Dept.
                                </th>
                                <th className='min-w-120px p-5' style={{color: '#424242'}}>
                                    Positions
                                </th>
                                <th className='min-w-120px p-5' style={{color: '#424242'}}>
                                    People{' '}
                                </th>
                                {/* <th className='min-w-140px' style={{color: '#424242'}}>
                  Status{' '}
                </th> */}
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
                                <td>
                                    <div className=' ms-14 form-check form-check-sm form-check-custom form-check-solid'>
                                        {/* <input className='form-check-input widget-13-check' type='checkbox' value='1' /> */}
                                    </div>
                                </td>
                                <td
                                    className='d-flex flex-row p-4'
                                    style={{
                                        color: '#424242                    ',
                                        fontSize: '14px',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    {' '}
                                    Sales
                                    <i
                                        className='d-flex  ms-3 mt-0  '
                                        style={{
                                            fontSize: '20px',
                                            color: '#424242                    ',
                                            fontWeight: 'bold',
                                        }}
                                    ></i>
                                    {/* <i className='fa-solid fa-greater-than ms-4 '></i>{' '} */}
                                </td>
                                <td
                                    className='p-4'
                                    style={{
                                        color: '#9E9E9E',
                                        fontWeight: '400',
                                        fontSize: '14px',
                                        fontStyle: 'Medium',
                                    }}
                                >
                                    02
                                </td>
                                <td
                                    style={{
                                        color: '#9E9E9E',
                                        fontWeight: '400',
                                        fontSize: '14px',
                                        fontStyle: 'Medium',
                                    }}
                                    className='p-4'
                                >
                                    03
                                </td>
                                <td
                                    style={{
                                        color: '#9E9E9E',
                                        fontWeight: '400',
                                        fontSize: '14px',
                                        fontStyle: 'Medium',
                                    }}
                                    className='p-4'
                                >
                                    8.72{' '}
                                </td>
                                {/* <td>Active</td> */}

                                <td>
                                    {' '}
                                    <button
                                        className=' btn btn-sm btn-icon  btn-bg-light btn-active-color-primary'
                                        data-kt-menu-trigger='click'
                                        data-kt-menu-placement='bottom-end'
                                        data-kt-menu-flip='top-end'
                                        onClick={() => setOpen(true)}
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
                            {/* <tr style={{background: '#F9F9F9', padding: '4px'}}>
                <td>
                  <div className=' ms-14 form-check form-check-sm form-check-custom form-check-solid'>
                    {/* <input className='form-check-input widget-13-check' type='checkbox' value='1' /> */}
                            {/* </div>
                </td>
                <td
                  className='d-flex flex-row'
                  style={{
                    color: '#424242                    ',
                    fontSize: '14px',
                    fontFamily: 'Manrope',
                  }}
                >
                  {' '}
                  Management
                  <i
                    className='d-flex -down ms-3 mt-0 '
                    style={{
                      fontSize: '20px',
                      color: '#424242                    ',
                      fontWeight: 'bold',
                    }}
                  ></i>
                  {/* <i className='fa-solid fa-greater-than ms-4 '></i>{' '} */}
                            {/* </td>
                <td
                  style={{
                    color: '#9E9E9E',
                    fontWeight: '400',
                    fontSize: '14px',
                    fontStyle: 'Medium',
                  }}
                > */}
                            {/* 02
                </td>
                <td
                  style={{
                    color: '#9E9E9E',
                    fontWeight: '400',
                    fontSize: '14px',
                    fontStyle: 'Medium',
                  }}
                >
                  03
                </td> */}
                            {/* <td
                  style={{
                    color: '#9E9E9E',
                    fontWeight: '400',
                    fontSize: '14px',
                    fontStyle: 'Medium',
                  }}
                >
                  8.72{' '}
                </td> */}
                            {/* <td>Active</td> */}
                            {/* <td> */}{' '}
                            {/* <button
                    className=' btn btn-sm btn-icon  btn-bg-light btn-active-color-primary'
                    data-kt-menu-trigger='click'
                    data-kt-menu-placement='bottom-end'
                    data-kt-menu-flip='top-end'
                    onClick={() => setOpen(true)}
                  >
                    <img
                      style={{width: '14px'}}
                      src='https://img.icons8.com/ultraviolet/40/null/pencil--v1.png' */}
                            {/* /> */}
                            {/* <i className='bi bi-three-dots fs-3'></i> */}
                            {/* </button>
                </td>
                {/* <td className='text-end'></td> */}
                            {/* </tr> */}
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

export {DepartmentTabel}
