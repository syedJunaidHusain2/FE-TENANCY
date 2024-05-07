import React, {useState} from 'react'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../customComponents/customInputs/customInput/CustomInput'
import CustomButton, {BUTTON_TYPE} from '../../../../customComponents/customButtton/CustomButton'
import CustomDropdown from '../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {REFERAL_VALIDATION_FIELD, ReferalFormValidation} from '../../../../validations/validations'
import {useSelector} from 'react-redux'
import {
    getAllStatesAndCitiesSelector,
    getCompanyProfileSelector,
} from '../../../../redux/selectors/SettingsSelectors'
import {
    IMAGE_TYPE,
    getMobileNumberWithoutMask,
    isEmptyObjectValue,
} from '../../../../helpers/CommonHelpers'
import {HIRING_PROCESS_STATUS} from '../../../../constants/constants'
import {
    addLeadWithoutAuthService,
    checkDuplicateLeadWithoutAuthService,
} from '../../../../services/Services'
import CustomToast from '../../../../customComponents/customToast/CustomToast'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {fontsFamily} from '../../../../assets/fonts/fonts'
import CustomImage from '../../../../customComponents/customImage/CustomImage'
import {KTSVG} from '../../../../_metronic/helpers'
import CustomDialog from '../../../../customComponents/customDialog/CustomDialog'

