import React from 'react'
import {Link} from 'react-router-dom'
import {KTSVG, toAbsoluteUrl} from '../../../../../_metronic/helpers'

const MdTable = () => {
    return (
        <div className='table-responsive shadow-none overflow-auto'>
            <table className='table'>
                <thead className='text-center'>
                    <tr
                        style={{
                            fontSize: '14px',
                            fontWeight: '800',
                            fontFamily: 'Manrope',
                        }}
                        className=' text-cmGrey800 bg-cmGrey200'
                    >
                        <th className='w-auto p-6 form-check form-check-custom form-check-solid text-center'>
                            Name
                        </th>
                        <th className='w-auto p-6 '>Location</th>
                        <th className='w-auto p-6'>Redline</th>
                        <th className='w-auto p-6'>% Commission</th>
                        <th className='w-auto p-6'>Phone</th>
                        <th className='w-auto p-6'>
                            <span>
                                <i className='bi bi-info-circle text-cmGrey600 fs-5 me-2'></i>
                            </span>
                            Costs
                        </th>
                        <th className='w-auto p-6'>Earnings</th>
                        <th className='w-auto p-6'></th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {/* {tableData?.map((item, index) => ( */}
                    <tr
                        style={{
                            height: '40px',
                            // background: (index + 1) % 2 === 0 ? '#F5F5F5' : 'white',
                            fontSize: '14px',
                            fontFamily: 'Manrope',
                            fontWeight: '500',
                        }}
                        className='bg-cmwhite'
                        // ((index + 1) % 2) === 0 ? 'bg-cmGrey100' : ''
                        //   className={(index + 1) % 2 === 0 ? 'stripRow text-cmGrey700' : 'text-cmGrey700'}
                    >
                        <td>
                            <Link to={'md-per-person/health'}>
                                <div
                                    className='px-5 py-3 text-cmGrey800 text-decoration-underline cursor-pointer'
                                    style={{fontWeight: 600}}
                                >
                                    <img
                                        src={toAbsoluteUrl('/media/avatars/300-1.jpg')}
                                        className='avatar me-1'
                                    />
                                    Jenny Wilson
                                </div>
                            </Link>
                        </td>

                        <td className='px-5 py-3 pt-5 text-cmGrey700' style={{fontWeight: 600}}>
                            {/* {item.position_name ?? 'null'} */}
                            South Carolina
                        </td>

                        <td className='px-5 py-3 pt-5 text-cmGrey700' style={{fontWeight: 600}}>
                            {/* <p>{item.state_name ?? 'null'}</p> */}
                            3.2
                        </td>

                        <td className='px-5 py-3 pt-5 text-cmGrey700' style={{fontWeight: 600}}>
                            {/* {item.manager_name ?? 'null'} */}
                            100
                        </td>
                        <td className='px-5 py-3 pt-5 text-cmGrey700' style={{fontWeight: 600}}>
                            {/* {item.mobile_no ?? 'null'} */}
                            (260) 317-7492
                        </td>

                        <td className='px-5 py-3 pt-5 text-cmGrey700' style={{fontWeight: 600}}>
                            {/* {item.status_id === 3 && ( */}
                            $202.87
                            <span
                                className='badge ms-2 text-cmSuccess bg-cmSuccess bg-opacity-10'
                                style={{
                                    fontSize: '13px',
                                    fontWeight: '600',
                                }}
                            >
                                {/* {item.status_name ?? 'null'} */}
                            </span>
                            {/* )} */}
                        </td>

                        <td
                            className='px-5 py-3 pt-5 text-cmGrey700 text-center'
                            style={{fontWeight: 600}}
                        >
                            $202.87
                        </td>
                        <td
                            className='px-5 py-3 pt-5 text-cmGrey700 text-center cursor-pointer '
                            style={{fontWeight: 600}}
                        >
                            <i className='bi bi-three-dots-vertical fs-5 text-cmBlack px-2 py-1 rounded-circle bg-cmGrey300'></i>
                        </td>
                    </tr>
                    {/* ))} */}
                </tbody>
            </table>
        </div>
    )
}

export default MdTable
