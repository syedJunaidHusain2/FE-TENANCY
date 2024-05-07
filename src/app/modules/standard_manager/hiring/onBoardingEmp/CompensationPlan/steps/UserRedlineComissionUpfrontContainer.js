import {UNIT_TYPE1, UNIT_TYPE2} from '../../../../../../../constants/constants'
import {LockedView} from '../HireNew'
import {HIRE_FIELD_KEYS} from '../../../../../../../constants/constants'
import {memo, useCallback, useState} from 'react'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomDropdown from '../../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {percentageLimitCheck} from '../../../../../../../helpers/CommonHelpers'
import EditUserRedlineModel from './EditUserRedlineModel'
import {USER_TYPE} from '../../../../../../../hooks/useUserEmploymentPackage'
import CustomDatePicker from '../../../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import {useSelector} from 'react-redux'
import {getCompanySettingSelector} from '../../../../../../../redux/selectors/SettingsSelectors'

const UserRedlineComissionUpfrontContainer = ({
    firstPositionDetail,
    secondPositionDetail,
    userType,
    employeeData,
    updateEmployeeData,
    isStackModalEnabled,
    bothPositionData,
}) => {
    const [editRedline, setEditRedline] = useState(false)
    const [editSelfGenRedline, setEditSelfGenRedline] = useState(false)
    const companySetting = useSelector(getCompanySettingSelector)

    const closeRedlinePopup = () => {
        setEditRedline(false)
        setEditSelfGenRedline(false)
    }

    const onSaveOtherRedlinePress = useCallback(
        (key, redlineData) => {
            closeRedlinePopup()
            updateEmployeeData(key, redlineData)
        },
        [updateEmployeeData]
    )

    const onChangeCompensationData = (index, e) => {
        const data = [...employeeData?.employee_compensation]
        data[index][e?.target?.name] = e?.target?.value
        updateEmployeeData(HIRE_FIELD_KEYS.employee_compensation, data)
    }

    const onChangeInputData = (e) => {
        updateEmployeeData(e?.target?.name, e?.target?.value)
    }

    return (
        <div className='mb-sm-15 p-5' style={{fontSize: '14px'}} data-kt-stepper-element='content'>
            <div className='w-sm-75 mx-auto w-100'>
                {/* First Position */}
                {(employeeData?.self_gen_accounts ? [0, 1] : [0])?.map((positionIndex) => {
                    const positionDetail =
                        positionIndex == 0 ? firstPositionDetail : secondPositionDetail
                    const positionName =
                        bothPositionData?.[positionIndex == 0 ? 'firstPosition' : 'secondPosition']
                            ?.name
                    return (
                        <div className='w-100 pt-5'>
                            {positionIndex == 0 ? (
                                <span style={{fontWeight: 600, textDecoration: 'underline'}}>
                                    Primary Position:{' '}
                                    <span style={{fontWeight: 400}}>{positionName}</span>
                                </span>
                            ) : null}
                            {positionIndex == 1 && (
                                <hr className='my-5' style={{color: 'black', opacity: 1}} />
                            )}
                            <div className='w-100'>
                                <div className='container mt-5'>
                                    <div className='row'>
                                        <div className='col'>
                                            <CustomInput
                                                label={`${positionName} Commission ${
                                                    userType == USER_TYPE.hiredEmployee
                                                        ? 'with Effective Date'
                                                        : ''
                                                }`}
                                                required
                                                suffixText='%'
                                                disabled={
                                                    userType == USER_TYPE.onboardEmployee &&
                                                    positionDetail?.commission_parentag_hiring_locked
                                                }
                                                name={HIRE_FIELD_KEYS.commission}
                                                onChange={(e) => {
                                                    if (percentageLimitCheck(100, e.target.value))
                                                        onChangeCompensationData(positionIndex, e)
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

                                        {userType == USER_TYPE.hiredEmployee && (
                                            <div className='col'>
                                                <CustomDatePicker
                                                    hideLabel
                                                    label={`${positionName} Comission with Effective Date`}
                                                    required
                                                    name={HIRE_FIELD_KEYS.commission_effective_date}
                                                    onChange={(e) =>
                                                        onChangeCompensationData(positionIndex, e)
                                                    }
                                                    value={
                                                        employeeData?.employee_compensation?.[
                                                            positionIndex
                                                        ]?.commission_effective_date
                                                    }
                                                    placeholder='Comission Effective Date'
                                                />
                                            </div>
                                        )}
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
                                                        onChangeCompensationData(positionIndex, e)
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
                                                            employeeData?.employee_compensation?.[
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
                                                            employeeData?.employee_compensation?.[
                                                                positionIndex
                                                            ]?.redline_type
                                                        }
                                                        options={UNIT_TYPE2}
                                                        placeholder={`${positionName} Redline Amount Type`}
                                                        searching={false}
                                                    />
                                                </div>
                                            </div>

                                            {userType == USER_TYPE.hiredEmployee && (
                                                <div className=''>
                                                    <CustomDatePicker
                                                        // hideLabel
                                                        label={`${positionName} Redline Effective Date`}
                                                        required
                                                        name={
                                                            HIRE_FIELD_KEYS.redline_effective_date
                                                        }
                                                        onChange={(e) =>
                                                            onChangeCompensationData(
                                                                positionIndex,
                                                                e
                                                            )
                                                        }
                                                        value={
                                                            employeeData?.employee_compensation?.[
                                                                positionIndex
                                                            ]?.redline_effective_date
                                                        }
                                                        placeholder='Redline Effective Date'
                                                    />
                                                </div>
                                            )}
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
                                                            name={HIRE_FIELD_KEYS.upfront_sale_type}
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

                                                {userType == USER_TYPE.hiredEmployee && (
                                                    <div className=''>
                                                        <CustomDatePicker
                                                            label={`${positionName} Upfront Pay 
                                                            ${
                                                                userType == USER_TYPE.hiredEmployee
                                                                    ? 'Effective Date'
                                                                    : ''
                                                            }
                                                            `}
                                                            required
                                                            name={
                                                                HIRE_FIELD_KEYS.upfront_effective_date
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
                                                                ]?.upfront_effective_date
                                                            }
                                                            placeholder='Upfront Pay Effective Date'
                                                        />
                                                    </div>
                                                )}
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
                                                            userType == USER_TYPE.onboardEmployee &&
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
                                                            employeeData?.employee_compensation?.[
                                                                positionIndex
                                                            ]?.withheld_amount
                                                        }
                                                        placeholder='0'
                                                    />
                                                    <LockedView
                                                        visible={
                                                            userType == USER_TYPE.onboardEmployee &&
                                                            positionDetail?.commission_withheld_locked
                                                        }
                                                    />
                                                </div>

                                                <div className='col-md-5'>
                                                    <CustomDropdown
                                                        label='Type'
                                                        hideLabel
                                                        disabled={
                                                            userType == USER_TYPE.onboardEmployee &&
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
                                                            employeeData?.employee_compensation?.[
                                                                positionIndex
                                                            ]?.withheld_type
                                                        }
                                                        options={UNIT_TYPE1}
                                                        placeholder='Select unit'
                                                    />
                                                    <LockedView
                                                        visible={
                                                            userType == USER_TYPE.onboardEmployee &&
                                                            positionDetail?.commission_type_locked
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            {userType == USER_TYPE.hiredEmployee && (
                                                <div className=''>
                                                    <CustomDatePicker
                                                        label={`${positionName} withheld ${
                                                            userType == USER_TYPE.hiredEmployee
                                                                ? 'Effective Date'
                                                                : ''
                                                        }`}
                                                        required
                                                        name={
                                                            HIRE_FIELD_KEYS.withheld_effective_date
                                                        }
                                                        onChange={(e) =>
                                                            onChangeCompensationData(
                                                                positionIndex,
                                                                e
                                                            )
                                                        }
                                                        value={
                                                            employeeData?.employee_compensation?.[
                                                                positionIndex
                                                            ]?.withheld_effective_date
                                                        }
                                                        placeholder='Withheld amount Effective Date'
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    )
                })}
                {/* Self-Gen Commission */}
                {/* {employeeData?.self_gen_accounts ? (
                    <div className='container mt-5'>
                        <div className='row'>
                            <div className='col'>
                                <CustomInput
                                    label={`Self-Gen Commission${
                                        userType == USER_TYPE.hiredEmployee
                                            ? 'with Effective Date'
                                            : ''
                                    }`}
                                    required
                                    suffixText='%'
                                    name={HIRE_FIELD_KEYS.commission_selfgen}
                                    onChange={(e) => {
                                        if (percentageLimitCheck(100, e.target.value))
                                            onChangeInputData(e)
                                    }}
                                    value={employeeData?.commission_selfgen}
                                    placeholder='Comission'
                                />
                            </div>

                            {userType == USER_TYPE.hiredEmployee && (
                                <div className='col'>
                                    <CustomDatePicker
                                        hideLabel
                                        label={`Self - Gen Comission with Effective Date`}
                                        required
                                        name={HIRE_FIELD_KEYS.commission_selfgen_effective_date}
                                        onChange={onChangeInputData}
                                        value={employeeData?.commission_selfgen_effective_date}
                                        placeholder='Comission Effective Date'
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ) : null} */}
            </div>
            {editRedline ? (
                <EditUserRedlineModel
                    employeeData={employeeData}
                    show={editRedline}
                    handleClose={closeRedlinePopup}
                    redline_data={employeeData?.redline_data}
                    onSavePress={onSaveOtherRedlinePress}
                />
            ) : null}
            {editSelfGenRedline ? (
                <EditUserRedlineModel
                    self_gen={true}
                    employeeData={employeeData}
                    show={editSelfGenRedline}
                    handleClose={closeRedlinePopup}
                    redline_data={employeeData?.self_gen_redline_data}
                    onSavePress={onSaveOtherRedlinePress}
                />
            ) : null}
        </div>
    )
}

export default memo(UserRedlineComissionUpfrontContainer)
