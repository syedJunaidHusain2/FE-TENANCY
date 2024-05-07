import React, {useCallback, useMemo} from 'react'
import useFilterButton from '../../../../hooks/useFilterButton'
import CustomFilterButton from '../../../../customComponents/customFilterButton/CustomFilterButton'
import CustomDropdown from '../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {useSelector} from 'react-redux'
import {getPositionsSelector} from '../../../../redux/selectors/SettingsSelectors'
import {displayfilterCounts} from '../../../../helpers/CommonHelpers'

const FILTER_KEYS = {
    installer: 'installer_filter',
    status: 'status_filter',
    dateWith: 'date_filter',
}

const SalesReportFilter = ({initialFilter = null, onApplyFilter = null, resetFilter = null}) => {
    const [filterProps, filterData, setFilterData] = useFilterButton(initialFilter, onApplyFilter)
    const positionList = useSelector(getPositionsSelector)
    const ACCOUNT_WITH = [
        {name: 'M1 Date', value: 'm1_date'},
        {name: 'M2 Date', value: 'm2_date'},
        {name: 'M1 & M2 Date', value: 'm1_date_m2_date'},
        {name: 'Cancel Date', value: 'cancel_date'},
    ]
    const STATUS = [
        {name: 'Installed', value: ''},
        {name: 'Permits', value: ''},
        {name: 'Site Survey', value: ''},
        {name: 'PTO', value: ''},
    ]
    const INSTALLER = [{name: 'LGYC', value: 'LGYC'}]
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
        <CustomFilterButton {...filterProps} filterData={filterData} onResetClick={resetFilterData}>
            {/* Position */}
            <div className='mb-5 text-cmGrey800' style={{fontSize: 'Manrope', fontWeight: 600}}>
                <CustomDropdown
                    label={'Installer'}
                    value={filterData?.[FILTER_KEYS.installer]}
                    name={FILTER_KEYS.installer}
                    onChange={onChangeInputData}
                    options={INSTALLER}
                />
            </div>
            {/* Net pay (Payroll) */}
            {/* <div className='mb-5 text-cmGrey800' style={{fontSize: 'Manrope', fontWeight: 600}}>
                <CustomDropdown
                    label={'Status'}
                    value={filterData?.[FILTER_KEYS.status]}
                    name={FILTER_KEYS.status}
                    onChange={onChangeInputData}
                    options={STATUS}
                />
            </div> */}
            <div className='mb-5 text-cmGrey800' style={{fontSize: 'Manrope', fontWeight: 600}}>
                <CustomDropdown
                    label={'Show Accounts With'}
                    value={filterData?.[FILTER_KEYS.dateWith]}
                    name={FILTER_KEYS.dateWith}
                    onChange={onChangeInputData}
                    options={ACCOUNT_WITH}
                />
            </div>
        </CustomFilterButton>
    )
}

export default SalesReportFilter
