import {useEffect, useMemo, useState} from 'react'
import CustomModal from '../../../../../../customComponents/customModal/CustomModal'
import {
    getPaymentRequestDetailsService,
    payNowPaymentRequestService,
    updatePaymentRequestService,
} from '../../../../../../services/Services'
import PaymentRequestTabel from '../paymentrequest/PaymentRequestTabel'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import {
    formattedNumberFields,
    getErrorMessageFromResponse,
} from '../../../../../../helpers/CommonHelpers'
import CustomDialog from '../../../../../../customComponents/customDialog/CustomDialog'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'

const ViewPayrollRequestModal = ({show, handleClose, payrollMetaData, getPayrollData}) => {
    const [requestData, setRequestData] = useState(null)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [selectedArr, setSelectedArr] = useState([])
    const [sortValue, setSortValue] = useState(null)
    const [sortingOrder, setSortingOrder] = useState(null)

    useEffect(() => {
        if (payrollMetaData) getPaymentRequestData()
    }, [payrollMetaData, page, sortValue, sortingOrder])

    const getPaymentRequestData = () => {
        const search = payrollMetaData?.name
        setLoading(true)
        getPaymentRequestDetailsService({
            page,
            search,
            type: 'Both',
            sort: sortValue,
            sort_val: sortingOrder,
        })
            .then((res) => {
                setRequestData(res?.data)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    const updatePaymentList = (status, id) => {
        setLoading(true)
        const body = {
            request_ids: id ? [id] : selectedArr,
            type: status,
        }
        updatePaymentRequestService(body)
            .then(() => {
                CustomToast.success(
                    status == 'Accept'
                        ? 'Payment Request gone to payroll'
                        : 'Payment Request declined'
                )

                handleClose()
                getPayrollData()
                // getPaymentRequestData()

                // setSelectedArr([])
            })
            .catch((e) => {
                setLoading(false)
                CustomToast.error(getErrorMessageFromResponse(e))
            })
    }
    const onPayNow = (id) => {
        const body = {
            request_id: id,
        }
        CustomDialog.warn('Are you sure you want to pay this request ?', () => {
            payNowPaymentRequestService(body)
                .then(() => {
                    handleClose()
                    getPayrollData()
                    // getPaymentRequestData()

                    // setSelectedArr([])
                })
                .finally(() => {
                    CustomToast.success('Paid successfully')
                })
        })
    }
    const subTotal = useMemo(() => {
        return requestData?.data?.reduce((acc, obj) => acc + Number(obj.amount ?? 0), 0)
    }, [requestData?.data])

    return (
        <CustomModal
            show={show}
            onHide={handleClose}
            title={`Payment Request | ${payrollMetaData?.name ?? '-'}`}
            maxWidth='1300'
        >
            <div>
                {/* Action Buttons */}
                <div className='d-flex gap-5 justify-content-end mb-5'>
                    {selectedArr?.length > 0 ? (
                        <div>
                            <CustomButton
                                buttonLabel='With Payroll'
                                onClick={() => updatePaymentList('Accept')}
                            />
                        </div>
                    ) : (
                        <></>
                    )}
                    {selectedArr?.length > 0 ? (
                        <div>
                            <CustomButton
                                buttonType={BUTTON_TYPE.error}
                                buttonLabel='Decline'
                                onClick={() => updatePaymentList('Decline')}
                            />
                        </div>
                    ) : (
                        <></>
                    )}
                </div>

                <PaymentRequestTabel
                    className='mx-0 px-0'
                    paymentRequestData={requestData}
                    page={page}
                    setPage={setPage}
                    // showPaymentRequest={showPaymentRequest}
                    loading={loading}
                    getPaymentList={getPaymentRequestData}
                    setSelectedUsers={setSelectedArr}
                    onChangesPaymentRequest={(status, id) => updatePaymentList(status, id)}
                    onChangePayNow={(id) => onPayNow(id)}
                    showTypeCol={true}
                    sortingOrder={sortingOrder}
                    sortValue={sortValue}
                    onPress={(item) => {
                        setSortValue(item)
                        setSortingOrder(
                            sortValue !== item ? 'asc' : sortingOrder === 'asc' ? 'desc' : 'asc'
                        )
                        setPage(1)
                    }}
                />
                <div className='text-end p-2'>
                    <span
                        className='text-cmGrey600 me-2'
                        style={{
                            fontFamily: 'Manrope',
                            fontWeight: '800',
                            fontSize: '14px',
                        }}
                    >
                        Sub-Total
                    </span>
                    <span className='p-5 text-cmGrey900' style={{fontWeight: 700}}>
                        {formattedNumberFields(subTotal, '$')}
                    </span>
                </div>
            </div>
        </CustomModal>
    )
}

export default ViewPayrollRequestModal
