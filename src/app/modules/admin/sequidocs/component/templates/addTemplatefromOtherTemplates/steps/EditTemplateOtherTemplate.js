import React, {useState} from 'react'
import {fontsFamily} from '../../../../../../../../assets/fonts/fonts'
import QuillEditor from '../../../../../../common/quill/QuillEditor'
import PreviewOfferLetterModal from '../../components/stepModals/PreviewOfferLetterModal'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../../../customComponents/customButtton/CustomButton'

const EditTemplateOtherTemplate = ({step, setStep}) => {
    const [openPreviewModal, setOpenPreviewModal] = useState(false)
    const handlePreviewModal = () => {
        setOpenPreviewModal(!openPreviewModal)
    }

    return (
        <div
            className='row align-items-start justify-content-between gap-10'
            style={{fontFamily: fontsFamily.manrope, fontSize: 14}}
        >
            <div className='col-lg-8'>
                {/* top heading */}
                <div className='mb-10 text-cmGrey700' style={{fontWeight: 600}}>
                    <div className='text-cmGrey900 mb-2' style={{fontSize: 18, fontWeight: 700}}>
                        Offer Letter
                    </div>
                    <div className='mb-5'>
                        Customize your template as needed. Then, pinpoint the parts that differ for
                        each candidate, like the title or compensation, and employ the smart text
                        drop-down to make editable fields for quick updates with every new hire.
                    </div>
                    <div className=' mb-5'>
                        <span className='bg-cmGrey100 me-1 px-2 py-1 border border-cmDisabled rounded'>
                            Smart text fields
                        </span>{' '}
                        will be populated later when you send out the template.
                    </div>
                    <div>
                        Subsequently you can use{' '}
                        <b className='text-cmGrey800' style={{fontWeight: 700}}>
                            []{' '}
                        </b>{' '}
                        as{' '}
                        <b className='text-cmGrey800' style={{fontWeight: 700}}>
                            {' '}
                            [text]{' '}
                        </b>{' '}
                        to create your own smart text. Any text between square brackets is a
                        placeholder whose value will have to be specified at the time of actual
                        letter generation / use.
                    </div>
                </div>
                {/* Editer block */}
                {/* {header} */}
                <QuillEditor
                    // quillRef={quillRef}
                    style={{height: '75vh'}}
                    // value={templateData}
                    // setValue={(val) => updateData(val)}
                />
                {openPreviewModal ? (
                    <PreviewOfferLetterModal
                        show={openPreviewModal}
                        handleClose={handlePreviewModal}
                    />
                ) : null}
            </div>
            <div
                className='col-lg bg-cmwhite  px-5 py-7 shadow-sm rounded'
                style={{height: '100vh', overflowX: 'hidden', overflowY: 'auto'}}
            >
                <div className='mb-10' style={{fontSize: 16}}>
                    <div
                        className='text-cmGrey700 mb-3'
                        style={{fontSize: 16, letterSpacing: 0.32}}
                    >
                        SPECIAL FIELD
                    </div>

                    <div
                        className='d-flex gap-3
         flex-wrap text-cmGrey800'
                    >
                        {/* <CustomSpecialFieldToolbar quillRef={quillRef} /> */}
                    </div>
                </div>
                <div className='mb-10' style={{fontSize: 16}}>
                    <div
                        className='text-cmGrey700 mb-3'
                        style={{fontSize: 16, letterSpacing: 0.32}}
                    >
                        SMART TEXT
                    </div>

                    <div
                        className='d-flex gap-3
         flex-wrap text-cmGrey800'
                    >
                        {/* <CustomSmartTextToolbar quillRef={quillRef} /> */}
                    </div>
                </div>

                <div className='' style={{fontSize: 16}}>
                    <div
                        className='text-cmGrey700 mb-3'
                        style={{fontSize: 16, letterSpacing: 0.32}}
                    >
                        SMART SIGNATURES
                    </div>
                    <div
                        className='d-flex gap-3
         flex-wrap text-cmGrey800'
                    >
                        <div
                            className='bg-cmGrey100 py-2 ps-2 pe-5  cursor-pointer'
                            style={{borderRadius: 10}}
                        >
                            Employee
                        </div>
                        <div
                            className='bg-cmGrey100 py-2 ps-2 pe-5  cursor-pointer'
                            style={{borderRadius: 10}}
                        >
                            Employee Initials
                        </div>
                        <div
                            className='bg-cmGrey100 py-2 ps-2 pe-5  cursor-pointer'
                            style={{borderRadius: 10}}
                        >
                            Employee’s Manager
                        </div>
                        <div
                            className='bg-cmGrey100 py-2 ps-2 pe-5  cursor-pointer'
                            style={{borderRadius: 10}}
                        >
                            Employee Manager Intials
                        </div>
                        <div
                            className='bg-cmGrey100 py-2 ps-2 pe-5  cursor-pointer'
                            style={{borderRadius: 10}}
                        >
                            Office Manager
                        </div>
                        <div
                            className='bg-cmGrey100 py-2 ps-2 pe-5  cursor-pointer'
                            style={{borderRadius: 10}}
                        >
                            Office Manager Initials
                        </div>
                        <div
                            className='bg-cmGrey100 py-2 ps-2 pe-5  cursor-pointer'
                            style={{borderRadius: 10}}
                        >
                            Regional Manager
                        </div>
                        <div
                            className='bg-cmGrey100 py-2 ps-2 pe-5  cursor-pointer'
                            style={{borderRadius: 10}}
                        >
                            Regional Manager Initials
                        </div>
                    </div>
                </div>
            </div>
            {/* Buttons */}
            <div className='w-sm-75 d-flex flex-wrap flex-center gap-sm-10 gap-5'>
                {step > 1 ? (
                    <CustomButton
                        buttonLabel='Back'
                        buttonType={BUTTON_TYPE.secondary}
                        padding={'px-sm-20 px-10'}
                        onClick={() => setStep(step - 1)}
                    />
                ) : null}
                <CustomButton
                    buttonLabel='Save & Continue'
                    padding={'px-sm-10 px-5'}
                    onClick={() => setStep(step + 1)}
                />
            </div>
        </div>
    )
}

export default EditTemplateOtherTemplate
