import React, {useCallback, useState} from 'react'

import {testEmailSettingService} from '../../../../../../services/Services'
import CustomModal from '../../../../../../customComponents/customModal/CustomModal'
import {fontsFamily} from '../../../../../../assets/fonts/fonts'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import {getErrorMessageFromResponse} from '../../../../../../helpers/CommonHelpers'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'

const TestServerEmailModal = ({show, handleClose}) => {
    const [emailValue, setEmailValue] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const onTestEmail = useCallback(() => {
        if (!emailValue) return setError('Enter Email Address')
        if (!isValidEmail(emailValue)) return setError('Enter Valid Email Address')
        setLoading(true)
        const body = {
            email: emailValue,
        }
        testEmailSettingService(body)
            .then(() => {
                handleClose()
                CustomToast.success('Email Sent Successfully')
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => setLoading(false))
    }, [emailValue, handleClose])
    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email)
    }

    const onChangeEmail = (e) => {
        setError(null)
        setEmailValue(e.target.value)
    }

    return (
        <CustomModal show={show} onHide={handleClose} maxWidth='800' title={`Send Test Email`}>
            <div className='w-sm-75 mx-auto' style={{fontFamily: fontsFamily.manrope}}>
                {/* body */}
                <div className='mb-15'>
                    <div>
                        <CustomInput
                            label={'Add email address to send test email'}
                            type={INPUT_TYPE.email}
                            value={emailValue}
                            onChange={onChangeEmail}
                            errorMessage={error}
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
                        onClick={onTestEmail}
                        loading={loading}
                    />
                </div>
            </div>
        </CustomModal>
    )
}

export default TestServerEmailModal
