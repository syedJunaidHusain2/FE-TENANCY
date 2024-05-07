import {useCallback, useEffect, useState} from 'react'
import {getTierLevelService} from '../../../../../../../../services/Services'
import {OVERRIDE_TYPE, UNIT_TYPE1} from '../../../../../../../../constants/constants'
import {PositionLockedView} from '../CreateCompensationAppModal'
import {getBooleanValue, percentageLimitCheck} from '../../../../../../../../helpers/CommonHelpers'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomDropdown from '../../../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomText from '../../../../../../../../customComponents/customText/CustomText'
import CustomCheckbox from '../../../../../../../../customComponents/customCheckbox/CustomCheckbox'
import {FormControlLabel, Switch} from '@mui/material'

const PositionSetupStep4 = ({
    POSITIONS_SETUP_FIELDS_KEYS,
    positionSetupData,
    selectedPositionData,
    updatePositionSetupData,
    updateMultiplePositionSetupData,
    isStackModalEnabled = false,
}) => {
    const [tieroverride, setTierOverrides] = useState([])

    useEffect(() => {
        getTierLevelService()
            .then((res) => {
                setTierOverrides(res.data[2])
            })
            .catch((e) => {
                setTierOverrides({Configure: []})
            })
    }, [])

    const onChangeOverride = (index, field, value) => {
        let tempData = [...positionSetupData?.override]

        if (tempData?.[index]) {
            if (field == 'status' && !value) {
                tempData[index]['status'] = value
                tempData[index]['override_ammount'] = null
                tempData[index]['type'] = null
                tempData[index]['override_ammount_locked'] = 0
                tempData[index]['override_type_locked'] = 0
            } else {
                tempData[index][field] = value
            }
            updatePositionSetupData(POSITIONS_SETUP_FIELDS_KEYS.override, tempData)
        }
    }

    const onChangeInputData = useCallback(
        (e) => {
            updatePositionSetupData(e?.target?.name, e?.target?.value)
        },
        [updatePositionSetupData]
    )

    const onChangeLimit = (index, field, e) => {
        let {value, max} = e.target
        if (Number(value) <= Number(max)) {
            onChangeOverride(index, field, e.target.value)
        }
    }

    return (
        <div
            className='pb-5'
            style={{
                // marginBottom: tier === false ? '22%' : '0%',
                fontSize: '14px',
                fontStyle: 'Manrope',
                fontWeight: '600',
            }}
            data-kt-stepper-element='content'
        >
            <div className='w-100'>
                {/* Direct Overrides */}
                <SingleOveride
                    overrideIndex={0}
                    title={'Direct Overrides'}
                    onChangeOverride={onChangeOverride}
                    positionSetupData={positionSetupData}
                />

                {/* Indirect Overrides */}
                <SingleOveride
                    overrideIndex={1}
                    title={'Indirect Overrides'}
                    onChangeOverride={onChangeOverride}
                    positionSetupData={positionSetupData}
                />
                {/* Office Overrides */}
                <SingleOveride
                    overrideIndex={2}
                    title={'Office Overrides'}
                    onChangeOverride={onChangeOverride}
                    positionSetupData={positionSetupData}
                />
                {isStackModalEnabled ? (
                    <div className='container' style={{fontFamily: 'Manrope'}}>
                        <div className='row g-2 mb-10 align-items-end'>
                            <div className='col-6'>
                                <div className='d-flex flex-row mb-5'>
                                    <div className='ms-0 form-check d-flex gap-5 form-switch form-switch-sm form-check-custom form-check-solid '>
                                        <div
                                            className={`${
                                                positionSetupData.override?.[3]?.status
                                                    ? 'required'
                                                    : null
                                            }  `}
                                        >
                                            {'Stack Split'}
                                        </div>
                                        <input
                                            className='form-check-input ml-8 cursor-pointer'
                                            type='checkbox'
                                            checked={positionSetupData.override?.[3]?.status}
                                            onChange={(e) => {
                                                const value =
                                                    !positionSetupData.override?.[3]?.status
                                                onChangeOverride(3, 'status', value)
                                            }}
                                        />
                                        <label
                                            className='ms-3 text-cmGrey600'
                                            style={{fontSize: '12px'}}
                                        >
                                            {positionSetupData?.override?.[3]?.status
                                                ? 'Enabled'
                                                : `Disabled`}
                                        </label>
                                    </div>
                                </div>
                                {positionSetupData?.override?.[3]?.status ? (
                                    <>
                                        <div className='d-flex align-items-center gap-2 '>
                                            <div>
                                                <CustomInput
                                                    suffixText={'%'}
                                                    type={INPUT_TYPE.number}
                                                    value={
                                                        positionSetupData.override?.[3]
                                                            ?.override_ammount
                                                    }
                                                    placeholder='Enter Split %'
                                                    // onChange={(e) => {

                                                    //         onChangeOverride(
                                                    //             3,
                                                    //             'override_ammount',
                                                    //             e?.target?.value
                                                    //         )
                                                    // }}
                                                    onChange={(e) =>
                                                        onChangeLimit(3, 'override_ammount', e)
                                                    }
                                                    max={100}
                                                />
                                            </div>
                                        </div>
                                        <PositionLockedView
                                            checked={
                                                positionSetupData?.override?.[3]
                                                    .override_ammount_locked
                                            }
                                            onChange={(e) => {
                                                const value = getBooleanValue(
                                                    !positionSetupData?.override?.[3]
                                                        .override_ammount_locked
                                                )
                                                onChangeOverride(
                                                    3,
                                                    'override_ammount_locked',
                                                    value
                                                )
                                                onChangeOverride(3, 'override_type_locked', value)
                                            }}
                                        />
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default PositionSetupStep4

export const SingleOveride = ({title, positionSetupData, overrideIndex = 0, onChangeOverride}) => {
    const onChangeInputDataWithLimit = (index, name, val) => {
        if (percentageLimitCheck(100, val)) onChangeOverride(index, name, val)
    }
    const onChangeOverridesType = (index, name, override_name, val) => {
        onChangeOverride(index, override_name, null)
        onChangeOverride(index, name, val)
    }
    const isPercentOverrideType =
        positionSetupData?.override?.[overrideIndex]?.type == 'percent' ? true : false
    return (
        <div className='container ' style={{fontFamily: 'Manrope'}}>
            <div className='row mb-10 align-items-end'>
                <div className='col-sm-6'>
                    <div className='d-flex flex-row mb-5'>
                        <div className='ms-0 d-flex gap-5 flex-center'>
                            <div
                                className={`${
                                    positionSetupData.override?.[overrideIndex]?.status
                                        ? 'required'
                                        : ''
                                }`}
                            >
                                {title}
                            </div>

                            <div className='form-check  form-switch form-switch-sm form-check-custom form-check-solid '>
                                <input
                                    class='form-check-input cursor-pointer'
                                    type='checkbox'
                                    role='switch'
                                    id='flexSwitchCheckDefault'
                                    checked={
                                        positionSetupData.override?.[overrideIndex]?.status
                                            ? true
                                            : false
                                    }
                                    onChange={(e) => {
                                        const value =
                                            !positionSetupData.override?.[overrideIndex]?.status
                                        onChangeOverride(overrideIndex, 'status', value)
                                    }}
                                />
                            </div>

                            <label className='ms-3 text-cmGrey600' style={{fontSize: '12px'}}>
                                {positionSetupData?.override?.[overrideIndex]?.status
                                    ? 'Enabled'
                                    : `Disabled`}
                            </label>
                        </div>
                    </div>
                    {positionSetupData?.override?.[overrideIndex]?.status ? (
                        <div className=''>
                            <div>
                                <CustomInput
                                    prefixText={
                                        positionSetupData?.override?.[overrideIndex]?.type ==
                                        'percent'
                                            ? '%'
                                            : '$'
                                    }
                                    type={INPUT_TYPE.currency}
                                    value={
                                        positionSetupData.override?.[overrideIndex]
                                            ?.override_ammount
                                    }
                                    placeholder={
                                        isPercentOverrideType ? 'Enter Percent' : 'Enter Amount'
                                    }
                                    onChange={(e) => {
                                        isPercentOverrideType
                                            ? onChangeInputDataWithLimit(
                                                  overrideIndex,
                                                  'override_ammount',
                                                  e?.target?.value
                                              )
                                            : onChangeOverride(
                                                  overrideIndex,
                                                  'override_ammount',
                                                  e?.target?.value
                                              )
                                    }}
                                />
                            </div>
                            <PositionLockedView
                                checked={
                                    positionSetupData?.override?.[overrideIndex]
                                        .override_ammount_locked
                                }
                                onChange={(e) => {
                                    const value = getBooleanValue(
                                        !positionSetupData?.override?.[overrideIndex]
                                            .override_ammount_locked
                                    )
                                    onChangeOverride(
                                        overrideIndex,
                                        'override_ammount_locked',
                                        value
                                    )
                                    onChangeOverride(overrideIndex, 'override_type_locked', value)
                                }}
                            />
                        </div>
                    ) : null}
                </div>
                {positionSetupData.override?.[overrideIndex]?.status ? (
                    <div className='col-sm ms-xl-10'>
                        {/* Select unit dropdown */}
                        <CustomDropdown
                            options={OVERRIDE_TYPE}
                            placeholder='Select unit'
                            value={positionSetupData?.override?.[overrideIndex]?.type}
                            searching={false}
                            onChange={(e) => {
                                onChangeOverridesType(
                                    overrideIndex,
                                    'type',
                                    'override_ammount',
                                    e?.target?.value
                                )
                                // onChangeOverride(overrideIndex, 'type', e?.target?.value)
                            }}
                        />

                        <PositionLockedView
                            checked={
                                positionSetupData?.override?.[overrideIndex].override_type_locked
                            }
                            onChange={(e) => {
                                if (
                                    !positionSetupData?.override?.[overrideIndex]
                                        .override_ammount_locked
                                ) {
                                    onChangeOverride(
                                        overrideIndex,
                                        'override_type_locked',
                                        getBooleanValue(
                                            !positionSetupData?.override?.[overrideIndex]
                                                .override_type_locked
                                        )
                                    )
                                }
                            }}
                        />
                    </div>
                ) : null}
            </div>
        </div>
    )
}
