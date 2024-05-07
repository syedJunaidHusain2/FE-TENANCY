import {useCallback, useEffect, useMemo, useState} from 'react'
import {fontsFamily} from '../../../../../../../../assets/fonts/fonts'
import {KTSVG} from '../../../../../../../../_metronic/helpers'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../../../customComponents/customButtton/CustomButton'
import TestEmailModal from '../offerLettersComponent/TestEmailModal'
import {useNavigate} from 'react-router-dom'
import {getSequiDocsAgreementListService} from '../../../../../../../../services/Services'

export const STEP_TYPE = {
    OFFER_LETTER: 'OFFER_LETTER',
    AGREEMENT: 'AGREEMENT',
    EMAIL_TEMPLATE: 'EMAIL_TEMPLATE',
    OTHER: 'OTHER',
}

const FinalStep = ({step, type, setStep, selectedTemplate}) => {
    const [openTestEmail, setOpenTestEmail] = useState(false)
    const [contractToSignData, setContractToSignData] = useState(null)

    const navigate = useNavigate()
    const handleTestEmailModal = () => {
        setOpenTestEmail(!openTestEmail)
    }

    useEffect(() => {
        getAgreementData()
    }, [])

    const getAgreementData = useCallback((selectedAgreement) => {
        getSequiDocsAgreementListService().then((res) => {
            setContractToSignData(res?.data)
        })
    }, [])

    const permissionList = useMemo(() => {
        var list = selectedTemplate?.permissions?.map((item, index) => {
            if (
                selectedTemplate?.permissions?.length > 1 &&
                index == selectedTemplate?.permissions?.length - 1
            ) {
                return `, and ${item?.position_detail?.position_name} `
            }
            // If it's the last item, don't add a space
            return ` ${item?.position_detail?.position_name}`
        })
        return list
    }, [selectedTemplate?.permissions])

    const recipientPosition = useMemo(() => {
        var list = selectedTemplate?.receipient?.map((item, index) => {
            if (
                selectedTemplate?.receipient?.length > 1 &&
                index == selectedTemplate?.receipient?.length - 1
            ) {
                return `, and ${item?.position_detail?.position_name} `
            }
            // If it's the last item, don't add a space
            return ` ${item?.position_detail?.position_name}`
        })
        return list
    }, [selectedTemplate?.receipient])

    const additionalRecipient = useMemo(() => {
        var list = selectedTemplate?.sequi_docs_additional_signature?.map((item, index) => {
            if (
                selectedTemplate?.sequi_docs_additional_signature?.length > 1 &&
                index == selectedTemplate?.sequi_docs_additional_signature?.length - 1
            ) {
                return `, and ${item?.additional_signature__positions?.position_name} `
            }
            // If it's the last item, don't add a space
            return ` ${item?.additional_signature__positions?.position_name}`
        })
        return list
    }, [selectedTemplate?.sequi_docs_additional_signature])

    const agreementTemplateDisplay = useMemo(() => {
        let foundHtmlData = []
        selectedTemplate?.template_agreements?.map((searchId) => {
            let foundItem = contractToSignData?.find((item) => item.id == searchId)
            if (foundItem) {
                foundHtmlData.push(foundItem)
            }
            // return foundItem ? foundItem.data : null
        })
        return foundHtmlData
    }, [contractToSignData, selectedTemplate?.template_agreements])

    const attachedAgreement = useMemo(() => {
        var list = agreementTemplateDisplay?.map((item, index) => {
            if (
                agreementTemplateDisplay?.length > 1 &&
                index == agreementTemplateDisplay?.length - 1
            ) {
                return `, and ${item?.template_name} `
            }
            // If it's the last item, don't add a space
            return ` ${item?.template_name}`
        })
        return list
    }, [agreementTemplateDisplay])

    const agreementList = useCallback(
        (positionId) => {
            let foundAgreement = selectedTemplate?.template_agreements?.find(
                (obj) => obj?.position_id == positionId
            )?.aggrement_template_ids

            let filteredList = contractToSignData?.filter((item) =>
                foundAgreement?.includes(item.id?.toString())
            )
            let agreementArr = []
            agreementArr = filteredList?.map((item) => item?.template_name)?.join(',')

            return `${agreementArr?.length > 0 ? agreementArr : '-'}`
        },
        [contractToSignData, selectedTemplate?.template_agreements]
    )

    return (
        <div
            className='bg-cmwhite text-center shadow-sm py-sm-15 py-10 px-5'
            style={{fontFamily: fontsFamily.manrope, fontSize: 14, borderRadius: 10}}
        >
            {/* internal block */}
            <div className='w-sm-75 mb-sm-15 mb-10 mx-auto '>
                <KTSVG
                    path='/media/icons/duotune/art/OpenMailwithPage.svg'
                    svgClassName='h-80px w-80px mb-5'
                />
                <div className='text-cmGrey900 mb-3' style={{fontSize: 20, fontWeight: 700}}>
                    Your template {selectedTemplate?.template_name} is ready to go!
                </div>
                <div className='text-cmGrey700' style={{fontWeight: 600, lineHeight: '24px'}}>
                    <div className='mb-5'>
                        Feel free to begin using {selectedTemplate?.template_name} for inviting
                        potential employees.
                        <br />
                        This template is stored in{' '}
                        <span className='text-cmGrey800' style={{fontWeight: 700}}>
                            Sequidocs &gt;
                            {type == STEP_TYPE.OFFER_LETTER
                                ? 'Offer Letters'
                                : type == STEP_TYPE.AGREEMENT
                                ? 'Agreements'
                                : type == STEP_TYPE.OTHER
                                ? 'Other Category'
                                : null}
                        </span>
                        , allowing you to make edits directly from there.
                    </div>
                    <div>
                        Permissions to use this template:{' '}
                        <span className='text-cmGrey900' style={{fontWeight: 700}}>
                            {/* Setters, Closers, Managers */}
                            {permissionList}
                        </span>{' '}
                        <br />
                        Recipient Position:{' '}
                        <span className='text-cmGrey900' style={{fontWeight: 700}}>
                            {/* Setters */}
                            {recipientPosition}
                        </span>{' '}
                        {additionalRecipient?.length > 0 ? (
                            <>
                                <br /> Additional Recipients:{' '}
                                <span className='text-cmGrey900' style={{fontWeight: 700}}>
                                    {/* Employee Manager */}
                                    {additionalRecipient}
                                </span>{' '}
                            </>
                        ) : null}
                        <br />
                        {type == STEP_TYPE.OFFER_LETTER &&
                        selectedTemplate?.template_agreements?.length > 0 ? (
                            <div>
                                {' '}
                                <span>Agreements attached:-</span>
                                {selectedTemplate?.receipient?.map((item) => {
                                    let agreements = agreementList(item?.position_id)

                                    return (
                                        <ul style={{listStyleType: 'none'}}>
                                            <li>
                                                <span
                                                    className='text-cmGrey700 me-2'
                                                    style={{fontWeight: 700}}
                                                >
                                                    {item?.position_detail?.position_name}-
                                                </span>
                                                <span
                                                    className='text-cmGrey800'
                                                    style={{fontWeight: 700}}
                                                >
                                                    {agreements}
                                                </span>
                                            </li>
                                        </ul>
                                    )
                                })}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            {/* Buttons */}
            <div className='d-flex flex-wrap flex-center gap-sm-10 gap-5'>
                <CustomButton
                    buttonLabel={
                        type == STEP_TYPE.OFFER_LETTER
                            ? 'Back to Offer Letters'
                            : type == STEP_TYPE.AGREEMENT
                            ? 'Back to Agreements'
                            : type == STEP_TYPE.OTHER
                            ? 'Back to Others'
                            : null
                    }
                    buttonType={BUTTON_TYPE.primaryBorder}
                    padding={'py-3'}
                    // onClick={() => setStep(step - 1)}
                    onClick={() => navigate(-1)}
                />
                <CustomButton
                    buttonLabel='Test Template'
                    buttonType={BUTTON_TYPE.secondary}
                    padding={'px-sm-10 py-3'}
                    onClick={handleTestEmailModal}
                />

                <CustomButton
                    buttonLabel='Use Now'
                    padding={'px-sm-15 py-3'}
                    onClick={() =>
                        navigate('/sequidocs/templates/send-letter', {
                            state: {
                                categoryId: selectedTemplate?.categery_id,
                                use: true,
                                templateId: selectedTemplate?.id,
                            },
                        })
                    }
                />
            </div>
            {openTestEmail ? (
                <TestEmailModal
                    show={openTestEmail}
                    handleClose={handleTestEmailModal}
                    templateData={selectedTemplate}
                />
            ) : null}
        </div>
    )
}

export default FinalStep
