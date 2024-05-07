import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'
import {GENDER_DATA, getValidDate} from '../../../../constants/constants'
import {getUserProfileAction} from '../../../../redux/actions/AuthActions'
import {getAllStatesAndCitiesSelector} from '../../../../redux/selectors/SettingsSelectors'
import {
    addUpdateUserAdditionalEmailService,
    deleteUserAdditionalEmailService,
    getEmployeeProfileService,
    getOnBoardingConfigurationService,
    getUserAdditionalEmailsService,
    updateEmployeeProfileService,
} from '../../../../services/Services'
import _ from 'lodash'
import CustomDatePicker from '../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import CustomLoader from '../../../../customComponents/customLoader/CustomLoader'
import CustomToast from '../../../../customComponents/customToast/CustomToast'
import {
    formattedPhoneNumber,
    getErrorMessageFromResponse,
    getMobileNumberWithoutMask,
} from '../../../../helpers/CommonHelpers'
import ProfilePersonalAdditionalInfo from './ProfilePersonalAdditionalInfo'
import AccessRights from '../../../../accessRights/AccessRights'
import useCustomAccessRights from '../../../../accessRights/useCustomAccessRights'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../customComponents/customInputs/customInput/CustomInput'
import CustomButton, {BUTTON_TYPE} from '../../../../customComponents/customButtton/CustomButton'
import CustomDropdown from '../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomEditIcon from '../../../../customComponents/customIcons/CustomEditIcon'
import {
    EMAIL_VALIDATION,
    updateUserPersonalInfoValidation,
} from '../../../../validations/validations'
import CustomAddressInput2 from '../../../../customComponents/customInputs/customAddressInput/CustomAddressInput2'
import {INITIAL_ADDRESS_FIELD} from '../../../../customComponents/customInputs/customAddressInput/CustomAddressInput2'
import useValidation from '../../../../hooks/useValidation'
import CustomDelete from '../../../../customComponents/customIcons/CustomDelete'
import {isUserSuperAdminSelector} from '../../../../redux/selectors/AuthSelectors'

