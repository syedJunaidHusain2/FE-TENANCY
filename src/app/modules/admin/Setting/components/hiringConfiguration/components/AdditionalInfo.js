import React, {useCallback, useState} from 'react'
import CustomArrow, {
    ARROW_DIRECTION,
} from '../../../../../../../customComponents/customIcons/CustomIcons'
import SingleConfigurationAttributeRow, {
    ONBOARDING_CONFIGURATION_TYPE,
} from './SingleConfigurationAttributeRow'

const AdditionalInfo = ({configurationData, setConfigurationData, getConfigurationData}) => {
    const [openCard, setOpenCard] = useState(true)

    const handleOpenCard = () => {
        setOpenCard(!openCard)
    }

    const addNewRow = (name) => {
        let dumbData = {...configurationData}
        if (!dumbData?.[name]) dumbData[name] = []
        dumbData[name].push({
            id: null,
            field_name: null,
            field_type: 'text',
            field_required: 'optional',
            configuration_id: null,
            attribute_option: null,
        })
        setConfigurationData(dumbData)
    }

    const onDeleteRow = useCallback(
        (itemIndex) => {
            let tempData = {...configurationData}
            tempData = configurationData?.additional_info_for_employee_to_get_started?.filter(
                (item, index) => index != itemIndex
            )

            setConfigurationData({
                ...configurationData,
                additional_info_for_employee_to_get_started: tempData,
            })
        },
        [configurationData, setConfigurationData]
    )
    return (
        <div
            className='bg-cmwhite shadow-sm text-cmGrey800'
            style={{borderRadius: 10, position: 'relative'}}
        >
            <div className='d-flex  flex-wrap gap-3 align-items-center justify-content-between px-10 py-5 '>
                <div className='d-flex flex-center gap-5'>
                    <div className='text-cmGrey900' style={{fontSize: 16, fontWeight: 700}}>
                        Additional Info for Employee to Get Started
                    </div>
                    <CustomArrow
                        arrowDirection={openCard ? ARROW_DIRECTION.down : ARROW_DIRECTION.right}
                        onClick={handleOpenCard}
                    />
                </div>
            </div>
            {/* Display screen */}
            {openCard ? (
                <>
                    <div className='table-responsive'>
                        <table
                            className='table text-cmGrey800'
                            style={{tableLayout: 'fixed', fontWeight: 600}}
                        >
                            <thead>
                                <tr
                                    className='text-cmGrey600'
                                    style={{fontSize: 12, fontWeight: 500}}
                                >
                                    <th className='w-50px'></th>
                                    <th className='w-150px'>Description</th>
                                    <th className='w-150px'>Output</th>
                                    <th className='w-150px'>Condition</th>
                                    <th className='w-100px'>Options(If Any)</th>
                                    <th className='w-75px '></th>
                                    {/* <th className='w-50px'></th> */}
                                    {/* <th className='w-50px'></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {configurationData?.additional_info_for_employee_to_get_started
                                    ?.length > 0 &&
                                    configurationData?.additional_info_for_employee_to_get_started.map(
                                        (item, index) =>
                                            !item?.is_deleted && (
                                                <SingleConfigurationAttributeRow
                                                    data={item}
                                                    getConfigurationData={getConfigurationData}
                                                    type={
                                                        ONBOARDING_CONFIGURATION_TYPE.additional_info_for_employee_to_get_started
                                                    }
                                                    onDeleteRow={onDeleteRow}
                                                    index={index}
                                                />
                                            )
                                    )}
                                <tr>
                                    <td></td>
                                    <td className='text-cmBlue-Crayola ' colSpan={5}>
                                        <div
                                            className='d-flex gap-3 align-items-center cursor-pointer'
                                            onClick={() =>
                                                addNewRow(
                                                    'additional_info_for_employee_to_get_started'
                                                )
                                            }
                                            style={{width: 'fit-content'}}
                                        >
                                            <div className='bi bi-plus-square' />
                                            <div>Add Another</div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            ) : null}
        </div>
    )
}

export default AdditionalInfo
