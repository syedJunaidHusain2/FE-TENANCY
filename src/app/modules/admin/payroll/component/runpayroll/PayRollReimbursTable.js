import {useState, useEffect, useMemo} from 'react'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {
    getReimbursementDetailsService,
    getReportReimbursementDetailsService,
} from '../../../../../../services/Services'
import {getValidDate} from '../../../../../../constants/constants'
import {TABLE_BORDER, formattedNumberFields} from '../../../../../../helpers/CommonHelpers'
import CustomImage from '../../../../../../customComponents/customImage/CustomImage'
import CustomModal from '../../../../../../customComponents/customModal/CustomModal'

const PayRollReimbursTable = ({show, handleClose, payrollMetaData, report}) => {
    const [loading, setLoading] = useState(false)
    const [reimbursData, setReimburseData] = useState(null)

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

    useEffect(() => {
        if (show) {
            setLoading(true)
            if (report) {
                getReportReimbursementDetailsService(commonDataShouldBePassAsBodyInApi)
                    .then((res) => setReimburseData(res?.data))
                    .finally(() => setLoading(false))
            } else
                getReimbursementDetailsService(commonDataShouldBePassAsBodyInApi)
                    .then((res) => setReimburseData(res?.data))
                    .finally(() => setLoading(false))
        }
    }, [payrollMetaData])

    return (
        <CustomModal
            show={show}
            onHide={handleClose}
            maxWidth='1300'
            title={` Reimbursements | ${payrollMetaData?.name}`}
        >
            <div className='' style={{position: 'relative'}}>
                <CustomLoader full visible={loading} />

                <div className='modal-body px-lg-10'>
                    {/* table */}
                    <div className='my-sm-10 table-responsive overflow-auto rounded'>
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
                                    {/* <th st></th> */}
                                    <th className='p-5 text-nowrap '>Approved By</th>
                                    <th className=' p-5 '>Date</th>
                                    <th className=' p-5'>Amount</th>
                                    <th className=' p-5 '>Description</th>
                                </tr>
                            </thead>
                            <tbody className={TABLE_BORDER}>
                                {reimbursData?.length > 0 ? (
                                    <>
                                        {reimbursData?.map((item, i) => (
                                            <tr
                                                key={i}
                                                className=' text-cmGrey700'
                                                style={{
                                                    height: '40px',
                                                    fontSize: '14px',
                                                    fontFamily: 'Manrope',
                                                    fontWeight: 500,
                                                }}
                                            >
                                                <td
                                                    className='p-5 text-cmGrey800 text-nowrap '
                                                    style={{
                                                        textDecoration: 'underline',
                                                        fontFamily: 'Manrope',
                                                        fontWeight: '700',
                                                        fontSize: '14px',
                                                    }}
                                                >
                                                    <CustomImage
                                                        src={item?.image}
                                                        className='avatar me-3'
                                                    />{' '}
                                                    {item?.first_name} {item?.last_name ?? '-'}
                                                </td>
                                                <td
                                                    className='p-5 text-cmGrey800 text-nowrap '
                                                    style={{fontWeight: '700'}}
                                                >
                                                    {getValidDate(item?.date)}
                                                </td>
                                                <td
                                                    className='p-5 text-cmGrey800 text-nowrap '
                                                    style={{fontWeight: '700'}}
                                                >
                                                    {formattedNumberFields(item?.amount, '$')}
                                                </td>
                                                <td
                                                    className='p-5 text-cmGrey800 text-nowrap '
                                                    style={{fontWeight: '600'}}
                                                >
                                                    {item?.description ?? '-'}
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={12}
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
                </div>
            </div>
        </CustomModal>
    )
}

export {PayRollReimbursTable}
