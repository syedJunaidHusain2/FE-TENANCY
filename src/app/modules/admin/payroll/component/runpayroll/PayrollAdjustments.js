import {useState, useEffect, useMemo} from 'react'
import {
    deleteAdjustmentDetailsService,
    getAdjustmentDetailsService,
    getReportAdjustmentDetailsService,
} from '../../../../../../services/Services'
import {getValidDate} from '../../../../../../constants/constants'
import {TABLE_BORDER, formattedNumberFields} from '../../../../../../helpers/CommonHelpers'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import CustomImage from '../../../../../../customComponents/customImage/CustomImage'
import CustomModal from '../../../../../../customComponents/customModal/CustomModal'
import CustomDialog from '../../../../../../customComponents/customDialog/CustomDialog'

const PayrollAdjustments = ({show, handleClose, payrollMetaData, report}) => {
    const [loading, setLoading] = useState(false)
    const [adjustmentData, setAdjustmentData] = useState(null)

    useEffect(() => {
        if (show) {
            setLoading(true)
            getAdjustmentDetails()
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

    const getAdjustmentDetails = () => {
        if (report) {
            getReportAdjustmentDetailsService(commonDataShouldBePassAsBodyInApi)
                .then((res) => setAdjustmentData(res))
                .finally(() => setLoading(false))
        } else
            getAdjustmentDetailsService(commonDataShouldBePassAsBodyInApi)
                .then((res) => setAdjustmentData(res))
                .finally(() => setLoading(false))
    }

    const removeAdjustment = (item) => {
        const body = {
            payroll_id: payrollMetaData?.payroll_id,
            user_id: item?.id,
        }
        CustomDialog.warn('Are you sure you want to remove this adjustment ?', () => {
            setLoading(true)
            deleteAdjustmentDetailsService(body).then(() => {
                getAdjustmentDetails()
            })
        })
    }
    return (
        <CustomModal
            show={show}
            onHide={handleClose}
            maxWidth='1300'
            title={`Adjustments | ${payrollMetaData?.name}`}
        >
            <div className='' style={{position: 'relative'}}>
                <CustomLoader full visible={loading} />

                <div className='px-lg-10'>
                    {/* table */}
                    <div className='table-responsive rounded'>
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
                                    <th className=' p-5 text-nowrap'>Approved By</th>
                                    <th className=' p-5 '>Date</th>
                                    <th className=' p-5 '>Type</th>
                                    <th className=' p-5'>Amount</th>
                                    <th className=' p-5 '>Description</th>
                                    {adjustmentData?.payroll_status != 3 ? (
                                        <th className=' p-5 '></th>
                                    ) : null}
                                </tr>
                            </thead>
                            <tbody className={TABLE_BORDER}>
                                {adjustmentData?.data?.length > 0 ? (
                                    <>
                                        {adjustmentData?.data?.map((item, i) => (
                                            <tr
                                                key={i}
                                                className=' text-cmGrey800'
                                                style={{
                                                    fontSize: '14px',
                                                    fontFamily: 'Manrope',
                                                    fontWeight: 500,
                                                }}
                                            >
                                                <td
                                                    className='p-5 text-nowrap '
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
                                                    className='p-5 text-nowrap '
                                                    style={{fontWeight: 700}}
                                                >
                                                    {getValidDate(item?.date)}
                                                </td>
                                                <td
                                                    className='p-5 text-nowrap '
                                                    style={{fontWeight: 700}}
                                                >
                                                    {item?.type ?? '-'}
                                                </td>
                                                <td
                                                    className='p-5 text-nowrap '
                                                    style={{fontWeight: 700}}
                                                >
                                                    {formattedNumberFields(item?.amount, '$')}
                                                </td>
                                                <td className='p-5 ' style={{fontWeight: 600}}>
                                                    {item?.description ?? '-'}
                                                </td>
                                                {adjustmentData?.payroll_status != 3 ? (
                                                    <td
                                                        className='p-5 text-nowrap cursor-pointer'
                                                        onClick={() => removeAdjustment(item)}
                                                    >
                                                        <i class='bi bi-x-circle fs-3 text-cmError'></i>
                                                    </td>
                                                ) : null}
                                            </tr>
                                        ))}
                                    </>
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
                </div>
            </div>
        </CustomModal>
    )
}

export {PayrollAdjustments}
