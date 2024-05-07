import {
    MAIN_POSITTIONS_ID,
    OVERRIDE_TYPE,
    UNIT_TYPE1,
    UNIT_TYPE2,
    SHOW_BASED_ON_HOST,
} from '../../../../../../../constants/constants'
import {LockedView} from '../HireNew'
import {HIRE_FIELD_KEYS} from '../../../../../../../constants/constants'
import {memo, useCallback, useEffect, useMemo, useState} from 'react'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomDropdown from '../../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import _ from 'lodash'
import {
    getBooleanValue,
    getErrorMessageFromResponse,
    percentageLimitCheck,
} from '../../../../../../../helpers/CommonHelpers'
import useUserEmploymentPackage, {
    USER_TYPE,
} from '../../../../../../../hooks/useUserEmploymentPackage'
import CustomDatePicker from '../../../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import {useSelector} from 'react-redux'
import {
    getCompanySettingSelector,
    getDepartmentWithPositionSelector,
} from '../../../../../../../redux/selectors/SettingsSelectors'
import CustomModal from '../../../../../../../customComponents/customModal/CustomModal'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'
import CustomCheckbox from '../../../../../../../customComponents/customCheckbox/CustomCheckbox'
import CustomButton from '../../../../../../../customComponents/customButtton/CustomButton'
import CustomToast from '../../../../../../../customComponents/customToast/CustomToast'

