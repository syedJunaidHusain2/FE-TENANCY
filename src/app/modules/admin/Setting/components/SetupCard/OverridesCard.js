import React, {useState, useEffect, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
    getCompanyOverrideSettingSelector,
    getCompanySettingSelector,
} from '../../../../../../redux/selectors/SettingsSelectors'
import {
    getCompanyOverrideSettingAction,
    getCompanySettingAction,
    updateCompanySettingAction,
} from '../../../../../../redux/actions/SettingActions'
import {
    isPermittedForAccess,
    PERMISSION_TYPE,
    PERMISSIONS_GROUP,
} from '../../../../../../accessRights/AccessRights'
import CustomDialog from '../../../../../../customComponents/customDialog/CustomDialog'
import {updateOverridesOnTwoAccountStatusService} from '../../../../../../services/Services'
import {getBooleanValue, getErrorMessageFromResponse} from '../../../../../../helpers/CommonHelpers'
import CustomCheckbox from '../../../../../../customComponents/customCheckbox/CustomCheckbox'
import {fontsFamily} from '../../../../../../assets/fonts/fonts'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import CustomArrow, {
    ARROW_DIRECTION,
} from '../../../../../../customComponents/customIcons/CustomIcons'
import CustomEditIcon from '../../../../../../customComponents/customIcons/CustomEditIcon'

