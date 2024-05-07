import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {StepperComponent} from '../../../../_metronic/assets/ts/components'
import EmployeStep1 from './EmployeePackageSteps.js/EmployeStep1'
import EmployeStep2 from './EmployeePackageSteps.js/EmployeStep2'
import EmployeeStep3 from './EmployeePackageSteps.js/EmployeeStep3'
import {useSelector} from 'react-redux'
import {getUserDataSelector} from '../../../../redux/selectors/AuthSelectors'

import CustomToast from '../../../../customComponents/customToast/CustomToast'
import CustomLoader from '../../../../customComponents/customLoader/CustomLoader'
import {getUserProfileAction, logoutAction} from '../../../../redux/actions/AuthActions'
import {useDispatch} from 'react-redux'
import {
    ADD_OnBoardingStep1_VALIDATION_FIELD,
    changePasswordValidation,
    onBoardingStep1Validation,
} from '../../../../validations/validations'
import {
    getBooleanValue,
    getDataWithoutMask,
    getErrorMessageFromResponse,
    getMobileNumberWithoutMask,
    isEmptyObjectValue,
} from '../../../../helpers/CommonHelpers'
import {useNavigate} from 'react-router-dom'
import EmployeeStep6 from './EmployeePackageSteps.js/EmployeeStep6'
import EmployeeStep5 from './EmployeePackageSteps.js/EmployeeStep5'
import EmployeeStep4 from './EmployeePackageSteps.js/EmployeeStep4'
import {
    changeOnboardingEmployeeAgreementStatusService,
    changePasswordService,
    getEmployeeDocumentByIdService,
    getOnBoardingConfigurationService,
    getOnBoardingEmployeeDetailService,
    updateOnBoardingEmployeeDetailService,
} from '../../../../services/Services'
import {getValidDate} from '../../../../constants/constants'
import {getCompanyProfileSelector} from '../../../../redux/selectors/SettingsSelectors'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../customComponents/customInputs/customInput/CustomInput'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../customComponents/customButtton/CustomButton'
import useValidation from '../../../../hooks/useValidation'
import EmployeTerms from '../EmployeTerms'
import EmployeeStepper from './EmployeeStepper'

export const HIRE_FIELD_KEYS = {
    id: 'id',
    first_name: 'first_name',
    last_name: 'last_name',
    email: 'email',
    mobile_no: 'mobile_no',
    state_id: 'state_id',
    city_id: 'city_id',
    state_name: 'state_name',
    city_name: 'city_name',
    location: 'location',
    department_id: 'department_id',

    dob: 'dob',
    additional_info_for_employee_to_get_started: 'additional_info_for_employee_to_get_started',
    employee_personal_detail: 'employee_personal_detail',
    offer_expiry_date: 'offer_expiry_date',
    entity_type: 'entity_type',
    social_sequrity_no: 'social_sequrity_no',
    business_name: 'business_name',
    business_type: 'business_type',
    business_ein: 'business_ein',
    tax_information: 'tax_information',
    name_of_bank: 'name_of_bank',
    routing_no: 'routing_no',
    account_no: 'account_no',
    account_name: 'account_name',
    confirm_account_no: 'confirm_account_no',
    type_of_account: 'type_of_account',
    shirt_size: 'shirt_size',
    hat_size: 'hat_size',
    image: 'image',

    // Home Address
    home_address: 'home_address',
    home_address_line_1: 'home_address_line_1',
    home_address_line_2: 'home_address_line_2',
    home_address_city: 'home_address_city',
    home_address_state: 'home_address_state',
    home_address_zip: 'home_address_zip',
    home_address_lat: 'home_address_lat',
    home_address_long: 'home_address_long',
    home_address_timezone: 'home_address_timezone',

    // Emergency Contact
    emergency_contact_name: 'emergency_contact_name',
    emergency_phone: 'emergency_phone',
    emergency_contact_relationship: 'emergency_contact_relationship',
    emergrncy_contact_address: 'emergrncy_contact_address',
    emergency_address_line_1: 'emergency_address_line_1',
    emergency_address_line_2: 'emergency_address_line_2',
    emergrncy_contact_city: 'emergrncy_contact_city',
    emergrncy_contact_state: 'emergrncy_contact_state',
    emergrncy_contact_zip_code: 'emergrncy_contact_zip_code',
    emergency_address_lat: 'emergency_address_lat',
    emergency_address_long: 'emergency_address_long',
    emergency_address_timezone: 'emergency_address_timezone',
}

