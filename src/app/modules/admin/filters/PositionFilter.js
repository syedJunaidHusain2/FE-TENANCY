import React, {useCallback, useEffect, useMemo, useState} from 'react'
import CustomFilterButton from '../../../../customComponents/customFilterButton/CustomFilterButton'
import CustomInput from '../../../../customComponents/customInputs/customInput/CustomInput'
import useFilterButton from '../../../../hooks/useFilterButton'
import {Checkbox} from 'primereact/checkbox'
import CustomDropdown from '../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomRadioButton from '../../../../customComponents/customRadioButton/CustomRadioButton'
import {getPermissionGroupListAction} from '../../../../redux/actions/PermissionsActions'
import {getDepartmentDropdownService} from '../../../../services/Services'
import {getPosittionMailRolesAction} from '../../../../redux/actions/SettingActions'
import {getPermissionsGroupListSelector} from '../../../../redux/selectors/PermissionsSelectors'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import usePayFrequency from '../../../../hooks/usePayFrequency'
import {displayfilterCounts} from '../../../../helpers/CommonHelpers'

const FILTER_KEYS = {
    payFrequency: 'pay_frequency_filter',
    department: 'department',
    overrideSettelment: 'override_settelement',
    permissionGroup: 'permission_group',
}
const PositionFilter = ({initialFilter = null, onApplyFilter = null, onResetFilter = null}) => {
    const [filterProps, filterData, setFilterData] = useFilterButton(
        initialFilter,
        onApplyFilter,
        onResetFilter
    )
    const dispatch = useDispatch()
    const [departmentlist, setDepartmentList] = useState([])
    const permissionGroupList = useSelector(getPermissionsGroupListSelector)
    const {weekDropdownList} = usePayFrequency()
    useEffect(function () {
        // dispatch(getPermissionGroupListAction())
        getDepartmentDropdownService().then((res) => {
            setDepartmentList(res.data)
        })
        dispatch(getPosittionMailRolesAction())
    }, [])
    const onChangeInputData = useCallback(
        (e) => {
            setFilterData((val) => ({
                ...val,
                [e?.target?.name]: e?.target?.value,
            }))
        },
        [setFilterData]
    )

    return (
        <CustomFilterButton {...filterProps} filterData={filterData}>
            <div className='mb-5 text-cmGrey800' style={{fontSize: 'Manrope', fontWeight: 600}}>
                <CustomDropdown
                    label={'Pay Frequency'}
                    searching={false}
                    value={filterData?.[FILTER_KEYS.payFrequency]}
                    name={FILTER_KEYS.payFrequency}
                    onChange={onChangeInputData}
                    options={weekDropdownList}
                    valueKey='frequency_type_id'
                />
            </div>
            <div className='mb-5 text-cmGrey800' style={{fontSize: 'Manrope', fontWeight: 600}}>
                <CustomDropdown
                    label={'Department'}
                    value={filterData?.[FILTER_KEYS.department]}
                    name={FILTER_KEYS.department}
                    onChange={onChangeInputData}
                    options={departmentlist}
                    valueKey='id'
                />
            </div>
            <div className='mb-5 text-cmGrey800' style={{fontSize: 'Manrope', fontWeight: 600}}>
                <div className='mb-1'>Override Settlement</div>
                <div className='d-flex align-items-center gap-5'>
                    <CustomRadioButton
                        label={'With M2'}
                        handleChange={onChangeInputData}
                        isChecked={filterData?.[FILTER_KEYS.overrideSettelment] === 'During M2'}
                        value={'During M2'}
                        name={FILTER_KEYS.overrideSettelment}
                    />
                    <CustomRadioButton
                        label={'Reconciliation'}
                        handleChange={onChangeInputData}
                        isChecked={
                            filterData?.[FILTER_KEYS.overrideSettelment] === 'Reconciliation'
                        }
                        value={'Reconciliation'}
                        name={FILTER_KEYS.overrideSettelment}
                    />
                </div>
            </div>
            <div className='mb-5 text-cmGrey800' style={{fontSize: 'Manrope', fontWeight: 600}}>
                <CustomDropdown
                    label={'Permission Group'}
                    value={filterData?.[FILTER_KEYS.permissionGroup]}
                    name={FILTER_KEYS.permissionGroup}
                    onChange={onChangeInputData}
                    options={permissionGroupList}
                    displayKey='group_name'
                    valueKey='group_id'
                />
            </div>
        </CustomFilterButton>
    )
}

export default PositionFilter