export default function SetupCard1() {
    const dispatch = useDispatch()
    const companySetting = useSelector(getCompanySettingSelector)
    const [edit, setEdit] = useState(false)
    const companyOverrideSetting = useSelector(getCompanyOverrideSettingSelector)
    const [overrideSetting, setOverrideSetting] = useState(companyOverrideSetting)
    const [removeExistingManualOverrides, setRemoveExistingManualOverrides] = useState(false)
    const [showMore, setshowMore] = useState(false)

    useEffect(() => {
        dispatch(getCompanySettingAction())
        dispatch(getCompanyOverrideSettingAction())
    }, [])

    useEffect(() => {
        setOverrideSetting(companyOverrideSetting)
    }, [companyOverrideSetting])

    const handleOverrides = useCallback(() => {
        if (companySetting?.overrides) {
            setEdit(false)
            dispatch(updateCompanySettingAction('overrides'))
            updateOverridesOnTwoAccountStatusService({
                allow_manual_override_status: 0,
                allow_office_stack_override_status: 0,
                pay_type: null,
            }).then(() => {
                setEdit(false)
                dispatch(getCompanyOverrideSettingAction())
            })
        } else {
            dispatch(updateCompanySettingAction('overrides'))
        }
    }, [companySetting?.overrides, dispatch])

    const handleEdit = () => {
        setEdit(!edit)
    }

    const handleSave = useCallback(() => {
        if (removeExistingManualOverrides) {
            setRemoveExistingManualOverrides(0)
        }
        updateOverridesOnTwoAccountStatusService({
            allow_manual_override_status: overrideSetting?.allow_manual_override_status,
            allow_office_stack_override_status: overrideSetting?.allow_office_stack_override_status,
            pay_type: overrideSetting?.pay_type,
            remove_existing_manual_override: removeExistingManualOverrides,
        })
            .then(() => {
                setEdit(false)
                dispatch(getCompanyOverrideSettingAction())
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
    }, [
        dispatch,
        overrideSetting?.allow_manual_override_status,
        overrideSetting?.allow_office_stack_override_status,
        overrideSetting?.pay_type,
        removeExistingManualOverrides,
    ])

    return (
        <div
            style={{fontSize: '14px', fontFamily: fontsFamily.manrope}}
            className='card bg-white shadow-sm  mb-10'
        >
            <div>
                <div className='w-100'>
                    <div className='d-flex align-items-center justify-content-between px-10 py-5'>
                        <div className='d-flex align-items-center gap-5'>
                            <label
                                className='text-cmBlack'
                                style={{
                                    fontWeight: '700',
                                    fontSize: '16px',
                                    fontFamily: fontsFamily.manrope,
                                    lineHeight: '21.86px',
                                }}
                            >
                                Overrides
                            </label>

                            {isPermittedForAccess({
                                permission: PERMISSIONS_GROUP.administrator.setting.setup,
                                type: PERMISSION_TYPE.edit,
                                forManager: true,
                            }) ? (
                                <div className=' form-switch form-check-custom form-check-solid my-auto'>
                                    <input
                                        className='cursor-pointer form-check-input h-20px w-35px '
                                        type='checkbox'
                                        value=''
                                        id='flexSwitchDefault'
                                        checked={companySetting?.overrides}
                                        onChange={() => {
                                            CustomDialog.warn(
                                                `This will ${
                                                    companySetting?.overrides ? 'disable' : 'enable'
                                                } Override payments for employees Do you wish to save these changes?`,
                                                () => {
                                                    handleOverrides()
                                                }
                                            )
                                        }}
                                    />
                                </div>
                            ) : null}

                            <label
                                className=''
                                style={{
                                    color: '#757575',
                                    fontFamily: 'Manrope',
                                    fontSize: '12px',
                                }}
                            >
                                {companySetting?.overrides ? 'Enabled' : 'Disabled'}
                            </label>
                            <div className='d-flex flex-center'>
                                <CustomArrow
                                    arrowDirection={
                                        showMore ? ARROW_DIRECTION.right : ARROW_DIRECTION.down
                                    }
                                    onClick={() => setshowMore(!showMore)}
                                />
                            </div>
                        </div>
                        {companySetting?.overrides ? (
                            <>
                                {!showMore ? (
                                    <>
                                        {edit ? (
                                            <div className='d-flex flex-center gap-3'>
                                                <CustomButton
                                                    buttonType={BUTTON_TYPE.greyText}
                                                    buttonSize={BUTTON_SIZE.small}
                                                    onClick={() => {
                                                        setEdit(false)
                                                        dispatch(getCompanyOverrideSettingAction())
                                                    }}
                                                    buttonLabel='Cancel'
                                                />
                                                <CustomButton
                                                    buttonType={BUTTON_TYPE.secondary}
                                                    buttonSize={BUTTON_SIZE.small}
                                                    onClick={handleSave}
                                                    buttonLabel='Save'
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <CustomEditIcon onClick={handleEdit} />
                                            </div>
                                        )}
                                    </>
                                ) : null}
                            </>
                        ) : null}
                    </div>
                    {companySetting?.overrides ? (
                        <>
                            {!showMore ? (
                                <>
                                    <hr className='m-0 p-0' />
                                    {edit ? (
                                        <div>
                                            <div className='d-flex align-items-center gap-3 py-4 text-cmGrey800 stripRow'>
                                                <div className=' px-10'>
                                                    <CustomCheckbox
                                                        checked={
                                                            getBooleanValue(
                                                                Number(
                                                                    overrideSetting?.allow_office_stack_override_status
                                                                )
                                                            )
                                                                ? true
                                                                : false
                                                        }
                                                        onChange={() => {
                                                            // setOverrideSetting((val) => ({
                                                            //     ...val,
                                                            //     allow_office_stack_override_status:
                                                            //         getBooleanValue(
                                                            //             overrideSetting?.allow_office_stack_override_status
                                                            //         ) == 1
                                                            //             ? 0
                                                            //             : 1,
                                                            // }))
                                                            if (
                                                                getBooleanValue(
                                                                    overrideSetting?.allow_office_stack_override_status
                                                                ) == 1
                                                            ) {
                                                                CustomDialog.confirm(
                                                                    'Turning off Stack Overrides will stop all current Stack overrides. Are you sure you wish to proceed?',
                                                                    () => {
                                                                        setOverrideSetting(
                                                                            (val) => ({
                                                                                ...val,
                                                                                allow_office_stack_override_status: 0,
                                                                            })
                                                                        )
                                                                    },
                                                                    () => {
                                                                        setOverrideSetting(
                                                                            (val) => ({
                                                                                ...val,
                                                                                allow_office_stack_override_status: 1,
                                                                            })
                                                                        )
                                                                    }
                                                                )
                                                            } else {
                                                                setOverrideSetting((val) => ({
                                                                    ...val,
                                                                    allow_office_stack_override_status: 1,
                                                                }))
                                                            }
                                                        }}
                                                        value={getBooleanValue(
                                                            Number(
                                                                overrideSetting?.allow_office_stack_override_status
                                                            )
                                                        )}
                                                    />
                                                </div>
                                                <div style={{fontWeight: 700}}>
                                                    Allow Office Stack overrides
                                                </div>
                                            </div>
                                            <div className='d-flex align-items-center gap-3 py-4 text-cmGrey800 stripRow'>
                                                <div className=' px-10'>
                                                    <CustomCheckbox
                                                        checked={
                                                            getBooleanValue(
                                                                Number(
                                                                    overrideSetting?.allow_manual_override_status
                                                                )
                                                            )
                                                                ? true
                                                                : false
                                                        }
                                                        onChange={() => {
                                                            if (
                                                                getBooleanValue(
                                                                    overrideSetting?.allow_manual_override_status
                                                                ) == 1
                                                            ) {
                                                                CustomDialog.confirm(
                                                                    // 'It will not allow to add manual overrides. Do you want to remove existing manual overrides ?',
                                                                    'Turning off Manual Overrides will disable all current manual overrides.Are you sure you wish to proceed ?',
                                                                    () => {
                                                                        setRemoveExistingManualOverrides(
                                                                            1
                                                                        )
                                                                        setOverrideSetting(
                                                                            (val) => ({
                                                                                ...val,
                                                                                allow_manual_override_status: 0,
                                                                            })
                                                                        )
                                                                    },
                                                                    () => {
                                                                        setRemoveExistingManualOverrides(
                                                                            0
                                                                        )
                                                                        setOverrideSetting(
                                                                            (val) => ({
                                                                                ...val,
                                                                                allow_manual_override_status: 1,
                                                                            })
                                                                        )
                                                                    }
                                                                )
                                                            } else {
                                                                setRemoveExistingManualOverrides(0)
                                                                setOverrideSetting((val) => ({
                                                                    ...val,
                                                                    allow_manual_override_status: 1,
                                                                }))
                                                            }
                                                        }}
                                                        value={getBooleanValue(
                                                            Number(
                                                                overrideSetting?.allow_manual_override_status
                                                            )
                                                        )}
                                                    />
                                                </div>
                                                <div style={{fontWeight: 700}}>
                                                    Allow Manual overrides
                                                </div>
                                            </div>
                                            <div className='py-4  px-10 stripRow'>
                                                <div style={{fontWeight: 600}}>
                                                    When an individual receives multiple Direct,
                                                    Indirect and Manual overrides on a sale
                                                </div>
                                                <div
                                                    className='d-flex align-items-center gap-3 py-3 mt-2'
                                                    style={{fontWeight: 700}}
                                                >
                                                    <div>Pay</div>
                                                    <div>
                                                        <CustomDropdown
                                                            placeholder='Select override with the highest value'
                                                            value={overrideSetting?.pay_type}
                                                            searching={false}
                                                            options={[
                                                                {
                                                                    name: 'Pay all overrides',
                                                                    value: 'pay all overrides',
                                                                },
                                                                {
                                                                    name: 'Pay override with the highest value',
                                                                    value: 'pay override with the highest value',
                                                                },
                                                            ]}
                                                            onChange={(e) => {
                                                                setOverrideSetting((val) => ({
                                                                    ...val,
                                                                    pay_type: e?.target?.value,
                                                                }))
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='text-cmGrey800' style={{fontWeight: 700}}>
                                            <div
                                                style={{fontWeight: 600}}
                                                className='py-4 stripRow px-10'
                                            >
                                                Allow Office Stack overrides:{' '}
                                                <span style={{fontWeight: 500}}>
                                                    {getBooleanValue(
                                                        Number(
                                                            overrideSetting?.allow_office_stack_override_status
                                                        )
                                                    )
                                                        ? 'Yes'
                                                        : 'No'}
                                                </span>
                                            </div>
                                            <div
                                                style={{fontWeight: 600}}
                                                className='py-4 stripRow px-10'
                                            >
                                                Allowed Manual overrides:{' '}
                                                <span style={{fontWeight: 500}}>
                                                    {getBooleanValue(
                                                        Number(
                                                            overrideSetting?.allow_manual_override_status
                                                        )
                                                    )
                                                        ? 'Yes'
                                                        : 'No'}
                                                </span>
                                            </div>
                                            <div className='py-4 stripRow px-10'>
                                                When an individual receives multiple Direct,
                                                Indirect and Manual overrides on a sale:
                                                <br />
                                                <span style={{fontWeight: 500}}>
                                                    {overrideSetting?.pay_type ?? '-'}
                                                </span>
                                            </div>
                                        </div>
                                    )}{' '}
                                </>
                            ) : null}
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
