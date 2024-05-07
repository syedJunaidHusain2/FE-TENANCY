import React, {useCallback, useEffect, useMemo} from 'react'
import useFilterButton from '../../../../hooks/useFilterButton'
import CustomFilterButton from '../../../../customComponents/customFilterButton/CustomFilterButton'
import CustomDropdown from '../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomRadioButton from '../../../../customComponents/customRadioButton/CustomRadioButton'
import {getRecuiterFilterService} from '../../../../services/Services'
import {getAllStatesAndCitiesSelector} from '../../../../redux/selectors/SettingsSelectors'
import {useSelector} from 'react-redux'
import {displayfilterCounts} from '../../../../helpers/CommonHelpers'

const LeadsTableFilter = ({initialFilter = null, onApplyFilter = null, resetFilter = null}) => {
    const FILTER_KEYS = {
        status: 'status_filter',
        homeState: 'home_state_filter',
        recruiterFilter: 'recruter_filter',
        source: 'source_filter',
    }

    const LEAD_STATUS = [
        {name: 'Follow Up', value: 'Follow Up'},
        {name: 'Interview Scheduled', value: 'Interview Scheduled'},
        {name: 'Interview Rescheduled', value: 'Interview Rescheduled'},
        {name: 'Interview Done', value: 'Interview Done'},
        {name: 'Rejected', value: 'Rejected'},
    ]
    const [filterProps, filterData, setFilterData] = useFilterButton(initialFilter, onApplyFilter)
    const allState = useSelector(getAllStatesAndCitiesSelector)

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
        <div className='text-cmGrey800'>
            <CustomFilterButton
                {...filterProps}
                filterData={filterData}
                onResetClick={resetFilterData}
            >
                {/* Status */}
                <div className='mb-5 text-cmGrey800'>
                    <CustomDropdown
                        label={'Status'}
                        value={filterData?.[FILTER_KEYS.status]}
                        name={FILTER_KEYS.status}
                        onChange={onChangeInputData}
                        options={LEAD_STATUS}
                    />
                </div>
                {/* Home State */}
                <div className='mb-5 text-cmGrey800' style={{fontSize: 'Manrope', fontWeight: 600}}>
                    <CustomDropdown
                        label={'Home State'}
                        value={filterData?.[FILTER_KEYS.homeState]}
                        name={FILTER_KEYS.homeState}
                        onChange={onChangeInputData}
                        options={allState}
                        valueKey='id'
                    />
                </div>
                {/* Recruiter */}
                {/* <div className='mb-5 text-cmGrey800' style={{fontSize: 'Manrope', fontWeight: 600}}>
                    <CustomDropdown
                        label={'Recruiter'}
                        vaue={filterData?.[FILTER_KEYS.recruiterFilter]}
                        name={FILTER_KEYS.recruiterFilter}
                        onChange={onChangeInputData}
                    />
                </div> */}
                {/* Sources */}
                {/* <div className='mb-5 text-cmGrey800' style={{fontSize: 'Manrope', fontWeight: 600}}>
                    <div className='mb-1'>Sources</div>
                    <div className='d-flex align-items-center flex-wrap gap-5'>
                        <CustomRadioButton
                            label='Manual'
                            handleChange={onChangeInputData}
                            isChecked={filterData?.[FILTER_KEYS.source] === 'Manual' ? true : false}
                            value={'Manual'}
                            name={FILTER_KEYS.source}
                        />
                        <CustomRadioButton
                            label='Campaign'
                            handleChange={onChangeInputData}
                            isChecked={
                                filterData?.[FILTER_KEYS.source] === 'Campaign' ? true : false
                            }
                            value={'Campaign'}
                            name={FILTER_KEYS.source}
                        />
                    </div>
                </div> */}
            </CustomFilterButton>
        </div>
    )
}

export default LeadsTableFilter
