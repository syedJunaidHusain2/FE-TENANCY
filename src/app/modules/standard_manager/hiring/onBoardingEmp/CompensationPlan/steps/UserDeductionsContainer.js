import 'react-datepicker/dist/react-datepicker.css'
import {HIRE_FIELD_KEYS} from '../../../../../../../constants/constants'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomNoData from '../../../../../../../customComponents/customNoData/CustomNoData'

const UserDeductionsContainer = ({employeeData, updateEmployeeData}) => {
    return (
        <div
            className='mb-sm-15 gap-5 px-5'
            style={{fontSize: '14px'}}
            data-kt-stepper-element='content'
        >
            {employeeData?.deduction?.length > 0 ? (
                <>
                    {employeeData?.deduction?.map((item, index) => (
                        <div className='my-5'>
                            <CustomInput
                                type={INPUT_TYPE.currency}
                                label={item?.cost_center_name}
                                prefixText={item?.deduction_type == '$' ? '$' : ''}
                                suffixText={item?.deduction_type == '%' ? '%' : ''}
                                name='ammount_par_paycheck'
                                value={item?.ammount_par_paycheck}
                                onChange={(e) => {
                                    const data = [...employeeData?.deduction]
                                    data[index].ammount_par_paycheck = e?.target?.value
                                    updateEmployeeData(HIRE_FIELD_KEYS.deduction, data)
                                }}
                            />
                        </div>
                    ))}
                </>
            ) : (
                // <span className='d-flex flex-center mt-20 text-cmGrey600'>No deduction Found</span>
                <CustomNoData label={'No deduction Found'} className={'py-5'} />
            )}
        </div>
    )
}

export default UserDeductionsContainer
