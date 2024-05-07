import React, {useCallback, useState} from 'react'
import CustomArrow, {
    ARROW_DIRECTION,
} from '../../../../../../../customComponents/customIcons/CustomIcons'
import SingleConfigurationAttributeRow, {
    ONBOARDING_CONFIGURATION_TYPE,
} from './SingleConfigurationAttributeRow'

const DocumentToUpload = ({configurationData, setConfigurationData, getConfigurationData}) => {
    const [openCard, setOpenCard] = useState(true)

    // Edit mode data handlers

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
            tempData = configurationData?.document_to_update?.filter(
                (item, index) => index != itemIndex
            )

            setConfigurationData({...configurationData, document_to_update: tempData})
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
                        Documents to Upload
                    </div>
                    <CustomArrow
                        arrowDirection={openCard ? ARROW_DIRECTION.down : ARROW_DIRECTION.right}
                        onClick={handleOpenCard}
                    />
                </div>
            </div>

            {openCard ? (
                <>
                    <div className='table-responsive'>
                        <table
                            className='table text-cmGrey800'
                            style={{tableLayout: 'fixed', fontWeight: 600, width: '100%'}}
                        >
                            <thead>
                                <tr
                                    className='text-cmGrey600'
                                    style={{fontSize: 12, fontWeight: 500}}
                                >
                                    <th className='w-50px'></th>
                                    <th className='w-150px'>Description</th>
                                    <th className='w-150px'>Condition</th>
                                    <th className='w-150px'>Link</th>
                                    <th className='w-75px'></th>
                                    <th className='w-100px'></th>
                                    {/* <th className='w-50px'></th> */}
                                    {/* <th className='w-50px'></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {configurationData?.document_to_update?.length > 0 &&
                                    configurationData?.document_to_update?.map(
                                        (item, index) =>
                                            !item?.is_deleted && (
                                                <SingleConfigurationAttributeRow
                                                    data={item}
                                                    getConfigurationData={getConfigurationData}
                                                    type={
                                                        ONBOARDING_CONFIGURATION_TYPE.document_to_update
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
                                            onClick={() => addNewRow('document_to_update')}
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

export default DocumentToUpload
