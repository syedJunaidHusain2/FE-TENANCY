import React, {useEffect, useState} from 'react'
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
import CustomToast from '../../../../../../../customComponents/customToast/CustomToast'
import {addOnBoardingConfigurationService} from '../../../../../../../services/Services'
import {getErrorMessageFromResponse} from '../../../../../../../helpers/CommonHelpers'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'

const EmployeeIdSettings = ({
    configurationData,
    setConfigurationData,
    isEmployeeIdAlreadySet,
    getConfigurationData,
}) => {
    const [openCard, setOpenCard] = useState(true)
    const [editMode, setEditMode] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleOpenCard = () => {
        setOpenCard(!openCard)
    }
    const handleEditMode = () => {
        setLoading(true)
        getConfigurationData()
        setEditMode(!editMode)
        setLoading(false)
    }

    const handleChange = (field_name, value) => {
        const tempData = {...configurationData}
        tempData[field_name] = value
        setConfigurationData(tempData)
    }

    const onSavePress = () => {
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
            .then(() => CustomToast.success('Employee ID Settings Updated'))
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => {
                // getConfigurationData()
                setLoading(false)
                handleEditMode()
            })
    }

    return (
        <div
            className='bg-cmwhite shadow-sm text-cmGrey800'
            style={{borderRadius: 10, position: 'relative'}}
        >
            <CustomLoader full visible={loading} />

            <div
                className='px-10 py-5 text-cmGrey500 border-bottom border-cmGrey200 border-2'
                style={{fontSize: 16, fontWeight: 600}}
            >
                Hiring Configurations
            </div>
            <div className='d-flex flex-wrap gap-3 align-items-center justify-content-between px-10 py-5 '>
                <div className='d-flex flex-center gap-5'>
                    <div className='text-cmGrey900' style={{fontSize: 16, fontWeight: 700}}>
                        Employee ID Settings
                    </div>
                    <CustomArrow
                        arrowDirection={openCard ? ARROW_DIRECTION.down : ARROW_DIRECTION.right}
                        onClick={handleOpenCard}
                    />
                </div>
                {openCard ? (
                    <>
                        {' '}
                        {editMode ? (
                            <div className='d-flex gap-5'>
                                <CustomButton
                                    buttonLabel='Cancel'
                                    buttonType={BUTTON_TYPE.greyText}
                                    onClick={handleEditMode}
                                />
                                <CustomButton
                                    buttonLabel='Save'
                                    buttonType={BUTTON_TYPE.secondary}
                                    padding={'px-10'}
                                    onClick={onSavePress}
                                />
                            </div>
                        ) : (
                            <CustomEditIcon onClick={handleEditMode} />
                        )}{' '}
                    </>
                ) : null}
            </div>
            {/* Display screen */}
            {openCard ? (
                <>
                    {editMode ? (
                        <>
                            <div className='bg-strip w-100 mx-auto row py-5 align-items-center'>
                                <div className='col-lg-3 col-sm-4 text-sm-end'>
                                    Employee ID Code:
                                </div>
                                <div className='col-sm d-flex align-itmes-center gap-5 '>
                                    <div>
                                        <CustomDropdown
                                            options={[
                                                {name: 'Prefix', value: 'prefix'},
                                                {name: 'None', value: 'none'},
                                            ]}
                                            disabled={isEmployeeIdAlreadySet.id_code}
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
                                            disabled={isEmployeeIdAlreadySet.id_code}
                                            name='id_code'
                                            value={
                                                configurationData?.prefix == 'none'
                                                    ? ''
                                                    : configurationData?.id_code
                                            }
                                            onChange={(e) =>
                                                handleChange(e.target.name, e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='row py-5 w-100 mx-auto align-items-center'>
                                <div className='col-lg-3 col-sm-4  text-sm-end'>
                                    Employee ID Code number to start from:
                                </div>
                                <div className='col-sm mw-sm-325px'>
                                    <CustomInput
                                        type={INPUT_TYPE.number}
                                        placeholder='Enter Number'
                                        name='id_code_no_to_start_from'
                                        // disabled={isEmployeeIdAlreadySet.id_code_no_to_start_from}
                                        value={configurationData?.id_code_no_to_start_from}
                                        onChange={(e) =>
                                            handleChange(e.target.name, e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <hr className='my-1 text-cmGrey400' />
                            <div className='bg-strip w-100 mx-auto row py-5 align-items-center'>
                                <div className='col-lg-3 col-sm-4 text-sm-end'>
                                    {' '}
                                    OnBoarding ID Code:
                                </div>
                                <div className='col-sm d-flex align-itmes-center gap-5 '>
                                    <div>
                                        <CustomDropdown
                                            options={[
                                                {name: 'Prefix', value: 'prefix'},
                                                {name: 'None', value: 'none'},
                                            ]}
                                            disabled={isEmployeeIdAlreadySet.onbording_id_code}
                                            value={configurationData?.onbording_prefix}
                                            onChange={(e) => {
                                                handleChange(e.target.name, e.target.value)
                                            }}
                                            name={'onbording_prefix'}
                                            showClear={false}
                                            searching={false}
                                        />
                                    </div>
                                    <div>
                                        <CustomInput
                                            placeholder='Enter OnBoarding ID Code'
                                            disabled={isEmployeeIdAlreadySet.onbording_id_code}
                                            name='onbording_id_code'
                                            value={
                                                configurationData?.prefix == 'none'
                                                    ? ''
                                                    : configurationData?.onbording_id_code
                                            }
                                            onChange={(e) =>
                                                handleChange(e.target.name, e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='row py-5 w-100 mx-auto align-items-center'>
                                <div className='col-lg-3 col-sm-4  text-sm-end'>
                                    OnBoarding ID Code number to start from:
                                </div>
                                <div className='col-sm mw-sm-325px'>
                                    <CustomInput
                                        type={INPUT_TYPE.number}
                                        placeholder='Enter Number'
                                        name='onbording_id_code_no_to_start_from'
                                        // disabled={isEmployeeIdAlreadySet.onbording_id_code_no_to_start_from}
                                        value={
                                            configurationData?.onbording_id_code_no_to_start_from
                                        }
                                        onChange={(e) =>
                                            handleChange(e.target.name, e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='bg-strip w-100 mx-auto row py-5'>
                                <div className='col-lg-3 col-sm-4 col text-sm-end'>ID Code:</div>
                                <div className='col d-flex align-itmes-center gap-5 '>
                                    <div>{configurationData?.prefix ?? '--'}</div>
                                    <div>{configurationData?.id_code ?? '--'}</div>
                                </div>
                            </div>
                            <div className='row py-5 w-100 mx-auto'>
                                <div className='col-lg-3 col-sm-4 col text-sm-end'>
                                    ID Code number to start from:
                                </div>
                                <div className='col-sm text-cmGrey900'>
                                    {configurationData?.id_code_no_to_start_from ?? '--'}
                                </div>
                            </div>
                            <hr className='my-2 text-cmGrey300' />
                            <div className='bg-strip w-100 mx-auto row py-5'>
                                <div className='col-lg-3 col-sm-4 col text-sm-end'>
                                    OnBoarding ID Code:
                                </div>
                                <div className='col d-flex align-itmes-center gap-5 '>
                                    <div>{configurationData?.prefix ?? '--'}</div>
                                    <div>{configurationData?.onbording_id_code ?? '--'}</div>
                                </div>
                            </div>
                            <div className='row py-5 w-100 mx-auto'>
                                <div className='col-lg-3 col-sm-4 col text-sm-end'>
                                    OnBoarding ID Code number to start from:
                                </div>
                                <div className='col-sm text-cmGrey900'>
                                    {configurationData?.onbording_id_code_no_to_start_from ?? '--'}
                                </div>
                            </div>
                        </>
                    )}
                </>
            ) : null}
        </div>
    )
}

export default EmployeeIdSettings
