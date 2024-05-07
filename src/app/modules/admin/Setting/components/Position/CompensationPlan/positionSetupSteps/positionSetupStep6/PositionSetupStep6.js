import {useMemo} from 'react'
import {useSelector} from 'react-redux'
import {getPayFrequencySettingSelector} from '../../../../../../../../../redux/selectors/SettingsSelectors'
import CustomDropdown from '../../../../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'

const PositionSetupStep6 = ({
    POSITIONS_SETUP_FIELDS_KEYS,
    positionSetupData,
    updateMultiplePositionSetupData,
}) => {
    const getPayFrequencyData = useSelector(getPayFrequencySettingSelector)

    const weekDropdownList = useMemo(() => {
        let weekName = []
        getPayFrequencyData?.map((item, index) => {
            if (item.status) {
                weekName.push({...item, name: item?.frequency_type_name})
            }
        })
        return weekName
    }, [getPayFrequencyData])
    return (
        <div
            data-kt-stepper-element='content'
            className='mt-5'
            style={{fontFamily: 'Manrope', fontSize: '14px'}}
        >
            <table className='w-100'>
                <tbody>
                    {/* Line 1 */}
                    <tr>
                        <td>
                            <div
                                className='text-cmGrey900 mb-5 required'
                                style={{fontWeight: '600'}}
                            >
                                Pay Frequency:
                            </div>
                        </td>
                        <td>
                            <div className='mb-1'>
                                <CustomDropdown
                                    placeholder='Select Pay Frquency'
                                    name={POSITIONS_SETUP_FIELDS_KEYS.frequency_type_id}
                                    value={positionSetupData?.frequency_type_id}
                                    onChange={(e) => {
                                        updateMultiplePositionSetupData((val) => ({
                                            ...val,
                                            [POSITIONS_SETUP_FIELDS_KEYS.frequency_type_id]:
                                                e?.target?.value,
                                        }))
                                    }}
                                    options={weekDropdownList}
                                    valueKey='frequency_type_id'
                                />
                            </div>
                            <div
                                className='text-cmGrey500'
                                style={{fontWeight: '500', fontSize: '12px'}}
                            >
                                How often your employees in this position get paid?{' '}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default PositionSetupStep6
