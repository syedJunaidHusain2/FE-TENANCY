import React, {useCallback, useMemo} from 'react'
import useFilterButton from '../../../../hooks/useFilterButton'
import CustomFilterButton from '../../../../customComponents/customFilterButton/CustomFilterButton'
import CustomInput from '../../../../customComponents/customInputs/customInput/CustomInput'
import CustomDropdown from '../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {useSelector} from 'react-redux'
import {getPositionsSelector} from '../../../../redux/selectors/SettingsSelectors'
import CustomCheckbox from '../../../../customComponents/customCheckbox/CustomCheckbox'
import {displayfilterCounts} from '../../../../helpers/CommonHelpers'

const FILTER_KEYS = {
    position: 'position_filter',
    netPay: 'netpay_filter',
    commission: 'commission_filter',
}

const RunPayrollFilter = ({initialFilter = null, onApplyFilter = null, resetFilter = null}) => {
    const [filterProps, filterData, setFilterData] = useFilterButton(initialFilter, onApplyFilter)
    const positionList = useSelector(getPositionsSelector)
    const RUNPAYROLL_STATUS = [
        // {name: 'Moved To Next Payroll', value: '4'},
        // {name: 'Skipped', value: '5'},
        {name: 'Negative Amount', value: 'negative_amount'},
    ]
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
    }, [filterData])

    return (
        <CustomFilterButton {...filterProps} onResetClick={resetFilterData} filterData={filterData}>
            {/* Position */}
            {/* <div className='mb-5 text-cmGrey800' style={{fontSize: 'Manrope', fontWeight: 600}}>
                <CustomDropdown
                    label={'Position'}
                    value={filterData?.[FILTER_KEYS.position]}
                    name={FILTER_KEYS.position}
                    onChange={onChangeInputData}
                    options={positionList}
                    displayKey='position'
                    valueKey='id'
                />
            </div> */}
            {/* Net pay (Payroll) */}
            <div className='mb-5 text-cmGrey800' style={{fontSize: 'Manrope', fontWeight: 600}}>
                <CustomDropdown
                    label={'Net pay (Payroll)'}
                    value={filterData?.[FILTER_KEYS.netPay]}
                    name={FILTER_KEYS.netPay}
                    onChange={onChangeInputData}
                    options={RUNPAYROLL_STATUS}
                />
            </div>
            {/* <div className='mb-5 d-flex align-items-center gap-3'>
                <CustomCheckbox />
                <div className='text-cmGrey800' style={{fontSize: 'Manrope', fontWeight: 600}}>
                    Commissions are $0
                </div>
            </div> */}
        </CustomFilterButton>
    )
}

export default RunPayrollFilter
