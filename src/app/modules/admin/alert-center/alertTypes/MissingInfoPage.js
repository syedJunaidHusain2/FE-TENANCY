import React, {useEffect, useState, useCallback, useMemo} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import {getClosersAction, getSettersAction} from '../../../../../redux/actions/SettingActions'
import {
    getAllAlertMissingDataService,
    getSalesAndMissingRepMissingDetailService,
    updateMissingDataAlertCenterService,
    updateMissingPayPeriodService,
} from '../../../../../services/Services'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import {useDispatch, useSelector} from 'react-redux'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomButton, {BUTTON_TYPE} from '../../../../../customComponents/customButtton/CustomButton'
import {
    formattedNumberFields,
    formattedPhoneNumber,
    getErrorMessageFromResponse,
    getLocationRedlineHelper,
    getRepRedlineFromSale,
    isInputValueExist,
    percentageLimitCheck,
} from '../../../../../helpers/CommonHelpers'
import {MAIN_POSITTIONS_ID, MISSING_KEYS, getValidDate} from '../../../../../constants/constants'
import {
    getAllClosersSelector,
    getAllLocationsSelector,
    getAllSettersSelector,
} from '../../../../../redux/selectors/SettingsSelectors'
import CustomDropdown from '../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import usePayFrequency from '../../../../../hooks/usePayFrequency'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'

const FIELD_KEYS = {
    pid: 'pid',
    prospect_id: 'prospect_id',
    installer: 'installer',
    customer_name: 'customer_name',
    customer_address: 'customer_address',
    customer_address2: 'customer_address2',
    customer_city: 'customer_city',
    customer_state: 'customer_state',
    customer_email: 'customer_email',
    customer_phone: 'customer_phone',
    customer_zip: 'customer_zip',
    cancel_date: 'cancel_date',
    homeowner_id: 'homeowner_id',
    proposal_id: 'proposal_id',
    redline: 'redline',
    kw: 'kw',
    rep_id: 'rep_id',
    rep_email: 'rep_email',
    setter_id: 'setter_id',
    approved_date: 'approved_date',
    last_date_pd: 'last_date_pd',
    m1_date: 'm1_date',
    m2_date: 'm2_date',
    product: 'product',
    total_for_acct: 'total_for_acct',
    gross_account_value: 'gross_account_value',
    prev_paid: 'prev_paid',
    epc: 'epc',
    net_epc: 'net_epc',
    m1_amount: 'm1_amount',
    m2_amount: 'm2_amount',
    dealer_fee_percentage: 'dealer_fee_percentage',
    dealer_fee_amount: 'dealer_fee_amount',
    prev_deducted_amount: 'prev_deducted_amount',
    cancel_fee: 'cancel_fee',
    show: 'show',
    cancel_deduction: 'cancel_deduction',
    adders_description: 'adders_description',
    lead_cost_amount: 'lead_cost_amount',
    adv_pay_back_amount: 'adv_pay_back_amount',
    total_amount_in_period: 'total_amount_in_period',
}

const ERRORS = {
    dealer_fee_percentage: 'Enter Dealer Fee Percantage',
    customer_name: 'Enter Customer Name',
    kw: 'Enter KW ',
    net_epc: 'Enter Net Epc',
    epc: 'Enter Epc',
    prospect_id: 'Enter Prospect Id',
    customer_state: 'Enter Customer State',
    gross_account_value: 'Gross Amount Value',
    closer1_data: 'Select Closer 1 Pay Period',
    closer2_data: 'Select Closer 2 Pay Period',
    setter1_data: 'Select Setter 1 Pay Period',
    setter2_data: 'Select Setter 2 Pay Period',
}
const SETTER_CLOSER_SUBKEYS = {
    setter1_data: {
        m1: 'setter1_paid_status_m1',
        m2: 'setter1_paid_status_m2',
    },
    setter2_data: {
        m1: 'setter2_paid_status_m1',
        m2: 'setter2_paid_status_m2',
    },
    closer1_data: {
        m1: 'closer1_paid_status_m1',
        m2: 'closer1_paid_status_m2',
    },
    closer2_data: {
        m1: 'closer2_paid_status_m1',
        m2: 'closer2_paid_status_m2',
    },
}

