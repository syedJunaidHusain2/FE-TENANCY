import {useState, useRef, useEffect} from 'react'

import {Dialog} from 'primereact/dialog'

import {createPortal} from 'react-dom'
import {StepperComponent} from '../../../../../../_metronic/assets/ts/components'
import UserOnboardFinalStepContainer from './steps/UserOnboardFinalStepContainer'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import images from '../../../../../../assets/images'
import {useSelector} from 'react-redux'
import {getCompanySettingSelector} from '../../../../../../redux/selectors/SettingsSelectors'

import useUserEmploymentPackage, {
    DEFAULT_EMPLOYEE_DATA,
    USER_TYPE,
} from '../../../../../../hooks/useUserEmploymentPackage'
import {
    DIGISIGNER_CONFIG,
    DOCUMENT_TO_ATTACH_WHILE_ONBOARD,
    HIRE_FIELD_KEYS,
    MAIN_DEPARTMENT_ID,
    MAIN_POSITTIONS_ID,
} from '../../../../../../constants/constants'
import moment from 'moment'

const modalsRoot = document.getElementById('root-modals') || document.body

const HireNew = ({
    id = null,
    show = false,
    recruiter_id = null,
    lead_id = null,
    handleClose = () => {},
    getonbording = () => {},
    setLoader = () => {},
    prefieldData = null,
    hireDirect = null,
}) => {
    const stepperRef = useRef()
    const stepper = useRef()
    const [page, setPage] = useState(false)
    const companySetting = useSelector(getCompanySettingSelector)

    const {
        loading,
        employeeData,
        setEmployeeData,
        personalDetailLoading,
        organizationLoading,
        redlineLoading,
        overrideLoading,
        agreementLoading,
        saveEmploymentPackage,

        // Edit Section
        EditPersonalDetailSection,
        EditOrganisationSection,
        EditRedlineComissionUpfrontSection,
        EditOverridesSection,
        EditAgreementsSection,

        selectedDocument,
        agreementStep,
        setAgreementStep,
    } = useUserEmploymentPackage({prefieldData, lead_id, id, recruiter_id, getonbording})

    const onModalClose = () => {
        handleClose(employeeData?.id)
        getonbording()
        setEmployeeData(DEFAULT_EMPLOYEE_DATA)
        setLoader(true)
        setPage(false)
    }

    const loadStepper = () => {
        stepper.current = StepperComponent.createInsance(stepperRef.current)
    }

    const prevStep = () => {
        if (!stepper.current) {
            return
        }
        if ([5, 6].includes(stepper.current.currentStepIndex)) setAgreementStep(1)
        stepper.current.goPrev()
    }

    const updateInitialData = {
        organisation: () => {
            const empData = {...employeeData}
            if (!empData?.sub_position_id)
                empData[HIRE_FIELD_KEYS.sub_position_id] = MAIN_POSITTIONS_ID.setter
            if (!empData?.department_id)
                empData[HIRE_FIELD_KEYS.department_id] = MAIN_DEPARTMENT_ID.sales
            setEmployeeData(empData)
        },
        agreements: () => {
            const empData = {...employeeData}
            if (!empData[HIRE_FIELD_KEYS.probation_period])
                empData[HIRE_FIELD_KEYS.probation_period] = 'None'
            if (!empData[HIRE_FIELD_KEYS.period_of_agreement_start_date])
                empData[HIRE_FIELD_KEYS.period_of_agreement_start_date] = new Date()
            if (!empData[HIRE_FIELD_KEYS.end_date])
                empData[HIRE_FIELD_KEYS.end_date] = moment().add('1', 'year').toDate()
            if (!empData[HIRE_FIELD_KEYS.end_date])
                empData[HIRE_FIELD_KEYS.end_date] = moment().add('1', 'year').toDate()
            if (!empData[HIRE_FIELD_KEYS.offer_expiry_date])
                empData[HIRE_FIELD_KEYS.offer_expiry_date] = moment().add('30', 'day').toDate()
            setEmployeeData(empData)
        },
    }
    useEffect(() => {
        if (stepper?.current?.currentStepIndex == 2) {
            updateInitialData.organisation()
        } else if (stepper?.current?.currentStepIndex == 4) {
            if (!companySetting?.overrides) updateInitialData.agreements()
        } else if (stepper?.current?.currentStepIndex == 5) {
            updateInitialData.agreements()
        }
    }, [stepper?.current?.currentStepIndex])

    const nextStep = () => {
        if (stepper.current.currentStepIndex == 1) {
            saveEmploymentPackage.personalDetailValidation().then(() => stepper.current.goNext())
        } else if (stepper.current.currentStepIndex == 2) {
            saveEmploymentPackage.organisationValidation().then(() => stepper.current.goNext())
        } else if (stepper.current.currentStepIndex == 3) {
            saveEmploymentPackage
                .commissionAndRedlineValidation()
                .then(() => stepper.current.goNext())
            setAgreementStep(1)
        } else if (stepper.current.currentStepIndex == 4) {
            if (companySetting?.overrides) {
                saveEmploymentPackage.overrideValidation().then(() => stepper.current.goNext())
                setAgreementStep(1)
            } else {
                if (DIGISIGNER_CONFIG.attach_document && agreementStep == 1) {
                    saveEmploymentPackage.agreementValidation().then(() => {
                        setAgreementStep(2)
                    })
                } else {
                    setPage(true)
                    stepper.current.goNext()
                }
            }
        } else if (stepper.current.currentStepIndex == 5) {
            if (agreementStep == 1) {
                saveEmploymentPackage.agreementValidation().then(() => {
                    if (DIGISIGNER_CONFIG.attach_document) setAgreementStep(2)
                    else {
                        setPage(true)
                        stepper.current.goNext()
                    }
                })
            } else {
                setPage(true)
                stepper.current.goNext()
            }
        }
    }

    const submit = () => {
        window.location.reload()
    }

    const footer = (
        <div
            className='text-cmBlack'
            style={{fontSize: '16px', fontWeight: '600', fontFamily: 'Manrope'}}
        >
            Onboard Employee
        </div>
    )

    return createPortal(
        <Dialog
            id='kt_modal_create_app'
            tabIndex={-1}
            aria-hidden='true'
            visible={show}
            onHide={onModalClose}
            onShow={loadStepper}
            backdrop='true'
            header={footer}
            className='w-sm-75  w-100 mx-auto p-0 m-0'
        >
            <div className='border border-gray-200'></div>

            <div className='modal-body py-lg-10  p-0'>
                <div
                    ref={stepperRef}
                    className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
                    id='kt_modal_create_app_stepper'
                >
                    <div className='d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px'>
                        <div className='stepper-nav ps-lg-10 mt-sm-0'>
                            <div className='stepper-item current' data-kt-stepper-element='nav'>
                                <div className='stepper-wrapper'>
                                    <div className='stepper-icon w-40px h-40px'>
                                        <i className='stepper-check fas fa-check'></i>
                                        <span className='stepper-number'>1</span>
                                    </div>
                                    <div className='stepper-label mt-1'>
                                        <h3
                                            className='stepper-title text-cmBlack'
                                            style={{
                                                fontWeight: '600',
                                                fontFamily: 'Manrope ',
                                                fontSize: '14px',
                                            }}
                                        >
                                            Details
                                        </h3>
                                        <span
                                            className='text-cmGrey600'
                                            style={{fontSize: '10px', fontWeight: 400}}
                                        >
                                            Employee Details
                                        </span>
                                    </div>
                                </div>
                                <div className='stepper-line h-40px'></div>
                            </div>
                            <div className='stepper-item' data-kt-stepper-element='nav'>
                                <div className='stepper-wrapper'>
                                    <div className='stepper-icon w-40px h-40px'>
                                        <i className='stepper-check fas fa-check'></i>
                                        <span className='stepper-number'>2</span>
                                    </div>
                                    <div className='stepper-label'>
                                        <h3
                                            className='stepper-title text-cmBlack'
                                            style={{
                                                fontWeight: '600',
                                                fontFamily: 'Manrope ',
                                                fontSize: '14px',
                                            }}
                                        >
                                            Organization
                                        </h3>
                                        <span
                                            className='text-cmGrey600'
                                            style={{fontSize: '10px', fontWeight: 400}}
                                        >
                                            Departments and Positions
                                        </span>
                                    </div>
                                </div>
                                <div className='stepper-line h-40px'></div>
                            </div>

                            <div className='stepper-item' data-kt-stepper-element='nav'>
                                <div className='stepper-wrapper'>
                                    <div className='stepper-icon w-40px h-40px'>
                                        <i className='stepper-check fas fa-check'></i>
                                        <span className='stepper-number'>3</span>
                                    </div>
                                    <div className='stepper-label'>
                                        <h3
                                            className='stepper-title text-cmBlack'
                                            style={{
                                                fontWeight: '600',
                                                fontFamily: 'Manrope ',
                                                fontSize: '14px',
                                            }}
                                        >
                                            Compensation
                                        </h3>
                                        <span
                                            className='text-cmGrey600'
                                            style={{fontSize: '10px', fontWeight: 400}}
                                        >
                                            Basic Pay Plan
                                        </span>
                                    </div>
                                </div>
                                <div className='stepper-line h-40px'></div>
                            </div>
                            {companySetting?.overrides ? (
                                <div className='stepper-item' data-kt-stepper-element='nav'>
                                    <div className='stepper-wrapper'>
                                        <div className='stepper-icon w-40px h-40px'>
                                            <i className='stepper-check fas fa-check'></i>
                                            <span className='stepper-number'>4</span>
                                        </div>
                                        <div className='stepper-label'>
                                            <h3
                                                className='stepper-title text-cmBlack'
                                                style={{
                                                    fontWeight: '600',
                                                    fontFamily: 'Manrope ',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                Overrides
                                            </h3>
                                            <span
                                                className='text-cmGrey600'
                                                style={{fontSize: '10px', fontWeight: 400}}
                                            >
                                                Set overrides
                                            </span>
                                        </div>
                                    </div>
                                    <div className='stepper-line h-40px'></div>
                                </div>
                            ) : (
                                <></>
                            )}
                            <div className='stepper-item' data-kt-stepper-element='nav'>
                                <div className='stepper-wrapper'>
                                    <div className='stepper-icon w-40px h-40px'>
                                        <i className='stepper-check fas fa-check'></i>
                                        <span className='stepper-number'>
                                            {companySetting?.overrides ? 5 : 4}
                                        </span>
                                    </div>
                                    <div className='stepper-label'>
                                        <h3
                                            className='stepper-title text-cmBlack'
                                            style={{
                                                fontWeight: '600',
                                                fontFamily: 'Manrope ',
                                                fontSize: '14px',
                                            }}
                                        >
                                            Agreement{' '}
                                            {DIGISIGNER_CONFIG.attach_document
                                                ? `${agreementStep} / ${DOCUMENT_TO_ATTACH_WHILE_ONBOARD?.length}`
                                                : ''}
                                        </h3>
                                        <span
                                            className='text-cmGrey600'
                                            style={{fontSize: '10px', fontWeight: 400}}
                                        >
                                            Input few more details
                                        </span>
                                    </div>
                                </div>
                                <div className='stepper-line h-40px'></div>
                            </div>
                            <div className='stepper-item' data-kt-stepper-element='nav'>
                                <div className='stepper-wrapper'>
                                    <div className='stepper-icon w-40px h-40px'>
                                        <i className='stepper-check fas fa-check'></i>
                                        <span className='stepper-number'>
                                            {companySetting?.overrides ? 6 : 5}
                                        </span>
                                    </div>
                                    <div className='stepper-label'>
                                        <h3
                                            className='stepper-title text-cmBlack'
                                            style={{
                                                fontWeight: 600,
                                                fontFamily: 'Manrope ',
                                                fontSize: '14px',
                                            }}
                                        >
                                            Finish
                                        </h3>
                                        <span
                                            className='text-cmGrey600'
                                            style={{fontSize: '10px', fontWeight: 400}}
                                        >
                                            Congratulations!
                                        </span>
                                    </div>
                                </div>

                                <div className=' mb-10'></div>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{marginTop: '-20px', position: 'relative'}}
                        className='flex-row-fluid py-lg-0 px-lg-15'
                    >
                        <CustomLoader
                            visible={
                                loading ||
                                personalDetailLoading ||
                                organizationLoading ||
                                redlineLoading ||
                                overrideLoading ||
                                agreementLoading
                            }
                            full
                            size={100}
                        />
                        <form noValidate id='kt_modal_create_app_form'>
                            {EditPersonalDetailSection}
                            {EditOrganisationSection}
                            {EditRedlineComissionUpfrontSection}
                            {companySetting?.overrides ? EditOverridesSection : null}
                            {EditAgreementsSection}
                            <UserOnboardFinalStepContainer
                                selectedDocument={selectedDocument}
                                onBackPress={() => {
                                    prevStep()
                                    setPage(false)
                                }}
                                employeeData={employeeData}
                                onModalClose={onModalClose}
                                page={page}
                                hireDirect={hireDirect}
                            />

                            {page === false ? (
                                <div className='d-flex' style={{justifyContent: 'center'}}>
                                    <div className='me-2'>
                                        <button
                                            style={{
                                                fontSize: '14px',
                                                marginLeft: '-70px',
                                                fontWeight: 700,
                                            }}
                                            type='button'
                                            className='btn mb-2 px-12 mx-2 btn-lg text-cmBlue-Crayola border border-cmBlue-Crayola'
                                            data-kt-stepper-action='previous'
                                            onClick={prevStep}
                                        >
                                            Back
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            type='button'
                                            className='btn btn-lg fs-6 mb-2 ms-5 w-md-250px h-md-45px bg-cmBlue-Crayola text-cmwhite'
                                            data-kt-stepper-action='submit'
                                            onClick={submit}
                                            style={{fontWeight: 700}}
                                        >
                                            Save and Continue
                                        </button>

                                        <button
                                            type='button'
                                            className='btn btn-lg fs-6 mb-2 px-8 py-4 mx-2 text-cmwhite bg-cmBlue-Crayola'
                                            data-kt-stepper-action='next'
                                            onClick={nextStep}
                                            style={{fontWeight: 700}}
                                        >
                                            Save and Continue
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <b></b>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </Dialog>,
        modalsRoot
    )
}

export default HireNew

export const LockedView = ({visible, userType = USER_TYPE.onboardEmployee}) => (
    <div className='h-25px'>
        {visible && userType == USER_TYPE.onboardEmployee ? (
            <label>
                <img alt='Sequifi' style={{}} className='' src={images.lock}></img>
                <label className='ms-2 text-cmGrey700' style={{fontSize: '12px'}}>
                    Locked
                </label>
            </label>
        ) : null}
    </div>
)
