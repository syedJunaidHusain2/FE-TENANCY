import React, {useCallback, useMemo} from 'react'
import CustomFilterButton from '../../../../customComponents/customFilterButton/CustomFilterButton'
import useFilterButton from '../../../../hooks/useFilterButton'
import CustomDropdown from '../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {STATUS_DROPDOWN_VALUES} from '../../standard_manager/smRequests/components/RequestsTable'
import {REQUEST_APPROVAL_TYPE_DROPDOWN_VALUES} from '../../../../constants/constants'

const FILTER_KEYS = {
    status: 'status',
    type: 'type',
}

const RequestAndApprovalFilter = ({
    initialFilter = null,
    onApplyFilter = null,
    resetFilter = null,
    showStatusFilter = true,
    filterRef = null,
}) => {
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

    const typeFilterOptionsModifications = useMemo(() => {
        const typeArr = [...REQUEST_APPROVAL_TYPE_DROPDOWN_VALUES]
        let addOnObj = {name: 'Advance', value: 'Advance'}
        typeArr.push(addOnObj)
        return typeArr
    }, [])

    return (
        <CustomFilterButton
            {...filterProps}
            onResetClick={resetFilterData}
            filterData={filterData}
            ref={filterRef}
        >
            {showStatusFilter ? (
                <div className='mb-10'>
                    <CustomDropdown
                        placeholder='Select Status'
                        value={filterData?.[FILTER_KEYS.status]}
                        onChange={onChangeInputData}
                        options={STATUS_DROPDOWN_VALUES}
                        name={FILTER_KEYS.status}
                        // showClear={false}
                        searching={false}
                    />
                </div>
            ) : null}
            <div className='mb-10'>
                <CustomDropdown
                    placeholder='Select Type'
                    value={filterData?.[FILTER_KEYS.type]}
                    onChange={onChangeInputData}
                    options={typeFilterOptionsModifications}
                    searching={false}
                    name={FILTER_KEYS.type}
                />
            </div>
        </CustomFilterButton>
    )
}

export default RequestAndApprovalFilter
