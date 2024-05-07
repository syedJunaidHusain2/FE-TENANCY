import React, {useEffect, useMemo, useState} from 'react'
import {KTSVG} from '../../../../../../../../_metronic/helpers'
import CustomImage from '../../../../../../../../customComponents/customImage/CustomImage'
import {fontsFamily} from '../../../../../../../../assets/fonts/fonts'
import {useLocation, useNavigate} from 'react-router-dom'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../../../customComponents/customButtton/CustomButton'
import {
    deleteSequiDocsParticularTemplateService,
    getSingleTemplateListService,
} from '../../../../../../../../services/Services'
import CustomLoader from '../../../../../../../../customComponents/customLoader/CustomLoader'
import CustomDialog from '../../../../../../../../customComponents/customDialog/CustomDialog'
import CustomToast from '../../../../../../../../customComponents/customToast/CustomToast'
import CustomNoData from '../../../../../../../../customComponents/customNoData/CustomNoData'
import {TABLE_BORDER, getGlobalSearchData} from '../../../../../../../../helpers/CommonHelpers'
import PreviewOfferLetterModal from '../stepModals/PreviewOfferLetterModal'
import CustomLink from '../../../../../../../../customComponents/customButtton/CustomLink'

const AgreementTable = () => {
    const navigate = useNavigate()

    const location = useLocation()
    const [agreementTemplateData, setAgreementTemplateData] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchVal, setSearchVal] = useState('')
    const [openPreview, setOpenPreview] = useState(false)
    const [selectedTemplate, setSelectedTemplate] = useState(null)

    useEffect(() => {
        if (location?.state?.categoryId) {
            setLoading(true)

            getSingleTemplateListService(location?.state?.categoryId)
                .then((res) => {
                    setAgreementTemplateData(res?.data)
                })
                .finally(() => setLoading(false))
        }
    }, [location?.state?.categoryId])

    const deleteTemplate = (id) => {
        const body = {
            template_id: id,
        }
        CustomDialog.warn('Are you sure you want to delete ?', () => {
            setLoading(true)
            const newData = agreementTemplateData?.data?.filter((item) => item?.id != id)
            setAgreementTemplateData({...agreementTemplateData, data: newData})
            CustomToast.success('Template  deleted successfully')
            setLoading(false)
            deleteSequiDocsParticularTemplateService(body)
        })
    }

    const handleSearchChange = (e) => {
        setSearchVal(e.target.value)
    }

    const displayData = useMemo(() => {
        let filteredData = agreementTemplateData?.data
        if (searchVal) {
            filteredData = getGlobalSearchData(
                agreementTemplateData?.data,
                ['template_name'],
                searchVal
            )
        }
        return filteredData
    }, [agreementTemplateData?.data, searchVal])

    const handlePreview = (item) => {
        setSelectedTemplate(item)

        setOpenPreview(!openPreview)
    }

    const recipientList = (data) => {
        let receipientArr = []
        receipientArr = data?.receipient
            ?.map((item) => item?.position_detail?.position_name)
            ?.join(',')

        return `${receipientArr?.length > 0 ? receipientArr : '-'}`
    }
    return (
        <div style={{fontFamily: fontsFamily.manrope}}>
            <div className='d-flex align-items-center gap-3 mb-2'>
                <div>
                    <KTSVG
                        path='/media/icons/duotune/art/back-square.svg'
                        svgClassName='h-25px w-25px cursor-pointer'
                        onClick={() => navigate(-1)}
                    />
                </div>
                <div className='text-cmGrey900' style={{fontSize: 20.58, fontWeight: 500}}>
                    Agreements
                </div>
            </div>
            <div className='text-cmGrey700 mb-10' style={{fontWeight: 600, fontSize: 14}}>
                Create and manage agreements here. These will be accessible at the time of
                onboarding, allowing you to <br /> select the appropriate ones to accompany the
                offer letter. Streamline you hiring process with us!
            </div>
            {/* table starts */}
            <div className='shadow-sm bg-cmwhite' style={{borderRadius: 10, position: 'relative'}}>
                <CustomLoader visible={loading} full />

                <div className='d-flex align-items-center justify-content-between gap-5 flex-wrap py-5 ps-5 pe-10'>
                    <div>
                        <CustomInput
                            type={INPUT_TYPE.search}
                            onChange={handleSearchChange}
                            value={searchVal}
                        />
                    </div>
                    <div>
                        <CustomButton
                            buttonLabel='New Template'
                            padding={'py-3'}
                            onClick={() =>
                                navigate('new-template', {
                                    state: {categoryId: location?.state?.categoryId},
                                })
                            }
                        />
                    </div>
                </div>
                <div className='table-responsive'>
                    <table className='table' style={{tableLayout: 'fixed', width: '100%'}}>
                        <thead className={TABLE_BORDER}>
                            <tr
                                className='bg-cmGrey300 text-cmGrey900'
                                style={{
                                    fontSize: '14px',
                                    fontWeight: '700',
                                    fontFamily: fontsFamily.manrope,
                                }}
                            >
                                <th className='p-5' style={{width: '150px'}}>
                                    Name
                                </th>
                                <th className='p-5' style={{width: '300px'}}>
                                    Description
                                </th>
                                <th className='p-5' style={{width: '200px'}}>
                                    Created By
                                </th>
                                <th className='p-5' style={{width: '300px'}}>
                                    Recipient Positions{' '}
                                </th>

                                <th className='p-5' style={{width: '150px'}}>
                                    Status
                                </th>
                                <th className='p-5' style={{width: '100px'}}>
                                    Actions
                                </th>
                                <th style={{width: '50px'}}></th>
                            </tr>
                        </thead>
                        <tbody className={TABLE_BORDER}>
                            {displayData?.length > 0 ? (
                                <>
                                    {displayData?.map((item) => {
                                        const isReady = item?.completed_step == 3 ? true : false
                                        return (
                                            <tr
                                                key={null}
                                                className='text-cmGrey800 stripRow'
                                                style={{
                                                    fontSize: '14px',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <td
                                                    width='150px'
                                                    className={`p-5 text-cmGrey800 ${
                                                        isReady
                                                            ? 'text-decoration-underline cursor-pointer'
                                                            : ''
                                                    }`}
                                                    onClick={() =>
                                                        isReady ? handlePreview(item) : null
                                                    }
                                                >
                                                    {item?.template_name}
                                                </td>

                                                <td width={'300px'} className='p-5 text-cmGrey500'>
                                                    {item?.template_description ?? '-'}
                                                </td>

                                                <td
                                                    width={'w-200px'}
                                                    className='p-5 d-flex gap-5 align-items-center text-cmGrey800'
                                                    style={{fontWeight: 600}}
                                                >
                                                    <CustomImage className={'w-25px h-25px'} />
                                                    <div>
                                                        {item?.created_by?.first_name ?? '-'}{' '}
                                                        {item?.created_by?.last_name}
                                                    </div>
                                                </td>

                                                <td width={'300px'} className='p-5  text-cmGrey800'>
                                                    {recipientList(item)}
                                                </td>

                                                <td
                                                    width={'150px'}
                                                    className='p-5 text-nowrap text-cmGrey500'
                                                    style={{fontWeight: 600}}
                                                >
                                                    {isReady ? (
                                                        <div className='d-flex gap-2 align-items-center text-cmSuccess'>
                                                            <div className='bi bi-check-circle fs-5' />
                                                            <div>Ready!</div>
                                                        </div>
                                                    ) : (
                                                        'Draft'
                                                    )}
                                                </td>

                                                <td className='p-5' width={'100px'}>
                                                    {isReady ? (
                                                        <CustomLink
                                                            label={'History'}
                                                            onClick={() =>
                                                                navigate('history', {
                                                                    state: {
                                                                        id: item?.id,
                                                                        name: item?.template_name,
                                                                        template_comment:
                                                                            item?.template_comment,
                                                                    },
                                                                })
                                                            }
                                                        />
                                                    ) : null}
                                                </td>
                                                <td
                                                    className='p-5'
                                                    width={'50px'}
                                                    style={{fontWeight: 700, width: 'fit-content'}}
                                                >
                                                    <div className=''>
                                                        <span
                                                            className='bi bi-three-dots-vertical fs-2 text-cmGrey500 cursor-pointer text-hover-dark'
                                                            data-bs-toggle='dropdown'
                                                            aria-expanded='false'
                                                            style={{width: 'fit-content'}}
                                                        />
                                                        <ul
                                                            className='dropdown-menu'
                                                            style={{fontSize: 14}}
                                                        >
                                                            <li
                                                                className='dropdown-item d-flex align-items-center gap-3 cursor-pointer text-cmGrey800'
                                                                style={{fontWeight: 500}}
                                                                onClick={() =>
                                                                    navigate('edit-agreements', {
                                                                        state: {
                                                                            templateId: item?.id,
                                                                        },
                                                                    })
                                                                }
                                                            >
                                                                {' '}
                                                                <KTSVG
                                                                    path='/media/icons/duotune/art/EditIcon2.svg'
                                                                    svgClassName='h-15px w-15px cursor-pointer'
                                                                />
                                                                <div>Edit</div>
                                                            </li>
                                                            <hr className='my-2 text-cmGrey300' />
                                                            {/* <li
                                                            className='dropdown-item d-flex align-items-center gap-3 cursor-pointer text-cmGrey800'
                                                            style={{fontWeight: 500}}
                                                            
                                                            // onClick={handleTestEmailModal}
                                                        >
                                                            {' '}
                                                            <KTSVG
                                                                path='/media/icons/duotune/art/story.svg'
                                                                svgClassName='h-15px w-15px cursor-pointer'
                                                            />
                                                            <div>Test </div>
                                                        </li>
                                                        <hr className='my-2 text-cmGrey300' /> */}

                                                            {isReady ? (
                                                                <>
                                                                    <li
                                                                        className='dropdown-item d-flex align-items-center gap-3 cursor-pointer text-cmGrey800'
                                                                        style={{fontWeight: 500}}
                                                                        onClick={() =>
                                                                            navigate(
                                                                                '/sequidocs/templates/send-letter',
                                                                                {
                                                                                    state: {
                                                                                        categoryId:
                                                                                            item?.categery_id,
                                                                                        use: true,
                                                                                        templateId:
                                                                                            item?.id,
                                                                                    },
                                                                                }
                                                                            )
                                                                        }
                                                                    >
                                                                        <KTSVG
                                                                            path='/media/icons/duotune/art/mouse-circle.svg'
                                                                            svgClassName='h-15px w-15px cursor-pointer'
                                                                        />
                                                                        <div>Use </div>
                                                                    </li>
                                                                    <hr className='my-2 text-cmGrey300' />
                                                                </>
                                                            ) : null}

                                                            <li
                                                                className='dropdown-item d-flex align-items-center gap-3 cursor-pointer text-cmError'
                                                                style={{fontWeight: 500}}
                                                                onClick={() =>
                                                                    deleteTemplate(item?.id)
                                                                }
                                                            >
                                                                <KTSVG
                                                                    path='/media/icons/duotune/art/close-circle.svg'
                                                                    svgClassName='h-15px w-15px cursor-pointer'
                                                                />
                                                                <div>Delete </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </>
                            ) : (
                                <tr key='no-data'>
                                    <td
                                        colSpan={7}
                                        style={{
                                            textAlign: 'center',
                                            fontFamily: 'Manrope',
                                            fontWeight: '500',
                                            fontSize: 14,
                                            paddingTop: 20,
                                            paddingBottom: 20,
                                        }}
                                    >
                                        <CustomNoData label={'No data found'} />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {openPreview ? (
                <PreviewOfferLetterModal
                    show={openPreview}
                    handleClose={handlePreview}
                    templateHtmlContent={selectedTemplate?.template_content}
                    templateName={selectedTemplate?.template_name}
                />
            ) : null}
        </div>
    )
}

export default AgreementTable
