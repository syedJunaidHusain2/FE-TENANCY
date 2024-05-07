import {useCallback} from 'react'
import {getBooleanValue, percentageLimitCheck} from '../../../../../../../../helpers/CommonHelpers'
import Lock from '../../../../../Setting/Icon/lock.png'
import Unloack from '../../../../../Setting/Icon/unlock.png'
import {PositionLockedView} from '../CreateCompensationAppModal'

import CustomDropdown from '../../../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../../customComponents/customInputs/customInput/CustomInput'
import {MAIN_POSITTIONS_ID} from '../../../../../../../../constants/constants'

const PositionSetupStep1 = ({
    POSITIONS_SETUP_FIELDS_KEYS,
    positionSetupData,
    selectedPositionData,
    updatePositionSetupData,
}) => {
    const onChangeInputData = useCallback(
        (e) => {
            updatePositionSetupData(e?.target?.name, e?.target?.value)
        },
        [updatePositionSetupData]
    )
    const onChangeCommission = (e) => {
        let {value, max, name} = e.target
        if (percentageLimitCheck(max, value)) onChangeInputData(e)
    }
    return (
        <div
            className='current pb-10'
            data-kt-stepper-element='content'
            style={{
                fontFamily: 'Manrope',
                fontSize: '14px',
                fontWeight: '600',
            }}
        >
            <div className='w-100'>
                <div className='fv-row  mb-10'>
                    {![MAIN_POSITTIONS_ID.closer, MAIN_POSITTIONS_ID.setter].includes(
                        positionSetupData?.position_id?.toString()
                    ) ? (
                        <div className='mb-5'>
                            <CustomInput
                                label={'Position'}
                                min='0'
                                placeholder='Enter Position Name'
                                name={POSITIONS_SETUP_FIELDS_KEYS.position_name}
                                value={positionSetupData?.position_name}
                                onChange={onChangeInputData}
                                rejex={/^[\w\-\s]+$/}
                            />
                        </div>
                    ) : null}

                    <div className=' d-flex align-items-end gap-2 '>
                        <CustomInput
                            label={'Commissions'}
                            required
                            suffixText={'%'}
                            type={INPUT_TYPE.number}
                            min='0'
                            placeholder='Enter'
                            name={POSITIONS_SETUP_FIELDS_KEYS.commission_parentage}
                            value={positionSetupData?.commission_parentage}
                            onChange={onChangeCommission}
                            max={100}
                        />
                    </div>
                    <PositionLockedView
                        onChange={() => {
                            updatePositionSetupData(
                                POSITIONS_SETUP_FIELDS_KEYS.commission_parentag_hiring_locked,
                                getBooleanValue(
                                    !positionSetupData?.commission_parentag_hiring_locked
                                )
                            )
                        }}
                        name={POSITIONS_SETUP_FIELDS_KEYS.commission_parentag_hiring_locked}
                        checked={positionSetupData?.commission_parentag_hiring_locked}
                    />
                </div>
                {/*end::Form Group */}
                <div className='mt-8  w-100'>
                    <div className='row'>
                        <div className='col text-cmGrey700'>
                            <CustomDropdown
                                label={'Commission Structure'}
                                required
                                options={[{name: 'Fixed', value: 'fixed'}]}
                                placeholder='Select Commission Structure'
                                searching={false}
                                name={POSITIONS_SETUP_FIELDS_KEYS.commission_structure_type}
                                value={positionSetupData?.commission_structure_type?.toLowerCase()}
                                onChange={onChangeInputData}
                            />
                        </div>
                        <PositionLockedView
                            name={
                                POSITIONS_SETUP_FIELDS_KEYS.commission_parentag_type_hiring_locked
                            }
                            checked={positionSetupData?.commission_parentag_type_hiring_locked}
                            onChange={() => {
                                updatePositionSetupData(
                                    POSITIONS_SETUP_FIELDS_KEYS.commission_parentag_type_hiring_locked,
                                    getBooleanValue(
                                        !positionSetupData?.commission_parentag_type_hiring_locked
                                    )
                                )
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PositionSetupStep1
