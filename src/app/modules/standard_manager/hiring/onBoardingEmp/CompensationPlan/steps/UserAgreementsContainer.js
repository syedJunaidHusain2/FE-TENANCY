import 'react-datepicker/dist/react-datepicker.css'
import {
    DOCUMENT_TO_ATTACH_WHILE_ONBOARD,
    HIRE_FIELD_KEYS,
} from '../../../../../../../constants/constants'
import CustomDatePicker from '../../../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import {getBooleanValue} from '../../../../../../../helpers/CommonHelpers'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomDropdown from '../../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomCheckbox from '../../../../../../../customComponents/customCheckbox/CustomCheckbox'
import _ from 'lodash'
import moment from 'moment'

const UserAgreementsContainer = ({
    employeeData,
    updateEmployeeData,
    updateMultipleKeysOfEmployeeData,
    agreementStep,
    selectedDocument,
    setSelectedDocument,
}) => {
    const onChangeInputData = (e) => {
        updateEmployeeData(e?.target?.name, e?.target?.value)
    }

    const onCheckAttachDocumentPress = (index) => {
        let data = _.cloneDeep(selectedDocument)
        data[index].isSelected = !data[index].isSelected
        setSelectedDocument(data)
    }

    return (
        <div className='mb-sm-15 px-5' style={{fontSize: '14px'}} data-kt-stepper-element='content'>
            <div className='w-sm-75 w-100  mx-auto'>
                {agreementStep == 1 ? (
                    <>
                        <div className='mt-4'>
                            <div className='d-flex flex-wrap'>
                                <div className='col-sm-12 text-cmGrey700'>
                                    <label className='d-flex flex-row'>
                                        <CustomDropdown
                                            label={'Probation Period'}
                                            onChange={onChangeInputData}
                                            name={HIRE_FIELD_KEYS.probation_period}
                                            value={employeeData.probation_period ?? ''}
                                            options={[
                                                {name: 'None', value: 'None'},
                                                {name: '60 Days', value: '60'},
                                                {name: '30 Days', value: '30'},
                                            ]}
                                            searching={false}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className='d-flex flex-wrap mt-6 '>
                            <label className='me-8 text-cmGrey700' style={{fontWeight: 600}}>
                                Offer includes bonus?
                            </label>

                            <CustomCheckbox
                                checked={
                                    getBooleanValue(employeeData.offer_include_bonus) == 1
                                        ? true
                                        : false
                                }
                                name={HIRE_FIELD_KEYS.offer_include_bonus}
                                onChange={(e) => {
                                    const value = !getBooleanValue(employeeData.offer_include_bonus)
                                    updateMultipleKeysOfEmployeeData({
                                        ...employeeData,
                                        [HIRE_FIELD_KEYS.offer_include_bonus]: value,
                                        [HIRE_FIELD_KEYS.offer_expiry_date]: value
                                            ? employeeData?.offer_expiry_date
                                            : null,
                                        [HIRE_FIELD_KEYS.hiring_bonus_amount]: value
                                            ? employeeData?.hiring_bonus_amount
                                            : null,
                                    })
                                }}
                            />
                        </div>

                        {getBooleanValue(employeeData?.offer_include_bonus) ? (
                            <div className='mt-7 w-sm-100'>
                                <div className='row align-items-center'>
                                    <div className='col-sm'>
                                        <CustomInput
                                            label={'Hiring Bonus / Resign Bonus'}
                                            required
                                            prefixText={'$'}
                                            type={INPUT_TYPE.number}
                                            onChange={onChangeInputData}
                                            name={HIRE_FIELD_KEYS.hiring_bonus_amount}
                                            value={employeeData.hiring_bonus_amount}
                                            placeholder='Enter Amount'
                                        />
                                    </div>
                                    <div className='col-sm text-cmGrey600'>
                                        <div className='d-flex flex-row flex-wrap'>
                                            <CustomDatePicker
                                                label={'Date to be paid'}
                                                required
                                                name={HIRE_FIELD_KEYS.date_to_be_paid}
                                                value={
                                                    employeeData?.date_to_be_paid
                                                        ? new Date(employeeData?.date_to_be_paid)
                                                        : null
                                                }
                                                onChange={onChangeInputData}
                                                inputClassName='py-1'
                                                //
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null}

                        <div className='mt-7 text-cmGrey700 w-sm-100'>
                            <div className='row align-items-end'>
                                <div className='col min-w-150px'>
                                    <CustomDatePicker
                                        label={'Period of Agreement'}
                                        required
                                        // minDate={new Date()}
                                        name={HIRE_FIELD_KEYS.period_of_agreement_start_date}
                                        value={
                                            employeeData?.period_of_agreement_start_date
                                                ? new Date(
                                                      employeeData?.period_of_agreement_start_date
                                                  )
                                                : null
                                        }
                                        onChange={(e) => {
                                            onChangeInputData(e)
                                            updateEmployeeData(
                                                HIRE_FIELD_KEYS.offer_expiry_date,
                                                null
                                            )
                                            if (
                                                new Date(
                                                    employeeData?.period_of_agreement_start_date
                                                ) > new Date(employeeData?.end_date)
                                            ) {
                                                setTimeout(
                                                    () =>
                                                        updateEmployeeData(
                                                            HIRE_FIELD_KEYS.end_date,
                                                            null
                                                        ),
                                                    300
                                                )
                                            }
                                        }}
                                        // inputClassName='py-1 '
                                    />
                                </div>

                                <div className='text-center mb-3 fw-bolder col'>-</div>

                                <div className='min-w-150px col'>
                                    <CustomDatePicker
                                        name={HIRE_FIELD_KEYS.end_date}
                                        value={
                                            employeeData?.end_date
                                                ? new Date(employeeData?.end_date)
                                                : null
                                        }
                                        onChange={(e) => {
                                            onChangeInputData(e)
                                            updateEmployeeData(
                                                HIRE_FIELD_KEYS.offer_expiry_date,
                                                null
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {employeeData?.period_of_agreement_start_date ? (
                            <div className='mt-6 w-sm-100'>
                                <div className='row'>
                                    <div className='col-sm-6 mb-3 text-cmGrey700 text-nowrap'>
                                        <div>
                                            <CustomDatePicker
                                                label={'Offer Expiry Date'}
                                                required
                                                name={HIRE_FIELD_KEYS.offer_expiry_date}
                                                value={
                                                    employeeData?.offer_expiry_date
                                                        ? new Date(employeeData?.offer_expiry_date)
                                                        : null
                                                }
                                                onChange={onChangeInputData}
                                                inputClassName='py-1'
                                                minDate={moment().add(1, 'd').toDate()}
                                                // maxDate={
                                                //     employeeData?.period_of_agreement_start_date
                                                //         ? new Date(
                                                //               employeeData?.period_of_agreement_start_date
                                                //           )
                                                //         : null
                                                // }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </>
                ) : (
                    <>
                        <div
                            className='current d-flex flex-column '
                            data-kt-stepper-element='content'
                            style={{marginBottom: '34%'}}
                        >
                            <div className='container mt-3 d-flex justify-content-center flex-column  w-md-425px mt-20'>
                                <div
                                    className='cmGrey900'
                                    style={{
                                        fontFamily: 'Manrope',
                                        fontSize: '14px',
                                        fontWeight: 800,
                                    }}
                                >
                                    Attach Forms
                                </div>
                                <div
                                    className='text-cmGrey700 my-5'
                                    style={{fontWeight: 600, fontSize: '14px'}}
                                >
                                    Please ensure the relevant forms are selected for employee
                                </div>
                                {DOCUMENT_TO_ATTACH_WHILE_ONBOARD.map((item, index, data) => (
                                    <>
                                        <div className='d-flex gap-1'>
                                            <div>
                                                <CustomCheckbox
                                                    checked={
                                                        getBooleanValue(
                                                            selectedDocument?.[index].isSelected
                                                        ) == 1
                                                    }
                                                    onChange={() =>
                                                        onCheckAttachDocumentPress(index)
                                                    }
                                                />
                                            </div>
                                            <div
                                                className='text-cmGrey800'
                                                style={{fontWeight: 600, fontSize: '14px'}}
                                            >
                                                {item?.name}
                                            </div>
                                        </div>
                                        {DOCUMENT_TO_ATTACH_WHILE_ONBOARD?.length - 1 != index ? (
                                            <hr className='my-5' />
                                        ) : null}
                                    </>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default UserAgreementsContainer