const ProfilePersonalInfoPage = ({getProfile = null, AdditionalData, getAdditionalData}) => {
    const location = useLocation()
    const [showList, setShowList] = useState(true)
    const [employeeData, setEmployeeData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [personalLoading, setPersonalLoading] = useState(false)
    const [getStartedLoading, setGetStartedLoading] = useState(false)
    const dispatch = useDispatch()
    const employee_id = location?.state?.employee_id ?? location?.search.split('=')?.[1]
    const {employeeProfileAccess} = useCustomAccessRights({employeeData})
    const [validatePersonalInfo, personalInfoErrorMessage] = useValidation()
    const [addAnotherEmail, setAddAnotherEmail] = useState(false)
    const [workEmails, setWorkEmails] = useState([])
    const [workEmailText, setWorkEmailText] = useState('')
    const isSuperAdmin = useSelector(isUserSuperAdminSelector)

    useEffect(() => {
        if (personalInfoErrorMessage.beginValidating) {
            validatePersonalInfo(updateUserPersonalInfoValidation(employeeData))
        }
    }, [employeeData])

    useEffect(() => {
        if (employeeData?.id) {
            getWorkEmailList()
        }
    }, [employeeData?.id])

    const addAdditionalEmail = useCallback(() => {
        workEmails.push({value: '', edit: true})
    }, [workEmails])

    const saveAdditionalEmail = useCallback(() => {
        workEmails.push(null)
    }, [workEmails])

    const deleteAdditionalEmail = useCallback((index) => {}, [])

    // useEffect(() => {
    //     if (showList) {
    //         getEmployeeProfile()
    //     }
    // }, [showList])

    const getEmployeeProfile = useCallback(() => {
        setLoading(true)
        getEmployeeProfileService(employee_id)
            .then((res) => {
                getProfile()
                let newData = {...res?.data}
                newData.mobile_no = getMobileNumberWithoutMask(newData.mobile_no)
                newData.emergency_phone = getMobileNumberWithoutMask(newData.emergency_phone)
                setEmployeeData(newData)
                additionalInfo(newData)
            })
            .finally(() => {
                setLoading(false)
                setPersonalLoading(false)
                setGetStartedLoading(false)
            })
    }, [getProfile, employee_id])

    const additionalInfo = (empData) => {
        const body = {
            id: '1',
        }
        getOnBoardingConfigurationService(body)
            .then((res) => {
                let data = {...res.data[0]}

                data['employee_personal_detail'] = data?.employee_personal_detail?.map((res) => ({
                    ...res,
                    value: null,
                    attribute_option: JSON.parse(res?.attribute_option ?? '[]'),
                }))

                data['additional_info_for_employee_to_get_started'] =
                    data?.additional_info_for_employee_to_get_started?.map((res) => ({
                        ...res,
                        value: null,
                        attribute_option: JSON.parse(res?.attribute_option ?? '[]'),
                    }))

                const mergedEmployeeAdditionalData = data?.employee_personal_detail?.map((x) => {
                    const y =
                        empData?.employee_personal_detail &&
                        JSON.parse(empData?.employee_personal_detail)?.find(
                            (item) => x.field_name === item.field_name
                        )
                    if (y) {
                        return Object.assign({}, x, y)
                    } else return x
                })
                const mergedEmployeeGetStartedData =
                    data?.additional_info_for_employee_to_get_started?.map((x) => {
                        const y =
                            empData?.additional_info_for_employee_to_get_started &&
                            JSON.parse(empData?.additional_info_for_employee_to_get_started)?.find(
                                (item) => x.field_name === item.field_name
                            )
                        if (y) {
                            return Object.assign({}, x, y)
                        } else return x
                    })

                setEmployeeData({
                    ...empData,
                    employee_personal_detail: mergedEmployeeAdditionalData,
                    additional_info_for_employee_to_get_started: mergedEmployeeGetStartedData,
                })
            })
            .finally(() => setLoading(false))
    }
    useEffect(() => {
        getEmployeeProfile()
    }, [employee_id])

    const updateEmployeeData = (field, value) => {
        setEmployeeData((val) => ({
            ...val,
            [field]: value,
        }))
    }

    const onChangeInputData = (e) => {
        updateEmployeeData(e?.target?.name, e?.target?.value)
    }

    const onCancel = () => {
        setLoading(true)
        getEmployeeProfile()
        setShowList(!showList)
    }

    const onSavePress = useCallback(
        (type) => {
            const body = {
                ...employeeData,
                user_id: employee_id ?? '',
                first_name: employeeData?.first_name ?? '',
                middle_name: employeeData?.middle_name ?? '',
                last_name: employeeData?.last_name ?? '',
                sex: employeeData?.sex ?? '',
                dob: getValidDate(employeeData?.dob, 'YYYY-MM-DD') ?? '',
                zip_code: employeeData?.zip_code ?? '',
                email: employeeData?.email ?? '',
                mobile_no: getMobileNumberWithoutMask(employeeData?.mobile_no) ?? '',
                city_id: employeeData?.city_id ?? '',
                state_id: employeeData?.state_id ?? employeeData?.state?.id ?? '',
                additional_info_for_employee_to_get_started:
                    JSON.stringify(employeeData?.additional_info_for_employee_to_get_started) ?? '',
                employee_personal_detail:
                    JSON.stringify(employeeData?.employee_personal_detail) ?? '',
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

            if (type == 'personal') {
                validatePersonalInfo(updateUserPersonalInfoValidation(employeeData)).then((res) => {
                    if (res.isValidate) {
                        setLoading(true)
                        updateEmployeeProfileService(body)
                            .then((res) => {
                                getEmployeeProfile()
                                dispatch(getUserProfileAction())
                                setShowList(true)
                                CustomToast.success('Personal info updated')
                            })
                            .catch((e) => {
                                CustomToast.error(getErrorMessageFromResponse(e))
                            })
                            .finally(() => {
                                setLoading(false)
                                setPersonalLoading(false)
                                setGetStartedLoading(false)
                            })
                    }
                })
            } else {
                updateEmployeeProfileService(body)
                    .then((res) => {
                        getEmployeeProfile()
                        dispatch(getUserProfileAction())
                        setShowList(true)
                        CustomToast.success('Personal info updated')
                    })
                    .catch((e) => {
                        CustomToast.error(getErrorMessageFromResponse(e))
                    })
                    .finally(() => {
                        setLoading(false)
                        setPersonalLoading(false)
                        setGetStartedLoading(false)
                    })
            }
        },
        [employeeData, employee_id, validatePersonalInfo, getEmployeeProfile, dispatch]
    )

    const EMPLOYEE_KEYS = {
        first_name: 'first_name',
        middle_name: 'middle_name',
        last_name: 'last_name',
        sex: 'sex',
        dob: 'dob',
        mobile_no: 'mobile_no',
        email: 'email',
        work_email: 'work_email',
        city: 'city',
        city_id: 'city_id',
        state: 'state',
        state_id: 'state_id',
        zip_code: 'zip_code',

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

    const getWorkEmailList = useCallback(
        () =>
            new Promise((resolve) => {
                getUserAdditionalEmailsService(employeeData?.id)
                    .then((res) => {
                        setWorkEmails(res?.data)
                    })
                    .finally(resolve)
            }),
        [employeeData?.id]
    )

    return (
        <>
            <div className='w-100 card shadow'>
                <CustomLoader full visible={loading} />
                <div className='py-5' style={{fontFamily: 'Manrope', fontSize: '14px'}}>
                    {/* Top Heading with edit icon starts */}
                    <div className='d-flex flex-wrap mx-sm-10 mx-5 gap-5 align-items-center justify-content-between'>
                        <div className='text-cmGrey900' style={{fontWeight: 700, fontSize: '16px'}}>
                            Personal Info
                        </div>
                        <AccessRights customCondition={employeeProfileAccess.editPersonalInfo}>
                            <>
                                {showList && (
                                    <CustomEditIcon onClick={() => setShowList(!showList)} />
                                )}
                                {!showList && (
                                    <div className='d-flex gap-4'>
                                        <CustomButton
                                            buttonType={BUTTON_TYPE.error}
                                            buttonLabel='Cancel'
                                            onClick={onCancel}
                                        />
                                        <CustomButton
                                            buttonType={BUTTON_TYPE.secondary}
                                            buttonLabel='Save'
                                            onClick={() => onSavePress('personal')}
                                        />
                                    </div>
                                )}
                            </>
                        </AccessRights>
                    </div>
                    {/* Top Heading with edit icon ends */}
                    <div className='border-bottom border-cmGrey300 mt-5' />

                    {/* List Starts */}
                    {showList && (
                        <div className=''>
                            {/* first line */}
                            <div className='row gap-5 py-4 px-sm-20 px-10 stripRow w-100 mx-auto'>
                                <div className='col-sm row' style={{fontWeight: 600}}>
                                    <div className='text-cmGrey600 col'>First Name:</div>
                                    <div className='text-cmgrey900 col'>
                                        {employeeData?.first_name}
                                    </div>
                                </div>
                                <div className='col-sm row' style={{fontWeight: 600}}>
                                    <div className='text-cmGrey600 col'>Middle Name:</div>
                                    <div className='text-cmgrey900 col'>
                                        {employeeData?.middle_name}
                                    </div>
                                </div>
                                <div className='col-sm row' style={{fontWeight: 600}}>
                                    <div className='text-cmGrey600 col'>Last Name:</div>
                                    <div className='text-cmgrey900 col'>
                                        {employeeData?.last_name}
                                    </div>
                                </div>
                            </div>

                            {/* Second line */}
                            <div className='row py-4 stripRow px-sm-20 px-10 w-100 mx-auto'>
                                <div className='col-sm row' style={{fontWeight: 600}}>
                                    <div className='text-cmGrey600 col'> Sex:</div>
                                    <div className='text-cmgrey900 col'>{employeeData?.sex}</div>
                                </div>
                                <div className='col-sm'></div>
                                <div className='col-sm'></div>
                            </div>
                            {/* Third line */}
                            <div className='row py-4 stripRow px-sm-20 px-10 w-100 mx-auto'>
                                <div className='col-sm row' style={{fontWeight: 600}}>
                                    <div className='text-cmGrey600 col'> Date of Birth:</div>
                                    <div className='text-cmgrey900 col'>
                                        {getValidDate(employeeData?.dob) ?? '-'}
                                    </div>
                                </div>
                                <div className='col-sm'></div>
                                <div className='col-sm'></div>
                            </div>
                            {/* Fourth line */}
                            <div className='row py-4 stripRow px-sm-20 px-10 w-100 mx-auto'>
                                <div className='col-sm row' style={{fontWeight: 600}}>
                                    <div className='text-cmGrey600 col'>Phone:</div>
                                    <div className='text-cmgrey900 text-nowrap col'>
                                        {formattedPhoneNumber(employeeData?.mobile_no)}
                                    </div>
                                </div>
                                <div className='col-sm'></div>
                                <div className='col-sm'></div>
                            </div>
                            {/* Fith line */}
                            <div className='row py-4 stripRow px-sm-20 px-10 w-100 mx-auto'>
                                <div className='col-sm row' style={{fontWeight: 600}}>
                                    <div className='text-cmGrey600 col-lg-2 col-sm-3'>
                                        Personal Email:
                                    </div>
                                    <div className='text-cmgrey900 col'>{employeeData?.email}</div>
                                </div>
                            </div>
                            {/* 6 line */}
                            <div className='row py-4 stripRow px-sm-20 px-10 w-100 mx-auto'>
                                <div className='col-sm row align-items-center' style={{fontWeight: 600}}>
                                    <div className='text-cmGrey600 col col-lg-2 col-sm-3'>
                                        Work Emails:
                                    </div>
                                    <div className='text-cmgrey900 col'>
                                        {workEmails?.length > 0
                                            ? workEmails?.map((item) => item?.email)?.join(', ')
                                            : 'No work email found'}
                                    </div>
                                </div>
                            </div>
                            {/* 7 line */}
                            <div className='row py-4 stripRow px-sm-20 px-10 w-100 mx-auto'>
                                <div className='col-sm row' style={{fontWeight: 600}}>
                                    <div className='text-cmGrey600 col col-lg-2 col-sm-3'>
                                        Home Address:
                                    </div>
                                    <div className='text-cmgrey900 col'>
                                        {employeeData?.home_address}
                                    </div>
                                </div>
                            </div>
                            {/* 7 line */}
                            {/* 8 line */}
                            <div className='row gap-5 py-4 stripRow px-sm-20 px-10 w-100 mx-auto'>
                                <div className='col-xl row' style={{fontWeight: 600}}>
                                    <div className='text-cmGrey600 col'>Emergency Contact:</div>
                                    <div className='text-cmgrey900 col '>
                                        {employeeData?.emergency_contact_name}
                                    </div>
                                </div>
                                <div className='row col-xl' style={{fontWeight: 600}}>
                                    <div className='text-cmGrey600 col'>Phone:</div>
                                    <div className='text-cmgrey900 col'>
                                        {formattedPhoneNumber(employeeData?.emergency_phone)}
                                    </div>
                                </div>
                                <div className='row col-xl' style={{fontWeight: 600}}>
                                    <div className='text-cmGrey600 col'>Relationship:</div>
                                    <div className='text-cmgrey900 col'>
                                        {employeeData?.emergency_contact_relationship}
                                    </div>
                                </div>
                            </div>

                            <div className='row gap-5 py-4 stripRow px-sm-20 px-10 w-100 mx-auto'>
                                <div
                                    className='row col-sm align-items-start'
                                    style={{fontWeight: 600}}
                                >
                                    <div className='text-cmGrey600 col-xl-2 col'>
                                        Emergency Address:
                                    </div>
                                    <div className='text-cmgrey900 col-xl-10 col text-start'>
                                        {employeeData?.emergrncy_contact_address}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* List Ends */}
                    {/* Edit section */}
                    {!showList && (
                        <div className=''>
                            {/* first line */}
                            <div
                                className='row gap-xxl-0 gap-5 align-items-center py-5 px-sm-20 px-10 w-100'
                                style={{fontWeight: 600}}
                            >
                                <div className='col-xxl row align-items-center mb-lg-0 mb-5 '>
                                    <div className='text-cmGrey600  col-xl-4 text-nowrap'>
                                        {' '}
                                        First Name: <span className='required' />
                                    </div>
                                    <div className='col-xl'>
                                        <CustomInput
                                            errorMessage={personalInfoErrorMessage?.first_name}
                                            name={EMPLOYEE_KEYS.first_name}
                                            value={employeeData?.first_name}
                                            onChange={onChangeInputData}
                                            placeholder='Enter first name'
                                            rejex={/^[\w\-\s]+$/}
                                        />
                                    </div>
                                </div>

                                <div
                                    className='col-xxl row align-items-center mb-lg-0 mb-5 '
                                    style={{fontWeight: 600}}
                                >
                                    <div className='text-cmGrey600 col-xl-4 text-nowrap '>
                                        Middle Name:
                                    </div>
                                    <div className='col-xl'>
                                        <CustomInput
                                            name={EMPLOYEE_KEYS.middle_name}
                                            value={employeeData?.middle_name}
                                            onChange={onChangeInputData}
                                            placeholder='Enter middle name'
                                            rejex={/^[\w\-\s]+$/}
                                        />
                                    </div>
                                </div>

                                <div
                                    className='col-xxl row align-items-center mb-lg-0 mb-5 '
                                    style={{fontWeight: 600}}
                                >
                                    <div className='text-cmGrey600 col-xl-4 text-nowrap '>
                                        Last Name: <span className='required' />
                                    </div>
                                    <div className='col-xl '>
                                        <CustomInput
                                            errorMessage={personalInfoErrorMessage?.last_name}
                                            name={EMPLOYEE_KEYS.last_name}
                                            value={employeeData?.last_name}
                                            onChange={onChangeInputData}
                                            placeholder='Enter last name'
                                            rejex={/^[\w\-\s]+$/}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Second line */}
                            <div className='row gap-xxl-0  bg-cmGrey100 w-100 mx-auto py-5 px-sm-20 px-10'>
                                <div
                                    className='row col-xxl align-items-center '
                                    style={{fontWeight: 600}}
                                >
                                    <div className='text-cmGrey600 col-xl-4 text-nowrap mb-1'>
                                        {' '}
                                        Sex:
                                    </div>
                                    <div className='text-cmgrey900 col-xl '>
                                        <CustomDropdown
                                            name={EMPLOYEE_KEYS.sex}
                                            value={employeeData?.sex ?? ''}
                                            onChange={onChangeInputData}
                                            placeholder='Select Gender'
                                            options={GENDER_DATA}
                                            displayKey='value'
                                            searching={false}
                                            showClear={false}
                                        />
                                    </div>
                                </div>
                                <div className='col-xxl'></div>
                                <div className='col-xxl'></div>
                            </div>
                            {/* Third line */}
                            <div className='row gap-xxl-0 align-items-center py-5 px-sm-20 px-10 w-100 mx-auto'>
                                <div
                                    className='col-xxl  row  align-items-center'
                                    style={{fontWeight: 600}}
                                >
                                    <div className='text-cmGrey600 mb-3 col-xl-4 '>
                                        Date of Birth:
                                    </div>
                                    <div className=' col-xl'>
                                        <CustomDatePicker
                                            maxDate={new Date()}
                                            name={EMPLOYEE_KEYS?.dob}
                                            value={
                                                employeeData?.dob
                                                    ? new Date(employeeData?.dob)
                                                    : null
                                            }
                                            onChange={onChangeInputData}
                                        />
                                    </div>
                                </div>
                                <div className='col-xxl'></div>
                                <div className='col-xxl'></div>
                            </div>
                            {/* Fourth line */}
                            <div className='row align-items-center py-5 px-sm-20 px-10 w-100 mx-auto bg-cmGrey100'>
                                <div
                                    className='col-xxl row align-items-center'
                                    style={{fontWeight: 600}}
                                >
                                    <div className='text-cmGrey600 col-xl-4 text-nowrap '>
                                        Phone: <span className='required' />
                                    </div>
                                    <div className='col-xl'>
                                        <CustomInput
                                            type={INPUT_TYPE.mobile}
                                            errorMessage={personalInfoErrorMessage?.mobile_no}
                                            value={employeeData?.mobile_no}
                                            onChange={onChangeInputData}
                                            name={EMPLOYEE_KEYS.mobile_no}
                                            placeholder='Enter Ph. no'
                                        />
                                    </div>
                                </div>
                                <div className='col'></div>
                                <div className='col'></div>
                            </div>
                            {/* Fith line */}
                            <div className='row w-100 mx-auto py-5 px-sm-20 px-10'>
                                <div
                                    className='col-xxl row align-items-center'
                                    style={{fontWeight: 600}}
                                >
                                    <div className='text-cmGrey600 col-xl-4  '>
                                        Personal Email: <span className='required' />
                                    </div>
                                    <div className='col-xl'>
                                        <CustomInput
                                            type={INPUT_TYPE.email}
                                            name={EMPLOYEE_KEYS.email}
                                            errorMessage={personalInfoErrorMessage?.email}
                                            value={employeeData?.email}
                                            onChange={onChangeInputData}
                                            placeholder='abc@gmail.com'
                                        />
                                        <div className='text-cmGrey600'>
                                            This email will be use for login
                                        </div>
                                    </div>
                                </div>
                                <div className='col'></div>
                                <div className='col'></div>
                            </div>

                            {/* 6 line */}
                            <div className='w-100 row mx-auto py-5 px-sm-20 px-10 bg-cmGrey100'>
                                <div className='row align-items-start ' style={{fontWeight: 600}}>
                                    <div className='text-cmGrey600 col text-nowrap'>
                                        Work Emails:
                                    </div>
                                    <div className='col-xl-10'>
                                        {isSuperAdmin ? (
                                            <WorkEmailItem
                                                workEmails={workEmails}
                                                employeeData={employeeData}
                                                getWorkEmailList={getWorkEmailList}
                                            />
                                        ) : (
                                            <>
                                                {workEmails?.length > 0
                                                    ? workEmails
                                                          ?.map((item) => item?.email)
                                                          ?.join(', ')
                                                    : 'No work email found'}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* 7 line */}
                            <div className='w-100 row mx-auto py-5 px-sm-20 px-10'>
                                <div
                                    className='col-xxl row align-items-center'
                                    style={{fontWeight: 600}}
                                >
                                    <div className='text-cmGrey600 col-xl-4 '>Home Address:</div>
                                    <div className='col-xl'>
                                        <CustomAddressInput2
                                            errorMessage={personalInfoErrorMessage?.home_address}
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
                                <div className='col'></div>
                                <div className='col'></div>
                            </div>

                            {/* 8 line */}
                            <div className='w-100 gap-xxl-0 gap-5 mx-auto row py-5 px-sm-20 px-10 '>
                                <div
                                    className='col-xxl row align-items-center mb-lg-0 mb-5'
                                    style={{fontWeight: 600}}
                                >
                                    <div className='text-cmGrey600 text col-xl-4'>
                                        Emergency <span>Contact:</span>
                                    </div>
                                    <div className='col-xl '>
                                        <CustomInput
                                            style={{fontWeight: 600}}
                                            value={employeeData?.emergency_contact_name}
                                            onChange={onChangeInputData}
                                            name={EMPLOYEE_KEYS.emergency_contact_name}
                                            placeholder='Enter Person Name'
                                        />
                                    </div>
                                </div>
                                <div
                                    className='col-xxl row align-items-center mb-lg-0 mb-5'
                                    style={{fontWeight: 600}}
                                >
                                    <div className='text-cmGrey600 text-nowrap col-xl-4'>
                                        Phone:
                                    </div>
                                    <div className='col-xl'>
                                        <CustomInput
                                            type={INPUT_TYPE.mobile}
                                            value={employeeData?.emergency_phone}
                                            onChange={onChangeInputData}
                                            name={EMPLOYEE_KEYS.emergency_phone}
                                            placeholder='Emg. phone no.'
                                        />
                                    </div>
                                </div>
                                <div
                                    className='col-xxl row align-items-center mb-lg-0 mb-5'
                                    style={{fontWeight: 600}}
                                >
                                    <div className='text-cmGrey600 text-nowrap col-xl-4'>
                                        Relationship:
                                    </div>
                                    <div className='col-xl'>
                                        <CustomInput
                                            value={employeeData?.emergency_contact_relationship}
                                            onChange={onChangeInputData}
                                            name={EMPLOYEE_KEYS.emergency_contact_relationship}
                                            placeholder='Your relationship with them'
                                            rejex={/^[\w\-\s]+$/}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* 9 line */}
                            <div className='w-100 gap-xxl-0 gap-5 mx-auto row py-5 px-sm-20 px-10 bg-strip'>
                                <div className='col'></div>
                                <div
                                    className='col-xxl row align-items-center'
                                    style={{fontWeight: 600}}
                                >
                                    <div className='text-cmGrey600 col-xl-4 text-nowrap '>
                                        Address:
                                    </div>
                                    <div className='col-xl'>
                                        <CustomAddressInput2
                                            modalTitle={'Set emergency address'}
                                            errorMessage={
                                                personalInfoErrorMessage?.emergrncy_contact_address
                                            }
                                            data={{
                                                ...INITIAL_ADDRESS_FIELD,
                                                full_address:
                                                    employeeData?.emergrncy_contact_address,
                                                address_line1:
                                                    employeeData?.emergency_address_line_1,
                                                address_line2:
                                                    employeeData?.emergency_address_line_2,
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
                        </div>
                    )}
                </div>
            </div>
            <div className='d-sm-flex gap-20 '>
                <div className='w-sm-100'>
                    <ProfilePersonalAdditionalInfo
                        getEmployeeProfile={getEmployeeProfile}
                        employeeData={employeeData}
                        AdditionalData={AdditionalData}
                        updateEmployeeData={updateEmployeeData}
                        onSavePress={() => onSavePress('additional')}
                        setPersonalLoading={setPersonalLoading}
                        setGetStartedLoading={setGetStartedLoading}
                        personalLoading={personalLoading}
                        getStartedLoading={getStartedLoading}
                    />
                </div>
            </div>
        </>
    )
}

export default ProfilePersonalInfoPage

const WorkEmailItem = ({employeeData, workEmails, getWorkEmailList}) => {
    const [emailList, setEmailList] = useState([])
    const [showLoader, setShowLoader] = useState()

    useEffect(() => {
        loadEmails()
    }, [workEmails])

    const loadEmails = useCallback(() => {
        const data = workEmails?.map((item) => ({...item, edit: false}))
        setEmailList(data)
    }, [workEmails])

    const onChangeEmail = (value, index) => {
        const data = _.cloneDeep(emailList)
        data[index].email = value
        setEmailList(data)
    }

    const toggleEditAdditionalEmailPress = useCallback(
        (additionalEmailIndex, value) => {
            let data = _.cloneDeep(workEmails)
            const emailData = data.map((item) => ({...item, edit: false}))
            emailData[additionalEmailIndex].edit = !value
            setEmailList(emailData)
        },
        [workEmails]
    )

    const onAddAnotherEmail = useCallback(() => {
        let data = _.cloneDeep(emailList)
        data.push({email: '', edit: true})
        setEmailList(data)
    }, [emailList])

    const canShowAddEditDeleteAnother = useMemo(() => {
        return emailList?.every((item) => !item?.edit)
    }, [emailList])

    const onSavePress = useCallback(
        (item, index) => {
            if (!item?.email) return CustomToast.error('Enter work email')
            if (!EMAIL_VALIDATION(item?.email)) return CustomToast.error('Enter valid work email')
            setShowLoader({type: 'save', index})
            const emailData = emailList?.map((item) => item?.email)
            addUpdateUserAdditionalEmailService(employeeData?.id, emailData)
                .then(() => {
                    getWorkEmailList().then(() => {
                        setShowLoader(null)
                    })
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                    setShowLoader(null)
                })
        },
        [emailList, employeeData?.id, getWorkEmailList]
    )

    const onDeletePress = useCallback(
        (item, index) => {
            setShowLoader({type: 'delete', index})

            deleteUserAdditionalEmailService(item?.id)
                .then(() => {
                    getWorkEmailList().then(() => {
                        setShowLoader(null)
                    })
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                    setShowLoader('')
                })
        },
        [getWorkEmailList]
    )

    const onCancelPress = useCallback(
        (index) => {
            loadEmails()
        },
        [loadEmails]
    )

    return (
        <>
            {emailList?.length > 0 &&
                emailList?.map((additionalEmailItem, additionalEmailIndex) => (
                    <>
                        {additionalEmailItem?.edit ? (
                            <div className='d-flex'>
                                <CustomInput
                                    value={additionalEmailItem?.email}
                                    onChange={(e) =>
                                        onChangeEmail(e?.target?.value, additionalEmailIndex)
                                    }
                                    placeholder='abc.sequifi@gmail.com'
                                    className='me-5'
                                />
                                {showLoader?.type == 'save' &&
                                showLoader?.index == additionalEmailIndex ? (
                                    <div className='my-auto'>
                                        <i
                                            class='fa-solid fa-circle-notch fa-spin text-cmBlue-Crayola'
                                            style={{fontSize: '20px'}}
                                        ></i>
                                    </div>
                                ) : (
                                    <>
                                        {canShowAddEditDeleteAnother || additionalEmailItem.edit ? (
                                            <i
                                                class='fa-solid fa-square-check text-cmBlue-Crayola cursor-pointer'
                                                style={{fontSize: '35px'}}
                                                onClick={() =>
                                                    onSavePress(
                                                        additionalEmailItem,
                                                        additionalEmailIndex
                                                    )
                                                }
                                            ></i>
                                        ) : null}
                                    </>
                                )}

                                {canShowAddEditDeleteAnother || additionalEmailItem.edit ? (
                                    <i
                                        class='fa-solid fa-square-xmark text-cmGrey400 cursor-pointer ms-5'
                                        style={{fontSize: '35px'}}
                                        onClick={onCancelPress}
                                    ></i>
                                ) : null}
                            </div>
                        ) : (
                            <div className='row gap-5 align-items-center'>
                                <div className='col-sm-8 col-7 col-xxl-3'>
                                    {additionalEmailItem?.email}
                                </div>

                                <div className='d-flex align-items-center gap-5 col'>
                                    <div className=''>
                                        {canShowAddEditDeleteAnother ? (
                                            <CustomEditIcon
                                                onClick={() =>
                                                    toggleEditAdditionalEmailPress(
                                                        additionalEmailIndex,
                                                        additionalEmailItem?.edit
                                                    )
                                                }
                                            />
                                        ) : null}
                                    </div>
                                    <div className=''>
                                        {showLoader?.type == 'delete' &&
                                        showLoader?.index == additionalEmailIndex ? (
                                            <div className='my-auto'>
                                                <i
                                                    class='fa-solid fa-circle-notch fa-spin text-cmError'
                                                    style={{fontSize: '20px'}}
                                                ></i>
                                            </div>
                                        ) : (
                                            <div>
                                                {canShowAddEditDeleteAnother ? (
                                                    <CustomDelete
                                                        onClick={() =>
                                                            onDeletePress(
                                                                additionalEmailItem,
                                                                additionalEmailIndex
                                                            )
                                                        }
                                                    />
                                                ) : null}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                        <hr />
                    </>
                ))}

            {canShowAddEditDeleteAnother ? (
                <div className='d-flex align-items-center text-cmBlue-Crayola gap-1'>
                    <span className='cursor-pointer' onClick={onAddAnotherEmail}>
                        <span className='bi bi-plus-square fs-4 '></span>{' '}
                        <span className='fw-bold text-decoration-underline'>Add Work Email</span>
                    </span>
                </div>
            ) : null}
        </>
    )
}
