import {useState, useEffect, useMemo} from 'react'
import {
    getCommissionDetailsService,
    getReportCommissionDetailsService,
} from '../../../../../../../services/Services'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'
import {TABLE_BORDER, formattedNumberFields} from '../../../../../../../helpers/CommonHelpers'
import CustomModal from '../../../../../../../customComponents/customModal/CustomModal'
import CommanCommisionRow from './CommanCommisionRow'

const PayRollCommissionsTable = ({
    show,
    handleClose,
    payrollMetaData,
    finalize_status = 1,
    report,
}) => {
    const [loading, setLoading] = useState(false)
    const [commissionData, setCommissionData] = useState(null)

    useEffect(() => {
        if (show) {
            getCommissionDetails()
        }
    }, [payrollMetaData])

    const commonDataShouldBePassAsBodyInApi = useMemo(
        () => ({
            id: payrollMetaData?.payroll_id,
            user_id: payrollMetaData?.user_id,
            pay_period_from: payrollMetaData?.pay_period_from,
            pay_period_to: payrollMetaData?.pay_period_to,
        }),
        [
            payrollMetaData?.pay_period_from,
            payrollMetaData?.pay_period_to,
            payrollMetaData?.payroll_id,
            payrollMetaData?.user_id,
        ]
    )

    const getCommissionDetails = () => {
        setLoading(true)
        if (report) {
            getReportCommissionDetailsService(commonDataShouldBePassAsBodyInApi)
                .then((res) => setCommissionData(res))
                .finally(() => setLoading(false))
        } else {
            getCommissionDetailsService(commonDataShouldBePassAsBodyInApi)
                .then((res) => setCommissionData(res))
                .finally(() => setLoading(false))
        }
    }

    return (
        <CustomModal
            show={show}
            onHide={handleClose}
            maxWidth='1300'
            title={`Commissions | ${payrollMetaData?.name}`}
        >
            <div style={{position: 'relative'}}>
                <CustomLoader full visible={loading} />
                <div className=''>
                    <div className='table-responsive overflow-auto rounded w-100 shadow-sm'>
                        <table className='table'>
                            <thead className={TABLE_BORDER}>
                                <tr
                                    className='bg-cmGrey300 text-cmGrey900'
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    <th className='text-nowrap p-5'>PID</th>
                                    <th className='text-nowrap p-5 text-nowrap '>Customer</th>
                                    <th className='text-nowrap p-5 text-nowrap '>Position</th>
                                    <th className=' p-5 text-nowrap'>State</th>
                                    <th className=' p-5 text-nowrap'>Rep Redline</th>
                                    <th className='text-nowrap p-5'>KW</th>
                                    <th className=' p-5 text-nowrap'>Net EPC</th>
                                    <th className=' p-5 text-nowrap'>Adders</th>
                                    <th className=' p-5 text-nowrap'>Amount</th>
                                    <th className=' p-5 text-nowrap'>Adjustment</th>
                                    <th className='p-5 text-nowrap'>Type</th>
                                    {!finalize_status && commissionData?.payroll_status != 3 ? (
                                        <th className='p-5 text-nowrap'></th>
                                    ) : null}
                                </tr>
                            </thead>
                            <tbody className={TABLE_BORDER}>
                                {commissionData?.data?.data?.length > 0 ? (
                                    <>
                                        {commissionData?.data?.data.map((item, i) => (
                                            <CommanCommisionRow
                                                item={item}
                                                i={i}
                                                getCommissionDetails={getCommissionDetails}
                                                payrollData={payrollMetaData}
                                                finalize_status={finalize_status}
                                                paidStatus={commissionData?.payroll_status != 3}
                                            />
                                        ))}
                                    </>
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={11}
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

                    <div className='d-flex align-items-center justify-content-between mx-10 mt-5'>
                        <div></div>
                        <div style={{fontSize: '15px'}}>
                            <span
                                className='text-cmGrey600 me-5 p-1 '
                                style={{fontWeight: '700', fontFamily: 'Manrope'}}
                            >
                                Sub-Total
                            </span>
                            <span
                                className='text-cmGrey900'
                                style={{fontWeight: '700', fontFamily: 'Manrope'}}
                            >
                                {formattedNumberFields(commissionData?.data?.subtotal, '$')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* buttons */}
        </CustomModal>
    )
}

export {PayRollCommissionsTable}
