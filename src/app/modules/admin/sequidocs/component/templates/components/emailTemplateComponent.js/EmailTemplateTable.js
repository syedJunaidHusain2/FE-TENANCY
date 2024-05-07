import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {KTSVG} from '../../../../../../../../_metronic/helpers'
import {fontsFamily} from '../../../../../../../../assets/fonts/fonts'
import {useLocation, useNavigate} from 'react-router-dom'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../../customComponents/customInputs/customInput/CustomInput'
import {
    getEmailTemplatesListService,
    updateEmailTemplateService,
} from '../../../../../../../../services/Services'
import CustomLoader from '../../../../../../../../customComponents/customLoader/CustomLoader'
import CustomNoData from '../../../../../../../../customComponents/customNoData/CustomNoData'
import CustomToast from '../../../../../../../../customComponents/customToast/CustomToast'
import {
    TABLE_BORDER,
    getErrorMessageFromResponse,
    getGlobalSearchData,
} from '../../../../../../../../helpers/CommonHelpers'
import PreviewEmailModal from '../stepModals/PreviewEmailModal'

const EmailTemplateTable = () => {
    const navigate = useNavigate()
    const [emailTemplateData, setEmailTemplateData] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchVal, setSearchVal] = useState('')
    const [openPreviewModal, setOpenPreviewModal] = useState(false)
    const [selectedtTemplateData, setSelectedTemplatesData] = useState(null)

    useEffect(() => {
        getEmailTemplatesList()
    }, [])

    const getEmailTemplatesList = useCallback(() => {
        setLoading(true)

        getEmailTemplatesListService()
            .then((res) => {
                setEmailTemplateData(res?.data?.[0])
            })
            .finally(() => setLoading(false))
    }, [])

    const displayData = useMemo(() => {
        let filteredData = emailTemplateData?.sequi_docs_email_templates
        if (searchVal) {
            filteredData = getGlobalSearchData(
                emailTemplateData?.sequi_docs_email_templates,
                ['email_subject'],
                searchVal
            )
        }
        return filteredData
    }, [emailTemplateData?.sequi_docs_email_templates, searchVal])

    const deactivateTemplate = (id, val) => {
        setLoading(true)
        const body = {
            is_active: val ? 0 : 1,
        }
        updateEmailTemplateService(id, body)
            .then(() => {
                getEmailTemplatesList()
            })
            .catch((e) => {
                CustomToast.error(getErrorMessageFromResponse(e))
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleSearchChange = (e) => {
        setSearchVal(e.target.value)
    }

    const handlePreviewModal = (item) => {
        setSelectedTemplatesData(item)
        setOpenPreviewModal(!openPreviewModal)
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
                    Email Template
                </div>
            </div>
            <div className='text-cmGrey700 mb-10' style={{fontWeight: 600, fontSize: 14}}>
                <span className='text-cmGrey900'>
                    We are excited to introduce our new feature – email templates!
                </span>{' '}
                These templates are designed to streamline communication <br /> with your employees.
                They will automatically be sent to your employees' email addresses when specific
                activities occur <br />
                within the software. You have the flexibility to customize or deactivate these
                templates to best suit your needs.
            </div>
            {/* table starts */}
            <div className='shadow-sm bg-cmwhite' style={{borderRadius: 10, position: 'relative'}}>
                <CustomLoader visible={loading} full />

                <div className=' p-5'>
                    <div className='w-sm-25'>
                        <CustomInput
                            type={INPUT_TYPE.search}
                            onChange={handleSearchChange}
                            value={searchVal}
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
                                <th className='p-5 ' style={{width: '120px'}}>
                                    Name
                                </th>

                                <th className='p-5 ' style={{width: '200px'}}>
                                    Trigger
                                </th>

                                <th className='p-5 ' style={{width: '200px'}}>
                                    Description
                                </th>

                                <th className='p-5 ' style={{width: '100px'}}>
                                    Status
                                </th>

                                <th className='p-5  text-center' style={{width: '75px'}}>
                                    Actions
                                </th>
                                {/* <th></th> */}
                            </tr>
                        </thead>
                        <tbody className={TABLE_BORDER}>
                            {displayData?.length > 0 ? (
                                <>
                                    {displayData?.map((item) => {
                                        // const isReady = item?.completed_step == 4 ? true : false
                                        return (
                                            <tr
                                                key={null}
                                                className='text-cmGrey800 stripRow '
                                                style={{
                                                    fontSize: '14px',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <td width={'120px'}
                                                    className={`p-5 text-cmGrey800 ${'text-decoration-underline cursor-pointer'}`}
                                                    onClick={() => handlePreviewModal(item)}
                                                >
                                                    {item?.email_template_name}
                                                </td>

                                                <td width={'200px'} className='p-5  text-cmGrey500'>
                                                    {item?.email_trigger}{' '}
                                                </td>
                                                
                                                <td width={'200px'}
                                                    className='p-5  text-cmGrey800'
                                                    style={{fontWeight: 600}}
                                                >
                                                    {item?.email_description ?? '-'}{' '}
                                                </td>

                                                <td width={'100px'} className='p-5  text-cmGrey500'>
                                                    {item?.is_active ? (
                                                        <span className='text-cmGrey800'>
                                                            Active
                                                        </span>
                                                    ) : (
                                                        <span className='text-cmGrey500'>
                                                            Inactive
                                                        </span>
                                                    )}{' '}
                                                </td>

                                                <td width={'75px'}
                                                    className='p-5 text-center'
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
                                                                    navigate('edit-email', {
                                                                        state: {templateData: item},
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

                                                            <li
                                                                className={`dropdown-item d-flex align-items-center gap-3 cursor-pointer ${
                                                                    item?.is_active
                                                                        ? 'text-cmError'
                                                                        : 'text-cmGrey800'
                                                                }`}
                                                                style={{fontWeight: 500}}
                                                                onClick={() =>
                                                                    deactivateTemplate(
                                                                        item?.id,
                                                                        item?.is_active
                                                                    )
                                                                }
                                                            >
                                                                <KTSVG
                                                                    path='/media/icons/duotune/art/close-circle.svg'
                                                                    svgClassName='h-15px w-15px cursor-pointer'
                                                                />
                                                                <div>
                                                                    {item?.is_active
                                                                        ? 'Deactivate'
                                                                        : 'Activate'}
                                                                </div>
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
                                    <td colSpan={5}>
                                        <CustomNoData label={'No data found'} />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {openPreviewModal ? (
                <PreviewEmailModal
                    show={openPreviewModal}
                    handleClose={handlePreviewModal}
                    templateHtmlContent={selectedtTemplateData?.email_content}
                    toShow={false}
                />
            ) : null}
        </div>
    )
}

export default EmailTemplateTable
