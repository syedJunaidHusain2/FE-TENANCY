/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useRef} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {defaultCreateAppData, ICreateAppData} from './IAppModels'
import {StepperComponent} from '../../../assets/ts/components'
import {KTSVG} from '../../../helpers'
import {Step1} from './steps/Step1'
import {Step2} from './steps/Step2'
import {Step3} from './steps/Step3'
import {Step4} from './steps/Step4'
import {Step5} from './steps/Step5'
import {Step6} from './steps/step6'
import {Step7} from './steps/Step7'
type Props = {
    show: boolean
    handleClose: () => void
}

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateAppModal = ({show, handleClose}: Props) => {
    const stepperRef = useRef<HTMLDivElement | null>(null)
    const stepper = useRef<StepperComponent | null>(null)
    const [data, setData] = useState<ICreateAppData>(defaultCreateAppData)
    const [hasError, setHasError] = useState(false)
    const [page, setPage] = useState(false)
    const [value, setValue] = useState(false)
    const [label, setLabel] = useState(false)
    const [label1, setLabel1] = useState(false)

    const handleclose = () => {
        setValue(true)
    }
    const loadStepper = () => {
        stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
    }

    const updateData = (fieldsToUpdate: Partial<ICreateAppData>) => {
        const updatedData = {...data, ...fieldsToUpdate}
        setData(updatedData)
    }

    const checkAppBasic = (): boolean => {
        if (!data.appBasic.appName || !data.appBasic.appType) {
            return false
        }
        return true
    }

    const checkAppDataBase = (): boolean => {
        if (!data.appDatabase.databaseName || !data.appDatabase.databaseSolution) {
            return false
        }

        return true
    }

    const prevStep = () => {
        if (!stepper.current) {
            return
        }

        stepper.current.goPrev()
    }

    const nextStep = () => {
        setHasError(false)
        if (!stepper.current) {
            return
        }

        if (stepper.current.getCurrentStepIndex() === 1) {
            setLabel1(true)
            if (!checkAppBasic()) {
                setHasError(true)
                return
            }
        }
        if (stepper.current.getCurrentStepIndex() === 3) {
            if (!checkAppDataBase()) {
                setHasError(true)
                return
            }
        }
        if (stepper.current.getCurrentStepIndex() === 4) {
            setLabel(true)
            if (!checkAppDataBase()) {
                setHasError(true)
                return
            }
        }
        if (stepper.current.getCurrentStepIndex() === 5) {
            setPage(true)
            if (!checkAppDataBase()) {
                setHasError(true)
                return
            }
        }
        if (stepper.current.getCurrentStepIndex() === 6) {
            // window.location.reload()
            setValue(true)
            if (!checkAppDataBase()) {
                setHasError(false)
                return
            }
        }

        stepper.current.goNext()
    }

    const submit = () => {
        window.location.reload()
    }
    if (value === true) {
        handleClose()
    }
    return createPortal(
        <Modal
            id='kt_modal_create_app'
            tabIndex={-1}
            aria-hidden='true'
            dialogClassName='modal-dialog modal-dialog-centered mw-1000px'
            show={show}
            onHide={handleClose}
            onEntered={loadStepper}
            backdrop={true}
        >
            <div className='d-flex justify-content-center justify-content-between ms-17 ms-9'>
                <h2
                    className='ms-2 mt-6 w-50 ms-20 d-flex justify-content-end'
                    style={{fontSize: '16px', color: '#0D1821', fontFamily: 'Manrope'}}
                >
                    Create New Position
                </h2>
                {/* begin::Close */}
                <div
                    className='btn btn-sm me-4  mt-2 btn-icon btn-active-color-primary'
                    onClick={handleClose}
                >
                    <i className='bi bi-x-circle' style={{fontSize: '22px', color: '#616161'}}></i>
                </div>
            </div>
            <div className='mt-2' style={{borderBottom: '1px solid #EFF2F5'}}></div>

            <div className='modal-body py-lg-10  p-15'>
                {/*begin::Stepper */}
                <div
                    ref={stepperRef}
                    className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
                    id='kt_modal_create_app_stepper'
                >
                    {/* begin::Aside*/}
                    <div className='d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px'>
                        {/* begin::Nav*/}
                        <div className='stepper-nav ps-lg-10 mt-sm-10'>
                            {/* begin::Step 1*/}
                            <div className='stepper-item current' data-kt-stepper-element='nav'>
                                {/* begin::Wrapper*/}
                                <div className='stepper-wrapper'>
                                    {/* begin::Icon*/}
                                    <div
                                        // style={{background: 'white', borderRadius: '50%', border: '1px solid #BDBDBD'}}
                                        className='stepper-icon w-40px h-40px'
                                    >
                                        <i className='stepper-check fas fa-check'></i>
                                        <span className='stepper-number'>1</span>
                                    </div>
                                    {/* end::Icon*/}

                                    {/* begin::Label*/}
                                    <div className='stepper-label'>
                                        <h3
                                            className='stepper-title'
                                            style={{
                                                color: '#000000',
                                                fontFamily: 'Manrope ',
                                                fontSize: '14px',
                                            }}
                                        >
                                            Position
                                        </h3>

                                        <div
                                            className='stepper-desc'
                                            style={{
                                                color: '#757575',
                                                fontFamily: 'Manrope',
                                                fontSize: '10px',
                                            }}
                                        >
                                            Create New Position
                                        </div>
                                    </div>
                                    {/* end::Label*/}
                                </div>
                                {/* end::Wrapper*/}
                                <div className='stepper-line h-55px'></div>
                                <div
                                    className='stepper-desc'
                                    style={{
                                        color: '#757575',
                                        fontFamily: 'Manrope',
                                        fontSize: '10px',
                                    }}
                                >
                                    {label === false ? (
                                        <div
                                            style={{
                                                background:
                                                    label1 === false ? '#FAFAFA' : '#FAFAFA',
                                                borderRadius: '50%',
                                                border:
                                                    label1 === false
                                                        ? '2px solid #BDBDBD'
                                                        : '2px solid #6078EC                        ',
                                            }}
                                            className=' w-40px h-40px'
                                        >
                                            {/* <i className=' fas fa-check'></i> */}
                                            <span
                                                className=' d-flex ms-4 mt-2'
                                                style={{
                                                    fontSize: '17px',
                                                    color:
                                                        label1 === false
                                                            ? '#BDBDBD'
                                                            : '#6078EC                        ',
                                                }}
                                            >
                                                2
                                            </span>
                                        </div>
                                    ) : (
                                        <div
                                            style={{
                                                background: '#00C247                        ',
                                                borderRadius: '50%',
                                                border: '2px solid #BDBDBD',
                                            }}
                                            className=' w-40px h-40px'
                                        >
                                            <i
                                                style={{color: 'white', fontSize: '22px'}}
                                                className='ms-2 mt-2 fas fa-check'
                                            ></i>
                                        </div>
                                    )}
                                </div>
                                {/* begin::Line*/}
                                <div className='stepper-line h-10px'></div>
                                {/* end::Line*/}
                            </div>
                            {/* end::Step 1*/}
                            {/* begin::Step 2*/}

                            <div className='stepper-item' data-kt-stepper-element='nav'>
                                <div className='stepper-wrapper'>
                                    <div
                                        className='stepper-icon ms-4'
                                        style={{width: '13px', height: '13px', marginTop: '-8px'}}
                                    >
                                        <i
                                            style={{fontSize: '9px'}}
                                            className='stepper-check fas fa-check'
                                        ></i>
                                        <span className='stepper-number'></span>
                                    </div>
                                    <div className='stepper-label'>
                                        <h3
                                            className='stepper-title'
                                            style={{
                                                color: '#757575',
                                                fontFamily: 'Manrope ',
                                                fontSize: '10px',
                                            }}
                                        >
                                            Commission Structure
                                        </h3>
                                    </div>
                                </div>
                                <div
                                    style={{marginTop: '-7px'}}
                                    className='stepper-line h-10px'
                                ></div>
                            </div>

                            <div className='stepper-item' data-kt-stepper-element='nav'>
                                <div className='stepper-wrapper'>
                                    <div
                                        className='stepper-icon ms-4'
                                        style={{width: '13px', height: '13px', marginTop: '-8px'}}
                                    >
                                        <i
                                            style={{fontSize: '9px'}}
                                            className='stepper-check fas fa-check'
                                        ></i>
                                        <span className='stepper-number'></span>
                                    </div>
                                    <div className='stepper-label'>
                                        <h3
                                            className='stepper-title'
                                            style={{
                                                color: '#757575',
                                                fontFamily: 'Manrope ',
                                                fontSize: '10px',
                                            }}
                                        >
                                            Upfront
                                        </h3>
                                    </div>
                                </div>
                                <div
                                    style={{marginTop: '-7px'}}
                                    className='stepper-line h-10px'
                                ></div>
                            </div>

                            <div className='stepper-item' data-kt-stepper-element='nav'>
                                <div className='stepper-wrapper'>
                                    <div
                                        className='stepper-icon  ms-4'
                                        style={{width: '13px', height: '13px', marginTop: '-8px'}}
                                    >
                                        <i
                                            style={{fontSize: '9px'}}
                                            className='stepper-check fas fa-check'
                                        ></i>
                                        <span className='stepper-number'></span>
                                    </div>
                                    <div className='stepper-label'>
                                        <h3
                                            className='stepper-title'
                                            style={{
                                                color: '#757575',
                                                fontFamily: 'Manrope ',
                                                fontSize: '10px',
                                            }}
                                        >
                                            Deductions
                                        </h3>
                                    </div>
                                </div>
                                <div
                                    style={{marginTop: '-7px'}}
                                    className='stepper-line h-20px'
                                ></div>
                            </div>

                            <div className='stepper-item' data-kt-stepper-element='nav'>
                                <div className='stepper-wrapper'>
                                    <div className='stepper-icon w-40px h-40px'>
                                        <i className='stepper-check fas fa-check'></i>
                                        <span className='stepper-number'>3</span>
                                    </div>
                                    {/* end::Icon*/}

                                    {/* begin::Label*/}
                                    <div className='stepper-label'>
                                        <h3
                                            className='stepper-title'
                                            style={{
                                                color: '#000000',
                                                fontFamily: 'Manrope ',
                                                fontSize: '14px',
                                            }}
                                        >
                                            Overrides
                                        </h3>

                                        <div
                                            className='stepper-desc'
                                            style={{color: '#757575', fontSize: '10px'}}
                                        >
                                            Set Overrides
                                        </div>
                                    </div>
                                </div>
                                <div className='stepper-line h-60px'></div>
                            </div>
                            <div className='stepper-item' data-kt-stepper-element='nav'>
                                <div className='stepper-wrapper'>
                                    <div className='stepper-icon w-40px h-40px'>
                                        <i className='stepper-check fas fa-check'></i>
                                        <span className='stepper-number'>4</span>
                                    </div>
                                    <div className='stepper-label'>
                                        <h3
                                            className='stepper-title'
                                            style={{
                                                color: '#000000',
                                                fontFamily: 'Manrope ',
                                                fontSize: '14px',
                                            }}
                                        >
                                            Permissions
                                        </h3>

                                        <div
                                            className='stepper-desc'
                                            style={{color: '#757575', fontSize: '10px'}}
                                        >
                                            Set Permissions
                                        </div>
                                    </div>
                                    {/* end::Label*/}
                                </div>
                                <div className=' mb-10'></div>
                                {/* end::Wrapper*/}

                                {/* begin::Line*/}
                                {/* <div className='stepper-line h-40px'></div> */}
                                {/* end::Line*/}
                            </div>
                            {/* end::Step 4*/}
                            {/* begin::Step 5*/}
                            {/* <div className='stepper-item' data-kt-stepper-element='nav'>

                <div className='stepper-wrapper'>

                  <div className='stepper-icon w-40px h-40px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>5</span>
                  </div>

                  <div className='stepper-label'>
                    <h3 className='stepper-title'>Completed</h3>

                    <div className='stepper-desc'>Review and Submit</div>
                  </div>

                </div> */}
                            {/* </div> */}
                            {/* end::Step 5*/}
                        </div>
                        {/* end::Nav*/}
                    </div>
                    {/* begin::Aside*/}

                    {/*begin::Content */}
                    <div style={{marginTop: '-20px'}} className='flex-row-fluid py-lg-0 px-lg-15'>
                        {/*begin::Form */}
                        <form noValidate id='kt_modal_create_app_form'>
                            <Step1 data={data} updateData={updateData} hasError={hasError} />
                            <Step2 data={data} updateData={updateData} hasError={hasError} />
                            <Step3 data={data} updateData={updateData} hasError={hasError} />
                            <Step4 data={data} updateData={updateData} hasError={hasError} />
                            <Step5 data={data} updateData={updateData} hasError={hasError} />
                            <Step7 page={page} />
                            {/* <Step6 data={data} updateData={updateData} hasError={hasError} /> */}
                            {/*begin::Actions */}
                            <div className='d-flex justify-content-start'>
                                <div className='me-2'>
                                    <button
                                        style={{
                                            // background: '#6078EC',
                                            color: '#6078EC',
                                            border: '1px solid #6078EC',
                                            fontSize: '14px',
                                            // marginRight: '-100px',
                                            // marginLeft: '-240px',
                                        }}
                                        type='button'
                                        className='btn mb-2 w-md-175px btn-lg me-3 h-md-45px'
                                        data-kt-stepper-action='previous'
                                        onClick={prevStep}
                                    >
                                        {/* <KTSVG
                      path='/media/icons/duotune/arrows/arr063.svg'
                      className='svg-icon-3 me-1'
                    />{' '} */}
                                        Back
                                    </button>
                                </div>
                                <div>
                                    <button
                                        type='button'
                                        style={{
                                            background: '#6078EC',
                                            color: 'white',
                                            // marginLeft: '-240px',
                                        }}
                                        className='btn btn-lg fs-6 mb-2 ms-5 w-md-250px h-md-45px'
                                        data-kt-stepper-action='submit'
                                        onClick={submit}
                                    >
                                        Save and Continue
                                        {/* <KTSVG
                      path='/media/icons/duotune/arrows/arr064.svg'
                      className='svg-icon-3 ms-2 me-0'
                    /> */}
                                    </button>

                                    <button
                                        type='button'
                                        style={{
                                            background: '#6078EC',
                                            color: 'white',
                                            // marginLeft: '-240px',
                                        }}
                                        className='btn btn-lg fs-6 mb-2 ms-5 w-md-250px h-md-45px'
                                        data-kt-stepper-action='next'
                                        onClick={nextStep}
                                    >
                                        Save and Continue
                                        {/* <KTSVG
                      path='/media/icons/duotune/arrows/arr064.svg'
                      className='svg-icon-3 ms-1 me-0'
                    /> */}
                                    </button>
                                </div>
                            </div>
                            {/*end::Actions */}
                        </form>
                        {/*end::Form */}
                    </div>
                    {/*end::Content */}
                </div>
                {/* end::Stepper */}
            </div>
        </Modal>,
        modalsRoot
    )
}

export {CreateAppModal}
