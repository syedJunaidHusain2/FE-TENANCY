/* eslint-disable jsx-a11y/anchor-is-valid */

import {useCallback, useState} from 'react'
import {UNIT_TYPE1} from '../../../../../../../../constants/constants'
import {getBooleanValue} from '../../../../../../../../helpers/CommonHelpers'
import {checkReconciliationSettingService} from '../../../../../../../../services/Services'
import CustomToast from '../../../../../../../../customComponents/customToast/CustomToast'
import CustomLoader from '../../../../../../../../customComponents/customLoader/CustomLoader'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomDropdown from '../../../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {PositionLockedView} from '../CreateCompensationAppModal'

const PositionSetupStep5 = ({
    POSITIONS_SETUP_FIELDS_KEYS,
    positionSetupData,
    selectedPositionData,
    updatePositionSetupData,
    updateMultiplePositionSetupData,
    isStackModalEnabled,
}) => {
    const [loading, setLoading] = useState(false)
    const onChangeInputData = useCallback(
        (e) => {
            updatePositionSetupData(e?.target?.name, e?.target?.value)
        },
        [updatePositionSetupData]
    )
    const onCheckRecon = () => {
        if (!positionSetupData.reconciliation_status) {
            updateMultiplePositionSetupData((val) => ({
                ...val,
                [POSITIONS_SETUP_FIELDS_KEYS.reconciliation_status]: getBooleanValue(
                    !positionSetupData?.reconciliation_status
                ),
                [POSITIONS_SETUP_FIELDS_KEYS.commission_withheld]: null,
                [POSITIONS_SETUP_FIELDS_KEYS.commission_type]: null,
                [POSITIONS_SETUP_FIELDS_KEYS.maximum_withheld]: null,
                [POSITIONS_SETUP_FIELDS_KEYS.override_settlement]: null,
                [POSITIONS_SETUP_FIELDS_KEYS.clawback_settlement]: null,
            }))
        } else {
            if (!positionSetupData?.status) {
                updatePositionSetupData(
                    POSITIONS_SETUP_FIELDS_KEYS.reconciliation_status,
                    getBooleanValue(!positionSetupData?.reconciliation_status)
                )
            } else {
                setLoading(true)
                const body = {
                    group_id: positionSetupData?.group_id,
                }
                checkReconciliationSettingService(body)
                    .then((res) => {
                        if (res?.checkStatus)
                            return CustomToast.error('Reconciliation cannot be disabled')
                        updatePositionSetupData(
                            POSITIONS_SETUP_FIELDS_KEYS.reconciliation_status,
                            getBooleanValue(!positionSetupData?.reconciliation_status)
                        )
                    })
                    .finally(() => setLoading(false))
            }
        }
    }
    return (
        <div
            className=''
            style={{fontSize: '14px', position: 'relative'}}
            data-kt-stepper-element='content'
        >
            <CustomLoader full visible={loading} />

            <div className='w-100'>
                <div className='form-check ml-12px d-flex form-switch form-switch-sm form-check-custom form-check-solid mb-2 '>
                    <label
                        className='form-label text-cmGrey900'
                        style={{
                            fontSize: '16px',
                            fontFamily: 'Manrope',
                            fontWeight: '600',
                        }}
                    >
                        Reconciliation{' '}
                    </label>
                    <input
                        style={{marginTop: '-4px'}}
                        className='form-check-input mx-5 cursor-pointer'
                        type='checkbox'
                        value=''
                        name={POSITIONS_SETUP_FIELDS_KEYS.reconciliation_status}
                        onChange={onCheckRecon}
                        // onChange={() => {
                        //   if (!positionSetupData.reconciliation_status) {
                        //     updateMultiplePositionSetupData((val) => ({
                        //       ...val,
                        //       [POSITIONS_SETUP_FIELDS_KEYS.reconciliation_status]: getBooleanValue(
                        //         !positionSetupData?.reconciliation_status
                        //       ),
                        //       [POSITIONS_SETUP_FIELDS_KEYS.commission_withheld]: null,
                        //       [POSITIONS_SETUP_FIELDS_KEYS.commission_type]: null,
                        //       [POSITIONS_SETUP_FIELDS_KEYS.maximum_withheld]: null,
                        //       [POSITIONS_SETUP_FIELDS_KEYS.override_settlement]: null,
                        //       [POSITIONS_SETUP_FIELDS_KEYS.clawback_settlement]: null,
                        //     }))
                        //   } else {
                        //     updatePositionSetupData(
                        //       POSITIONS_SETUP_FIELDS_KEYS.reconciliation_status,
                        //       getBooleanValue(!positionSetupData?.reconciliation_status)
                        //     )
                        //   }
                        // }}
                        checked={positionSetupData?.reconciliation_status}
                    />

                    <label
                        className='me-2 text-cmGrey600'
                        style={{
                            marginTop: '-5px',
                            fontFamily: 'Manrope',
                            fontSize: '12px',
                        }}
                    >
                        {positionSetupData.reconciliation_status ? 'Enabled' : 'Disabled'}
                    </label>
                </div>
                {positionSetupData.reconciliation_status ? (
                    <div className='' style={{fontFamily: 'Manrope', fontSize: '14px'}}>
                        <table className='w-100'>
                            <tbody>
                                {/* Line 1 */}
                                <tr>
                                    <td className='py-5'>
                                        <div className='text-cmGrey900' style={{fontWeight: '600'}}>
                                            Withhold Commission:
                                        </div>
                                    </td>
                                    <td className='py-5'>
                                        <div className='row align-items-center '>
                                            <div className='col-sm-6 col-10'>
                                                <CustomInput
                                                    prefixText='$'
                                                    className='w-100'
                                                    type={INPUT_TYPE.currency}
                                                    name={
                                                        POSITIONS_SETUP_FIELDS_KEYS.commission_withheld
                                                    }
                                                    value={positionSetupData?.commission_withheld}
                                                    onChange={onChangeInputData}
                                                />
                                                <PositionLockedView
                                                    checked={
                                                        positionSetupData?.commission_withheld_locked
                                                    }
                                                    onChange={(e) => {
                                                        const value = getBooleanValue(
                                                            !positionSetupData?.commission_withheld_locked
                                                        )
                                                        updateMultiplePositionSetupData((val) => ({
                                                            ...val,
                                                            commission_withheld_locked: value,
                                                            commission_type_locked: value,
                                                        }))
                                                    }}
                                                />
                                            </div>
                                            {/* Unit dropdown */}
                                            <div className='col-sm-6'>
                                                <CustomDropdown
                                                    className='w-100'
                                                    searching={false}
                                                    placeholder='Select unit'
                                                    name={
                                                        POSITIONS_SETUP_FIELDS_KEYS.commission_type
                                                    }
                                                    value={positionSetupData?.commission_type}
                                                    onChange={onChangeInputData}
                                                    options={UNIT_TYPE1}
                                                />
                                                <PositionLockedView
                                                    checked={
                                                        positionSetupData?.commission_type_locked
                                                    }
                                                    onChange={(e) => {
                                                        const value = getBooleanValue(
                                                            !positionSetupData?.commission_type_locked
                                                        )
                                                        updatePositionSetupData(
                                                            'commission_type_locked',
                                                            value
                                                        )
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                {/* Line 2 */}
                                <tr>
                                    <td className='py-5'>
                                        <div className='text-cmGrey900' style={{fontWeight: '600'}}>
                                            Maximum:
                                        </div>
                                    </td>
                                    <td className='py-5'>
                                        <div className='d-flex flex-wrap gap-3 align-items-center'>
                                            <CustomInput
                                                prefixText='$'
                                                name={POSITIONS_SETUP_FIELDS_KEYS.maximum_withheld}
                                                value={positionSetupData?.maximum_withheld}
                                                onChange={onChangeInputData}
                                                type={INPUT_TYPE.currency}
                                                placeholder='Enter Amount'
                                            />
                                        </div>
                                    </td>
                                </tr>
                                {/* Line 3 */}
                                <tr>
                                    <td className='py-5'>
                                        <div
                                            className='text-cmGrey900 required'
                                            style={{fontWeight: '600'}}
                                        >
                                            Override Settlement:
                                        </div>
                                    </td>
                                    <td className='py-5'>
                                        <div>
                                            {/* Override Settlement dropdown */}
                                            <CustomDropdown
                                                required
                                                searching={false}
                                                name={
                                                    POSITIONS_SETUP_FIELDS_KEYS.override_settlement
                                                }
                                                value={positionSetupData?.override_settlement}
                                                onChange={onChangeInputData}
                                                options={[
                                                    {
                                                        name: 'Reconciliation',
                                                        value: 'Reconciliation',
                                                    },
                                                    {name: 'During M2', value: 'During M2'},
                                                ]}
                                            />
                                        </div>
                                    </td>
                                </tr>
                                {/* Line 4 */}
                                <tr>
                                    <td className='py-5'>
                                        <div
                                            className='text-cmGrey900 required'
                                            style={{fontWeight: '600'}}
                                        >
                                            Clawback Settlement:
                                        </div>
                                    </td>
                                    <td className='py-5'>
                                        <div>
                                            <CustomDropdown
                                                searching={false}
                                                name={
                                                    POSITIONS_SETUP_FIELDS_KEYS.clawback_settlement
                                                }
                                                value={positionSetupData?.clawback_settlement}
                                                onChange={onChangeInputData}
                                                options={[
                                                    {
                                                        name: 'Reconciliation',
                                                        value: 'Reconciliation',
                                                    },
                                                    {name: 'Next Payroll', value: 'Next Payroll'},
                                                ]}
                                            />
                                        </div>
                                    </td>
                                </tr>

                                {isStackModalEnabled && positionSetupData?.override?.[3]?.status ? (
                                    <tr>
                                        <td className='py-5'>
                                            <div
                                                className='text-cmGrey900'
                                                style={{fontWeight: '600'}}
                                            >
                                                Stack Settlement:
                                            </div>
                                        </td>
                                        <td className='py-5'>
                                            <div>
                                                <CustomDropdown
                                                    searching={false}
                                                    name={
                                                        POSITIONS_SETUP_FIELDS_KEYS.stack_settlement
                                                    }
                                                    value={positionSetupData?.stack_settlement}
                                                    onChange={onChangeInputData}
                                                    options={[
                                                        {
                                                            name: 'During M2',
                                                            value: 'During M2',
                                                        },
                                                        {
                                                            name: 'Reconciliation',
                                                            value: 'Reconciliation',
                                                        },
                                                    ]}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ) : null}
                            </tbody>
                        </table>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default PositionSetupStep5
