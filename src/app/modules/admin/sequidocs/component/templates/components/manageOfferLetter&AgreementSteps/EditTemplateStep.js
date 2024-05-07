import React, {useCallback, useMemo, useRef, useState} from 'react'
import {fontsFamily} from '../../../../../../../../assets/fonts/fonts'
import {Editor} from 'primereact/editor'
import {KTSVG} from '../../../../../../../../_metronic/helpers'
import PreviewOfferLetterModal from '../stepModals/PreviewOfferLetterModal'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../../../customComponents/customButtton/CustomButton'
import QuillEditor from '../../../../../../common/quill/QuillEditor'
import {
    TEMPLATE_DYNAMIC_FIELDS,
    TEMPLATE_DYNAMIC_SIGN_FIELDS,
    TEMPLATE_DYNAMIC_SPECIAL_FIELDS,
} from '../../../../../../../../constants/constants'
import {addTemplateEditTemplateStep3Service} from '../../../../../../../../services/Services'
import {getErrorMessageFromResponse} from '../../../../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../../../../customComponents/customToast/CustomToast'
import {Collapse} from '@mui/material'

const EditTemplateStep = ({
    step,
    setStep,
    categoryId,
    selectedTemplate,
    newCreatedTemplateId,
    templateId,
    setFinalTemplateData,
    heading,
}) => {
    const quillRef = useRef()
    const [buttonLoading, setButtonLoading] = useState(false)
    const [templateData, setTemplateData] = useState(selectedTemplate?.template_content)

    const [openPreviewModal, setOpenPreviewModal] = useState(false)
    const [showSpecialFields, setShowSpecialFields] = useState(true)
    const [showSmartFields, setShowSmartFields] = useState(true)

    const handlePreviewModal = () => {
        setOpenPreviewModal(!openPreviewModal)
    }

    const updateData = (value) => {
        setTemplateData(value)
    }

    const onSave = useCallback(() => {
        setFinalTemplateData(selectedTemplate)
        setButtonLoading(true)
        const body = {
            category_id: categoryId ?? selectedTemplate?.categery_id,
            template_id: templateId ?? newCreatedTemplateId,
            template_content: templateData,
        }
        addTemplateEditTemplateStep3Service(body)
            .then(() => {
                setStep(step + 1)
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => {
                setButtonLoading(false)
            })
    }, [
        categoryId,
        newCreatedTemplateId,
        selectedTemplate,
        setFinalTemplateData,
        setStep,
        step,
        templateData,
        templateId,
    ])

    const handleSpecialFieldDisplay = () => {
        setShowSpecialFields(!showSpecialFields)
    }
    const handleSmartFieldDisplay = () => {
        setShowSmartFields(!showSmartFields)
    }
    const renderHeader = () => {
        return (
            <div className='d-flex justify-content-between py-2 ps-sm-5 pe-sm-10'>
                <div className='text-cmError'></div>
                <div
                    className='d-flex flex-center gap-2 cursor-pointer'
                    onClick={handlePreviewModal}
                >
                    <KTSVG
                        path='/media/icons/duotune/art/search-normal.svg'
                        svgClassName='h-20px w-20px'
                    />
                    <div
                        className='text-cmBlue-Crayola'
                        style={{fontSize: 16, fontFamily: fontsFamily.manrope, fontWeight: 700}}
                    >
                        Preview
                    </div>
                </div>
            </div>
        )
    }

    const CustomSmartTextToolbar = ({quillRef = null}) => {
        const onCustomFieldPress = (item) => {
            const quillEditor = quillRef?.current?.getEditor()
            const currentPosition = quillEditor?.selection?.savedRange?.index ?? 0
            quillEditor?.clipboard?.dangerouslyPasteHTML(
                currentPosition,

                `<strong>[${TEMPLATE_DYNAMIC_FIELDS[item]?.key}] </strong>`
            )
            quillEditor?.setSelection(
                currentPosition + (TEMPLATE_DYNAMIC_FIELDS?.[item]?.key?.length + 4)
            )
        }

        return (
            <>
                {Object.keys(TEMPLATE_DYNAMIC_FIELDS).map((item) => (
                    <div
                        className='bg-cmGrey100 py-2 ps-2 pe-5  cursor-pointer'
                        style={{borderRadius: 10}}
                        onClick={() => onCustomFieldPress(item)}
                    >
                        [{TEMPLATE_DYNAMIC_FIELDS[item].key}]
                    </div>
                ))}
            </>
        )
    }
    const CustomSpecialFieldToolbar = ({quillRef = null}) => {
        const onCustomFieldPress = (item) => {
            const quillEditor = quillRef?.current?.getEditor()
            const currentPosition = quillEditor?.selection?.savedRange?.index ?? 0
            quillEditor?.clipboard?.dangerouslyPasteHTML(
                currentPosition,
                `<strong> ${TEMPLATE_DYNAMIC_SPECIAL_FIELDS[item]?.val} </strong>`
            )
            quillEditor?.setSelection(
                currentPosition + (TEMPLATE_DYNAMIC_SPECIAL_FIELDS?.[item]?.key?.length + 4)
            )
        }

        return (
            <>
                {Object.keys(TEMPLATE_DYNAMIC_SPECIAL_FIELDS).map((item) => (
                    <div
                        className='d-flex gap-2 flex-center bg-cmGrey100 py-2 ps-2 pe-5  cursor-pointer'
                        style={{borderRadius: 10}}
                        onClick={() => onCustomFieldPress(item)}
                    >
                        <div>[{TEMPLATE_DYNAMIC_SPECIAL_FIELDS[item].key}]</div>
                    </div>
                ))}
            </>
        )
    }

    const CustomSignatureFieldToolbar = ({quillRef = null}) => {
        const onCustomFieldPress = (item) => {
            const quillEditor = quillRef?.current?.getEditor()
            const currentPosition = quillEditor?.selection?.savedRange?.index ?? 0
            quillEditor?.clipboard?.dangerouslyPasteHTML(
                currentPosition,
                `<strong>[${TEMPLATE_DYNAMIC_SIGN_FIELDS[item]?.val}] </strong>`
            )
            quillEditor?.setSelection(
                currentPosition + (TEMPLATE_DYNAMIC_SIGN_FIELDS?.[item]?.val?.length + 4)
            )
        }

        return (
            <>
                {Object.keys(TEMPLATE_DYNAMIC_SIGN_FIELDS).map((item) =>
                    (TEMPLATE_DYNAMIC_SIGN_FIELDS[item].key == 'Employee Manager Signature' &&
                        selectedTemplate?.manager_sign_req) ||
                    (TEMPLATE_DYNAMIC_SIGN_FIELDS[item].key == 'Employee Signature' &&
                        selectedTemplate?.recipient_sign_req) ? (
                        <div
                            className='d-flex gap-2 flex-center bg-cmGrey100 py-2 ps-2 pe-5  cursor-pointer'
                            style={{borderRadius: 10}}
                            onClick={() => onCustomFieldPress(item)}
                        >
                            <div>{TEMPLATE_DYNAMIC_SIGN_FIELDS[item].key}</div>
                        </div>
                    ) : null
                )}
            </>
        )
    }
    const header = renderHeader()

    return (
        <div
            className='row align-items-start justify-content-between gap-10'
            style={{fontFamily: fontsFamily.manrope, fontSize: 14}}
        >
            <div className='col-lg-8'>
                {/* top heading */}
                <div className='mb-10 text-cmGrey700' style={{fontWeight: 600}}>
                    <div className='text-cmGrey900 mb-2' style={{fontSize: 18, fontWeight: 700}}>
                        {heading}
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
                {header}
                <QuillEditor
                    quillRef={quillRef}
                    style={{height: '75vh'}}
                    value={templateData}
                    setValue={(val) => updateData(val)}
                />
                {openPreviewModal ? (
                    <PreviewOfferLetterModal
                        show={openPreviewModal}
                        handleClose={handlePreviewModal}
                        templateHtmlContent={templateData}
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
                        {showSpecialFields ? (
                            <span
                                className='pi pi-chevron-circle-down cursor-pointer fs-5 me-2 '
                                onClick={handleSpecialFieldDisplay}
                            />
                        ) : (
                            <span
                                className='pi pi-chevron-circle-right cursor-pointer fs-5 me-2'
                                onClick={handleSpecialFieldDisplay}
                            />
                        )}
                        SPECIAL FIELD
                    </div>
                    <Collapse in={showSpecialFields}>
                        <div
                            className='d-flex gap-3
                 flex-wrap text-cmGrey800'
                        >
                            <CustomSpecialFieldToolbar quillRef={quillRef} />
                        </div>
                    </Collapse>
                </div>
                <div className='mb-10' style={{fontSize: 16}}>
                    <div
                        className='text-cmGrey700 mb-3'
                        style={{fontSize: 16, letterSpacing: 0.32}}
                    >
                        {showSmartFields ? (
                            <span
                                className='pi pi-chevron-circle-down cursor-pointer fs-5 me-2 '
                                onClick={handleSmartFieldDisplay}
                            />
                        ) : (
                            <span
                                className='pi pi-chevron-circle-right cursor-pointer fs-5 me-2'
                                onClick={handleSmartFieldDisplay}
                            />
                        )}
                        SMART TEXT
                    </div>
                    <Collapse in={showSmartFields}>
                        <div
                            className='d-flex gap-3
                 flex-wrap text-cmGrey800'
                        >
                            <CustomSmartTextToolbar quillRef={quillRef} />
                        </div>
                    </Collapse>
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
                        <CustomSignatureFieldToolbar quillRef={quillRef} />
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
                    onClick={onSave}
                    loading={buttonLoading}
                />
            </div>
        </div>
    )
}

export default EditTemplateStep
