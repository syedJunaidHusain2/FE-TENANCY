import {LockedView} from '../HireNew'
import {
    OVERRIDE_TYPE,
    UNIT_TYPE1,
    getValidDate,
    SHOW_BASED_ON_HOST,
} from '../../../../../../../constants/constants'
import {HIRE_FIELD_KEYS} from '../../../../../../../constants/constants'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomDropdown from '../../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {USER_TYPE} from '../../../../../../../hooks/useUserEmploymentPackage'
import CustomDatePicker from '../../../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import {getBooleanValue, percentageLimitCheck} from '../../../../../../../helpers/CommonHelpers'
import _ from 'lodash'

const UserOverridesContainer = ({
    firstPositionDetail,
    employeeData,
    updateEmployeeData,
    userType,
    isStackModalEnabled,
    userAssociatedOffices,
    selectedPrimaryOffice,
}) => {
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
        <div className='p-5' style={{fontSize: '14px'}} data-kt-stepper-element='content'>
            <div className='w-sm-75 mx-auto w-100'>
                {firstPositionDetail?.override?.[0]?.status ||
                firstPositionDetail?.override?.[1]?.status ||
                firstPositionDetail?.override?.[2]?.status ||
                (isStackModalEnabled && firstPositionDetail?.override?.[3]?.status) ? (
                    <>
                        {userType == USER_TYPE.hiredEmployee && (
                            <div className='mb-5'>
                                <CustomDatePicker
                                    label={'Effective Date'}
                                    onChange={onChangeInputData}
                                    name={HIRE_FIELD_KEYS.override_effective_date}
                                    value={employeeData.override_effective_date}
                                />
                            </div>
                        )}

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
                                                        employeeData.direct_overrides_type !=
                                                        'percent'
                                                            ? '$'
                                                            : ''
                                                    }
                                                    suffixText={
                                                        employeeData.direct_overrides_type ==
                                                        'percent'
                                                            ? '%'
                                                            : ''
                                                    }
                                                    type={INPUT_TYPE.number}
                                                    disabled={
                                                        userType == USER_TYPE.onboardEmployee &&
                                                        firstPositionDetail?.override?.[0]
                                                            ?.override_ammount_locked
                                                    }
                                                    onChange={
                                                        employeeData.direct_overrides_type ==
                                                        'percent'
                                                            ? onChangeInputDataWithLimit
                                                            : onChangeInputData
                                                    }
                                                    name={HIRE_FIELD_KEYS.direct_overrides_amount}
                                                    value={employeeData.direct_overrides_amount}
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
                                                        userType == USER_TYPE.onboardEmployee &&
                                                        firstPositionDetail?.override?.[0]
                                                            ?.override_type_locked
                                                    }
                                                    onChange={(e) =>
                                                        onChangeOverridesType(
                                                            e,
                                                            HIRE_FIELD_KEYS.direct_overrides_amount
                                                        )
                                                    }
                                                    name={HIRE_FIELD_KEYS.direct_overrides_type}
                                                    value={employeeData.direct_overrides_type ?? ''}
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
                                                        employeeData.indirect_overrides_type !=
                                                        'percent'
                                                            ? '$'
                                                            : ''
                                                    }
                                                    suffixText={
                                                        employeeData.indirect_overrides_type ==
                                                        'percent'
                                                            ? '%'
                                                            : ''
                                                    }
                                                    type={INPUT_TYPE.number}
                                                    disabled={
                                                        userType == USER_TYPE.onboardEmployee &&
                                                        firstPositionDetail?.override?.[1]
                                                            ?.override_ammount_locked
                                                    }
                                                    onChange={
                                                        employeeData.indirect_overrides_type ==
                                                        'percent'
                                                            ? onChangeInputDataWithLimit
                                                            : onChangeInputData
                                                    }
                                                    name={HIRE_FIELD_KEYS.indirect_overrides_amount}
                                                    value={employeeData.indirect_overrides_amount}
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
                                                        userType == USER_TYPE.onboardEmployee &&
                                                        firstPositionDetail?.override?.[1]
                                                            ?.override_type_locked
                                                    }
                                                    onChange={(e) =>
                                                        onChangeOverridesType(
                                                            e,
                                                            HIRE_FIELD_KEYS.indirect_overrides_amount
                                                        )
                                                    }
                                                    name={HIRE_FIELD_KEYS.indirect_overrides_type}
                                                    value={
                                                        employeeData.indirect_overrides_type ?? ''
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
                                <span style={{fontWeight: 600}} className='text-cmGrey700 mt-5'>
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
                                                            employeeData.office_overrides_type !=
                                                            'percent'
                                                                ? '$'
                                                                : ''
                                                        }
                                                        suffixText={
                                                            employeeData.office_overrides_type ==
                                                            'percent'
                                                                ? '%'
                                                                : ''
                                                        }
                                                        disabled={
                                                            userType == USER_TYPE.onboardEmployee &&
                                                            firstPositionDetail?.override?.[2]
                                                                ?.override_ammount_locked
                                                        }
                                                        type={INPUT_TYPE.number}
                                                        onChange={
                                                            employeeData.office_overrides_type ==
                                                            'percent'
                                                                ? onChangeInputDataWithLimit
                                                                : onChangeInputData
                                                        }
                                                        name={
                                                            HIRE_FIELD_KEYS.office_overrides_amount
                                                        }
                                                        value={employeeData.office_overrides_amount}
                                                        placeholder='50'
                                                    />
                                                </div>
                                                <LockedView
                                                    visible={
                                                        userType == USER_TYPE.onboardEmployee &&
                                                        firstPositionDetail?.override?.[2]
                                                            ?.override_ammount_locked
                                                    }
                                                />
                                            </div>
                                            <div className='col-sm'>
                                                <label className=''>
                                                    <CustomDropdown
                                                        disabled={
                                                            userType == USER_TYPE.onboardEmployee &&
                                                            firstPositionDetail?.override?.[2]
                                                                ?.override_type_locked
                                                        }
                                                        searching={false}
                                                        onChange={(e) =>
                                                            onChangeOverridesType(
                                                                e,
                                                                HIRE_FIELD_KEYS.office_overrides_amount
                                                            )
                                                        }
                                                        name={HIRE_FIELD_KEYS.office_overrides_type}
                                                        value={
                                                            employeeData.office_overrides_type ?? ''
                                                        }
                                                        options={OVERRIDE_TYPE}
                                                    />
                                                </label>

                                                <LockedView
                                                    visible={
                                                        userType == USER_TYPE.onboardEmployee &&
                                                        firstPositionDetail?.override?.[2]
                                                            ?.override_type_locked
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Override With Multiple Office */}
                                {SHOW_BASED_ON_HOST.additionalOfficeOverrides &&
                                getBooleanValue(employeeData?.is_manager) == 1 &&
                                userAssociatedOffices?.length > 0 &&
                                firstPositionDetail?.override?.[2]?.status ? (
                                    <>
                                        {userAssociatedOffices?.map((officeItem, officeIndex) => (
                                            <div className='container mb-5' style={{}}>
                                                <div className='row text-cmGrey700'>
                                                    <div className=' row align-items-end'>
                                                        <div className='col-sm'>
                                                            <div>
                                                                <CustomInput
                                                                    label={`↳ Office: ${officeItem?.office_name}, ${officeItem?.state_name}`}
                                                                    prefixText={
                                                                        officeItem?.overrides_type ==
                                                                        'percent'
                                                                            ? ''
                                                                            : '$'
                                                                    }
                                                                    suffixText={
                                                                        officeItem?.overrides_type ==
                                                                        'percent'
                                                                            ? '%'
                                                                            : ''
                                                                    }
                                                                    type={INPUT_TYPE.number}
                                                                    onChange={(e) => {
                                                                        if (
                                                                            officeItem?.overrides_type ==
                                                                            'percent'
                                                                        ) {
                                                                            if (
                                                                                percentageLimitCheck(
                                                                                    100,
                                                                                    e.target.value
                                                                                )
                                                                            ) {
                                                                                updateAdditionalOfficeOverrideData(
                                                                                    officeIndex,
                                                                                    'overrides_amount',
                                                                                    e?.target?.value
                                                                                )
                                                                            }
                                                                        } else {
                                                                            updateAdditionalOfficeOverrideData(
                                                                                officeIndex,
                                                                                'overrides_amount',
                                                                                e?.target?.value
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
                                                                            e?.target?.value
                                                                        )
                                                                        // updateAdditionalOfficeOverrideData(
                                                                        //     officeIndex,
                                                                        //     'overrides_type',
                                                                        //     e?.target?.value
                                                                        // )
                                                                    }}
                                                                    options={OVERRIDE_TYPE}
                                                                />
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                ) : null}
                            </>
                        ) : (
                            <></>
                        )}

                        {/* Stack Office Overrides */}
                        {isStackModalEnabled && firstPositionDetail?.override?.[3]?.status ? (
                            <div className='container' style={{}}>
                                <div className='row text-cmGrey700'>
                                    <div className=' row align-items-end'>
                                        <div className='col-sm'>
                                            <div>
                                                <CustomInput
                                                    label={'Stack Split'}
                                                    suffixText={'%'}
                                                    disabled={
                                                        userType == USER_TYPE.onboardEmployee &&
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
                ) : (
                    <div
                        className='text-cmGrey700 text-center mt-10'
                        style={{fontWeight: 600, fontSize: '14px'}}
                    >
                        No overrides found
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserOverridesContainer
