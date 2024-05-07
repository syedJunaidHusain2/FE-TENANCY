import React, {useCallback, useMemo} from 'react'
import useFilterButton from '../../../../hooks/useFilterButton'
import CustomDropdown from '../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomFilterButton from '../../../../customComponents/customFilterButton/CustomFilterButton'
import CustomDatePicker from '../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import {getParentCostCenterSelector} from '../../../../redux/selectors/SettingsSelectors'
import {useSelector} from 'react-redux'
import {displayfilterCounts} from '../../../../helpers/CommonHelpers'

const FILTER_KEYS = {
    employee: 'employee',
    costHead: 'cost_Head',
    approvedBy: 'approved_By',
    requestedOn: 'requested_On',
}

const CorporateFilter = ({initialFilter = null, onApplyFilter = null, resetFilter}) => {
    const costcenter = useSelector(getParentCostCenterSelector)

    const [filterProps, filterData, setFilterData] = useFilterButton(initialFilter, onApplyFilter)

    const onChangeInputData = useCallback(
        (e) => {
            setFilterData((val) => ({
                ...val,
                [e?.target?.name]: e?.target?.value,
            }))
        },
        [setFilterData]
    )

    const resetFilterData = useCallback(() => {
        setFilterData(initialFilter)
        resetFilter()
    }, [initialFilter, resetFilter, setFilterData])

    return (
        <div>
            <CustomFilterButton
                {...filterProps}
                filterData={filterData}
                onResetClick={resetFilterData}
            >
                <div className='mb-5 text-cmGrey800' style={{fontSize: 'Manrope', fontWeight: 600}}>
                    <CustomDropdown label={'Employee'} value={null} name={null} onChange={null} />
                </div>
                <div className='mb-5 text-cmGrey800' style={{fontSize: 'Manrope', fontWeight: 600}}>
                    <CustomDropdown
                        label={'Cost Head'}
                        options={costcenter}
                        onChange={onChangeInputData}
                        name={FILTER_KEYS.costHead}
                        value={filterData?.[FILTER_KEYS.costHead]}
                        valueKey='id'
                    />
                </div>
                <div className='mb-5 text-cmGrey800' style={{fontSize: 'Manrope', fontWeight: 600}}>
                    <CustomDropdown
                        label={'Approved By'}
                        value={filterData?.[FILTER_KEYS.corporate]}
                        name={FILTER_KEYS.corporate}
                        onChange={onChangeInputData}
                    />
                </div>
                <div className='mb-5 text-cmGrey800' style={{fontSize: 'Manrope', fontWeight: 600}}>
                    <div className='mb-1'>Requested on</div>
                    <CustomDatePicker
                        value={filterData?.[FILTER_KEYS.requestedOn]}
                        name={FILTER_KEYS.requestedOn}
                        onChange={onChangeInputData}
                    />
                </div>
            </CustomFilterButton>
        </div>
    )
}

export default CorporateFilter
