import React from 'react'
import {Link} from 'react-router-dom'

import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'

const PerEmpTable = () => {
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
                        className=' text-cmGrey800 bg-cmGrey300'
                    >
                        <th className='w-auto p-6 '>Name</th>
                        <th className='w-auto p-6 '>Position</th>
                        <th className='w-auto p-6'>Manager</th>
                        <th className='w-auto p-6'>Rep Profitability</th>
                        <th className='w-auto p-6'>Email</th>
                        <th className='w-auto p-6'>Phone</th>
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
                            <div
                                className='py-3 text-cmGrey800 text-decoration-underline cursor-pointer'
                                style={{fontWeight: 600}}
                            >
                                <img
                                    src={toAbsoluteUrl('/media/avatars/300-1.jpg')}
                                    className='avatar me-1'
                                />
                                Jenny Wilson
                            </div>
                        </td>

                        <td className=' py-3 pt-5 text-cmGrey700' style={{fontWeight: 600}}>
                            {/* {item.position_name ?? 'null'} */}
                            Setter
                        </td>

                        <td className=' py-3 pt-5 text-cmGrey700' style={{fontWeight: 600}}>
                            {/* <p>{item.state_name ?? 'null'}</p> */}
                            Dianne Russell
                        </td>

                        <td className=' py-3 pt-5 text-cmSuccess' style={{fontWeight: 600}}>
                            {/* {item.manager_name ?? 'null'} */}
                            $490.51
                        </td>
                        <td className=' py-3 pt-5 text-cmGrey700' style={{fontWeight: 600}}>
                            {/* {item.mobile_no ?? 'null'} */}
                            tranthuy.nute@gmail.com
                        </td>

                        <td className=' py-3 pt-5 text-cmGrey700' style={{fontWeight: 600}}>
                            {/* {item.status_id === 3 && ( */}
                            (853) 653-9888
                            {/* )} */}
                        </td>

                        <td
                            className=' py-3 pt-5 text-cmGrey700 text-center cursor-pointer '
                            style={{fontWeight: 600}}
                        >
                            <i className='bi bi-three-dots-vertical fs-5 text-cmBlack px-2 py-1 rounded-circle bg-cmGrey300'></i>
                        </td>
                    </tr>
                    {/* This tr to be deleted after inplementing api */}
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
                            <div
                                className='py-3 text-cmGrey800 text-decoration-underline cursor-pointer'
                                style={{fontWeight: 600}}
                            >
                                <img
                                    src={toAbsoluteUrl('/media/avatars/300-1.jpg')}
                                    className='avatar me-1'
                                />
                                Jenny Wilson
                            </div>
                        </td>

                        <td className=' py-3 pt-5 text-cmGrey700' style={{fontWeight: 600}}>
                            {/* {item.position_name ?? 'null'} */}
                            Setter
                        </td>

                        <td className=' py-3 pt-5 text-cmGrey700' style={{fontWeight: 600}}>
                            {/* <p>{item.state_name ?? 'null'}</p> */}
                            Dianne Russell
                        </td>

                        <td className=' py-3 pt-5 text-cmError' style={{fontWeight: 600}}>
                            {/* {item.manager_name ?? 'null'} */}
                            $396.84
                        </td>
                        <td className=' py-3 pt-5 text-cmGrey700' style={{fontWeight: 600}}>
                            {/* {item.mobile_no ?? 'null'} */}
                            tranthuy.nute@gmail.com
                        </td>

                        <td className=' py-3 pt-5 text-cmGrey700' style={{fontWeight: 600}}>
                            {/* {item.status_id === 3 && ( */}
                            (853) 653-9888
                            {/* )} */}
                        </td>

                        <td
                            className=' py-3 pt-5 text-cmGrey700 text-center cursor-pointer '
                            style={{fontWeight: 600}}
                        >
                            <i className='bi bi-three-dots-vertical fs-5 text-cmBlack px-2 py-1 rounded-circle bg-cmGrey300'></i>
                        </td>
                    </tr>
                    {/* Delete upto here */}
                    {/* ))} */}
                </tbody>
            </table>
        </div>
    )
}

export default PerEmpTable
