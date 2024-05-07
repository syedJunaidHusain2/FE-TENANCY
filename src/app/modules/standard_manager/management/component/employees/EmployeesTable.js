/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import Pagination from '../../../../admin/sequidocs/component/Pagination'
import RedirectToEmployeeProfile from '../../../../../../customComponents/redirectToEmployeeProfile/RedirectToEmployeeProfile'
import {TABLE_BORDER, formattedPhoneNumber} from '../../../../../../helpers/CommonHelpers'
import CustomImage from '../../../../../../customComponents/customImage/CustomImage'
import {Badge} from 'primereact'
import {getValidDate} from '../../../../../../constants/constants'

const EmployeesTable = ({className, loading, totalPages = 0, page, setPage, employeeData}) => {
    return (
        <>
            <CustomLoader full visible={loading} />
            <div id='get1' className='table-responsive overflow-auto w-100 bg-cmwhite'>
                <table className='table'>
                    <thead className={TABLE_BORDER}>
                        <tr
                            className=' bg-cmGrey300 text-cmGrey800 '
                            style={{
                                fontSize: '14px',
                                fontWeight: '800',
                                fontFamily: 'Manrope',
                            }}
                        >
                            <th className='w-auto p-5'>ID</th>
                            <th className='w-auto p-5'>Name</th>
                            <th className='w-auto p-5'>Position</th>
                            <th className='w-auto p-5'>Office</th>
                            <th className='w-auto p-5'>Phone </th>
                            <th className='w-auto p-5'>Email </th>
                            <th className='w-auto p-5'>Hire Date</th>
                        </tr>
                    </thead>
                    <tbody className={TABLE_BORDER}>
                        {employeeData?.length > 0 ? (
                            <>
                                {employeeData?.map((item, i) => (
                                    <tr
                                        key={`employeeData-${item?.id}`}
                                        className={`stripRow `}
                                        style={{
                                            color: '#616161',
                                            // height: '40px',
                                            fontSize: '14px',
                                            fontFamily: 'Manrope',
                                        }}
                                    >
                                        <td className='p-5'>{item?.employee_id}</td>
                                        <td
                                            className='p-3 text-nowrap '
                                            style={{
                                                textDecoration: 'underline',
                                            }}
                                        >
                                            <RedirectToEmployeeProfile employeeId={item?.id}>
                                                <div className='d-flex'>
                                                    <CustomImage
                                                        src={item?.image}
                                                        className='avatar me-3'
                                                    />
                                                    <div className='d-flex flex-column'>
                                                        <div>
                                                            {item?.first_name} {item?.last_name}
                                                        </div>
                                                        <div>
                                                            {item?.disable_login ? (
                                                                <Badge
                                                                    severity='warning'
                                                                    value='Login Disabled'
                                                                />
                                                            ) : (
                                                                ''
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </RedirectToEmployeeProfile>
                                        </td>
                                        <td
                                            className='p-5 text-cmGrey700'
                                            style={{fontWeight: 500}}
                                        >
                                            {item?.position_detail?.position_name}
                                        </td>
                                        <td
                                            className='p-5 text-cmGrey700'
                                            style={{fontWeight: 500}}
                                        >
                                            {item?.office?.office_name}
                                        </td>
                                        <td
                                            className='p-5 text-cmGrey700 text-nowrap'
                                            style={{fontWeight: 500}}
                                        >
                                            {formattedPhoneNumber(item?.mobile_no)}
                                        </td>
                                        <td
                                            className='p-5 text-cmGrey700'
                                            style={{fontWeight: 500}}
                                        >
                                            {item?.email}
                                        </td>
                                        <td
                                            className='p-5 text-cmGrey700'
                                            style={{fontWeight: 500}}
                                        >
                                            {getValidDate(item?.created_at, 'MM/DD/YYYY')}
                                        </td>
                                    </tr>
                                ))}
                            </>
                        ) : (
                            <tr>
                                <td
                                    colSpan={6}
                                    style={{
                                        textAlign: 'center',
                                        fontFamily: 'Manrope',
                                        fontWeight: '500',
                                        fontSize: 14,
                                        paddingTop: 20,
                                        paddingBottom: 20,
                                    }}
                                >
                                    No data found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {employeeData?.length > 0 ? (
                <Pagination setPage={setPage} page={page} totalPages={totalPages} />
            ) : null}
        </>
    )
}

export default EmployeesTable
