import React, {useCallback, useEffect, useState} from 'react'
import {fontsFamily} from '../../../../../../assets/fonts/fonts'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomDropdown from '../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomCheckbox from '../../../../../../customComponents/customCheckbox/CustomCheckbox'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import {
    emailSettingService,
    getSettingService,
    testEmailSettingService,
} from '../../../../../../services/Services'
import {
    AUTHENTICATION_OPTIONS,
    PROTOCAL_OPTIONS,
    PROVIDER_OPTIONS,
    SECURITY_PROTOCOL_OPTIONS,
} from '../../../../../../constants/constants'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import {getErrorMessageFromResponse} from '../../../../../../helpers/CommonHelpers'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import useValidation from '../../../../../../hooks/useValidation'
import {addEmailSettingValidation} from '../../../../../../validations/validations'
import TestServerEmailModal from './TestServerEmailModal'

const INITIAL_DATA = {
    email_from_address: null,
    service_provider: null,
    protocal: null,
    host_name: null,
    smtp_port: null,
    timeout: null,
    security_protocol: null,
    authentication_method: null,
    token_app_id: null,
    token_app_key: null,
    mail_user_name: null,
    mail_password: null,
}

const SystemEmails = () => {
    const [loading, setLoading] = useState(false)
    const [fullLoading, setFullLoading] = useState(false)
    const [emailConfigurationData, setEmailConfigurationData] = useState(INITIAL_DATA)
    const [validateEmailData, emailSettingErrorData] = useValidation()
    const [openTestEmailModal, setOpenTestEmailModal] = useState(false)

    useEffect(() => {
        getEmailConfigurationData()
    }, [])

    useEffect(() => {
        if (validateEmailData?.beginValidating) {
            validateEmailData(addEmailSettingValidation(emailConfigurationData))
        }
    }, [emailConfigurationData, validateEmailData])

    const getEmailConfigurationData = useCallback(() => {
        setFullLoading(true)
        getSettingService()
            .then((res) => {
                setEmailConfigurationData({...emailConfigurationData, ...res.data})
            })
            .finally(() => {
                setFullLoading(false)
            })
    }, [])

    const handleInput = (e) => {
        setEmailConfigurationData((val) => ({
            ...val,
            [e?.target?.name]: e?.target?.value,
        }))
    }

    const onSaveEmailSetup = useCallback(() => {
        const body = {...emailConfigurationData}
        validateEmailData(addEmailSettingValidation(body)).then((res) => {
            if (res.isValidate) {
                setLoading(true)

                emailSettingService(body)
                    .then(() => {
                        getEmailConfigurationData()
                        CustomToast.success('Email Configured')
                        // setEmailConfigurationData(INITIAL_DATA)
                    })
                    .catch((e) => {
                        CustomToast.error(getErrorMessageFromResponse(e))
                    })
                    .finally(() => setLoading(false))
            }
        })
    }, [emailConfigurationData, getEmailConfigurationData, validateEmailData])

    const handleTestEmail = () => {
        setOpenTestEmailModal(!openTestEmailModal)
    }

    return (
        <div
            className=''
            style={{
                fontSize: 14,
                fontWeight: 600,
                fontFamily: fontsFamily.manrop,
                position: 'relative',
            }}
        >
            <CustomLoader full visible={fullLoading} />

            {/* <div className='shadow-sm bg-cmwhite mb-10' style={{borderRadius: 10}}>
                <div className='text-cmGrey900 pt-3 ps-10 pb-5' style={{fontSize: 16}}>
                    Email Settings
                </div>
                <div className='row container mx-auto px-sm-20 py-5'>
                    <div className='col-sm-3 text-cmGrey700'>Send Email via:</div>
                    <div className='col-sm text-decoration-underline text-cmBlue-Crayola cursor-pointer'>
                        Add SMTP Email Server
                    </div>
                </div>
                <div className='bg-strip py-5 text-strip'>.</div>

                <div className='px-sm-20 py-5 text-cmGrey900' style={{fontSize: 16}}>
                    General Settings for emails
                </div>
                <div className='row container px-sm-20 py-5 bg-strip mx-auto'>
                    <div className='col-sm text-cmGrey700'>
                        Remove Sequifi branding from all emails:
                    </div>
                    <div className='col-sm  form-switch form-check-custom form-check-solid'>
                        <input
                            className='cursor-pointer form-check-input h-20px w-35px '
                            type='checkbox'
                            value=''
                            id='flexSwitchDefault'
                            checked={null}
                            onChange={() => null}
                        />
                    </div>
                </div>

                <div className='row container px-sm-20 py-5 mx-auto'>
                    <div className='col-sm text-cmGrey700'>
                        Send software emails to all Superadmins
                    </div>
                    <div className='col-sm  form-switch form-check-custom form-check-solid'>
                        <input
                            className='cursor-pointer form-check-input h-20px w-35px '
                            type='checkbox'
                            value=''
                            id='flexSwitchDefault'
                            checked={null}
                            onChange={() => null}
                        />
                    </div>
                </div>
                <div className='row container px-sm-20 py-5 mx-auto bg-strip'>
                    <div className='col-sm text-cmGrey700'>
                        Do not sent emails for leads that are added manually
                    </div>
                    <div className='col-sm  form-switch form-check-custom form-check-solid'>
                        <input
                            className='cursor-pointer form-check-input h-20px w-35px '
                            type='checkbox'
                            value=''
                            id='flexSwitchDefault'
                            checked={null}
                            onChange={() => null}
                        />
                    </div>
                </div>
                <div className='row container px-sm-20 py-5 mx-auto'>
                    <div className='col-sm text-cmGrey700'>More settings coming soon</div>
                    <div className='col-sm  form-switch form-check-custom form-check-solid'>
                        <input
                            className='cursor-pointer form-check-input h-20px w-35px '
                            type='checkbox'
                            value=''
                            id='flexSwitchDefault'
                            checked={null}
                            onChange={() => null}
                        />
                    </div>
                </div>
            </div> */}
            <div className='shadow-sm bg-cmwhite p-5' style={{borderRadius: 10}}>
                <div className='text-cmGrey700 ms-sm-20 mb-10'>
                    Use this page to add a SMTP mail server. This designated server will be used for
                    all outgoing emails from Sequifi.
                </div>
                <div className='w-sm-50 mx-auto mb-10'>
                    <CustomInput
                        label={'From address'}
                        placeholder='Enter address'
                        onChange={handleInput}
                        value={emailConfigurationData?.email_from_address}
                        name='email_from_address'
                        errorMessage={emailSettingErrorData?.email_from_address}
                    />
                    <div className='text-cmGrey600' style={{fontSize: 12}}>
                        The default address this server will use to send emails from
                    </div>
                </div>
                <div className='ms-sm-20 mb-10'>
                    <div className='text-black mb-3' style={{fontSize: 16, fontWeight: 700}}>
                        Server Details
                    </div>
                    <div className='text-cmGrey700'>
                        Enter either the host name of your SMTP server ot the JNDI location of a
                        javax.mail.session object to use.
                    </div>
                </div>
                <div className='w-sm-50 mx-auto'>
                    <div className='text-black mb-3' style={{fontSize: 16, fontWeight: 700}}>
                        SMTP Host
                    </div>
                    <div className='row mb-5'>
                        <div className='col-sm'>
                            <CustomDropdown
                                label={'Service Provider'}
                                value={emailConfigurationData?.service_provider}
                                onChange={handleInput}
                                options={PROVIDER_OPTIONS}
                                searching={false}
                                name={'service_provider'}
                                errorMessage={emailSettingErrorData?.service_provider}
                            />
                        </div>
                        <div className='col-sm'>
                            <CustomDropdown
                                label={'Protocol'}
                                value={emailConfigurationData?.protocal}
                                onChange={handleInput}
                                options={PROTOCAL_OPTIONS}
                                searching={false}
                                name={'protocal'}
                                errorMessage={emailSettingErrorData?.protocal}
                            />
                        </div>
                    </div>
                    <div className='mb-5'>
                        <CustomInput
                            type={INPUT_TYPE.text}
                            label={'Host Name'}
                            onChange={handleInput}
                            value={emailConfigurationData?.host_name}
                            name='host_name'
                            errorMessage={emailSettingErrorData?.host_name}
                        />
                        <div className='text-cmGrey600' style={{fontSize: 12}}>
                            The SMTP host name of your mail server
                        </div>
                    </div>

                    <div className='mb-5'>
                        <CustomInput
                            label={'SMTP Port'}
                            type={INPUT_TYPE.number}
                            onChange={handleInput}
                            value={emailConfigurationData?.smtp_port}
                            name='smtp_port'
                            errorMessage={emailSettingErrorData?.smtp_port}
                        />
                        <div className='text-cmGrey600' style={{fontSize: 12}}>
                            Optional - SMTP port number to use. Leave black for detail (defaults:
                            SMTP - 25, SMTPS - 465).
                        </div>
                    </div>

                    <div className='mb-5'>
                        <CustomInput
                            type={INPUT_TYPE.number}
                            label={'Timeout (ms)'}
                            onChange={handleInput}
                            value={emailConfigurationData?.timeout}
                            name='timeout'
                            errorMessage={emailSettingErrorData?.timeout}
                        />
                        <div className='text-cmGrey600' style={{fontSize: 12}}>
                            Timeout for every request sent from Sequifi to mail server.Leave the
                            default or enter 0 for no timeout.
                        </div>
                    </div>
                    <div className='d-flex align-items-center gap-5 mb-5'>
                        {/* <div className='text-cmGrey700'>TLS.</div>

                        <CustomCheckbox />
                        <div className='text-cmGrey700' style={{fontSize: 12}}>
                            Optional - the mail server requires the use of TLS security.
                        </div> */}
                        <CustomDropdown
                            label={'Security Protocol'}
                            value={emailConfigurationData?.security_protocol}
                            onChange={handleInput}
                            options={SECURITY_PROTOCOL_OPTIONS}
                            searching={false}
                            name={'security_protocol'}
                            errorMessage={emailSettingErrorData?.security_protocol}
                        />
                    </div>
                    <div className='mb-5'>
                        <CustomDropdown
                            label={'Authentication method'}
                            value={emailConfigurationData?.authentication_method}
                            onChange={handleInput}
                            options={AUTHENTICATION_OPTIONS}
                            searching={false}
                            name={'authentication_method'}
                            errorMessage={emailSettingErrorData?.authentication_method}
                        />
                    </div>

                    {emailConfigurationData?.authentication_method == 'user_name/password' ? (
                        <div className='mb-sm-20 mb-10'>
                            {/* <CustomDropdown label={'Username'} /> */}
                            <CustomInput
                                type={INPUT_TYPE.text}
                                label={'Username'}
                                onChange={handleInput}
                                value={emailConfigurationData?.mail_user_name}
                                name='mail_user_name'
                                errorMessage={emailSettingErrorData?.mail_user_name}
                            />
                            <div className='text-cmGrey600' style={{fontSize: 12}}>
                                Optional - if you use authenticated SMTP to send email, enter your
                                username.
                            </div>
                            <div className='mt-3'>
                                <CustomInput
                                    type={INPUT_TYPE.password}
                                    label={'Password'}
                                    onChange={handleInput}
                                    value={emailConfigurationData?.mail_password}
                                    name='mail_password'
                                    errorMessage={emailSettingErrorData?.mail_password}
                                />
                            </div>
                        </div>
                    ) : null}
                    {emailConfigurationData?.authentication_method == 'token' ? (
                        <div className='mb-sm-20 mb-10'>
                            {/* <CustomDropdown label={'Username'} /> */}
                            <CustomInput
                                type={INPUT_TYPE.text}
                                label={'Token App ID'}
                                onChange={handleInput}
                                value={emailConfigurationData?.token_app_id}
                                name='token_app_id'
                                errorMessage={emailSettingErrorData?.token_app_id}
                            />

                            <CustomInput
                                type={INPUT_TYPE.password}
                                label={'Token App Key'}
                                onChange={handleInput}
                                value={emailConfigurationData?.token_app_key}
                                name='token_app_key'
                                feedback={false}
                                errorMessage={emailSettingErrorData?.token_app_key}
                            />
                        </div>
                    ) : null}
                    {/* <div className='text-center mb-10'>
                        <CustomButton
                            buttonLabel='Add Server'
                            buttonSize={BUTTON_SIZE.large}
                            padding={'px-15'}
                            onClick={onSaveEmailSetup}
                            loading={loading}
                        />
                    </div> */}
                    <div className='d-flex gap-3 flex-center mb-10'>
                        <CustomButton
                            buttonLabel='Add Server'
                            buttonSize={BUTTON_SIZE.large}
                            padding={'px-15'}
                            onClick={onSaveEmailSetup}
                            loading={loading}
                        />
                        <CustomButton
                            buttonLabel='Test Server'
                            buttonSize={BUTTON_SIZE.large}
                            padding={'px-15'}
                            onClick={handleTestEmail}
                            buttonType={BUTTON_TYPE.secondary}
                            // loading={loading}
                        />
                    </div>
                </div>
            </div>
            {emailConfigurationData?.id && openTestEmailModal ? (
                <TestServerEmailModal show={openTestEmailModal} handleClose={handleTestEmail} />
            ) : null}
        </div>
    )
}

export default SystemEmails
