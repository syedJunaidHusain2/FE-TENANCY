/* eslint-disable jsx-a11y/anchor-is-valid */
import {useCallback, useEffect, useMemo, useState} from 'react'
import {createPortal} from 'react-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getAdjustmentTypeSelector} from '../../../../../redux/selectors/RequestApprovalSelectors'
import {
    addRequestService,
    getPidByUserService,
    getPositionByIdService,
    getRecuiterFilterService,
} from '../../../../../services/Services'
import {
    getUserDataSelector,
    isUserManagerSelector,
    isUserSuperAdminSelector,
} from '../../../../../redux/selectors/AuthSelectors'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import {PAYROLL_DISPUTE_LIST, getValidDate} from '../../../../../constants/constants'
import {jsonToFormData} from '../../../../../helpers/CommonHelpers'
import {Dialog} from 'primereact/dialog'
import {getParentChildCostCenterAction} from '../../../../../redux/actions/SettingActions'
import {getParentChildCostCenterSelector} from '../../../../../redux/selectors/SettingsSelectors'
import CustomSearchInput from '../../../../../customComponents/customInputs/customSearchInput/CustomSearchInput'
import CustomDatePicker from '../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'
import usePayFrequency from '../../../../../hooks/usePayFrequency'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../customComponents/customButtton/CustomButton'
import CustomDropdown from '../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomAutoCompleteDropdown from '../../../../../customComponents/customInputs/customAutoCompleteDropdown/CustomAutoCompleteDropdown'
import CustomModal from '../../../../../customComponents/customModal/CustomModal'

const modalsRoot = document.getElementById('root-modals') || document.body

const FIELD_KEYS = {
    adjustment_type_id: 'adjustment_type_id',
    pay_period: 'pay_period',
    dispute_type: 'dispute_type',
    customer_pid: 'customer_pid',
    description: 'description',
    cost_tracking_id: 'cost_tracking_id',
    emi: 'emi',
    cost_date: 'cost_date',
    amount: 'amount',
    user_id: 'user_id',
    request_date: 'request_date',
    image: 'image',
}

const RequestsPop = ({show, handleClose}) => {
    const dispatch = useDispatch()
    const adjustmentTypeList = useSelector(getAdjustmentTypeSelector)
    const userData = useSelector(getUserDataSelector)
    const isManager = useSelector(isUserManagerSelector)
    const isSuperAdmin = useSelector(isUserSuperAdminSelector)
    const [pidList, setPidList] = useState([])
    const costCenterList = useSelector(getParentChildCostCenterSelector)
    const [loading, setLoading] = useState(false)
    const [positionId, setPositionId] = useState(userData?.sub_position_id)
    const [requestData, setRequestData] = useState({
        adjustment_type_id: 1,
        pay_period: null,
        dispute_type: null,
        customer_pid: null,
        description: null,
        cost_tracking_id: null,
        emi: null,
        cost_date: null,
        amount: null,
        user_id: userData,
        request_date: null,
        image: null,
    })
    const [selectedPids, setSelectedPids] = useState([])
    const {handleSelectedWeekData, executedPayPeriodList} = usePayFrequency()

    useEffect(() => {
        dispatch(getParentChildCostCenterAction())
    }, [])

    useEffect(() => {
        setRequestData({
            ...requestData,
            pay_period: null,
            dispute_type: null,
            customer_pid: null,
            description: null,
            cost_tracking_id: null,
            emi: null,
            cost_date: null,
            amount: null,
            user_id: userData,
            request_date: null,
            image: null,
        })
    }, [requestData?.adjustment_type_id])

    useEffect(() => {
        getPidByUserService(requestData?.user_id?.id)
            .then((res) => {
                const pidListobject = res?.data.map((i) => {
                    return {name: i}
                })
                setPidList(pidListobject)
            })
            .finally(() => {})
    }, [requestData?.user_id?.id])

    useEffect(() => {
        getPositionByIdService(requestData?.user_id?.sub_position_id)
            .then((res) => {
                handleSelectedWeekData(res?.data[0]?.frequency_type_name)
            })
            .finally(() => {})
    }, [positionId, requestData?.user_id])

    const onSubmitPress = useCallback(() => {
        const passPid = selectedPids.map((i) => i.name)
        const passPindintoString = passPid.join(',')

        let body = {
            adjustment_type_id: requestData?.adjustment_type_id,
            user_id: requestData?.user_id?.id,
        }

        if (!body?.adjustment_type_id) return CustomToast.error('Select type of request')
        if (requestData?.adjustment_type_id == 1) {
            body = {
                ...body,
                amount: requestData?.amount,
                pay_period: requestData?.pay_period,
                dispute_type: requestData?.dispute_type,
                customer_pid: passPindintoString,
                description: requestData?.description,
            }
            if (!body?.amount) return CustomToast.error('Enter amount')
            if (!body?.pay_period) return CustomToast.error('Select pay period')
            if (!body?.dispute_type) return CustomToast.error('Select dispute type')
        } else if (requestData?.adjustment_type_id == 2) {
            body = {
                ...body,
                amount: requestData?.amount,
                cost_date: getValidDate(requestData?.cost_date, 'YYYY-MM-DD'),
                cost_tracking_id: requestData?.cost_tracking_id,
                description: requestData?.description,
            }
            if (!body?.amount) return CustomToast.error('Enter amount')
            if (!body?.cost_date) return CustomToast.error('Select cost date')
            if (!body?.cost_tracking_id) return CustomToast.error('Select cost head')
        } else if (requestData?.adjustment_type_id == 3) {
            body = {
                ...body,
                customer_pid: passPindintoString,
                amount: requestData?.amount,
                description: requestData?.description,
                request_date: getValidDate(requestData?.request_date, 'YYYY-MM-DD'),
            }
            if (!body?.user_id) return CustomToast.error('Select employee')
            if (!body?.amount) return CustomToast.error('Enter amount')
            // if (!body?.customer_pid) return CustomToast.error('Enter PID')
            if (!body?.request_date) return CustomToast.error('Select date of bonus')
        } else if (requestData?.adjustment_type_id == 4) {
            body = {
                ...body,
                amount: requestData?.amount,
                description: requestData?.description,
            }
            if (!body?.amount) return CustomToast.error('Enter amount')
        } else if ([5, 6].includes(Number(requestData?.adjustment_type_id))) {
            body = {
                ...body,
                customer_pid: passPindintoString,
                amount: requestData?.amount,
                request_date: getValidDate(requestData?.request_date, 'YYYY-MM-DD'),
                description: requestData?.description,
            }
            if (!body?.user_id) return CustomToast.error('Select employee')
            if (!body?.amount) return CustomToast.error('Enter amount')
            // if (!body?.customer_pid) return CustomToast.error('Enter PID')

            if (!body?.request_date) return CustomToast.error('Select date of bonus')
        }

        if (requestData?.image) body.image = requestData?.image
        const formData = jsonToFormData(body)

        setLoading(true)
        addRequestService(formData)
            .then((res) => {
                CustomToast.success('Request added')
                handleClose()
            })
            .finally(() => {
                setLoading(false)
            })
    }, [
        handleClose,
        requestData?.adjustment_type_id,
        requestData?.amount,
        requestData?.cost_date,
        requestData?.cost_tracking_id,
        requestData?.description,
        requestData?.dispute_type,
        requestData?.image,
        requestData?.pay_period,
        requestData?.request_date,
        requestData?.user_id?.id,
        selectedPids,
    ])

    const updateRequestData = useCallback((field, value) => {
        setRequestData((val) => ({
            ...val,
            [field]: value,
        }))
    }, [])

    const onChangeInputData = useCallback(
        (e) => {
            updateRequestData(e?.target?.name, e?.target?.value)
        },
        [updateRequestData]
    )

    const onChangeFileData = (e) => {
        updateRequestData(e?.target?.name, e?.target?.files?.[0])
    }

    const onSeachRecruiter = useCallback(
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

    const onSelectEmployee = useCallback(
        (value) => {
            setPositionId(value?.position_detail?.id)
            onChangeInputData({
                target: {
                    name: FIELD_KEYS.user_id,
                    value: value,
                },
            })
        },
        [onChangeInputData]
    )

    const onSelectPids = (e) => {
        setSelectedPids(e.value)
    }

    const periodList = useMemo(() => {
        return executedPayPeriodList?.map((item) => ({
            ...item,
            period: `${getValidDate(item?.pay_period_from)} to ${getValidDate(
                item?.pay_period_to
            )}`,
            value: `${getValidDate(item?.pay_period_from)} to ${getValidDate(item?.pay_period_to)}`,
        }))
    }, [executedPayPeriodList])

    const costCenterListWithChilds = useMemo(() => {
        const data = []
        costCenterList.map((item) => {
            data.push({
                name: item?.name,
                value: item?.id,
                disabled: item?.chields?.length > 0,
            })
            if (item?.chields?.length > 0) {
                item?.chields.map((subItem) => {
                    data.push({
                        name: `- ${subItem?.name}`,
                        value: subItem?.id,
                        disabled: false,
                    })
                })
            }
        })
        return data
    }, [costCenterList])

    return createPortal(
        <CustomModal show={show} title='Add Request' onHide={handleClose}>
            <div style={{position: 'relative'}}>
                <CustomLoader visible={loading} loaderPosition='top' full size={100} />
                <div className=''>
                    <div className='modal-body  py-lg-7 px-lg-10'>
                        <div className='container d-flex justify-content-center'>
                            <div className='row w-sm-450px'>
                                <form action='' style={{fontFamily: 'Manrope'}}>
                                    {/* Slector starts */}
                                    <div className='mb-10'>
                                        <CustomDropdown
                                            label={'Type of Request'}
                                            name={FIELD_KEYS.adjustment_type_id}
                                            onChange={onChangeInputData}
                                            value={requestData?.adjustment_type_id}
                                            required
                                            options={adjustmentTypeList}
                                            valueKey='id'
                                            searching={false}
                                            showClear={false}
                                        />
                                    </div>
                                    {isManager || isSuperAdmin ? (
                                        <div className='mb-10'>
                                            <label
                                                className='form-label text-cmGrey700'
                                                style={{fontSize: '14px', fontWeight: '600'}}
                                            >
                                                <span>Employee Name</span>
                                                <span className='text-cmError'>*</span>
                                            </label>

                                            <CustomSearchInput
                                                placeholder='Search Employee'
                                                onSearch={onSeachRecruiter}
                                                onSelectValue={onSelectEmployee}
                                                selectedValue={requestData?.user_id?.name}
                                            />
                                        </div>
                                    ) : null}

                                    {/* Payroll Dispute Starts */}
                                    {requestData?.adjustment_type_id == 1 && (
                                        <div>
                                            <div className='mb-10 w-100'>
                                                <CustomAutoCompleteDropdown
                                                    label={'PID'}
                                                    options={pidList}
                                                    value={selectedPids}
                                                    onChange={onSelectPids}
                                                    className=''
                                                    selectedOptions={selectedPids}
                                                />
                                            </div>

                                            <div className='mb-10'>
                                                <div className='w-sm-auto w-100'>
                                                    <CustomDropdown
                                                        label={'Pay Period'}
                                                        required
                                                        name={FIELD_KEYS.pay_period}
                                                        value={requestData?.pay_period}
                                                        onChange={onChangeInputData}
                                                        placeholder={
                                                            executedPayPeriodList?.length > 0
                                                                ? 'Select Pay Period'
                                                                : 'No Pay Period Available'
                                                        }
                                                        options={periodList}
                                                        valueKey='value'
                                                        displayKey='period'
                                                    />
                                                </div>
                                            </div>
                                            <div className='mb-10'>
                                                <div>
                                                    <CustomInput
                                                        label={'Amount'}
                                                        required
                                                        type={INPUT_TYPE.number}
                                                        placeholder='Eg: -$300 or $300'
                                                        name={FIELD_KEYS.amount}
                                                        value={requestData?.amount}
                                                        onChange={onChangeInputData}
                                                    />
                                                </div>
                                            </div>
                                            <div className='mb-10'>
                                                <CustomDropdown
                                                    label='Dispute Type'
                                                    options={PAYROLL_DISPUTE_LIST}
                                                    required
                                                    name={FIELD_KEYS.dispute_type}
                                                    value={requestData?.dispute_type}
                                                    onChange={onChangeInputData}
                                                    displayKey='value'
                                                    searching={false}
                                                />
                                            </div>

                                            <div className='mb-10'>
                                                <CustomInput
                                                    label={'Description'}
                                                    type={INPUT_TYPE.textarea}
                                                    placeholder='Enter description'
                                                    name={FIELD_KEYS.description}
                                                    value={requestData?.description}
                                                    onChange={onChangeInputData}
                                                />
                                            </div>

                                            {/* label 5 */}
                                            <div className='mb-10'>
                                                <label
                                                    className='form-label text-cmGrey700'
                                                    style={{fontWeight: 600, fontSize: '14px'}}
                                                >
                                                    Supporting images or documents (max. 50mb each)
                                                </label>
                                                <input
                                                    type='file'
                                                    className='form-control bg-cmbg'
                                                    placeholder='Select file'
                                                    name={FIELD_KEYS.image}
                                                    onChange={onChangeFileData}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {requestData?.adjustment_type_id == 2 && (
                                        <div>
                                            {/* Field 1 */}
                                            <div className='d-sm-flex justify-content-between gap-10 mb-10'>
                                                <div className='w-sm-100 mb-sm-0 mb-10'>
                                                    <CustomInput
                                                        label={'Amount'}
                                                        type={INPUT_TYPE.number}
                                                        placeholder='Enter Amount'
                                                        name={FIELD_KEYS.amount}
                                                        value={requestData?.amount}
                                                        onChange={onChangeInputData}
                                                        required
                                                    />
                                                </div>

                                                <div className='w-sm-100'>
                                                    <CustomDatePicker
                                                        required
                                                        label={'Cost Date'}
                                                        name={FIELD_KEYS.cost_date}
                                                        inputClassName='py-1'
                                                        value={requestData?.cost_date}
                                                        onChange={onChangeInputData}
                                                        className='bg-cmbg'
                                                        mode='single'
                                                        placeholder='Select cost date'
                                                    />
                                                </div>
                                            </div>

                                            <div className='mb-10'>
                                                <CustomDropdown
                                                    required
                                                    label={'Cost Head'}
                                                    name={FIELD_KEYS.cost_tracking_id}
                                                    options={costCenterListWithChilds}
                                                    onChange={onChangeInputData}
                                                    value={requestData?.cost_tracking_id}
                                                />
                                            </div>
                                            {/* Field 3 */}
                                            <div className='mb-10'>
                                                <CustomInput
                                                    label={'Description'}
                                                    type={INPUT_TYPE.textarea}
                                                    placeholder='Add Description'
                                                    name={FIELD_KEYS.description}
                                                    value={requestData?.description}
                                                    onChange={onChangeInputData}
                                                />
                                            </div>
                                            {/* Field 4 */}
                                            <div className='mb-10'>
                                                <label
                                                    for='formFileMultiple'
                                                    className='form-label text-cmGrey700'
                                                    style={{fontWeight: 600}}
                                                >
                                                    Supporting images or documents (maximum 50MB
                                                    each)
                                                </label>
                                                <input
                                                    type='file'
                                                    className='form-control'
                                                    placeholder='Select file'
                                                    name={FIELD_KEYS.image}
                                                    onChange={onChangeFileData}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Advance */}
                                    {requestData?.adjustment_type_id == 4 && (
                                        <div>
                                            <div className='mb-10'>
                                                <CustomInput
                                                    label={'Amount'}
                                                    type={INPUT_TYPE.number}
                                                    placeholder='Enter Amount'
                                                    name={FIELD_KEYS.amount}
                                                    value={requestData?.amount}
                                                    onChange={onChangeInputData}
                                                    required
                                                />
                                            </div>
                                            {/* feild 2 */}
                                            <div className='mb-10'>
                                                <CustomInput
                                                    label={'Description'}
                                                    type={INPUT_TYPE.textarea}
                                                    placeholder='Enter Reason'
                                                    name={FIELD_KEYS.description}
                                                    value={requestData?.description}
                                                    onChange={onChangeInputData}
                                                    required
                                                />
                                            </div>
                                            {/* feild 3 */}
                                            <div className='mb-10'>
                                                <label
                                                    className='form-label text-cmGrey700'
                                                    style={{fontWeight: 700}}
                                                >
                                                    Supporting images or documents (maximum 50MB
                                                    each)
                                                </label>
                                                <input
                                                    type='file'
                                                    className='form-control'
                                                    placeholder='Select file'
                                                    name={FIELD_KEYS.image}
                                                    onChange={onChangeFileData}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {/* Fine/Fee*/}
                                    {requestData?.adjustment_type_id == 5 && (
                                        <div className=' mx-auto mt-10 mb-10'>
                                            <div className='mb-10'>
                                                <CustomAutoCompleteDropdown
                                                    label={'PID'}
                                                    options={pidList}
                                                    value={selectedPids}
                                                    onChange={onSelectPids}
                                                    className=''
                                                    selectedOptions={selectedPids}
                                                />
                                            </div>
                                            <div className='row align-items-end mb-10 '>
                                                <div className='col-sm'>
                                                    <CustomInput
                                                        label={'Amount'}
                                                        required
                                                        type={INPUT_TYPE.number}
                                                        placeholder='Enter Amount'
                                                        name={FIELD_KEYS.amount}
                                                        value={requestData?.amount}
                                                        onChange={onChangeInputData}
                                                    />
                                                </div>

                                                <div className='col-sm'>
                                                    <CustomDatePicker
                                                        label={'Date'}
                                                        required
                                                        name={FIELD_KEYS.request_date}
                                                        inputClassName='py-1'
                                                        value={requestData?.request_date}
                                                        onChange={onChangeInputData}
                                                        className=''
                                                        mode='single'
                                                        placeholder='Select Date'
                                                    />
                                                </div>
                                            </div>
                                            <div className='mb-10'>
                                                <CustomInput
                                                    label={'Description'}
                                                    type={INPUT_TYPE.textarea}
                                                    id='DescriptionBox'
                                                    name={FIELD_KEYS.description}
                                                    value={requestData?.description}
                                                    onChange={onChangeInputData}
                                                    placeholder='Enter Description'
                                                />
                                            </div>
                                            <div className=''>
                                                <label
                                                    className='form-label'
                                                    style={{fontSize: '14px', fontWeight: '600'}}
                                                >
                                                    <span>
                                                        Supporting images or documents (maximum 50MB
                                                        each)
                                                    </span>
                                                </label>
                                                <input
                                                    type='file'
                                                    className='form-control'
                                                    placeholder='Select file'
                                                    name={FIELD_KEYS.image}
                                                    onChange={onChangeFileData}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Bonuses */}
                                    {requestData?.adjustment_type_id == 3 && (
                                        <div className='mx-auto mt-10 mb-10'>
                                            <div className='mb-10'>
                                                <CustomAutoCompleteDropdown
                                                    label={'PID'}
                                                    options={pidList}
                                                    value={selectedPids}
                                                    onChange={onSelectPids}
                                                    className=''
                                                    selectedOptions={selectedPids}
                                                />
                                            </div>
                                            <div className='row align-items-end mb-10'>
                                                <div className='col-sm'>
                                                    <CustomInput
                                                        label={'Amount'}
                                                        type={INPUT_TYPE.number}
                                                        placeholder='Enter Amount'
                                                        name={FIELD_KEYS.amount}
                                                        value={requestData?.amount}
                                                        onChange={onChangeInputData}
                                                    />
                                                </div>

                                                <div className='col-sm' style={{fontSize: '14px'}}>
                                                    <CustomDatePicker
                                                        label={'Date of Bonus'}
                                                        required
                                                        name={FIELD_KEYS.request_date}
                                                        value={requestData?.request_date}
                                                        onChange={onChangeInputData}
                                                        className=''
                                                        mode='single'
                                                        placeholder='Select Date'
                                                        inputClassName='py-1'
                                                    />
                                                </div>
                                            </div>

                                            <div className='mb-10'>
                                                <CustomInput
                                                    label={'Description'}
                                                    id='DescriptionBox'
                                                    placeholder='Enter Description'
                                                    name={FIELD_KEYS.description}
                                                    value={requestData?.description}
                                                    onChange={onChangeInputData}
                                                    type={INPUT_TYPE.textarea}
                                                />
                                            </div>
                                            {/* Field 4 */}
                                            <div className='mb-10'>
                                                <label
                                                    for='formFileMultiple'
                                                    className='form-label text-cmGrey700'
                                                    style={{fontWeight: 600}}
                                                >
                                                    Supporting images or documents (maximum 50MB
                                                    each)
                                                </label>
                                                <input
                                                    type='file'
                                                    className='form-control'
                                                    placeholder='Select file'
                                                    name={FIELD_KEYS.image}
                                                    onChange={onChangeFileData}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Incentives */}
                                    {requestData?.adjustment_type_id == 6 && (
                                        <div className='mx-auto mt-10 mb-10'>
                                            <div className='mb-10'>
                                                <CustomAutoCompleteDropdown
                                                    label={'PID'}
                                                    value={selectedPids}
                                                    options={pidList}
                                                    onChange={onSelectPids}
                                                    className=''
                                                    selectedOptions={selectedPids}
                                                />
                                            </div>

                                            <div className='row align-items-end mb-10'>
                                                <div className='col-sm'>
                                                    <CustomInput
                                                        label={'Amount'}
                                                        type={INPUT_TYPE?.number}
                                                        placeholder='Enter Amount'
                                                        name={FIELD_KEYS.amount}
                                                        value={requestData?.amount}
                                                        onChange={onChangeInputData}
                                                    />
                                                </div>

                                                <div className='col-sm' style={{fontSize: '14px'}}>
                                                    <CustomDatePicker
                                                        label={'Date'}
                                                        required
                                                        name={FIELD_KEYS.request_date}
                                                        value={
                                                            requestData?.request_date
                                                                ? new Date(
                                                                      requestData?.request_date
                                                                  )
                                                                : null
                                                        }
                                                        onChange={onChangeInputData}
                                                        className=''
                                                        mode='single'
                                                        placeholder='Select Date'
                                                        inputClassName='py-1'
                                                    />
                                                </div>
                                            </div>

                                            <div className='mb-10'>
                                                <CustomInput
                                                    label={'Description'}
                                                    type={INPUT_TYPE.textarea}
                                                    id='DescriptionBox'
                                                    placeholder='Enter Description'
                                                    name={FIELD_KEYS.description}
                                                    value={requestData?.description}
                                                    onChange={onChangeInputData}
                                                />
                                            </div>
                                            {/* Field 4 */}
                                            <div className='mb-10'>
                                                <label
                                                    for='formFileMultiple'
                                                    className='form-label text-cmGrey700'
                                                    style={{fontWeight: 600}}
                                                >
                                                    Supporting images or documents (maximum 5MB
                                                    each)
                                                </label>
                                                <input
                                                    type='file'
                                                    className='form-control'
                                                    placeholder='Select file'
                                                    name={FIELD_KEYS.image}
                                                    onChange={onChangeFileData}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </form>
                                {/* Payroll Dispute ends */}
                                {/* button starts*/}
                                <div className='text-center mb-sm-10 mb-5'>
                                    <CustomButton
                                        type='submit'
                                        buttonType={BUTTON_TYPE.primary}
                                        buttonLabel='Submit'
                                        onClick={onSubmitPress}
                                    />
                                </div>
                                {/* button ends*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CustomModal>,
        modalsRoot
    )
}

export {RequestsPop}
