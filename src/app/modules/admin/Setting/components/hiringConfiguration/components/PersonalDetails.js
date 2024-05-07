import React, {useCallback, useMemo, useState} from 'react'
import _ from 'lodash'
import CustomArrow, {
    ARROW_DIRECTION,
} from '../../../../../../../customComponents/customIcons/CustomIcons'
import CustomEditIcon from '../../../../../../../customComponents/customIcons/CustomEditIcon'
import CustomDropdown from '../../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../../customComponents/customButtton/CustomButton'
import CustomDelete from '../../../../../../../customComponents/customIcons/CustomDelete'
import {DYNAMIC_FIELD_TYPE} from '../../../../../../../constants/constants'
import {
    addOnBoardingConfigurationService,
    addOrUpdateOnboardingDynamicAttributesService,
} from '../../../../../../../services/Services'
import CustomToast from '../../../../../../../customComponents/customToast/CustomToast'
import {getErrorMessageFromResponse} from '../../../../../../../helpers/CommonHelpers'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'
import SingleConfigurationAttributeRow, {
    ONBOARDING_CONFIGURATION_TYPE,
} from './SingleConfigurationAttributeRow'

const PersonalDetails = ({configurationData, setConfigurationData, getConfigurationData}) => {
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
            tempData = configurationData?.employee_personal_detail?.filter(
                (item, index) => index != itemIndex
            )

            setConfigurationData({
                ...configurationData,
                employee_personal_detail: tempData,
            })
        },
        [configurationData, setConfigurationData]
    )
    return (
        <div
            className='bg-cmwhite shadow-sm text-cmGrey800'
            style={{borderRadius: 10, position: 'relative'}}
        >
            <div className='d-flex flex-wrap gap-3 align-items-center justify-content-between px-10 py-5 '>
                <div className='d-flex flex-center gap-5'>
                    <div className='text-cmGrey900' style={{fontSize: 16, fontWeight: 700}}>
                        Employee Additional Personal Details
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
                            style={{tableLayout: 'fixed', fontWeight: 600, width: '100%'}}
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
                                    <th className='w-75px'></th>
                                    {/* <th className='w-50px'></th> */}
                                    {/* <th className='w-50px'></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {configurationData?.employee_personal_detail?.length > 0 &&
                                    configurationData?.employee_personal_detail.map(
                                        (item, index) =>
                                            !item?.is_deleted && (
                                                <SingleConfigurationAttributeRow
                                                    data={item}
                                                    getConfigurationData={getConfigurationData}
                                                    type={
                                                        ONBOARDING_CONFIGURATION_TYPE.employee_personal_detail
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
                                            onClick={() => addNewRow('employee_personal_detail')}
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

export default PersonalDetails
