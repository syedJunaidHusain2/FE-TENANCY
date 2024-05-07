import React, {useEffect, useState, useMemo, useCallback} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import moment from 'moment'
import {
    addSaleService,
    getMissingDataAlertCenterService,
    getSalesByPidService,
    updateMissingDataAlertCenterService,
} from '../../../../../../../services/Services'
import {
    getAllLocationListAction,
    getClosersAction,
    getSettersAction,
} from '../../../../../../../redux/actions/SettingActions'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'
import CustomDatePicker from '../../../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import _ from 'lodash'
import {
    getAllClosersSelector,
    getAllLocationsSelector,
    getAllSettersSelector,
} from '../../../../../../../redux/selectors/SettingsSelectors'
import {MAIN_POSITTIONS_ID, getValidDate} from '../../../../../../../constants/constants'
import CustomToast from '../../../../../../../customComponents/customToast/CustomToast'
import HireNew from '../../../../../standard_manager/hiring/onBoardingEmp/CompensationPlan/HireNew'
import {AuthenticateSalesUserPopup} from '../AuthenticateSalesUserPopup'
import {
    formattedNumberFields,
    getErrorMessageFromResponse,
    getLocationRedlineHelper,
    getRepRedlineFromSale,
    isInputValueExist,
    numberInputOnWheelPreventChange,
    percentageLimitCheck,
} from '../../../../../../../helpers/CommonHelpers'
import CustomDropdown from '../../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {getMobileNumberWithoutMask} from '../../../../../../../helpers/CommonHelpers'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../../customComponents/customButtton/CustomButton'
import {manageSaleValidatiion} from '../../../../../../../validations/validations'
import useValidation from '../../../../../../../hooks/useValidation'
import {Badge} from 'primereact/badge'
import RedirectToEmployeeProfile from '../../../../../../../customComponents/redirectToEmployeeProfile/RedirectToEmployeeProfile'
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
    date_cancelled: 'date_cancelled',
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
    rep_id2: 'rep_id2',
    setter_id2: 'setter_id2',
    return_sales_date: 'return_sales_date',
}

const ManageSalesPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const pid = location.state?.pid ?? location?.search.split('=')?.[1]
    const type = location.state?.pageType
    const isEditMode = location.state?.isEditMode
    const [isSuperAdmin, setIsSuperAdmin] = useState(!isEditMode)
    const [salesData, setSaleData] = useState(null)
    const [loading, setLoading] = useState(false)
    const closersList = useSelector(getAllClosersSelector)
    const settersList = useSelector(getAllSettersSelector)
    const dispatch = useDispatch()
    const allLocations = useSelector(getAllLocationsSelector)
    const [open, setOpen] = useState(false)
    const [openPassPopup, setOpenPassPopup] = useState(false)
    const [validateSaleData, salesErrorData] = useValidation()
    const [fieldEditable, setFieldEditable] = useState({
        approvedDate: true,
        m1Date: true,
        m2Date: true,
        cancelDate: true,
    })

    const handleClose = () => {
        setOpen(false)
    }

    const handleClosePassPopUp = () => {
        setOpenPassPopup(false)
    }

    useEffect(() => {
        getSetterCloser()
        dispatch(getAllLocationListAction())
    }, [])

    const getSetterCloser = useCallback(() => {
        dispatch(getClosersAction())
        dispatch(getSettersAction())
    }, [dispatch])

    useEffect(() => {
        if (pid) {
            const func = (res) => {
                let data = {...res}
                if (
                    isInputValueExist(data?.dealer_fee_percentage) &&
                    Number(data?.dealer_fee_percentage) < 1
                )
                    data.dealer_fee_percentage = Number(data.dealer_fee_percentage) * 100
                data.customer_phone = getMobileNumberWithoutMask(data.customer_phone)
                data.rep_id = data?.rep_id ?? data?.closer1_detail?.id
                data.rep_id2 = data?.rep_id2 ?? data?.closer2_detail?.id
                data.setter_id = data?.setter_id ?? data?.setter1_detail?.id
                data.setter_id2 = data?.setter_id2 ?? data?.setter2_detail?.id
                delete data.closer1_detail
                delete data.closer2_detail
                delete data.setter1_detail
                delete data.setter2_detail
                setFieldEditable({
                    approvedDate: !data?.approved_date,
                    m1Date: !data?.m1_date,
                    m2Date: !data?.m2_date,
                    cancelDate: !data?.date_cancelled,
                })

                setSaleData(data)
            }
            setLoading(true)
            if (type == 'alert') {
                getMissingDataAlertCenterService(location?.state?.pid)
                    ?.then((res) => {
                        func(res?.data?.[0])
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            } else {
                getSalesByPidService({pid: pid ?? ''})
                    ?.then((res) => {
                        func(res?.data)
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            }
        }
    }, [pid])

    const selectedCustomerState = useMemo(() => {
        const uniqueId = salesData?.customer_state
        const data = uniqueId ? allLocations?.find((item) => item?.general_code == uniqueId) : null
        return data ?? null
    }, [allLocations, salesData?.customer_state])

    useEffect(() => {
        if (type == 'alert' || salesErrorData?.beginValidating) {
            validateSaleData(manageSaleValidatiion({type, data: salesData, selectedCustomerState}))
        }
    }, [salesData, selectedCustomerState, type])

    const stateRedline = useMemo(() => {
        const data = getLocationRedlineHelper(selectedCustomerState, salesData?.approved_date)
        return data
    }, [salesData?.approved_date, selectedCustomerState])

    const selectedCloser1 = useMemo(() => {
        const uniqueId = salesData?.rep_id
        return closersList?.length > 0 ? closersList?.find((item) => item?.id == uniqueId) : null
    }, [closersList, salesData?.rep_id])

    const selectedCloser2 = useMemo(() => {
        const uniqueId = salesData?.rep_id2
        return closersList?.length > 0 ? closersList?.find((item) => item?.id == uniqueId) : null
    }, [closersList, salesData?.rep_id2])

    const selectedSetter1 = useMemo(() => {
        const uniqueId = salesData?.setter_id
        return settersList?.length > 0 ? settersList?.find((item) => item?.id == uniqueId) : null
    }, [salesData?.setter_id, settersList])

    const selectedSetter2 = useMemo(() => {
        const uniqueId = salesData?.setter_id2
        return settersList?.length > 0 ? settersList?.find((item) => item?.id == uniqueId) : null
    }, [salesData?.setter_id2, settersList])

    const closer1List = useMemo(() => {
        return closersList?.filter((item) => item?.id != selectedCloser2?.id)
    }, [closersList, selectedCloser2])

    const closer2List = useMemo(() => {
        return closersList?.filter((item) => item?.id != selectedCloser1?.id)
    }, [closersList, selectedCloser1?.id])

    const setter1List = useMemo(() => {
        return settersList?.filter((item) => item?.id != selectedSetter2?.id)
    }, [settersList, selectedSetter2])

    const setter2List = useMemo(() => {
        return settersList?.filter((item) => item?.id != selectedSetter1?.id)
    }, [settersList, selectedSetter1?.id])

    const isDataSourceIsImportOrApi = useMemo(() => {
        return ['import', 'api'].includes(salesData?.data_source_type)
    }, [salesData?.data_source_type])

    const disableInputs = useMemo(() => {
        return ['import', 'api'].includes(salesData?.data_source_type)
    }, [salesData?.data_source_type])

    const saveData = useCallback(() => {
        let body = {...salesData}
        const closer = selectedCloser1?.id ?? null
        const closer2 = selectedCloser2?.id ?? null
        body.rep_id = closer || closer2 ? [closer, closer2] : []
        body.rep_email = selectedCloser1?.email
        const setter = selectedSetter1?.id ?? null
        const setter2 = selectedSetter2?.id ?? null
        body.setter_id = setter || setter2 ? [setter, setter2] : []
        body.approved_date = moment(body.approved_date).format('YYYY-MM-DD')
        body.last_date_pd = getValidDate(body.last_date_pd, 'YYYY-MM-DD')
        body.date_cancelled = getValidDate(body.date_cancelled, 'YYYY-MM-DD')
        body.return_sales_date = getValidDate(body.return_sales_date, 'YYYY-MM-DD')
        body.m1_date = getValidDate(body.m1_date, 'YYYY-MM-DD')
        body.m2_date = getValidDate(body.m2_date, 'YYYY-MM-DD')
        body.customer_state = body.customer_state ?? body.state ?? null
        body.customer_phone = getMobileNumberWithoutMask(body.customer_phone)
        if (
            isInputValueExist(body?.dealer_fee_percentage) &&
            Number(body?.dealer_fee_percentage) > 1
        )
            body.dealer_fee_percentage = body.dealer_fee_percentage / 100

        validateSaleData(
            manageSaleValidatiion({
                type,
                data: salesData,
                selectedCustomerState,
                isDataSourceIsImportOrApi,
            })
        ).then((res) => {
            if (res.isValidate) {
                setLoading(true)
                if (type == 'alert') {
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
                } else {
                    addSaleService(body)
                        .then(() => {
                            CustomToast.success(pid ? 'Sale Updated' : 'Sale Added')
                            navigate(-1)
                        })
                        .catch((e) => {
                            CustomToast.error(getErrorMessageFromResponse(e))
                        })
                        .finally(() => {
                            setLoading(false)
                        })
                }
            }
        })
    }, [
        salesData,
        selectedCloser1?.id,
        selectedCloser1?.email,
        selectedCloser2?.id,
        selectedSetter1?.id,
        selectedSetter2?.id,
        validateSaleData,
        type,
        selectedCustomerState,
        isDataSourceIsImportOrApi,
        navigate,
        pid,
    ])

    const onChangeInputData = (e) => {
        updateMissingData(e?.target?.name, e?.target?.value)
    }

    const onChangeDealerFee = (e) => {
        let {value, max, name} = e.target
        if (percentageLimitCheck(max, value)) onChangeInputData(e)
    }

    const updateMissingData = (field, value) => {
        setSaleData((val) => ({
            ...val,
            [field]: value,
        }))
    }

    const RepRedlineInfo = ({rep = null, positionType = null}) => {
        const redline_data = getRepRedlineFromSale(
            positionType,
            selectedCustomerState,
            stateRedline?.current?.redline_standard,
            rep,
            salesData?.approved_date
        )
        return rep ? (
            <div className='badge bg-cmPastelsLightgreen text-dark mb-2'>
                Redline: {redline_data?.redline}
                {' | '}
                {redline_data?.type}
            </div>
        ) : null
    }

    const allLocationsList = useMemo(() => {
        return allLocations?.map((item) => ({
            ...item,
            LocationItems: `${item?.state_name} | ${item?.general_code}`,
        }))
    }, [allLocations])

    const isPaidStatus = useMemo(() => {
        return {
            m1:
                salesData?.closer1_paid_status?.closer1_paid_status_m1 ||
                salesData?.closer2_paid_status?.closer2_paid_status_m1 ||
                salesData?.setter1_paid_status?.setter1_paid_status_m1 ||
                salesData?.setter2_paid_status?.setter2_paid_status_m1,
            m2:
                salesData?.closer1_paid_status?.closer1_paid_status_m2 ||
                salesData?.closer2_paid_status?.closer2_paid_status_m2 ||
                salesData?.setter1_paid_status?.setter1_paid_status_m2 ||
                salesData?.setter2_paid_status?.setter2_paid_status_m2,
        }
    }, [
        salesData?.closer1_paid_status?.closer1_paid_status_m1,
        salesData?.closer1_paid_status?.closer1_paid_status_m2,
        salesData?.closer2_paid_status?.closer2_paid_status_m1,
        salesData?.closer2_paid_status?.closer2_paid_status_m2,
        salesData?.setter1_paid_status?.setter1_paid_status_m1,
        salesData?.setter1_paid_status?.setter1_paid_status_m2,
        salesData?.setter2_paid_status?.setter2_paid_status_m1,
        salesData?.setter2_paid_status?.setter2_paid_status_m2,
    ])

    return (
        <div style={{position: 'relative'}}>
            <CustomLoader loaderPosition='top' full visible={loading} />
            <div
                className='bg-cmwhite shadow-sm text-cmGrey800 pb-10'
                style={{
                    fontFamily: 'Manrope',
                    fontSize: '14px',
                    fontWeight: '700',
                    borderRadius: '10px',
                }}
            >
                <div className='d-flex flex-wrap gap-5 align-items-center justify-content-between p-5'>
                    <div className='d-flex align-items-center gap-5 text-cmGrey900'>
                        <div
                            className='bi bi-box-arrow-left fs-1 text-cmGrey600 text-hover-dark cursor-pointer'
                            onClick={() => navigate(-1)}
                        ></div>
                        <div className='' style={{fontFamily: 'Manrope'}}>
                            {salesData?.pid} - {salesData?.customer_name}{' '}
                            {salesData?.data_source_type ? (
                                <Badge severity='warning' value={salesData?.data_source_type} />
                            ) : null}
                        </div>
                    </div>
                </div>
                <div>
                    <div className='d-flex flex-wrap align-items-center py-3 px-sm-20 px-10 gap-sm-0 gap-10'>
                        <div className='w-sm-50 w-100  px-sm-20'>
                            <div>
                                <CustomInput
                                    errorMessage={salesErrorData?.pid}
                                    label={'PID:'}
                                    disabled={disableInputs}
                                    placeholder='Enter PID'
                                    value={salesData?.pid}
                                    name={FIELD_KEYS?.pid}
                                    onChange={onChangeInputData}
                                    required
                                />
                            </div>
                        </div>
                        <div className='w-sm-50 w-100  px-sm-20 '>
                            <div>
                                <CustomInput
                                    errorMessage={salesErrorData?.customer_name}
                                    disabled={disableInputs}
                                    label={'Customer Name:'}
                                    name={FIELD_KEYS?.customer_name}
                                    onChange={onChangeInputData}
                                    value={salesData?.customer_name}
                                    placeholder='Enter customer name'
                                    rejex={/^[\w\-\s]+$/}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    {/* dumy */}
                    <div className='d-flex stripRow flex-wrap align-items-center py-3 px-sm-20 px-10 gap-sm-0 gap-10'>
                        <div className='w-sm-50 w-100  px-sm-20'>
                            <div>
                                <CustomInput
                                    label={'Prospect Id:'}
                                    disabled={disableInputs}
                                    placeholder='Enter Prospect Id'
                                    value={salesData?.prospect_id}
                                    name={FIELD_KEYS?.prospect_id}
                                    onChange={onChangeInputData}
                                />
                            </div>
                        </div>

                        <div className='w-sm-50 w-100  px-sm-20'>
                            <div>
                                <CustomInput
                                    label={'Customer address:'}
                                    disabled={disableInputs}
                                    placeholder='Enter Customer address'
                                    value={salesData?.customer_address}
                                    onChange={onChangeInputData}
                                    name={FIELD_KEYS?.customer_address}
                                />
                            </div>
                        </div>
                    </div>
                    {/* dumy 2*/}
                    <div className='d-flex flex-wrap align-items-center py-3 px-sm-20 px-10 gap-sm-0 gap-10'>
                        <div className='w-sm-50 w-100  px-sm-20'>
                            <div>
                                <CustomInput
                                    label={'Homeowner ID:'}
                                    disabled={disableInputs}
                                    placeholder='Enter Homeowner ID '
                                    value={salesData?.homeowner_id}
                                    onChange={onChangeInputData}
                                    name={FIELD_KEYS?.homeowner_id}
                                />
                            </div>
                        </div>

                        <div className='w-sm-50 w-100 px-sm-20'>
                            <div>
                                <CustomInput
                                    label={'Customer Address2:'}
                                    disabled={disableInputs}
                                    placeholder='Enter Customer Address2'
                                    value={salesData?.customer_address2}
                                    onChange={onChangeInputData}
                                    name={FIELD_KEYS?.customer_address2}
                                />
                            </div>
                        </div>
                    </div>
                    {/* dumy 3*/}
                    <div className='d-flex stripRow flex-wrap align-items-center py-3 px-sm-20 px-10 gap-sm-0 gap-10'>
                        <div className='w-sm-50 w-100  px-sm-20'>
                            <div>
                                <CustomInput
                                    label={'Proposal ID:'}
                                    disabled={disableInputs}
                                    placeholder='Enter Proposal ID'
                                    value={salesData?.proposal_id}
                                    onChange={onChangeInputData}
                                    name={FIELD_KEYS?.proposal_id}
                                />
                            </div>
                        </div>

                        <div className='w-sm-50 w-100 px-sm-20'>
                            <div>
                                <CustomInput
                                    label={'Customer City:'}
                                    disabled={disableInputs}
                                    placeholder='Enter Customer City'
                                    value={salesData?.customer_city}
                                    onChange={onChangeInputData}
                                    name={FIELD_KEYS?.customer_city}
                                />
                            </div>
                        </div>
                    </div>
                    {/* dumy 4*/}
                    <div className='d-flex flex-wrap align-items-center py-3 px-sm-20 px-10 gap-sm-0 gap-10'>
                        <div className='w-sm-50 w-100 px-sm-20'>
                            <div>
                                <CustomInput
                                    label={'Product:'}
                                    disabled={disableInputs}
                                    placeholder='Enter Product '
                                    value={salesData?.product}
                                    onChange={onChangeInputData}
                                    name={FIELD_KEYS?.product}
                                />
                            </div>
                        </div>

                        <div className='w-sm-50 w-100 px-sm-20'>
                            <div className='required'>
                                Customer State:
                                {isInputValueExist(stateRedline?.current?.redline_standard) ? (
                                    <div className='badge bg-cmPastelsLightgreen text-dark ms-5 mb-2'>
                                        State Redline:{' '}
                                        {stateRedline?.current?.redline_standard ?? '-'}
                                    </div>
                                ) : null}
                            </div>
                            <div className=''>
                                <CustomDropdown
                                    value={salesData?.customer_state}
                                    disabled={disableInputs}
                                    onChange={onChangeInputData}
                                    options={allLocationsList}
                                    name={FIELD_KEYS?.customer_state}
                                    displayKey={'LocationItems'}
                                    valueKey={'general_code'}
                                    errorMessage={salesErrorData?.customer_state}
                                />
                            </div>
                        </div>
                    </div>

                    {/* dumy 5*/}
                    <div className='d-flex stripRow flex-wrap align-items-center py-3 px-sm-20 px-10 gap-sm-0 gap-10'>
                        <div className='w-sm-50 w-100 px-sm-20'>
                            <div>
                                <CustomInput
                                    label={'Gross Account Value:'}
                                    type={INPUT_TYPE.number}
                                    min={0}
                                    disabled={disableInputs}
                                    onWheel={(e) => numberInputOnWheelPreventChange(e)}
                                    contentEditable={isEditMode || isSuperAdmin ? true : false}
                                    onClick={() => {
                                        if (!isSuperAdmin) {
                                            setOpenPassPopup(true)
                                        }
                                    }}
                                    placeholder={
                                        isSuperAdmin ? 'Enter Gross Account Value' : 'XXXXXX'
                                    }
                                    value={isSuperAdmin ? salesData?.gross_account_value : ''}
                                    onChange={onChangeInputData}
                                    name={FIELD_KEYS?.gross_account_value}
                                    errorMessage={salesErrorData?.gross_account_value}
                                    required
                                />
                            </div>
                        </div>

                        <div className='w-sm-50 w-100 px-sm-20'>
                            <div>
                                <CustomInput
                                    label='Customer Zip:'
                                    min={0}
                                    disabled={disableInputs}
                                    type={INPUT_TYPE.number}
                                    onWheel={(e) => numberInputOnWheelPreventChange(e)}
                                    placeholder='Enter Customer Zip '
                                    value={salesData?.customer_zip}
                                    onChange={onChangeInputData}
                                    name={FIELD_KEYS?.customer_zip}
                                />
                            </div>
                        </div>
                    </div>

                    {/* dumy 6*/}
                    <div className='d-flex flex-wrap align-items-center py-3 px-sm-20 px-10 gap-sm-0 gap-10'>
                        <div className='w-sm-50 w-100  px-sm-20'>
                            <div>
                                <CustomInput
                                    label={'Installer:'}
                                    disabled={disableInputs}
                                    placeholder='Enter Installer'
                                    value={salesData?.installer}
                                    onChange={onChangeInputData}
                                    name={FIELD_KEYS?.installer}
                                    errorMessage={salesErrorData?.installer}
                                    required
                                />
                            </div>
                        </div>
                        <div className='w-sm-50 w-100  px-sm-20'>
                            <div>
                                <CustomInput
                                    label={'Customer Email:'}
                                    disabled={disableInputs}
                                    placeholder='Enter Customer Email'
                                    value={salesData?.customer_email}
                                    onChange={onChangeInputData}
                                    name={FIELD_KEYS?.customer_email}
                                />
                            </div>
                        </div>
                    </div>

                    {/* dumy 7*/}
                    <div className='d-flex stripRow flex-wrap align-items-center py-3 px-sm-20 px-10 gap-sm-0 gap-10'>
                        <div className='w-sm-50 w-100 px-sm-20'>
                            <div>
                                <CustomInput
                                    iconClass={
                                        salesData?.kw == null
                                            ? 'bi bi-exclamation-triangle text-cmError me-2'
                                            : ''
                                    }
                                    label={'KW:'}
                                    disabled={disableInputs}
                                    type={INPUT_TYPE.number}
                                    min={0}
                                    name={FIELD_KEYS?.kw}
                                    onChange={onChangeInputData}
                                    placeholder='Enter KW'
                                    value={salesData?.kw}
                                    errorMessage={salesErrorData?.kw}
                                    required
                                />
                            </div>
                        </div>
                        <div className='w-sm-50 w-100 px-sm-20'>
                            <div>
                                <CustomInput
                                    placeholder='Enter Customer Phone'
                                    disabled={disableInputs}
                                    label={'Customer Phone:'}
                                    value={salesData?.customer_phone}
                                    type={INPUT_TYPE.mobile}
                                    onChange={onChangeInputData}
                                    name={FIELD_KEYS?.customer_phone}
                                />
                            </div>
                        </div>
                    </div>

                    {/* dumy 8*/}
                    <div className='d-flex flex-wrap align-items-center py-3 px-sm-20 px-10 gap-sm-0 gap-10'>
                        <div className=' w-100 px-sm-20'>
                            <div>
                                <CustomInput
                                    label={'EPC:'}
                                    type={INPUT_TYPE.number}
                                    disabled={disableInputs}
                                    min={0}
                                    onWheel={(e) => numberInputOnWheelPreventChange(e)}
                                    name={FIELD_KEYS?.epc}
                                    placeholder='Enter EPC'
                                    value={salesData?.epc}
                                    onChange={onChangeInputData}
                                    errorMessage={salesErrorData?.epc}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* dumy 9*/}
                    <div className='d-flex stripRow flex-wrap align-items-center py-3 px-sm-20 px-10 gap-sm-0 gap-10'>
                        <div className='w-sm-50 w-100 px-sm-20'>
                            <div>
                                <CustomInput
                                    label={'Net EPC:'}
                                    type={INPUT_TYPE.number}
                                    disabled={disableInputs}
                                    min={0}
                                    onWheel={(e) => numberInputOnWheelPreventChange(e)}
                                    placeholder='Enter Net EPC'
                                    value={salesData?.net_epc}
                                    onChange={onChangeInputData}
                                    name={FIELD_KEYS?.net_epc}
                                    errorMessage={salesErrorData?.net_epc}
                                    required
                                />
                            </div>
                        </div>
                        <div className='w-sm-50 w-100 px-sm-20'>
                            <div>
                                <CustomDatePicker
                                    label={'Approved Date:'}
                                    placeholderText=''
                                    name={FIELD_KEYS?.approved_date}
                                    value={
                                        salesData?.approved_date
                                            ? new Date(salesData?.approved_date)
                                            : null
                                    }
                                    onChange={onChangeInputData}
                                    className='w-100'
                                    BackgroundColor={'cmwhite'}
                                    errorMessage={salesErrorData?.approved_date}
                                    disabled={!fieldEditable?.approvedDate || disableInputs}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* dumy 10*/}
                    <div className='d-flex flex-wrap align-items-center py-3 px-sm-20 px-10 gap-sm-0 gap-10'>
                        <div className='w-sm-50 w-100  px-sm-20'>
                            <div>
                                <CustomInput
                                    label={'Dealer Fee %:'}
                                    disabled={disableInputs}
                                    type={INPUT_TYPE.number}
                                    min={0}
                                    suffixText='%'
                                    onWheel={(e) => numberInputOnWheelPreventChange(e)}
                                    placeholder='Enter Dealer Fee %'
                                    value={salesData?.dealer_fee_percentage}
                                    onChange={onChangeDealerFee}
                                    name={FIELD_KEYS?.dealer_fee_percentage}
                                    errorMessage={salesErrorData?.dealer_fee_percentage}
                                    max={100}
                                    required
                                />
                            </div>
                        </div>
                        <div className='w-sm-50 w-100 px-sm-20'>
                            <CustomDatePicker
                                label={'M1 Date:'}
                                placeholderText=''
                                value={salesData?.m1_date ? new Date(salesData?.m1_date) : null}
                                onChange={onChangeInputData}
                                name={FIELD_KEYS?.m1_date}
                                BackgroundColor={'cmwhite'}
                                minDate={new Date(salesData?.approved_date)}
                                disabled={
                                    isDataSourceIsImportOrApi || disableInputs || isPaidStatus?.m1
                                }
                            />
                        </div>
                    </div>

                    {/* dumy 11*/}
                    <div className='d-flex stripRow flex-wrap align-items-center py-3 px-sm-20 px-10 gap-sm-0 gap-10'>
                        <div className='w-sm-50 w-100 px-sm-20'>
                            <div>
                                <CustomInput
                                    label={'Dealer Fee $:'}
                                    type={INPUT_TYPE.currency}
                                    min={0}
                                    disabled={disableInputs}
                                    prefixText='$'
                                    onWheel={(e) => numberInputOnWheelPreventChange(e)}
                                    placeholder='Enter Dealer Fee $'
                                    value={salesData?.dealer_fee_amount}
                                    onChange={onChangeInputData}
                                    name={FIELD_KEYS?.dealer_fee_amount}
                                    errorMessage={salesErrorData?.dealer_fee_amount}
                                />
                            </div>
                        </div>
                        <div className='w-sm-50 w-100 px-sm-20'>
                            <CustomDatePicker
                                label={'M2 Date'}
                                placeholderText=''
                                value={salesData?.m2_date ? new Date(salesData?.m2_date) : null}
                                onChange={onChangeInputData}
                                name={FIELD_KEYS?.m2_date}
                                BackgroundColor={'cmwhite'}
                                minDate={new Date(salesData?.m1_date)}
                                disabled={
                                    isDataSourceIsImportOrApi || disableInputs || isPaidStatus?.m2
                                }
                            />
                        </div>
                    </div>

                    {/* dumy 12*/}
                    <div className='d-flex flex-wrap align-items-center py-3 px-sm-20 px-10 gap-sm-0 gap-10'>
                        <div className='w-sm-50 w-100 px-sm-20'>
                            <div>
                                <CustomInput
                                    label={'SOW $:'}
                                    disabled={disableInputs}
                                    type={INPUT_TYPE.currency}
                                    min={0}
                                    onWheel={(e) => numberInputOnWheelPreventChange(e)}
                                    placeholder='Enter SOW $'
                                    value={salesData?.show}
                                    onChange={onChangeInputData}
                                    name={FIELD_KEYS?.show}
                                />
                            </div>
                        </div>
                        <div className='w-sm-50 w-100 px-sm-20'>
                            {!salesData?.return_sales_date || salesData?.date_cancelled ? (
                                <CustomDatePicker
                                    label={'Cancel Date'}
                                    disabled={disableInputs}
                                    placeholderText=''
                                    value={
                                        salesData?.date_cancelled
                                            ? new Date(salesData?.date_cancelled)
                                            : null
                                    }
                                    onChange={onChangeInputData}
                                    name={FIELD_KEYS?.date_cancelled}
                                    BackgroundColor={'cmwhite'}
                                    minDate={
                                        salesData?.m1_date && salesData?.m2_date
                                            ? new Date(salesData?.m2_date)
                                            : salesData?.m1_date
                                            ? new Date(salesData?.m1_date)
                                            : null
                                    }
                                />
                            ) : null}
                            {!salesData?.date_cancelled && salesData?.return_sales_date ? (
                                <CustomDatePicker
                                    label={'Return Sale Date'}
                                    disabled={disableInputs}
                                    placeholderText=''
                                    value={
                                        salesData?.return_sales_date
                                            ? new Date(salesData?.return_sales_date)
                                            : null
                                    }
                                    onChange={onChangeInputData}
                                    name={FIELD_KEYS?.return_sales_date}
                                    BackgroundColor={'cmwhite'}
                                    minDate={
                                        salesData?.m1_date && salesData?.m2_date
                                            ? new Date(salesData?.m2_date)
                                            : salesData?.m1_date
                                            ? new Date(salesData?.m1_date)
                                            : null
                                    }
                                />
                            ) : null}
                        </div>
                    </div>

                    {/* dumy 13*/}
                    <div className='d-flex stripRow flex-wrap align-items-center py-3 px-sm-20 px-10 gap-sm-0 gap-10'>
                        <div className='w-100 px-sm-20'>
                            <CustomInput
                                label={'Adders description:'}
                                disabled={disableInputs}
                                type={INPUT_TYPE.textarea}
                                placeholder='Enter Adders description'
                                value={salesData?.adders_description}
                                onChange={onChangeInputData}
                                name={FIELD_KEYS?.adders_description}
                            />
                        </div>
                    </div>

                    <div className='d-flex flex-wrap align-items-center py-3 px-sm-20 px-10 gap-sm-0 gap-10'>
                        <div className='w-sm-50 w-100 px-sm-20'>
                            <div>
                                <span className='required'>Closer1:</span>
                                <RedirectToEmployeeProfile
                                    target='_blank'
                                    employeeId={selectedCloser1?.id}
                                    style={{marginRight: 10}}
                                >
                                    {selectedCloser1?.email ?? ''}
                                </RedirectToEmployeeProfile>
                                <RepRedlineInfo
                                    rep={selectedCloser1}
                                    positionType={MAIN_POSITTIONS_ID.closer}
                                />
                            </div>
                            <div className=''>
                                <div className=''>
                                    <CustomDropdown
                                        showClear={false}
                                        name={FIELD_KEYS?.rep_id}
                                        value={salesData?.rep_id}
                                        options={closer1List}
                                        placeholder='Select Closer 1'
                                        onChange={onChangeInputData}
                                        valueKey='id'
                                        displayKey='name'
                                        errorMessage={salesErrorData?.rep_id}
                                    />
                                </div>
                                {selectedCloser1 ? (
                                    <CloserSetterBottomDisplayValues
                                        m1={salesData?.closer1_m1}
                                        m2={salesData?.closer1_m2}
                                        reconciliation={salesData?.closer1_reconcilliation}
                                        office={selectedCloser1?.office}
                                        approvedDate={salesData?.approved_date}
                                        showReconciliation={
                                            selectedCloser1?.reconciliations?.status
                                        }
                                    />
                                ) : null}
                            </div>
                        </div>
                        <div className='w-sm-50 w-100 px-sm-20 '>
                            <div>
                                <span className=' required '>Setter1:</span>
                                <RedirectToEmployeeProfile
                                    target='_blank'
                                    employeeId={selectedSetter1?.id}
                                    style={{marginRight: 10}}
                                >
                                    {selectedSetter1?.email ?? ''}
                                </RedirectToEmployeeProfile>
                                <RepRedlineInfo
                                    rep={selectedSetter1}
                                    positionType={MAIN_POSITTIONS_ID.setter}
                                />
                            </div>
                            <div className=''>
                                <div className=''>
                                    <CustomDropdown
                                        showClear={false}
                                        name={FIELD_KEYS?.setter_id}
                                        value={salesData?.setter_id}
                                        options={setter1List}
                                        placeholder='Select Setter 1'
                                        onChange={onChangeInputData}
                                        valueKey='id'
                                        displayKey='name'
                                        displayFields={['first_name', 'last_name']}
                                        searchFields={['first_name', 'last_name']}
                                        errorMessage={salesErrorData?.setter_id}
                                    />
                                </div>
                                {selectedSetter1 && selectedSetter1?.id != selectedCloser1?.id ? (
                                    <CloserSetterBottomDisplayValues
                                        m1={salesData?.setter1_m1}
                                        m2={salesData?.setter1_m2}
                                        reconciliation={salesData?.setter1_reconcilliation}
                                        office={selectedSetter1?.office}
                                        approvedDate={salesData?.approved_date}
                                        showReconciliation={
                                            selectedSetter1?.reconciliations?.status
                                        }
                                    />
                                ) : null}
                            </div>
                        </div>
                    </div>
                    {selectedSetter1 &&
                    selectedSetter1 &&
                    selectedCloser1?.id != selectedSetter1?.id ? (
                        <div className='d-flex stripRow flex-wrap align-items-center py-3 px-sm-20 px-10 gap-sm-0 gap-10'>
                            <div className='w-sm-50 w-100 px-sm-20'>
                                <div className=''>
                                    Closer2:
                                    <RedirectToEmployeeProfile
                                        target='_blank'
                                        employeeId={selectedCloser2?.id}
                                        style={{marginRight: 10}}
                                    >
                                        {selectedCloser2?.email ?? ''}
                                    </RedirectToEmployeeProfile>
                                    <RepRedlineInfo
                                        rep={selectedCloser2}
                                        positionType={MAIN_POSITTIONS_ID.closer}
                                    />
                                </div>

                                <div className='' id='kt_chat_contacts_header'>
                                    <div className=''>
                                        <CustomDropdown
                                            name={FIELD_KEYS?.rep_id2}
                                            value={salesData?.rep_id2}
                                            options={closer2List}
                                            placeholder='Select Closer 2'
                                            onChange={onChangeInputData}
                                            valueKey='id'
                                            displayKey='name'
                                        />
                                    </div>
                                    {selectedCloser2 ? (
                                        <CloserSetterBottomDisplayValues
                                            m1={salesData?.closer2_m1}
                                            m2={salesData?.closer2_m2}
                                            reconciliation={salesData?.closer2_reconcilliation}
                                            office={selectedCloser2?.office}
                                            approvedDate={salesData?.approved_date}
                                            showReconciliation={
                                                selectedCloser2?.reconciliations?.status
                                            }
                                        />
                                    ) : null}
                                </div>
                            </div>
                            <div className='w-sm-50 w-100 px-sm-20'>
                                <div className=''>
                                    Setter2:
                                    <RedirectToEmployeeProfile
                                        target='_blank'
                                        employeeId={selectedSetter2?.id}
                                        style={{marginRight: 10}}
                                    >
                                        {selectedSetter2?.email ?? ''}
                                    </RedirectToEmployeeProfile>
                                    <RepRedlineInfo
                                        rep={selectedSetter2}
                                        positionType={MAIN_POSITTIONS_ID.setter}
                                    />
                                </div>
                                <div className=''>
                                    <div className=''>
                                        <CustomDropdown
                                            name={FIELD_KEYS?.setter_id2}
                                            value={salesData?.setter_id2}
                                            options={setter2List}
                                            placeholder='Select Setter 2'
                                            onChange={onChangeInputData}
                                            valueKey='id'
                                            displayKey='name'
                                        />
                                    </div>
                                    {selectedCloser2 ? (
                                        <CloserSetterBottomDisplayValues
                                            m1={salesData?.setter2_m1}
                                            m2={salesData?.setter2_m2}
                                            reconciliation={salesData?.setter2_reconcilliation}
                                            office={selectedSetter2?.office}
                                            approvedDate={salesData?.approved_date}
                                            showReconciliation={
                                                selectedSetter2?.reconciliations?.status
                                            }
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {/* Ends */}
                </div>
            </div>
            <div className='d-flex flex-center  gap-10 py-10 text-cmGrey900'>
                <CustomButton
                    buttonLabel='Save Sale'
                    buttonSize={BUTTON_SIZE.normal}
                    onClick={saveData}
                />
                <CustomButton
                    type='submit'
                    buttonType={BUTTON_TYPE.primaryBorder}
                    buttonLabel='Cancel'
                    buttonSize={BUTTON_SIZE.normal}
                    onClick={() => navigate(-1)}
                />
            </div>
            <HireNew
                // id={id}
                show={open}
                handleClose={handleClose}
                // getonbording={getonbording}
                // setLoader={setLoader}
            />
            <AuthenticateSalesUserPopup
                pid={pid}
                show={openPassPopup}
                onSuccessClose={() => {
                    handleClosePassPopUp()
                    setIsSuperAdmin(true)
                }}
                handleClose={handleClosePassPopUp}
            />
        </div>
    )
}
export default ManageSalesPage

export const CloserSetterBottomDisplayValues = ({
    m1 = null,
    m2 = null,
    reconciliation = null,
    office = null,
    showReconciliation = false,
    approvedDate = null,
}) => {
    const officeRedline = getLocationRedlineHelper(office, approvedDate)?.current
    return (
        <>
            <div className='text-cmGrey500'>
                {isInputValueExist(m1) ? (
                    <div className='badge bg-cmSuccess bg-opacity-10 text-cmSuccess me-2'>
                        M1: {formattedNumberFields(m1)}
                    </div>
                ) : null}
                {isInputValueExist(m2) ? (
                    <div className='badge bg-cminfo bg-opacity-10 text-cminfo me-2'>
                        M2: {formattedNumberFields(m2)}
                    </div>
                ) : null}
                {showReconciliation && isInputValueExist(reconciliation) ? (
                    <div className='badge bg-cmPurple bg-opacity-10 text-cmPurple me-2'>
                        Reconcilation: {formattedNumberFields(reconciliation)}
                    </div>
                ) : null}
            </div>
            <div className='text-cmGrey500 mt-2'>
                <div className='badge bg-cmOrange bg-opacity-20 text-cmGrey900 me-2'>
                    Office: {office?.office_name} | {office?.state?.name ?? '-'} (
                    {office?.general_code ?? '-'}) | {officeRedline?.redline_standard ?? '-'}
                </div>
            </div>
        </>
    )
}
