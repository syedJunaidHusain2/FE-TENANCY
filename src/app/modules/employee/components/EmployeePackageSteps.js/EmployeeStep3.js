import React from 'react'
import {HIRE_FIELD_KEYS} from '../EmployeePageBody'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomDropdown from '../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {BANKING_TYPE_OF_ACCOUNT} from '../../../../../constants/constants'

const EmployeeStep3 = ({
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
                    Enter Banking Information
                </div>
                {/* 1 */}
                <div className='d-flex flex-wrap gap-sm-0 gap-3 align-items-center px-sm-20 py-2 px-5'>
                    <div className='text-cmGrey600 w-sm-50 required' style={{fontWeight: '500'}}>
                        Name of Bank:
                    </div>
                    <div className='w-sm-50 w-100'>
                        <CustomInput
                            placeholder='Enter Bank Name'
                            onChange={onChangeInputData}
                            errorMessage={validationMessage?.bankName}
                            name={HIRE_FIELD_KEYS.name_of_bank}
                            value={employeeData?.name_of_bank}
                        />
                    </div>
                </div>
                {/* 2 */}
                <div className='d-flex flex-wrap gap-sm-0 gap-3 bg-cmGrey100 align-items-center py-2 px-sm-20 px-5'>
                    <div className='text-cmGrey600 w-sm-50 required' style={{fontWeight: '500'}}>
                        Routing Number:
                    </div>
                    <div className='w-sm-50 w-100'>
                        {' '}
                        <CustomInput
                            placeholder='xxxxxxxxx'
                            onChange={onChangeInputData}
                            errorMessage={validationMessage?.routingNumber}
                            name={HIRE_FIELD_KEYS.routing_no}
                            value={employeeData?.routing_no}
                            type={INPUT_TYPE.mobile}
                            mask='999999999'
                            // password
                        />
                    </div>
                </div>

                <div className='d-flex flex-wrap gap-sm-0 gap-3 align-items-center px-sm-20 py-2 px-5'>
                    <div className='text-cmGrey600 w-sm-50 required' style={{fontWeight: '500'}}>
                        Account Name:
                    </div>
                    <div className='w-sm-50 w-100'>
                        <CustomInput
                            placeholder='Enter Account Name'
                            onChange={onChangeInputData}
                            errorMessage={validationMessage?.account_name}
                            name={HIRE_FIELD_KEYS.account_name}
                            value={employeeData?.account_name}
                        />
                    </div>
                </div>

                {/* 3 */}
                <div className='d-flex flex-wrap gap-sm-0 gap-3 align-items-center px-sm-20 py-2 px-5'>
                    <div className='text-cmGrey600 w-sm-50 required' style={{fontWeight: '500'}}>
                        Account Number:
                    </div>
                    <div className='w-sm-50 w-100'>
                        <CustomInput
                            placeholder='Enter Account Number'
                            onChange={onChangeInputData}
                            errorMessage={validationMessage?.accNumber}
                            name={HIRE_FIELD_KEYS.account_no}
                            value={employeeData?.account_no}
                            type={INPUT_TYPE.number}
                        />
                    </div>
                </div>

                {/* 4 */}
                <div className='d-flex flex-wrap gap-sm-0 gap-3 bg-cmGrey100 align-items-center px-sm-20 py-2 px-5'>
                    <div className='text-cmGrey600 w-sm-50 required' style={{fontWeight: '500'}}>
                        Confirm Account Number:
                    </div>
                    <div className='w-sm-50 w-100'>
                        <CustomInput
                            placeholder='Confirm Account Number'
                            onChange={onChangeInputData}
                            errorMessage={validationMessage?.confirmAccNumber}
                            name={HIRE_FIELD_KEYS.confirm_account_no}
                            value={employeeData?.confirm_account_no}
                            type={INPUT_TYPE.number}
                        />
                    </div>
                </div>
                {/* 4 */}
                <div className='d-flex flex-wrap gap-sm-0 gap-3 align-items-center px-sm-20 py-2 px-5'>
                    <div className='text-cmGrey600 w-sm-50 required' style={{fontWeight: '500'}}>
                        Type of Account:
                    </div>
                    <div className='w-sm-50 w-100'>
                        <CustomDropdown
                            name={HIRE_FIELD_KEYS.type_of_account}
                            value={employeeData?.type_of_account}
                            onChange={onChangeInputData}
                            searching={false}
                            errorMessage={validationMessage?.accType}
                            options={BANKING_TYPE_OF_ACCOUNT}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeStep3
