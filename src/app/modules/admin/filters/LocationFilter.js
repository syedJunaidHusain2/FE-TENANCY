import React, {useCallback, useEffect, useMemo, useState} from 'react'
import CustomFilterButton from '../../../../customComponents/customFilterButton/CustomFilterButton'
import CustomInput from '../../../../customComponents/customInputs/customInput/CustomInput'
import useFilterButton from '../../../../hooks/useFilterButton'
import CustomDropdown from '../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {getAllStatesAndCitiesSelector} from '../../../../redux/selectors/SettingsSelectors'
import {useSelector} from 'react-redux'
import {displayfilterCounts} from '../../../../helpers/CommonHelpers'

const FILTER_KEYS = {
    location: 'location',
    state: 'state',
}

const LocationFilter = ({initialFilter = null, onApplyFilter = null, resetFilter = null}) => {
    const [filterProps, filterData, setFilterData] = useFilterButton(initialFilter, onApplyFilter)
    const allStateCity = useSelector(getAllStatesAndCitiesSelector)

    const locationOptions = [
        {
            name: 'With Work Site Id',
            value: 'withWorkSiteId',
        },
        {
            name: 'With Installer',
            value: 'withInstallers',
        },
        {
            name: 'With Only Redline',
            value: 'withOnlyStandard',
        },
    ]
    const stateOptions = useMemo(() => {
        return allStateCity?.map((item) => ({name: item?.name, value: item?.state_code}))
    }, [allStateCity])

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
            <div className='mb-10'>
                <CustomDropdown
                    label={'Show Location'}
                    options={locationOptions}
                    name={FILTER_KEYS.location}
                    value={filterData?.[FILTER_KEYS.location]}
                    onChange={onChangeInputData}
                />
            </div>
            <div className='mb-10'>
                <CustomDropdown
                    label='State'
                    options={stateOptions}
                    name={FILTER_KEYS.state}
                    value={filterData?.[FILTER_KEYS.state]}
                    onChange={onChangeInputData}
                    // valueKey='name'
                />
            </div>
        </CustomFilterButton>
    )
}

export default LocationFilter
