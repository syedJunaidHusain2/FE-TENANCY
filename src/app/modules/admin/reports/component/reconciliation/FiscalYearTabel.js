/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import clsx from 'clsx'
import {KTSVG} from '../../../../../../_metronic/helpers'
import Select from '../../Icon/select.png'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'

const FiscalYearTabel = ({className}) => {
    const [open, setOpen] = useState(false)
    const [btn, setBtn] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <>
            <div className={`card shadow-nones mt-10 ${className}`}>
                <div className='card-body shadow-none py-0 px-0 mx-0'>
                    <div
                        className='card bg-white h-auto'
                        style={{fontSize: '14px', fontFamily: 'Manrope'}}
                    >
                        <div className='w-100 mt-6 ms-8 mb-5 d-flex flex-wrap '>
                            <div className='mt-2 w-425px'>
                                <label
                                    style={{
                                        fontFamily: 'Manrope',
                                        fontSize: '16px',
                                        color: '#424242',
                                    }}
                                >
                                    Total Reconciliation:
                                </label>
                                <label
                                    className='ms-4'
                                    style={{
                                        fontFamily: 'Manrope',
                                        fontWeight: 'bold',
                                        color: '#212121',
                                        fontSize: '16px',
                                    }}
                                >
                                    $10,467.00
                                </label>
                            </div>
                            <div className='ms-sm-20'>
                                <div
                                    style={{
                                        background: '#F5F5F5',
                                        height: '43px',
                                        borderRadius: '20px',
                                    }}
                                    className='w-md-350px mb-1'
                                    id='kt_chat_contacts_header'
                                >
                                    <form
                                        className='position-relative'
                                        style={{background: '#F5F5F5', borderRadius: '90px'}}
                                        autoComplete='off'
                                    >
                                        <CustomInput type={INPUT_TYPE.search} name='search' />
                                        {/* <KTSVG
                                            path='/media/icons/duotune/general/gen021.svg'
                                            className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-3 translate-middle-y'
                                        />

                                        <input
                                            style={{background: '#F5F5F5', borderRadius: '10px'}}
                                            type='text'
                                            className='form-control form-control-solid px-12 '
                                            name='search'
                                            placeholder='Search...'
                                        /> */}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='table-responsive shadow-none overflow-auto'>
                        <table className='table'>
                            <thead>
                                <tr
                                    className=' '
                                    style={{
                                        background: '#E0E0E0',
                                        color: '#424242',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <th className='min-w-200px p-6'>Name</th>
                                    <th className='min-w-150px p-6'>Location</th>
                                    <th className='min-w-150px text-nowrap'>
                                        Recon 1
                                        <th
                                            className='text-nowrap'
                                            style={{color: '#616161', fontSize: '10px'}}
                                        >
                                            (11/01/2022)
                                        </th>
                                    </th>
                                    <th className='min-w-150px text-nowrap'>
                                        Recon 2
                                        <th
                                            className='text-nowrap'
                                            style={{color: '#616161', fontSize: '10px'}}
                                        >
                                            (11/01/2022)
                                        </th>
                                    </th>
                                    <th className='min-w-150px text-nowrap'>
                                        Recon 3
                                        <th
                                            className='text-nowrap'
                                            style={{color: '#616161', fontSize: '10px'}}
                                        >
                                            (11/01/2022)
                                        </th>
                                    </th>
                                    <th className='min-w-150px text-nowrap'>
                                        Recon 4
                                        <th
                                            className='text-nowrap'
                                            style={{color: '#616161', fontSize: '10px'}}
                                        >
                                            (11/01/2022)
                                        </th>
                                    </th>
                                    <th className='min-w-175px p-6'>Total</th>

                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    className=' '
                                    style={{
                                        color: '#757575',
                                        height: '40px',
                                        fontSize: '14px',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <td
                                        className='p-3'
                                        style={{
                                            textDecoration: 'underline',
                                            color: '#424242',
                                            fontFamily: 'Manrope',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        <img
                                            src={toAbsoluteUrl('/media/avatars/300-1.jpg')}
                                            className='avatar me-3'
                                        />{' '}
                                        Annette Black
                                    </td>
                                    <td className='p-5'>$162,522</td>
                                    <td className='p-5'>$118,878</td>
                                    <td className='p-5'>$22,157</td>
                                    <td className='p-5'>$22,157</td>
                                    <td className='p-5'>$22,157</td>
                                    <td
                                        className='p-5'
                                        style={{color: '#212121', fontFamily: 'Manrope'}}
                                    >
                                        $22,157
                                    </td>

                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FiscalYearTabel
