import {useCallback, useState} from 'react'
import {
    addOrUpdateOnboardingDynamicAttributesService,
    deleteOnboardingDynamicAttributesService,
} from '../../../../../../../services/Services'
import {getErrorMessageFromResponse} from '../../../../../../../helpers/CommonHelpers'
import _ from 'lodash'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomDropdown from '../../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {DYNAMIC_FIELD_TYPE} from '../../../../../../../constants/constants'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../../customComponents/customButtton/CustomButton'
import CustomEditIcon from '../../../../../../../customComponents/customIcons/CustomEditIcon'
import CustomDelete from '../../../../../../../customComponents/customIcons/CustomDelete'
import CustomToast from '../../../../../../../customComponents/customToast/CustomToast'
import CustomDialog from '../../../../../../../customComponents/customDialog/CustomDialog'
import CustomLink from '../../../../../../../customComponents/customButtton/CustomLink'

export const ONBOARDING_CONFIGURATION_TYPE = {
    employee_personal_detail: 'employee_personal_detail',
    additional_info_for_employee_to_get_started: 'additional_info_for_employee_to_get_started',
    document_to_update: 'document_to_update',
}

const SingleConfigurationAttributeRow = ({
    data,
    getConfigurationData,
    type = '',
    onDeleteRow = () => {},
    index,
}) => {
    const [item, setItem] = useState(data)
    const [loading, setLoading] = useState(false)
    const [editMode, setEditMode] = useState(data?.id ? false : true)

    const onDeletePress = useCallback(() => {
        CustomDialog.confirm('Are you sure want to delete', () => {
            let body = {}
            if (type == ONBOARDING_CONFIGURATION_TYPE.employee_personal_detail)
                body.employee_personal_detail_id = data?.id
            else if (
                type == ONBOARDING_CONFIGURATION_TYPE.additional_info_for_employee_to_get_started
            )
                body.additional_info_id = data?.id
            else if (type == ONBOARDING_CONFIGURATION_TYPE.document_to_update)
                body.document_type_id = data?.id

            setLoading(true)
            deleteOnboardingDynamicAttributesService(body)
                .then(() => {
                    getConfigurationData().finally(() => {
                        setLoading(false)
                    })
                })
                .catch((e) => {
                    setLoading(false)
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
        })
    }, [data?.id, getConfigurationData, type])

    const onEditPress = useCallback(() => {
        setEditMode(true)
    }, [])

    const onSavePress = useCallback(() => {
        if (!item?.field_name) return CustomToast.error('Enter field name')
        if (!item?.field_type && type != ONBOARDING_CONFIGURATION_TYPE.document_to_update)
            return CustomToast.error('Select field type')
        if (
            item?.field_type == 'dropdown' &&
            (!item?.attribute_option || item?.attribute_option?.length <= 0)
        )
            return CustomToast.error('Add atleast 1 dropdown option')
        if (!item?.field_required) return CustomToast.error('Select field mandatory or mandatory')

        const body = {
            [type]: {
                id: data?.id ?? null,
                field_name: item?.field_name,
                field_type: item?.field_type,
                field_required: item?.field_required,
                attribute_option: item?.attribute_option
                    ? JSON.stringify(item?.attribute_option)
                    : null,
                field_link: item?.field_link,
            },
        }
        setLoading(true)
        addOrUpdateOnboardingDynamicAttributesService(body)
            .then(() => {
                getConfigurationData().finally(() => {
                    setLoading(false)
                    setEditMode(false)
                })
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
                setLoading(false)
            })
    }, [
        data?.id,
        getConfigurationData,
        item?.attribute_option,
        item?.field_link,
        item?.field_name,
        item?.field_required,
        item?.field_type,
        type,
    ])

    const handleDropdownFieldsChange = useCallback(
        (index, value) => {
            let options = [...item?.attribute_option]
            options[index] = value
            setItem((val) => ({
                ...val,
                attribute_option: options,
            }))
        },
        [item?.attribute_option]
    )

    const addDropDownFields = useCallback(() => {
        let options = _.cloneDeep(item?.attribute_option ?? [])
        options.push('')
        setItem((val) => ({
            ...val,
            attribute_option: options,
        }))
    }, [item?.attribute_option])

    const onChangeInputData = useCallback((e) => {
        setItem((val) => ({
            ...val,
            [e?.target?.name]: e?.target?.value,
        }))
    }, [])

    const onDeleteDropdownField = useCallback(
        (index) => {
            let options = [...item?.attribute_option]
            const filteredOptions = options.filter((it, ind) => ind != index)
            setItem((val) => ({
                ...val,
                attribute_option: filteredOptions,
            }))
        },
        [item?.attribute_option]
    )

    return (
        <>
            <tr className='stripRow' style={{verticalAlign: 'middle'}}>
                <td></td>
                <td className=''>
                    {editMode ? (
                        <CustomInput
                            type={INPUT_TYPE.text}
                            placeholder='Enter'
                            onChange={onChangeInputData}
                            value={item?.field_name}
                            name={'field_name'}
                        />
                    ) : (
                        data?.field_name
                    )}
                </td>

                {type != ONBOARDING_CONFIGURATION_TYPE.document_to_update && (
                    <td>
                        {editMode ? (
                            <CustomDropdown
                                options={DYNAMIC_FIELD_TYPE}
                                searching={false}
                                value={item?.field_type}
                                name={'field_type'}
                                onChange={onChangeInputData}
                            />
                        ) : (
                            data?.field_type
                        )}
                    </td>
                )}

                <td>
                    {editMode ? (
                        <CustomDropdown
                            options={[
                                {
                                    name: 'Optional',
                                    value: 'optional',
                                },
                                {
                                    name: 'Mandatory',
                                    value: 'required',
                                },
                            ]}
                            searching={false}
                            value={item?.field_required}
                            name={'field_required'}
                            onChange={onChangeInputData}
                        />
                    ) : data?.field_required == 'required' ? (
                        'Mandatory'
                    ) : (
                        'Optional'
                    )}
                </td>
                {/* {type != ONBOARDING_CONFIGURATION_TYPE.document_to_update && <td></td>} */}
                {type == ONBOARDING_CONFIGURATION_TYPE.document_to_update && (
                    <td>
                        {editMode ? (
                            <CustomInput
                                type={INPUT_TYPE.text}
                                placeholder='Enter'
                                value={item?.field_link}
                                name={'field_link'}
                                onChange={onChangeInputData}
                            />
                        ) : (
                            data?.field_link ?? '-'
                        )}
                    </td>
                )}

                {type != ONBOARDING_CONFIGURATION_TYPE.document_to_update && (
                    <td>
                        {editMode
                            ? null
                            : item?.attribute_option?.length > 0
                            ? item?.attribute_option?.join(', ')
                            : '-'}
                    </td>
                )}

                <td className='d-flex flex-center gap-5'>
                    {editMode ? (
                        <div className='d-flex gap-5'>
                            {loading && editMode ? (
                                <div className='my-auto'>
                                    <i
                                        class='fa-solid fa-circle-notch fa-spin text-cmBlue-Crayola'
                                        style={{fontSize: '20px'}}
                                    ></i>
                                </div>
                            ) : (
                                <i
                                    class='fa-solid fa-square-check text-cmBlue-Crayola cursor-pointer'
                                    style={{fontSize: '35px'}}
                                    onClick={onSavePress}
                                ></i>
                            )}
                            {data?.id ? (
                                <i
                                    class='fa-solid fa-square-xmark text-cmGrey400 cursor-pointer'
                                    style={{fontSize: '35px'}}
                                    onClick={() => {
                                        setEditMode(false)
                                        setItem(data)
                                    }}
                                ></i>
                            ) : null}
                        </div>
                    ) : (
                        <span className='d-flex flex-center gap-5'>
                            <CustomEditIcon onClick={onEditPress} />
                            {!editMode || !data?.id ? (
                                loading && !editMode ? (
                                    <i
                                        class='fa-solid fa-circle-notch fa-spin text-cmError'
                                        style={{fontSize: '20px'}}
                                    ></i>
                                ) : (
                                    <CustomDelete onClick={onDeletePress} />
                                )
                            ) : null}
                        </span>
                    )}
                    {!data?.id ? (
                        <CustomDelete
                            loading={loading && !editMode}
                            onClick={() => onDeleteRow(index)}
                        />
                    ) : null}
                </td>

                {type == ONBOARDING_CONFIGURATION_TYPE.document_to_update && <td></td>}
            </tr>
            {/* Optional Dropdown */}

            {editMode &&
                item?.field_type == 'dropdown' &&
                item?.attribute_option != null &&
                item?.attribute_option?.length > 0 &&
                item?.attribute_option?.map((val, i) => (
                    <tr className='stripRow' key={i}>
                        <td></td>

                        <td className=''>
                            {i === 0 ? (
                                <div
                                    className='text-cmGrey800'
                                    style={{
                                        fontWeight: '600  ',
                                    }}
                                >
                                    Options:
                                </div>
                            ) : null}
                        </td>

                        <td colSpan={2}>
                            <CustomInput
                                type={INPUT_TYPE.text}
                                placeholder='Enter'
                                value={val}
                                onChange={(e) => handleDropdownFieldsChange(i, e.target.value)}
                            />
                        </td>

                        <td>
                            <CustomDelete onClick={() => onDeleteDropdownField(i)} />
                        </td>

                        <td></td>
                    </tr>
                ))}
            {editMode && item?.field_type == 'dropdown' ? (
                <tr>
                    <td></td>
                    <td className='text-center' colSpan={3}>
                        <div className='mx-auto' style={{width: 'fit-content'}}>
                            <CustomLink
                                label={'Add Options'}
                                onClick={addDropDownFields}
                                icon={'bi bi-plus-square  fs-4'}
                            />
                        </div>
                    </td>

                    <td></td>
                    <td></td>
                </tr>
            ) : null}
        </>
    )
}

export default SingleConfigurationAttributeRow
