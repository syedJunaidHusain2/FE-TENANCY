import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {fontsFamily} from '../../../../../../../../assets/fonts/fonts'
import CustomInput, {
    CommonLabel,
    INPUT_TYPE,
} from '../../../../../../../../customComponents/customInputs/customInput/CustomInput'
import {KTSVG} from '../../../../../../../../_metronic/helpers'
import CustomButton from '../../../../../../../../customComponents/customButtton/CustomButton'
import PreviewEmailModal from '../stepModals/PreviewEmailModal'
import {getPermissionsGroupListSelector} from '../../../../../../../../redux/selectors/PermissionsSelectors'
import {useSelector} from 'react-redux'
import CustomAutoCompleteDropdown from '../../../../../../../../customComponents/customInputs/customAutoCompleteDropdown/CustomAutoCompleteDropdown'
import {getPositionsSelector} from '../../../../../../../../redux/selectors/SettingsSelectors'
import {
    addTemplateSettingStep1Service,
    updateTemplateSettingService,
} from '../../../../../../../../services/Services'
import useValidation from '../../../../../../../../hooks/useValidation'
import {addTemplateStepsValidation} from '../../../../../../../../validations/validations'
import QuillEditor from '../../../../../../common/quill/QuillEditor'
import {EMAIL_TEMPLATE_DYNAMIC_FIELDS} from '../../../../../../../../constants/constants'
import CustomLoader from '../../../../../../../../customComponents/customLoader/CustomLoader'
import {getPositionsAction} from '../../../../../../../../redux/actions/SettingActions'
import {useDispatch} from 'react-redux'
import CustomToast from '../../../../../../../../customComponents/customToast/CustomToast'
import {getErrorMessageFromResponse} from '../../../../../../../../helpers/CommonHelpers'
const TemplateSettingStep = ({
    step,
    setStep,
    categoryId,
    selectedTemplate,
    setNewCreatedTemplateId,
    loading,
    templateId,
    heading,
}) => {
    const quillRef = useRef()

    const groupList = useSelector(getPermissionsGroupListSelector)
    const allPositions = useSelector(getPositionsSelector)
    const [openPreviewModal, setOpenPreviewModal] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [templateData, setTemplatesData] = useState({
        category_id: categoryId,
        template_name: null,
        template_description: null,
        email_subject: null,
        email_content: null,
        receipient: [],
        permissions: [],
    })
    const [validateTemplateData, templateErrorData] = useValidation()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPositionsAction())
    }, [])

    useEffect(() => {
        let permissionsData = selectedTemplate?.permissions?.map((item) => item?.position_id)

        let receipientData = selectedTemplate?.receipient?.map((item) => item?.position_id)
        let emailSub = selectedTemplate?.sequi_docs_email_settings?.email_subject
        let emailContent = selectedTemplate?.sequi_docs_email_settings?.email_content
        setTemplatesData({
            ...templateData,
            ...selectedTemplate,
            receipient: receipientData,
            permissions: permissionsData,
            email_content: emailContent,
            email_subject: emailSub,
        })
    }, [selectedTemplate])

    useEffect(() => {
        if (templateErrorData?.beginValidating) {
            validateTemplateData(addTemplateStepsValidation(templateData, 1))
        }
    }, [step, templateData, templateErrorData?.beginValidating, validateTemplateData])

    const handlePreviewModal = () => {
        setOpenPreviewModal(!openPreviewModal)
    }

    const positionList = useMemo(() => {
        return allPositions?.map((i) => ({name: i.position_name, value: i.id}))
    }, [allPositions])

    const permissionList = useMemo(() => {
        return groupList?.map((item) => ({name: item.group_name, value: item.group_id}))
    }, [groupList])

    const onChangeInputData = (e) => {
        updateTemplateData(e?.target?.name, e?.target?.value)
    }

    const updateTemplateData = (field, value) => {
        setTemplatesData((val) => ({
            ...val,
            [field]: value,
        }))
    }

    const onSave = useCallback(() => {
        validateTemplateData(addTemplateStepsValidation(templateData, 1)).then((res) => {
            if (res.isValidate) {
                setButtonLoading(true)
                if (selectedTemplate) {
                    const body = {
                        template_id: templateData?.id,
                        category_id: templateData?.categery_id,
                        template_name: templateData?.template_name,
                        template_description: templateData?.template_description,
                        email_subject: templateData?.email_subject,
                        email_content: templateData?.email_content,
                        receipient: templateData?.receipient,
                        permissions: templateData?.permissions,
                    }
                    updateTemplateSettingService(body)
                        .then((res) => {
                            setStep(step + 1)
                        })
                        .catch((e) => {
                            CustomToast.error(getErrorMessageFromResponse(e))
                        })
                        .finally(() => setButtonLoading(false))
                } else {
                    addTemplateSettingStep1Service(templateData)
                        .then((res) => {
                            setNewCreatedTemplateId(res?.data?.id)
                            setStep(step + 1)
                        })
                        .catch((e) => {
                            CustomToast.error(getErrorMessageFromResponse(e))
                        })
                        .finally(() => setButtonLoading(false))
                }
            }
        })
    }, [
        selectedTemplate,
        setNewCreatedTemplateId,
        setStep,
        step,
        templateData,
        validateTemplateData,
    ])

    const renderHeader = () => {
        return (
            <div className='d-flex justify-content-between py-2 ps-sm-5 pe-sm-10'>
                <div></div>
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

    const header = renderHeader()

    const CustomSmartTextToolbar = ({quillRef = null}) => {
        const onCustomFieldPress = (item) => {
            const quillEditor = quillRef?.current?.getEditor()
            const currentPosition = quillEditor?.selection?.savedRange?.index ?? 0
            quillEditor?.clipboard?.dangerouslyPasteHTML(
                currentPosition,
                `<strong>[${EMAIL_TEMPLATE_DYNAMIC_FIELDS[item]?.key}] </strong>`
            )
            quillEditor?.setSelection(
                currentPosition + (EMAIL_TEMPLATE_DYNAMIC_FIELDS?.[item]?.key?.length + 4)
            )
        }

        return (
            <>
                {Object.keys(EMAIL_TEMPLATE_DYNAMIC_FIELDS).map((item) => (
                    <div
                        className='bg-cmGrey100 py-2 px-5 cursor-pointer'
                        style={{borderRadius: 10}}
                        onClick={() => onCustomFieldPress(item)}
                    >
                        [{EMAIL_TEMPLATE_DYNAMIC_FIELDS[item].key}]
                    </div>
                ))}
            </>
        )
    }

    return (
        <div className='' style={{fontFamily: fontsFamily.manrope, position: 'relative'}}>
            <CustomLoader visible={loading} full />

            {/* Top Heading */}
            <div className='mb-10'>
                <div className='text-cmGrey900 mb-2' style={{fontSize: 18, fontWeight: 700}}>
                    Start Configuring Your {heading} Template
                </div>
                <div className='text-cmGrey700' style={{fontSize: 14, fontWeight: 700}}>
                    After assigning a name, description and permissions, you have the option to
                    either paste your own content or begin with a blank template.
                </div>
            </div>
            {/* first block */}
            <div className='rounded bg-cmwhite border border-cmDisabled py-10 px-sm-20 px-5 mb-10'>
                <div className='mb-5'>
                    <CustomInput
                        label={'Template Name'}
                        required
                        errorMessage={templateErrorData?.templateName}
                        value={templateData?.template_name}
                        name={'template_name'}
                        onChange={onChangeInputData}
                    />
                </div>
                <div className='mb-5'>
                    <CustomInput
                        label={'Template Description'}
                        required
                        type={INPUT_TYPE.textarea}
                        value={templateData?.template_description}
                        name={'template_description'}
                        onChange={onChangeInputData}
                        errorMessage={templateErrorData?.templateDescription}
                    />
                </div>
                <div className='mb-5'>
                    <CustomAutoCompleteDropdown
                        label={
                            'Permissions  (who can use this template, You can select multiple positions)'
                        }
                        options={positionList}
                        onChange={onChangeInputData}
                        name={'permissions'}
                        selectedOptions={templateData?.permissions}
                        errorMessage={templateErrorData?.permission}
                    />
                </div>
                <div className='mb-5'>
                    <CustomAutoCompleteDropdown
                        required
                        label={
                            'Add Recipient Position (People who will receive this, You can select multiple positions)'
                        }
                        options={positionList}
                        onChange={onChangeInputData}
                        name={'receipient'}
                        selectedOptions={templateData?.receipient}
                        errorMessage={templateErrorData?.selectedPosition}
                    />
                </div>
            </div>
            {/* Second heading */}
            <div className='mb-10'>
                <div className='text-cmGrey900 mb-2' style={{fontSize: 18, fontWeight: 700}}>
                    Email Settings
                </div>
                <div className='text-cmGrey700' style={{fontSize: 14, fontWeight: 700}}>
                    Specify the Email Subject and Body Text to Accompany This Template
                </div>
            </div>
            {/* second block */}
            <div className='rounded bg-cmwhite border border-cmDisabled py-10 px-sm-20 px-5 mb-10'>
                <div className='mb-10'>
                    <CustomInput
                        label={'Email Subject'}
                        required
                        placeholder='Add Subject'
                        name={'email_subject'}
                        value={templateData?.email_subject}
                        errorMessage={templateErrorData?.emailSubject}
                        onChange={onChangeInputData}
                    />
                </div>
                <div>
                    <div className='mb-2'>
                        <CommonLabel label='Email Message' />
                    </div>
                    <div className='d-flex flex-wrap align-items-start gap-15'>
                        <div className='w-sm-75'>
                            {header}
                            <QuillEditor
                                quillRef={quillRef}
                                style={{height: '25vh'}}
                                value={templateData?.email_content}
                                setValue={(val) => {
                                    updateTemplateData('email_content', val)
                                }}
                            />
                        </div>
                        <div className='' style={{fontSize: 16, fontWeight: 500}}>
                            <div className='text-cmGrey700 mb-3'>SMART TEXT</div>
                            <div className='d-flex flex-sm-column flex-wrap gap-3 text-cmGrey800'>
                                <CustomSmartTextToolbar quillRef={quillRef} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='text-center'>
                <CustomButton
                    buttonLabel='Save & Continue'
                    padding={'px-10'}
                    onClick={onSave}
                    loading={buttonLoading}
                />
            </div>
            {openPreviewModal ? (
                <PreviewEmailModal
                    show={openPreviewModal}
                    handleClose={handlePreviewModal}
                    templateHtmlContent={templateData?.email_content}
                />
            ) : null}
        </div>
    )
}

export default TemplateSettingStep
