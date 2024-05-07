import React from 'react'
import {HIRE_FIELD_KEYS} from '../EmployeePageBody'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomDropdown from '../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {BUSINESS_TYPE} from '../../../../../constants/constants'

const EmployeStep2 = ({
    employeeData,
    updateEmployeeData,
    validationMessage,
    globalCompanyProfile,
}) => {
    const onChangeInputData = (e) => {
        updateEmployeeData(e?.target?.name, e?.target?.value)
    }
    return (
        <div className=' w-sm-75 w-100 mx-auto' style={{fontSize: '14px', fontFamily: 'Manrope'}}>
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
                    className='text-cmGrey600 text-center mb-10 required'
                    style={{fontWeight: '700', fontFamily: 'Manrope', fontSize: '16px'}}
                >
                    Enter Tax Information
                </div>
                {/* 1 */}
                <div className='row align-items-center mx-sm-20 mb-5 mx-5'>
                    <div className='col-sm-4 text-cmGrey600  required' style={{fontWeight: '500'}}>
                        Entity Type:
                    </div>
                    <div className='col-sm'>
                        <CustomDropdown
                            value={employeeData?.entity_type}
                            onChange={onChangeInputData}
                            name={HIRE_FIELD_KEYS.entity_type}
                            options={[
                                {name: 'Individual', value: 'individual'},
                                {name: 'Business', value: 'business'},
                            ]}
                            errorMessage={validationMessage?.entity_type}
                        />
                    </div>
                </div>
                {employeeData?.entity_type == 'individual' && (
                    <div className='row align-items-center mx-sm-20 mb-5 mx-5'>
                        <div
                            className='col-sm-4 text-cmGrey600  required'
                            style={{fontWeight: '500'}}
                        >
                            Social Security Number:
                        </div>
                        <div className='col-sm'>
                            <CustomInput
                                value={employeeData?.social_sequrity_no}
                                type={INPUT_TYPE.mobile}
                                onChange={(e) => {
                                    onChangeInputData(e)
                                }}
                                name={HIRE_FIELD_KEYS.social_sequrity_no}
                                placeholder='999-99-9999'
                                mask='999-99-9999'
                                errorMessage={validationMessage?.socialSecurityNumber}
                            />
                        </div>
                    </div>
                )}
                {/* 2 */}
                {employeeData?.entity_type == 'business' && (
                    <>
                        {/* Business Name */}
                        <div className='row align-items-center mx-sm-20 mb-5 mx-5'>
                            <div
                                className='text-cmGrey600 col-sm-4 required'
                                style={{fontWeight: '500'}}
                            >
                                Business Name:
                            </div>
                            <div className='col-sm'>
                                <CustomInput
                                    placeholder=''
                                    onChange={onChangeInputData}
                                    errorMessage={validationMessage?.business_name}
                                    name={HIRE_FIELD_KEYS.business_name}
                                    value={employeeData?.business_name}
                                />
                            </div>
                        </div>
                        {/* Business Type */}
                        <div className='row align-items-center mx-sm-20 mb-5 mx-5'>
                            <div
                                className='text-cmGrey600 col-sm-4 required'
                                style={{fontWeight: '500'}}
                            >
                                Business Type:
                            </div>
                            <div className='col-sm'>
                                <CustomDropdown
                                    value={employeeData?.business_type}
                                    onChange={onChangeInputData}
                                    name={HIRE_FIELD_KEYS.business_type}
                                    options={BUSINESS_TYPE}
                                    errorMessage={validationMessage?.business_type}
                                />
                            </div>
                        </div>
                        {/* Business EIN */}
                        <div className='row align-items-center mx-sm-20 mb-5 mx-5'>
                            <div
                                className='text-cmGrey600 col-sm-4 required'
                                style={{fontWeight: '500'}}
                            >
                                EIN:
                            </div>
                            <div className='col-sm'>
                                <CustomInput
                                    placeholder=''
                                    type={INPUT_TYPE.mobile}
                                    onChange={onChangeInputData}
                                    mask='99-9999999'
                                    errorMessage={validationMessage?.business_ein}
                                    name={HIRE_FIELD_KEYS.business_ein}
                                    value={employeeData?.business_ein}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default EmployeStep2
