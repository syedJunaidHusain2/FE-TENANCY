import {useState, useRef, useEffect} from 'react'
import {
    addHiringLeadsService,
    checkDuplicateLeadServce,
    getStateListService,
    updateHiringLeadsService,
} from '../../../../../services/Services'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomDropdown from '../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import {RWebShare} from 'react-web-share'
import {
    ReferalFormValidation,
    REFERAL_VALIDATION_FIELD,
} from '../../../../../validations/validations'
import {
    getErrorMessageFromResponse,
    getMobileNumberWithoutMask,
    isEmptyObjectValue,
} from '../../../../../helpers/CommonHelpers'
import {getUserDataSelector} from '../../../../../redux/selectors/AuthSelectors'
import {useSelector} from 'react-redux'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import {getAllStatesAndCitiesSelector} from '../../../../../redux/selectors/SettingsSelectors'
import {HIRING_PROCESS_STATUS} from '../../../../../constants/constants'
import CustomDialog from '../../../../../customComponents/customDialog/CustomDialog'
import CustomModal from '../../../../../customComponents/customModal/CustomModal'
import CustomButton, {BUTTON_TYPE} from '../../../../../customComponents/customButtton/CustomButton'
import {fontsFamily} from '../../../../../assets/fonts/fonts'
import {KTSVG} from '../../../../../_metronic/helpers'
import QRCode from 'react-qr-code'
import {Link} from 'react-router-dom'

