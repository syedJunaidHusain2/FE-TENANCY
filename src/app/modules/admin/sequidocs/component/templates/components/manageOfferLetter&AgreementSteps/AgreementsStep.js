import {useCallback, useEffect, useMemo, useState} from 'react'
import {fontsFamily} from '../../../../../../../../assets/fonts/fonts'
import CustomCheckbox from '../../../../../../../../customComponents/customCheckbox/CustomCheckbox'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../../../customComponents/customButtton/CustomButton'
import {
    addTemplateAgreementStep4Service,
    getSequiDocsAgreementListService,
} from '../../../../../../../../services/Services'
import CustomLoader from '../../../../../../../../customComponents/customLoader/CustomLoader'
import {PreviewA4} from '@diagoriente/react-preview-a4'
import {getCompanyProfileSelector} from '../../../../../../../../redux/selectors/SettingsSelectors'
import {useSelector} from 'react-redux'
import {formattedPhoneNumber} from '../../../../../../../../helpers/CommonHelpers'
import _ from 'lodash'
import {Document, Page, pdfjs} from 'react-pdf'

const AgreementsStep = ({
    step,
    setStep,
    categoryId,
    selectedTemplate,
    newCreatedTemplateId,
    templateId,
    setFinalTemplateData,
}) => {
    const [contractToSignData, setContractToSignData] = useState(null)
    const companyData = useSelector(getCompanyProfileSelector)

    const [selectedAgreements, setSelectedAgreements] = useState(
        selectedTemplate?.template_agreements ?? []
    )
    const [loading, setLoading] = useState(false)
    const [fullLoading, setFullLoading] = useState(false)
    const [agreementBody, setAgreementBody] = useState(null)

    useEffect(() => {
        const numberArray = selectedTemplate?.template_agreements.map((str) => parseInt(str, 10))
        setSelectedAgreements(numberArray)
    }, [selectedTemplate])

    useEffect(() => {
        if (step === 4) getAgreementData()
    }, [])

    useEffect(() => {
        var positionIds = selectedTemplate?.receipient
            ?.map((item) => item?.position_id)
            ?.map((ids) => {
                return {[ids]: []}
            })
        if (selectedTemplate?.template_agreements) {
            positionIds = positionIds?.map((obj) => {
                const id = Object.keys(obj)[0]
                const match = selectedTemplate?.template_agreements?.find(
                    (item) => item?.position_id == id
                )

                if (match) {
                    obj[id] = match.aggrement_template_ids?.map((item) => Number(item))
                }
                return obj
            })
        }
        setAgreementBody(positionIds)
    }, [])

    const getAgreementData = useCallback((selectedAgreement) => {
        setLoading(true)
        getSequiDocsAgreementListService()
            .then((res) => {
                const readyAgreementList = res?.data?.filter((item) => item?.completed_step == 3)

                setContractToSignData(readyAgreementList)
            })
            .finally(() => setLoading(false))
    }, [])

    const handleCheckbox = (agreementData, positionId) => {
        const foundIndex = agreementBody?.findIndex((item) => Object.keys(item)[0] == positionId)
        let bodyData = [...agreementBody]
        let data = agreementBody?.[foundIndex]?.[positionId]
        const isExistInData = data?.some((item) => item == agreementData?.id)

        if (isExistInData) data = data.filter((item) => item != agreementData?.id)
        else data.push(agreementData?.id)

        if (foundIndex != -1) bodyData[foundIndex][positionId] = data
        setAgreementBody(bodyData)
    }

    const onSave = useCallback(() => {
        setFinalTemplateData(selectedTemplate)
        setFullLoading(true)
        const body = {
            category_id: categoryId ?? selectedTemplate?.categery_id,
            template_id: templateId ?? newCreatedTemplateId,
            template_agreements: agreementBody,
        }
        addTemplateAgreementStep4Service(body)
            .then(() => {
                setStep(step + 1)
            })
            .finally(() => {
                setFullLoading(false)
            })
    }, [
        agreementBody,
        categoryId,
        newCreatedTemplateId,
        selectedTemplate,
        setFinalTemplateData,
        setStep,
        step,
        templateId,
    ])

    const agreementTemplateDisplay = useMemo(() => {
        let dummArr = []
        let foundHtmlData = []
        agreementBody?.map((item) => {
            const key = Object.keys(item)
            dummArr = [...dummArr, ...item[key]]
        })
        let uniqueArr = _.uniq(dummArr)

        uniqueArr?.map((searchId) => {
            let foundItem = contractToSignData?.find((item) => item.id == searchId)
            if (foundItem) {
                foundHtmlData.push(foundItem)
            }
        })
        return foundHtmlData
    }, [agreementBody, contractToSignData])

    const agreementList = useCallback(
        (positionId) => {
            let filteredData = contractToSignData?.filter((obj) =>
                obj?.receipient?.includes(positionId)
            )

            return filteredData
        },
        [contractToSignData]
    )
    const isChecked = (positionId, agreementId) => {
        const foundIndex = agreementBody?.findIndex((item) => Object.keys(item)[0] == positionId)
        let data = agreementBody?.[foundIndex]?.[positionId]?.map((item) => Number(item))
        return data?.includes(agreementId)
    }
    const selectedCount = (positionId) => {
        const foundIndex = agreementBody?.findIndex((item) => Object.keys(item)[0] == positionId)
        return agreementBody?.[foundIndex]?.[positionId]?.length
    }

    return (
        <>
            <div
                className='row gap-10 align-items-start'
                style={{fontFamily: fontsFamily.manrope, fontSize: 14, position: 'relative'}}
            >
                <CustomLoader visible={fullLoading} full />

                <div className='col-lg'>
                    <div className='text-cmGrey900 mb-2' style={{fontSize: 18, fontWeight: 700}}>
                        Attach Agreements
                    </div>
                    <div
                        className='text-cmGrey700 mb-10'
                        style={{fontSize: 14, fontWeight: 600, lineHeight: '24px'}}
                    >
                        Choose the agreements to include with this offer letter. These selected
                        documents will be sent in separate emails that the new hire is required to
                        review or sign. Can't find the agreement you need? Create custom agreements
                        directly through{' '}
                        <span className='text-cmBlue-Crayola text-decoration-underline cursor-pointer'>
                            SequiDocs
                        </span>
                    </div>
                    {/* Bloclk */}
                    <div className='rounded bg-cmwhite border border-cmDisabled py-10 px-sm-10 px-5'>
                        <div className='w-sm-75'>
                            <div
                                className='text-cmGrey800 mb-5'
                                style={{fontSize: 16, fontWeight: 700}}
                            >
                                Select Agreements to attach for recipient position
                            </div>
                            {selectedTemplate?.receipient?.map((itemMain, index) => {
                                let agreements = agreementList(itemMain?.position_id)
                                return (
                                    <div
                                        className='d-flex flex-column gap-5 text-cmGrey800'
                                        style={{position: 'relative'}}
                                    >
                                        <CustomLoader visible={loading} full />
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className='text-cmGrey600'>
                                                For {itemMain?.position_detail?.position_name}
                                            </div>
                                            <div>
                                                {selectedCount(itemMain?.position_id)}/
                                                {agreements?.length} Selected
                                            </div>
                                        </div>

                                        {agreements?.length > 0 ? (
                                            agreements?.map((item) => {
                                                const check = isChecked(
                                                    itemMain?.position_id,
                                                    item?.id
                                                )
                                                return (
                                                    <div className='d-flex align-items-center gap-3 bg-cmBlue-Crayola bg-opacity-10  p-2 rounded'>
                                                        <CustomCheckbox
                                                            checked={check}
                                                            onChange={(e) =>
                                                                handleCheckbox(
                                                                    item,
                                                                    itemMain?.position_id
                                                                )
                                                            }
                                                        />
                                                        <div
                                                            className=''
                                                            style={{fontSize: 14, fontWeight: 600}}
                                                        >
                                                            {item?.template_name}
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        ) : (
                                            <div className='d-flex flex-center text-cmGrey800'>
                                                No Agreements
                                            </div>
                                        )}
                                        <hr />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className='col-lg-5'>
                    <div className='mb-5' style={{fontSize: 13, fontWeight: 600}}>
                        Preview
                    </div>
                    {agreementTemplateDisplay?.length > 0 ? (
                        agreementTemplateDisplay?.map((item) => (
                            <div className=' bg-cmwhite overflow-auto shadow-sm rounded  mh-850px mb-10 p-3 border border-cmDisabled'>
                                {' '}
                                <PreviewA4 allowOverflow={true}>
                                    <div
                                        className='p-2 h-95 cursor-pointer'
                                        style={{
                                            fontSize: '14px',

                                            overflowX: 'hidden',
                                        }}
                                        dangerouslySetInnerHTML={{__html: item?.template_content}}
                                    ></div>
                                    <div className='fixed-bottom border-top text-cmGrey900 text-center p-5'>
                                        <div
                                            className='text-cmGrey800'
                                            style={{fontWeight: 500, fontSize: '16px'}}
                                        >
                                            {companyData?.business_name} |{' '}
                                            {formattedPhoneNumber(companyData?.business_phone)} |{' '}
                                            {companyData?.company_email} |
                                            {companyData?.business_address},{' '}
                                            {companyData?.business_state}{' '}
                                            {companyData?.business_zip}
                                        </div>
                                    </div>{' '}
                                </PreviewA4>{' '}
                            </div>
                        ))
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            {/* Buttons */}
            <div className='w-sm-50 d-flex flex-wrap flex-center gap-sm-10 gap-5 mt-10'>
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
                />
            </div>
        </>
    )
}

export default AgreementsStep
