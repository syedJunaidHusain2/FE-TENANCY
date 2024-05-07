import {useSelector} from 'react-redux'
import {geyAllStatesWithOfficesSelector} from '../../../../../../../redux/selectors/SettingsSelectors'
import {HIRE_FIELD_KEYS} from '../../../../../../../constants/constants'
import CustomInput, {
    CommonLabel,
    INPUT_TYPE,
} from '../../../../../../../customComponents/customInputs/customInput/CustomInput'
import useOfficeLocation from '../../../../../../../hooks/useOfficeLocation'
import {useCallback, useEffect, useMemo} from 'react'
import CustomDropdown from '../../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import _ from 'lodash'
import {Button} from 'primereact/button'
const UserPersonalDetailContainer = ({
    employeeData,
    updateEmployeeData,
    updateMultipleKeysOfEmployeeData,
}) => {
    const allStatesWithOffices = useSelector(geyAllStatesWithOfficesSelector)

    const onChangeInputData = (e) => {
        updateEmployeeData(e?.target?.name, e?.target?.value)
    }

    const officeList = useMemo(() => {
        return (
            allStatesWithOffices?.length > 0 &&
            allStatesWithOffices?.find((item) => item?.id == employeeData?.state_id)?.office
        )
    }, [allStatesWithOffices, employeeData?.state_id])

    const onChangeWorkEmail = useCallback(
        (value, index) => {
            const empWorkEmailData = _.cloneDeep(employeeData?.work_email)
            empWorkEmailData[index].email = value
            updateEmployeeData(HIRE_FIELD_KEYS.work_email, empWorkEmailData)
        },
        [employeeData?.work_email, updateEmployeeData]
    )

    const onCancelWorkEmailPress = useCallback(
        (index) => {
            const data = _.cloneDeep(employeeData?.work_email)
            const updatedData = data?.filter((emailItem, emailIndex) => emailIndex != index)
            updateEmployeeData(HIRE_FIELD_KEYS.work_email, updatedData)
        },
        [employeeData?.work_email, updateEmployeeData]
    )

    const onAddWorkEmailPress = useCallback(() => {
        updateEmployeeData(HIRE_FIELD_KEYS.work_email, [...employeeData?.work_email, {email: ''}])
    }, [employeeData?.work_email, updateEmployeeData])

    return (
        <div
            className='current px-2'
            data-kt-stepper-element='content'
            style={{marginBottom: '15%'}}
        >
            <div className='w-sm-75 mx-auto'>
                <div className='container mt-4 '>
                    <div className='row align-items-center'>
                        <div className='col-sm text-cmGrey700'>
                            <CustomInput
                                label={'First Name'}
                                required
                                name={HIRE_FIELD_KEYS.first_name}
                                value={employeeData.first_name || ''}
                                onChange={onChangeInputData}
                                placeholder='Enter First Name'
                                rejex={/^[\w\-\s]+$/}
                            />
                        </div>
                        <div className='col-sm'>
                            <CustomInput
                                label={'Last Name'}
                                required
                                onChange={onChangeInputData}
                                name={HIRE_FIELD_KEYS.last_name}
                                value={employeeData.last_name || ''}
                                placeholder='Enter Last Name'
                                rejex={/^[\w\-\s]+$/}
                            />
                        </div>
                    </div>
                </div>
                <div className='container mt-7 w-md-525px'>
                    <div className='row'>
                        <div className='col-sm-12 text-cmGrey700'>
                            <CustomInput
                                label={'Personal Email'}
                                subLabel={'(This email will be use for login)'}
                                required
                                type={INPUT_TYPE.email}
                                onChange={onChangeInputData}
                                name={HIRE_FIELD_KEYS.email}
                                value={employeeData.email || ''}
                                placeholder='Enter email'
                            />
                        </div>
                    </div>
                </div>

                {/* Work Emails */}
                <div className='container mt-7 w-md-525px'>
                    <div className='row'>
                        <div className='row col-sm-12 text-cmGrey700'>
                            <div className='col-sm-10 mb-2'>
                                <CommonLabel
                                    label='Work Emails'
                                    subLabel='(For official use by manager / admin only)'
                                />
                            </div>
                        </div>

                        <div className='w-100'>
                            {employeeData?.work_email?.length > 0 &&
                                employeeData?.work_email?.map((item, index) => (
                                    <div className='d-flex w-100  align-items-center justify-content-evenly text-cmGrey700 mb-5'>
                                        <div className='w-5' style={{fontSize: 14}}>
                                            {index + 1}.
                                        </div>
                                        <div className='w-100'>
                                            <CustomInput
                                                hideLabel
                                                required
                                                type={INPUT_TYPE.email}
                                                onChange={(e) =>
                                                    onChangeWorkEmail(e?.target?.value, index)
                                                }
                                                name={HIRE_FIELD_KEYS.email}
                                                value={item?.email || ''}
                                                placeholder={`Enter work email ${index + 1}`}
                                            />
                                        </div>
                                        <div className='w-25'>
                                            <i
                                                class='fa-solid fa-square-xmark text-cmGrey400 cursor-pointer ms-5 align-bottom'
                                                style={{fontSize: '35px'}}
                                                onClick={() => onCancelWorkEmailPress(index)}
                                            ></i>
                                        </div>
                                    </div>
                                ))}

                            <div className='d-flex align-items-center text-cmBlue-Crayola gap-1'>
                                <span className='cursor-pointer' onClick={onAddWorkEmailPress}>
                                    <span className='bi bi-plus-square fs-4 '></span>{' '}
                                    <span className='fw-bold text-decoration-underline'>
                                        Add Work Email
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='container mt-7 w-md-525px'>
                    <div className='row'>
                        <div className='col-sm-12 text-cmGrey700 '>
                            <CustomInput
                                label={'Phone Number'}
                                required
                                type={INPUT_TYPE.mobile}
                                onChange={onChangeInputData}
                                name={HIRE_FIELD_KEYS.mobile_no}
                                value={employeeData.mobile_no || ''}
                                placeholder='Enter Phone Number'
                            />
                        </div>
                    </div>
                </div>
                <div className='container mt-7 '>
                    <div className='row align-items-end'>
                        <div className='col-sm'>
                            <CustomDropdown
                                label={'Office Location'}
                                required
                                placeholder='Select State'
                                searching={false}
                                options={allStatesWithOffices}
                                valueKey='id'
                                name={HIRE_FIELD_KEYS.state_id}
                                value={employeeData?.state_id || ''}
                                onChange={(e) => {
                                    updateMultipleKeysOfEmployeeData({
                                        ...employeeData,
                                        [HIRE_FIELD_KEYS.state_id]: e?.target?.value,
                                        [HIRE_FIELD_KEYS.office_id]: null,
                                        [HIRE_FIELD_KEYS.manager_id]: null,
                                    })
                                }}
                            />
                        </div>
                        <div className='col-sm'>
                            <CustomDropdown
                                value={employeeData?.office_id || ''}
                                onChange={onChangeInputData}
                                name={HIRE_FIELD_KEYS.office_id}
                                displayKey='office_name'
                                valueKey='id'
                                placeholder='Select Office'
                                searching={false}
                                options={officeList}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPersonalDetailContainer
