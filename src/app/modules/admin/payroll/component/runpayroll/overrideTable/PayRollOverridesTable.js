import {useState, useEffect, useMemo} from 'react'
import {
    getOverrideDetailsService,
    getReportOverrideDetailsService,
} from '../../../../../../../services/Services'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'
import {TABLE_BORDER, formattedNumberFields} from '../../../../../../../helpers/CommonHelpers'
import CustomModal from '../../../../../../../customComponents/customModal/CustomModal'
import RunPayrollComment from '../RunPayrollComment'
import CommanOverrideRow from './CommanOverrideRow'

const PayRollOverridesTable = ({
    show,
    handleClose,
    payrollMetaData,
    finalize_status = 1,
    report,
}) => {
    const [loading, setLoading] = useState(false)
    const [overrideData, setOverrideData] = useState(null)
    const [comment, setComment] = useState(null)
    const [openCommentBox, setOpenCommentBox] = useState(false)

    useEffect(() => {
        if (show) {
            getOverrideDetails()
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
            payrollMetaData?.payroll_id,
            payrollMetaData?.pay_period_from,
            payrollMetaData?.pay_period_to,
            payrollMetaData?.user_id,
        ]
    )

    const getOverrideDetails = () => {
        setLoading(true)
        if (report) {
            getReportOverrideDetailsService(commonDataShouldBePassAsBodyInApi)
                .then((res) => setOverrideData(res))
                .finally(() => setLoading(false))
        } else
            getOverrideDetailsService(commonDataShouldBePassAsBodyInApi)
                .then((res) => setOverrideData(res))
                .finally(() => setLoading(false))
    }

    const closeCommentBox = () => {
        setOpenCommentBox(false)
    }
    const handleCommentSubmit = (e) => {
        e.preventDefault()
        closeCommentBox()
    }

    return (
        <CustomModal
            show={show}
            onHide={handleClose}
            title={`Overrides | ${payrollMetaData?.name}`}
            maxWidth='1300'
        >
            <div className='' tyle={{position: 'relative'}}>
                <CustomLoader full visible={loading} />

                <div className=''>
                    {/* table */}
                    <div className='table-responsive overflow-auto rounded w-100'>
                        <table className='table'>
                            <thead className={TABLE_BORDER}>
                                <tr
                                    className='bg-cmGrey300 text-cmGrey900 '
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        fontFamily: 'Manrope',
                                    }}
                                >
                                    {/* <th st></th> */}
                                    <th className='text-nowrap p-5 '>PID</th>
                                    <th className='text-nowrap p-5 '>Customer Name</th>
                                    <th className='text-nowrap p-5 '>Override Over</th>
                                    <th className='text-nowrap p-5 '>Type</th>
                                    <th className='text-nowrap p-5 '>KW installed</th>
                                    <th className='text-nowrap p-5 '>Override</th>
                                    <th className='text-nowrap p-5 '>Total Amount</th>
                                    <th className='text-nowrap p-5 '>Adjustment</th>
                                    {overrideData?.payroll_status != 3 ? (
                                        <th className='text-nowrap p-5 '></th>
                                    ) : null}
                                </tr>
                            </thead>
                            <tbody className={TABLE_BORDER}>
                                {overrideData?.data?.data?.length > 0 ? (
                                    <>
                                        {overrideData?.data?.data?.map((item, i) => (
                                            <CommanOverrideRow
                                                item={item}
                                                i={i}
                                                payrollData={payrollMetaData}
                                                getOverrideDetails={getOverrideDetails}
                                                finalize_status={finalize_status}
                                                paidStatus={overrideData?.payroll_status != 3}
                                            />
                                        ))}
                                    </>
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={8}
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
                        <div className='d-flex align-items-center mt-5 justify-content-end'>
                            <div></div>
                            <div className='text-nowrap p-2 ' style={{fontSize: '15px'}}>
                                <span
                                    className='text-cmGrey600 me-5'
                                    style={{fontWeight: '700', fontFamily: 'Manrope'}}
                                >
                                    Sub-Total
                                </span>
                                <span
                                    className='text-cmGrey900'
                                    style={{fontWeight: '700', fontFamily: 'Manrope'}}
                                >
                                    {formattedNumberFields(overrideData?.data?.sub_total)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {openCommentBox ? (
                    <RunPayrollComment
                        comment={comment}
                        setComment={setComment}
                        show={openCommentBox}
                        onHide={closeCommentBox}
                        handleSubmit={handleCommentSubmit}
                    />
                ) : null}
            </div>
        </CustomModal>
    )
}

export {PayRollOverridesTable}
