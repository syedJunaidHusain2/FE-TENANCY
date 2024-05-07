import React, {useEffect, useRef, useState} from 'react'
import {fontsFamily} from '../../../../../../../../assets/fonts/fonts'
import {KTSVG} from '../../../../../../../../_metronic/helpers'
import {useLocation, useNavigate} from 'react-router-dom'
import QuillEditor from '../../../../../../common/quill/QuillEditor'
import CustomInput, {
    CommonLabel,
} from '../../../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomButton from '../../../../../../../../customComponents/customButtton/CustomButton'
import PreviewEmailModal from '../stepModals/PreviewEmailModal'
import {updateEmailTemplateService} from '../../../../../../../../services/Services'
import {getErrorMessageFromResponse} from '../../../../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../../../../customComponents/customToast/CustomToast'
import {EDIT_EMAIL_TEMPLATE_FIELDS} from '../../../../../../../../constants/constants'

const ManageEmailTemplate = () => {
    const quillRef = useRef()

    const navigate = useNavigate()
    const location = useLocation()
    const [openEmailPreview, setopenEmailPreview] = useState(false)
    const [loading, setLoading] = useState(false)
    const [editTemplateData, setEditTemplateData] = useState({
        email_subject: '',
        email_content: '',
    })

    const handlePreviewModal = () => {
        setopenEmailPreview(!openEmailPreview)
    }

    useEffect(() => {
        setEditTemplateData(location?.state?.templateData)
    }, [location])

    const onChangeInputData = (e) => {
        updateTemplateData(e?.target?.name, e?.target?.value)
    }

    const updateTemplateData = (field, value) => {
        setEditTemplateData((val) => ({
            ...val,
            [field]: value,
        }))
    }

    const updateEmailTemplate = () => {
        setLoading(true)
        const body = {
            email_subject: editTemplateData?.email_subject,
            email_content: editTemplateData?.email_content,
        }
        updateEmailTemplateService(editTemplateData?.id, body)
            .then(() => {
                navigate(-1)
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const CustomSmartTextToolbar = ({quillRef = null}) => {
        var TemplateFields = {...EDIT_EMAIL_TEMPLATE_FIELDS}
        if (editTemplateData?.unique_email_template_code == 7) {
            TemplateFields = {
                ...TemplateFields,
                Forgot_Password_Button: {key: 'Forgot_Password_Button'},
                Forgot_Password_Link: {key: 'Forgot_Password_Link'},
            }
        }

        const onCustomFieldPress = (item) => {
            const quillEditor = quillRef?.current?.getEditor()
            const currentPosition = quillEditor?.selection?.savedRange?.index ?? 0
            quillEditor?.clipboard?.dangerouslyPasteHTML(
                currentPosition,
                `<strong>[${TemplateFields[item]?.key}] </strong>`
            )
            quillEditor?.setSelection(currentPosition + (TemplateFields?.[item]?.key?.length + 4))
        }

        return (
            <>
                {Object.keys(TemplateFields).map((item) => (
                    <div
                        className='bg-cmGrey100 py-2 px-5 cursor-pointer'
                        style={{borderRadius: 10}}
                        onClick={() => onCustomFieldPress(item)}
                    >
                        [{TemplateFields[item].key}]
                    </div>
                ))}
            </>
        )
    }
    return (
        <div className='mb-20'>
            <div
                className='mb-5 d-flex align-items-center gap-3'
                style={{
                    fontFamily: fontsFamily.manrope,
                    fontSize: 20,
                    fontWeight: 600,
                }}
            >
                <KTSVG
                    path='/media/icons/duotune/art/back-square.svg'
                    svgClassName='h-25px w-20px cursor-pointer'
                    onClick={() => navigate(-1)}
                />
                <div className='text-cmGrey900'>Edit Email Template</div>
            </div>

            <div className='mb-10'>
                <div className='text-cmGrey900 mb-3' style={{fontSize: 18, fontWeight: 700}}>
                    {editTemplateData?.email_template_name}
                </div>
                <div className='text-cmGrey700' style={{fontWeight: 600, fontSize: 14}}>
                    {editTemplateData?.tmp_page_info}
                </div>
            </div>
            {/* body */}
            <div
                className='bg-cmwhite p-sm-10 py-5 px-10 px-sm-20 border border-cmDisabled mb-sm-20 mb-10'
                style={{borderRadius: 10}}
            >
                <div className='mb-5'>
                    <CustomInput
                        label={'Email Subject'}
                        required
                        value={editTemplateData?.email_subject}
                        name={'email_subject'}
                        onChange={onChangeInputData}
                    />
                </div>
                <div className=''>
                    {/* <div className='d-flex justify-content-between gap-5 align-items-center'>
                        <CommonLabel label='Email Message' />
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
                                style={{
                                    fontSize: 16,
                                    fontFamily: fontsFamily.manrope,
                                    fontWeight: 700,
                                }}
                            >
                                Preview
                            </div>
                            {openEmailPreview ? (
                                <PreviewEmailModal
                                    show={openEmailPreview}
                                    handleClose={handlePreviewModal}
                                />
                            ) : null}
                        </div>
                    </div> */}
                    {/* <QuillEditor
                        // quillRef={quillRef}
                        style={{height: '55vh'}}
                        value={editTemplateData?.email_content}
                        setValue={(val) => {
                            updateTemplateData('email_content', val)
                        }}
                    /> */}
                </div>
                <div className='d-flex flex-wrap align-items-start gap-15'>
                    <div className='w-sm-70'>
                        <div className='d-flex justify-content-between gap-5 align-items-center'>
                            <CommonLabel label='Email Message' />
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
                                    style={{
                                        fontSize: 16,
                                        fontFamily: fontsFamily.manrope,
                                        fontWeight: 700,
                                    }}
                                >
                                    Preview
                                </div>
                                {openEmailPreview ? (
                                    <PreviewEmailModal
                                        show={openEmailPreview}
                                        handleClose={handlePreviewModal}
                                        templateHtmlContent={editTemplateData?.email_content}
                                        toShow={false}
                                    />
                                ) : null}
                            </div>
                        </div>
                        <QuillEditor
                            quillRef={quillRef}
                            style={{height: '55vh'}}
                            value={editTemplateData?.email_content}
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
            <div className='text-center'>
                <CustomButton
                    buttonLabel='Update Template'
                    padding={'px-10'}
                    onClick={updateEmailTemplate}
                    loading={loading}
                />
            </div>
        </div>
    )
}

export default ManageEmailTemplate
