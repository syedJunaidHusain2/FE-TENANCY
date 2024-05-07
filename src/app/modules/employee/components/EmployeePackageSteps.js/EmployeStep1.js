import React, {useEffect, useRef, useState} from 'react'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomDatePicker from '../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import {HIRE_FIELD_KEYS} from '../EmployeePageBody'
import {InputMask} from 'primereact/inputmask'
import CustomDropdown from '../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomImage from '../../../../../customComponents/customImage/CustomImage'
import {getServerImage} from '../../../../../helpers/CommonHelpers'
import CustomAddressInput from '../../../../../customComponents/customInputs/customAddressInput/CustomAddressInput'
import CustomAddressInput2, {
    INITIAL_ADDRESS_FIELD,
} from '../../../../../customComponents/customInputs/customAddressInput/CustomAddressInput2'
const EmployeStep1 = ({
    employeeData,
    setEmployeeData,
    updateEmployeeData,
    validationMessage,
    additionalDataFields,
    globalCompanyProfile,
}) => {
    const profileFilePickerRef = useRef()
    const [hover, setHover] = useState(false)

    const onChangeInputData = (e) => {
        updateEmployeeData(e?.target?.name, e?.target?.value)
    }
    const onChangeInputDataImage = (e) => {
        updateEmployeeData(e?.target?.name, e?.target?.files?.[0])
    }
    const onChangeAdditionalInputData = (fieldName, index, e) => {
        let data = [...employeeData?.employee_personal_detail]
        data[index].value = e?.target?.value
        updateEmployeeData(e?.target?.name, data)
    }
    const onHover = () => {
        setHover(true)
    }

    const onLeave = () => {
        setHover(false)
    }

    return (
        <div
            className=' w-lg-90 w-100 mx-auto mb-10'
            style={{fontSize: '14px', fontFamily: 'Manrope'}}
        >
            <div className='text-cmGrey500 text-center mb-10 '>
                Welcome to <span className='text-cmGrey800'> {globalCompanyProfile?.name}</span>,
                Please Complete The Following Fields. Please ensure the following information is
                correct before proceeding to the next section.
            </div>

            <div
                className='bg-cmwhite shadow-sm mb-10 w-sm-75 w-100 mx-auto'
                style={{borderRadius: '10px'}}
            >
                {/* 1 */}
                <div className='d-flex align-items-center py-3 px-sm-20 px-5 '>
                    <div className='w-sm-25 text-cmGrey600' style={{fontWeight: '500'}}>
                        First Name:
                    </div>
                    <div className='w-sm-75 m-0 p-0'>
                        <CustomInput
                            placeholder='Enter  Name'
                            onChange={onChangeInputData}
                            errorMessage={validationMessage?.firstName}
                            value={employeeData?.first_name}
                            name={HIRE_FIELD_KEYS.first_name}
                        />
                    </div>
                </div>
                {/* 2 */}
                <div className='d-flex align-items-center bg-cmGrey100 py-3 px-sm-20 px-5 '>
                    <div className='w-sm-25 text-cmGrey600' style={{fontWeight: '500'}}>
                        Last Name:
                    </div>
                    <div className='w-sm-75'>
                        <CustomInput
                            placeholder='Enter Last Name'
                            onChange={onChangeInputData}
                            errorMessage={validationMessage?.lastName}
                            value={employeeData?.last_name}
                            name={HIRE_FIELD_KEYS.last_name}
                        />
                    </div>
                </div>
                {/* 3 */}
                <div className='d-flex align-items-center py-3  px-sm-20 px-5 '>
                    <div className='w-sm-25 text-cmGrey600' style={{fontWeight: '500'}}>
                        Email:
                    </div>
                    <div className='w-sm-75'>
                        <CustomInput
                            placeholder='Enter email'
                            onChange={onChangeInputData}
                            disabled
                            errorMessage={validationMessage?.email}
                            value={employeeData?.email}
                            name={HIRE_FIELD_KEYS.email}
                            type={INPUT_TYPE.email}
                        />
                    </div>
                </div>
                {/* 4 */}
                <div className='d-flex align-items-center bg-cmGrey100 py-3 px-sm-20 px-5 '>
                    <div className='w-sm-25 text-cmGrey600' style={{fontWeight: '500'}}>
                        Phone Number:
                    </div>
                    <div className='w-sm-75'>
                        <CustomInput
                            disabled
                            type={INPUT_TYPE.mobile}
                            name={HIRE_FIELD_KEYS.mobile_no}
                            errorMessage={validationMessage?.phoneNumber}
                            value={employeeData?.mobile_no}
                            onChange={onChangeInputData}
                            placeholder='Enter Number'
                        />
                    </div>
                </div>
            </div>

            {/* card 2 */}
            <div
                className='bg-cmwhite shadow-sm py-3 mx-auto w-sm-75'
                style={{borderRadius: '10px'}}
            >
                {/* 1 */}
                <div className='d-flex align-items-center py-3  px-sm-20 px-5 '>
                    <div className='w-sm-25 text-cmGrey600 required' style={{fontWeight: '500'}}>
                        Home Address:
                    </div>
                    <div className='w-sm-75'>
                        <CustomAddressInput2
                            errorMessage={validationMessage?.homeAddress}
                            modalTitle={'Set home address'}
                            data={{
                                ...INITIAL_ADDRESS_FIELD,
                                full_address: employeeData?.home_address,
                                address_line1: employeeData?.home_address_line_1,
                                address_line2: employeeData?.home_address_line_2,
                                city: employeeData?.home_address_city,
                                state: employeeData?.home_address_state,
                                zip: employeeData?.home_address_zip,
                                lat: employeeData?.home_address_lat,
                                long: employeeData?.home_address_long,
                                time_zone: employeeData?.home_address_timezone,
                            }}
                            needLatLong
                            needTimeZone
                            setData={(data) => {
                                setEmployeeData((val) => ({
                                    ...val,
                                    home_address: data?.full_address,
                                    home_address_line_1: data?.address_line1,
                                    home_address_line_2: data?.address_line2,
                                    home_address_city: data?.city,
                                    home_address_state: data?.state,
                                    home_address_zip: data?.zip,
                                    home_address_lat: data?.lat,
                                    home_address_long: data?.long,
                                    home_address_timezone: data?.time_zone,
                                }))
                            }}
                            placeholder='Enter home address'
                        />
                    </div>
                </div>
                {/* 2 */}
                <div className='d-flex align-items-center bg-cmGrey100 py-3  px-sm-20 px-5 '>
                    <div className='w-sm-25 text-cmGrey600 required' style={{fontWeight: '500'}}>
                        Birth Date:
                    </div>
                    <div className='w-sm-75'>
                        <CustomDatePicker
                            className={'my-0'}
                            name={HIRE_FIELD_KEYS.dob}
                            value={employeeData?.dob ? new Date(employeeData?.dob) : null}
                            onChange={onChangeInputData}
                            errorMessage={validationMessage?.dob}
                            maxDate={new Date()}
                        />
                    </div>
                </div>
                {/* 3 */}
                <div className='d-flex flex-wrap gap-sm-0 gap-3 align-items-start py-3 px-sm-20 px-5 '>
                    <div className='w-sm-25 text-cmGrey600' style={{fontWeight: '500'}}>
                        Emergency Contact:
                    </div>
                    <div className='w-sm-75'>
                        <CustomInput
                            placeholder='Enter Name'
                            onChange={onChangeInputData}
                            errorMessage={validationMessage?.emergencyName}
                            value={employeeData?.emergency_contact_name}
                            name={HIRE_FIELD_KEYS.emergency_contact_name}
                        />

                        <div className='d-flex align-items-center gap-5 my-2'>
                            <div className='w-50'>
                                {' '}
                                <CustomInput
                                    name={HIRE_FIELD_KEYS.emergency_phone}
                                    value={employeeData?.emergency_phone}
                                    onChange={onChangeInputData}
                                    type={INPUT_TYPE.mobile}
                                    placeholder='Enter Phone Number'
                                    errorMessage={validationMessage?.emergencyNumber}
                                />
                            </div>
                            <div className='w-50'>
                                <CustomInput
                                    placeholder='Enter Relationship'
                                    onChange={onChangeInputData}
                                    errorMessage={validationMessage?.emergencyRelation}
                                    value={employeeData?.emergency_contact_relationship}
                                    name={HIRE_FIELD_KEYS.emergency_contact_relationship}
                                />
                            </div>
                        </div>
                        <div>
                            <CustomAddressInput2
                                modalTitle={'Set emergency address'}
                                errorMessage={validationMessage?.emergencyAddress}
                                data={{
                                    ...INITIAL_ADDRESS_FIELD,
                                    full_address: employeeData?.emergrncy_contact_address,
                                    address_line1: employeeData?.emergency_address_line_1,
                                    address_line2: employeeData?.emergency_address_line_2,
                                    city: employeeData?.emergrncy_contact_city,
                                    state: employeeData?.emergrncy_contact_state,
                                    zip: employeeData?.emergency_address_zip,
                                    lat: employeeData?.emergency_address_lat,
                                    long: employeeData?.emergency_address_long,
                                    time_zone: employeeData?.emergency_address_timezone,
                                }}
                                needLatLong
                                needTimeZone
                                setData={(data) => {
                                    setEmployeeData((val) => ({
                                        ...val,
                                        emergrncy_contact_address: data?.full_address,
                                        emergency_address_line_1: data?.address_line1,
                                        emergency_address_line_2: data?.address_line2,
                                        emergrncy_contact_city: data?.city,
                                        emergrncy_contact_state: data?.state,
                                        emergrncy_contact_zip_code: data?.zip,
                                        emergency_address_lat: data?.lat,
                                        emergency_address_long: data?.long,
                                        emergency_address_timezone: data?.time_zone,
                                    }))
                                }}
                                placeholder='Enter emergency address'
                            />
                        </div>
                    </div>
                </div>

                {/* 4 */}
                <div className='d-sm-flex justify-content-between gap-sm-0 gap-3 align-items-start bg-cmGrey100 py-3 px-sm-20 px-5'>
                    <div
                        className='text-nowrap text-cmGrey600 mb-sm-0 mb-2'
                        style={{fontWeight: '500'}}
                    >
                        Upload Profile Picture:
                    </div>
                    <div className=''>
                        <input
                            ref={profileFilePickerRef}
                            style={{display: 'none'}}
                            type='file'
                            name={HIRE_FIELD_KEYS.image}
                            className='form-control py-2 bg-cmbg rounded border border-cmDisabled border-2 mb-3'
                            onChange={onChangeInputDataImage}
                        />
                        <div className='d-sm-flex align-items-start justify-content-between cursor-pointer'>
                            <div
                                className='w-100px mx-sm-0 mx-auto d-flex align-items-center justify-content-center h-100px shdaow-sm border-cmDisabled border border-dashed border-3'
                                // style={{borderRadius: '10px', backgroundColor: 'red'}}
                                onMouseEnter={onHover}
                                onMouseLeave={onLeave}
                                onClick={() => profileFilePickerRef?.current?.click()}
                                style={{
                                    borderRadius: '10px',
                                    position: 'absolute',
                                    height: '100%',
                                    // borderRadius: '100px',
                                    overflow: 'hidden',
                                    justifyContent: 'center',
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    // backgroundColor: 'rgba(0,0,0,0.5)',
                                }}
                            >
                                {hover && (
                                    <div
                                        style={{
                                            borderRadius: '10px',
                                            position: 'absolute',
                                            height: '100%',
                                            // borderRadius: '100px',
                                            overflow: 'hidden',
                                            justifyContent: 'center',
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            backgroundColor: 'rgba(0,0,0,0.5)',
                                        }}
                                    >
                                        <div className='bi bi-camera2 fs-1 text-cmDisabled'></div>
                                    </div>
                                )}
                            </div>
                            <CustomImage
                                style={{width: '100px', height: '100px', borderRadius: '10px'}}
                                customSrc={
                                    employeeData?.image?.type
                                        ? URL.createObjectURL(employeeData?.image)
                                        : getServerImage(employeeData?.image)
                                }
                                alt=''
                                className=''
                            />
                            <div className='text-cmGrey500 text-center' style={{fontWeight: '500'}}>
                                {' '}
                                Recommended size 512 x 512px PNG or JPG accepted
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional fields */}
                {employeeData?.employee_personal_detail?.length > 0 ? (
                    <>
                        <div className=' py-3 px-sm-20 px-5 '>
                            <div
                                className='w-sm-30 text-cmGrey600 mb-5'
                                style={{fontWeight: '800'}}
                            >
                                Additional Information:
                                <br></br>
                                <div
                                    className='text-cmError'
                                    style={{fontWeight: '400', fontSize: '12px'}}
                                >
                                    {validationMessage?.additionalPersonalInfoFieldError}
                                </div>
                            </div>
                            {employeeData?.employee_personal_detail?.map(
                                (item, index) =>
                                    !item?.is_deleted && (
                                        <div className='w-100 mb-3' key={index}>
                                            {item?.field_type == 'text' && (
                                                <div className='row align-items-center'>
                                                    <div
                                                        className={`col-xxl-3 text-cmGrey600  ${item?.field_required}`}
                                                        style={{
                                                            fontWeight: '500',
                                                        }}
                                                    >
                                                        {item?.field_name}:
                                                    </div>
                                                    <div className='col-xxl'>
                                                        <CustomInput
                                                            placeholder='Enter'
                                                            onChange={(e) =>
                                                                onChangeAdditionalInputData(
                                                                    item?.field_name,
                                                                    index,
                                                                    e
                                                                )
                                                            }
                                                            value={item?.value}
                                                            name={
                                                                HIRE_FIELD_KEYS.employee_personal_detail
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {item?.field_type == 'number' && (
                                                <div className='row align-items-center'>
                                                    <div
                                                        className={`col-xxl-3 text-cmGrey600  ${item?.field_required}`}
                                                        style={{fontWeight: '500'}}
                                                    >
                                                        {item?.field_name}:
                                                    </div>
                                                    <div className='col-xxl'>
                                                        <CustomInput
                                                            type={INPUT_TYPE.number}
                                                            name={
                                                                HIRE_FIELD_KEYS.employee_personal_detail
                                                            }
                                                            value={item?.value}
                                                            onChange={(e) =>
                                                                onChangeAdditionalInputData(
                                                                    item?.field_name,
                                                                    index,
                                                                    e
                                                                )
                                                            }
                                                            placeholder={`Enter ${item?.field_name}`}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {item?.field_type == 'date' && (
                                                <div className='row align-items-center'>
                                                    <div
                                                        className={`col-xxl-3 text-cmGrey600 ${item?.field_required}`}
                                                        style={{fontWeight: '500'}}
                                                    >
                                                        {item?.field_name}:
                                                    </div>
                                                    <div className='col-xxl'>
                                                        <CustomDatePicker
                                                            className={'my-0 '}
                                                            name={
                                                                HIRE_FIELD_KEYS.employee_personal_detail
                                                            }
                                                            value={item?.value}
                                                            onChange={(e) =>
                                                                onChangeAdditionalInputData(
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
                                                <div className='row align-items-center'>
                                                    <div
                                                        className={`col-xxl-3 text-cmGrey600 ${item?.field_required}`}
                                                        style={{fontWeight: '500'}}
                                                    >
                                                        {item?.field_name}:
                                                    </div>
                                                    <div className='col-xxl'>
                                                        <CustomInput
                                                            placeholder='Enter Ph. number'
                                                            type={INPUT_TYPE.mobile}
                                                            name={
                                                                HIRE_FIELD_KEYS.employee_personal_detail
                                                            }
                                                            onChange={(e) =>
                                                                onChangeAdditionalInputData(
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
                                            {item?.field_type == 'dropdown' && (
                                                <div className='row align-items-center'>
                                                    <div
                                                        className={`col-xxl-3 text-cmGrey600 ${item?.field_required}`}
                                                        style={{
                                                            fontWeight: '500',
                                                        }}
                                                    >
                                                        {item?.field_name}:
                                                    </div>
                                                    <div className='col-xxl'>
                                                        <CustomDropdown
                                                            searching={false}
                                                            name={
                                                                HIRE_FIELD_KEYS.employee_personal_detail
                                                            }
                                                            value={item?.value}
                                                            onChange={(e) =>
                                                                onChangeAdditionalInputData(
                                                                    item?.field_name,
                                                                    index,
                                                                    e
                                                                )
                                                            }
                                                            options={item?.attribute_option?.map(
                                                                (item) => {
                                                                    return {name: item, value: item}
                                                                }
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )
                            )}
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    )
}

export default EmployeStep1
