import React, {useCallback, useMemo} from 'react'
import useFilterButton from '../../../../hooks/useFilterButton'
import CustomFilterButton from '../../../../customComponents/customFilterButton/CustomFilterButton'
import CustomDropdown from '../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomRadioButton from '../../../../customComponents/customRadioButton/CustomRadioButton'
import { displayfilterCounts } from '../../../../helpers/CommonHelpers'

const FILTER_KEYS = {
    severity: 'severity',
    type: 'type',
    action: 'action',
}

const SeverityOptions = [
    {
        name: 'High',
        value: 'High',
    },
    {
        name: 'Low',
        value: 'Low',
    },
    {
        name: 'Medium',
        value: 'Medium',
    },
]
const TypeOptions = [
    {
        name: 'Missing Info',
        value: 'Missing Info',
    },
    {
        name: 'ClawBack',
        value: 'ClawBack',
    },
    {
        name: 'Office',
        value: 'Office',
    },
    {
        name: 'Adders',
        value: 'adders',
    },
]
const AlertCenterFilter = ({initialFilter = null, onApplyFilter = null}) => {
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
    const filter = useMemo(() => {
        return displayfilterCounts(filterData)
    })

    return (
        <div>
            <CustomFilterButton {...filterProps} filterCount={filter}>
                <div className='mb-5 text-cmGrey800' style={{fontSize: 'Manrope', fontWeight: 600}}>
                    <CustomDropdown
                        label={'Severity'}
                        value={filterData?.[FILTER_KEYS.severity]}
                        name={FILTER_KEYS.severity}
                        onChange={onChangeInputData}
                        options={SeverityOptions}
                    />
                </div>
                <div className='mb-5 text-cmGrey800' style={{fontSize: 'Manrope', fontWeight: 600}}>
                    <CustomDropdown
                        label={'Type'}
                        value={filterData?.[FILTER_KEYS.type]}
                        name={FILTER_KEYS.type}
                        onChange={onChangeInputData}
                        options={TypeOptions}
                    />
                </div>
                <div className='mb-5 text-cmGrey800' style={{fontSize: 'Manrope', fontWeight: 600}}>
                    <div className='mb-1'>Action</div>
                    <div className='d-flex align-items-center gap-5'>
                        <CustomRadioButton
                            label='Resolved'
                            handleChange={onChangeInputData}
                            isChecked={
                                filterData?.[FILTER_KEYS.action] === 'Resolved' ? true : false
                            }
                            value={'Resolved'}
                            name={FILTER_KEYS.action}
                        />
                        <CustomRadioButton
                            label='Pending'
                            handleChange={onChangeInputData}
                            isChecked={
                                filterData?.[FILTER_KEYS.action] === 'Pending' ? true : false
                            }
                            value={'Pending'}
                            name={FILTER_KEYS.action}
                        />
                    </div>
                </div>
            </CustomFilterButton>
        </div>
    )
}

export default AlertCenterFilter
