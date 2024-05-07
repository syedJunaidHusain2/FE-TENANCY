import React, {useCallback, useEffect, useState} from 'react'
import PaymentRequestTabel from './PaymentRequestTabel'
import {
    getAdvancePaymentRequestDetailsService,
    getPaymentRequestDetailsService,
    payNowPaymentRequestService,
    updatePaymentRequestService,
} from '../../../../../../services/Services'
import {getErrorMessageFromResponse} from '../../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import CustomDialog from '../../../../../../customComponents/customDialog/CustomDialog'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import {fontsFamily} from '../../../../../../assets/fonts/fonts'
import {REQUEST_APPROVAL_TYPE_DROPDOWN_VALUES} from '../../../../../../constants/constants'
import debounce from 'lodash.debounce'

export default function PaymentRequest() {
    const [page, setPage] = useState(1)
    const [paymentRequestData, setPaymetRequestData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showPaymentRequest, setShowPaymentRequest] = useState(false)
    const [selectedArr, setSelectedArr] = useState([])
    const [search, setSearch] = useState('')
    const [searchVal, setSearchVal] = useState('')
    const [typeFilter, setTypeFilter] = useState(null)
    const [requestType, setRequestType] = useState('PaymentRequest')
    const [sortValue, setSortValue] = useState(null)
    const [sortingOrder, setSortingOrder] = useState(null)

    useEffect(() => {
        // if (showPaymentRequest) getAdvancePayment()
        // else
        getPaymentRequestData()
    }, [page, search, typeFilter, sortValue, sortingOrder, requestType])

    const getPaymentRequestData = () => {
        setLoading(true)
        getPaymentRequestDetailsService({
            page,
            search,
            filter: typeFilter,
            type: requestType,
            sort: sortValue,
            sort_val: sortingOrder,
        })
            .then((res) => {
                setPaymetRequestData(res?.data)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    const handleAdvancePayment = (val) => {
        setRequestType(val)
        setPage(1)
        setSearch('')
        setSearchVal('')
        setTypeFilter('')
    }

    const getAdvancePayment = () => {
        setLoading(true)
        getAdvancePaymentRequestDetailsService({page, search})
            .then((res) => {
                setPaymetRequestData(res?.data)
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
                getPaymentRequestData()
                setSelectedArr([])
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
                    getPaymentRequestData()
                    setSelectedArr([])
                })
                .finally(() => {
                    CustomToast.success('Paid successfully')
                })
        })
    }

    const handleSearchChange = (e) => {
        setSearchVal(e.target.value)
        delaySaveToDb(e.target.value)
    }
    const delaySaveToDb = useCallback(
        debounce((val) => {
            setSearch(val)
        }, 500),
        []
    )

    const onTypeFilterChange = (e) => {
        setSearch('')
        setSearchVal('')
        setPage(1)
        setTypeFilter(e.target.value)
    }

    return (
        <div
            className=''
            style={{
                fontFamily: fontsFamily.manrope,
                borderRadius: '0 10px 10px 10px',
            }}
        >
            <div
                className='bg-cmwhite card'
                style={{
                    fontSize: '14px',
                    borderRadius: '0 10px 0px 0px',
                    boxShadow:
                        'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                }}
            >
                <div className='w-100 p-6 d-flex align-items-center flex-wrap justify-content-between'>
                    <div className='text-cmGrey900' style={{fontSize: '16px', fontWeight: 600}}>
                        {/* Create approve and pay advance salary to your employees */}
                        {requestType === 'PaymentRequest' ? 'Requests' : 'Advance Requests'}
                    </div>
                    <div>
                        <CustomInput
                            type={INPUT_TYPE.search}
                            onChange={handleSearchChange}
                            value={searchVal}
                        />
                    </div>
                    <div className='d-flex gap-5'>
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
                    <div className='d-flex flex-center gap-5'>
                        {requestType === 'PaymentRequest' ? (
                            <div>
                                <CustomDropdown
                                    placeholder='Select Type'
                                    options={REQUEST_APPROVAL_TYPE_DROPDOWN_VALUES}
                                    onChange={onTypeFilterChange}
                                    searching={false}
                                    value={typeFilter}
                                />
                            </div>
                        ) : null}
                        <div>
                            {requestType === 'PaymentRequest' ? (
                                <CustomButton
                                    buttonType={BUTTON_TYPE.secondary}
                                    buttonLabel={'Advance Requests'}
                                    onClick={() => handleAdvancePayment('AdvancePaymentRequest')}
                                    buttonSize={BUTTON_SIZE.normal}
                                />
                            ) : (
                                <CustomButton
                                    buttonType={BUTTON_TYPE.secondary}
                                    buttonLabel={'Other  Requests'}
                                    onClick={() => handleAdvancePayment('PaymentRequest')}
                                    buttonSize={BUTTON_SIZE.normal}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <PaymentRequestTabel
                    className='mx-0 px-0'
                    paymentRequestData={paymentRequestData}
                    page={page}
                    setPage={setPage}
                    requestType={requestType}
                    loading={loading}
                    getPaymentList={getPaymentRequestData}
                    setSelectedUsers={setSelectedArr}
                    onChangesPaymentRequest={(status, id) => updatePaymentList(status, id)}
                    onChangePayNow={(id) => onPayNow(id)}
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
            </div>
        </div>
    )
}
