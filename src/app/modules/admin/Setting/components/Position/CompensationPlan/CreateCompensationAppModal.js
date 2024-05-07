import {useState, useRef, useEffect, useCallback, useMemo} from 'react'
import {StepperComponent} from '../../../../../../../_metronic/assets/ts/components'
import PositionSetupStep1 from './positionSetupSteps/PositionSetupStep1'
import PositionSetupStep2 from './positionSetupSteps/PositionSetupStep2'
import PositionSetupStep3 from './positionSetupSteps/PositionSetupStep3'
import PositionSetupStep4 from './positionSetupSteps/PositionSetupStep4'
import PositionSetupStep5 from './positionSetupSteps/PositionSetupStep5'
import PositionSetupStep6 from './positionSetupSteps/positionSetupStep6/PositionSetupStep6'
import {updatePositionService} from '../../../../../../../services/Services'
import {
    getCompanyOverrideSettingAction,
    getCostCenterListAction,
    getPayFrequencySettingAction,
} from '../../../../../../../redux/actions/SettingActions'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {
    getCompanyOverrideSettingSelector,
    getCompanySettingSelector,
} from '../../../../../../../redux/selectors/SettingsSelectors'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'
import {
    getBooleanValue,
    getErrorMessageFromResponse,
    isInputValueExist,
} from '../../../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../../../customComponents/customToast/CustomToast'
import CustomModal from '../../../../../../../customComponents/customModal/CustomModal'
import CustomCheckbox from '../../../../../../../customComponents/customCheckbox/CustomCheckbox'
import {MAIN_POSITTIONS_ID} from '../../../../../../../constants/constants'

export const POSITIONS_SETUP_FIELDS_KEYS = {
    // Position Setup Step 1: Comission
    position_name: 'position_name',
    commission_parentage: 'commission_parentage',
    commission_parentag_hiring_locked: 'commission_parentag_hiring_locked',
    commission_structure_type: 'commission_structure_type',
    commission_parentag_type_hiring_locked: 'commission_parentag_type_hiring_locked',

    // Position Setup Step 2: Upfront
    upfront_status: 'upfront_status',
    upfront_ammount: 'upfront_ammount',
    upfront_ammount_locked: 'upfront_ammount_locked',
    calculated_by: 'calculated_by',
    calculated_locked: 'calculated_locked',
    upfront_system: 'upfront_system',
    upfront_system_locked: 'upfront_system_locked',
    upfront_limit: 'upfront_limit',

    // Position Setup Step 3: Decuctions
    deduction: 'deduction',
    deduction_status: 'deduction_status',
    deduction_locked: 'deduction_locked',
    limit_type: 'limit_type',
    limit: 'limit',
    limit_ammount: 'limit_ammount',

    // Position Setup 4: Overrides
    override: 'override',
    tier_override_status: 'tier_override_status',
    sliding_scale: 'sliding_scale',
    sliding_scale_locked: 'sliding_scale_locked',
    levels: 'levels',
    level_locked: 'level_locked',
    position_id: 'position_id',

    // Position Setup 5: Reconciliation
    reconciliation_status: 'reconciliation_status',
    settlement_id: 'settlement_id',
    commission_withheld: 'commission_withheld',
    commission_withheld_locked: 'commission_withheld_locked',
    commission_type_locked: 'commission_type_locked',
    commission_type: 'commission_type',
    maximum_withheld: 'maximum_withheld',
    override_settlement: 'override_settlement',
    clawback_settlement: 'clawback_settlement',
    stack_settlement: 'stack_settlement',

    //   Position Setup 6: Pay Frequency
    frequency_type_id: 'frequency_type_id',
}

