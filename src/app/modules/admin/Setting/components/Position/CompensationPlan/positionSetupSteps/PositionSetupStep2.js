import {UNIT_TYPE1} from '../../../../../../../../constants/constants'
import {useCallback} from 'react'
import {PositionLockedView} from '../CreateCompensationAppModal'
import {getBooleanValue} from '../../../../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../../../../customComponents/customToast/CustomToast'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomDropdown from '../../../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'

const PositionSetupStep2 = ({
    POSITIONS_SETUP_FIELDS_KEYS,
    positionSetupData,
    selectedPositionData,
    updatePositionSetupData,
    updateMultiplePositionSetupData,
}) => {
    const onChangeInputData = useCallback(
        (e) => {
            updatePositionSetupData(e?.target?.name, e?.target?.value)
        },
        [updatePositionSetupData]
    )
    return (
        <div className='pb-5' style={{fontSize: '14px'}} data-kt-stepper-element='content'>
            <div className='w-100'>
                <div className='form-check ml-12px d-flex form-switch form-switch-sm form-check-custom form-check-solid'>
                    <label
                        className='form-label text-cmGrey900'
                        style={{
                            fontSize: '16px',
                            fontFamily: 'Manrope',
                            fontWeight: '600',
                        }}
                    >
                        Upfront
                    </label>
                    <input
                        // style={{marginTop: '-4px'}}
                        className='form-check-input ms-6 cursor-pointer'
                        type='checkbox'
                        name={POSITIONS_SETUP_FIELDS_KEYS.upfront_status}
                        checked={positionSetupData?.upfront_status}
                        onChange={() => {
                            const changedStatus = !positionSetupData?.upfront_status
                            if (!changedStatus) {
                                updateMultiplePositionSetupData((val) => ({
                                    ...val,
                                    [POSITIONS_SETUP_FIELDS_KEYS.upfront_status]: 0,
                                    [POSITIONS_SETUP_FIELDS_KEYS.upfront_ammount]: null,
                                    [POSITIONS_SETUP_FIELDS_KEYS.upfront_ammount_locked]: 0,
                                    [POSITIONS_SETUP_FIELDS_KEYS.calculated_by]: null,
                                    [POSITIONS_SETUP_FIELDS_KEYS.calculated_locked]: 0,
                                    [POSITIONS_SETUP_FIELDS_KEYS.upfront_system]: null,
                                    [POSITIONS_SETUP_FIELDS_KEYS.upfront_system_locked]: 0,
                                    [POSITIONS_SETUP_FIELDS_KEYS.upfront_limit]: null,
                                }))
                            } else {
                                updatePositionSetupData(
                                    POSITIONS_SETUP_FIELDS_KEYS.upfront_status,
                                    getBooleanValue(changedStatus)
                                )
                            }
                        }}
                    />
                    <label
                        className='ms-2 me-2 text-cmGrey600'
                        style={{
                            fontFamily: 'Manrope',
                            fontSize: '12px',
                        }}
                    >
                        {positionSetupData?.upfront_status ? 'Enabled' : 'Disabled'}
                    </label>
                </div>
                {positionSetupData?.upfront_status ? (
                    <>
                        <div className='container mt-4 mb-5' style={{marginLeft: '-10px'}}>
                            <div className='row mb-10'>
                                <div
                                    className='mb-5 col-sm text-cmGrey700'
                                    style={{
                                        fontFamily: 'Manrope',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                    }}
                                >
                                    <CustomInput
                                        label='Amount'
                                        required
                                        prefixText={'$'}
                                        type={INPUT_TYPE.currency}
                                        name={POSITIONS_SETUP_FIELDS_KEYS.upfront_ammount}
                                        value={positionSetupData?.upfront_ammount}
                                        onChange={onChangeInputData}
                                        placeholder='Enter'
                                    />

                                    <PositionLockedView
                                        name={POSITIONS_SETUP_FIELDS_KEYS.upfront_ammount_locked}
                                        checked={positionSetupData?.upfront_ammount_locked}
                                        onChange={() => {
                                            if (!positionSetupData?.calculated_by)
                                                return CustomToast.error('Select calculated by')
                                            const value = getBooleanValue(
                                                !positionSetupData?.upfront_ammount_locked
                                            )
                                            updatePositionSetupData(
                                                POSITIONS_SETUP_FIELDS_KEYS.upfront_ammount_locked,
                                                value
                                            )
                                            updatePositionSetupData(
                                                POSITIONS_SETUP_FIELDS_KEYS.calculated_locked,
                                                value
                                            )
                                        }}
                                    />
                                </div>
                                <div className='col-sm text-cmGrey700'>
                                    <CustomDropdown
                                        label={'Calculated'}
                                        required
                                        placeholder='Select Calculated'
                                        name={POSITIONS_SETUP_FIELDS_KEYS.calculated_by}
                                        value={positionSetupData?.calculated_by ?? ''}
                                        onChange={onChangeInputData}
                                        options={UNIT_TYPE1}
                                        searching={false}
                                    />
                                    <PositionLockedView
                                        name={POSITIONS_SETUP_FIELDS_KEYS.calculated_locked}
                                        checked={positionSetupData?.calculated_locked}
                                        onChange={() => {
                                            if (!positionSetupData?.upfront_ammount_locked) {
                                                updatePositionSetupData(
                                                    POSITIONS_SETUP_FIELDS_KEYS.calculated_locked,
                                                    getBooleanValue(
                                                        !positionSetupData?.calculated_locked
                                                    )
                                                )
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='container' style={{marginLeft: '-10px'}}>
                            <div className='row'>
                                <div className='col text-cmGrey700'>
                                    <label className='d-flex flex-row'>
                                        <CustomDropdown
                                            label={'Upfront System'}
                                            required
                                            name={POSITIONS_SETUP_FIELDS_KEYS.upfront_system}
                                            value={positionSetupData?.upfront_system ?? ''}
                                            onChange={onChangeInputData}
                                            options={[{name: 'Fixed', value: 'Fixed'}]}
                                            searching={false}
                                        />
                                    </label>
                                </div>
                                <PositionLockedView
                                    name={POSITIONS_SETUP_FIELDS_KEYS.upfront_system_locked}
                                    checked={positionSetupData?.upfront_system_locked}
                                    onChange={() => {
                                        updatePositionSetupData(
                                            POSITIONS_SETUP_FIELDS_KEYS.upfront_system_locked,
                                            getBooleanValue(
                                                !positionSetupData?.upfront_system_locked
                                            )
                                        )
                                    }}
                                />
                            </div>
                        </div>
                        <div className='container mt-12' style={{marginLeft: '-10px'}}>
                            <div className='row'>
                                <div
                                    className='col text-cmGrey700'
                                    style={{
                                        fontFamily: 'Manrope',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                    }}
                                >
                                    <div className=''>
                                        <CustomInput
                                            label={'Limit'}
                                            prefixText={'$'}
                                            subLabel={'(Per Sale)'}
                                            type={INPUT_TYPE.currency}
                                            name={POSITIONS_SETUP_FIELDS_KEYS.upfront_limit}
                                            value={positionSetupData?.upfront_limit}
                                            onChange={onChangeInputData}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    )
}

export default PositionSetupStep2