const ChangePositionModal = ({
    showChangePositionModal,
    onCloseChangePositionModal,
    userType,
    empData,
}) => {
    const [effectiveDate, setEffectiveDate] = useState(new Date())
    const companySetting = useSelector(getCompanySettingSelector)

    const {
        loading,
        redlineLoading,
        organizationLoading,
        overrideLoading,
        saveEmploymentPackage,
        employeeData,
        getPositionData,
        setEmployeeData,
        isStackModalEnabled,
        bothPositionData,
        userAssociatedOffices,
        firstPositionDetail,
        secondPositionDetail,
        selectedPrimaryOffice,
        parentPositionData,
    } = useUserEmploymentPackage({
        prefieldData: empData,
        id: empData?.id,
        userType: USER_TYPE.hiredEmployee,
        callOnLoadApi: false,
    })

    const updateEmployeeData = useCallback(
        (field, value) => {
            setEmployeeData((val) => ({
                ...val,
                [field]: value,
            }))
        },
        [setEmployeeData]
    )

    const updateMultipleKeysOfEmployeeData = useCallback(
        (data) => {
            setEmployeeData(data)
        },
        [setEmployeeData]
    )

    const departmentWithPositionList = useSelector(getDepartmentWithPositionSelector)

    const departmentList = useMemo(() => {
        return departmentWithPositionList?.filter((item) => item?.position?.length > 0)
    }, [departmentWithPositionList])

    const positionList = useMemo(
        () => departmentList?.find((item) => item?.id == employeeData?.department_id)?.position,
        [departmentList, employeeData?.department_id]
    )

    const onChangeCompensationData = (index, e) => {
        const data = [...employeeData?.employee_compensation]
        data[index][e?.target?.name] = e?.target?.value
        updateEmployeeData(HIRE_FIELD_KEYS.employee_compensation, data)
    }

    useEffect(() => {
        if (employeeData?.employee_compensation) {
            let employeeCompensationData = _.cloneDeep(employeeData?.employee_compensation)
            employeeCompensationData[0].commission_effective_date = effectiveDate
            employeeCompensationData[0].upfront_effective_date = effectiveDate
            employeeCompensationData[0].redline_effective_date = effectiveDate
            employeeCompensationData[0].withheld_effective_date = effectiveDate
            employeeCompensationData[1].commission_effective_date = effectiveDate
            employeeCompensationData[1].upfront_effective_date = effectiveDate
            employeeCompensationData[1].redline_effective_date = effectiveDate
            employeeCompensationData[1].withheld_effective_date = effectiveDate
            updateMultipleKeysOfEmployeeData({
                ...employeeData,
                [HIRE_FIELD_KEYS.employee_compensation]: employeeCompensationData,
                [HIRE_FIELD_KEYS.override_effective_date]: effectiveDate,
            })
        }
    }, [effectiveDate])

    const onUpdatePositionPress = useCallback(() => {
        saveEmploymentPackage.organisationValidation(null, true).then(() => {
            saveEmploymentPackage.commissionAndRedlineValidation(true).then(() => {
                saveEmploymentPackage.overrideValidation(true).then(() => {
                    // Final Store
                    saveEmploymentPackage
                        .organisationValidation(null)
                        .then(() => {
                            saveEmploymentPackage
                                .commissionAndRedlineValidation()
                                .then(() => {
                                    saveEmploymentPackage
                                        .overrideValidation()
                                        .then(() => {
                                            onCloseChangePositionModal()
                                        })
                                        .catch((e) => {
                                            CustomToast.error(
                                                `Error While Store Overrides: ${getErrorMessageFromResponse(
                                                    e
                                                )}`
                                            )
                                        })
                                })
                                .catch((e) => {
                                    CustomToast.error(
                                        `Error While Store Compemsation Plan: ${getErrorMessageFromResponse(
                                            e
                                        )}`
                                    )
                                })
                        })
                        .catch((e) => {
                            CustomToast.error(
                                `Error While Store Position: ${getErrorMessageFromResponse(e)}`
                            )
                        })
                })
            })
        })
    }, [onCloseChangePositionModal, saveEmploymentPackage])

    const onChangeInputData = (e) => {
        updateEmployeeData(e?.target?.name, e?.target?.value)
    }

    const onChangeInputDataWithLimit = (e) => {
        if (percentageLimitCheck(100, e.target.value)) onChangeInputData(e)
    }

    const onChangeOverridesType = (e, override) => {
        updateEmployeeData(override, null)
        onChangeInputData(e)
    }

    const isOverrideTypeIsPercent = useCallback((val) => {
        return val == 'percent'
    }, [])

    const updateAdditionalOfficeOverrideData = (additionalOfficeIndex, key, value) => {
        const data = _.cloneDeep(employeeData?.additional_locations)
        data[additionalOfficeIndex][key] = value
        updateEmployeeData(HIRE_FIELD_KEYS.additional_locations, data)
    }
    const updateAdditionalOfficeOverrideType = (additionalOfficeIndex, key, value) => {
        const data = _.cloneDeep(employeeData?.additional_locations)
        data[additionalOfficeIndex][key] = value
        data[additionalOfficeIndex]['overrides_amount'] = null
        updateEmployeeData(HIRE_FIELD_KEYS.additional_locations, data)
    }

    return (
        <CustomModal
            show={showChangePositionModal}
            onHide={onCloseChangePositionModal}
            title={'Change Position'}
        >
            <CustomLoader
                full
                visible={loading || redlineLoading || organizationLoading || overrideLoading}
            />
            <div
                className='mb-sm-15 p-5'
                style={{fontSize: '14px'}}
                data-kt-stepper-element='content'
            >
                <div className='w-sm-75 mx-auto w-100'>
                    {/* Organisation */}
                    <div className='mt-4 '>
                        <div className='row -align-items-center'>
                            <div className='col-sm text-cmGrey700'>
                                <div className=''>
                                    <CustomDropdown
                                        label={'Department'}
                                        required
                                        options={departmentList}
                                        placeholder='Select Department'
                                        name={HIRE_FIELD_KEYS.department_id}
                                        value={employeeData.department_id ?? ''}
                                        valueKey='id'
                                        onChange={(e) => {
                                            updateMultipleKeysOfEmployeeData({
                                                ...employeeData,
                                                [HIRE_FIELD_KEYS.position_id]: null,
                                                [HIRE_FIELD_KEYS.sub_position_id]: null,
                                                [HIRE_FIELD_KEYS.department_id]: e?.target?.value,
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='col-sm text-cmGrey700'>
                                <div className=''>
                                    <CustomDropdown
                                        label={'Position'}
                                        required
                                        options={positionList}
                                        placeholder='Select Position'
                                        valueKey='id'
                                        onChange={(e) => {
                                            getPositionData(e?.target?.value, false, true)
                                        }}
                                        name={HIRE_FIELD_KEYS.sub_position_id}
                                        value={employeeData.sub_position_id ?? ''}
                                        displayKey='position_name'
                                    />
                                    <div className='mt-5 d-flex align-itmes-center gap-3 mt-5'>
                                        <CustomCheckbox
                                            checked={
                                                getBooleanValue(employeeData?.self_gen_accounts) ==
                                                1
                                                    ? true
                                                    : false
                                            }
                                            onChange={(e) => {
                                                const val =
                                                    getBooleanValue(
                                                        employeeData?.self_gen_accounts
                                                    ) == 1
                                                        ? 0
                                                        : 1
                                                if (val) {
                                                    getPositionData(
                                                        MAIN_POSITTIONS_ID.closer ==
                                                            parentPositionData?.id
                                                            ? MAIN_POSITTIONS_ID.setter
                                                            : MAIN_POSITTIONS_ID.closer,
                                                        true,
                                                        true
                                                    )
                                                } else {
                                                    updateEmployeeData(
                                                        HIRE_FIELD_KEYS.self_gen_accounts,
                                                        val
                                                    )
                                                }
                                            }}
                                        />

                                        <span
                                            className='text-cmGrey700 text-wrap'
                                            style={{fontWeight: 600}}
                                        >
                                            May act as both setter and closer
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Effective Date */}
                    <div className='mt-4 '>
                        <div className='row -align-items-center'>
                            <div className='col-sm text-cmGrey700'>
                                <div className=''>
                                    <CustomDatePicker
                                        label={`Effective date for whole compensation plan`}
                                        required
                                        onChange={(e) => setEffectiveDate(e?.target?.value)}
                                        value={effectiveDate}
                                        placeholder='Effective date for whole compensation plan'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Compensation Plan */}
                    {(employeeData?.self_gen_accounts ? [0, 1] : [0])?.map((positionIndex) => {
                        const positionDetail =
                            positionIndex == 0 ? firstPositionDetail : secondPositionDetail
                        const positionName =
                            bothPositionData?.[
                                positionIndex == 0 ? 'firstPosition' : 'secondPosition'
                            ]?.name
                        return (
                            <div className='w-100 pt-5'>
                                {positionIndex == 0 ? (
                                    <span style={{fontWeight: 600, textDecoration: 'underline'}}>
                                        Primary Position:{' '}
                                        <span style={{fontWeight: 400}}>{positionName}</span>
                                    </span>
                                ) : null}
                                {positionIndex == 1 && <hr className='text-black my-5' />}
                                <div className='w-100'>
                                    <div className='container mt-5'>
                                        <div className='row'>
                                            <div className='col'>
                                                <CustomInput
                                                    label={`${positionName} Commission`}
                                                    required
                                                    suffixText='%'
                                                    disabled={
                                                        userType == USER_TYPE.onboardEmployee &&
                                                        positionDetail?.commission_parentag_hiring_locked
                                                    }
                                                    name={HIRE_FIELD_KEYS.commission}
                                                    onChange={(e) => {
                                                        if (
                                                            percentageLimitCheck(
                                                                100,
                                                                e.target.value
                                                            )
                                                        )
                                                            onChangeCompensationData(
                                                                positionIndex,
                                                                e
                                                            )
                                                    }}
                                                    value={
                                                        employeeData?.employee_compensation?.[
                                                            positionIndex
                                                        ]?.commission
                                                    }
                                                    placeholder='Comission'
                                                />
                                                <LockedView
                                                    visible={
                                                        userType == USER_TYPE.onboardEmployee &&
                                                        positionDetail?.commission_parentag_hiring_locked
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='container mt-5'>
                                        <div className='d-flex flex-wrap g-2'>
                                            <div
                                                className='col text-cmGrey700'
                                                style={{
                                                    fontFamily: 'Manrope',
                                                    fontSize: '14px',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <label className='d-flex  flex-wrap'>
                                                    <CustomDropdown
                                                        label={`${positionName} Redline Type`}
                                                        required
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
                                                        name={HIRE_FIELD_KEYS.redline_amount_type}
                                                        onChange={(e) =>
                                                            onChangeCompensationData(
                                                                positionIndex,
                                                                e
                                                            )
                                                        }
                                                        value={
                                                            employeeData?.employee_compensation?.[
                                                                positionIndex
                                                            ]?.redline_amount_type
                                                        }
                                                        searching={false}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='container mt-5'>
                                        <div className='d-flex flex-wrap'>
                                            <div
                                                className='col text-cmGrey700'
                                                style={{
                                                    fontFamily: 'Manrope',
                                                    fontSize: '14px',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <div className='row align-items-end mb-5 gap-md-0'>
                                                    <div className='col-md'>
                                                        <CustomInput
                                                            label={`${positionName}${
                                                                isStackModalEnabled &&
                                                                positionIndex == 0 &&
                                                                positionName == 'Closer'
                                                                    ? ' and Stack'
                                                                    : ''
                                                            } Redline`}
                                                            required
                                                            prefixText='$'
                                                            type={INPUT_TYPE.number}
                                                            name={HIRE_FIELD_KEYS.redline}
                                                            onChange={(e) =>
                                                                onChangeCompensationData(
                                                                    positionIndex,
                                                                    e
                                                                )
                                                            }
                                                            value={
                                                                employeeData
                                                                    ?.employee_compensation?.[
                                                                    positionIndex
                                                                ]?.redline
                                                            }
                                                        />
                                                    </div>
                                                    <div className='mt-5 col-md-5'>
                                                        <CustomDropdown
                                                            // label={`${positionName} Redline Amount Type`}
                                                            name={HIRE_FIELD_KEYS.redline_type}
                                                            onChange={(e) =>
                                                                onChangeCompensationData(
                                                                    positionIndex,
                                                                    e
                                                                )
                                                            }
                                                            value={
                                                                employeeData
                                                                    ?.employee_compensation?.[
                                                                    positionIndex
                                                                ]?.redline_type
                                                            }
                                                            options={UNIT_TYPE2}
                                                            placeholder={`${positionName} Redline Amount Type`}
                                                            searching={false}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {positionDetail?.upfront_status ? (
                                        <div className='container mt-10'>
                                            <div className=''>
                                                <div
                                                    className='text-cmGrey700'
                                                    style={{
                                                        fontFamily: 'Manrope',
                                                        fontSize: '14px',
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <div className='row gap-md-0'>
                                                        <div className='col-md'>
                                                            <CustomInput
                                                                required
                                                                label={`${positionName} Upfront Pay 
                                                                                                                      `}
                                                                prefixText={'$'}
                                                                type={INPUT_TYPE.number}
                                                                disabled={
                                                                    userType ==
                                                                        USER_TYPE.onboardEmployee &&
                                                                    positionDetail?.upfront_ammount_locked
                                                                }
                                                                name={
                                                                    HIRE_FIELD_KEYS.upfront_pay_amount
                                                                }
                                                                onChange={(e) =>
                                                                    onChangeCompensationData(
                                                                        positionIndex,
                                                                        e
                                                                    )
                                                                }
                                                                value={
                                                                    employeeData
                                                                        ?.employee_compensation?.[
                                                                        positionIndex
                                                                    ]?.upfront_pay_amount
                                                                }
                                                                placeholder='0'
                                                            />
                                                            <LockedView
                                                                visible={
                                                                    userType ==
                                                                        USER_TYPE.onboardEmployee &&
                                                                    positionDetail?.upfront_ammount_locked
                                                                }
                                                            />
                                                        </div>

                                                        <div className='col-md-5'>
                                                            <CustomDropdown
                                                                label='Type'
                                                                hideLabel
                                                                name={
                                                                    HIRE_FIELD_KEYS.upfront_sale_type
                                                                }
                                                                onChange={(e) =>
                                                                    onChangeCompensationData(
                                                                        positionIndex,
                                                                        e
                                                                    )
                                                                }
                                                                value={
                                                                    employeeData
                                                                        ?.employee_compensation?.[
                                                                        positionIndex
                                                                    ]?.upfront_sale_type
                                                                }
                                                                disabled={
                                                                    userType ==
                                                                        USER_TYPE.onboardEmployee &&
                                                                    positionDetail?.calculated_locked
                                                                }
                                                                options={UNIT_TYPE1}
                                                                placeholder='Select unit'
                                                            />
                                                            <LockedView
                                                                visible={
                                                                    userType ==
                                                                        USER_TYPE.onboardEmployee &&
                                                                    positionDetail?.calculated_locked
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}

                                    {positionDetail?.reconciliation_status &&
                                    companySetting?.reconciliation ? (
                                        <div className='container mt-10'>
                                            <div
                                                className=' text-cmGrey700'
                                                style={{
                                                    fontFamily: 'Manrope',
                                                    fontSize: '14px',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <div className='row gap-md-0'>
                                                    <div className='col-md'>
                                                        <CustomInput
                                                            disabled={
                                                                userType ==
                                                                    USER_TYPE.onboardEmployee &&
                                                                positionDetail?.commission_withheld_locked
                                                            }
                                                            required
                                                            label={`${positionName} withheld amount`}
                                                            prefixText={'$'}
                                                            type={INPUT_TYPE.number}
                                                            name={HIRE_FIELD_KEYS.withheld_amount}
                                                            onChange={(e) =>
                                                                onChangeCompensationData(
                                                                    positionIndex,
                                                                    e
                                                                )
                                                            }
                                                            value={
                                                                employeeData
                                                                    ?.employee_compensation?.[
                                                                    positionIndex
                                                                ]?.withheld_amount
                                                            }
                                                            placeholder='0'
                                                        />
                                                        <LockedView
                                                            visible={
                                                                userType ==
                                                                    USER_TYPE.onboardEmployee &&
                                                                positionDetail?.commission_withheld_locked
                                                            }
                                                        />
                                                    </div>

                                                    <div className='col-md-5'>
                                                        <CustomDropdown
                                                            label='Type'
                                                            hideLabel
                                                            disabled={
                                                                userType ==
                                                                    USER_TYPE.onboardEmployee &&
                                                                positionDetail?.commission_type_locked
                                                            }
                                                            name={HIRE_FIELD_KEYS.withheld_type}
                                                            onChange={(e) =>
                                                                onChangeCompensationData(
                                                                    positionIndex,
                                                                    e
                                                                )
                                                            }
                                                            value={
                                                                employeeData
                                                                    ?.employee_compensation?.[
                                                                    positionIndex
                                                                ]?.withheld_type
                                                            }
                                                            options={UNIT_TYPE1}
                                                            placeholder='Select unit'
                                                        />
                                                        <LockedView
                                                            visible={
                                                                userType ==
                                                                    USER_TYPE.onboardEmployee &&
                                                                positionDetail?.commission_type_locked
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        )
                    })}

                    {/* Overrides */}
                    <div className=''>
                        <div className='d-flex w-100 align-items-center justify-content-center my-10'>
                            <hr className='w-40' />
                            <span className='mx-5' style={{fontWeight: 'bold'}}>
                                Overrides
                            </span>
                            <hr className='w-40' />
                        </div>
                        {firstPositionDetail?.override?.[0]?.status ||
                        firstPositionDetail?.override?.[1]?.status ||
                        firstPositionDetail?.override?.[2]?.status ||
                        (isStackModalEnabled && firstPositionDetail?.override?.[3]?.status) ? (
                            <>
                                {/* Direct Overrides */}
                                {firstPositionDetail?.override?.[0]?.status ? (
                                    <div className='container mb-5' style={{}}>
                                        <div className='row text-cmGrey700'>
                                            <div className='row align-items-end'>
                                                <div className='col-sm'>
                                                    <div>
                                                        <CustomInput
                                                            label={'Direct Overrides'}
                                                            prefixText={
                                                                isOverrideTypeIsPercent(
                                                                    employeeData.direct_overrides_type
                                                                )
                                                                    ? ''
                                                                    : '$'
                                                            }
                                                            suffixText={
                                                                isOverrideTypeIsPercent(
                                                                    employeeData.direct_overrides_type
                                                                )
                                                                    ? '%'
                                                                    : ''
                                                            }
                                                            type={INPUT_TYPE.number}
                                                            disabled={
                                                                userType ==
                                                                    USER_TYPE.onboardEmployee &&
                                                                firstPositionDetail?.override?.[0]
                                                                    ?.override_ammount_locked
                                                            }
                                                            onChange={
                                                                isOverrideTypeIsPercent(
                                                                    employeeData.direct_overrides_type
                                                                )
                                                                    ? onChangeInputDataWithLimit
                                                                    : onChangeInputData
                                                            }
                                                            name={
                                                                HIRE_FIELD_KEYS.direct_overrides_amount
                                                            }
                                                            value={
                                                                employeeData.direct_overrides_amount
                                                            }
                                                            placeholder='50'
                                                        />
                                                    </div>
                                                    <LockedView
                                                        visible={
                                                            userType == USER_TYPE.onboardEmployee &&
                                                            firstPositionDetail?.override?.[0]
                                                                ?.override_ammount_locked
                                                        }
                                                    />
                                                </div>
                                                <div className='col-sm'>
                                                    <label className=''>
                                                        <CustomDropdown
                                                            disabled={
                                                                userType ==
                                                                    USER_TYPE.onboardEmployee &&
                                                                firstPositionDetail?.override?.[0]
                                                                    ?.override_type_locked
                                                            }
                                                            onChange={(e) =>
                                                                onChangeOverridesType(
                                                                    e,
                                                                    HIRE_FIELD_KEYS.direct_overrides_amount
                                                                )
                                                            }
                                                            name={
                                                                HIRE_FIELD_KEYS.direct_overrides_type
                                                            }
                                                            value={
                                                                employeeData.direct_overrides_type ??
                                                                ''
                                                            }
                                                            options={OVERRIDE_TYPE}
                                                            searching={false}
                                                        />
                                                    </label>
                                                    <LockedView
                                                        visible={
                                                            userType == USER_TYPE.onboardEmployee &&
                                                            firstPositionDetail?.override?.[0]
                                                                ?.override_type_locked
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <p></p>
                                )}

                                {/* Indirect Overrides */}
                                {firstPositionDetail?.override?.[1]?.status ? (
                                    <div className='container mb-5' style={{}}>
                                        <div className='row text-cmGrey700'>
                                            <div className='row align-items-end'>
                                                <div className='col-sm'>
                                                    <div className=''>
                                                        <CustomInput
                                                            label={'Indirect Overrides'}
                                                            prefixText={
                                                                isOverrideTypeIsPercent(
                                                                    employeeData.indirect_overrides_type
                                                                )
                                                                    ? ''
                                                                    : '$'
                                                            }
                                                            suffixText={
                                                                isOverrideTypeIsPercent(
                                                                    employeeData.indirect_overrides_type
                                                                )
                                                                    ? '%'
                                                                    : ''
                                                            }
                                                            type={INPUT_TYPE.number}
                                                            disabled={
                                                                userType ==
                                                                    USER_TYPE.onboardEmployee &&
                                                                firstPositionDetail?.override?.[1]
                                                                    ?.override_ammount_locked
                                                            }
                                                            onChange={
                                                                isOverrideTypeIsPercent(
                                                                    employeeData.indirect_overrides_type
                                                                )
                                                                    ? onChangeInputDataWithLimit
                                                                    : onChangeInputData
                                                            }
                                                            name={
                                                                HIRE_FIELD_KEYS.indirect_overrides_amount
                                                            }
                                                            value={
                                                                employeeData.indirect_overrides_amount
                                                            }
                                                            placeholder='50'
                                                        />
                                                    </div>
                                                    <LockedView
                                                        visible={
                                                            userType == USER_TYPE.onboardEmployee &&
                                                            firstPositionDetail?.override?.[1]
                                                                ?.override_ammount_locked
                                                        }
                                                    />
                                                </div>
                                                <div className='col-sm '>
                                                    <label>
                                                        <CustomDropdown
                                                            placeholder='Select unit'
                                                            disabled={
                                                                userType ==
                                                                    USER_TYPE.onboardEmployee &&
                                                                firstPositionDetail?.override?.[1]
                                                                    ?.override_type_locked
                                                            }
                                                            onChange={(e) =>
                                                                onChangeOverridesType(
                                                                    e,
                                                                    HIRE_FIELD_KEYS.indirect_overrides_amount
                                                                )
                                                            }
                                                            name={
                                                                HIRE_FIELD_KEYS.indirect_overrides_type
                                                            }
                                                            value={
                                                                employeeData.indirect_overrides_type ??
                                                                ''
                                                            }
                                                            options={OVERRIDE_TYPE}
                                                            searching={false}
                                                        />
                                                    </label>
                                                    <LockedView
                                                        visible={
                                                            userType == USER_TYPE.onboardEmployee &&
                                                            firstPositionDetail?.override?.[1]
                                                                ?.override_type_locked
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}

                                {/* Office Overrides */}
                                {firstPositionDetail?.override?.[2]?.status ? (
                                    <>
                                        <span
                                            style={{fontWeight: 600}}
                                            className='text-cmGrey700 mt-5'
                                        >
                                            Office Overrides:
                                        </span>
                                        <div className='container' style={{}}>
                                            <div className='row text-cmGrey700'>
                                                <div className=' row align-items-end'>
                                                    <div className='col-sm'>
                                                        <div>
                                                            <CustomInput
                                                                label={`↳ Office: ${selectedPrimaryOffice?.office_name}, ${selectedPrimaryOffice?.state_name}`}
                                                                prefixText={
                                                                    isOverrideTypeIsPercent(
                                                                        employeeData.office_overrides_type
                                                                    )
                                                                        ? ''
                                                                        : '$'
                                                                }
                                                                suffixText={
                                                                    isOverrideTypeIsPercent(
                                                                        employeeData.office_overrides_type
                                                                    )
                                                                        ? '%'
                                                                        : ''
                                                                }
                                                                disabled={
                                                                    userType ==
                                                                        USER_TYPE.onboardEmployee &&
                                                                    firstPositionDetail
                                                                        ?.override?.[2]
                                                                        ?.override_ammount_locked
                                                                }
                                                                type={INPUT_TYPE.number}
                                                                onChange={
                                                                    isOverrideTypeIsPercent(
                                                                        employeeData.office_overrides_type
                                                                    )
                                                                        ? onChangeInputDataWithLimit
                                                                        : onChangeInputData
                                                                }
                                                                name={
                                                                    HIRE_FIELD_KEYS.office_overrides_amount
                                                                }
                                                                value={
                                                                    employeeData.office_overrides_amount
                                                                }
                                                                placeholder='50'
                                                            />
                                                        </div>
                                                        <LockedView
                                                            visible={
                                                                userType ==
                                                                    USER_TYPE.onboardEmployee &&
                                                                firstPositionDetail?.override?.[2]
                                                                    ?.override_ammount_locked
                                                            }
                                                        />
                                                    </div>
                                                    <div className='col-sm'>
                                                        <label className=''>
                                                            <CustomDropdown
                                                                disabled={
                                                                    userType ==
                                                                        USER_TYPE.onboardEmployee &&
                                                                    firstPositionDetail
                                                                        ?.override?.[2]
                                                                        ?.override_type_locked
                                                                }
                                                                searching={false}
                                                                onChange={(e) =>
                                                                    onChangeOverridesType(
                                                                        e,
                                                                        HIRE_FIELD_KEYS.office_overrides_amount
                                                                    )
                                                                }
                                                                name={
                                                                    HIRE_FIELD_KEYS.office_overrides_type
                                                                }
                                                                value={
                                                                    employeeData.office_overrides_type ??
                                                                    ''
                                                                }
                                                                options={OVERRIDE_TYPE}
                                                            />
                                                        </label>

                                                        <LockedView
                                                            visible={
                                                                userType ==
                                                                    USER_TYPE.onboardEmployee &&
                                                                firstPositionDetail?.override?.[2]
                                                                    ?.override_type_locked
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {SHOW_BASED_ON_HOST.additionalOfficeOverrides &&
                                        userAssociatedOffices?.length > 0 &&
                                        firstPositionDetail?.override?.[2]?.status ? (
                                            <>
                                                {userAssociatedOffices?.map(
                                                    (officeItem, officeIndex) => (
                                                        <div className='container mb-5' style={{}}>
                                                            <div className='row text-cmGrey700'>
                                                                <div className=' row align-items-end'>
                                                                    <div className='col-sm'>
                                                                        <div>
                                                                            <CustomInput
                                                                                label={`↳ Office: ${officeItem?.office_name}, ${officeItem?.state_name}`}
                                                                                prefixText={
                                                                                    isOverrideTypeIsPercent(
                                                                                        officeItem.overrides_type
                                                                                    )
                                                                                        ? ''
                                                                                        : '$'
                                                                                }
                                                                                suffixText={
                                                                                    isOverrideTypeIsPercent(
                                                                                        officeItem.overrides_type
                                                                                    )
                                                                                        ? '%'
                                                                                        : ''
                                                                                }
                                                                                type={
                                                                                    INPUT_TYPE.number
                                                                                }
                                                                                onChange={(e) => {
                                                                                    if (
                                                                                        officeItem?.overrides_type ==
                                                                                        'percent'
                                                                                    ) {
                                                                                        if (
                                                                                            percentageLimitCheck(
                                                                                                100,
                                                                                                e
                                                                                                    .target
                                                                                                    .value
                                                                                            )
                                                                                        ) {
                                                                                            updateAdditionalOfficeOverrideData(
                                                                                                officeIndex,
                                                                                                'overrides_amount',
                                                                                                e
                                                                                                    ?.target
                                                                                                    ?.value
                                                                                            )
                                                                                        }
                                                                                    } else {
                                                                                        updateAdditionalOfficeOverrideData(
                                                                                            officeIndex,
                                                                                            'overrides_amount',
                                                                                            e
                                                                                                ?.target
                                                                                                ?.value
                                                                                        )
                                                                                    }
                                                                                }}
                                                                                value={
                                                                                    officeItem?.overrides_amount
                                                                                }
                                                                                placeholder='50'
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-sm'>
                                                                        <label className=''>
                                                                            <CustomDropdown
                                                                                searching={false}
                                                                                value={
                                                                                    officeItem?.overrides_type
                                                                                }
                                                                                onChange={(e) => {
                                                                                    updateAdditionalOfficeOverrideType(
                                                                                        officeIndex,
                                                                                        'overrides_type',
                                                                                        e?.target
                                                                                            ?.value
                                                                                    )
                                                                                }}
                                                                                options={
                                                                                    OVERRIDE_TYPE
                                                                                }
                                                                            />
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </>
                                        ) : null}
                                    </>
                                ) : (
                                    <></>
                                )}

                                {/* Stack Office Overrides */}
                                {isStackModalEnabled &&
                                firstPositionDetail?.override?.[3]?.status ? (
                                    <div className='container' style={{}}>
                                        <div className='row text-cmGrey700'>
                                            <div className=' row align-items-end'>
                                                <div className='col-sm'>
                                                    <div>
                                                        <CustomInput
                                                            label={'Stack Split'}
                                                            suffixText={'%'}
                                                            disabled={
                                                                userType ==
                                                                    USER_TYPE.onboardEmployee &&
                                                                firstPositionDetail?.override?.[3]
                                                                    ?.override_ammount_locked
                                                            }
                                                            type={INPUT_TYPE.number}
                                                            onChange={(e) => {
                                                                if (
                                                                    percentageLimitCheck(
                                                                        100,
                                                                        e.target.value
                                                                    )
                                                                )
                                                                    onChangeInputData(e)
                                                            }}
                                                            name={
                                                                HIRE_FIELD_KEYS.office_stack_overrides_amount
                                                            }
                                                            value={
                                                                employeeData.office_stack_overrides_amount
                                                            }
                                                            placeholder='50'
                                                        />
                                                    </div>
                                                    <LockedView
                                                        visible={
                                                            userType == USER_TYPE.onboardEmployee &&
                                                            firstPositionDetail?.override?.[3]
                                                                ?.override_ammount_locked
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </>
                        ) : null}
                    </div>
                </div>
                <div className='mt-5'>
                    <CustomButton
                        loading={redlineLoading || organizationLoading}
                        buttonLabel='Update Position'
                        onClick={onUpdatePositionPress}
                    />
                </div>
            </div>
        </CustomModal>
    )
}

export default memo(ChangePositionModal)
