import {useCallback, useState} from 'react'
import CustomModal from '../../../../../../../../customComponents/customModal/CustomModal'
import {KTSVG} from '../../../../../../../../_metronic/helpers'
import {fontsFamily} from '../../../../../../../../assets/fonts/fonts'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../../../customComponents/customButtton/CustomButton'
import {sendSequiDocTestTemplateEmailService} from '../../../../../../../../services/Services'
import CustomToast from '../../../../../../../../customComponents/customToast/CustomToast'
import {getErrorMessageFromResponse} from '../../../../../../../../helpers/CommonHelpers'

const TestEmailModal = ({show, handleClose, templateData}) => {
    const [value, setValue] = useState([])
    const [loading, setLoading] = useState(false)

    const onSendTestEmail = useCallback(() => {
        if (!value?.length > 0) return CustomToast.error('Enter Email')
        setLoading(true)
        const body = {
            email: value,
        }
        sendSequiDocTestTemplateEmailService(templateData?.id, body)
            .then(() => {
                handleClose()
                CustomToast.success('Email Sent Successfully')
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => setLoading(false))
    }, [handleClose, templateData, value])
    return (
        <CustomModal show={show} onHide={handleClose} maxWidth='800' title={`Send Test Email`}>
            <div className='w-sm-75 mx-auto' style={{fontFamily: fontsFamily.manrope}}>
                {/* body */}
                <div className='mb-20'>
                    <div className='bg-cmgreen bg-opacity-5 text-center py-5 rounded d-flex flex-center gap-5 mb-10'>
                        <KTSVG
                            path='/media/icons/duotune/art/OpenMailwithPage.svg'
                            svgClassName='h-50px w-50px'
                        />
                        <div className='text-cmGrey800' style={{fontSize: 17, fontWeight: 700}}>
                            {templateData?.template_name} is ready to be tested!
                        </div>
                    </div>
                    <div>
                        <CustomInput
                            label={'Add email addresses and press enter to add email address'}
                            type={INPUT_TYPE.ChipText}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                </div>
                {/* footer */}
                <div className='d-flex flex-center gap-sm-10 gap-5'>
                    <CustomButton
                        buttonLabel='Cancel'
                        buttonType={BUTTON_TYPE.primaryBorder}
                        buttonSize={BUTTON_SIZE.large}
                        padding={'px-sm-15'}
                        onClick={handleClose}
                    />
                    <CustomButton
                        buttonLabel='Send Test'
                        buttonSize={BUTTON_SIZE.large}
                        padding={'px-sm-15'}
                        onClick={onSendTestEmail}
                        loading={loading}
                    />
                </div>
            </div>
        </CustomModal>
    )
}

export default TestEmailModal
