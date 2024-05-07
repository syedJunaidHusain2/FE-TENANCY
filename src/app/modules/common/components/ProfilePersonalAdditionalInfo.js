import React, {useState, useEffect, useMemo} from 'react'

import Edit from '../../admin/sequidocs/Icon/edit.png'
import {
    updateEmployeeProfileService,
    updateOnBoardingEmployeeDetailService,
} from '../../../../services/Services'
import CustomLoader from '../../../../customComponents/customLoader/CustomLoader'
import {getValidDate} from '../../../../constants/constants'
import AccessRights from '../../../../accessRights/AccessRights'
import {useSelector} from 'react-redux'
import {
    getUserDataSelector,
    isUserSuperAdminSelector,
} from '../../../../redux/selectors/AuthSelectors'
import CustomInput from '../../../../customComponents/customInputs/customInput/CustomInput'
import CustomButton, {BUTTON_TYPE} from '../../../../customComponents/customButtton/CustomButton'
import CustomDropdown from '../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomEditIcon from '../../../../customComponents/customIcons/CustomEditIcon'
import CustomNoData from '../../../../customComponents/customNoData/CustomNoData'

const ProfilePersonalAdditionalInfo = ({
    employeeData,
    updateEmployeeData,
    onSavePress,
    setPersonalLoading,
    setGetStartedLoading,
    personalLoading,
    getStartedLoading,
    getEmployeeProfile,
}) => {
    const [edit, setEdit] = useState(false)
    const [getStartedEdit, setGetStartedEdit] = useState(false)
    const userData = useSelector(getUserDataSelector)
    // const [personalLoading, setPersonalLoading] = useState(false)
    // const [getStartedLoading, setPersonalLoading] = useState(false)
    const isOwnUser = useMemo(
        () => userData?.id == employeeData?.id,
        [employeeData?.id, userData?.id]
    )

    const isSuperAdmin = useSelector(isUserSuperAdminSelector)

    const handleFieldsChange = (main_name, field_name, index, val) => {
        const tempData = {...employeeData}
        tempData[main_name][index]['value'] = val
        updateEmployeeData(main_name, tempData[main_name])
    }

    const handleSave = (name) => {
        if (name == 'personal') setPersonalLoading(true)
        if (name == 'personal') setEdit(false)
        if (name == 'getStarted') setGetStartedEdit(false)
        if (name == 'getStarted') setGetStartedLoading(true)
        onSavePress()
    }

    const ageGroupList = useMemo(() => {})

    const handleCancelAdditionalInfoEdit = () => {
        setPersonalLoading(true)
        setEdit(false)
        getEmployeeProfile()
    }

    const handleCancelGetStartedEdit = () => {
        setGetStartedLoading(true)
        setGetStartedEdit(false)
        getEmployeeProfile()
    }

    return (
        <div className='d-sm-flex gap-20 mt-20 '>
            <div
                className='card bg-smwhite shadow h-auto w-sm-50 mb-20 '
                style={{fontFamily: 'Manrope', fontSize: '14px', position: 'relative'}}
            >
                <CustomLoader full visible={personalLoading} />

                <div className=''>
                    <div className='w-100 mb-0'>
                        <div className='d-flex mx-10 align-items-center justify-content-between align-items-center pt-5'>
                            <div
                                className='text-cmGrey900'
                                style={{
                                    fontWeight: 700,
                                    fontSize: '16px',
                                }}
                            >
                                Additional Information
                            </div>
                            <AccessRights customCondition={isOwnUser || isSuperAdmin}>
                                {!edit && <CustomEditIcon onClick={() => setEdit(!edit)} />}
                                {edit && (
                                    <div className='d-flex gap-2'>
                                        <CustomButton
                                            buttonType={BUTTON_TYPE.error}
                                            buttonLabel='Cancel'
                                            onClick={() => handleCancelAdditionalInfoEdit()}
                                        />
                                        <CustomButton
                                            buttonType={BUTTON_TYPE.secondary}
                                            buttonLabel='Save'
                                            onClick={() => handleSave('personal')}
                                        />
                                    </div>
                                )}
                            </AccessRights>
                        </div>
                        <div className='border-bottom border-cmGrey300 mt-5' />
                        <>
                            {employeeData?.employee_personal_detail instanceof Array ? (
                                employeeData?.employee_personal_detail?.map((item, index) => (
                                    <div className='' key={index}>
                                        <div
                                            className={`py-4 px-sm-20 px-10 bg-${
                                                index % 2 === 0 ? 'cmGrey100' : ''
                                            }`}
                                            style={{fontWeight: 600}}
                                        >
                                            <div className='row w-sm-100 '>
                                                <div className='col-sm text-cmGrey700'>
                                                    {item?.field_name}:
                                                </div>{' '}
                                                {!edit ? (
                                                    <div className='col-sm text-cmgrey900 text-nowrap'>
                                                        {item?.field_type == 'date'
                                                            ? getValidDate(
                                                                  item?.value,
                                                                  'MM/DD/YYYY'
                                                              ) ?? '-'
                                                            : item?.value ?? '-'}
                                                    </div>
                                                ) : (
                                                    <>
                                                        {item?.field_type == 'dropdown' ? (
                                                            <div className='col-sm'>
                                                                <CustomDropdown
                                                                    name={item?.field_name}
                                                                    searching={false}
                                                                    value={item?.value ?? ''}
                                                                    onChange={(e) =>
                                                                        handleFieldsChange(
                                                                            'employee_personal_detail',
                                                                            e.target.name,
                                                                            index,
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    options={item?.attribute_option?.map(
                                                                        (item) => {
                                                                            return {value: item}
                                                                        }
                                                                    )}
                                                                    displayKey={'value'}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className='col-sm'>
                                                                <CustomInput
                                                                    type={item?.field_type}
                                                                    placeholder='Enter Value'
                                                                    value={item?.value}
                                                                    name={item?.field_name}
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
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <CustomNoData
                                    label={'No additional information'}
                                    className={'py-5'}
                                />
                            )}
                        </>

                        {/* </div> */}
                    </div>
                </div>
            </div>
            <div
                className='card bg-smwhite mb-20 shadow h-auto w-sm-50'
                style={{fontFamily: 'Manrope', fontSize: '14px', position: 'relative'}}
            >
                <CustomLoader full visible={getStartedLoading} />

                <div className='w-100 mb-0'>
                    <div className='d-flex mx-10 align-items-center justify-content-between align-items-center pt-5'>
                        <div
                            className='text-cmGrey900'
                            style={{
                                fontWeight: 700,
                                fontSize: '16px',
                            }}
                        >
                            Get Started
                        </div>
                        <AccessRights customCondition={isOwnUser || isSuperAdmin}>
                            {!getStartedEdit && (
                                <CustomEditIcon onClick={() => setGetStartedEdit(true)} />
                            )}
                            {getStartedEdit && (
                                <div className='d-flex gap-2'>
                                    <CustomButton
                                        buttonType={BUTTON_TYPE.error}
                                        buttonLabel='Cancel'
                                        onClick={() => handleCancelGetStartedEdit()}
                                    />
                                    <CustomButton
                                        buttonType={BUTTON_TYPE.secondary}
                                        buttonLabel='Save'
                                        onClick={() => handleSave('getStarted')}
                                    />
                                </div>
                            )}
                        </AccessRights>
                    </div>
                    <div className='border-bottom border-cmGrey300 mt-5' />

                    <>
                        {employeeData?.additional_info_for_employee_to_get_started instanceof
                        Array ? (
                            employeeData?.additional_info_for_employee_to_get_started?.map(
                                (item, index) => (
                                    <div className='' key={index}>
                                        <div
                                            className={`py-4 px-sm-20 px-10 bg-${
                                                index % 2 === 0 ? 'cmGrey100' : ''
                                            }`}
                                            style={{fontWeight: 600}}
                                        >
                                            <div className='row align-items-center  '>
                                                <div className='text-cmGrey700 text-nowrap col-sm-4'>
                                                    {' '}
                                                    {item?.field_name}:
                                                </div>{' '}
                                                {!getStartedEdit ? (
                                                    <div className='text-cmgrey900 col-sm'>
                                                        {item?.field_type == 'date'
                                                            ? getValidDate(
                                                                  item?.value,
                                                                  'MM/DD/YYYY'
                                                              ) ?? '-'
                                                            : item?.value ?? '-'}
                                                    </div>
                                                ) : (
                                                    <>
                                                        {item?.field_type == 'dropdown' ? (
                                                            <div className='col-sm'>
                                                                <CustomDropdown
                                                                    name={item?.field_name}
                                                                    searching={false}
                                                                    value={item?.value ?? ''}
                                                                    onChange={(e) =>
                                                                        handleFieldsChange(
                                                                            'additional_info_for_employee_to_get_started',
                                                                            e.target.name,
                                                                            index,
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    options={item?.attribute_option?.map(
                                                                        (item) => {
                                                                            return {value: item}
                                                                        }
                                                                    )}
                                                                    displayKey={'value'}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className='col-sm'>
                                                                <CustomInput
                                                                    type={item?.field_type}
                                                                    placeholder='Enter Value'
                                                                    name={item.field_name}
                                                                    value={item?.value}
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
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            )
                        ) : (
                            <CustomNoData label={'No info to get started'} className={'py-5'} />
                        )}
                    </>

                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

export default ProfilePersonalAdditionalInfo
