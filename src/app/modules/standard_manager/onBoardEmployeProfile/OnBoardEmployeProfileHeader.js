import {useCallback, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import {
    formattedPhoneNumber,
    getErrorMessageFromResponse,
    isEmptyObjectValue,
} from '../../../../helpers/CommonHelpers'
import CustomToast from '../../../../customComponents/customToast/CustomToast'
import {HIRING_PROCESS_STATUS, getValidDate} from '../../../../constants/constants'
import {
    changeLeadStatusService,
    changeOnboardingEmployeeStatusService,
    deleteLeadService,
    deleteOnBoardingEmployeeListService,
    hireNowStep5Service,
    scheduleInterviewService,
    sendEmailbyIdService,
} from '../../../../services/Services'
import {SchedulePopup} from '../hiring/hiringLeads/SchedulePopup'
import {AssignModal} from './AssignModal'
import {getUserDataSelector} from '../../../../redux/selectors/AuthSelectors'
import {useSelector} from 'react-redux'
import CustomLoader from '../../../../customComponents/customLoader/CustomLoader'
import HireNew from '../hiring/onBoardingEmp/CompensationPlan/HireNew'
import {AddNewLeadsPopUp} from '../hiring/hiringLeads/AddNewLeadsPopUp'
import {HireNowModal} from '../hiring/onBoardingEmp/hireNowModal/HireNowModal'
import {
    SCHEDULE_INTERVIEW_VALIDATION_FIELD,
    scheduleInterviewValidation,
} from '../../../../validations/validations'
import CustomDialog from '../../../../customComponents/customDialog/CustomDialog'
import CustomButton, {BUTTON_TYPE} from '../../../../customComponents/customButtton/CustomButton'
import {allPermissionsAccess} from '../../../../accessRights/useCustomAccessRights'
import moment from 'moment'

const OnBoardEmployeProfileHeader = ({
    userData,
    loading,
    getData,
    setLoading,
    moduleType,
    getOnBoardingData,
}) => {
    const location = useLocation()
    const navigate = useNavigate()

    const [statusPopup, setStatusPopup] = useState(false)
    const [openAssigne, setOpenAssigne] = useState(false)
    // const [loading, setLoading] = useState(false)
    const [showHireNowModal, setShowHireNowModal] = useState(false)
    const [showHireNew, setShowHireNew] = useState(false)
    const [hireDirect, setHireDirect] = useState(false)
    const [edit, setEdit] = useState(false)
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [scheduleError, setScheduleError] = useState(SCHEDULE_INTERVIEW_VALIDATION_FIELD)

    const loggedUserData = useSelector(getUserDataSelector)

    // useEffect(() => {
    //   getLeadData()
    // }, [])

    // const getLeadData = () => {
    //   setLoading(true)
    //   getLeadByIdServices(location?.state?.id)
    //     .then((res) => setUserData(res?.data))
    //     .finally(() => setLoading(false))
    // }
    const handleStatusPopup = () => {
        setStatusPopup(false)
    }
    const handleEditClose = () => {
        setEdit(false)
    }
    const handleAssignePopup = () => {
        setOpenAssigne(false)
        getData()
    }
    const handleInterviewSchedule = () => {
        const body = {
            lead_id: userData?.id,
            user_id: loggedUserData?.id,
            date: getValidDate(date),
            schedule: time,
        }
        const validationErrors = scheduleInterviewValidation(body)
        setScheduleError(validationErrors)

        if (isEmptyObjectValue(validationErrors)) {
            setLoading(true)
            scheduleInterviewService(body)
                .then(() => {
                    changeStatus(
                        userData?.interview_time
                            ? HIRING_PROCESS_STATUS.interviewRescheduled
                            : HIRING_PROCESS_STATUS.interviewScheduled
                    ).finally(() => {
                        handleStatusPopup()
                    })
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
                .finally(() => {
                    CustomToast.success(
                        userData?.interview_time
                            ? HIRING_PROCESS_STATUS.interviewRescheduled
                            : HIRING_PROCESS_STATUS.interviewScheduled
                    )
                })
        }
    }

    const onReject = (reason) => {
        CustomDialog.warn('Are you sure want to reject this employee?', () => {
            setLoading(true)
            changeStatus(HIRING_PROCESS_STATUS.rejected).finally(getData)
        })
    }

    const handleClose = (onBoardId) => {
        setHireDirect(false)
        setShowHireNew(false)
        if (onBoardId) {
            navigate(-1)
        }
    }

    const changeStatus = (statusValue) =>
        new Promise((resolve, reject) => {
            setLoading(true)
            if (moduleType === 'leads') {
                changeLeadStatusService(userData?.id, statusValue)
                    .then(resolve)
                    .catch((e) => {
                        reject(e)
                        CustomToast.error(getErrorMessageFromResponse(e))
                    })
                    .finally(getData)
            } else {
                changeOnboardingEmployeeStatusService(userData?.id, statusValue)
                    .then(resolve)
                    .catch((e) => {
                        reject(e)
                        CustomToast.error(getErrorMessageFromResponse(e))
                    })
                    .finally(getData)
            }
        })

    const resendOfferLetter = () => {
        if ([HIRING_PROCESS_STATUS.offerExpired].includes(userData?.status_id)) {
            const body = {
                user_id: userData?.id,
                employee_agreement: {
                    probation_period: userData.probation_period,
                    offer_include_bonus: userData.offer_include_bonus,
                    hiring_bonus_amount: userData.hiring_bonus_amount,
                    date_to_be_paid: getValidDate(userData.date_to_be_paid, 'YYYY/MM/DD'),
                    period_of_agreement: getValidDate(
                        userData.period_of_agreement_start_date,
                        'YYYY/MM/DD'
                    ),
                    end_date: getValidDate(userData.end_date, 'YYYY/MM/DD'),
                    offer_expiry_date: getValidDate(moment().add(1, 'M'), 'YYYY/MM/DD'),
                },
            }

            setLoading(true)
            hireNowStep5Service(body)
                .then(() => {
                    sendEmailbyIdService(userData?.id, true)
                        .then(() => {
                            CustomToast.success('Offer letter resent')
                            getData()
                        })
                        .finally(() => setLoading(false))
                })
                .catch((error) => {
                    setLoading(false)
                    CustomToast.error(getErrorMessageFromResponse(error))
                })
        } else {
            setLoading(true)
            sendEmailbyIdService(userData?.id, true)
                .then(() => {
                    CustomToast.success('Offer letter resent')
                    getData()
                })
                .finally(() => setLoading(false))
        }
    }

    const onHireNowPress = useCallback((item) => {
        setShowHireNowModal(true)
    }, [])

    const handleHireNowModalClose = useCallback(
        (credentialStatus) => {
            if (credentialStatus == 'done') navigate(-1)
            setShowHireNowModal(false)
        },
        [navigate]
    )

    const onDelete = () => {
        CustomDialog.warn('Are you sure you want to delete ?', () => {
            deleteLeadService(userData?.id)
                .then(() => {
                    navigate(-1)
                })
                .finally(() => CustomToast.success('Lead deleted successfully'))
        })
    }

    const onDeleteOnboardEmaployee = () => {
        CustomDialog.warn('Are you sure you want to delete ?', () => {
            setLoading(true)
            deleteOnBoardingEmployeeListService(userData?.id)
                .then(() => {
                    CustomToast.success('Employee deleted successfully')
                    navigate(-1)
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
                .finally(() => {
                    setLoading(false)
                })
        })
    }

    return (
        <div
            className='card mb-2 mb-13 shadow-sm overflow-auto bg-cmwhite'
            style={{marginTop: '-42px', borderRadius: '12px'}}
        >
            <CustomLoader full visible={loading} />
            <div className='card-body pt-9 pb-0'>
                <div className='d-flex flex-wrap flex-sm-nowrap mb-3 '>
                    <div className='me-7 mb-4'>
                        {/* <div
              className='symbol symbol-100px ms-6 symbol-lg-160px symbol-fixed position-relative cursor-pointer'
              //   onMouseEnter={onHover}
              //   onMouseLeave={onLeave}
              style={{
                borderRadius: '100px',
                overflow: 'hidden',
              }}
            >
              <div style={{position: 'relative', width: '130px', height: '130px'}}>
                <div
                  // onClick={() => companyProfileFilePickerRef?.current?.click()}
                  style={{
                    position: 'absolute',
                    height: '100%',
                    borderRadius: '100px',
                    overflow: 'hidden',
                    justifyContent: 'center',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                  }}
                >
                  <span className='bi bi-pencil-fill fs-15 py-1 px-2 text-white shadow-sm rounded cursor-pointer'></span>
                </div>

                <img
                  style={{width: '130px', height: '130px'}}
                  src={toAbsoluteUrl('/media/logos/default-dark.svg')}
                  alt='Metornic'
                />
              </div>
            </div> */}
                        <input
                            //   ref={companyProfileFilePickerRef}
                            type='file'
                            name='logo'
                            accept='.png,.jpeg,.jpg,.heic'
                            //   onChange={(e) => {
                            //     updateCompanyProfileData(e?.target?.name, e?.target?.files?.[0])
                            //   }}
                            style={{display: 'none'}}
                        />
                    </div>

                    <div className='flex-grow-1'>
                        <div className='d-flex justify-content-between align-items-start flex-wrap'>
                            <div className='d-flex flex-column'>
                                <div className='d-flex align-items-center'>
                                    <a
                                        style={{
                                            fontSize: '18px',
                                            color: '#3F4254',
                                            fontFamily: 'Manrope',
                                            fontWeight: '600',
                                        }}
                                        className=' text-hover-primary me-1'
                                    >
                                        {userData?.first_name ?? '-'} {userData?.last_name}
                                    </a>
                                    {/* {userData?.position_name && ( */}
                                    <div
                                        className='ms-1 text-cmBlue-Crayola bg-cmBlue-Crayola bg-opacity-10 text-nowrap px-3'
                                        style={{
                                            borderRadius: '12px',
                                            fontFamily: 'Manrope',
                                            fontWeight: '600',
                                            fontSize: '12px',
                                        }}
                                    >
                                        {userData?.sub_position_name}
                                    </div>
                                    {/* )} */}
                                </div>
                                <div
                                    style={{fontFamily: 'Manrope', fontWeight: '500'}}
                                    className='d-flex-col flex-wrap col fs-12 pe-2'
                                >
                                    <a
                                        style={{
                                            fontFamily: 'Manrope',
                                            fontSize: '12px',
                                            color: '#757575                    ',
                                        }}
                                        className='d-flex align-items-center  text-hover-primary me-5 mb-2'
                                    >
                                        <i
                                            style={{
                                                color: '#757575',
                                                width: '10.94px',
                                                // height: '12.55px'
                                            }}
                                            className='bi bi-geo-alt me-3 mt-1'
                                        ></i>
                                        {location?.state?.moduleType == 'onboarding' ? (
                                            <>
                                                {userData?.office?.office_name},{' '}
                                                {userData?.office?.state?.name}
                                            </>
                                        ) : (
                                            <>{userData?.state_name}</>
                                        )}
                                    </a>

                                    <a
                                        style={{
                                            fontFamily: 'Manrope',
                                            fontSize: '12px',
                                            color: '#757575                    ',
                                        }}
                                        className='d-flex align-items-center  text-hover-primary me-5 mb-2 '
                                    >
                                        <i
                                            style={{
                                                color: '#757575',
                                                width: '12.52px',
                                                // height: '12.54px'
                                            }}
                                            className='bi bi-telephone me-2 mt-0'
                                        ></i>
                                        {formattedPhoneNumber(userData?.mobile_no) ?? '-'}
                                    </a>
                                    <a
                                        style={{
                                            fontFamily: 'Manrope',
                                            fontSize: '12px',
                                            color: '#757575                    ',
                                        }}
                                        className='d-flex align-items-center text-hover-primary mb-2'
                                    >
                                        <i
                                            style={{
                                                color: '#757575',
                                                width: '12.54px',
                                                // height: '10.79px'
                                            }}
                                            className='bi bi-envelope me-3 mt-0'
                                        ></i>
                                        {userData?.email}
                                    </a>
                                </div>
                            </div>

                            <div className='d-flex align-items-end flex-column'>
                                <div className=''>
                                    {location?.state?.moduleType == 'onboarding' &&
                                    ![
                                        HIRING_PROCESS_STATUS.onboarding,
                                        HIRING_PROCESS_STATUS.active,
                                    ].includes(userData?.status_id) &&
                                    allPermissionsAccess.standard.hiring.onboardingEmployees.hireNowFunc() ? (
                                        <CustomButton
                                            buttonType={BUTTON_TYPE.primaryBorder}
                                            onClick={() => {
                                                setHireDirect(true)
                                                setShowHireNew(true)
                                            }}
                                            buttonLabel='Hire Directly'
                                        />
                                    ) : (
                                        <></>
                                    )}
                                    {location?.state?.moduleType == 'leads' &&
                                    ![HIRING_PROCESS_STATUS.rejected]?.includes(
                                        userData?.status
                                    ) ? (
                                        <div
                                            className='btn bg-cmBlue-Crayola py-2 text-cmwhite'
                                            onClick={() => setEdit(true)}
                                        >
                                            Edit
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <div
                                    className={`px-5 my-3 
                  ${
                      [
                          HIRING_PROCESS_STATUS.rejected,
                          HIRING_PROCESS_STATUS.offerLetterRejected,
                          HIRING_PROCESS_STATUS.adminRejected,
                          HIRING_PROCESS_STATUS.offerExpired,
                      ].includes(userData?.status_id ?? userData?.status)
                          ? 'text-cmError'
                          : [
                                HIRING_PROCESS_STATUS.onboarding,
                                HIRING_PROCESS_STATUS.active,
                            ].includes(userData?.status_id ?? userData?.status)
                          ? 'text-cmSuccess'
                          : 'text-cmBlue-Crayola'
                  } 
                  ${
                      [
                          HIRING_PROCESS_STATUS.rejected,
                          HIRING_PROCESS_STATUS.offerLetterRejected,
                          HIRING_PROCESS_STATUS.adminRejected,
                          HIRING_PROCESS_STATUS.offerExpired,
                      ].includes(userData?.status_id ?? userData?.status)
                          ? 'bg-cmError'
                          : [
                                HIRING_PROCESS_STATUS.onboarding,
                                HIRING_PROCESS_STATUS.active,
                            ].includes(userData?.status_id ?? userData?.status)
                          ? 'bg-cmSuccess'
                          : 'bg-cmBlue-Crayola'
                  } 
                    bg-opacity-15`}
                                    style={{
                                        height: '20px',
                                        borderRadius: '12px',
                                        fontFamily: 'Manrope',
                                        display: 'flex',
                                        fontWeight: '600',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontSize: '14px',
                                    }}
                                >
                                    Status:{' '}
                                    {(userData?.status_name ?? userData?.status) == 'Declined'
                                        ? 'Offer Letter Rejected'
                                        : userData?.status_name ?? userData?.status}
                                </div>{' '}
                            </div>
                        </div>

                        <div className='d-flex flex-wrap align-items-center gap-8 mt-5 text-nowrap'>
                            {/* Resend Offer Lettter */}
                            {location?.state?.moduleType == 'onboarding' &&
                            [
                                HIRING_PROCESS_STATUS.offerLetterSent,
                                HIRING_PROCESS_STATUS.offerLetterResent,
                                HIRING_PROCESS_STATUS.requestedChange,
                                HIRING_PROCESS_STATUS.declined,
                                HIRING_PROCESS_STATUS.offerExpired,
                                HIRING_PROCESS_STATUS.offerLetterRejected,
                                HIRING_PROCESS_STATUS.accepted,
                                HIRING_PROCESS_STATUS.adminRejected,
                            ].includes(userData?.status ?? userData?.status_id) ? (
                                <div
                                    className={'btn text-cmGrey600 bg-cmGrey200 py-2'}
                                    style={{fontWeight: 600}}
                                    onClick={() => resendOfferLetter()}
                                >
                                    Resend Offer Letter
                                </div>
                            ) : (
                                <></>
                            )}
                            {/* Draft */}
                            {location?.state?.moduleType == 'onboarding' &&
                            [userData?.status, userData?.status_id].includes(
                                HIRING_PROCESS_STATUS.draft
                            ) ? (
                                <div
                                    className={
                                        'btn text-cmBlue-Crayola bg-cmBlue-Crayola bg-opacity-10 py-2'
                                    }
                                    style={{fontWeight: 600}}
                                    onClick={() => setShowHireNew(true)}
                                >
                                    Draft
                                </div>
                            ) : (
                                <></>
                            )}
                            {/* Delete */}
                            {location?.state?.moduleType == 'onboarding' &&
                            [
                                HIRING_PROCESS_STATUS.draft,
                                HIRING_PROCESS_STATUS.declined,
                                HIRING_PROCESS_STATUS.offerLetterRejected,
                                HIRING_PROCESS_STATUS.adminRejected,
                                HIRING_PROCESS_STATUS.offerExpired,
                                HIRING_PROCESS_STATUS.offerLetterAccepted,
                                HIRING_PROCESS_STATUS.offerLetterSent,
                                HIRING_PROCESS_STATUS.offerLetterResent,
                                HIRING_PROCESS_STATUS.requestedChange,
                            ].includes(userData?.status_id) ? (
                                <div
                                    className={'btn text-cmError bg-cmError bg-opacity-10 py-2'}
                                    style={{fontWeight: 600}}
                                    onClick={() => onDeleteOnboardEmaployee()}
                                >
                                    Delete
                                </div>
                            ) : (
                                <></>
                            )}
                            {/* Reject */}
                            {location?.state?.moduleType == 'onboarding' &&
                            [
                                HIRING_PROCESS_STATUS.offerLetterAccepted,
                                HIRING_PROCESS_STATUS.offerLetterSent,
                                HIRING_PROCESS_STATUS.offerLetterResent,
                                HIRING_PROCESS_STATUS.offerExpired,
                                HIRING_PROCESS_STATUS.requestedChange,
                                HIRING_PROCESS_STATUS.declined,
                                HIRING_PROCESS_STATUS.accepted,
                                HIRING_PROCESS_STATUS.offerLetterRejected,
                                HIRING_PROCESS_STATUS.adminRejected,
                            ].includes(userData?.status_id) ? (
                                <div
                                    className={'btn text-cmError bg-cmError bg-opacity-10 py-2'}
                                    style={{fontWeight: 600}}
                                    onClick={() =>
                                        changeStatus(HIRING_PROCESS_STATUS.adminRejected)
                                    }
                                >
                                    Reject
                                </div>
                            ) : (
                                <></>
                            )}
                            {/* Hire Now */}
                            {location?.state?.moduleType == 'onboarding' &&
                            [userData?.status, userData?.status_id].includes(
                                HIRING_PROCESS_STATUS.accepted
                            ) &&
                            allPermissionsAccess?.standard?.hiring?.onboardingEmployees?.hireNowFunc() ? (
                                <div
                                    className={
                                        'btn text-cmBlue-Crayola bg-cmBlue-Crayola bg-opacity-10 py-2'
                                    }
                                    style={{fontWeight: 600}}
                                    onClick={onHireNowPress}
                                >
                                    Hire Now
                                </div>
                            ) : (
                                <></>
                            )}
                            {/* Schdule / Reschedule Interview */}
                            {[
                                HIRING_PROCESS_STATUS.followUp,
                                HIRING_PROCESS_STATUS.onboardFollowUp,
                                HIRING_PROCESS_STATUS.interviewScheduled,
                                HIRING_PROCESS_STATUS.interviewRescheduled,
                            ].includes(userData?.status_id ?? userData?.status) ? (
                                <CustomButton
                                    onClick={() => {
                                        setStatusPopup(true)
                                    }}
                                    buttonType={BUTTON_TYPE.secondary}
                                    buttonLabel={
                                        userData?.interview_time
                                            ? 'Reschedule Interview'
                                            : 'Schedule Interview'
                                    }
                                />
                            ) : (
                                <></>
                            )}
                            {/* Hire */}
                            {userData?.status == HIRING_PROCESS_STATUS.interviewDone ? (
                                <CustomButton
                                    onClick={() => setShowHireNew(true)}
                                    buttonLabel='Hire'
                                />
                            ) : (
                                <></>
                            )}
                            {/* Assign */}
                            {location?.state?.moduleType == 'leads' &&
                                [
                                    HIRING_PROCESS_STATUS.followUp,
                                    HIRING_PROCESS_STATUS.interviewScheduled,
                                    HIRING_PROCESS_STATUS.interviewRescheduled,
                                ].includes(userData?.status) && (
                                    <CustomButton
                                        onClick={() => setOpenAssigne(true)}
                                        buttonLabel='Assign'
                                        buttonType={BUTTON_TYPE.secondary}
                                    />
                                )}
                            {/* Interview Done */}
                            {location?.state?.moduleType == 'leads' &&
                            userData?.interview_time &&
                            ![
                                HIRING_PROCESS_STATUS.rejected,
                                HIRING_PROCESS_STATUS.interviewDone,
                            ].includes(userData?.status) ? (
                                <CustomButton
                                    onClick={() => changeStatus('Interview Done')}
                                    buttonLabel='Interview Done'
                                />
                            ) : null}
                            {/* Reject */}
                            {location?.state?.moduleType == 'leads' &&
                            ![HIRING_PROCESS_STATUS.rejected]?.includes(userData?.status) ? (
                                <CustomButton
                                    buttonType={BUTTON_TYPE.error}
                                    onClick={() => onReject()}
                                    buttonLabel='Reject'
                                />
                            ) : (
                                <></>
                            )}
                            {/* Delete */}
                            {location?.state?.moduleType == 'leads' ? (
                                <CustomButton
                                    buttonType={BUTTON_TYPE.error}
                                    onClick={() => {
                                        onDelete()
                                    }}
                                    buttonLabel='Delete'
                                />
                            ) : null}
                        </div>
                    </div>
                </div>
                {/* <div className='modal-header'></div> */}
                <hr className='text-cmGrey500 py-0 my-0' />
                <div className=' ms-5 m-0 p-0'>
                    <ul
                        style={{
                            fontFamily: 'Manrope',
                            fontSize: '16px',
                            fontWeight: 800,
                        }}
                        className=' w-100 nav nav-stretch nav-line-tabs nav-line-tabs-8x border-transparent flex-nowrap'
                    >
                        {location?.state?.moduleType == 'leads' ? (
                            <li className='nav-item'>
                                <Link
                                    className={`nav-link ${
                                        location.pathname.includes('personal-info') && 'active'
                                            ? 'text-cmBlue-Crayola '
                                            : 'text-cmGrey500'
                                    }`}
                                    to='personal-info'
                                    state={{id: userData?.id, moduleType: moduleType}}
                                >
                                    Personal Info
                                </Link>
                            </li>
                        ) : null}

                        {location?.state?.moduleType == 'onboarding' ? (
                            <li className='nav-item'>
                                <Link
                                    className={`nav-link text-nowrap ${
                                        location.pathname.includes('employement-package') &&
                                        'active'
                                            ? 'text-cmBlue-Crayola '
                                            : 'text-cmGrey500'
                                    }`}
                                    to='employement-package'
                                    state={{id: userData?.id, moduleType: moduleType}}
                                >
                                    Employment Package
                                </Link>
                            </li>
                        ) : null}

                        <li className='nav-item'>
                            <Link
                                className={`nav-link text-nowrap ${
                                    location.pathname.includes('comments') && 'active'
                                        ? 'text-cmBlue-Crayola '
                                        : 'text-cmGrey500'
                                }`}
                                to='comments'
                                state={{
                                    leadId: userData?.id,
                                    userId: loggedUserData?.id,
                                    moduleType: moduleType,
                                    id: userData?.id,
                                }}
                            >
                                Notes
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                className={`nav-link text-nowrap ${
                                    location.pathname.includes('document') && 'active'
                                        ? 'text-cmBlue-Crayola '
                                        : 'text-cmGrey500'
                                }`}
                                to='document'
                                state={{
                                    employee_id: userData?.id,
                                    isOnBoarding: true,
                                    leadId: userData?.id,
                                    userId: loggedUserData?.id,
                                    moduleType: moduleType,
                                    id: userData?.id,
                                }}
                            >
                                Documents
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <SchedulePopup
                show={statusPopup}
                handleClose={handleStatusPopup}
                setTime={setTime}
                setDate={setDate}
                userData={userData}
                handleSchedule={handleInterviewSchedule}
                errorObj={scheduleError}
                loading={loading}
                changeStatus={changeStatus}
            />
            <AssignModal
                show={openAssigne}
                handleClose={handleAssignePopup}
                leadId={userData?.id}
                setLoading={setLoading}
            />
            {showHireNew ? (
                <HireNew
                    id={location?.state?.moduleType == 'onboarding' ? userData?.id : null}
                    lead_id={userData?.id}
                    show={showHireNew}
                    handleClose={(onBoardId) => handleClose(onBoardId)}
                    prefieldData={{
                        first_name: userData?.first_name,
                        last_name: userData?.last_name,
                        email: userData?.email,
                        mobile_no: userData?.mobile_no,
                    }}
                    hireDirect={hireDirect}
                />
            ) : null}
            <HireNowModal
                handleClose={handleHireNowModalClose}
                show={showHireNowModal}
                id={userData?.id}
            />
            {edit ? (
                <AddNewLeadsPopUp
                    show={edit}
                    handleClose={handleEditClose}
                    getList={getData}
                    preData={userData}
                />
            ) : null}
        </div>
    )
}

export default OnBoardEmployeProfileHeader
