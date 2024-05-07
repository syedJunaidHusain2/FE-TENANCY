import {useCallback, useMemo} from 'react'
import CustomFilterButton from '../../../../customComponents/customFilterButton/CustomFilterButton'
import useFilterButton from '../../../../hooks/useFilterButton'
import CustomDropdown from '../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {PENDING_INSTALL_FILTER} from '../../../../constants/constants'
import {useSelector} from 'react-redux'
import {
    getAllClosersSelector,
    getAllSettersSelector,
} from '../../../../redux/selectors/SettingsSelectors'

const FILTER_KEYS = {
    filter_install: 'filter_install',
    filter_closer_setter: 'filter_closer_setter',
    filter_age_of_account: 'filter_age_of_account',
    filter_show_only_account: 'filter_show_only_account',
}

const PendingInstallFilter = ({initialFilter = null, onApplyFilter = null, resetFilter = null}) => {
    const [filterProps, filterData, setFilterData] = useFilterButton(initialFilter, onApplyFilter)
    const closerList = useSelector(getAllClosersSelector)
    const setterList = useSelector(getAllSettersSelector)

    const closerSetterList = useMemo(() => {
        let closerSetterArr = [...closerList, ...setterList]
        return closerSetterArr
    }, [closerList, setterList])

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
        <CustomFilterButton {...filterProps} onResetClick={resetFilterData} filterData={filterData}>
            <div className='mb-5'>
                <CustomDropdown
                    label={'Installer'}
                    options={[{name: 'LGYC', value: 'LGYC'}]}
                    name={FILTER_KEYS.filter_install}
                    value={filterData?.[FILTER_KEYS.filter_install]}
                    onChange={onChangeInputData}
                />
            </div>
            <div className='mb-5'>
                <CustomDropdown
                    label='Closer or Setter'
                    options={closerSetterList}
                    name={FILTER_KEYS.filter_closer_setter}
                    value={filterData?.[FILTER_KEYS.filter_closer_setter]}
                    onChange={onChangeInputData}
                    valueKey='id'
                />
            </div>
            <div className='mb-5'>
                <CustomDropdown
                    label='Age of Accounts'
                    options={PENDING_INSTALL_FILTER.ageOfAccounts}
                    name={FILTER_KEYS.filter_age_of_account}
                    value={filterData?.[FILTER_KEYS.filter_age_of_account]}
                    onChange={onChangeInputData}
                    // valueKey='name'
                />
            </div>{' '}
            <div className=''>
                <CustomDropdown
                    label='Show Only Accounts'
                    options={PENDING_INSTALL_FILTER.showOnlyAccounts}
                    name={FILTER_KEYS.filter_show_only_account}
                    value={filterData?.[FILTER_KEYS.filter_show_only_account]}
                    onChange={onChangeInputData}
                    // valueKey='name'
                />
            </div>
        </CustomFilterButton>
    )
}

export default PendingInstallFilter
