import React from 'react'
import {Link} from 'react-router-dom'
import {getValidDate} from '../../../../../constants/constants'
import {
    formattedNumberFields,
    formattedNumberFieldsWithoutDecimal,
} from '../../../../../helpers/CommonHelpers'
import Pagination from '../../../admin/sequidocs/component/Pagination'

const PayStubTable = ({tableData, onPageChange, page}) => {
    return (
        <div>
            <div className='table-responsive overflow-auto bg-cmwhite rounded shadow-sm'>
                <table className='table'>
                    <thead className='text-center'>
                        <tr
                            className='text-cmGrey900 bg-cmGrey300'
                            style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                fontFamily: 'Manrope',
                            }}
                        >
                            <th className='w-auto p-5 text-nowrap'>Pay Period</th>
                            <th className='w-auto p-5 text-nowrap'>Payroll Date</th>
                            <th className='w-auto p-5 text-nowrap'>Gross Total</th>

                            <th className='w-auto p-5 text-nowrap'>Miscellaneous</th>

                            <th className='w-auto p-5 text-nowrap'>Deductions</th>
                            <th className='w-auto p-5 text-nowrap'>Net Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData?.data?.length > 0 ? (
                            tableData?.data?.map((item, i) => (
                                <tr
                                    key={i}
                                    style={{
                                        fontSize: '14px',
                                        fontFamily: 'Manrope',
                                        fontWeight: '600',
                                    }}
                                    className='text-center text-cmGrey700 text-nowrap'
                                >
                                    <td className='p-5 ' style={{fontWeight: '700'}}>
                                        <Link
                                            className='text-cmBlue-Crayola'
                                            to={'pay-period'}
                                            state={{
                                                end_date: item?.pay_period_to,
                                                start_date: item?.pay_period_from,
                                                userId: item?.user_id,
                                                payrollId: item?.id,
                                                past: true,
                                            }}
                                        >
                                            {/* 11/02/22- 12/02/23 */}
                                            {getValidDate(item?.pay_period_from)}-
                                            {getValidDate(item?.pay_period_to)}
                                        </Link>
                                    </td>
                                    <td className='p-5'> {getValidDate(item?.payroll_date)}</td>

                                    <td className='p-5'>
                                        {formattedNumberFields(item?.gross_total, '$')}
                                    </td>
                                    <td className='p-5'>
                                        {formattedNumberFields(item?.miscellaneous, '$')}
                                    </td>
                                    <td className='p-5'>
                                        {formattedNumberFields(item?.deduction, '$')}
                                    </td>
                                    <td className='p-5 text-cmGrey900' style={{fontWeight: '700'}}>
                                        {formattedNumberFields(item?.net_pay, '$')}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
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
            <Pagination
                page={page}
                totalPages={tableData?.last_page}
                setPage={(changedPage) => onPageChange(changedPage)}
            />
        </div>
    )
}

export default PayStubTable