const AddNewLeadPage = () => {
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [comment, setComment] = useState('')
    const [homestate, setHomeState] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [referalFormError, setReferalFormError] = useState(REFERAL_VALIDATION_FIELD)
    const allState = useSelector(getAllStatesAndCitiesSelector)
    const companyData = useSelector(getCompanyProfileSelector)
    const [showSuccess, setShowSuccess] = useState(false)
    const [params] = useSearchParams()
    const navigate = useNavigate()

    var body = {
        user_id: params?.get('user_id'),
        first_name: firstname,
        last_name: lastname,
        email: email,
        mobile_no: getMobileNumberWithoutMask(phone),
        state_id: homestate,
        comments: comment,
        status: HIRING_PROCESS_STATUS.followUp,
        action_status: ' Schedule Interview',
    }

    const validate = () => {
        const validationErrors = ReferalFormValidation(body)
        setReferalFormError(validationErrors)
        return isEmptyObjectValue(validationErrors)
    }
    const checkDuplicate = () => {
        const form = {
            email: body?.email,
            mobile_number: body?.mobile_no,
        }
        checkDuplicateLeadWithoutAuthService(form).then((res) => {
            if (res?.data?.email_status && res?.data?.mobile_status) {
                setLoading(false)
                CustomDialog.warn(
                    'A Lead with the same email and mobile number already exist. Are you sure you want to add this lead ?',
                    () => {
                        setLoading(true)
                        addLead()
                    }
                )
            } else if (res?.data?.email_status) {
                setLoading(false)
                CustomDialog.warn(
                    'A Lead with the same email and mobile already exist. Are you sure you want to add this lead ?',
                    () => {
                        setLoading(true)
                        addLead()
                    }
                )
            } else if (res?.data?.mobile_status) {
                setLoading(false)
                CustomDialog.warn(
                    'A Lead with the same mobile number already exist. Are you sure you want to add this lead ?',
                    () => {
                        setLoading(true)
                        addLead()
                    }
                )
            } else addLead()
        })
    }
    const handleRefer = (e) => {
        e.preventDefault()
        if (validate()) {
            setLoading(true)
            checkDuplicate()
        }
    }
    const addLead = () => {
        addLeadWithoutAuthService(body)
            .then((res) => {
                setShowSuccess(true)
                CustomToast.success('Referral created Successfully')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const goToLogin = () => {
        navigate('/auth')
    }

    return (
        <div className='mb-sm-0 mb-20' style={{height: '100vh'}}>
            {showSuccess ? (
                <div>
                    <div
                        className='w-100 mx-auto mt-2 '
                        style={{fontSize: '14px', fontFamily: 'Manrope'}}
                    >
                        <div className='w-auto text-center'>
                            <CustomImage
                                src={companyData?.logo}
                                type={IMAGE_TYPE.companyLogo}
                                alt='Company logo'
                                // style={{width: '100%'}}
                                className='w-10'
                            />
                            <div
                                className='text-cmGrey900 text-center mb-10'
                                style={{fontWeight: '800', fontSize: '20px'}}
                            >
                                {companyData?.name}
                            </div>
                        </div>
                        <div className='text-center my-20 '>
                            <i
                                className='bi bi-check-circle-fill text-success'
                                style={{fontSize: 50}}
                            ></i>
                            <div className='text-cmGrey800 mt-10'> Congratulations! </div>We are
                            excited to see you as a lead!
                        </div>
                        <div
                            className='text-cmGrey700 text-center'
                            style={{fontWeight: '500', fontSize: '18px'}}
                        >
                            <button
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 700,
                                }}
                                type='button'
                                className='btn text-cmBlue-Crayola border border-cmBlue-Crayola py-2'
                                onClick={goToLogin}
                            >
                                Go to dashboard
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {/* header */}
                    <div className='pt-5 d-flex flex-center mb-sm-10 mb-5'>
                        <CustomImage
                            src={companyData?.logo}
                            type={IMAGE_TYPE.companyLogo}
                            alt='Company logo'
                            className='w-75px h-75px'
                        />
                        <div
                            className='text-cmGrey800'
                            style={{fontSize: 16, fontWeight: 600, fontFamily: fontsFamily.manrope}}
                        >
                            {companyData?.business_name}
                        </div>
                    </div>
                    {/* body */}
                    <div
                        className='w-sm-50 overflow-hidden mx-sm-auto mx-1 mb-10'
                        style={{borderRadius: '20px'}}
                    >
                        <form
                            className='pt-5 pb-10 px-sm-10 overflow-hidden bg-cmwhite shadow-sm'
                            onSubmit={handleRefer}
                        >
                            <div
                                className='text-center mb-10 text-cmGrey800'
                                style={{
                                    fontSize: 16,
                                    fontWeight: 600,
                                    fontFamily: fontsFamily.manrope,
                                }}
                            >
                                Add Lead
                            </div>
                            <div
                                className='px-sm-15 px-5  mb-10'
                                style={{fontFamily: fontsFamily.manrope, fontSize: '14px'}}
                            >
                                {/*begin::Stepper */}
                                {/* Nmae */}
                                <div className='row gap-5 mb-5'>
                                    {/* first name */}
                                    <div className='col-sm'>
                                        <CustomInput
                                            label={'First Name'}
                                            required
                                            placeholder='Enter First Name'
                                            onChange={(e) => {
                                                setFirstName(e.target.value)
                                            }}
                                            errorMessage={referalFormError?.firstName}
                                            value={firstname}
                                            rejex={/^[\w\-\s]+$/}
                                            // className='w-sm-auto w-100'
                                        />
                                    </div>
                                    {/* last name */}
                                    <div className='col-sm'>
                                        <CustomInput
                                            label={'Last Name'}
                                            required
                                            placeholder='Enter Last Name'
                                            onChange={(e) => {
                                                setLastName(e.target.value)
                                            }}
                                            // className='w-sm-auto w-100'
                                            errorMessage={referalFormError?.lastName}
                                            value={lastname}
                                            rejex={/^[\w\-\s]+$/}
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className=''>
                                    <div className='mb-5'>
                                        <CustomInput
                                            label={'Email'}
                                            required
                                            placeholder='Enter Email'
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                            }}
                                            errorMessage={referalFormError?.email}
                                            value={email}
                                            type={INPUT_TYPE.email}
                                        />
                                    </div>
                                </div>
                                {/* Phone */}
                                <div className=''>
                                    <div className='mb-5'>
                                        <CustomInput
                                            label={'Phone Number'}
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder='Enter Contact Number'
                                            type={INPUT_TYPE.mobile}
                                        />
                                    </div>
                                </div>
                                {/* Home State */}

                                <div className='mb-5'>
                                    <CustomDropdown
                                        label={'Current (Home Location of the candidate)'}
                                        valueKey='id'
                                        options={allState}
                                        value={homestate}
                                        onChange={(e) => setHomeState(e.target.value)}
                                        errorMessage={''}
                                    />
                                </div>

                                {/* Comments */}
                                <div className=''>
                                    <div className=''>
                                        <CustomInput
                                            label={'Comments'}
                                            placeholder='Add Comments'
                                            type={INPUT_TYPE.textarea}
                                            onChange={(e) => {
                                                setComment(e.target.value)
                                            }}
                                            value={comment}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex mx-auto justify-content-center align-items-center'>
                                <CustomButton
                                    disabled={loading}
                                    buttonType={BUTTON_TYPE.primary}
                                    padding={'px-20'}
                                    buttonLabel={'Submit'}
                                    onClick={(e) => handleRefer(e)}
                                />
                            </div>
                        </form>
                    </div>
                </>
            )}
            {/* footer */}
            <div className='overflow-hidden fixed-bottom text-end p-4 mt-10 d-flex align-items-center justify-content-end '>
                <div
                    className='text-cmGrey500'
                    style={{fontWeight: '500', fontSize: '12px', fontFamily: 'Manrope'}}
                >
                    Powered by
                </div>

                <KTSVG
                    path='/media/icons/duotune/art/sequifiSLogo.svg'
                    svgClassName='w-30px h-30px'
                />
                <div
                    className='text-black fw-bold'
                    style={{fontWeight: 800, fontFamily: 'Manrope'}}
                >
                    Sequifi
                </div>
            </div>
        </div>
    )
}

export default AddNewLeadPage
