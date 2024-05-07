import Unloack from '../../../../../Setting/Icon/unlock.png'
import {useCallback, useEffect, useMemo} from 'react'
import {useSelector} from 'react-redux'
import _ from 'lodash'
import {
    getCostCenterListSelector,
    getParentChildCostCenterSelector,
} from '../../../../../../../../redux/selectors/SettingsSelectors'
import {PositionLockedView} from '../CreateCompensationAppModal'
import {useDispatch} from 'react-redux'
import {getParentChildCostCenterAction} from '../../../../../../../../redux/actions/SettingActions'
import {getBooleanValue, percentageLimitCheck} from '../../../../../../../../helpers/CommonHelpers'

import CustomDropdown from '../../../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../../../customComponents/customButtton/CustomButton'
import CustomDelete from '../../../../../../../../customComponents/customIcons/CustomDelete'

const PositionSetupStep3 = ({
    POSITIONS_SETUP_FIELDS_KEYS,
    positionSetupData,
    selectedPositionData,
    updatePositionSetupData,
    updateMultiplePositionSetupData,
}) => {
    const dispatch = useDispatch()
    const costCenterList = useSelector(getParentChildCostCenterSelector)
    const handleAdd = () => {
        const tempData = [...positionSetupData?.deduction]
        tempData.push({
            status: 1,
            cost_center_id: null,
            deduction_type: '$',
            ammount_par_paycheck: null,
        })
        updatePositionSetupData(POSITIONS_SETUP_FIELDS_KEYS.deduction, tempData)
    }

    const onChangeDeduction = (e, index, field) => {
        const tempData = [...positionSetupData?.deduction]
        tempData[index][field] = e?.target?.value
        updatePositionSetupData(POSITIONS_SETUP_FIELDS_KEYS.deduction, tempData)
    }

    useEffect(() => {
        dispatch(getParentChildCostCenterAction())
    }, [])

    const onChangeInputData = useCallback(
        (e) => {
            updatePositionSetupData(e?.target?.name, e?.target?.value)
        },
        [updatePositionSetupData]
    )

    const deleteCostHead = (i) => {
        let tempData = {...positionSetupData?.deduction}
        tempData = positionSetupData?.deduction.filter((item, index) => index != i)
        updatePositionSetupData(POSITIONS_SETUP_FIELDS_KEYS.deduction, tempData)
    }

    const onChangeLimit = (e) => {
        let {value, max, name} = e.target
        if (Number(value) <= Number(max)) {
            updatePositionSetupData(name, value)
        }
    }
    const onChangeDeductionLimit = (e, index) => {
        let {value, max, name} = e.target
        if (percentageLimitCheck(max, value)) onChangeDeduction(e, index, 'ammount_par_paycheck')
    }
    const onChangeLimitType = (e) => {
        updatePositionSetupData('limit_ammount', null)
        onChangeInputData(e)
    }
    const onChangeDeductionLimitType = (e, index, field) => {
        const tempData = [...positionSetupData?.deduction]
        tempData[index]['ammount_par_paycheck'] = null
        tempData[index][field] = e?.target?.value
        updatePositionSetupData(POSITIONS_SETUP_FIELDS_KEYS.deduction, tempData)
    }

    const costCenterListWithChilds = useMemo(() => {
        const data = []
        costCenterList.map((item) => {
            data.push({
                name: item?.name,
                value: item?.id,
                disabled: item?.chields?.length > 0,
            })
            if (item?.chields?.length > 0) {
                item?.chields.map((subItem) => {
                    data.push({
                        name: `- ${subItem?.name}`,
                        value: subItem?.id,
                        disabled: false,
                    })
                })
            }
        })
        return data
    }, [costCenterList])

    return (
        <div
            className={`pb-5 ${positionSetupData?.deduction_status === true ? 'h-450px' : null}  `}
            style={{fontSize: '14px', overflowX: 'hidden', overflowY: 'auto'}}
            data-kt-stepper-element='content'
        >
            <div className='w-100'>
                <div className='form-check ml-12px d-flex form-switch form-switch-sm form-check-custom form-check-solid mb-2'>
                    <label
                        className='form-label text-cmGrey900'
                        style={{
                            fontSize: '16px',
                            fontFamily: 'Manrope',
                            fontWeight: '600',
                        }}
                    >
                        Deductions{' '}
                    </label>
                    <input
                        style={{marginTop: '-4px'}}
                        className='form-check-input mx-5 cursor-pointer'
                        type='checkbox'
                        value=''
                        name={POSITIONS_SETUP_FIELDS_KEYS.deduction_status}
                        onChange={() => {
                            const changedStatus = !positionSetupData?.deduction_status

                            if (!changedStatus) {
                                updateMultiplePositionSetupData((val) => ({
                                    ...val,
                                    [POSITIONS_SETUP_FIELDS_KEYS.deduction_status]: 0,
                                    [POSITIONS_SETUP_FIELDS_KEYS.deduction_locked]: 0,
                                    [POSITIONS_SETUP_FIELDS_KEYS.deduction]: [
                                        {
                                            status: 1,
                                            cost_center_id: null,
                                            deduction_type: '$',
                                            ammount_par_paycheck: null,
                                        },
                                    ],
                                    [POSITIONS_SETUP_FIELDS_KEYS.limit_type]: '$',
                                    [POSITIONS_SETUP_FIELDS_KEYS.limit_ammount]: null,
                                }))
                            } else {
                                updatePositionSetupData(
                                    POSITIONS_SETUP_FIELDS_KEYS.deduction_status,
                                    getBooleanValue(changedStatus)
                                )
                            }
                        }}
                        checked={positionSetupData?.deduction_status}
                    />

                    <label
                        className='me-sm-2 text-cmGrey600'
                        style={{
                            marginTop: '-5px',
                            fontFamily: 'Manrope',
                            fontSize: '12px',
                        }}
                    >
                        {positionSetupData.deduction_status ? 'Enabled' : 'Disabled'}
                    </label>
                </div>

                {positionSetupData?.deduction_status ? (
                    <>
                        <PositionLockedView
                            name={POSITIONS_SETUP_FIELDS_KEYS.deduction_locked}
                            onChange={() => {
                                updatePositionSetupData(
                                    POSITIONS_SETUP_FIELDS_KEYS.deduction_locked,
                                    getBooleanValue(!positionSetupData?.deduction_locked)
                                )
                            }}
                            checked={positionSetupData?.deduction_locked}
                        />
                        <div className='container mt-7' style={{}}>
                            <div
                                className='row w-650px g-2 text-cmGrey700 mb-1'
                                style={{fontFamily: 'Manrope', fontSize: '14px', fontWeight: '600'}}
                            >
                                <div className='col-4 required'>Cost Head</div>
                                <div className='col-7 ms-sm-5 required'>Amount per paycheck</div>
                            </div>
                        </div>
                        {positionSetupData?.deduction?.length > 0 &&
                            positionSetupData?.deduction?.map((item, index) => (
                                <div className='container mb-5' key={index}>
                                    <div className='row w-650px  align-items-center gap-5 mb-2'>
                                        <div
                                            className='col-4'
                                            style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                        >
                                            <CustomDropdown
                                                options={costCenterListWithChilds}
                                                onChange={(e) => {
                                                    onChangeDeduction(e, index, 'cost_center_id')
                                                }}
                                                value={item?.cost_center_id}
                                                placeholder='Select Cost Center'
                                            />
                                        </div>
                                        <div
                                            className='col'
                                            style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                        >
                                            <label
                                                className='d-flex gap-5 flex-row'
                                                style={{
                                                    borderRadius: '10px',
                                                }}
                                            >
                                                <CustomInput
                                                    prefixText='$'
                                                    type={INPUT_TYPE.number}
                                                    onChange={(e) => {
                                                        item?.deduction_type == '%'
                                                            ? onChangeDeductionLimit(e, index)
                                                            : onChangeDeduction(
                                                                  e,
                                                                  index,
                                                                  'ammount_par_paycheck'
                                                              )
                                                    }}
                                                    max={100}
                                                    min={0}
                                                    value={item?.ammount_par_paycheck}
                                                    placeholder='Amount'
                                                />
                                            </label>
                                        </div>
                                        <div
                                            className='col'
                                            style={{fontFamily: 'Manrope', fontSize: '14px'}}
                                        >
                                            <CustomDelete onClick={() => deleteCostHead(index)} />
                                        </div>
                                    </div>
                                </div>
                            ))}

                        <div className='d-flex mt-5'>
                            <ul
                                style={{
                                    fontFamily: 'Manrope',
                                    fontWeight: '600',
                                    fontSize: '16px',
                                }}
                                className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent  flex-nowrap'
                            >
                                <li className='nav-item d-flex' onClick={handleAdd}>
                                    <div
                                        style={{
                                            width: '15px',
                                            height: '15px',
                                            cursor: 'pointer',
                                            border: '1px solid #6078EC ',
                                        }}
                                        className='d-flex text-center align-item-center justify-content-center rounded'
                                    >
                                        <b
                                            className='text-cmBlue-Crayola'
                                            style={{marginTop: '-5px', fontFamily: 'Manrope'}}
                                        >
                                            +
                                        </b>
                                    </div>
                                    <span
                                        className='ms-sm-2 text-cmBlue-Crayola'
                                        style={{
                                            fontSize: '14px',
                                            textDecoration: 'underline',
                                            padding: '0px',
                                            cursor: 'pointer',
                                            marginTop: '-3px',
                                            fontFamily: 'Manrope',
                                        }}
                                    >
                                        Add Another
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className='mt-20 pb-10'>
                            <div className=''>
                                <label
                                    className='form-label text-cmGrey900'
                                    style={{
                                        fontSize: '16px',
                                        fontFamily: 'Manrope',
                                        fontWeight: '600',
                                    }}
                                >
                                    Limit
                                </label>
                            </div>
                            <div className=' mt-1 d-flex gap-10' style={{}}>
                                <div className='w-50'>
                                    <CustomInput
                                        suffixText='%'
                                        type={INPUT_TYPE.number}
                                        placeholder={
                                            positionSetupData?.limit_type == '%'
                                                ? 'Enter Percentage'
                                                : 'Enter Amount'
                                        }
                                        name={POSITIONS_SETUP_FIELDS_KEYS.limit_ammount}
                                        value={positionSetupData?.limit_ammount}
                                        // onChange={onChangeInputData}
                                        onChange={
                                            positionSetupData?.limit_type == '%'
                                                ? onChangeLimit
                                                : onChangeInputData
                                        }
                                        max={100}
                                        min={0}
                                    />
                                </div>

                                <div>
                                    <CustomDropdown
                                        name={POSITIONS_SETUP_FIELDS_KEYS.limit}
                                        value={positionSetupData?.limit}
                                        onChange={onChangeInputData}
                                        options={[{name: 'Per Period', value: 'per period'}]}
                                        searching={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    )
}

export default PositionSetupStep3
