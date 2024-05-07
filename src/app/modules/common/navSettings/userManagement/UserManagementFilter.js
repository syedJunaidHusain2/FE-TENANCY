import React, {useCallback, useEffect, useMemo} from 'react'
import CustomFilterButton from '../../../../../customComponents/customFilterButton/CustomFilterButton'
import CustomDropdown from '../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {CommonLabel} from '../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomRadioButton from '../../../../../customComponents/customRadioButton/CustomRadioButton'
import CustomCheckbox from '../../../../../customComponents/customCheckbox/CustomCheckbox'
import useFilterButton from '../../../../../hooks/useFilterButton'
import {getPositionsSelector} from '../../../../../redux/selectors/SettingsSelectors'
import {useSelector} from 'react-redux'
import useOfficeLocation from '../../../../../hooks/useOfficeLocation'
import {getPositionsAction} from '../../../../../redux/actions/SettingActions'
import {useDispatch} from 'react-redux'

const UserManagementFilter = ({initialFilter = null, onApplyFilter = null, resetFilter = null}) => {
    const [filterProps, filterData, setFilterData] = useFilterButton(initialFilter, onApplyFilter)
    const positionList = useSelector(getPositionsSelector)
    const [officeList] = useOfficeLocation()
    const dispatch = useDispatch()

    const FILTER_KEYS = {
        Position: 'position_filter',
        Office: 'office_filter',
        Status: 'status_filter',
        showOnlyAdmins: 'showAdmin_filter',
    }

    useEffect(() => {
        dispatch(getPositionsAction())
    }, [])

    // const positionData = userManagementList?.data?.data?.map((item) => {
    //     return item?.position_detail
    // })
    // const officeData = userManagementList?.data?.data?.map((item) => {
    //     return item?.office
    // })
    const onChangeInputData = useCallback(
        (e) => {
            let newValue
            if (e?.target?.type === 'checkbox') {
                newValue = e.target.checked ? 1 : 0
            } else {
                newValue = e?.target?.value
            }
            setFilterData((val) => ({
                ...val,
                [e?.target?.name]: newValue,
            }))
        },
        [setFilterData]
    )
    const resetFilterData = useCallback(() => {
        setFilterData(initialFilter)
        resetFilter()
    }, [initialFilter, resetFilter, setFilterData])

    return (
        <CustomFilterButton {...filterProps} filterData={filterData} onResetClick={resetFilterData}>
            <div className='mb-5'>
                <CustomDropdown
                    label={'Position'}
                    options={positionList}
                    value={filterData?.[FILTER_KEYS.Position]}
                    name={FILTER_KEYS.Position}
                    onChange={onChangeInputData}
                    displayKey='position_name'
                    valueKey='id'
                />
            </div>
            <div className='mb-5'>
                <CustomDropdown
                    label='Office Name'
                    options={officeList}
                    value={filterData?.[FILTER_KEYS.Office]}
                    name={FILTER_KEYS.Office}
                    onChange={onChangeInputData}
                />
            </div>
            <div className='mb-5'>
                <div className='mb-1'>
                    <CommonLabel label='Status' />
                </div>
                <div className='d-flex align-items-center gap-20'>
                    <CustomRadioButton
                        label={'Active'}
                        handleChange={onChangeInputData}
                        isChecked={filterData?.[FILTER_KEYS.Status] == '0'}
                        value={'0'}
                        name={FILTER_KEYS.Status}
                    />
                    <CustomRadioButton
                        label={'Inactive'}
                        handleChange={onChangeInputData}
                        isChecked={filterData?.[FILTER_KEYS.Status] == '1'}
                        value={'1'}
                        name={FILTER_KEYS.Status}
                    />
                </div>
            </div>
            <div className='mb-5 d-flex align-items-center gap-3'>
                <CustomCheckbox
                    checked={filterData?.showAdmin_filter == 1 ? true : false}
                    value={filterData?.[FILTER_KEYS?.showOnlyAdmins]}
                    name={FILTER_KEYS.showOnlyAdmins}
                    onChange={onChangeInputData}
                />
                <CommonLabel label='Show only Admins' />
            </div>
        </CustomFilterButton>
    )
}

export default UserManagementFilter
