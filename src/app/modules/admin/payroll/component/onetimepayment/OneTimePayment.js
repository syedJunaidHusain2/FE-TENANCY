import React, {useCallback, useState, useEffect} from 'react'
import CustomSearchInput from '../../../../../../customComponents/customInputs/customSearchInput/CustomSearchInput'
import {
    getFinilizePayrollService,
    getRecuiterFilterService,
    oneTimePaymentService,
    oneTimePaymentTotalService,
} from '../../../../../../services/Services'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import {
    oneTimePaymentValidation,
    ONETIME_PAYMENT_VALIDATION_FIELD,
} from '../../../../../../validations/validations'
import {
    formattedNumberFields,
    getErrorMessageFromResponse,
    isEmptyObjectValue,
} from '../../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import OneTimePaymentHistory from './OneTimePaymentHistory'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'

export default function OneTimePayment() {
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [loading, setLoading] = useState(null)
    const [payAmount, setPayAmount] = useState(null)
    const [description, setDescription] = useState(null)
    const [paymentFormError, setPaymentFormError] = useState(ONETIME_PAYMENT_VALIDATION_FIELD)
    const [showHistory, setshowHistory] = useState(false)
    const [paymentTotal, setPaymentTotal] = useState(null)

    useEffect(() => {
        getFinilizePayrollService().then((res) => {})
        oneTimePaymentTotalService(4)
            .then((res) => setPaymentTotal(res.data))
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
    }, [])
    const onSeachLead = useCallback(
        (searchText) =>
            new Promise((resolve) => {
                getRecuiterFilterService(searchText)
                    .then((res) => {
                        const data = res?.data?.map((item) => ({
                            ...item,
                            name: `${item?.first_name} ${item?.last_name}`,
                        }))

                        resolve(data)
                    })
                    .catch(() => {
                        resolve([])
                    })
            }),
        []
    )
    const onSelectTeamLead = useCallback((value) => {
        setSelectedEmployee(value)
    }, [])

    const payNow = (e) => {
        e.preventDefault()
        const body = {
            user_id: selectedEmployee?.id,
            amount: payAmount,
            description: description,
            adjustment_type_id: 3, // For now, Advance
        }
        const validationErrors = oneTimePaymentValidation(body)
        setPaymentFormError(validationErrors)
        if (isEmptyObjectValue(validationErrors)) {
            setLoading(true)
            oneTimePaymentService(body)
                .then(() => {
                    CustomToast.success('Payment Created Successfully')
                    setPayAmount(null)
                    setSelectedEmployee(null)
                    setDescription(null)
                    setPayAmount(null)
                    setDescription(null)
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }

    const handleShowHistory = () => {
        setshowHistory(!showHistory)
    }

    return (
        <div className='' style={{position: 'relative'}}>
            <CustomLoader visible={loading} full />

            {!showHistory ? (
                <div className='row gap-sm-0 gap-10'>
                    <div className='col-sm-9 '>
                        <div
                            className='card'
                            style={{
                                borderRadius: '0 10px 10px 10px',
                                boxShadow:
                                    'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                            }}
                        >
                            <div
                                className='card-body  ms-4 me-4 mt-4 text-cmGrey500'
                                style={{fontSize: '14px', fontFamily: 'Manrope', fontWeight: 600}}
                            >
                                Pay your employees instantly outside their regular payroll cycle
                                using our new
                                <label style={{fontFamily: 'Manrope'}} className='ms-1 text-cminfo'>
                                    one-time payments
                                </label>{' '}
                                feature. Please note that this is not a substitute for executing
                                payroll,
                                <label style={{fontFamily: 'Manrope'}} className='ms-1 text-cminfo'>
                                    {' '}
                                    salary advance
                                </label>
                                , or{' '}
                                <label style={{fontFamily: 'Manrope'}} className='ms-1 text-cminfo'>
                                    reimbursements
                                </label>
                                . A one-time payment helps in immediately paying a bonus, incentive
                                etc to your employees, which gets added to their next payroll’s
                                earnings.
                            </div>
                            <div className='border-bottom border-cmGrey200'></div>
                            <form onSubmit={payNow}>
                                <div className='d-flex  justify-content-center mt-4 mx-sm-0  mx-5'>
                                    <div className='d-flex flex-column'>
                                        <div
                                            className='text-center text-cmGrey600 mb-8'
                                            style={{
                                                fontFamily: 'Manrope',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                            }}
                                        >
                                            Add a Payment
                                        </div>
                                        <div className='mb-5'>
                                            <label
                                                className='mb-2 text-cmGrey700'
                                                style={{fontFamily: 'Manrope', fontWeight: 600}}
                                            >
                                                Who do you want to make the payment to?{' '}
                                                <font className='text-cmError'>*</font>
                                            </label>
                                            <CustomSearchInput
                                                placeholder='Search an Employee'
                                                onSearch={onSeachLead}
                                                onSelectValue={onSelectTeamLead}
                                                selectedValue={selectedEmployee?.name}
                                                style={{
                                                    border: paymentFormError?.payToEmployee
                                                        ? '1px solid #FF0000'
                                                        : '1px solid #D8D8D8',
                                                    borderRadius: '10px',
                                                    fontWeight: 500,
                                                }}
                                                errorMessage={paymentFormError.payToEmployee}
                                            />
                                        </div>

                                        <div className='mb-5'>
                                            <CustomInput
                                                placeholder='Advance'
                                                disabled={true}
                                                label={'Type of Payment'}
                                                required
                                                className='mb-2'
                                                errorMessage={paymentFormError.paymentType}
                                            />
                                            <label
                                                className='text-gray-600'
                                                style={{fontWeight: 500}}
                                            >
                                                This will be reflected in the employee’s payslip as
                                                an advance
                                            </label>
                                        </div>

                                        <div className='mb-5' style={{fontSize: '12px'}}>
                                            <CustomInput
                                                label={'Total Amount'}
                                                required
                                                placeholder='Amount'
                                                onChange={(e) => {
                                                    setPayAmount(e.target.value)
                                                }}
                                                errorMessage={paymentFormError?.paymentAmount}
                                                value={payAmount}
                                                type={INPUT_TYPE.number}
                                            />
                                        </div>
                                        <div className='mt-5'>
                                            <CustomInput
                                                label={'Description'}
                                                placeholder='Add description'
                                                onChange={(e) => {
                                                    setDescription(e.target.value)
                                                }}
                                                errorMessage={''}
                                                value={description}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center mt-11 mb-9'>
                                    <CustomButton
                                        buttonType={BUTTON_TYPE.primary}
                                        buttonLabel='Pay Now'
                                        onClick={payNow}
                                        buttonSize={BUTTON_SIZE.large}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className='col-sm-3 '>
                        <div
                            className='p-8 shadow-sm w-100 mb-5 bg-white'
                            style={{borderRadius: 10}}
                        >
                            <div
                                className='text-cmGrey600 mb-2'
                                style={{fontSize: '14px', fontFamily: 'Manrope', fontWeight: 500}}
                            >
                                Total one-time Payments
                            </div>
                            <div
                                className='text-cmGrey800'
                                style={{
                                    fontFamily: 'Manrope',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                }}
                            >
                                {formattedNumberFields(paymentTotal, '$')}
                            </div>
                        </div>

                        <div
                            className='shadow-sm w-100 mt-10 h-md-160px mb-5 bg-white cursor-pointer'
                            onClick={handleShowHistory}
                            style={{borderRadius: 10}}
                        >
                            <div
                                className='text-center text-text-cmGrey800'
                                style={{
                                    fontSize: '14px',
                                    fontFamily: 'Manrope',
                                    fontWeight: 600,
                                }}
                            >
                                <label
                                    className='mt-5 text-decoration-underline cursor-pointer'
                                    onClick={handleShowHistory}
                                >
                                    One-time Payments History
                                </label>
                            </div>
                            <div
                                className='text-center text-cmGrey600 p-5 '
                                style={{fontSize: '14px', fontFamily: 'Manrope', fontWeight: 500}}
                            >
                                <label className='cursor-pointer'>View one-time payments to</label>
                                <label className='cursor-pointer'>
                                    employees that are in queue
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <OneTimePaymentHistory handleShowHistory={handleShowHistory} />
            )}
        </div>
    )
}
