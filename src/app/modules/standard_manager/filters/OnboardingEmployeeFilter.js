import React, {useCallback, useEffect, useMemo, useState} from 'react'
import useFilterButton from '../../../../hooks/useFilterButton'
import CustomFilterButton from '../../../../customComponents/customFilterButton/CustomFilterButton'
import CustomDropdown from '../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {useSelector} from 'react-redux'
import {getPositionsSelector} from '../../../../redux/selectors/SettingsSelectors'
import useOfficeLocation from '../../../../hooks/useOfficeLocation'
import {getAllManagerListService} from '../../../../services/Services'
import {HIRING_PROCESS_STATUS} from '../../../../constants/constants'

const OnboardingEmployeeFilter = ({
    initialFilter = null,
    onApplyFilter = null,
    resetFilter = null,
    office_id = '',
}) => {
    const FILTER_KEYS = {
        status: 'status_filter',
        position: 'position_filter',
        manager: 'manager_filter',
        office: 'office_id',
        other_status_filter: 'other_status_filter',
    }
    const HIRING_STATUS = [
        {name: 'Offer Letter Resent', value: HIRING_PROCESS_STATUS.offerLetterResent},
        {name: 'Offer Letter Sent', value: HIRING_PROCESS_STATUS.offerLetterSent},
        {name: 'Offer Letter Accepted', value: HIRING_PROCESS_STATUS.offerLetterAccepted},
        {name: 'Offer Expired', value: HIRING_PROCESS_STATUS.offerExpired},
        {name: 'Onboarding', value: HIRING_PROCESS_STATUS.onboarding},
        {name: 'Requested Change', value: HIRING_PROCESS_STATUS.requestedChange},
        {name: 'Admin Rejected', value: HIRING_PROCESS_STATUS.adminRejected},
        {name: 'Offer Letter Rejected', value: HIRING_PROCESS_STATUS.declined},
        {name: 'Draft', value: HIRING_PROCESS_STATUS.draft},
        {name: 'Hire Now', value: HIRING_PROCESS_STATUS.accepted},
    ]
    // Lead Status

    const [filterProps, filterData, setFilterData] = useFilterButton(
        initialFilter,
        onApplyFilter,
        resetFilter
    )
    const positionList = useSelector(getPositionsSelector)
    const [stateList] = useOfficeLocation(null, false)
    const [managerList, setManagerList] = useState([])

    const onChangeInputData = useCallback(
        (e) => {
            setFilterData((val) => ({
                ...val,
                [e?.target?.name]: e?.target?.value,
            }))
        },
        [setFilterData]
    )
    useEffect(() => {
        setManagerList([])
        getAllManagerListService(office_id)
            .then((res) => {
                setManagerList(res?.data)
            })
            .finally(() => {})
    }, [office_id])

    const managerNames = useMemo(() => {
        return managerList?.map((item) => ({
            ...item,
            name: `${item?.first_name}  ${item?.last_name}`,
        }))
    }, [managerList])

    return (
        <div className='text-cmGrey800'>
            <CustomFilterButton {...filterProps} filterData={filterData}>
                {/* Status */}
                <div className='mb-5 text-cmGrey800' style={{fontSize: 'Manrope', fontWeight: 600}}>
                    <CustomDropdown
                        label={'Status'}
                        value={filterData?.[FILTER_KEYS.status]}
                        name={FILTER_KEYS.status}
                        onChange={(e) => {
                            setFilterData((val) => ({
                                ...val,
                                status_filter: e?.target?.value,
                            }))
                        }}
                        options={HIRING_STATUS}
                    />
                </div>
                {/* Position */}
                <div className='mb-5 text-cmGrey800' style={{fontSize: 'Manrope', fontWeight: 600}}>
                    <CustomDropdown
                        label={'Position'}
                        value={filterData?.[FILTER_KEYS.position]}
                        name={FILTER_KEYS.position}
                        onChange={onChangeInputData}
                        options={positionList}
                        displayKey='position'
                        valueKey='id'
                    />
                </div>
                {/* Office */}
                {/* <div className='mb-5 text-cmGrey800' style={{fontSize: 'Manrope', fontWeight: 600}}>
                    <CustomDropdown
                        label={'Office'}
                        value={filterData?.[FILTER_KEYS.office]}
                        name={FILTER_KEYS.office}
                        onChange={onChangeInputData}
                        options={stateList}
                    />
                </div> */}
                {/* Manager */}
                <div className='mb-5 text-cmGrey800' style={{fontSize: 'Manrope', fontWeight: 600}}>
                    <CustomDropdown
                        label={'Manager'}
                        value={filterData?.[FILTER_KEYS.manager]}
                        name={FILTER_KEYS.manager}
                        onChange={onChangeInputData}
                        options={managerNames}
                        valueKey='id'
                    />
                </div>
            </CustomFilterButton>
        </div>
    )
}

export default OnboardingEmployeeFilter
