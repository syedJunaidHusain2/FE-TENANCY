import React, {useEffect, useState} from 'react'
import {fontsFamily} from '../../../../../../../../assets/fonts/fonts'
import {getCompanyAccountSummaryService} from '../../../../../../../../services/Services'
import {getValidDate} from '../../../../../../../../constants/constants'
import {formattedNumberFields} from '../../../../../../../../helpers/CommonHelpers'
import CustomLoader from '../../../../../../../../customComponents/customLoader/CustomLoader'
import CustomNoData from '../../../../../../../../customComponents/customNoData/CustomNoData'

const AccountSummaryCompany = ({pid}) => {
    const [tableData, setTableData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [totalAmount, setTotalAmount] = useState(null)

    useEffect(() => {
        getCompanyData()
    }, [])

    const getCompanyData = () => {
        const body = {
            pid: pid,
        }
        getCompanyAccountSummaryService(body)
            .then((res) => {
                setTotalAmount(res?.total)
                setTableData(res?.data)
            })
            .finally(() => setLoading(false))
    }

    return (
        <div className='px-10 py-5 position-relative'>
            <CustomLoader full visible={loading} />

            <div className='table-responsive'>
                <table className='table'>
                    <thead>
                        <tr
                            className='text-cmGrey500 text-cmGrey800 border-bottom border-cmGrey400'
                            style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                fontFamily: fontsFamily.manrope,
                            }}
                        >
                            <th className='text-nowrap p-5 '>Through</th>
                            <th className='text-nowrap p-5 '>Type</th>
                            <th className='text-nowrap p-5 '>Date</th>
                            <th className='text-nowrap p-5 '>Description</th>
                            <th className='text-nowrap p-5 border-end border-cmGrey400'>
                                Pay Period
                            </th>
                            <th className='text-nowrap p-5  text-center'>Due Amount</th>
                        </tr>
                    </thead>
                    <tbody className='border-bottom border-cmGrey400'>
                        {tableData?.length > 0 ? (
                            <>
                                {tableData?.map((i) => (
                                    <tr
                                        className=' text-cmGrey800'
                                        style={{
                                            fontSize: '14px',
                                            fontFamily: fontsFamily.manrope,
                                            fontWeight: 600,
                                            lineHeight: '20px',
                                        }}
                                    >
                                        <td className='p-5 text-nowrap'>
                                            {i?.through ?? '-'} ({i?.position})
                                        </td>
                                        <td className='p-5 text-nowrap'>{i?.type}</td>
                                        <td className='p-5 text-nowrap'>{getValidDate(i?.date)}</td>
                                        <td className='p-5 text-nowrap text-cmGrey700'>
                                            {i?.description}
                                        </td>
                                        <td className='p-5 text-nowrap border-end border-cmGrey400'>
                                            {getValidDate(i?.pay_period_from)} -{' '}
                                            {getValidDate(i?.pay_period_to)}
                                        </td>
                                        <td className='py-5 text-nowrap  text-center'>
                                            {formattedNumberFields(i?.withheld_amount)}
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={4}></td>
                                    <td className='border-end border-cmGrey400'>
                                        <strong className='text-right'>Total</strong>
                                    </td>
                                    <td className='text-center'>
                                        <strong>{formattedNumberFields(totalAmount)}</strong>
                                    </td>
                                </tr>
                            </>
                        ) : (
                            <>
                                <tr>
                                    <td className='py-5' colSpan={5}>
                                        <CustomNoData />
                                    </td>
                                </tr>
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AccountSummaryCompany
