import CustomModal from '../../../../../../../../customComponents/customModal/CustomModal'
import CustomImage from '../../../../../../../../customComponents/customImage/CustomImage'
import {IMAGE_TYPE, formattedPhoneNumber} from '../../../../../../../../helpers/CommonHelpers'
import {getCompanyProfileSelector} from '../../../../../../../../redux/selectors/SettingsSelectors'
import {useSelector} from 'react-redux'

const PreviewOfferLetterModal = ({show, handleClose, templateHtmlContent, templateName}) => {
    const companyData = useSelector(getCompanyProfileSelector)

    return (
        <CustomModal
            show={show}
            // maxWidth='800'

            onHide={handleClose}
            backgroundColor='strip'
            showline={false}
        >
            <div className='position-relative' style={{fontSize: 14, fontWeight: 600}}>
                <div className='text-cmBlack text-center mb-5' style={{fontSize: 16}}>
                    Preview {templateName ?? 'Offer Letter'}
                </div>
                <div className='text-cmGrey700 text-center' style={{fontSize: 14}}>
                    We’ve filled in your smart text with example info so you can see what this
                    template looks like.
                </div>
                <hr className='text-cmGrey400' />

                <div
                    className='position-relative my-sm-10  overflow-auto mx-auto border border-cmGrey200 w-90 shadow-sm p-5'
                    style={{
                        width: '21cm',
                        height: '29.7cm',
                    }}
                >
                    <div className=''>
                        <div className='mb-5 text-center'>
                            <CustomImage
                                className={'w-50px h-50px'}
                                src={companyData?.logo}
                                type={IMAGE_TYPE.companyLogo}
                            />
                        </div>
                        <div className='h-75'>
                            <div
                                className='m-0 p-0       '
                                // style={{overflowY: 'auto'}}
                                dangerouslySetInnerHTML={{__html: templateHtmlContent}}
                            />
                        </div>
                    </div>

                    {/* <PreviewA4 allowOverflow={true}> */}

                    {/* </PreviewA4> */}
                    <footer className='border-top text-cmGrey900 text-center p-5'>
                        <div className='text-cmGrey800' style={{fontWeight: 500, fontSize: '12px'}}>
                            {companyData?.business_name} |{' '}
                            {formattedPhoneNumber(companyData?.business_phone)} |{' '}
                            {companyData?.company_email} |{''}
                            {companyData?.business_address}, {companyData?.business_state}{' '}
                            {companyData?.business_zip}
                        </div>
                    </footer>
                </div>
            </div>
        </CustomModal>
    )
}

export default PreviewOfferLetterModal
