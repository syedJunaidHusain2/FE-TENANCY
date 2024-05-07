import React, {useState} from 'react'
import QuillEditor from '../../../../../../common/quill/QuillEditor'
import CustomInput, {
    CommonLabel,
    INPUT_TYPE,
} from '../../../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomAutoCompleteDropdown from '../../../../../../../../customComponents/customInputs/customAutoCompleteDropdown/CustomAutoCompleteDropdown'
import CustomButton from '../../../../../../../../customComponents/customButtton/CustomButton'
import PreviewEmailModal from '../../components/stepModals/PreviewEmailModal'
import {fontsFamily} from '../../../../../../../../assets/fonts/fonts'

const TemplateSettingOtherTemplate = ({step, setStep}) => {
    const [openPreviewModal, setOpenPreviewModal] = useState(false)
    const handlePreviewModal = () => {
        setOpenPreviewModal(!openPreviewModal)
    }

    const onSave = () => {
        setStep(1 + step)
    }

    return (
        <div className='' style={{fontFamily: fontsFamily.manrope}}>
            {/* Top Heading */}
            <div className='mb-10'>
                <div className='text-cmGrey900 mb-2' style={{fontSize: 18, fontWeight: 700}}>
                    Start Configuring Your Offer Letter Template
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
                        errorMessage={null?.templateName}
                        value={null?.template_name}
                        name={'template_name'}
                        onChange={null}
                    />
                </div>
                <div className='mb-5'>
                    <CustomInput
                        label={'Template Description'}
                        required
                        type={INPUT_TYPE.textarea}
                        value={null?.template_description}
                        name={'template_description'}
                        onChange={null}
                        errorMessage={null?.templateDescription}
                    />
                </div>
                <div className='mb-5'>
                    <CustomAutoCompleteDropdown
                        required
                        label={
                            'Permissions  (who can use this template, You can select multiple positions)'
                        }
                        options={null}
                        onChange={null}
                        name={'permissions'}
                        value={null?.permissions}
                        selectedOptions={null?.permissions}
                        errorMessage={null?.permission}
                    />
                </div>
                <div className='mb-5'>
                    <CustomAutoCompleteDropdown
                        required
                        label={
                            'Add Recipient Position (People who will receive this, You can select multiple positions)'
                        }
                        options={null}
                        onChange={null}
                        name={'receipient'}
                        value={null?.receipient}
                        selectedOptions={null?.receipient}
                        errorMessage={null?.selectedPosition}
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
                        value={null?.email_subject}
                        errorMessage={null?.emailSubject}
                        onChange={null}
                    />
                </div>
                <div>
                    <div className='mb-2'>
                        <CommonLabel label='Email Message' />
                    </div>
                    <div className='d-flex flex-wrap align-items-start gap-15'>
                        <div className='w-sm-75'>
                            {/* {header} */}
                            <QuillEditor
                                quillRef={null}
                                style={{height: '25vh'}}
                                value={null?.email_content}
                                setValue={(val) => {
                                    null('email_content', val)
                                }}
                            />
                        </div>
                        <div className='' style={{fontSize: 16, fontWeight: 500}}>
                            <div className='text-cmGrey700 mb-3'>SMART TEXT</div>
                            <div className='d-flex flex-sm-column flex-wrap gap-3 text-cmGrey800'>
                                {/* <CustomSmartTextToolbar quillRef={quillRef} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='text-center'>
                <CustomButton buttonLabel='Save & Continue' padding={'px-10'} onClick={onSave} />
            </div>
            {openPreviewModal ? (
                <PreviewEmailModal show={openPreviewModal} handleClose={handlePreviewModal} />
            ) : null}
        </div>
    )
}

export default TemplateSettingOtherTemplate