export const INIT_POSITION_SETUP_DATA = {
    // Position Setup Step 1: Comission
    position_name: null,
    commission_parentage: null,
    commission_parentag_hiring_locked: 0,
    commission_structure_type: 'fixed',
    commission_parentag_type_hiring_locked: 0,

    // Position Setup Step 2: Upfront
    upfront_status: 1,
    upfront_ammount: 500,
    upfront_ammount_locked: 0,
    calculated_by: 'per sale',
    calculated_locked: 0,
    upfront_system: 'Fixed',
    upfront_system_locked: 0,
    upfront_limit: 1000,

    //   Position Setup Step 3: Deduction
    deduction_status: 1,
    deduction_locked: 0,
    deduction: [
        {
            status: 1,
            cost_center_id: null,
            deduction_type: '$',
            ammount_par_paycheck: null,
        },
    ],
    limit_type: '%',
    limit_ammount: null,
    limit: null,

    // Position Setup Step 4: Overrides
    is_stack: 0,
    override: [
        {
            override_id: 1,
            status: 1,
            override_ammount: null,
            override_ammount_locked: 0,
            type: null,
            override_type_locked: 0,
        },
        {
            override_id: 2,
            status: 1,
            override_ammount: null,
            override_ammount_locked: 0,
            type: null,
            override_type_locked: 0,
        },
        {
            override_id: 3,
            status: 1,
            override_ammount: null,
            override_ammount_locked: 0,
            type: null,
            override_type_locked: 0,
        },
        {
            override_id: 4,
            status: 1,
            override_ammount: null,
            override_ammount_locked: 0,
            type: null,
            override_type_locked: 0,
        },
    ],
    tier_override_status: null,
    sliding_scale: null,
    sliding_scale_locked: null,
    levels: null,
    level_locked: null,

    // Position Setup Step 5: Reconciliation
    reconciliation_status: 1,
    settlement_id: 1,
    settlement_type: 'Duuring M2',
    commission_type_locked: 0,
    commission_withheld_locked: 0,
    commission_withheld: null,
    commission_type: null,
    maximum_withheld: null,
    override_settlement: null,
    clawback_settlement: null,
    stack_settlement: null,

    // Position Setup Step 6: Pay Frequency
    frequency_type_id: null,
}

