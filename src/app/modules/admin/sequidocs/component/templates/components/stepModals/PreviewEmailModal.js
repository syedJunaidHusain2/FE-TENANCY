import React from 'react'
import CustomModal from '../../../../../../../../customComponents/customModal/CustomModal'
import {PreviewA4} from '@diagoriente/react-preview-a4'
import CustomImage from '../../../../../../../../customComponents/customImage/CustomImage'
import {KTSVG} from '../../../../../../../../_metronic/helpers'
import {CommonLabel} from '../../../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomButton, {
    BUTTON_SIZE,
} from '../../../../../../../../customComponents/customButtton/CustomButton'
import {getCompanyProfileSelector} from '../../../../../../../../redux/selectors/SettingsSelectors'
import {useSelector} from 'react-redux'
import {IMAGE_TYPE, formattedPhoneNumber} from '../../../../../../../../helpers/CommonHelpers'
const PreviewEmailModal = ({show, handleClose, templateHtmlContent, toShow = true}) => {
    const companyData = useSelector(getCompanyProfileSelector)

    return (
        <CustomModal show={show} onHide={handleClose} title={'Preview Email'} maxWidth='650'>
            <div className=''>
                <div className='text-center mb-5'>
                    <CustomImage
                        style={{width: '50px', height: '50px'}}
                        src={companyData?.logo}
                        type={IMAGE_TYPE.companyLogo}
                    />
                </div>
                {/* <div className='p-0 m-0 w-100 mb-3' style={{height: '115px'}}>
                    <KTSVG
                        path='/media/icons/duotune/art/EmailTemplateHeader.svg'
                        svgClassName='mh-500px p-0 m-0'
                        svgStyle={{width: '100%', height: '100%'}}
                    />
                </div> */}
                {/* <PreviewA4> */}
                <div
                    className='p-5'
                    style={{fontSize: '12px'}}
                    dangerouslySetInnerHTML={{__html: templateHtmlContent}}
                />
                {/* </PreviewA4> */}
                {toShow ? (
                    <>
                        <div className='border border-cmGrey300 rounded bg-cmGrey100 py-5 text-center mb-10'>
                            <div className='w-sm-75 mx-auto'>
                                <div className='mb-5'>
                                    <KTSVG
                                        path='/media/icons/duotune/art/EmailTemplates.svg'
                                        svgClassName='h-50px w-50px cursor-pointer'
                                    />
                                </div>
                                <div
                                    className='text-cmGrey700 mb-5'
                                    style={{fontSize: 14, fontWeight: 600}}
                                >
                                    {companyData?.business_name} has sent Offer Letter to Review and
                                    Sign
                                </div>
                                <div>
                                    <CustomButton
                                        buttonLabel='Review Document'
                                        buttonSize={BUTTON_SIZE.large}
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            className='mb-10'
                            style={{fontWeight: 600, lineHeight: '24px', fontSize: '12px'}}
                        >
                            <div className='text-cmGrey700' style={{fontSize: 14}}>
                                Or Click the link below to review and Sign the document-
                            </div>
                            <div className='text-cminfo text-decoration-underline cursor-pointer'>
                                https://na4.digisigner.net/signing/emails/
                            </div>
                        </div>{' '}
                    </>
                ) : null}
                <div className='border-top border-500 text-center p-5' style={{fontSize: 11}}>
                    <div
                        className='text-cmGrey800'
                        style={{fontWeight: 500, fontSize: '12px'}}
                    ></div>
                    <div className='text-cmGrey600 mb-4' style={{fontWeight: 500}}>
                        {companyData?.business_name} |{' '}
                        {formattedPhoneNumber(companyData?.business_phone)} |{' '}
                        {companyData?.company_email} |{''}
                        {companyData?.business_address}, {companyData?.business_state}{' '}
                        {companyData?.business_zip}
                    </div>
                    <div className='text-cmGrey600 mb-2' style={{fontWeight: 500}}>
                        © Copyright |{' '}
                        <span className='text-cmBlue-Crayola cursor-pointer'>
                            {companyData?.company_email}
                        </span>{' '}
                        | All rights reserved
                    </div>
                    <div className='d-flex align-items-center justify-content-center '>
                        <div className='text-cmGrey500' style={{fontWeight: '500'}}>
                            Powered by
                        </div>

                        <KTSVG
                            path='/media/icons/duotune/art/sequifiSLogo.svg'
                            svgClassName='w-30px h-30px'
                        />
                        <KTSVG
                            path='/media/icons/duotune/art/sequifi-text.svg'
                            svgClassName='w-35px'
                        />
                    </div>
                </div>
            </div>
        </CustomModal>
    )
}

export default PreviewEmailModal