const MissingInfoPage = () => {
    const [loading, setLoading] = useState(true)
    const location = useLocation()
    const naviagte = useNavigate()
    const dispatch = useDispatch()
    const [missingData, setMissingData] = useState(null)
    const allLocations = useSelector(getAllLocationsSelector)
    const closersList = useSelector(getAllClosersSelector)
    const settersList = useSelector(getAllSettersSelector)
    const navigate = useNavigate()
    const missingKeys = location?.state?.missingKeys

    const {payPeriodList, weeklyPayPeriod, monthlyPayPeriodList} = usePayFrequency()
    const [closerSetterM1M2PayrollData, setCloserSetterM1M2PayrollData] = useState({
        closer1_data: {
            m1_payrollId: null,
            m2_payrollId: null,
            pay_period_from_m2: null,
            pay_period_to_m2: null,
            pay_period_from_m1: null,
            pay_period_to_m1: null,
        },
        closer2_data: {
            m1_payrollId: null,
            m2_payrollId: null,
            pay_period_from_m2: null,
            pay_period_to_m2: null,
            pay_period_from_m1: null,
            pay_period_to_m1: null,
        },
        setter1_data: {
            m1_payrollId: null,
            m2_payrollId: null,
            pay_period_from_m2: null,
            pay_period_to_m2: null,
            pay_period_from_m1: null,
            pay_period_to_m1: null,
        },
        setter2_data: {
            m1_payrollId: null,
            m2_payrollId: null,
            pay_period_from_m2: null,
            pay_period_to_m2: null,
            pay_period_from_m1: null,
            pay_period_to_m1: null,
        },
    })

    useEffect(() => {
        getSetterCloser()
    }, [])

    const getSetterCloser = useCallback(() => {
        dispatch(getClosersAction())
        dispatch(getSettersAction())
    }, [dispatch])

    useEffect(() => {
        let alertType = location?.state?.alertType
        if (alertType == 'Sales' || alertType == 'Missing Rep') {
            getSalesAndMissingRepMissingDetailService(location?.state?.pid)
                ?.then((res) => {
                    setMissingData(res?.data)
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            getAllAlertMissingDataService(location?.state?.pid)
                ?.then((res) => {
                    setMissingData(res?.data)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [location?.state?.pid])

    const allLocationsList = useMemo(() => {
        return allLocations?.map((item) => ({
            ...item,
            LocationItems: `${item?.state_name} | ${item?.general_code}`,
        }))
    }, [allLocations])

    const selectedCloser1 = useMemo(() => {
        const uniqueId = missingData?.rep_id ?? missingData?.closer1_data?.id
        return uniqueId && closersList?.length > 0
            ? closersList?.find((item) => item?.id == uniqueId)
            : null
    }, [closersList, missingData?.closer1_data?.id, missingData?.rep_id])

    const selectedSetter1 = useMemo(() => {
        const uniqueId = missingData?.setter_id ?? missingData?.setter1_detail?.id
        return settersList?.length > 0 ? settersList?.find((item) => item?.id == uniqueId) : null
    }, [missingData?.setter1_detail?.id, missingData?.setter_id, settersList])

    const selectedCloser2 = useMemo(() => {
        const uniqueId = missingData?.rep_id2 ?? missingData?.closer2_detail?.id
        return uniqueId && closersList?.length > 0
            ? closersList?.find((item) => item?.id == uniqueId)
            : null
    }, [closersList, missingData?.closer2_detail?.id, missingData?.rep_id2])

    const selectedSetter2 = useMemo(() => {
        const uniqueId = missingData?.setter_id2 ?? missingData?.setter2_detail?.id
        return settersList?.length > 0 ? settersList?.find((item) => item?.id == uniqueId) : null
    }, [missingData?.setter2_detail?.id, missingData?.setter_id2, settersList])

    const selectedCustomerState = useMemo(() => {
        const uniqueId = missingData?.customer_state
        const data = allLocations?.find((item) => item?.general_code == uniqueId)
        return data
    }, [allLocations, missingData?.customer_state])

    const stateRedline = useMemo(() => {
        const data = getLocationRedlineHelper(selectedCustomerState, missingData?.approved_date)
        return data
    }, [missingData?.approved_date, selectedCustomerState])

    const getPayPeriodFromPositionID = useCallback(
        (frequencyId) => {
            if (frequencyId == '2') {
                return weeklyPayPeriod
            } else if (frequencyId == '5') {
                return monthlyPayPeriodList
            } else {
                return []
            }
        },
        [monthlyPayPeriodList, weeklyPayPeriod]
    )

    const RepRedlineInfo = ({rep = null, positionType = null}) => {
        const redline_data = getRepRedlineFromSale(
            positionType,
            selectedCustomerState,
            stateRedline?.current?.redline_standard,
            rep,
            missingData?.approved_date
        )

        return rep ? (
            <div className='badge bg-cmPastelsLightgreen text-dark mb-2'>
                Redline: {redline_data?.redline}
                {' | '}
                {redline_data?.type}
            </div>
        ) : null
    }

    const onChangeInputData = (e) => {
        updateMissingData(e?.target?.name, e?.target?.value)
    }

    const onChangeDealerFee = (e) => {
        let {value, max, name} = e.target
        if (percentageLimitCheck(max, value)) onChangeInputData(e)
    }

    const updateMissingData = (field, value) => {
        setMissingData((val) => ({
            ...val,
            [field]: value,
        }))
    }
    const onChangeCloserSetterM1M2PayPeriod = (objectName, propertyName, value, userID) => {
        let period = payPeriodList?.find((item) => item?.id == value)
        if (propertyName == 'm1_payrollId') {
            setCloserSetterM1M2PayrollData((val) => ({
                ...val,
                [objectName]: {
                    ...val[objectName],
                    [propertyName]: value,
                    user_id: userID,
                    pay_period_from_m1: period?.pay_period_from,
                    pay_period_to_m1: period?.pay_period_to,
                },
            }))
        }
        if (propertyName == 'm2_payrollId') {
            setCloserSetterM1M2PayrollData((val) => ({
                ...val,
                [objectName]: {
                    ...val[objectName],
                    [propertyName]: value,
                    user_id: userID,
                    pay_period_from_m2: period?.pay_period_from,
                    pay_period_to_m2: period?.pay_period_to,
                },
            }))
        }
    }

    const closer1List = useMemo(() => {
        return closersList?.filter((item) => item?.id != selectedCloser2?.id)
    }, [closersList, selectedCloser2])

    // const closer2List = useMemo(() => {
    //     return closersList?.filter((item) => item?.id != selectedCloser1?.id)
    // }, [closersList, selectedCloser1?.id])

    // const setter1List = useMemo(() => {
    //     return settersList?.filter((item) => item?.id != selectedSetter2?.id)
    // }, [settersList, selectedSetter2])

    const setter2List = useMemo(() => {
        return settersList?.filter((item) => item?.id != selectedSetter2?.id)
    }, [settersList, selectedSetter2?.id])

    const checkRequiredKeys = useCallback(
        (data) => {
            for (const key of missingKeys) {
                if (!data[key]) {
                    return key
                }
            }
            return null
        },
        [missingKeys]
    )

    const checkM1M2Validation = useCallback(
        (key) => {
            if (missingKeys?.includes(MISSING_KEYS.m1)) {
                if (
                    missingData?.[key] &&
                    missingData?.[key]?.[SETTER_CLOSER_SUBKEYS[key]?.m1] == 1 &&
                    !closerSetterM1M2PayrollData?.[key]?.m1_payrollId
                )
                    return key
            } else if (missingKeys?.includes(MISSING_KEYS.m2)) {
                if (
                    missingData?.[key] &&
                    missingData?.[key]?.[SETTER_CLOSER_SUBKEYS[key]?.m2] == 1 &&
                    !closerSetterM1M2PayrollData?.[key]?.m2_payrollId
                )
                    return key
            } else if (
                missingKeys?.includes(MISSING_KEYS?.m1_m2) ||
                missingKeys?.includes(MISSING_KEYS.m2_m1)
            ) {
                if (
                    missingData?.[key] &&
                    missingData?.[key]?.[SETTER_CLOSER_SUBKEYS[key]['m2']] == 1 &&
                    !closerSetterM1M2PayrollData?.[key]?.m2_payrollId
                )
                    return key
                if (
                    missingData?.[key] &&
                    missingData?.[key]?.[SETTER_CLOSER_SUBKEYS[key]?.m1] == 1 &&
                    !closerSetterM1M2PayrollData?.[key]?.m1_payrollId
                )
                    return key
            } else {
                return null
            }
        },
        [closerSetterM1M2PayrollData, missingData, missingKeys]
    )

    const saveData = useCallback(() => {
        if (location?.state?.alertType == 'Sales') {
            let body = {...missingData}
            if (checkRequiredKeys(body)) return CustomToast.error(ERRORS[checkRequiredKeys(body)])
            if (
                isInputValueExist(body?.dealer_fee_percentage) &&
                Number(body?.dealer_fee_percentage) > 1
            )
                body.dealer_fee_percentage = body.dealer_fee_percentage / 100

            setLoading(true)

            updateMissingDataAlertCenterService(body)
                .then(() => {
                    CustomToast.success('Missing data updated')
                    navigate(-1)
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
                .finally(() => {
                    setLoading(false)
                })
        } else if (location?.state?.alertType == 'Missing Rep') {
            let body = {...missingData}

            body.rep_email = selectedCloser1?.email ?? ''

            if (!body?.rep_id) {
                return CustomToast.error('Select Closer')
            }
            if (!body?.setter_id) {
                return CustomToast.error('Select Setter ')
            }
            const closer1 = body?.rep_id
            const setter1 = body?.setter_id
            body.setter_id = [setter1]
            body.rep_id = [closer1]
            setLoading(true)
            updateMissingDataAlertCenterService(body)
                .then(() => {
                    CustomToast.success('Missing data updated')
                    navigate(-1)
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
                .finally(() => {
                    setLoading(false)
                })
        } else if (location?.state?.alertType == 'Closed Payroll') {
            let count = []
            let newObj = Object.keys(closerSetterM1M2PayrollData)
                .map((key, index) => {
                    if (checkM1M2Validation(key)) {
                        count.push(ERRORS[checkM1M2Validation(key)])
                        // return CustomToast.error(ERRORS[checkM1M2Validation(key)])
                    } else if (closerSetterM1M2PayrollData[key]?.user_id) {
                        return closerSetterM1M2PayrollData[key]
                    }
                })
                .map((item) => {
                    const newItem = {...item}
                    delete newItem['m1_payrollId']
                    delete newItem['m2_payrollId']
                    return newItem
                })
                .filter((item) => item?.user_id)

            if (count?.length > 0) return CustomToast.error(count?.join(' and '))

            const payrollBody = {
                pid: missingData?.pid,
                payroll: newObj,
            }
            setLoading(true)

            updateMissingPayPeriodService(payrollBody)
                .then(() => {
                    CustomToast.success('Payroll data updated')
                    navigate(-1)
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [
        checkM1M2Validation,
        checkRequiredKeys,
        closerSetterM1M2PayrollData,
        location?.state?.alertType,
        missingData,
        navigate,
        selectedCloser1?.email,
    ])

    return (
        <div style={{position: 'relative'}}>
            <CustomLoader full visible={loading} />

            <div
                className='bg-cmwhite shadow-sm pb-10 mb-10'
                style={{
                    zIndex: 1,

                    borderRadius: '10px',
                    fontFamily: 'Manrope',
                    fontSize: '14px',
                }}
            >
                {/* heading */}
                <div className='d-flex flex-wrap align-items-center justify-content-between'>
                    <div
                        className='d-flex gap-5 align-items-center cursor-pointer px-sm-10 px-2 py-5 '
                        onClick={() => naviagte(-1)}
                    >
                        <div className='bi bi-box-arrow-left fs-1 text-cmGrey600 text-hover-dark cursor-pointer'></div>
                        <div
                            className='text-cmGrey900'
                            style={{fontFamily: 'Manrope', fontSize: '16px', fontWeight: '600'}}
                        >
                            {missingData?.pid} - {missingData?.customer_name}
                        </div>
                    </div>
                    <div className='d-flex'>
                        <div className='mx-5'>
                            <CustomButton
                                buttonType={BUTTON_TYPE.secondary}
                                buttonLabel='Save'
                                onClick={saveData}
                            />
                        </div>
                    </div>
                </div>
                {/* heading ends */}
                {/* Line 1 */}
                <div
                    className='bg-cmwhite py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5  w-sm-50 '>
                        <div className='text-cmGrey800 w-sm-25'>PID:</div>
                        <div className='text-cmGrey900 w-sm-25'>{missingData?.pid}</div>
                    </div>
                    <div className='d-flex flex-wrap gap-sm-20 gap-5 w-sm-50'>
                        {missingKeys?.includes(MISSING_KEYS.customer_name) ? (
                            <>
                                <div className='w-sm-25 d-flex gap-3'>
                                    <span className='bi bi-exclamation-triangle text-cmError' />
                                    <div className='text-cmGrey800'>Customer Name:</div>
                                </div>
                                <div className='text-cmGrey800'>
                                    <CustomInput
                                        type={INPUT_TYPE.text}
                                        name={FIELD_KEYS?.customer_name}
                                        onChange={onChangeInputData}
                                        // placeholder='Enter KW'
                                        value={missingData?.customer_name}
                                        errorMessage={'Enter Customer Name'}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='text-cmGrey800 w-sm-25'>Customer Name:</div>
                                <div className='text-cmGrey900 w-sm-25'>
                                    {missingData?.customer_name}
                                </div>
                            </>
                        )}
                    </div>
                </div>
                {/* Line 2 */}
                <div
                    className='stripRow py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5   w-sm-50 '>
                        {missingKeys?.includes(MISSING_KEYS.customer_name) ? (
                            <>
                                <div className='w-sm-25 d-flex gap-3'>
                                    <span className='bi bi-exclamation-triangle text-cmError' />
                                    <div className='text-cmGrey800'>Prospect ID:</div>
                                </div>

                                <div className='text-cmGrey800'>
                                    <CustomInput
                                        type={INPUT_TYPE.number}
                                        min={0}
                                        name={FIELD_KEYS?.prospect_id}
                                        onChange={onChangeInputData}
                                        value={missingData?.prospect_id}
                                        errorMessage={'Enter Prospect ID'}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='text-cmGrey800 w-sm-25'>Prospect Id:</div>
                                <div className='text-cmGrey900 w-sm-25'>
                                    {missingData?.prospect_id ?? '-'}
                                </div>
                            </>
                        )}
                    </div>
                    <div className='d-flex flex-wrap gap-sm-20 gap-5 w-sm-50'>
                        <div className='text-cmGrey800 text-nowrap w-sm-25'>Customer Address:</div>
                        <div className='text-cmGrey900'>{missingData?.customer_address}</div>
                    </div>
                </div>
                {/* Line 3 */}
                <div
                    className='bg-cmwhite py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5   w-sm-50 '>
                        <div className='text-cmGrey800 w-sm-25'>Homeowner ID:</div>
                        <div className='text-cmGrey900 w-sm-25'>
                            {missingData?.homeowner_id ?? '-'}
                        </div>
                    </div>

                    <div className='d-flex flex-wrap gap-sm-20 gap-5 w-sm-50'>
                        <div className='text-cmGrey800 text-nowrap w-sm-25'>Customer Address2:</div>
                        <div className='text-cmGrey900 w-sm-25'>
                            {missingData?.customer_address_2 ?? '-'}
                        </div>
                    </div>
                </div>
                {/* Line 4*/}
                <div
                    className='stripRow py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5   w-sm-50 '>
                        <div className='text-cmGrey800 w-sm-25'>Proposal ID:</div>
                        <div className='text-cmGrey900 w-sm-25'>
                            {missingData?.proposal_id ?? '-'}
                        </div>
                    </div>
                    <div className='d-flex flex-wrap gap-sm-20 gap-5  w-sm-50'>
                        <div className='text-cmGrey800 w-sm-25'>Customer City:</div>
                        <div className='text-cmGrey900 w-sm-25'>
                            {missingData?.customer_city ?? '-'}
                        </div>
                    </div>
                </div>
                {/* Line 5*/}
                <div
                    className='bg-cmwhite py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5   w-sm-50 '>
                        <div className='text-cmGrey800 w-sm-25 '>Product:</div>
                        <div className='text-cmGrey900 w-sm-25'>{missingData?.product ?? '-'}</div>
                    </div>

                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5 w-sm-50 '>
                        {missingKeys?.includes(MISSING_KEYS.customer_name) ? (
                            <>
                                <div className='w-sm-25 d-flex gap-3'>
                                    <span className='bi bi-exclamation-triangle text-cmError' />
                                    <div className='text-cmGrey800'>
                                        Customer State:
                                        {isInputValueExist(
                                            stateRedline?.current?.redline_standard
                                        ) ? (
                                            <div className='badge bg-cmPastelsLightgreen text-dark ms-5 mb-2'>
                                                State Redline:{' '}
                                                {stateRedline?.current?.redline_standard ?? '-'}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className='text-cmGrey800'>
                                    <CustomDropdown
                                        value={missingData?.customer_state}
                                        onChange={onChangeInputData}
                                        options={allLocationsList}
                                        name={FIELD_KEYS?.customer_state}
                                        displayKey={'LocationItems'}
                                        valueKey={'general_code'}
                                        errorMessage={'Select State'}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='text-cmGrey800 w-sm-25'>Customer State: </div>
                                <div className='text-cmGrey900'>
                                    {missingData?.customer_state ?? '-'}{' '}
                                    {isInputValueExist(stateRedline?.current?.redline_standard) ? (
                                        <div className='badge bg-cmPastelsLightgreen text-dark ms-5 mb-2'>
                                            State Redline:{' '}
                                            {stateRedline?.current?.redline_standard ?? '-'}
                                        </div>
                                    ) : null}
                                </div>
                            </>
                        )}
                    </div>
                </div>
                {/* Line 6*/}
                <div
                    className='stripRow py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5   w-sm-50 '>
                        {missingKeys?.includes(MISSING_KEYS.gross_account_value) ? (
                            <>
                                <div className='w-sm-25 d-flex gap-3'>
                                    <span className='bi bi-exclamation-triangle text-cmError' />
                                    <div className='text-cmGrey800'> Gross Account value:</div>
                                </div>
                                <div className='text-cmGrey800'>
                                    <CustomInput
                                        type={INPUT_TYPE.number}
                                        min={0}
                                        name={FIELD_KEYS?.gross_account_value}
                                        onChange={onChangeInputData}
                                        // placeholder='Enter KW'
                                        value={missingData?.gross_account_value}
                                        errorMessage={'Enter Gross Account value'}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='text-cmGrey800 w-sm-25 text-nowrap '>
                                    Gross Account value:
                                </div>
                                <div className='text-cmGrey900 w-sm-25'>
                                    $ {missingData?.gross_account_value ?? '0'}
                                </div>
                            </>
                        )}
                    </div>

                    <div className='d-flex flex-wrap gap-sm-20 gap-5  w-sm-50'>
                        <div className='text-cmGrey800 w-sm-25'>Customer Zip:</div>
                        <div className='text-cmGrey900 w-sm-25'>
                            {missingData?.customer_zip ?? '-'}
                        </div>
                    </div>
                </div>
                {/* Line 7*/}
                <div
                    className='bg-cmwhite py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5   w-sm-50 '>
                        <div className='text-cmGrey800 w-sm-25'>Installer:</div>
                        <div className='text-cmGrey900 w-sm-25'>{missingData?.installer}</div>
                    </div>
                    <div className='d-flex flex-wrap gap-sm-20 gap-5  w-sm-50'>
                        <div className='text-cmGrey800 w-sm-25'>Customer Email:</div>
                        <div className='text-cmGrey900 w-sm-25'>
                            {missingData?.customer_email ?? '-'}
                        </div>
                    </div>
                </div>
                {/* Line 8*/}
                <div
                    className='stripRow py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5 w-sm-50 '>
                        {missingKeys?.includes(MISSING_KEYS.kw) ? (
                            <>
                                <div className='w-sm-25 d-flex gap-3'>
                                    <span className='bi bi-exclamation-triangle text-cmError' />
                                    <div className='text-cmGrey800'>KW:</div>
                                </div>
                                <div className='text-cmGrey900'>
                                    {/* {missingData?.kw ?? '-'} */}
                                    <CustomInput
                                        type={INPUT_TYPE.number}
                                        min={0}
                                        name={FIELD_KEYS?.kw}
                                        onChange={onChangeInputData}
                                        // placeholder='Enter KW'
                                        value={missingData?.kw}
                                        errorMessage={'Enter KW'}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='text-cmGrey800 w-sm-25 text-nowrap '>KW:</div>
                                <div className='text-cmGrey900 w-sm-25'>
                                    {missingData?.kw ?? '-'}
                                </div>
                            </>
                        )}
                    </div>

                    <div className='d-flex flex-wrap gap-sm-20 gap-5  w-sm-50'>
                        <div className='text-cmGrey800 w-sm-25'>Customer Phone:</div>
                        <div className='text-cmGrey900 w-sm-25'>
                            {formattedPhoneNumber(missingData?.customer_phone) ?? '-'}
                        </div>
                    </div>
                </div>

                {/* Line 9*/}
                <div
                    className='py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5   w-sm-50 '>
                        {missingKeys?.includes(MISSING_KEYS.epc) ? (
                            <>
                                <div className='w-sm-25 d-flex gap-3'>
                                    <span className='bi bi-exclamation-triangle text-cmError' />
                                    <div className='text-cmGrey800'>EPC:</div>
                                </div>
                                <div className='text-cmGrey800'>
                                    <CustomInput
                                        type={INPUT_TYPE.number}
                                        min={0}
                                        name={FIELD_KEYS?.epc}
                                        onChange={onChangeInputData}
                                        // placeholder='Enter KW'
                                        value={missingData?.epc}
                                        errorMessage={'Enter Epc'}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='text-cmGrey800 w-sm-25 '>EPC:</div>
                                <div className='text-cmGrey900 w-sm-25'>
                                    {missingData?.epc ?? '-'}
                                </div>
                            </>
                        )}
                    </div>
                </div>
                {/* line 10 */}
                <div
                    className=' py-5 stripRow text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5   w-sm-50 '>
                        {missingKeys?.includes(MISSING_KEYS.net_epc) ? (
                            <>
                                <div className='w-sm-25 d-flex gap-3'>
                                    <span className='bi bi-exclamation-triangle text-cmError' />
                                    <div className='text-cmGrey800'>Net EPC:</div>
                                </div>
                                <div className='text-cmGrey800'>
                                    <CustomInput
                                        type={INPUT_TYPE.number}
                                        min={0}
                                        name={FIELD_KEYS?.net_epc}
                                        onChange={onChangeInputData}
                                        // placeholder='Enter KW'
                                        value={missingData?.net_epc}
                                        errorMessage={'Enter Net Epc'}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='text-cmGrey800 w-sm-25 '>Net EPC:</div>
                                <div className='text-cmGrey900 w-sm-25'>
                                    {missingData?.net_epc ?? '-'}
                                </div>
                            </>
                        )}
                    </div>
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5   w-sm-50 '>
                        <div className='text-cmGrey800 w-sm-25 '>Approved Date:</div>
                        <div className='text-cmGrey900 w-sm-25'>
                            {getValidDate(missingData?.approved_date) ?? '-'}
                        </div>
                    </div>
                </div>
                {/* Line 10*/}

                <div
                    className='bg-cmwhite py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5   w-sm-50 '>
                        {missingKeys?.includes(MISSING_KEYS.dealer_fee_percentage) ? (
                            <>
                                <div className='w-sm-25 d-flex gap-3'>
                                    <span className='bi bi-exclamation-triangle text-cmError' />
                                    <div className='text-cmGrey800'>Dealer Fee %:</div>
                                </div>
                                <div className='text-cmGrey800'>
                                    <CustomInput
                                        type={INPUT_TYPE.number}
                                        min={0}
                                        name={FIELD_KEYS?.dealer_fee_percentage}
                                        onChange={onChangeDealerFee}
                                        placeholder='Enter Dealer Fee %'
                                        value={missingData?.dealer_fee_percentage}
                                        errorMessage={'Enter Dealer Fee %'}
                                        max={100}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='text-cmGrey800 w-sm-25 '>Dealer Fee %:</div>
                                <div className='text-cmGrey900 w-sm-25'>
                                    {missingData?.dealer_fee_percentage
                                        ? formattedNumberFields(
                                              Number(missingData?.dealer_fee_percentage) < 1
                                                  ? missingData?.dealer_fee_percentage * 100
                                                  : missingData?.dealer_fee_percentage,
                                              '%'
                                          )
                                        : '-'}
                                </div>
                            </>
                        )}
                    </div>
                    <div className='d-flex flex-wrap gap-sm-20 gap-5  w-sm-50'>
                        <div className='text-cmGrey800 w-sm-25'>M1 Date:</div>
                        <div className='text-cmGrey900 w-sm-25'>
                            {getValidDate(missingData?.m1_date) ?? '-'}
                        </div>
                    </div>
                </div>
                {/* ksjd */}
                <div
                    className=' stripRow py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5   w-sm-50 '>
                        <div className='text-cmGrey800 w-sm-25 '>Dealer Fee $:</div>
                        <div className='text-cmGrey900 w-sm-25'>
                            {missingData?.dealer_fee_amount
                                ? formattedNumberFields(missingData?.dealer_fee_amount)
                                : '-'}
                        </div>
                    </div>
                    <div className='d-flex flex-wrap gap-sm-20 gap-5  w-sm-50'>
                        <div className='text-cmGrey800 w-sm-25'>M2 Date:</div>
                        <div className='text-cmGrey900 w-sm-25'>
                            {getValidDate(missingData?.m2_date) ?? '-'}
                        </div>
                    </div>
                </div>
                {/* sjfks */}
                <div
                    className=' py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5   w-sm-50 '>
                        <div className='text-cmGrey800 w-sm-25 '>SOW $:</div>
                        <div className='text-cmGrey900 w-sm-25'>
                            {formattedNumberFields(missingData?.show)}
                        </div>
                    </div>
                    <div className='d-flex flex-wrap gap-sm-20 gap-5  w-sm-50'>
                        <div className='text-cmGrey800 w-sm-25'>Cancel Date:</div>
                        <div className='text-cmGrey900 w-sm-25'>
                            {missingData?.date_cancelled ?? '-'}
                        </div>
                    </div>
                </div>
                {/* Line 11*/}
                <div
                    className='stripRow py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap align-items-center gap-sm-20 gap-5'>
                        <div className='text-cmGrey800 w-sm-25 '>Adders description:</div>
                        <div className='text-cmGrey900 w-sm-25'>
                            {missingData?.adders_description ?? '-'}
                        </div>
                    </div>
                </div>
                {/* shjad */}

                <div
                    className='py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap gap-sm-20 gap-5  w-sm-50'>
                        <div className='text-cmGrey800 w-sm-25'>Closer 1:</div>

                        <div className='text-cmGrey900'>
                            <>
                                {missingKeys?.includes(MISSING_KEYS?.sales_rep_email) ? (
                                    <>
                                        <CustomDropdown
                                            showClear={false}
                                            name={FIELD_KEYS?.rep_id}
                                            value={missingData?.rep_id}
                                            options={closer1List}
                                            placeholder='Select Closer 1'
                                            onChange={onChangeInputData}
                                            valueKey='id'
                                            displayKey='name'
                                            className='border border-1 border-cmError'

                                            // errorMessage={salesErrorData?.rep_id}
                                        />
                                    </>
                                ) : (
                                    <div> {missingData?.closer1_data?.closer1_name ?? '-'}</div>
                                )}
                                <div>
                                    <a
                                        href={`mailto:${selectedCloser1?.email}`}
                                        className={
                                            missingData?.setter1_data != null
                                                ? 'text-decoration-underline'
                                                : ''
                                        }
                                    >
                                        {selectedCloser1?.email}
                                    </a>
                                </div>
                                {/* <div>
                                    <a
                                        href={`mailto:${missingData?.selectedSetter1?.closer1_email}`}
                                        className={
                                            missingData?.closer1_data != null
                                                ? 'text-decoration-underline'
                                                : ''
                                        }
                                    >
                                        {missingData?.selectedSetter1?.closer1_email}
                                    </a>
                                </div> */}
                                <RepRedlineInfo
                                    rep={selectedCloser1}
                                    positionType={MAIN_POSITTIONS_ID.closer}
                                />
                            </>

                            {missingData?.closer1_data && (
                                <MissingCloserSetterBottomDisplayValues
                                    m1={missingData?.closer1_data?.closer1_m1}
                                    m1PeriodFrom={getValidDate(
                                        missingData?.closer1_data?.closer1_pay_period_from_m1,
                                        'MM/DD/YYYY'
                                    )}
                                    m1PeriodTo={getValidDate(
                                        missingData?.closer1_data?.closer1_pay_period_to_m1,
                                        'MM/DD/YYYY'
                                    )}
                                    m2PeriodFrom={getValidDate(
                                        missingData?.closer1_data?.closer1_pay_period_from_m2,
                                        'MM/DD/YYYY'
                                    )}
                                    m2PeriodTo={getValidDate(
                                        missingData?.closer1_data?.closer1_pay_period_to_m2,
                                        'MM/DD/YYYY'
                                    )}
                                    m2={missingData?.closer1_data?.closer1_m2}
                                    office={missingData?.closer1_data?.closer1_office_name}
                                    approvedDate={missingData?.approved_date}
                                    reconciliation={missingData?.closer1_reconcilliation}
                                    periodList={getPayPeriodFromPositionID(
                                        selectedCloser1?.positionpayfrequencies?.frequency_type_id
                                    )}
                                    missingKeys={missingKeys}
                                    periodChange={(e) =>
                                        onChangeCloserSetterM1M2PayPeriod(
                                            'closer1_data',
                                            e.target.name,
                                            e.target.value,
                                            missingData?.closer1_data?.closer1_id
                                        )
                                    }
                                    selectedPeriod={closerSetterM1M2PayrollData?.closer1_data}
                                    upfront={selectedCloser1?.upfront?.upfront_status}
                                    paidStatus={{
                                        m1: missingData?.closer1_data?.closer1_paid_status_m1,
                                        m2: missingData?.closer1_data?.closer1_paid_status_m2,
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div className='d-flex flex-wrap gap-sm-20 gap-5  w-sm-50'>
                        <div className='text-cmGrey800 w-sm-25'>Setter 1:</div>
                        <div className='text-cmGrey900'>
                            {' '}
                            <>
                                {missingKeys?.includes(MISSING_KEYS?.setterId) ? (
                                    <>
                                        <CustomDropdown
                                            showClear={false}
                                            name={FIELD_KEYS?.setter_id}
                                            value={selectedSetter1?.id}
                                            options={setter2List}
                                            placeholder='Select Setter 1'
                                            onChange={onChangeInputData}
                                            valueKey='id'
                                            displayKey='name'
                                            className='border border-1 border-cmError'

                                            // errorMessage={salesErrorData?.rep_id}
                                        />
                                    </>
                                ) : (
                                    <div> {missingData?.setter1_data?.setter1_name ?? '-'} </div>
                                )}
                            </>
                            <div>
                                <a
                                    href={`mailto:${selectedSetter1?.email}`}
                                    className={
                                        missingData?.setter1_data != null
                                            ? 'text-decoration-underline'
                                            : ''
                                    }
                                >
                                    {selectedSetter1?.email}
                                </a>
                            </div>
                            <RepRedlineInfo
                                rep={selectedSetter1}
                                positionType={MAIN_POSITTIONS_ID.setter}
                            />
                            {missingData?.setter1_data && (
                                <MissingCloserSetterBottomDisplayValues
                                    m1={missingData?.setter1_data?.setter1_m1}
                                    m2={missingData?.setter1_data?.setter1_m2}
                                    m1PeriodFrom={getValidDate(
                                        missingData?.setter1_data?.setter1_pay_period_from_m1
                                    )}
                                    m1PeriodTo={getValidDate(
                                        missingData?.setter1_data?.setter1_pay_period_to_m1
                                    )}
                                    m2PeriodFrom={getValidDate(
                                        missingData?.setter1_data?.setter1_pay_period_from_m2
                                    )}
                                    m2PeriodTo={getValidDate(
                                        missingData?.setter1_data?.setter1_pay_period_to_m2
                                    )}
                                    approvedDate={missingData?.approved_date}
                                    office={missingData?.setter1_data?.setter1_office_name}
                                    reconciliation={missingData?.setter1_reconcilliation}
                                    periodList={getPayPeriodFromPositionID(
                                        selectedSetter1?.positionpayfrequencies?.frequency_type_id
                                    )}
                                    missingKeys={missingKeys}
                                    periodChange={(e) =>
                                        onChangeCloserSetterM1M2PayPeriod(
                                            'setter1_data',
                                            e.target.name,
                                            e.target.value,
                                            missingData?.setter1_data?.setter1_id
                                        )
                                    }
                                    selectedPeriod={closerSetterM1M2PayrollData?.setter1_data}
                                    upfront={selectedSetter1?.upfront?.upfront_status}
                                    paidStatus={{
                                        m1: missingData?.setter1_data?.setter1_paid_status_m1,
                                        m2: missingData?.setter1_data?.setter1_paid_status_m2,
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div
                    className='stripRow py-5 text-cmGrey900 px-sm-20 d-flex flex-wrap px-sm-0 px-5 gap-sm-0 gap-2'
                    style={{fontWeight: '700', fontSize: '14px'}}
                >
                    <div className='d-flex flex-wrap gap-sm-20 gap-5  w-sm-50'>
                        <div className='text-cmGrey800 w-sm-25'>Closer 2:</div>
                        <div className='text-cmGrey900'>
                            {missingData?.closer2_data?.closer2_name ?? '-'}{' '}
                            <div>
                                <a
                                    href={`mailto:${missingData?.closer2_data?.closer2_email}`}
                                    className={
                                        missingData?.closer2_data != null
                                            ? 'text-decoration-underline'
                                            : ''
                                    }
                                >
                                    {missingData?.closer2_data?.closer2_email}
                                </a>
                            </div>
                            <RepRedlineInfo
                                rep={selectedCloser2}
                                positionType={MAIN_POSITTIONS_ID.closer}
                            />
                            {missingData?.closer2_data && (
                                <MissingCloserSetterBottomDisplayValues
                                    m1={missingData?.closer2_data?.closer2_m1}
                                    m1PeriodFrom={getValidDate(
                                        missingData?.closer2_data?.closer2_pay_period_from_m1
                                    )}
                                    m1PeriodTo={getValidDate(
                                        missingData?.closer2_data?.closer2_pay_period_to_m1
                                    )}
                                    m2PeriodFrom={getValidDate(
                                        missingData?.closer2_data?.closer2_pay_period_from_m2
                                    )}
                                    m2PeriodTo={getValidDate(
                                        missingData?.closer2_data?.closer2_pay_period_to_m2
                                    )}
                                    m2={missingData?.closer2_data?.closer1_m2}
                                    office={missingData?.closer2_data?.closer2_office_name}
                                    approvedDate={missingData?.approved_date}
                                    reconciliation={missingData?.closer2_reconcilliation}
                                    periodList={getPayPeriodFromPositionID(
                                        selectedCloser2?.positionpayfrequencies?.frequency_type_id
                                    )}
                                    missingKeys={missingKeys}
                                    periodChange={(e) =>
                                        onChangeCloserSetterM1M2PayPeriod(
                                            'closer2_data',
                                            e.target.name,
                                            e.target.value,
                                            missingData?.setter1_data?.closer2_id
                                        )
                                    }
                                    selectedPeriod={closerSetterM1M2PayrollData?.closer2_data}
                                    upfront={selectedCloser2?.upfront?.upfront_status}
                                    paidStatus={{
                                        m1: missingData?.closer2_data?.closer2_paid_status_m1,
                                        m2: missingData?.closer2_data?.closer2_paid_status_m2,
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div className='d-flex flex-wrap gap-sm-20 gap-5  w-sm-50'>
                        <div className='text-cmGrey800 w-sm-25'>Setter 2:</div>
                        <div className='text-cmGrey900'>
                            {' '}
                            {missingData?.setter2_data?.setter2_name ?? '-'}{' '}
                            <div>
                                <a
                                    href={`mailto:${missingData?.setter2_data?.setter2_email}`}
                                    className={
                                        missingData?.setter2_data != null
                                            ? 'text-decoration-underline'
                                            : ''
                                    }
                                >
                                    {missingData?.setter2_data?.setter2_email}
                                </a>
                            </div>
                            <RepRedlineInfo
                                rep={selectedSetter2}
                                positionType={MAIN_POSITTIONS_ID.setter}
                            />
                            {missingData?.setter2_data && (
                                <MissingCloserSetterBottomDisplayValues
                                    m1={missingData?.setter2_data?.setter2_m1}
                                    m2={missingData?.setter2_data?.setter2_m2}
                                    m1PeriodFrom={getValidDate(
                                        missingData?.setter2_data?.setter2_pay_period_from_m1
                                    )}
                                    m1PeriodTo={getValidDate(
                                        missingData?.setter2_data?.setter2_pay_period_to_m1
                                    )}
                                    m2PeriodFrom={getValidDate(
                                        missingData?.setter2_data?.setter2_pay_period_from_m2
                                    )}
                                    m2PeriodTo={getValidDate(
                                        missingData?.setter2_data?.setter2_pay_period_to_m2
                                    )}
                                    approvedDate={missingData?.approved_date}
                                    office={missingData?.setter2_data?.setter2_office_name}
                                    reconciliation={missingData?.setter2_reconcilliation}
                                    periodList={getPayPeriodFromPositionID(
                                        selectedSetter2?.positionpayfrequencies?.frequency_type_id
                                    )}
                                    missingKeys={missingKeys}
                                    periodChange={(e) =>
                                        onChangeCloserSetterM1M2PayPeriod(
                                            'setter2_data',
                                            e.target.name,
                                            e.target.value,
                                            missingData?.setter2_data?.setter2_id
                                        )
                                    }
                                    selectedPeriod={closerSetterM1M2PayrollData?.setter2_data}
                                    upfront={selectedSetter2?.upfront?.upfront_status}
                                    paidStatus={{
                                        m1: missingData?.setter2_data?.setter2_paid_status_m1,
                                        m2: missingData?.setter2_data?.setter2_paid_status_m2,
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* {open && (
            <AddRepPopup
                show={open}
                handleClose={handleClose}
                type={cstype}
                csObj={closerSetterObj}
                closerSetterList={{closer: closerDropList, setter: setterDropList}}
            />
        )} */}
        </div>
    )
}
export default MissingInfoPage

export const MissingCloserSetterBottomDisplayValues = ({
    m1 = null,
    m2 = null,
    reconciliation = null,
    office = null,
    showReconciliation = false,
    m1PeriodFrom = null,
    m1PeriodTo = null,
    m2PeriodFrom = null,
    m2PeriodTo = null,
    periodChange = () => {},
    periodList = null,
    missingKeys = null,
    selectedPeriod = null,
    upfront = null,
    paidStatus = null,
}) => {
    const periodDropDownList = useMemo(() => {
        return periodList?.map((item) => ({
            ...item,
            period: `${getValidDate(item?.pay_period_from)} to ${getValidDate(
                item?.pay_period_to
            )}`,
        }))
    }, [periodList])

    return (
        <>
            <div className='text-cmGrey500'>
                {isInputValueExist(m1) ? (
                    <div className='badge bg-cmSuccess bg-opacity-10 text-cmSuccess me-2 px-4'>
                        M1: {formattedNumberFields(m1)}
                    </div>
                ) : null}
                {(missingKeys?.includes(MISSING_KEYS?.m1) ||
                    missingKeys?.includes(MISSING_KEYS?.m2_m1) ||
                    missingKeys?.includes(MISSING_KEYS?.m1_m2)) &&
                paidStatus?.m1 == 1 ? (
                    <div className='d-flex gap-3 badge text-start bg-opacity-10 text-cmError me-2'>
                        <div className='' style={{fontSize: '12px'}}>
                            M1 Pay Period:
                        </div>
                        <div>
                            <CustomDropdown
                                name='m1_payrollId'
                                onChange={periodChange}
                                options={periodDropDownList}
                                valueKey='id'
                                displayKey='period'
                                value={selectedPeriod?.m1_payrollId}
                                className='border border-1 border-cmError'
                                // errorMessage='Select Period'
                            />
                        </div>
                    </div>
                ) : (
                    <div
                        className='badge bg-opacity-10 text-cmSuccess me-2'
                        style={{fontSize: '12px'}}
                    >
                        M1 Pay Period:
                        {m1PeriodFrom ? (
                            <span>
                                {m1PeriodFrom} - {m1PeriodTo}
                            </span>
                        ) : (
                            <span className='text-cmGrey600'>Settled</span>
                        )}
                    </div>
                )}
                {isInputValueExist(m2) ? (
                    <div className='badge bg-cminfo bg-opacity-10 text-cminfo me-2 px-4'>
                        M2: {formattedNumberFields(m2)}
                    </div>
                ) : null}
                {(missingKeys?.includes(MISSING_KEYS?.m2) ||
                    missingKeys?.includes(MISSING_KEYS?.m2_m1) ||
                    missingKeys?.includes(MISSING_KEYS?.m1_m2)) &&
                paidStatus?.m2 == 1 ? (
                    <div className='d-flex gap-3 badge  bg-opacity-10 text-cmError me-2'>
                        <div className='align-items-center' style={{fontSize: '12px'}}>
                            M2 Pay Period:
                        </div>
                        <div>
                            <CustomDropdown
                                name='m2_payrollId'
                                onChange={periodChange}
                                options={periodDropDownList}
                                valueKey='id'
                                displayKey='period'
                                value={selectedPeriod?.m2_payrollId}
                                className='border border-1 border-cmError'
                            />
                        </div>
                    </div>
                ) : (
                    <div
                        className='badge bg-opacity-10 text-cminfo me-2'
                        style={{fontSize: '12px'}}
                    >
                        M2 Pay Period:
                        {m2PeriodFrom ? (
                            <span>
                                {m2PeriodFrom} - {m2PeriodTo}
                            </span>
                        ) : (
                            <span className='text-cmGrey600'>Settled</span>
                        )}
                    </div>
                )}
                {showReconciliation && isInputValueExist(reconciliation) ? (
                    <div className='badge bg-cmPurple bg-opacity-10 text-cmPurple me-2'>
                        Reconcilation: {formattedNumberFields(reconciliation)}
                    </div>
                ) : null}
            </div>
            {office ? (
                <div className='text-cmGrey500 mt-2'>
                    <div className='badge bg-cmOrange bg-opacity-20 text-cmGrey900 me-2'>
                        Office: {office}
                    </div>
                </div>
            ) : (
                <></>
            )}
            {/* {missingKeys?.includes(MISSING_KEYS.closed_payroll) ? (
                <div className='d-flex gap-3 badge  bg-opacity-10 text-cmError me-2'>
                    <div style={{fontSize: '12px'}}>Pay Period:</div>
                    <div>
                        <CustomDropdown
                            name='status'
                            onChange={periodChange}
                            options={periodList}
                            valueKey='id'
                            displayKey='period'
                            value={selectedPeriod}
                            errorMessage='.'
                        />
                    </div>
                </div>
            ) : null} */}
        </>
    )
}
