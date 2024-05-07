import React, {useState, useCallback, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import More1 from '../../Setting/components/Path1.png'
import More from '../../Setting/components/Path.png'
import {DYNAMIC_FIELD_TYPE} from '../../../../../constants/constants'
import {
    addOnBoardingConfigurationService,
    getOnBoardingConfigurationService,
    getTemplateListByCategoryService,
} from '../../../../../services/Services'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import {getOnBoardingConfigurationAction} from '../../../../../redux/actions/SettingActions'
import {useDispatch} from 'react-redux'
import {getErrorMessageFromResponse} from '../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../customComponents/customButtton/CustomButton'
import CustomDropdown from '../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomCheckbox from '../../../../../customComponents/customCheckbox/CustomCheckbox'
import CustomDelete from '../../../../../customComponents/customIcons/CustomDelete'
var selectedArr = null
const ConfigureEmploye = () => {
    const navigate = useNavigate()
    const [more, setMore] = useState(false)
    const [more1, setMore1] = useState(false)
    const [more2, setMore2] = useState(false)
    const [configurationData, setConfigurationData] = useState([])
    const [templateDropdown, setTemplateDropdown] = useState(null)
    const [contractToSignData, setContractToSignData] = useState(null)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [checkedAll, setCheckedAll] = useState(false)

    useEffect(() => {
        getConfigurationData()
        const body = {
            category_id: 1,
        }
        getTemplateListByCategoryService(body).then((res) => {
            let data = res?.data?.map((item) => ({id: item?.id, value: item?.template_name}))
            setTemplateDropdown(data)
        })

        dispatch(getOnBoardingConfigurationAction())
    }, [])
    const getConfigurationData = () => {
        setLoading(true)
        const body = {
            id: '1',
        }
        getOnBoardingConfigurationService(body)
            .then((res) => {
                let data = {...res.data?.[0]}
                data['employee_personal_detail'] =
                    data?.employee_personal_detail?.map((res) => ({
                        ...res,
                        attribute_option: JSON.parse(res?.attribute_option ?? '[]'),
                    })) ?? []
                data['additional_info_for_employee_to_get_started'] =
                    data?.additional_info_for_employee_to_get_started?.map((res) => ({
                        ...res,
                        attribute_option: JSON.parse(res?.attribute_option ?? '[]'),
                    })) ?? []

                setConfigurationData(data)
                getAgreementData(data?.select_agreement_to_sign)
            })
            .finally(() => setLoading(false))
    }
    const getAgreementData = (selectedAgreement) => {
        const formBody = {
            category_id: 2,
        }
        getTemplateListByCategoryService(formBody).then((res) => {
            let data = res?.data?.map((item) => ({id: item?.id, value: item?.template_name}))
            let SignDataArr = selectedAgreement?.split(',')

            let checkedData = data?.map((item) => {
                return {...item, isChecked: SignDataArr?.includes((item?.id).toString())}
            })

            setContractToSignData(checkedData)
        })
    }
    const handleAddAnotherPersonalDetail = (name) => {
        const dumbData = {...configurationData}
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
    let arr = []
    const addDropDownFields = (name, index) => {
        const dumbData = {...configurationData}
        if (dumbData?.[name]?.[index]?.['attribute_option']?.length > 0) {
            dumbData[name][index]['attribute_option'] = [
                ...dumbData?.[name]?.[index]?.['attribute_option'],
                '',
            ]
        } else {
            dumbData[name][index]['attribute_option'] = ['']
        }
        // dumbData[name][index]['attribute_option'].push({
        //   id: null,
        //   field_value: null,
        // })
        setConfigurationData(dumbData)
    }
    const onDeleteDropdownField = useCallback(
        (name, itemIndex, subIndex) => {
            let tempData = {...configurationData}

            tempData = configurationData[name]?.map((item, index) => {
                if (index === itemIndex) {
                    item.attribute_option = item?.attribute_option?.filter(
                        (subItem, i) => subIndex != i
                    )
                }

                return item
            })

            setConfigurationData({...configurationData, [name]: tempData})
        },
        [configurationData]
    )

    const handleFieldsChange = (main_name, field_name, index, value) => {
        const tempData = {...configurationData}
        tempData[main_name][index][field_name] = value
        setConfigurationData(tempData)
    }
    const handleDropdownFieldsChange = (main_name, index, value, subIndex) => {
        const tempData = {...configurationData}

        tempData[main_name][index]['attribute_option'][subIndex] = value
        setConfigurationData(tempData)
    }

    const handleChange = (field_name, value) => {
        const tempData = {...configurationData}
        tempData[field_name] = value
        setConfigurationData(tempData)
    }
    const onDeleteField = useCallback(
        (main_name, itemIndex) => {
            let tempData = {...configurationData}
            tempData = configurationData[main_name]?.filter((item, index) => index != itemIndex)

            setConfigurationData({...configurationData, [main_name]: tempData})
        },
        [configurationData]
    )

    const onSaveConfiguration = () => {
        setLoading(true)
        let bodyData = {...configurationData}
        bodyData['employee_personal_detail'] = bodyData?.employee_personal_detail?.map((res) => ({
            ...res,
            attribute_option: JSON.stringify(res?.attribute_option),
        }))
        bodyData['additional_info_for_employee_to_get_started'] =
            bodyData?.additional_info_for_employee_to_get_started?.map((res) => ({
                ...res,
                attribute_option: JSON.stringify(res?.attribute_option),
            }))
        addOnBoardingConfigurationService(bodyData)
            .then(() => navigate(-1))
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => {
                getConfigurationData()
            })
    }
    const handleChceckbox = (id, e) => {
        let updatedData = [...contractToSignData]
        updatedData = updatedData?.map((item) => {
            if (item?.id == id) {
                return {...item, isChecked: e.target.checked}
            } else {
                return item
            }
        })
        selectedArr = updatedData?.filter((item) => item?.isChecked)?.map((item2) => item2?.id)
        setContractToSignData(updatedData)
        if (contractToSignData?.length == selectedArr?.length) setCheckedAll(true)
        else setCheckedAll(false)
        handleChange('select_agreement_to_sign', selectedArr.join(','))
    }
    const selectAllCheckbox = (e) => {
        let selectAllData = contractToSignData?.map((item) => {
            return {...item, isChecked: e.target.checked}
        })
        selectedArr = selectAllData?.filter((item) => item?.isChecked)?.map((item2) => item2?.id)
        setContractToSignData(selectAllData)
        setCheckedAll(e.target.checked)
        handleChange('select_agreement_to_sign', selectedArr.join(','))
    }

    return (
        <div
            className='bg-cmwhite shadow-sm'
            style={{borderRadius: '10px', fontSize: '14px', position: 'relative'}}
        >
            <CustomLoader full visible={loading} />
            <div className='d-flex flex-wrap gap-2 gap-sm-0 justify-content-between align-items-center px-5 py-4'>
                <div className=' d-flex  align-items-center gap-3 text-cmGrey900 mx-auto mx-sm-0'>
                    <span className='bi bi-gear fs-1' />
                    <div
                        style={{
                            fontSize: '18px',
                            fontFamily: 'Manrope',
                            fontWeight: '600',
                        }}
                    >
                        Configuration
                    </div>
                </div>
                <div className='d-flex align-items-center gap-2 mx-sm-0 mx-auto'>
                    <CustomButton
                        buttonType={BUTTON_TYPE.error}
                        buttonLabel='Cancel'
                        onClick={() => navigate(-1)}
                    />
                    <CustomButton
                        buttonType={BUTTON_TYPE.primary}
                        buttonLabel='Save'
                        onClick={() => onSaveConfiguration()}
                    />
                </div>
            </div>

            <div className='m-0 border border-gray-200'></div>

            <div
                className='py-10 px-sm-0 px-3 w-xl-50 mx-sm-10'
                style={{fontFamily: 'Manrope', fontSize: '14px'}}
            >
                {/* Employee ID Settings */}
                <div className=''>
                    <div className='mb-5' style={{fontSize: '16px', fontWeight: '600'}}>
                        Employee ID Settings
                    </div>
                    <div className='ms-sm-10 mb-5'>
                        <div className='mb-1' style={{fontWeight: '600'}}>
                            ID Code
                        </div>
                        <div className='d-flex flex-wrap align-items-center gap-sm-10 gap-5'>
                            <div>
                                <CustomDropdown
                                    options={[
                                        {name: 'Prefix', value: 'prefix'},
                                        {name: 'None', value: 'none'},
                                    ]}
                                    value={configurationData?.prefix}
                                    onChange={(e) => {
                                        handleChange(e.target.name, e.target.value)
                                    }}
                                    name={'prefix'}
                                    showClear={false}
                                    searching={false}
                                />
                            </div>
                            <div>
                                <CustomInput
                                    placeholder='Enter ID Code'
                                    name='id_code'
                                    value={
                                        configurationData?.prefix == 'none'
                                            ? ''
                                            : configurationData?.id_code
                                    }
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='ms-sm-10 mb-5'>
                        <CustomInput
                            label={'ID Code number to start from'}
                            type={INPUT_TYPE.number}
                            placeholder='Enter Number'
                            name='id_code_no_to_start_from'
                            value={configurationData?.id_code_no_to_start_from}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                        />
                    </div>

                    <div
                        className='text-Grey800 mb-5'
                        style={{fontSize: '16px', fontWeight: '600'}}
                    >
                        Offer Letter Settings
                    </div>
                    {/* question */}
                    <div className='mb-10 ms-sm-10'>
                        {/* slect box */}
                        <div className=''>
                            <CustomDropdown
                                label={'Select Offer Letter to send'}
                                name='select_offer_letter_to_send'
                                onChange={(e) => handleChange(e?.target?.name, e?.target?.value)}
                                value={configurationData?.select_offer_letter_to_send}
                                options={templateDropdown}
                                valueKey='id'
                                displayKey='value'
                                placeholder='Select Offer Letter'
                            />
                        </div>
                    </div>

                    <div
                        className='text-Grey800 mb-5'
                        style={{fontSize: '16px', fontWeight: '600'}}
                    >
                        Select Agreements to sign
                    </div>
                    <div
                        className='bg-cmwhite rounded border mb-10 ms-sm-10  border-2'
                        // style={{width: '352px', height: '214px'}}
                    >
                        <div className='d-flex justify-content-between py-2 mx-5 text-cmGrey500'>
                            <div>
                                {selectedArr?.length ?? '0'}/{contractToSignData?.length} selected
                            </div>
                            {/* select box */}
                            {contractToSignData?.length > 0 ? (
                                <div className=''>
                                    <div className='form-check form-check-custom form-check-solid '>
                                        <CustomCheckbox
                                            checked={checkedAll}
                                            onChange={(e) => selectAllCheckbox(e)}
                                        />
                                        <label
                                            className='form-check-label'
                                            style={{fontFamily: 'Manrope'}}
                                        >
                                            Select all
                                        </label>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                        <hr className='m-0' style={{borderTop: '1px solid gray'}} />
                        <div
                            className='d-flex flex-column px-5 mt-5 gap-5 my-auto overflow-auto'
                            style={{height: '150px'}}
                        >
                            {/* check box */}
                            {contractToSignData?.map((item) => (
                                <div className='' key={item?.id}>
                                    <div className='form-check form-check-custom form-check-solid '>
                                        <div>
                                            <CustomCheckbox
                                                checked={item?.isChecked}
                                                name='select_agreement_to_sign'
                                                onChange={(e) => handleChceckbox(item?.id, e)}
                                            />
                                        </div>
                                        <div>
                                            <label
                                                className='form-check-label text-cmGrey600'
                                                style={{
                                                    fontFamily: 'Manrope',
                                                    fontWeight: 500,
                                                    fontSize: '14px',
                                                }}
                                            >
                                                {item?.value}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div
                        className='text-Grey800 mb-5'
                        style={{fontSize: '16px', fontWeight: '600'}}
                    >
                        Employee Personal Details
                        <>
                            {!more ? (
                                <img
                                    style={{
                                        marginLeft: '17px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => setMore(true)}
                                    src={More1}
                                ></img>
                            ) : (
                                <img
                                    style={{
                                        marginLeft: '17px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => setMore(false)}
                                    src={More}
                                ></img>
                            )}
                        </>
                    </div>
                    <div className='ms-sm-10 mb-10'>
                        {more && (
                            <>
                                <div className='text-cmGrey800 mb-2' style={{fontWeight: '600  '}}>
                                    Dynamic Fields
                                </div>
                                {configurationData?.employee_personal_detail?.map((item, index) => (
                                    <>
                                        <div className='mb-5' key={index}>
                                            <div className='row align-items-center gap-5 mb-2'>
                                                <div className='col-sm'>
                                                    <CustomInput
                                                        type={INPUT_TYPE.text}
                                                        placeholder='Enter'
                                                        onChange={(e) =>
                                                            handleFieldsChange(
                                                                'employee_personal_detail',
                                                                e.target.name,
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                        value={item?.field_name}
                                                        name={'field_name'}
                                                    />
                                                </div>

                                                <div className='col-sm'>
                                                    <CustomDropdown
                                                        options={DYNAMIC_FIELD_TYPE}
                                                        searching={false}
                                                        value={item?.field_type}
                                                        name={'field_type'}
                                                        onChange={(e) =>
                                                            handleFieldsChange(
                                                                'employee_personal_detail',
                                                                e.target.name,
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className='col-sm'>
                                                    <CustomDropdown
                                                        options={[
                                                            {name: 'Optional', value: 'optional'},
                                                            {name: 'Mandatory', value: 'required'},
                                                        ]}
                                                        searching={false}
                                                        value={item?.field_required}
                                                        name={'field_required'}
                                                        onChange={(e) =>
                                                            handleFieldsChange(
                                                                'employee_personal_detail',
                                                                e.target.name,
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className='col-sm-1 text-center'>
                                                    <CustomDelete
                                                        onClick={() =>
                                                            onDeleteField(
                                                                'employee_personal_detail',
                                                                index
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            {item?.field_type == 'dropdown' &&
                                                item?.attribute_option != null &&
                                                item?.attribute_option?.length > 0 &&
                                                // JSON.parse(JSON.stringify(item?.attribute_option ?? '[]'))?.map((val, i) => (
                                                item?.attribute_option?.map((val, i) => (
                                                    <div key={i}>
                                                        {i == 0 && (
                                                            <div
                                                                className='text-cmGrey800'
                                                                style={{fontWeight: '600  '}}
                                                            >
                                                                Options:
                                                            </div>
                                                        )}
                                                        <div className='d-flex align-items-center justify-content-center mx-auto gap-5  text-center mb-5'>
                                                            <div className='w-auto'>
                                                                <CustomInput
                                                                    type={INPUT_TYPE.text}
                                                                    placeholder='Enter'
                                                                    value={val}
                                                                    onChange={(e) =>
                                                                        handleDropdownFieldsChange(
                                                                            'employee_personal_detail',
                                                                            index,
                                                                            e.target.value,
                                                                            i
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                            {
                                                                <CustomDelete
                                                                    onClick={() =>
                                                                        onDeleteDropdownField(
                                                                            'employee_personal_detail',
                                                                            index,
                                                                            i
                                                                        )
                                                                    }
                                                                />
                                                            }
                                                        </div>
                                                    </div>
                                                ))}
                                            {item?.field_type == 'dropdown' ? (
                                                <div className='d-flex align-items-center  justify-content-center text-cmBlue-Crayola gap-1'>
                                                    <span
                                                        className='cursor-pointer'
                                                        onClick={() =>
                                                            addDropDownFields(
                                                                'employee_personal_detail',
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <span className='bi bi-plus-square  fs-4'></span>{' '}
                                                        <span className='fw-bold text-decoration-underline'>
                                                            {' '}
                                                            Add Options
                                                        </span>
                                                    </span>
                                                </div>
                                            ) : null}
                                        </div>
                                        {configurationData?.employee_personal_detail.length - 1 ===
                                        index ? null : (
                                            <hr />
                                        )}
                                    </>
                                ))}

                                <div className='d-flex align-items-center text-cmBlue-Crayola gap-1'>
                                    <span
                                        className='cursor-pointer'
                                        onClick={() =>
                                            handleAddAnotherPersonalDetail(
                                                'employee_personal_detail'
                                            )
                                        }
                                    >
                                        <span className='bi bi-plus-square  fs-4'></span>{' '}
                                        <span className='fw-bold text-decoration-underline'>
                                            {' '}
                                            Add Another
                                        </span>
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                    <div
                        className='text-Grey800 mb-5'
                        style={{fontSize: '16px', fontWeight: '600'}}
                    >
                        Additional Info for Employee to Get Started
                        <>
                            {!more1 ? (
                                <img
                                    style={{
                                        marginLeft: '17px',
                                        marginTop: '-3px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => setMore1(true)}
                                    src={More1}
                                ></img>
                            ) : (
                                <img
                                    style={{
                                        marginLeft: '17px',
                                        marginTop: '-3px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => setMore1(false)}
                                    src={More}
                                ></img>
                            )}
                        </>
                    </div>
                    {more1 && (
                        <>
                            <div className='ms-sm-10 mb-10'>
                                <div className='text-cmGrey800 mb-2' style={{fontWeight: '600  '}}>
                                    Dynamic Fields
                                </div>
                                {configurationData?.additional_info_for_employee_to_get_started?.map(
                                    (item, index) => {
                                        return (
                                            <div key={index}>
                                                <div className='mb-5'>
                                                    <div className='row align-items-center gap-5 mb-2 mx-sm-0 mx-2'>
                                                        <div className='col-sm'>
                                                            <CustomInput
                                                                type={INPUT_TYPE.text}
                                                                placeholder='Enter'
                                                                value={item?.field_name}
                                                                name={'field_name'}
                                                                onChange={(e) =>
                                                                    handleFieldsChange(
                                                                        'additional_info_for_employee_to_get_started',
                                                                        e.target.name,
                                                                        index,
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className='col-sm'>
                                                            <CustomDropdown
                                                                options={DYNAMIC_FIELD_TYPE}
                                                                searching={false}
                                                                value={item?.field_type}
                                                                name={'field_type'}
                                                                onChange={(e) =>
                                                                    handleFieldsChange(
                                                                        'additional_info_for_employee_to_get_started',
                                                                        e.target.name,
                                                                        index,
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />
                                                        </div>

                                                        <div className='col-sm'>
                                                            <CustomDropdown
                                                                value={item?.field_required}
                                                                searching={false}
                                                                name={'field_required'}
                                                                onChange={(e) =>
                                                                    handleFieldsChange(
                                                                        'additional_info_for_employee_to_get_started',
                                                                        e.target.name,
                                                                        index,
                                                                        e.target.value
                                                                    )
                                                                }
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
                                                            />
                                                        </div>

                                                        <div className='col-sm-1 text-center'>
                                                            <CustomDelete
                                                                onClick={() =>
                                                                    onDeleteField(
                                                                        'additional_info_for_employee_to_get_started',
                                                                        index
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    {item?.field_type == 'dropdown' &&
                                                        item?.attribute_option != null &&
                                                        item?.attribute_option?.length > 0 &&
                                                        // JSON.parse(JSON.stringify(item?.attribute_option ?? '[]'))?.map((val, i) => (
                                                        item?.attribute_option?.map((val, i) => (
                                                            <>
                                                                {i == 0 && (
                                                                    <div
                                                                        className='text-cmGrey800'
                                                                        style={{
                                                                            fontWeight: '600  ',
                                                                        }}
                                                                    >
                                                                        Options:
                                                                    </div>
                                                                )}
                                                                <div className='d-flex align-items-center justify-content-center mx-auto gap-5 w-sm-75  text-center mb-5'>
                                                                    <CustomInput
                                                                        type={INPUT_TYPE.text}
                                                                        placeholder='Enter'
                                                                        value={val}
                                                                        onChange={(e) =>
                                                                            handleDropdownFieldsChange(
                                                                                'additional_info_for_employee_to_get_started',

                                                                                index,
                                                                                e.target.value,
                                                                                i
                                                                            )
                                                                        }
                                                                    />
                                                                    {
                                                                        <CustomDelete
                                                                            onClick={() =>
                                                                                onDeleteDropdownField(
                                                                                    'additional_info_for_employee_to_get_started',
                                                                                    index,
                                                                                    i
                                                                                )
                                                                            }
                                                                        />
                                                                    }
                                                                </div>
                                                            </>
                                                        ))}
                                                    {item?.field_type == 'dropdown' ? (
                                                        <div className='d-flex align-items-center  justify-content-center text-cmBlue-Crayola gap-1'>
                                                            <span
                                                                className='cursor-pointer'
                                                                onClick={() =>
                                                                    addDropDownFields(
                                                                        'additional_info_for_employee_to_get_started',
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <span className='bi bi-plus-square  fs-4'></span>{' '}
                                                                <span className='fw-bold text-decoration-underline'>
                                                                    {' '}
                                                                    Add Options
                                                                </span>
                                                            </span>
                                                        </div>
                                                    ) : null}
                                                </div>
                                                {configurationData
                                                    ?.additional_info_for_employee_to_get_started
                                                    .length -
                                                    1 ===
                                                index ? null : (
                                                    <hr />
                                                )}
                                            </div>
                                        )
                                    }
                                )}

                                <div className='d-flex align-items-center text-cmBlue-Crayola gap-1 cursor-pointer'>
                                    <span
                                        onClick={() =>
                                            handleAddAnotherPersonalDetail(
                                                'additional_info_for_employee_to_get_started'
                                            )
                                        }
                                    >
                                        <span className='bi bi-plus-square  fs-4 '></span>{' '}
                                        <span className='fw-bold text-decoration-underline'>
                                            {' '}
                                            Add Another
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </>
                    )}

                    <div
                        className='text-Grey800 mb-5'
                        style={{fontSize: '16px', fontWeight: '600'}}
                    >
                        Documents to Upload
                        <>
                            {!more2 ? (
                                <img
                                    style={{
                                        marginLeft: '17px',
                                        marginTop: '-3px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => setMore2(true)}
                                    src={More1}
                                ></img>
                            ) : (
                                <img
                                    style={{
                                        marginLeft: '17px',
                                        marginTop: '-3px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => setMore2(false)}
                                    src={More}
                                ></img>
                            )}
                        </>
                    </div>
                    <div className='ms-sm-10 mb-10'>
                        {more2 && (
                            <>
                                <div className='text-cmGrey800 mb-2' style={{fontWeight: '600  '}}>
                                    Dynamic Fields
                                </div>
                                {configurationData?.document_to_update?.map((item, index) => (
                                    <div key={index}>
                                        <div className='row align-items-center gap-5 mb-5'>
                                            <div className='col-sm-5'>
                                                <CustomInput
                                                    type={INPUT_TYPE.text}
                                                    placeholder='Enter'
                                                    value={item?.field_name}
                                                    name={'field_name'}
                                                    onChange={(e) =>
                                                        handleFieldsChange(
                                                            'document_to_update',
                                                            e.target.name,
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className='col-sm-5'>
                                                <CustomDropdown
                                                    options={[
                                                        {name: 'Optional', value: 'optional'},
                                                        {name: 'Mandatory', value: 'required'},
                                                    ]}
                                                    searching={false}
                                                    value={item?.field_required}
                                                    name={'field_required'}
                                                    onChange={(e) =>
                                                        handleFieldsChange(
                                                            'document_to_update',
                                                            e.target.name,
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className='col-sm text-center'>
                                                <CustomDelete
                                                    onClick={() =>
                                                        onDeleteField('document_to_update', index)
                                                    }
                                                />
                                            </div>
                                        </div>

                                        {configurationData?.document_to_update?.length - 1 ===
                                        index ? null : (
                                            <hr />
                                        )}
                                    </div>
                                ))}

                                <div className='d-flex align-items-center text-cmBlue-Crayola gap-1'>
                                    <span
                                        className='cursor-pointer'
                                        onClick={() =>
                                            handleAddAnotherPersonalDetail('document_to_update')
                                        }
                                    >
                                        <span className='bi bi-plus-square  fs-4'></span>{' '}
                                        <span className='fw-bold text-decoration-underline'>
                                            {' '}
                                            Add Another
                                        </span>
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfigureEmploye
