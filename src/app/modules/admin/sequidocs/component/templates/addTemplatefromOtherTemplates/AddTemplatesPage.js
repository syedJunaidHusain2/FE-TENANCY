import React, {useEffect, useState} from 'react'
import {fontsFamily} from '../../../../../../../assets/fonts/fonts'
import {KTSVG} from '../../../../../../../_metronic/helpers'
import {useLocation, useNavigate} from 'react-router-dom'
import {getTemplateDetailService} from '../../../../../../../services/Services'
import TemplateSettingStep from '../components/manageOfferLetter&AgreementSteps/TemplateSettingStep'
import SignaturesStep from '../components/manageOfferLetter&AgreementSteps/SignaturesStep'
import EditTemplateStep from '../components/manageOfferLetter&AgreementSteps/EditTemplateStep'
import FinalStep, {STEP_TYPE} from '../components/manageOfferLetter&AgreementSteps/FinalStep'

const AddTemplatesPage = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const location = useLocation()
    const categoryId = location?.state?.categoryId
    const [selectedTemplate, setSelectedTemplate] = useState(null)
    const [newCreatedTemplateId, setNewCreatedTemplateId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [finalTemplateData, setFinalTemplateData] = useState(null)

    useEffect(() => {
        if (location?.state?.templateId || newCreatedTemplateId) {
            setLoading(true)
            getTemplateDetailService(location?.state?.templateId ?? newCreatedTemplateId)
                .then((res) => setSelectedTemplate(res?.data))
                .finally(() => setLoading(false))
        }
    }, [location, step])

    return (
        <div className='mb-20'>
            {step === 1 ? (
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
                    <div className='text-cmGrey900'>Create {location?.state?.heading} Template</div>
                </div>
            ) : null}
            {/* Top nav */}
            <div
                className='row gap-5 p-0 align-items-center mb-5 container mx-auto scroll'
                style={{fontSize: 16, fontFamily: fontsFamily.manrope, fontWeight: 700}}
            >
                {step === 1 ? null : (
                    <div className='col-sm-1 p-0 m-0' style={{width: 'fit-content'}}>
                        <KTSVG
                            path='/media/icons/duotune/art/back-square.svg'
                            svgClassName='h-25px w-20px cursor-pointer'
                            onClick={() => navigate(-1)}
                        />
                    </div>
                )}

                <div
                    className={`col-sm border-bottom border-5 border-${
                        step < 2 ? 'cmBlue-Crayola' : 'cmgreen'
                    } text-${step < 2 ? 'cmBlue-Crayola' : 'cmGrey700'} `}
                >
                    1. Template Settings
                </div>
                <div
                    className={`col-sm border-bottom border-5 border-${
                        step < 2 ? 'cmGrey200' : step === 2 ? 'cmBlue-Crayola' : 'cmgreen'
                    } text-${step === 2 ? 'cmBlue-Crayola' : 'cmGrey700'} `}
                >
                    2. Signatures
                </div>
                <div
                    className={`col-sm border-bottom border-5 border-${
                        step < 3 ? 'cmGrey200' : step === 3 ? 'cmBlue-Crayola' : 'cmgreen'
                    } text-${step === 3 ? 'cmBlue-Crayola' : 'cmGrey700'} `}
                >
                    3. Edit Template
                </div>
            </div>

            {/* Body */}
            <div>
                <div>
                    {step === 1 ? (
                        // <TemplateSettingOtherTemplate
                        //     step={step}
                        //     setStep={setStep}
                        //     categoryId={categoryId}
                        //     selectedTemplate={selectedTemplate}
                        //     setNewCreatedTemplateId={setNewCreatedTemplateId}
                        //     loading={loading}
                        // />
                        <TemplateSettingStep
                            step={step}
                            setStep={setStep}
                            categoryId={categoryId}
                            selectedTemplate={selectedTemplate}
                            setNewCreatedTemplateId={setNewCreatedTemplateId}
                            loading={loading}
                            templateId={location?.state?.templateId}
                            heading={location?.state?.heading}
                        />
                    ) : step === 2 ? (
                        // <SignatureOtherTemplate
                        //     step={step}
                        //     setStep={setStep}
                        //     categoryId={categoryId}
                        //     selectedTemplate={selectedTemplate}
                        //     newCreatedTemplateId={newCreatedTemplateId}
                        //     loading={loading}
                        // />
                        <SignaturesStep
                            step={step}
                            setStep={setStep}
                            categoryId={categoryId}
                            selectedTemplate={selectedTemplate}
                            newCreatedTemplateId={newCreatedTemplateId}
                            loading={loading}
                            templateId={location?.state?.templateId}
                        />
                    ) : step === 3 ? (
                        // <EditTemplateOtherTemplate
                        //     step={step}
                        //     setStep={setStep}
                        //     categoryId={categoryId}
                        //     selectedTemplate={selectedTemplate}
                        //     newCreatedTemplateId={newCreatedTemplateId}
                        //     loading={loading}
                        // />
                        <EditTemplateStep
                            step={step}
                            setStep={setStep}
                            categoryId={categoryId}
                            selectedTemplate={selectedTemplate}
                            newCreatedTemplateId={newCreatedTemplateId}
                            templateId={location?.state?.templateId}
                            loading={loading}
                            setFinalTemplateData={setFinalTemplateData}
                            heading={location?.state?.heading}
                        />
                    ) : (
                        <FinalStep
                            step={step}
                            setStep={setStep}
                            type={STEP_TYPE.OTHER}
                            selectedTemplate={selectedTemplate}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default AddTemplatesPage
