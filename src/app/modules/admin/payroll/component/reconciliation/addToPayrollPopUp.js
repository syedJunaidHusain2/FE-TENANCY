import React, {useCallback, useEffect, useMemo, useState} from 'react'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {Dialog} from 'primereact/dialog'
import usePayFrequency from '../../../../../../hooks/usePayFrequency'
import {getValidDate} from '../../../../../../constants/constants'
import {addToPayrollReconciliationService} from '../../../../../../services/Services'
import {
    ADD_TO_PAYROLL_VALIDATION_FIELD,
    addToPayrollValidation,
} from '../../../../../../validations/validations'
import {
    getErrorMessageFromResponse,
    isEmptyObjectValue,
} from '../../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'

const AddToPayrollPopUp = ({show, handleClose, getReconciliationData}) => {
    const [loading, setLoading] = useState(false)
    const [payrollError, setPayrollError] = useState(ADD_TO_PAYROLL_VALIDATION_FIELD)
    const [addToPayrollBody, setAddToPayrollBody] = useState({
        daily: null,
        weekly: null,
        biweekly: null,
        semimonthly: null,
        monthly: null,
    })

    const {payPeriodList, monthlyPayPeriodList, weekDropdownList} = usePayFrequency()

    const handleWeekPayPeriod = (e) => {
        let data =
            payPeriodList?.length > 0
                ? payPeriodList?.find((item) => item?.id == e.target.value)
                : null
        setAddToPayrollBody((prevState) => ({
            ...prevState,
            weekly: {
                pay_period_from: data?.pay_period_from,
                pay_period_to: data?.pay_period_to,
                id: data?.id,
            },
        }))
    }
    const handleMonthPayPeriod = (e) => {
        let data =
            payPeriodList?.length > 0
                ? monthlyPayPeriodList?.find((item) => item?.id == e.target.value)
                : null

        setAddToPayrollBody((prevState) => ({
            ...prevState,
            monthly: {
                pay_period_from: data?.pay_period_from,
                pay_period_to: data?.pay_period_to,
                id: data?.id,
            },
        }))
    }

    const closeModal = () => {
        handleClose()
    }
    const onAddToPayroll = () => {
        const obj = Object.fromEntries(
            Object.entries(addToPayrollBody).filter(([key, val]) => val !== null)
        )
        const body = {
            data: obj,
        }
        const toCheckWeekly = hasPayFrequencyEnabled(2)
        const toCheckMonthly = hasPayFrequencyEnabled(5)

        const validationErrors = addToPayrollValidation(body, toCheckWeekly, toCheckMonthly)
        setPayrollError(validationErrors)

        if (isEmptyObjectValue(validationErrors)) {
            setLoading(true)
            addToPayrollReconciliationService(body)
                .then(() => {
                    closeModal()
                    CustomToast.success('Added to payroll successfully')
                    getReconciliationData()
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
                .finally(() => setLoading(false))
        }
    }

    const periodList = useMemo(() => {
        return payPeriodList?.map((item) => ({
            ...item,
            period: `${getValidDate(item?.pay_period_from)} to ${getValidDate(
                item?.pay_period_to
            )}`,
        }))
    }, [payPeriodList])

    const monthlyPeriodList = useMemo(() => {
        return monthlyPayPeriodList?.map((item) => ({
            ...item,
            period: `${getValidDate(item?.pay_period_from)} to ${getValidDate(
                item?.pay_period_to
            )}`,
        }))
    }, [monthlyPayPeriodList])

    const hasPayFrequencyEnabled = (keyToFind) => {
        return weekDropdownList.some((item) => item.frequency_type_id === keyToFind)
    }

    return (
        <Dialog
            id='kt_modal_create_app'
            tabIndex={-1}
            aria-hidden='true'
            header='Add To Payroll'
            className='mw-sm-800px w-sm-75'
            visible={show}
            onHide={closeModal}
            backdrop={true}
        >
            <hr className='m-0 p-0 text-cmGrey900' />
            <div
                className='m-0 p-0'
                style={{fontFamily: 'Manrope', fontSize: '14px', position: 'relative'}}
            >
                <CustomLoader full visible={loading} />

                <div className=''>
                    <div className='modal-body  py-2 px-lg-10 mb-5'>
                        <div className='py-lg-3 px-lg-10 mt-3'>
                            <>
                                <div
                                    className='d-flex align-items-center flex-wrap justify-content-between w-sm-75 mx-auto'
                                    style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                >
                                    <div className='w-50'>
                                        <h4
                                            className='text-cmGrey800 mb-sm-5 mb-3 text-decoration-underline'
                                            style={{fontWeight: '900'}}
                                        >
                                            Pay Frequency
                                        </h4>
                                    </div>
                                    <div className='w-50 text-center'>
                                        <h4
                                            className='text-cmGrey800 mb-sm-5 mb-3 text-decoration-underline'
                                            style={{fontWeight: '900'}}
                                        >
                                            Pay Period
                                        </h4>
                                    </div>
                                </div>
                                <hr style={{height: '2px'}} />
                            </>
                        </div>
                        {hasPayFrequencyEnabled(2) ? (
                            <div className='py-lg-3 px-lg-10 '>
                                <>
                                    <div
                                        className='d-flex align-items-center flex-wrap justify-content-between w-sm-75 mx-auto'
                                        style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                    >
                                        <div>
                                            <h4
                                                className='text-cmGrey800 mb-sm-5 mb-3'
                                                style={{fontWeight: '900'}}
                                            >
                                                Weekly:
                                            </h4>
                                        </div>
                                        <div className='w-sm-auto w-100'>
                                            <CustomDropdown
                                                options={periodList}
                                                displayKey='period'
                                                valueKey='id'
                                                value={addToPayrollBody?.weekly?.id}
                                                onChange={handleWeekPayPeriod}
                                                errorMessage={payrollError?.week}
                                            />
                                        </div>
                                    </div>
                                    <hr style={{height: '2px'}} />
                                </>
                            </div>
                        ) : (
                            <></>
                        )}
                        {hasPayFrequencyEnabled(5) ? (
                            <div className='py-lg-3 px-lg-10 '>
                                <>
                                    <div
                                        className='d-flex align-items-center flex-wrap justify-content-between w-sm-75 mx-auto'
                                        style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                    >
                                        <div>
                                            <h4
                                                className='text-cmGrey800 mb-sm-5 mb-3'
                                                style={{fontWeight: '900'}}
                                            >
                                                Monthly:
                                            </h4>
                                        </div>
                                        <div className='w-sm-auto w-100'>
                                            <CustomDropdown
                                                options={monthlyPeriodList}
                                                displayKey='period'
                                                onChange={handleMonthPayPeriod}
                                                valueKey='id'
                                                value={addToPayrollBody?.monthly?.id}
                                                errorMessage={payrollError?.month}
                                            />
                                        </div>
                                    </div>
                                    <hr style={{height: '2px'}} />
                                </>
                            </div>
                        ) : null}
                    </div>
                    <div className='text-center'>
                        <div
                            className='btn bg-cmBlue-Crayola py-2 text-cmwhite'
                            style={{fontWeight: '500'}}
                            onClick={onAddToPayroll}
                        >
                            Add To Payroll
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default AddToPayrollPopUp
