import {useState, useEffect, useCallback, useMemo} from 'react'
import {
    editManualOverrideFromService,
    editManualOverrideOnService,
    getManualOverrideDataService,
} from '../../../../../../../services/Services'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'
import CustomToast from '../../../../../../../customComponents/customToast/CustomToast'
import {
    getErrorMessageFromResponse,
    percentageLimitCheck,
} from '../../../../../../../helpers/CommonHelpers'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomModal from '../../../../../../../customComponents/customModal/CustomModal'
import CustomDropdown from '../../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomDatePicker from '../../../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../../customComponents/customButtton/CustomButton'
import useValidation from '../../../../../../../hooks/useValidation'
import {editOverrideValidatiion} from '../../../../../../../validations/validations'
import CustomViewChnagesEmployementPackageModal, {
    MODAL_NAME,
} from '../EmpolymentPackageViewChangesModals.js/CustomViewChnagesEmployementPackageModal'
import ManualOverrideViewChangesModal from './ManualOverrideViewChangesModal'
import {OVERRIDE_TYPE, UNIT_TYPE1, getValidDate} from '../../../../../../../constants/constants'
import CustomLink from '../../../../../../../customComponents/customButtton/CustomLink'
import {useMatch} from 'react-router-dom'

const EditManualOverride = ({show, handleClose, overrideId, type}) => {
    const [loading, setLoading] = useState(false)
    const [showHistoryModal, setShowHistoryModal] = useState(false)
    const [overrideData, setOverrideData] = useState()
    const [validateOverrideData, overrideErrorData] = useValidation()

    useEffect(() => {
        getOverrideData()
    }, [overrideId])

    const getOverrideData = useCallback(() => {
        if (overrideId) {
            setLoading(true)
            getManualOverrideDataService(overrideId)
                .then((res) => {
                    setOverrideData(res?.data)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [overrideId])

    useEffect(() => {
        if (overrideErrorData?.beginValidating) {
            validateOverrideData(editOverrideValidatiion({data: overrideData}))
        }
    }, [overrideData, overrideErrorData?.beginValidating, validateOverrideData])

    const updateOverrideData = (field, value) => {
        setOverrideData((val) => ({
            ...val,
            [field]: value,
        }))
    }

    const onChangeInputData = useCallback((e) => {
        updateOverrideData(e?.target?.name, e?.target?.value)
    }, [])

    const onChangeOverridesType = (e, override) => {
        updateOverrideData(override, null)
        onChangeInputData(e)
    }

    const onChangeInputDataWithLimit = (e) => {
        if (percentageLimitCheck(100, e.target.value)) onChangeInputData(e)
    }
    const updateManualOverridePress = useCallback(
        (e) => {
            e.preventDefault()
            const body = {
                id: overrideData?.id,
                manual_user_id: overrideData?.manual_user?.id,
                user_id: overrideData?.user?.id,
                overrides_amount: overrideData?.overrides_amount,
                overrides_type: overrideData?.overrides_type,
                effective_date: getValidDate(overrideData?.effective_date, 'YYYY-MM-DD'),
            }
            validateOverrideData(
                editOverrideValidatiion({
                    data: overrideData,
                })
            ).then((res) => {
                if (res.isValidate) {
                    setLoading(true)
                    if (type == 'on') {
                        editManualOverrideOnService(body)
                            .then(() => {
                                handleClose()
                            })
                            .catch((e) => {
                                CustomToast.error(getErrorMessageFromResponse(e))
                            })
                            .finally(() => {
                                setLoading(false)
                            })
                    } else {
                        editManualOverrideFromService(body)
                            .then(() => {
                                handleClose()
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
        },
        [handleClose, overrideData, type, validateOverrideData]
    )

    const isOverrideTypeIsPercent = useMemo(() => {
        return overrideData?.overrides_type == 'percent' ? true : false
    }, [overrideData?.overrides_type])
    return (
        <CustomModal show={show} onHide={handleClose} maxWidth='500' title='Edit Manual Override'>
            <form onSubmit={updateManualOverridePress}>
                {/* body */}
                <CustomLoader full visible={loading} />
                <div
                    className='w-sm-75 mb-20 mx-sm-auto mx-5'
                    style={{fontFamily: 'Manrope', fontSize: '14px', position: 'relative'}}
                >
                    <div className=''>
                        <div className='modal-body  py-lg-7'>
                            <div className='d-flex justify-content-center gap-10 mb-5 w-100 overflow-auto'></div>
                            <div className='container d-flex justify-content-center'>
                                <div className='row' style={{position: 'relative'}}>
                                    <div className='d-sm-flex mb-3 justify-content-center'>
                                        <div className='w-sm-325px'>
                                            <div
                                                className='text-cmGrey700 mb-1 d-flex w-100 align-items-center justify-content-between'
                                                style={{fontWeight: '600', fontSize: '15px'}}
                                            >
                                                <div className='text-gray-400'>
                                                    Override from:
                                                    <br />
                                                    <span className='text-black'>
                                                        {overrideData?.manual_user?.first_name}{' '}
                                                        {overrideData?.manual_user?.last_name}
                                                    </span>
                                                </div>
                                                <div>→ </div>
                                                <div className='text-gray-400 d-flex align-items-end flex-column'>
                                                    Override for:
                                                    <br />{' '}
                                                    <span className='text-black'>
                                                        {overrideData?.user?.first_name}{' '}
                                                        {overrideData?.user?.last_name}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className='w-md-100 mb-0'></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* View Changes */}
                    <div className='d-flex gap-sm-10 gap-5 my-10 w-sm-100 mx-auto align-items-end'>
                        <div className='w-100'>
                            <CustomDatePicker
                                required
                                label={'Effective date'}
                                name='effective_date'
                                onChange={onChangeInputData}
                                value={overrideData?.effective_date}
                                errorMessage={overrideErrorData?.effective_date}
                                placeholder='Select / Enter Effective Date'
                            />
                        </div>
                    </div>
                    {overrideData?.manual_overrides_history?.length > 0 ? (
                        <div className=''>
                            <div className='modal-body  '>
                                <div className='d-flex justify-content-center gap-10 w-100 overflow-auto'></div>
                                <div className='container d-flex justify-content-center'>
                                    <div className='row' style={{position: 'relative'}}>
                                        <div className='d-sm-flex justify-content-center'>
                                            <div className='w-sm-325px'>
                                                <div
                                                    className='text-cmGrey700  d-flex w-100 align-items-center justify-content-center'
                                                    style={{fontWeight: '600', fontSize: '15px'}}
                                                >
                                                    <CustomLink
                                                        label={'View Changes'}
                                                        onClick={() => setShowHistoryModal(true)}
                                                    />
                                                </div>

                                                <div className='w-md-100 mb-0'></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                    <div className='d-flex gap-sm-10 gap-5 mb-10 mx-auto align-items-end'>
                        <div className=''>
                            <div className=''>
                                <CustomInput
                                    label={isOverrideTypeIsPercent ? 'Percent' : `Amount`}
                                    prefixText={
                                        overrideData?.overrides_type == 'percent' ? '%' : '$'
                                    }
                                    required
                                    type={INPUT_TYPE.number}
                                    placeholder={
                                        isOverrideTypeIsPercent ? 'Enter Percent' : 'Enter Amount'
                                    }
                                    name='overrides_amount'
                                    value={overrideData?.overrides_amount}
                                    errorMessage={overrideErrorData?.overrides_amount}
                                    onChange={
                                        isOverrideTypeIsPercent
                                            ? onChangeInputDataWithLimit
                                            : onChangeInputData
                                    }
                                />
                            </div>
                        </div>
                        <div>
                            <CustomDropdown
                                options={OVERRIDE_TYPE}
                                onChange={(e) => onChangeOverridesType(e, 'overrides_amount')}
                                name='overrides_type'
                                value={overrideData?.overrides_type}
                                errorMessage={overrideErrorData?.overrides_type}
                                searching={false}
                            />
                        </div>
                    </div>
                </div>
                <div className='text-center mb-10'>
                    <CustomButton type='submit' buttonLabel='Update Override' />
                </div>
            </form>
            {showHistoryModal ? (
                <ManualOverrideViewChangesModal
                    show={showHistoryModal}
                    modalName={MODAL_NAME.ManualOverride}
                    handleClose={() => setShowHistoryModal(false)}
                    getOverrideData={getOverrideData}
                    title={`Manual Override Changes - From ${overrideData?.manual_user?.first_name} ${overrideData?.manual_user?.last_name} - To ${overrideData?.user?.first_name} ${overrideData?.user?.last_name}`}
                    data={overrideData}
                />
            ) : null}
        </CustomModal>
    )
}

export {EditManualOverride}