const AddNewLeadsPopUp = ({show, handleClose, getList, preData}) => {
    const [firstname, setFirstName] = useState(preData?.first_name)
    const [lastname, setLastName] = useState(preData?.last_name)
    const [phone, setPhone] = useState(preData?.mobile_no)
    const [comment, setComment] = useState(preData?.comments)
    const [homestate, setHomeState] = useState(preData?.state_id)
    const [email, setEmail] = useState(preData?.email)
    const [loading, setLoading] = useState(false)
    const [referalFormError, setReferalFormError] = useState(REFERAL_VALIDATION_FIELD)
    const loggedUserData = useSelector(getUserDataSelector)
    const initialRender = useRef(true)
    const allState = useSelector(getAllStatesAndCitiesSelector)

    const redirectLink = `${window.location.origin}/referral?user_id=${loggedUserData?.id}`

    var body = {
        first_name: firstname,
        last_name: lastname,
        email: email,
        mobile_no: getMobileNumberWithoutMask(phone),
        state_id: homestate,
        comments: comment,
        status: HIRING_PROCESS_STATUS.followUp,
        action_status: ' Schedule Interview',
        reporting_manager_id: loggedUserData?.is_manager
            ? loggedUserData?.id
            : loggedUserData?.manager_id ?? loggedUserData?.id,
    }
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
        } else {
            // validate()
        }
    }, [firstname, lastname, email])
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
        checkDuplicateLeadServce(form).then((res) => {
            if (res?.data?.email_status && res?.data?.mobile_status) {
                setLoading(false)
                CustomDialog.warn(
                    'A Lead with the same email and mobile number already exist. Are you sure you want to add this lead ?',
                    () => {
                        setLoading(true)
                        addLead()
                    },
                    () => {
                        handleClose()
                    }
                )
            } else if (res?.data?.email_status) {
                setLoading(false)
                CustomDialog.warn(
                    'A Lead with the same email and mobile already exist. Are you sure you want to add this lead ?',
                    () => {
                        setLoading(true)
                        addLead()
                    },
                    () => {
                        handleClose()
                    }
                )
            } else if (res?.data?.mobile_status) {
                setLoading(false)
                CustomDialog.warn(
                    'A Lead with the same mobile number already exist. Are you sure you want to add this lead ?',
                    () => {
                        setLoading(true)
                        addLead()
                    },
                    () => {
                        handleClose()
                    }
                )
            } else addLead()
        })
    }
    const handleRefer = (e) => {
        e.preventDefault()
        if (validate()) {
            setLoading(true)
            addLead()
            // checkDuplicate()
        }
    }
    const addLead = () => {
        addHiringLeadsService(body)
            .then((res) => {
                CustomToast.success('Referral created Successfully')
                getList()
                handleClose()
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => {
                setLoading(false)
            })
    }
    const updateLead = (e) => {
        e.preventDefault()
        var updateBody = {
            first_name: firstname,
            last_name: lastname,
            email: email,
            mobile_no: getMobileNumberWithoutMask(phone),
            state_id: homestate,
            comments: comment,
            status: preData?.status,
            reporting_manager_id: preData?.recruiter_id,
        }
        if (validate()) {
            setLoading(true)
            updateHiringLeadsService(preData?.id, updateBody)
                .then((res) => {
                    CustomToast.success('Updated Successfully')
                    getList()
                    handleClose()
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }
    const [statelist, setStateList] = useState([])
    useEffect(function () {
        getStateListService()
            .then((res) => {
                setStateList(res.data)
            })
            .catch((e) => {
                setStateList([])
            })
    }, [])
    return (
        <CustomModal
            show={show}
            onHide={handleClose}
            title={preData ? 'Update Lead' : 'Add New Lead'}
            maxWidth='750'
        >
            <CustomLoader visible={loading} full size={100} />

            {/* Top Qr scanner */}
            <div
                className='bg-cmGrey100 d-flex align-items-start justify-content-center flex-wrap gap-5 p-5 mx-sm-20 mx-10 mb-5'
                style={{borderRadius: '10px', fontFamily: fontsFamily.manrope}}
            >
                {/* QR Code*/}
                <div
                    style={{height: '147px', width: '146px'}}
                    className='bg-cmwhite rounded p-3 shadow'
                >
                    <QRCode value={redirectLink} className='w-100 h-100' />
                </div>

                <div className='card p-0 bg-transparent w-sm-50'>
                    <div className='card-body p-0'>
                        <div
                            className='card-title text-cmGrey900'
                            style={{fontSize: '14px', fontWeight: 600}}
                        >
                            Your Referral Code
                        </div>
                        <div
                            className='text-cmGrey600'
                            style={{fontSize: '11px', fontWeight: 600, lineHeight: '16px'}}
                        >
                            Streamline the lead generation process by quickly sharing the link, to
                            input valuable leads.
                        </div>
                    </div>
                    <div
                        className='card-footer pb-0 px-0 '
                        style={{fontSize: '11px', fontWeight: 500}}
                    >
                        <Link
                            className='text-decoration-underline cursor-pointer mb-2 text-cmGrey800'
                            to={`/referral?user_id=${loggedUserData?.id}`}
                            target='_blank'
                        >
                            {redirectLink}
                        </Link>
                        <div className='d-flex align-items-center gap-3'>
                            <KTSVG
                                onClick={() => {
                                    navigator.clipboard.writeText(redirectLink)
                                    CustomToast.success('Link Copied')
                                }}
                                path='/media/icons/duotune/art/CopyButtonSVG.svg'
                                svgClassName='h-35px w-35px cursor-pointer'
                            />
                            <RWebShare
                                data={{
                                    text: 'Sequifi | Referral',
                                    url: redirectLink,
                                    title: 'Sequifi',
                                }}
                            >
                                <KTSVG
                                    path='/media/icons/duotune/art/ButtonEdit.svg'
                                    svgClassName='h-35px w-35px cursor-pointer'
                                />
                            </RWebShare>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className='text-cmGrey600 text-center mb-5'
                style={{fontWeight: '600', fontSize: '12px'}}
            >
                Or add Manually
            </div>

            <form
                className='w-sm-75 mx-auto mb-10 overflow-hidden'
                onSubmit={preData ? updateLead : handleRefer}
            >
                <div className='px-15 mb-10' style={{fontFamily: 'Manrope', fontSize: '14px'}}>
                    {/*begin::Stepper */}
                    {/* Nmae */}
                    <div className='row mb-5'>
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

                    <div className=''>
                        <div className='mb-5'>
                            <CustomInput
                                label={'Reporting Manager'}
                                placeholder={
                                    loggedUserData?.is_manager
                                        ? `${loggedUserData?.first_name} ${loggedUserData?.last_name}`
                                        : loggedUserData?.manager_name ??
                                          loggedUserData?.first_name + loggedUserData?.last_name
                                }
                                disabled={true}
                            />
                        </div>
                    </div>
                    {/* Comments */}
                    <div className=''>
                        {preData ? (
                            //   <div className='mb-5'>
                            //     <label className='form-label text-cmGrey700' style={{fontWeight: '600'}}>
                            //       Lead Status
                            //     </label>
                            //     <select className='form-select cursor-pointer w-100 bg-cmGrey100 fw-bold'>
                            //       <option value=''>Follow up (Interview done)</option>
                            //     </select>
                            //   </div>
                            <></>
                        ) : (
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
                        )}
                    </div>
                </div>
                <div className='d-flex mx-auto justify-content-center align-items-center'>
                    <CustomButton
                        disabled={loading}
                        buttonType={BUTTON_TYPE.primary}
                        padding={'px-20'}
                        buttonLabel={preData ? 'Update' : 'Submit'}
                        onClick={(e) => (preData ? updateLead(e) : handleRefer(e))}
                    />
                </div>
            </form>
        </CustomModal>
    )
}

export {AddNewLeadsPopUp}