const EmployeePageBody = () => {
    const [employeeData, setEmployeeData] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [stepsError, setStepsError] = useState(ADD_OnBoardingStep1_VALIDATION_FIELD)
    const [documentCount, setDocumentCount] = useState(null)
    const [configurationData, setConfigurationData] = useState(null)
    const loggedUserData = useSelector(getUserDataSelector)
    const stepperRef = useRef(null)
    const stepper = useRef(null)
    const globalCompanyProfile = useSelector(getCompanyProfileSelector)
    const [validatePasswordData, changePasswordErrorData] = useValidation()
    const [loader, setLoader] = useState(false)
    const [userCheckData, setUserCheckData] = useState({
        agreement_accept: true,
        change_password: true,
    })
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [activeStep, setActiveStep] = useState(0)
    const steps = [
        'Personal Details',
        'Tax Information',
        'Banking Details',
        'Documents',
        'Get Started',
        'Finish',
    ]

    const loadStepper = () => {
        stepper.current = StepperComponent.createInsance(stepperRef?.current)
        stepper?.current?.goFirst()
    }
    const updateEmployeeData = (field, value) => {
        setEmployeeData((val) => ({
            ...val,
            [field]: value,
        }))
    }

    useEffect(() => {
        loadStepper()
    }, [])

    const getOnBoardingEmployeeDetail = useCallback(() => {
        setLoading(true)
        getOnBoardingEmployeeDetailService(loggedUserData?.id)
            .then((res) => {
                setUserCheckData({
                    agreement_accept: res?.data?.is_agreement_accepted == 1,
                    change_password:
                        res?.data?.is_agreement_accepted == 1 &&
                        res?.data?.first_time_changed_password == 1,
                })
                // res?.data?.first_time_changed_password == 0
                //     ? setShowChangePasswordModal(true)
                //     : setShowChangePasswordModal(false)
                getConfigurationData(res?.data)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [loggedUserData?.id])

    useEffect(() => {
        getOnBoardingEmployeeDetail()
    }, [])

    const getConfigurationData = (empData) => {
        setLoading(true)
        const body = {
            id: '1',
        }
        getOnBoardingConfigurationService(body)
            .then((res) => {
                let data = {...res.data[0]}
                data['employee_personal_detail'] = data?.employee_personal_detail?.map((res) => ({
                    ...res,
                    value: null,
                    ['attribute_option']: JSON.parse(res?.attribute_option ?? '[]'),
                }))
                data['additional_info_for_employee_to_get_started'] =
                    data?.additional_info_for_employee_to_get_started?.map((res) => ({
                        ...res,
                        value: null,
                        ['attribute_option']: JSON.parse(res?.attribute_option ?? '[]'),
                    }))
                setConfigurationData(data)

                const mergedEmployeeAdditionalData = data?.employee_personal_detail?.map((x) => {
                    const y = JSON.parse(empData?.employee_personal_detail)?.find(
                        (item) => x.field_name === item.field_name
                    )
                    if (y) {
                        return Object.assign({}, x, y)
                    } else return x
                })
                const mergedEmployeeGetStartedData =
                    data?.additional_info_for_employee_to_get_started?.map((x) => {
                        const y = JSON.parse(
                            empData?.additional_info_for_employee_to_get_started
                        )?.find((item) => x.field_name === item.field_name)
                        if (y) {
                            return Object.assign({}, y, x)
                        } else return x
                    })

                setEmployeeData({
                    ...empData,
                    employee_personal_detail: mergedEmployeeAdditionalData,
                    additional_info_for_employee_to_get_started: mergedEmployeeGetStartedData,
                    // employee_personal_detail: [],
                    // additional_info_for_employee_to_get_started: [],
                })
            })
            .finally(() => setLoading(false))
    }

    const UpdateOnboardingEmployeeData = (step) => {
        let body = {
            first_name: employeeData?.first_name ?? '',
            middle_name: employeeData?.middle_name ?? '',
            last_name: employeeData?.last_name ?? '',
            email: employeeData?.email ?? '',
            mobile_no: employeeData?.mobile_no ?? '',
            work_location: employeeData?.location ?? '',
            birth_date: getValidDate(employeeData?.dob, 'YYYY-MM-DD') ?? '',
            image: employeeData?.image?.type ? employeeData?.image : '',
            entity_type: employeeData?.entity_type ?? '',
            social_sequrity_no:
                employeeData?.entity_type == 'individual'
                    ? getDataWithoutMask(employeeData?.social_sequrity_no)
                    : '',
            business_name:
                employeeData?.entity_type == 'business' ? employeeData?.business_name : '',
            business_type:
                employeeData?.entity_type == 'business' ? employeeData?.business_type : '',
            business_ein:
                employeeData?.entity_type == 'business'
                    ? getDataWithoutMask(employeeData?.business_ein)
                    : '',
            name_of_bank: employeeData?.name_of_bank ?? '',
            routing_no: employeeData?.routing_no ?? '',
            account_name: employeeData?.account_name ?? '',
            account_no: employeeData?.account_no ?? '',
            confirm_account_no: employeeData?.confirm_account_no ?? '',
            type_of_account: employeeData?.type_of_account ?? '',
            shirt_size: employeeData?.shirt_size ?? '',
            hat_size: employeeData?.hat_size ?? '',
            gender: employeeData?.gender ?? '',
            additional_info_for_employee_to_get_started:
                JSON.stringify(employeeData?.additional_info_for_employee_to_get_started) ?? null,
            employee_personal_detail:
                JSON.stringify(employeeData?.employee_personal_detail) ?? null,
            onboardProcess: step == 5 ? 1 : 0,

            home_address: employeeData?.home_address ?? '',
            home_address_line_1: employeeData?.home_address_line_1 ?? '',
            home_address_line_2: employeeData?.home_address_line_2 ?? '',
            home_address_city: employeeData?.home_address_city ?? '',
            home_address_state: employeeData?.home_address_state ?? '',
            home_address_zip: employeeData?.home_address_zip ?? '',
            home_address_lat: employeeData?.home_address_lat ?? '',
            home_address_long: employeeData?.home_address_long ?? '',
            home_address_timezone: employeeData?.home_address_timezone ?? '',
            emergency_contact_name: employeeData?.emergency_contact_name ?? '',
            emergency_phone: getMobileNumberWithoutMask(employeeData?.emergency_phone) ?? '',
            emergency_contact_relationship: employeeData?.emergency_contact_relationship ?? '',
            emergrncy_contact_address: employeeData?.emergrncy_contact_address ?? '',
            emergency_address_line_1: employeeData?.emergency_address_line_1 ?? '',
            emergency_address_line_2: employeeData?.emergency_address_line_2 ?? '',
            emergrncy_contact_city: employeeData?.emergrncy_contact_city ?? '',
            emergrncy_contact_state: employeeData?.emergrncy_contact_state ?? '',
            emergrncy_contact_zip_code: employeeData?.emergrncy_contact_zip_code ?? '',
            emergency_address_lat: employeeData?.emergency_address_lat ?? '',
            emergency_address_long: employeeData?.emergency_address_long ?? '',
            emergency_address_timezone: employeeData?.emergency_address_timezone ?? '',
        }

        const validationErrors = onBoardingStep1Validation(body, step)
        setStepsError(validationErrors)

        if (isEmptyObjectValue(validationErrors)) {
            setLoading(true)
            updateOnBoardingEmployeeDetailService(body)
                .then(() => {
                    setActiveStep((prevActiveStep) => prevActiveStep + 1)
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
                .finally(() => setLoading(false))
        }
    }
    const nextStep = () => {
        if (activeStep === 0) {
            // setLoading(true)
            UpdateOnboardingEmployeeData(1)
        } else if (activeStep === 1) {
            // setLoading(true)
            UpdateOnboardingEmployeeData(2)
        } else if (activeStep === 2) {
            // setLoading(true)
            UpdateOnboardingEmployeeData(3)
        } else if (activeStep === 3) {
            setLoading(true)
            getEmployeeDocumentByIdService(employeeData?.id).then((res) => {
                let data = res?.data
                    ?.filter((item) => item?.field_required == 'required' && !item?.is_deleted)
                    .map((docItem) => docItem?.document?.length > 0)
                let isError = data.includes(false)
                if (isError) {
                    CustomToast.error('Please upload mandatory documents')
                    return setLoading(false)
                }

                UpdateOnboardingEmployeeData()
            })
        } else if (activeStep === 4) {
            UpdateOnboardingEmployeeData(5)
            // stepper.current.goNext()
        }
    }

    const prevStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)

        return
        if (!stepper.current) {
            return
        }

        stepper.current.goPrev()
    }

    const goToDashboard = () => {
        dispatch(getUserProfileAction())
        navigate('/dashboard')
    }

    useEffect(() => {
        if (changePasswordErrorData?.beginValidating) {
            validatePasswordData(changePasswordValidation(passwordData))
        }
    }, [passwordData])

    const onChangeInputData = useCallback((e) => {
        setPasswordData((val) => ({
            ...val,
            [e?.target?.name]: e?.target?.value,
        }))
    }, [])

    const showProfileForm = useMemo(() => {
        return userCheckData?.agreement_accept && userCheckData?.change_password
    }, [userCheckData?.agreement_accept, userCheckData?.change_password])

    const onAcceptOrDeclinePress = useCallback(
        (status) => {
            if (status) {
                changeOnboardingEmployeeAgreementStatusService(
                    employeeData?.id,
                    getBooleanValue(status)?.toString()
                ).then(() => {
                    getOnBoardingEmployeeDetail()
                })
            } else {
                dispatch(logoutAction())
            }
        },
        [dispatch, employeeData?.id, getOnBoardingEmployeeDetail]
    )

    const onChangePassword = () => {
        const body = {
            old_password: passwordData.oldPassword,
            new_password: passwordData.newPassword,
        }
        validatePasswordData(changePasswordValidation(passwordData)).then((res) => {
            if (res.isValidate) {
                setLoader(true)
                changePasswordService(body)
                    .then(() => {
                        getOnBoardingEmployeeDetail()
                    })
                    .catch((e) => {
                        CustomToast.error(getErrorMessageFromResponse(e))
                    })
                    .finally(() => {
                        setLoader(false)
                    })
            }
        })
    }
    return (
        <div className='row justify-content-between gap-10'>
            <div
                className='mx-lg-0 mx-auto mb-sm-0 mb-20 col-lg position-lg-fixed  '
                style={{width: 'fit-content'}}
            >
                <EmployeeStepper activeStep={activeStep} steps={steps} />
            </div>
            <div className='py-lg-0 px-lg-20 w-lg-auto w-100 col-lg'>
                {/* <CustomLoader visible={true} full size={100} /> */}

                {/*begin::Stepper */}
                {showProfileForm ? (
                    <>
                        <div ref={stepperRef}>
                            <div className=''>
                                <div className=''>
                                    <div className='w-100'>
                                        {/* Step 1 */}
                                        {activeStep === 0 ? (
                                            <div className=''>
                                                <EmployeStep1
                                                    updateEmployeeData={updateEmployeeData}
                                                    setEmployeeData={setEmployeeData}
                                                    employeeData={employeeData}
                                                    validationMessage={stepsError}
                                                    additionalDataFields={
                                                        configurationData?.employee_personal_detail
                                                    }
                                                    globalCompanyProfile={globalCompanyProfile}
                                                />
                                            </div>
                                        ) : null}

                                        {/* Step 2 */}
                                        {activeStep === 1 ? (
                                            <div>
                                                <EmployeStep2
                                                    updateEmployeeData={updateEmployeeData}
                                                    employeeData={employeeData}
                                                    validationMessage={stepsError}
                                                    globalCompanyProfile={globalCompanyProfile}
                                                />
                                            </div>
                                        ) : null}

                                        {/* Step 3 */}
                                        {activeStep === 2 ? (
                                            <div>
                                                <EmployeeStep3
                                                    updateEmployeeData={updateEmployeeData}
                                                    employeeData={employeeData}
                                                    validationMessage={stepsError}
                                                    globalCompanyProfile={globalCompanyProfile}
                                                />
                                            </div>
                                        ) : null}

                                        {/* Step 4 */}
                                        {activeStep === 3 ? (
                                            <div>
                                                <EmployeeStep4
                                                    employeeData={employeeData}
                                                    setDocumentCount={setDocumentCount}
                                                    DataFields={
                                                        configurationData?.document_to_update
                                                    }
                                                    globalCompanyProfile={globalCompanyProfile}
                                                />
                                            </div>
                                        ) : null}

                                        {/* Step 5 */}
                                        {activeStep === 4 ? (
                                            <div>
                                                <EmployeeStep5
                                                    updateEmployeeData={updateEmployeeData}
                                                    employeeData={employeeData}
                                                    DataFields={
                                                        configurationData?.additional_info_for_employee_to_get_started
                                                    }
                                                    validationMessage={stepsError}
                                                    globalCompanyProfile={globalCompanyProfile}
                                                />
                                            </div>
                                        ) : null}

                                        {/* Step 6 */}
                                        {activeStep === 5 ? (
                                            <div>
                                                <EmployeeStep6
                                                    globalCompanyProfile={globalCompanyProfile}
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className='d-flex justify-content-center gap-10 mb-15'>
                                        {activeStep !== steps.length - 1 ? (
                                            <div>
                                                <CustomButton
                                                    buttonLabel='Back'
                                                    buttonSize={BUTTON_SIZE.small}
                                                    buttonType={BUTTON_TYPE.primaryBorder}
                                                    onClick={prevStep}
                                                    disabled={activeStep === 0}
                                                />
                                            </div>
                                        ) : (
                                            <CustomButton
                                                onClick={goToDashboard}
                                                buttonLabel='Go to dashboard'
                                                buttonSize={BUTTON_SIZE.normal}
                                            />
                                        )}

                                        {activeStep !== steps.length - 1 ? (
                                            <div>
                                                <CustomButton
                                                    buttonLabel='Save and Continue'
                                                    buttonSize={BUTTON_SIZE.normal}
                                                    onClick={nextStep}
                                                    loading={loading}
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                    {/* </form> */}
                                </div>
                            </div>
                        </div>
                    </>
                ) : null}

                {!userCheckData?.agreement_accept ? (
                    <>
                        <EmployeTerms
                            show={!userCheckData?.agreement_accept}
                            onAcceptOrDecline={onAcceptOrDeclinePress}
                        />
                    </>
                ) : null}

                {/* Profile Form */}
                {!userCheckData?.change_password ? (
                    <div className='w-100'>
                        <div className='text-cmGrey500 text-center mb-10'>
                            Welcome to{' '}
                            <span className='text-cmGrey800'> {globalCompanyProfile?.name}</span>,
                            Please Setup Your New Password to Continue
                        </div>
                        <div
                            className='w-50 mx-auto bg-cmwhite shadow-sm'
                            style={{borderRadius: 10}}
                        >
                            <div className='w-sm-75 mx-auto py-10'>
                                <div className='mb-5'>
                                    <CustomInput
                                        type={INPUT_TYPE.password}
                                        label={'Old Password'}
                                        placeholder='Enter Old Password'
                                        onChange={onChangeInputData}
                                        name='oldPassword'
                                        value={passwordData?.oldPassword}
                                        errorMessage={changePasswordErrorData?.oldPassword}
                                    />
                                </div>
                                <div className='mb-5'>
                                    <CustomInput
                                        type={INPUT_TYPE.password}
                                        label={'New Password'}
                                        placeholder='Enter New Password'
                                        onChange={onChangeInputData}
                                        name='newPassword'
                                        value={passwordData?.newPassword}
                                        errorMessage={changePasswordErrorData?.newPassword}
                                    />
                                </div>
                                <div className='mb-5'>
                                    <CustomInput
                                        type={INPUT_TYPE.password}
                                        label={'Confirm Password'}
                                        placeholder='Enter Password'
                                        onChange={onChangeInputData}
                                        name='confirmPassword'
                                        value={passwordData?.confirmPassword}
                                        errorMessage={changePasswordErrorData?.confirmPassword}
                                    />
                                </div>

                                <div className='text-center mt-15'>
                                    <CustomButton
                                        buttonLabel='Change Password'
                                        padding={'px-20'}
                                        onClick={onChangePassword}
                                        loading={loader}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default EmployeePageBody
