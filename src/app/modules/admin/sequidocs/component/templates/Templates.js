import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {getSequiDocsTopTemplatesService} from '../../../../../../services/Services'
import {useDispatch} from 'react-redux'
import {getSequiDocsTemplateCategoriesAction} from '../../../../../../redux/actions/SequiDocsActions'
import _ from 'lodash'
import {PERMISSIONS_GROUP} from '../../../../../../accessRights/AccessRights'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import {fontsFamily} from '../../../../../../assets/fonts/fonts'
import {useNavigate} from 'react-router-dom'
import OtherTemplatesTable from './OtherTemplatesTable'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'

export default function Templates({
    permission = PERMISSIONS_GROUP.administrator.sequiDocs.templates,
}) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [topTemplatesData, setTopTemplatesData] = useState([])

    useEffect(() => {
        getSequiDocsTopTemplate()
    }, [])

    const getSequiDocsTopTemplate = useCallback(() => {
        setLoading(true)
        getSequiDocsTopTemplatesService()
            .then((res) => {
                setTopTemplatesData(res?.data)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        dispatch(getSequiDocsTemplateCategoriesAction())
    }, [])

    const offerLetterData = useMemo(() => {
        return topTemplatesData?.top_categories?.find((item) => item?.id == 1)
    }, [topTemplatesData])

    const agreementsData = useMemo(() => {
        return topTemplatesData?.top_categories?.find((item) => item?.id == 2)
    }, [topTemplatesData])

    const emailTemplateData = useMemo(() => {
        return topTemplatesData?.top_categories?.find((item) => item?.id == 3)
    }, [topTemplatesData])

    return (
        <>
            <div
                className='bg-cmwhite p-10 row gap-10 flex-wrap w-100 mx-auto mb-10'
                style={{
                    borderRadius: '0 10px 10px 10px',
                    position: 'relative',

                    boxShadow:
                        'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                }}
            >
                <CustomLoader visible={loading} full />

                {/* 1st card */}
                <div className='col-xl card p-0 border border-cmGrey300' style={{borderRadius: 10}}>
                    <div className='card-body '>
                        <div
                            className='card-title p-0 d-flex gap-5 align-items-center  '
                            style={{fontSize: 18, fontFamily: fontsFamily.manrope, fontWeight: 800}}
                        >
                            <div>
                                <KTSVG
                                    path='/media/icons/duotune/art/OfferLetter.svg'
                                    svgClassName='h-40px w-40px cursor-pointer'
                                />
                            </div>

                            <div className='text-cmGrey900'>
                                Offer Letters ({offerLetterData?.sequi_docs_template_count ?? '0'})
                            </div>
                        </div>
                        <div
                            className='text-cmGrey700 card-text'
                            style={{fontSize: '12px', fontWeight: 600, lineHeight: '20px'}}
                        >
                            Effortlessly create customized offer letter templates tailored to your
                            organization's needs. Seamlessly send it to your new hires as part of
                            the onboarding process.
                        </div>
                    </div>
                    <div className='card-footer border-0 mt-0 pb-5 pt-0 ps-5'>
                        <CustomButton
                            onClick={() =>
                                navigate('offer-letters', {
                                    state: {categoryId: offerLetterData?.id},
                                })
                            }
                            buttonType={BUTTON_TYPE.secondary}
                            buttonLabel='View & Create'
                            buttonSize={BUTTON_SIZE.large}
                        />
                    </div>
                </div>
                {/* 2nd card */}
                <div className='col-xl card p-0 border border-cmGrey300' style={{borderRadius: 10}}>
                    <div className='card-body '>
                        <div
                            className='card-title p-0 d-flex gap-5 align-items-center  '
                            style={{fontSize: 18, fontFamily: fontsFamily.manrope, fontWeight: 800}}
                        >
                            <div>
                                <KTSVG
                                    path='/media/icons/duotune/art/AgreementPaper.svg'
                                    svgClassName='h-40px w-40px cursor-pointer'
                                />
                            </div>

                            <div className='text-cmGrey900'>
                                Agreements ({agreementsData?.sequi_docs_template_count ?? '0'})
                            </div>
                        </div>
                        <div
                            className='text-cmGrey700 card-text'
                            style={{fontSize: '12px', fontWeight: 600, lineHeight: '20px'}}
                        >
                            Craft or upload essential agreements required for new hires right here.
                            Allowing you to select the appropriate ones to accompany the offer
                            letter.
                        </div>
                    </div>
                    <div className='card-footer border-0 mt-0 pb-5 pt-0 ps-5'>
                        <CustomButton
                            onClick={() =>
                                navigate('agreements', {state: {categoryId: agreementsData?.id}})
                            }
                            buttonType={BUTTON_TYPE.secondary}
                            buttonLabel='View & Create'
                            buttonSize={BUTTON_SIZE.large}
                        />
                    </div>
                </div>
                {/* 3nd card */}
                <div
                    className='col-xl card p-0 border border-cmGrey300 position-relative'
                    style={{borderRadius: 10}}
                >
                    <div className='card-body '>
                        <div
                            className='card-title p-0 d-flex gap-5 align-items-center  '
                            style={{fontSize: 18, fontFamily: fontsFamily.manrope, fontWeight: 800}}
                        >
                            <div>
                                <KTSVG
                                    path='/media/icons/duotune/art/EmailTemplates.svg'
                                    svgClassName='h-40px w-40px cursor-pointer'
                                />
                            </div>

                            <div className='text-cmGrey900'>
                                Email Templates (
                                {emailTemplateData?.sequi_docs_email_templates_count ?? '0'})
                            </div>
                        </div>
                        <div
                            className='text-cmGrey700 card-text'
                            style={{fontSize: '12px', fontWeight: 600, lineHeight: '20px'}}
                        >
                            Update Email Templates which will be triggered during certain steps or
                            edits and sent to employees
                        </div>
                    </div>
                    <div className='card-footer border-0 mt-0 pb-5 pt-0 ps-5'>
                        <CustomButton
                            buttonType={BUTTON_TYPE.secondary}
                            buttonLabel='View & Update'
                            buttonSize={BUTTON_SIZE.large}
                            onClick={() =>
                                navigate('email', {state: {categoryId: emailTemplateData?.id}})
                            }
                        />
                    </div>
                    <span className='position-absolute' style={{top: 15, right: -6}}>
                        <KTSVG
                            path='/media/icons/duotune/art/side-new-icon.svg'
                            svgClassName=' cursor-pointer mh-100px'
                            svgStyle={{width: '65px', height: '35px'}}
                        />
                    </span>
                </div>
            </div>
            <div className='mb-10 text-center'>
                <CustomButton
                    buttonLabel='Send Document'
                    onClick={() =>
                        navigate('send-letter', {state: {templatesData: topTemplatesData}})
                    }
                    buttonSize={BUTTON_SIZE.large}
                />
            </div>
            <div>
                <div
                    className='text-cmGrey900 mb-5'
                    style={{fontWeight: 800, fontSize: 18, fontFamily: fontsFamily.manrope}}
                >
                    Other Templates
                </div>
                <div className='' style={{borderRadius: 10}}>
                    {/* Other Templates */}

                    <OtherTemplatesTable
                        templatesOtherData={topTemplatesData?.bottom_categories}
                        getSequiDocsOtherTemplate={getSequiDocsTopTemplate}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </div>
            </div>
        </>
    )
}
