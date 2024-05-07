import React from 'react'
import {HIRE_FIELD_KEYS} from '../EmployeePageBody'
import CustomDropdown from '../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomDatePicker from '../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
const EmployeeStep5 = ({
    employeeData,
    updateEmployeeData,
    DataFields,
    validationMessage,
    globalCompanyProfile,
}) => {
    const onChangeInputData = (fieldName, index, e) => {
        let data = [...employeeData?.additional_info_for_employee_to_get_started]
        data[index].value = e?.target?.value
        updateEmployeeData(e?.target?.name, data)
    }

    return (
        <div className='w-sm-75 w-100 mx-auto' style={{fontSize: '14px', fontFamily: 'Manrope'}}>
            <div className='text-cmGrey500 text-center mb-10 '>
                Welcome to <span className='text-cmGrey800'> {globalCompanyProfile?.name}</span>,
                Please Complete The Following Fields. Please ensure the following information is
                correct before proceeding to the next section.
            </div>
            <div
                className='bg-cmwhite shadow-sm mb-10 w-sm-75 w-100 mx-auto py-5 '
                style={{borderRadius: '10px'}}
            >
                <div
                    className='text-cmGrey600 text-center mb-10'
                    style={{fontWeight: '700', fontFamily: 'Manrope', fontSize: '16px'}}
                >
                    Let us know your sizes so we can get you started!
                    <br></br>
                    <div className='text-cmError' style={{fontWeight: '400', fontSize: '12px'}}>
                        {validationMessage?.additionalGetStartedFieldError}
                    </div>
                </div>
                {/* 1 */}
                {employeeData?.additional_info_for_employee_to_get_started?.length > 0 ? (
                    employeeData?.additional_info_for_employee_to_get_started?.map(
                        (item, index) =>
                            !item?.is_deleted && (
                                <>
                                    {item?.field_type == 'dropdown' ? (
                                        <div className='row align-items-center px-sm-20 py-2 px-5'>
                                            <div
                                                className={`col-sm-3 text-nowrap text-cmGrey600 ${item?.field_required}`}
                                                style={{fontWeight: '500'}}
                                            >
                                                {item?.field_name}:
                                            </div>
                                            <div className='col-sm '>
                                                <CustomDropdown
                                                    onChange={(e) =>
                                                        onChangeInputData(
                                                            item?.field_name,
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    value={item.value}
                                                    options={item?.attribute_option?.map((item) => {
                                                        return {name: item, value: item}
                                                    })}
                                                    name={
                                                        HIRE_FIELD_KEYS.additional_info_for_employee_to_get_started
                                                    }
                                                    placeholder='Select size'
                                                />
                                            </div>
                                        </div>
                                    ) : null}
                                    {item?.field_type == 'text' || item?.field_type == 'number' ? (
                                        <div className='row align-items-center px-sm-20 py-2 px-5'>
                                            <div
                                                className={`col-sm-3 text-nowrap text-cmGrey600 ${item?.field_required}`}
                                                style={{fontWeight: '500'}}
                                            >
                                                {item?.field_name}:
                                            </div>
                                            <div className='col-sm '>
                                                <CustomInput
                                                    placeholder='Enter'
                                                    type={item?.field_type}
                                                    onChange={(e) =>
                                                        onChangeInputData(
                                                            item?.field_name,
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    // errorMessage={validationMessage?.emergencyName}
                                                    value={item?.value}
                                                    name={
                                                        HIRE_FIELD_KEYS.additional_info_for_employee_to_get_started
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ) : null}
                                    {item?.field_type == 'date' && (
                                        <div className='row align-items-center px-sm-20 py-2 px-5'>
                                            <div
                                                className={`col-sm-3 text-nowrap text-cmGrey600 ${item?.field_required}`}
                                                style={{fontWeight: '500'}}
                                            >
                                                {item?.field_name}:
                                            </div>
                                            <div className='col-sm'>
                                                <CustomDatePicker
                                                    className={'my-0 '}
                                                    name={
                                                        HIRE_FIELD_KEYS.additional_info_for_employee_to_get_started
                                                    }
                                                    value={item?.value}
                                                    onChange={(e) =>
                                                        onChangeInputData(
                                                            item?.field_name,
                                                            index,
                                                            e
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {item?.field_type == 'phone number' && (
                                        <div className='row align-items-center px-sm-20 py-2 px-5'>
                                            <div
                                                className={`col-sm-3 text-nowrap text-cmGrey600 ${item?.field_required}`}
                                                style={{fontWeight: '500'}}
                                            >
                                                {item?.field_name}:
                                            </div>
                                            <div className='col-sm'>
                                                <CustomInput
                                                    type={INPUT_TYPE.mobile}
                                                    name={
                                                        HIRE_FIELD_KEYS.additional_info_for_employee_to_get_started
                                                    }
                                                    onChange={(e) =>
                                                        onChangeInputData(
                                                            item?.field_name,
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    value={item?.value}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </>
                            )
                    )
                ) : (
                    <div className='text-center'>No Get Started fields are there</div>
                )}
            </div>
        </div>
    )
}

export default EmployeeStep5
