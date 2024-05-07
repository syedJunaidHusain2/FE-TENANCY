import React from 'react'
import {useSelector} from 'react-redux'
import {getCompanySettingSelector} from '../../../../../redux/selectors/SettingsSelectors'
import {formattedNumberFields} from '../../../../../helpers/CommonHelpers'

const ReconcilliationsTable = ({tableData}) => {
    const companySetting = useSelector(getCompanySettingSelector)

    return (
        <div
            className='text-cmGrey700'
            style={{fontFamily: 'Manrope', fontWeight: '600', fontSize: '14px'}}
        >
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
                            <th className='w-auto p-5 text-nowrap'>Payout Summary</th>
                            <th className='w-auto p-5 text-nowrap'>Total Value</th>
                            <th className='w-auto p-5'>Paid</th>
                            <th className='w-auto p-5 text-nowrap'>Held Back</th>
                            <th className='w-auto p-5 text-nowrap'>Due Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            style={{
                                fontSize: '14px',
                                fontFamily: 'Manrope',
                                fontWeight: '600',
                            }}
                            className='text-center text-cmGrey700'
                        >
                            <td className='p-5 text-cmBlack' style={{fontWeight: '700'}}>
                                Commission
                            </td>
                            <td className='p-5'>
                                {formattedNumberFields(tableData?.commission?.total_value, '$')}
                            </td>

                            <td className='p-5'>
                                {formattedNumberFields(tableData?.commission?.paid, '$')}
                            </td>
                            <td className='p-5'>
                                {formattedNumberFields(tableData?.commission?.held_back, '$')}
                            </td>
                            <td
                                className={`p-5 text-${
                                    tableData?.commission?.due_amount < 0 ? 'cmError' : 'cmBlack'
                                }`}
                                style={{fontWeight: '700'}}
                            >
                                {formattedNumberFields(tableData?.commission?.due_amount, '$')}
                            </td>
                        </tr>
                        {companySetting?.overrides ? (
                            <tr
                                style={{
                                    fontSize: '14px',
                                    fontFamily: 'Manrope',
                                    fontWeight: '600',
                                }}
                                className='text-center text-cmGrey700 bg-cmGrey100'
                            >
                                <td className='p-5 text-cmBlack' style={{fontWeight: '700'}}>
                                    Overrides
                                </td>
                                <td className='p-5'>
                                    {formattedNumberFields(tableData?.overrides?.total_value, '$')}
                                </td>

                                <td className='p-5'>
                                    {formattedNumberFields(tableData?.overrides?.paid, '$')}
                                </td>
                                <td className='p-5'>
                                    {formattedNumberFields(tableData?.overrides?.held_back, '$')}
                                </td>
                                <td
                                    className={`p-5 text-${
                                        tableData?.overrides?.due_amount < 0 ? 'cmError' : 'cmBlack'
                                    }`}
                                    style={{fontWeight: '700'}}
                                >
                                    {formattedNumberFields(tableData?.overrides?.due_amount, '$')}
                                </td>
                            </tr>
                        ) : (
                            <></>
                        )}
                        <tr
                            style={{
                                fontSize: '14px',
                                fontFamily: 'Manrope',
                                fontWeight: '600',
                            }}
                            className='text-center text-cmGrey700'
                        >
                            <td className='p-5 text-cmBlack' style={{fontWeight: '700'}}>
                                Other Items
                            </td>
                            <td className='p-5'>
                                {formattedNumberFields(tableData?.other_item?.total_value, '$')}
                            </td>

                            <td className='p-5'>
                                {formattedNumberFields(tableData?.other_item?.paid, '$')}
                            </td>
                            <td className='p-5'>
                                {formattedNumberFields(tableData?.other_item?.held_back, '$')}
                            </td>
                            <td
                                className={`p-5 text-${
                                    tableData?.other_item?.due_amount < 0 ? 'cmError' : 'cmBlack'
                                }`}
                                style={{fontWeight: '700'}}
                            >
                                {formattedNumberFields(tableData?.other_item?.due_amount, '$')}
                            </td>
                        </tr>
                        <tr
                            style={{
                                fontSize: '14px',
                                fontFamily: 'Manrope',
                                fontWeight: '600',
                            }}
                            className='text-center text-cmGrey700 bg-cmGrey100  '
                        >
                            <td className='p-5 text-cmBlack' style={{fontWeight: '700'}}>
                                Deductions
                            </td>
                            <td className='p-5'>
                                {formattedNumberFields(tableData?.deduction?.overrides, '$')}
                            </td>

                            <td className='p-5'>
                                {formattedNumberFields(tableData?.deduction?.paid, '$')}
                            </td>
                            <td className='p-5'>
                                {formattedNumberFields(tableData?.deduction?.held_back, '$')}
                            </td>
                            <td
                                className={`p-5 text-${
                                    tableData?.deduction?.due_amount < 0 ? 'cmError' : 'cmBlack'
                                }`}
                                style={{fontWeight: '700'}}
                            >
                                {formattedNumberFields(tableData?.deduction?.due_amount, '$')}
                            </td>
                        </tr>
                        <tr className='text-center'>
                            <td
                                className='p-5 text-cmBlack'
                                style={{fontWeight: '700', fontSize: '16px'}}
                            >
                                Total Due
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td
                                className={`p-5 text-${
                                    tableData?.total_due < 0 ? 'cmError' : 'cmBlack'
                                }`}
                                style={{fontWeight: '700', fontSize: '16px'}}
                            >
                                {' '}
                                {formattedNumberFields(tableData?.total_due, '$')}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ReconcilliationsTable
