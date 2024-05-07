import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {Dialog} from 'primereact/dialog'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import {
    getAllManagerListService,
    getTeamListService,
    getUserEmploymentPackageDetailService,
    transferEmployeeService,
} from '../../../../../services/Services'
import _ from 'lodash'
import {getErrorMessageFromResponse} from '../../../../../helpers/CommonHelpers'
import {transferValidation} from '../../../../../validations/validations'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomDropdown from '../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomCheckbox from '../../../../../customComponents/customCheckbox/CustomCheckbox'
import CustomDatePicker from '../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../customComponents/customButtton/CustomButton'
import {
    MAIN_POSITTIONS_ID,
    UNIT_TYPE2,
    getValidDate,
    SHOW_BASED_ON_HOST,
} from '../../../../../constants/constants'
import {useSelector} from 'react-redux'
import {
    getDepartmentWithPositionSelector,
    geyAllStatesWithOfficesSelector,
} from '../../../../../redux/selectors/SettingsSelectors'
import useValidation from '../../../../../hooks/useValidation'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {getDepartmentWithPositionAction} from '../../../../../redux/actions/SettingActions'

const TransferModal = ({show, handleClose, userId, getProfile}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [managerList, setManagerList] = useState([])
    const [employeeData, setEmployeeData] = useState(null)
    const [oldOfficeManagerList, setOldOfficeManagerList] = useState([])
    const [loading, setLoading] = useState(false)
    const [transferEmployeeData, setsetTransferEmployeeData] = useState({
        user_id: null,
        effective_date: null,
        state_id: null,
        office_id: null,
        manager_id: null,
        team_id: null,
        redline_amount_type: null,
        redline: null,
        redline_type: null,
        self_gen_redline_amount_type: null,
        self_gen_redline: null,
        self_gen_redline_type: null,
        existing_employee_new_manager_id: null,
    })
    const allStatesWithOffices = useSelector(geyAllStatesWithOfficesSelector)
    const departmentWithPositionList = useSelector(getDepartmentWithPositionSelector)
    const [teamList, setTeamList] = useState([])
    const [validateTransferedData, transferedErrorData] = useValidation()

    useEffect(() => {
        dispatch(getDepartmentWithPositionAction())
    }, [])

    useEffect(() => {
        if (transferEmployeeData?.office_id) {
            getTeamListService(transferEmployeeData?.office_id).then((res) => {
                setTeamList(res?.data)
            })
        }
    }, [transferEmployeeData?.office_id])
    useEffect(() => {
        if (userId) {
            setLoading(true)
            getUserEmploymentPackageDetailService(userId)
                .then((res) => {
                    const employeeCompensation = res?.data?.employee_compensation
                    setsetTransferEmployeeData({
                        ...transferEmployeeData,
                        redline_amount_type: employeeCompensation?.[0]?.redline_amount_type,
                        redline: employeeCompensation?.[0]?.redline,
                        redline_type: employeeCompensation?.[0]?.redline_type,
                        self_gen_redline_amount_type:
                            employeeCompensation?.[1]?.redline_amount_type,
                        self_gen_redline: employeeCompensation?.[1]?.redline,
                        self_gen_redline_type: employeeCompensation?.[1]?.redline_type,
                    })
                    setEmployeeData(res?.data)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [userId])

    useEffect(() => {
        if (transferedErrorData?.beginValidating) {
            validateTransferedData(transferValidation(transferEmployeeData, employeeData))
        }
    }, [transferEmployeeData])

    useEffect(() => {
        if (transferEmployeeData?.office_id) {
            getAllManagerListService(transferEmployeeData?.office_id).then((res) => {
                setManagerList(res?.data)
            })
        }
    }, [transferEmployeeData?.office_id])

    useEffect(() => {
        if (employeeData?.office_id) {
            getAllManagerListService(employeeData?.office_id).then((res) => {
                setOldOfficeManagerList(res?.data)
            })
        }
    }, [employeeData?.office_id])

    const positionList = useMemo(
        () =>
            departmentWithPositionList?.find((item) => item?.id == employeeData?.department_id)
                ?.position,
        [departmentWithPositionList, employeeData?.department_id]
    )

    const onTransfer = useCallback(() => {
        const body = {...transferEmployeeData}
        body.user_id = employeeData?.id
        body.effective_date = getValidDate(body?.effective_date, 'YYYY/MM/DD')
        validateTransferedData(transferValidation(transferEmployeeData, employeeData)).then(
            (res) => {
                if (res.isValidate) {
                    setLoading(true)
                    transferEmployeeService(body)
                        .then(() => {
                            handleClose()
                            navigate(`/user/personal-info?employeeId=${userId}`)
                            CustomToast.success('Employee has been transferred')
                        })
                        .catch((e) => {
                            CustomToast.error(getErrorMessageFromResponse(e))
                        })
                        .finally(() => setLoading(false))
                }
            }
        )
        return
    }, [employeeData, handleClose, navigate, transferEmployeeData, userId, validateTransferedData])

    const onChangeInputData = useCallback(
        (e) => {
            const data = _.cloneDeep(transferEmployeeData)
            data[e?.target?.name] = e?.target?.value
            setsetTransferEmployeeData(data)
        },
        [transferEmployeeData]
    )

    const managerNames = useMemo(() => {
        const filteredData = managerList?.filter((item) => item?.id != employeeData?.id)
        return filteredData?.map((item) => ({
            ...item,
            name: `${item?.first_name}  ${item?.last_name}`,
        }))
    }, [employeeData?.id, managerList])

    const oldOfficeManagerNames = useMemo(() => {
        const filteredData = oldOfficeManagerList?.filter((item) => item?.id != employeeData?.id)
        return filteredData?.map((item) => ({
            ...item,
            name: `${item?.first_name}  ${item?.last_name}`,
        }))
    }, [employeeData?.id, oldOfficeManagerList])

    return (
        <Dialog
            id='kt_modal_create_app'
            tabIndex={-1}
            aria-hidden='true'
            header={() => (
                <div
                    className=' mb-0 text-center mb-7 '
                    style={{
                        fontSize: '16px',
                        color: '#0D1821',
                        fontFamily: 'Manrope',
                        fontWeight: '700',
                    }}
                >
                    Transfer Employee - {employeeData?.first_name} {employeeData?.last_name}
                </div>
            )}
            footer={() => (
                <div className='text-lg-center text-center pt-5'>
                    <CustomButton
                        buttonType={BUTTON_TYPE.primary}
                        buttonLabel='Transfer'
                        onClick={onTransfer}
                        buttonSize={BUTTON_SIZE.large}
                        disabled={loading}
                    />
                </div>
            )}
            icons={false}
            className='mw-sm-750px w-sm-75 w-100 '
            visible={show}
            onHide={handleClose}
            backdrop='true'
        >
            <div
                className='w-75 mx-auto'
                style={{fontFamily: 'Manrope', fontSize: '14px', position: 'relative'}}
            >
                <CustomLoader full visible={loading} />

                <div className=''>
                    <div className='modal-body  py-2 px-lg-0 mb-5'>
                        <div
                            className='py-2 px-lg-10 mb-3'
                            style={{fontFamily: 'Manrope', fontSize: '14px', fontWeight: 600}}
                        >
                            Transfer to
                        </div>
                        <div className='px-lg-10 '>
                            <>
                                <div
                                    className='row gap-5 align-items-center mb-7'
                                    style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                >
                                    <div className='col-sm'>
                                        <div>
                                            <CustomDropdown
                                                required
                                                name={'state_id'}
                                                label={'Office State'}
                                                options={allStatesWithOffices}
                                                onChange={onChangeInputData}
                                                placeholder='Select Office State'
                                                valueKey='id'
                                                value={transferEmployeeData?.state_id}
                                                errorMessage={transferedErrorData?.state_id}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-sm '>
                                        <div className=''>
                                            <CustomDropdown
                                                required
                                                label={'Office Name'}
                                                name='office_id'
                                                options={allStatesWithOffices
                                                    ?.find(
                                                        (item) =>
                                                            item?.id ==
                                                            transferEmployeeData?.state_id
                                                    )
                                                    ?.office?.filter(
                                                        (item) =>
                                                            item?.id != employeeData?.office_id
                                                    )}
                                                onChange={onChangeInputData}
                                                valueKey='id'
                                                displayKey='office_name'
                                                value={transferEmployeeData?.office_id}
                                                placeholder={'Select Office'}
                                                errorMessage={transferedErrorData?.office_id}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className='row gap-5 align-items-center mb-7'
                                    style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                >
                                    <div className='col-sm'>
                                        <div>
                                            <CustomDropdown
                                                required
                                                disabled
                                                label={'Department'}
                                                options={departmentWithPositionList}
                                                name={'department_id'}
                                                value={employeeData?.department_id}
                                                valueKey='id'
                                                placeholder='Select Department'
                                            />
                                        </div>
                                        <div className='row d-flex  justify-content-center align-items-center mt-3'>
                                            <div
                                                className='col text-cmGrey700 d-flex flex-wrap align-items-center'
                                                style={{
                                                    fontFamily: 'Manrope',
                                                    fontSize: '12px',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <div className='m-2'>
                                                    <CustomCheckbox
                                                        disable
                                                        checked={
                                                            employeeData?.is_manager ? true : false
                                                        }
                                                    />
                                                </div>
                                                Is Manager ?
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-sm '>
                                        <div className=''>
                                            <CustomDropdown
                                                disabled
                                                label={'Position'}
                                                options={positionList}
                                                valueKey='id'
                                                required
                                                value={employeeData?.sub_position_id ?? ''}
                                                displayKey='position_name'
                                            />
                                        </div>
                                        <div className='d-flex justify-content-center align-items-center mt-3'>
                                            <div
                                                className='text-cmGrey700 d-flex'
                                                style={{
                                                    fontFamily: 'Manrope',
                                                    fontSize: '12px',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <div className='m-2'>
                                                    <CustomCheckbox
                                                        disable
                                                        checked={
                                                            employeeData?.self_gen_accounts
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                </div>
                                                May act as both setter and closer
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className='row gap-5 align-items-center mb-7'
                                    style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                >
                                    <div className='col-sm'>
                                        <div>
                                            <CustomDropdown
                                                label={'Select New Manager'}
                                                required={!employeeData?.is_manager ? true : false}
                                                options={managerNames}
                                                name={'manager_id'}
                                                valueKey='id'
                                                displayKey='name'
                                                onChange={onChangeInputData}
                                                placeholder='Select Manager'
                                                value={transferEmployeeData?.manager_id}
                                                errorMessage={transferedErrorData?.manager_id}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-sm '>
                                        <div className=''>
                                            <CustomDropdown
                                                required={
                                                    SHOW_BASED_ON_HOST?.teamRequiredForOnboarding
                                                }
                                                label={'Select Team'}
                                                options={teamList}
                                                valueKey='id'
                                                displayKey='team_name'
                                                name='team_id'
                                                value={transferEmployeeData?.team_id}
                                                errorMessage={transferedErrorData?.team_id}
                                                onChange={onChangeInputData}
                                                placeholder={'Select Team'}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className='row gap-5 align-items-end mb-7'
                                    style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                >
                                    <div className='col-sm'>
                                        <div>
                                            <CustomDropdown
                                                label={`${
                                                    employeeData?.position_id ==
                                                    MAIN_POSITTIONS_ID.closer
                                                        ? 'Closer'
                                                        : 'Setter'
                                                } Redline Change (if any)`}
                                                options={[
                                                    {
                                                        name: 'Shift based on Location',
                                                        value: 'Shift based on Location',
                                                    },
                                                    {
                                                        name: 'Fixed',
                                                        value: 'Fixed',
                                                    },
                                                ]}
                                                required
                                                placeholder='Select'
                                                name='redline_amount_type'
                                                onChange={onChangeInputData}
                                                value={transferEmployeeData?.redline_amount_type}
                                                errorMessage={
                                                    transferedErrorData?.redline_amount_type
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className='col-sm'>
                                        <div className='d-flex gap-2'>
                                            <div className=''>
                                                <CustomInput
                                                    hideLabel
                                                    label='Redline Redline'
                                                    type={INPUT_TYPE.number}
                                                    onChange={onChangeInputData}
                                                    value={transferEmployeeData?.redline}
                                                    name='redline'
                                                    placeholder={'0.00'}
                                                    errorMessage={transferedErrorData?.redline}
                                                />
                                            </div>
                                            <div className=''>
                                                <CustomDropdown
                                                    label='Redline Type'
                                                    hideLabel
                                                    options={UNIT_TYPE2}
                                                    name='redline_type'
                                                    onChange={onChangeInputData}
                                                    value={transferEmployeeData?.redline_type}
                                                    placeholder={'Select unit'}
                                                    errorMessage={transferedErrorData?.redline_type}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {employeeData?.self_gen_accounts ? (
                                    <div
                                        className='row gap-5 align-items-end mb-7'
                                        style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                    >
                                        <div className='col-sm'>
                                            <div>
                                                <CustomDropdown
                                                    label={`${
                                                        employeeData?.position_id ==
                                                        MAIN_POSITTIONS_ID.closer
                                                            ? 'Setter'
                                                            : 'Closer'
                                                    } Redline Change (if any)`}
                                                    options={[
                                                        {
                                                            name: 'Shift based on Location',
                                                            value: 'Shift based on Location',
                                                        },
                                                        {
                                                            name: 'Fixed',
                                                            value: 'Fixed',
                                                        },
                                                    ]}
                                                    placeholder='Select'
                                                    required
                                                    name='self_gen_redline_amount_type'
                                                    onChange={onChangeInputData}
                                                    value={
                                                        transferEmployeeData?.self_gen_redline_amount_type
                                                    }
                                                    errorMessage={
                                                        transferedErrorData?.self_gen_redline_amount_type
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className='col-sm'>
                                            <div className='d-flex gap-2'>
                                                <div className=''>
                                                    <CustomInput
                                                        hideLabel
                                                        label='Redline Redline'
                                                        type={INPUT_TYPE.number}
                                                        onChange={onChangeInputData}
                                                        value={
                                                            transferEmployeeData?.self_gen_redline
                                                        }
                                                        name='self_gen_redline'
                                                        placeholder={'0.00'}
                                                        errorMessage={
                                                            transferedErrorData?.self_gen_redline
                                                        }
                                                    />
                                                </div>
                                                <div className=''>
                                                    <CustomDropdown
                                                        label='Redline Type'
                                                        hideLabel
                                                        options={UNIT_TYPE2}
                                                        name='self_gen_redline_type'
                                                        onChange={onChangeInputData}
                                                        value={
                                                            transferEmployeeData?.self_gen_redline_type
                                                        }
                                                        placeholder={'Select unit'}
                                                        errorMessage={
                                                            transferedErrorData?.self_gen_redline_type
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                                {employeeData?.is_manager ? (
                                    <div
                                        className='row gap-5 align-items-center mb-7'
                                        style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                    >
                                        <div className='col'>
                                            <div>
                                                <CustomDropdown
                                                    label={`Since ${employeeData?.first_name} ${employeeData?.last_name} is a manager in current office, map employees to a new
                                                manager to complete the transfer`}
                                                    required
                                                    name='existing_employee_new_manager_id'
                                                    options={oldOfficeManagerNames}
                                                    onChange={onChangeInputData}
                                                    placeholder='Select Manager'
                                                    valueKey='id'
                                                    displayKey='name'
                                                    value={
                                                        transferEmployeeData?.existing_employee_new_manager_id
                                                    }
                                                    errorMessage={
                                                        transferedErrorData?.existing_employee_new_manager_id
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                                <div
                                    className='row gap-5 align-items-center mb-5'
                                    style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                >
                                    <div className='col-sm-6'>
                                        <div>
                                            <CustomDatePicker
                                                required
                                                label={`Transfer Effective Date`}
                                                onChange={onChangeInputData}
                                                name='effective_date'
                                                value={transferEmployeeData?.effective_date}
                                                errorMessage={transferedErrorData?.effective_date}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>

                            {/* Table */}
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default TransferModal