const CreateCompensationAppModal = ({
    show,
    handleClose,
    selectedPositionData,
    getPosition,
    setLoader,
}) => {
    const stepperRef = useRef()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const stepper = useRef()
    const companySetting = useSelector(getCompanySettingSelector)
    const companyOverrideSetting = useSelector(getCompanyOverrideSettingSelector)
    const [positionSetupData, setPositionSetupData] = useState({
        ...INIT_POSITION_SETUP_DATA,
        ...selectedPositionData,
    })

    useEffect(() => {
        setPositionSetupData((val) => ({
            ...val,
            ...selectedPositionData,
            position_id: selectedPositionData?.id,
            override:
                selectedPositionData?.override?.length > 0
                    ? selectedPositionData?.override
                    : INIT_POSITION_SETUP_DATA.override,
        }))
    }, [selectedPositionData])

    useEffect(() => {
        dispatch(getCostCenterListAction())
        dispatch(getPayFrequencySettingAction())
        dispatch(getCompanyOverrideSettingAction())
    }, [])

    const loadStepper = () => {
        stepper.current = StepperComponent.createInsance(stepperRef.current)
    }

    const isStackModalEnabled = useMemo(() => {
        return (
            (positionSetupData?.parent_position_id ?? positionSetupData?.position_id) ==
                MAIN_POSITTIONS_ID.closer &&
            getBooleanValue(companyOverrideSetting?.allow_office_stack_override_status) == 1
        )
    }, [
        positionSetupData?.parent_position_id,
        positionSetupData?.position_id,
        companyOverrideSetting?.allow_office_stack_override_status,
    ])

    const onSetupOrUpdatePosition = useCallback(
        (firstStep = false) =>
            new Promise((resolve, reject) => {
                let data = {...positionSetupData}
                data.is_stack = getBooleanValue(
                    isStackModalEnabled && getBooleanValue(data?.override?.[3]?.status)
                )
                data.deduction_status = data?.deduction_status ? 1 : 0
                data.reconciliation_status = data?.reconciliation_status ? 1 : 0
                data.limit_type = '%'
                setLoading(true)
                updatePositionService(selectedPositionData?.id, data)
                    .then((res) => {
                        resolve('success')
                    })
                    .catch((error) => {
                        CustomToast.error(getErrorMessageFromResponse(error))
                        reject('fail')
                        return
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            }),
        [isStackModalEnabled, positionSetupData, selectedPositionData?.id]
    )

    const stepsValidation = useMemo(
        () => ({
            step1: () =>
                new Promise((resolve, reject) => {
                    if (!positionSetupData.position_name) {
                        CustomToast.error('Enter position name')
                        reject('fail')
                        return
                    }
                    if (!isInputValueExist(positionSetupData.commission_parentage)) {
                        CustomToast.error('Enter commission')
                        reject('fail')
                        return
                    }
                    if (!positionSetupData.commission_structure_type) {
                        CustomToast.error('Select commission structure')
                        reject('fail')
                        return
                    }
                    onSetupOrUpdatePosition().then(resolve).catch(reject)
                }),
            step2: () =>
                new Promise((resolve, reject) => {
                    if (positionSetupData?.upfront_status) {
                        if (!isInputValueExist(positionSetupData.upfront_ammount)) {
                            CustomToast.error('Enter upfront amount')
                            reject('fail')
                            return
                        }
                        if (!positionSetupData.calculated_by) {
                            CustomToast.error('Select calculated by')
                            reject('fail')
                            return
                        }
                        if (!positionSetupData.upfront_system) {
                            CustomToast.error('Select upfront system')
                            reject('fail')
                            return
                        }
                        // if (!positionSetupData.upfront_limit) return CustomToast.error('Enter upfront limit')
                        onSetupOrUpdatePosition().then(resolve).catch(reject)
                    } else {
                        onSetupOrUpdatePosition().then(resolve).catch(reject)
                    }
                }),
            step3: () =>
                new Promise((resolve, reject) => {
                    if (positionSetupData?.deduction_status) {
                        if (positionSetupData?.deduction?.length <= 0) {
                            CustomToast.error('Atleast 1 cost center should be there')
                            reject('fail')
                            return
                        }

                        const filledData = positionSetupData?.deduction?.map((item) =>
                            getBooleanValue(
                                item?.cost_center_id &&
                                    item?.deduction_type &&
                                    isInputValueExist(item?.ammount_par_paycheck) &&
                                    Number(item?.ammount_par_paycheck) > 0
                            )
                        )
                        if (filledData?.includes(getBooleanValue(false))) {
                            CustomToast.error(
                                'Fill all cost center data and deduction amount should be greater than 0'
                            )
                            reject('fail')
                            return
                        }
                        if (isInputValueExist(positionSetupData?.limit_ammount)) {
                            if (Number(positionSetupData?.limit_ammount) <= 0) {
                                CustomToast.error('Deduction limit amount should be greter than 0')
                                reject('fail')
                                return
                            }
                        }
                        onSetupOrUpdatePosition().then(resolve).catch(reject)
                    } else {
                        onSetupOrUpdatePosition().then(resolve).catch(reject)
                    }
                }),
            step4: () =>
                new Promise((resolve, reject) => {
                    if (positionSetupData?.override?.[0]?.status) {
                        if (
                            !isInputValueExist(positionSetupData?.override?.[0]?.override_ammount)
                        ) {
                            CustomToast.error('Enter direct override amount')
                            reject('fail')
                            return
                        }
                        if (!positionSetupData?.override?.[0]?.type) {
                            CustomToast.error('Select direct override type')
                            reject('fail')
                            return
                        }
                    }
                    if (positionSetupData?.override?.[1]?.status) {
                        if (
                            !isInputValueExist(positionSetupData?.override?.[1]?.override_ammount)
                        ) {
                            CustomToast.error('Enter indirect override amount')
                            reject('fail')
                            return
                        }
                        if (!positionSetupData?.override?.[1]?.type) {
                            CustomToast.error('Select direct inoverride type')
                            reject('fail')
                            return
                        }
                    }
                    if (positionSetupData?.override?.[2]?.status) {
                        if (
                            !isInputValueExist(positionSetupData?.override?.[2]?.override_ammount)
                        ) {
                            CustomToast.error('Enter office override amount')
                            reject('fail')
                            return
                        }
                        if (!positionSetupData?.override?.[2]?.type) {
                            CustomToast.error('Select office override type')
                            reject('fail')
                            return
                        }
                    }
                    if (isStackModalEnabled && positionSetupData?.override?.[3]?.status) {
                        if (
                            !isInputValueExist(positionSetupData?.override?.[3]?.override_ammount)
                        ) {
                            CustomToast.error('Enter office stack split')
                            reject('fail')
                            return
                        }
                    }

                    //   if (positionSetupData?.tier_override_status) {
                    //     if (!positionSetupData?.sliding_scale) return CustomToast.error('Select sliding scale')
                    //     if (!positionSetupData?.levels) return CustomToast.error('Select level')
                    //   }
                    onSetupOrUpdatePosition().then(resolve).catch(reject)
                }),
            step5: () =>
                new Promise((resolve, reject) => {
                    if (positionSetupData?.reconciliation_status) {
                        if (!isInputValueExist(positionSetupData?.commission_withheld)) {
                            CustomToast.error('Enter withhold commission')
                            reject('fail')
                            return
                        }
                        if (!positionSetupData?.commission_type) {
                            CustomToast.error('Select commission type')
                            reject('fail')
                            return
                        }

                        if (
                            isInputValueExist(positionSetupData.maximum_withheld) &&
                            isInputValueExist(positionSetupData.upfront_limit) &&
                            Number(positionSetupData.maximum_withheld) >
                                Number(positionSetupData.upfront_limit)
                        ) {
                            CustomToast.error(
                                'Maximum withheld should be lesser than upfront limit'
                            )
                            reject('fail')
                            return
                        }
                        if (!positionSetupData?.override_settlement) {
                            CustomToast.error('Select override settlement')
                            reject('fail')
                            return
                        }
                        if (!positionSetupData?.clawback_settlement) {
                            CustomToast.error('Select clawback settlement')
                            reject('fail')
                            return
                        }

                        if (
                            isStackModalEnabled &&
                            positionSetupData?.override?.[3]?.status &&
                            !positionSetupData?.stack_settlement
                        ) {
                            CustomToast.error('Select stack settlement')
                            reject('fail')
                            return
                        }
                    }
                    onSetupOrUpdatePosition().then(resolve).catch(reject)
                }),
            step6: () =>
                new Promise((resolve, reject) => {
                    if (!positionSetupData?.frequency_type_id) {
                        CustomToast.error('Select pay frequency')
                        reject('fail')
                        return
                    }
                    onSetupOrUpdatePosition().then(resolve).catch(reject)
                }),
        }),
        [
            onSetupOrUpdatePosition,
            positionSetupData.calculated_by,
            positionSetupData?.clawback_settlement,
            positionSetupData.commission_parentage,
            positionSetupData.commission_structure_type,
            positionSetupData?.commission_type,
            positionSetupData?.commission_withheld,
            positionSetupData?.deduction,
            positionSetupData?.deduction_status,
            positionSetupData?.frequency_type_id,
            positionSetupData?.limit_ammount,
            positionSetupData.maximum_withheld,
            positionSetupData?.override,
            positionSetupData?.override_settlement,
            positionSetupData?.stack_settlement,
            positionSetupData.position_name,
            positionSetupData?.reconciliation_status,
            positionSetupData.upfront_ammount,
            positionSetupData.upfront_limit,
            positionSetupData?.upfront_status,
            positionSetupData.upfront_system,
            isStackModalEnabled,
        ]
    )

    const onSaveAndContinuePress = useCallback(
        (finalStepOrSubmitPress = false) => {
            const moveNextOrExit = () => {
                if (finalStepOrSubmitPress) {
                    CustomToast.success('Position setup updated')
                    setLoader(true)
                    handleClose()
                    getPosition()
                } else {
                    stepper.current.goNext()
                }
            }

            if (stepper.current.getCurrentStepIndex() === 1) {
                stepsValidation.step1().then(() => {
                    moveNextOrExit()
                })
            } else if (stepper.current.getCurrentStepIndex() === 2) {
                stepsValidation.step2().then(() => {
                    moveNextOrExit()
                })
            } else if (stepper.current.getCurrentStepIndex() === 3) {
                stepsValidation.step3().then(() => {
                    moveNextOrExit()
                })
            } else if (stepper.current.getCurrentStepIndex() === 4) {
                if (companySetting?.overrides) {
                    stepsValidation.step4().then(() => {
                        moveNextOrExit()
                    })
                } else if (companySetting?.reconciliation) {
                    stepsValidation.step5().then(() => {
                        moveNextOrExit()
                    })
                } else {
                    stepsValidation.step6().then(() => {
                        moveNextOrExit()
                    })
                }
            } else if (stepper.current.getCurrentStepIndex() === 5) {
                if (companySetting?.reconciliation) {
                    stepsValidation.step5().then(() => {
                        moveNextOrExit()
                    })
                } else {
                    stepsValidation.step6().then(() => {
                        moveNextOrExit()
                    })
                }
            } else if (stepper.current.getCurrentStepIndex() === 6) {
                stepsValidation.step6().then(() => {
                    moveNextOrExit()
                })
            }
        },
        [
            companySetting?.overrides,
            companySetting?.reconciliation,
            getPosition,
            handleClose,
            setLoader,
            stepsValidation,
        ]
    )

    const prevStep = useCallback(() => {
        if (!stepper.current) {
            return
        }

        if (stepper.current.getCurrentStepIndex() === 1) {
            stepsValidation.step1().then(() => {
                stepper.current.goPrev()
            })
        } else if (stepper.current.getCurrentStepIndex() === 2) {
            stepsValidation.step2().then(() => {
                stepper.current.goPrev()
            })
        } else if (stepper.current.getCurrentStepIndex() === 3) {
            stepsValidation.step3().then(() => {
                stepper.current.goPrev()
            })
        } else if (stepper.current.getCurrentStepIndex() === 4) {
            if (companySetting?.overrides) {
                stepsValidation.step4().then(() => {
                    stepper.current.goPrev()
                })
            } else if (companySetting?.reconciliation) {
                stepsValidation.step5().then(() => {
                    stepper.current.goPrev()
                })
            } else {
                stepsValidation.step6().then(() => {
                    stepper.current.goPrev()
                })
            }
        } else if (stepper.current.getCurrentStepIndex() === 5) {
            if (companySetting?.reconciliation) {
                stepsValidation.step5().then(() => {
                    stepper.current.goPrev()
                })
            } else {
                stepsValidation.step6().then(() => {
                    stepper.current.goPrev()
                })
            }
        } else if (stepper.current.getCurrentStepIndex() === 6) {
            stepsValidation.step6().then(() => {
                stepper.current.goPrev()
            })
        }
    }, [companySetting?.overrides, companySetting?.reconciliation, stepsValidation])

    const updatePositionSetupData = (field, value) => {
        setPositionSetupData((val) => ({
            ...val,
            [field]: value,
        }))
    }

    const onStepChange = (id) => {
        stepper?.current?.goto(id)
    }

    return (
        <CustomModal
            id='kt_modal_create_app'
            show={show}
            onHide={handleClose}
            onShow={loadStepper}
            title={'Position Setup | Commissions'}
            maxWidth='900'
            className={'h-sm-75'}
        >
            <div className='' style={{position: 'relative'}}>
                <CustomLoader full visible={loading} />

                <div className=' mx-auto' style={{width: 'fit-content', overflow: 'hidden'}}>
                    <div
                        ref={stepperRef}
                        className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid  justify-content-start'
                        id='kt_modal_create_app_stepper'
                    >
                        <div
                            className='d-flex justify-content-center justify-content-xl-start flex-row-auto mx-auto text-cmGrey500'
                            style={{fontWeight: '600', width: 'fit-content'}}
                        >
                            <div className='stepper-nav'>
                                <div className='stepper-item current' data-kt-stepper-element='nav'>
                                    <div className='stepper-wrapper'>
                                        <div
                                            className='stepper-icon w-40px h-40px'
                                            onClick={() =>
                                                selectedPositionData?.status && onStepChange(1)
                                            }
                                            style={{
                                                cursor: selectedPositionData?.id ? 'pointer' : '',
                                            }}
                                        >
                                            <i className='stepper-check fas fa-check'></i>
                                            <span className='stepper-number'>1</span>
                                        </div>
                                        <div className='stepper-label'>
                                            <h3
                                                className='stepper-title text-cmGrey500 '
                                                style={{
                                                    fontFamily: 'Manrope ',
                                                    fontWeight: '600',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                Commission
                                            </h3>
                                        </div>
                                    </div>
                                    <div className='stepper-line h-40px'></div>
                                </div>
                                <div className='stepper-item' data-kt-stepper-element='nav'>
                                    <div className='stepper-wrapper'>
                                        <div
                                            className='stepper-icon w-40px h-40px'
                                            onClick={() =>
                                                selectedPositionData?.status && onStepChange(2)
                                            }
                                            style={{
                                                cursor: selectedPositionData?.id ? 'pointer' : '',
                                            }}
                                        >
                                            <i className='stepper-check fas fa-check'></i>
                                            <span className='stepper-number'>2</span>
                                        </div>
                                        <div className='stepper-label'>
                                            <h3
                                                className='stepper-title text-cmGrey500'
                                                style={{fontFamily: 'Manrope ', fontSize: '14px'}}
                                            >
                                                Upfront
                                            </h3>
                                        </div>
                                    </div>
                                    <div className='stepper-line h-40px'></div>
                                </div>

                                <div className='stepper-item' data-kt-stepper-element='nav'>
                                    <div className='stepper-wrapper'>
                                        <div
                                            className='stepper-icon w-40px h-40px'
                                            onClick={() =>
                                                selectedPositionData?.status && onStepChange(3)
                                            }
                                            style={{
                                                cursor: selectedPositionData?.id ? 'pointer' : '',
                                            }}
                                        >
                                            <i className='stepper-check fas fa-check'></i>
                                            <span className='stepper-number'>3</span>
                                        </div>
                                        <div className='stepper-label'>
                                            <h3
                                                className='stepper-title text-cmGrey500'
                                                style={{fontFamily: 'Manrope ', fontSize: '14px'}}
                                            >
                                                Deductions
                                            </h3>
                                        </div>
                                    </div>
                                    <div className='stepper-line h-40px'></div>
                                </div>
                                {companySetting?.overrides ? (
                                    <div className='stepper-item' data-kt-stepper-element='nav'>
                                        <div className='stepper-wrapper'>
                                            <div
                                                className='stepper-icon w-40px h-40px'
                                                onClick={() =>
                                                    selectedPositionData?.status && onStepChange(4)
                                                }
                                                style={{
                                                    cursor: selectedPositionData?.id
                                                        ? 'pointer'
                                                        : '',
                                                }}
                                            >
                                                <i className='stepper-check fas fa-check'></i>
                                                <span className='stepper-number'>4</span>
                                            </div>
                                            <div className='stepper-label'>
                                                <h3
                                                    className='stepper-title text-cmGrey500'
                                                    style={{
                                                        fontFamily: 'Manrope ',
                                                        fontSize: '14px',
                                                    }}
                                                >
                                                    Overrides
                                                </h3>
                                            </div>
                                        </div>
                                        <div className='stepper-line h-40px'></div>
                                    </div>
                                ) : null}

                                {companySetting?.reconciliation ? (
                                    <div className='stepper-item' data-kt-stepper-element='nav'>
                                        <div className='stepper-wrapper'>
                                            <div
                                                className='stepper-icon w-40px h-40px'
                                                onClick={() =>
                                                    selectedPositionData?.status && onStepChange(5)
                                                }
                                                style={{
                                                    cursor: selectedPositionData?.id
                                                        ? 'pointer'
                                                        : '',
                                                }}
                                            >
                                                <i className='stepper-check fas fa-check'></i>
                                                <span className='stepper-number'>
                                                    {companySetting?.overrides ? 5 : 4}
                                                </span>
                                            </div>
                                            <div className='stepper-label'>
                                                <h3
                                                    className='stepper-title text-cmGrey500'
                                                    style={{
                                                        fontFamily: 'Manrope ',
                                                        fontSize: '14px',
                                                    }}
                                                >
                                                    Settlements
                                                </h3>
                                            </div>
                                        </div>

                                        <div className='stepper-line h-40px'></div>
                                    </div>
                                ) : null}
                                <div className='stepper-item' data-kt-stepper-element='nav'>
                                    <div className='stepper-wrapper'>
                                        <div
                                            className='stepper-icon w-40px h-40px'
                                            onClick={() =>
                                                selectedPositionData?.status && onStepChange(6)
                                            }
                                            style={{
                                                cursor: selectedPositionData?.status
                                                    ? 'pointer'
                                                    : 'none',
                                            }}
                                        >
                                            <i className='stepper-check fas fa-check'></i>
                                            <span className='stepper-number'>
                                                {companySetting?.reconciliation &&
                                                companySetting?.overrides
                                                    ? 6
                                                    : (companySetting?.overrides &&
                                                          !companySetting?.reconciliation) ||
                                                      (!companySetting?.overrides &&
                                                          companySetting?.reconciliation)
                                                    ? 5
                                                    : 4}
                                            </span>
                                        </div>
                                        <div className='stepper-label'>
                                            <h3
                                                className='stepper-title text-cmGrey500'
                                                style={{fontFamily: 'Manrope ', fontSize: '14px'}}
                                            >
                                                Pay Frequency
                                            </h3>
                                        </div>
                                    </div>

                                    <div className=' mb-10'></div>
                                </div>
                            </div>
                        </div>
                        <div className=' px-lg-15 '>
                            <form
                                noValidate
                                id='kt_modal_create_app_form'
                                className='w- d-flex flex-column justify-content-between h-100 w-100 w-xl-500px '
                            >
                                <div className=''>
                                    <PositionSetupStep1
                                        POSITIONS_SETUP_FIELDS_KEYS={POSITIONS_SETUP_FIELDS_KEYS}
                                        selectedPositionData={selectedPositionData}
                                        positionSetupData={positionSetupData}
                                        updatePositionSetupData={updatePositionSetupData}
                                    />

                                    <PositionSetupStep2
                                        POSITIONS_SETUP_FIELDS_KEYS={POSITIONS_SETUP_FIELDS_KEYS}
                                        selectedPositionData={selectedPositionData}
                                        positionSetupData={positionSetupData}
                                        updatePositionSetupData={updatePositionSetupData}
                                        updateMultiplePositionSetupData={setPositionSetupData}
                                    />

                                    <PositionSetupStep3
                                        POSITIONS_SETUP_FIELDS_KEYS={POSITIONS_SETUP_FIELDS_KEYS}
                                        selectedPositionData={selectedPositionData}
                                        positionSetupData={positionSetupData}
                                        updatePositionSetupData={updatePositionSetupData}
                                        updateMultiplePositionSetupData={setPositionSetupData}
                                    />

                                    {companySetting?.overrides ? (
                                        <PositionSetupStep4
                                            POSITIONS_SETUP_FIELDS_KEYS={
                                                POSITIONS_SETUP_FIELDS_KEYS
                                            }
                                            selectedPositionData={selectedPositionData}
                                            positionSetupData={positionSetupData}
                                            updatePositionSetupData={updatePositionSetupData}
                                            updateMultiplePositionSetupData={setPositionSetupData}
                                            isStackModalEnabled={isStackModalEnabled}
                                        />
                                    ) : null}

                                    {companySetting?.reconciliation ? (
                                        <PositionSetupStep5
                                            POSITIONS_SETUP_FIELDS_KEYS={
                                                POSITIONS_SETUP_FIELDS_KEYS
                                            }
                                            selectedPositionData={selectedPositionData}
                                            positionSetupData={positionSetupData}
                                            updatePositionSetupData={updatePositionSetupData}
                                            updateMultiplePositionSetupData={setPositionSetupData}
                                            isStackModalEnabled={isStackModalEnabled}
                                        />
                                    ) : null}
                                    <PositionSetupStep6
                                        POSITIONS_SETUP_FIELDS_KEYS={POSITIONS_SETUP_FIELDS_KEYS}
                                        selectedPositionData={selectedPositionData}
                                        positionSetupData={positionSetupData}
                                        updateMultiplePositionSetupData={setPositionSetupData}
                                        updatePositionSetupData={updatePositionSetupData}
                                    />
                                </div>
                                <div className='d-flex justify-content-center flex-wrap mx-5'>
                                    <button
                                        style={{
                                            // background: '#6078EC',
                                            color: '#6078EC',
                                            border: '1px solid #6078EC',
                                            fontSize: '14px',
                                        }}
                                        type='button'
                                        className='btn mb-2 btn-lg py-2 px-15'
                                        data-kt-stepper-action='previous'
                                        onClick={prevStep}
                                    >
                                        Back
                                    </button>
                                    <div className='mx-5'>
                                        {/* {!selectedPositionData?.status ? ( */}
                                        <button
                                            type='button'
                                            style={{
                                                background: '#6078EC',
                                                color: 'white',
                                            }}
                                            className='btn btn-lg fs-6 mb-2 py-4 px-10'
                                            data-kt-stepper-action='submit'
                                            onClick={() => onSaveAndContinuePress(true)}
                                        >
                                            {/* Save and Continue */}
                                            Submit
                                        </button>
                                        {/* ) : null} */}

                                        <button
                                            type='button'
                                            style={{
                                                background: '#6078EC',
                                                color: 'white',
                                            }}
                                            className='btn btn-lg fs-6 mb-2 py-4  px-10 text-nowrap'
                                            data-kt-stepper-action='next'
                                            onClick={() => onSaveAndContinuePress(false)}
                                        >
                                            Save and Continue
                                        </button>
                                    </div>
                                    {selectedPositionData?.status ? (
                                        <div>
                                            <button
                                                type='button'
                                                style={{
                                                    background: '#6078EC',
                                                    color: 'white',
                                                }}
                                                onClick={() => onSaveAndContinuePress(true)}
                                                className='btn btn-lg fs-6 mb-2 py-4 px-10'
                                                data-kt-stepper-action='next'
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    ) : null}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </CustomModal>
    )
}

const PositionLockedView = ({checked = 0, onChange = () => {}, name = ''}) => (
    <div className='mt-1 d-flex align-items-center'>
        <span
            className={`${checked ? 'bi bi-lock-fill' : 'bi bi-unlock-fill'} text-cmGrey700`}
        ></span>
        <label className='ms-2 text-cmGrey900' style={{width: '120px', fontSize: '12px'}}>
            {checked ? 'Locked' : 'Unlocked'} for Hiring
        </label>
        <span style={{width: 'fit-content'}}>
            <CustomCheckbox name={name} checked={checked == 1 ? true : false} onChange={onChange} />
        </span>
    </div>
)

export {CreateCompensationAppModal, PositionLockedView}
