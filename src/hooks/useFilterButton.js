import {useCallback, useMemo, useState} from 'react'

const useFilterButton = (initialFilter, onApplyFilter, onResetFilter) => {
    const [storedFilteredData, setStoredFilteredData] = useState(initialFilter)
    const [filterData, setFilterData] = useState(initialFilter)

    const onApplyClick = useCallback(() => {
        onApplyFilter(filterData)
        setStoredFilteredData(filterData)
    }, [filterData, onApplyFilter])

    const onResetClick = useCallback(() => {
        onResetFilter()
        setFilterData(initialFilter)
        onApplyFilter(initialFilter)
        setStoredFilteredData(storedFilteredData)
    }, [initialFilter, onApplyFilter, onResetFilter, storedFilteredData])

    const onCancelClick = useCallback(() => {
        setFilterData(storedFilteredData)
    }, [storedFilteredData])

    const filterProps = useMemo(
        () => ({
            onApplyClick,
            onResetClick,
            onCancelClick,
        }),
        [onApplyClick, onCancelClick, onResetClick]
    )

    return [filterProps, filterData, setFilterData]
}

export default useFilterButton
