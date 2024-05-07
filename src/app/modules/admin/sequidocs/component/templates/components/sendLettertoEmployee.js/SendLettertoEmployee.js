import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {KTSVG} from '../../../../../../../../_metronic/helpers'
import {useLocation, useNavigate} from 'react-router-dom'
import {fontsFamily} from '../../../../../../../../assets/fonts/fonts'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomDropdown from '../../../../../../../../customComponents/customInputs/customDropdown/CustomDropdown'
import CustomButton, {
    BUTTON_TYPE,
} from '../../../../../../../../customComponents/customButtton/CustomButton'
import {getCompanyProfileSelector} from '../../../../../../../../redux/selectors/SettingsSelectors'
import {useSelector} from 'react-redux'
import {
    TEMPLATE_DYNAMIC_FIELDS,
    TEMPLATE_DYNAMIC_FIELD_FIND_REGEX,
    TEMPLATE_DYNAMIC_SIGN_FIELDS,
    getValidDate,
} from '../../../../../../../../constants/constants'
import {
    IMAGE_TYPE,
    formattedPhoneNumber,
    getErrorMessageFromResponse,
    getServerImage,
} from '../../../../../../../../helpers/CommonHelpers'
import {getSequiDocsTemplateCategoriesSelector} from '../../../../../../../../redux/selectors/SequiDocsSelectors'
import {
    downloadParticularTemplateService,
    getSequiDocsAgreementListService,
    getSingleTemplateListService,
    getUserEmploymentPackageDetailService,
    searchEmployeeToSendDocService,
    sendOrUseSequiDocTemplateService,
    sequiDocUseTemplateService,
    testParticularTemplateService,
} from '../../../../../../../../services/Services'
import CustomToast from '../../../../../../../../customComponents/customToast/CustomToast'
import PrintOrDownloadPDF from '../../../../../../../../integrations/jspdf/PrintOrDownloadPDF'
import CustomLoader from '../../../../../../../../customComponents/customLoader/CustomLoader'
import CustomImage from '../../../../../../../../customComponents/customImage/CustomImage'
import _ from 'lodash'
import CustomSearchInput from '../../../../../../../../customComponents/customInputs/customSearchInput/CustomSearchInput'
import {getSequiDocsTemplateCategoriesAction} from '../../../../../../../../redux/actions/SequiDocsActions'
import {useDispatch} from 'react-redux'

const SendLettertoEmployee = ({}) => {
    const dispatch = useDispatch()
    const viewInvoiceRef = useRef()
    const categoryAndTemplateIdRef = useRef()
    const navigate = useNavigate()
    const location = useLocation()
    const companyData = useSelector(getCompanyProfileSelector)
    const [selectedTemplate, setSelectedTemplate] = useState(null)
    const [fields, setFields] = useState(null)
    const [otherFields, setOtherFields] = useState(null)
    const [downloadContent, setDownloadContent] = useState(null)

    const categoriesList = useSelector(getSequiDocsTemplateCategoriesSelector)
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [templateDropdownList, setTemplateDropdownList] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [loading, setLoading] = useState(false)
    const [userLoading, setUserLoading] = useState(false)
    const [fullLoading, setFullLoading] = useState(false)
    const [allEmployeeData, setAllEmployeeData] = useState([])
    const [agreementListData, setAgreemenListData] = useState(null)
    const [searchVal, setSearchVal] = useState(null)

    useEffect(() => {
        categoryAndTemplateIdRef.current = {
            selectedCategory,
            selectedTemplate,
        }
    }, [selectedCategory, selectedTemplate])

    useEffect(() => {
        if (selectedCategory) {
            setLoading(true)
            getSingleTemplateListService(selectedCategory)
                .then((res) => {
                    const templateData = [...res?.data?.data]
                    const readyTemplateData = templateData?.filter((item) => {
                        if (selectedCategory == 1 && item.completed_step == 4) {
                            return item
                        } else if (item.completed_step == 3) {
                            return item
                        }
                    })
                    setTemplateDropdownList(readyTemplateData)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [selectedCategory])
    useEffect(() => {
        if (location?.state?.categoryId) {
            const template = templateDropdownList?.find(
                (item) => item?.id == location?.state?.templateId
            )

            setSelectedTemplate({
                templateContent: template?.template_content,
                id: template?.id,
                categoryId: template?.category_id,
            })
            setSelectedCategory(location?.state?.categoryId)
        }
    }, [location, templateDropdownList])

    // useEffect(() => {
    //     if (selectedEmployee) agreementByPosition()
    // }, [selectedEmployee])
    useEffect(() => {
        setDynamicFieldsValue()
    }, [selectedTemplate, selectedEmployee])

    useEffect(() => {
        getAgreementData()
        dispatch(getSequiDocsTemplateCategoriesAction())
    }, [])

    const getAgreementData = useCallback((selectedAgreement) => {
        getSequiDocsAgreementListService()
            .then((res) => {
                const readyAgreementList = res?.data?.filter((item) => item?.completed_step == 3)

                setAgreemenListData(readyAgreementList)
            })
            .finally(() => setLoading(false))
    }, [])

    const categoriesDropDownList = useMemo(() => {
        return categoriesList?.filter((item) => item?.id != 3)
    }, [categoriesList])

    const agreementByPosition = useCallback(
        (position_id) => {
            let filteredData = agreementListData?.filter((obj) =>
                obj?.receipient?.includes(position_id)
            )

            let fieldToCheck = []
            let dataToAdd = []

            filteredData?.map((item) => {
                const regexFoundData = item?.template_content?.match(
                    TEMPLATE_DYNAMIC_FIELD_FIND_REGEX
                )
                Object.keys(TEMPLATE_DYNAMIC_FIELDS)?.map((item) => {
                    fieldToCheck.push(TEMPLATE_DYNAMIC_FIELDS[item]?.key)
                })

                // return regexFoundData
                const uniqueData = regexFoundData?.filter(
                    (item, index, self) => self?.indexOf(item) == index
                )

                uniqueData?.map((item) => {
                    dataToAdd.push({
                        key: item
                            ?.toString()
                            ?.replace(/\[/gim, '')
                            ?.replace(/\]/gim, '')
                            ?.replace(/\s/g, ''),
                        fullKey: item,
                        value: '',
                    })
                })
            })
            return dataToAdd?.map((item) => item?.fullKey)
        },
        [agreementListData]
    )

    const setDynamicFieldsValue = useCallback(async () => {
        if (selectedTemplate) {
            let fieldToCheck = []
            let otherUniqueFields = []

            const regexFoundData = selectedTemplate?.templateContent?.match(
                TEMPLATE_DYNAMIC_FIELD_FIND_REGEX
            )
            Object.keys(TEMPLATE_DYNAMIC_FIELDS)?.map((item) => {
                fieldToCheck.push(TEMPLATE_DYNAMIC_FIELDS[item]?.key)
            })

            // if (selectedEmployee) {
            //     const agreementData = agreementByPosition(selectedEmployee?.sub_position_id)
            // }
            const signingKeys = []
            Object.keys(TEMPLATE_DYNAMIC_SIGN_FIELDS)?.map((item) => {
                signingKeys.push(TEMPLATE_DYNAMIC_SIGN_FIELDS?.[item]?.val)
            })

            let templateUniqueData = [],
                agreementUniqueData = [],
                employeeUniqueData = []
            templateUniqueData = regexFoundData
                ?.filter((item, index, self) => self?.indexOf(item) == index)
                ?.filter((item) => {
                    let exist = fieldToCheck.includes(
                        item
                            ?.toString()
                            ?.replace(/\[/gim, '')
                            ?.replace(/\]/gim, '')
                            ?.replace(/\s/g, '')
                    )

                    if (exist) {
                        return item
                    } else {
                        otherUniqueFields.push({
                            key: item
                                ?.toString()
                                ?.replace(/\[/gim, '')
                                ?.replace(/\]/gim, '')
                                ?.replace(/\s/g, ''),
                            fullKey: item,
                            value: '',
                            type: '',
                        })
                    }
                })

            if (selectedEmployee) {
                agreementUniqueData = agreementByPosition(selectedEmployee?.sub_position_id)
            }

            let resEmployeeData = null

            resEmployeeData = selectedEmployee?.id
                ? await getUserEmploymentPackageDetailService(selectedEmployee?.id)
                : null

            const employeeData = resEmployeeData?.data
            const empPackageData = resEmployeeData?.data

            var finalData = []

            if (templateUniqueData)
                finalData = [...templateUniqueData, ...agreementUniqueData, ...employeeUniqueData]

            finalData = _.uniq(finalData)
            let templateData =
                finalData?.length > 0
                    ? finalData?.map((item) => {
                          let key = item
                              ?.toString()
                              ?.replace(/\[/gim, '')
                              ?.replace(/\]/gim, '')
                              ?.replace(/\s/g, '')
                          let value = null
                          let type = 'text'

                          // Companny Logo
                          if (TEMPLATE_DYNAMIC_FIELDS.company_logo.key === key) {
                              value = getServerImage(companyData?.logo)
                              type = 'image'
                          }

                          // Company Name
                          if (TEMPLATE_DYNAMIC_FIELDS.company_name.key === key)
                              value = companyData?.name ?? ''

                          // Company Addrsess
                          if (TEMPLATE_DYNAMIC_FIELDS.company_address.key === key)
                              value = companyData?.business_address ?? ''

                          // Company Phone
                          if (TEMPLATE_DYNAMIC_FIELDS.company_phone.key === key)
                              value = companyData?.phone_number ?? ''

                          // Company Email
                          if (TEMPLATE_DYNAMIC_FIELDS.company_email.key === key)
                              value = companyData?.company_email ?? ''

                          // Company Website
                          if (TEMPLATE_DYNAMIC_FIELDS.company_website.key === key)
                              value = companyData?.company_website ?? ''

                          //   Current Date
                          if (TEMPLATE_DYNAMIC_FIELDS.current_date.key === key)
                              value = getValidDate(new Date()) ?? ''
                          type = 'date'

                          //   Employee Fields
                          // Employee ID

                          if (TEMPLATE_DYNAMIC_FIELDS.employee_id.key === key)
                              value = employeeData?.id

                          // Employee Name
                          if (TEMPLATE_DYNAMIC_FIELDS.employee_name.key === key)
                              value = `${employeeData?.first_name ?? ''} ${
                                  employeeData?.last_name ?? ''
                              }`

                          // Employee Position
                          if (TEMPLATE_DYNAMIC_FIELDS.employee_position.key === key)
                              value = employeeData?.sub_position_name ?? ''

                          // Employee First Name
                          if (TEMPLATE_DYNAMIC_FIELDS.employee_first_name.key === key)
                              value = employeeData?.first_name ?? ''

                          // Employee Address
                          if (TEMPLATE_DYNAMIC_FIELDS.employee_address.key === key)
                              value = employeeData?.home_address ?? ''

                          // Employee SSN
                          if (TEMPLATE_DYNAMIC_FIELDS.employee_ssn.key === key)
                              value = employeeData?.social_sequrity_no ?? ''

                          // Employee Manager Full Name
                          if (TEMPLATE_DYNAMIC_FIELDS.employee_manager_full_name.key === key)
                              value = `${empPackageData?.manager_name ?? ''}`

                          // Employee Manager Position
                          if (TEMPLATE_DYNAMIC_FIELDS.employee_manager_position.key === key)
                              value = empPackageData?.Employee_Manager_Position ?? ''

                          // Employee Manager Department
                          if (TEMPLATE_DYNAMIC_FIELDS.employee_manager_department.key === key)
                              value = empPackageData?.Employee_Manager_Department ?? ''

                          // Employee Redline Amount
                          if (TEMPLATE_DYNAMIC_FIELDS.employee_redline_amount.key === key) {
                              value = `${empPackageData?.redline_amount ?? ''} ${
                                  empPackageData?.redline_type ?? ''
                              }`
                          }

                          // Employee Redline Amount Type
                          //   if (
                          //       TEMPLATE_DYNAMIC_FIELDS.employee_redline_amount_with_type.key === key
                          //   ) {
                          //       value = `${empPackageData?.redline_amount ?? ''} ${
                          //           empPackageData?.redline_type ?? ''
                          //       }`
                          //   }

                          // Employee Upfront Amount
                          if (TEMPLATE_DYNAMIC_FIELDS.employee_upfront_amount.key === key) {
                              value = empPackageData?.upfront_pay_amount ?? ''
                          }
                          // Employee Comission
                          if (TEMPLATE_DYNAMIC_FIELDS.employee_comission.key === key) {
                              value = empPackageData?.commission
                                  ? `${empPackageData?.commission} %`
                                  : ''
                          }

                          // Employee Direct Override
                          if (TEMPLATE_DYNAMIC_FIELDS.employee_direct_override.key === key) {
                              value = empPackageData?.direct_overrides_amount
                                  ? `${empPackageData?.direct_overrides_amount} ${empPackageData?.direct_overrides_type}`
                                  : ''
                          }
                          // Employee Indirect Override
                          if (TEMPLATE_DYNAMIC_FIELDS.employee_indirect_override.key === key) {
                              value = empPackageData?.indirect_overrides_amount
                                  ? `${empPackageData?.indirect_overrides_amount} ${empPackageData?.indirect_overrides_type}`
                                  : ''
                          }
                          // Employee Office Override
                          if (TEMPLATE_DYNAMIC_FIELDS.employee_indirect_override.key === key) {
                              value = empPackageData?.office_overrides_amount
                                  ? `${empPackageData?.office_overrides_amount} ${empPackageData?.office_overrides_type}`
                                  : ''
                          }
                          // Employee End Date
                          if (TEMPLATE_DYNAMIC_FIELDS.employee_agreement_end_date.key === key) {
                              value = getValidDate(empPackageData?.end_date, 'MM/DD/YYYY') ?? ''
                          }
                          // Employee Start Date
                          if (TEMPLATE_DYNAMIC_FIELDS.employee_agreement_start_date.key === key) {
                              value =
                                  getValidDate(
                                      empPackageData?.period_of_agreement_start_date,
                                      'MM/DD/YYYY'
                                  ) ?? ''
                          }

                          // Employee Upfront Amount
                          if (TEMPLATE_DYNAMIC_FIELDS.employee_office_location.key === key) {
                              value = empPackageData?.office?.state?.name ?? ''
                          }

                          return {
                              key,
                              fullKey: item,
                              value,
                              type,
                          }
                      })
                    : []

            const finalTemplateFieldsData = templateData?.filter(
                (item) => !signingKeys.includes(item?.key)
            )
            const finalOtherFieldsData = otherFields?.filter(
                (item) => !signingKeys.includes(item?.key)
            )
            setFields(finalTemplateFieldsData)
            setOtherFields(finalOtherFieldsData)
        }
    }, [
        agreementByPosition,
        companyData?.business_address,
        companyData?.company_email,
        companyData?.company_website,
        companyData?.logo,
        companyData?.name,
        companyData?.phone_number,
        otherFields,
        selectedEmployee,
        selectedTemplate,
    ])

    const onChangeCategory = (e) => {
        setSelectedEmployee(null)
        setSelectedCategory(e.target.value)
    }

    const onChangeTemplate = (e) => {
        setSelectedEmployee(null)

        const template = templateDropdownList?.find((item) => item?.id == e?.target?.value)
        setSelectedTemplate({
            templateContent: template?.template_content,
            id: template?.id,
            categoryId: template?.categery_id,
            agreements: template?.template_agreements,
        })
    }

    const onSelectEmployee = useCallback((value) => {
        setSelectedEmployee(value)
    }, [])

    useEffect(() => {
        if (downloadContent) {
            viewInvoiceRef?.current?.downloadPdf()
            navigate('/sequidocs/templates')
        }
    }, [downloadContent])

    const sendOrDownloadTemplate = useCallback(
        (type = 'send') => {
            if (!selectedEmployee) return CustomToast.error('Select employee')
            setFullLoading(true)
            const fieldsData = {}
            const otherFieldsData = {}
            fields?.length > 0 &&
                fields.map((item) => {
                    fieldsData[item?.key] = item?.value
                    return null
                })

            otherFields?.length > 0 &&
                otherFields.map((item) => {
                    otherFieldsData[item?.key] = item?.value
                    return null
                })
            const body = {
                user_id: selectedEmployee?.id,
                template_id: selectedTemplate?.id,
                categery_id: selectedTemplate?.categoryId,
                ...fieldsData,
                ...otherFieldsData,
            }

            if (type == 'send') {
                // if (location?.state?.use) {
                sequiDocUseTemplateService(body)
                    .then((res) => {
                        navigate('/sequidocs/templates')
                        CustomToast.success('Template Sent')
                    })
                    .catch((e) => {
                        CustomToast.error(getErrorMessageFromResponse(e))
                    })
                    .finally(() => {
                        setFullLoading(false)
                    })
            }
            if (type == 'test') {
                testParticularTemplateService({...body, email: [selectedEmployee?.email]})
                    .then((res) => {
                        CustomToast.success('Test Template Sent')
                        navigate('/sequidocs/templates')
                    })
                    .catch((e) => {
                        CustomToast.error(getErrorMessageFromResponse(e))
                    })
                    .finally(() => {
                        setFullLoading(false)
                    })
            }
            if (type == 'download') {
                downloadParticularTemplateService(body)
                    .then((res) => {
                        setDownloadContent(res?.data, () => {})
                        viewInvoiceRef?.current?.downloadPdf()
                    })
                    .catch((e) => {
                        CustomToast.error(getErrorMessageFromResponse(e))
                    })
                    .finally(() => {
                        setFullLoading(false)
                    })
            }
        },
        [
            fields,
            navigate,
            otherFields,
            selectedEmployee,
            selectedTemplate?.categoryId,
            selectedTemplate?.id,
        ]
    )

    const updateFieldsData = useCallback(
        (index, value) => {
            let temp = [...otherFields]
            temp[index].value = value
            setOtherFields(temp)
        },
        [otherFields]
    )

    const onChangeInputData = useCallback(
        (e, index) => {
            updateFieldsData(index, e?.target?.value)
        },
        [updateFieldsData]
    )

    const onSeachRecruiter = useCallback(
        (searchText) =>
            new Promise((resolve) => {
                const body = {
                    template_id: categoryAndTemplateIdRef?.current?.selectedTemplate?.id,
                    category_id: categoryAndTemplateIdRef?.current?.selectedCategory,
                    search: searchText,
                }

                searchEmployeeToSendDocService(body)
                    .then((res) => {
                        const data = res?.data?.map((item) => ({
                            ...item,
                            name: `${item?.first_name} ${item?.last_name}`,
                        }))
                        resolve(data)
                    })
                    .catch(() => {
                        resolve([])
                    })
            }),
        []
    )
    return (
        <div style={{fontFamily: fontsFamily.manrope, fontSize: 14}}>
            <div className='d-flex align-items-center gap-3 mb-2'>
                <div>
                    <KTSVG
                        path='/media/icons/duotune/art/back-square.svg'
                        svgClassName='h-25px w-25px cursor-pointer'
                        onClick={() => navigate(-1)}
                    />
                </div>
                <div className='text-cmGrey900' style={{fontSize: 16, fontWeight: 500}}>
                    Send Letters to Employees
                </div>
            </div>
            <div className='text-cmGrey700 mb-10' style={{fontWeight: 600}}>
                Details for sending out letters to Employess
            </div>
            <div
                className='rounded bg-cmwhite border border-cmDisabled py-10 px-sm-20 px-5 mb-10'
                style={{position: 'relative'}}
            >
                <CustomLoader visible={fullLoading} full />
                <div className='w-sm-50 mb-10'>
                    <div className='mb-5'>
                        <CustomDropdown
                            label={'Select Category'}
                            searching={false}
                            options={categoriesDropDownList}
                            displayKey='categories'
                            valueKey='id'
                            value={selectedCategory}
                            onChange={onChangeCategory}
                            placeholder='Select Categories'
                            disabled={location?.state?.use}
                        />
                    </div>
                    <div className='mb-5'>
                        <CustomDropdown
                            label={'Select Template'}
                            searching={false}
                            options={templateDropdownList}
                            displayKey='template_name'
                            valueKey='id'
                            value={selectedTemplate?.id}
                            onChange={onChangeTemplate}
                            placeholder={loading ? 'Loading...' : 'Select Template'}
                            disabled={location?.state?.use}
                        />
                    </div>
                    <div className=''>
                        <CustomSearchInput
                            placeholder='Search for an Employee'
                            options={allEmployeeData}
                            displayKey='name'
                            onSearch={onSeachRecruiter}
                            onSelectValue={onSelectEmployee}
                            selectedValue={selectedEmployee?.name}
                            customEmptyMessage='No Available Employee'
                        />
                    </div>
                </div>
                {/* Tables */}
                <div>
                    <div
                        class='table-responsive border border-cmGrey300 mb-10'
                        style={{borderRadius: 10}}
                    >
                        <table class='table table-bordered '>
                            <thead className=''>
                                <tr
                                    className='bg-cmGrey300 text-cmGrey900'
                                    style={{fontWeight: 600}}
                                >
                                    <th className='px-5 '>Template Smart Text</th>
                                    <th className='px-5'>Value</th>
                                </tr>
                            </thead>
                            <tbody className='text-cmGrey700' style={{fontWeight: 600}}>
                                {fields?.length > 0 ? (
                                    <>
                                        {fields?.map((item, index) => (
                                            <tr>
                                                <td className='py-5 ps-sm-10 ps-5'>
                                                    [{item?.key}]
                                                </td>
                                                <td className='px-5'>
                                                    <div className='w-400px'>
                                                        <CustomInput
                                                            disabled={true}
                                                            value={item?.value}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            style={{
                                                textAlign: 'center',
                                                fontFamily: 'Manrope',
                                                fontWeight: '500',
                                                fontSize: 14,
                                                paddingTop: 20,
                                                paddingBottom: 20,
                                            }}
                                        >
                                            No fields found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Table 2 */}
                    <div
                        class='table-responsive border border-cmGrey300 mb-10'
                        style={{borderRadius: 10}}
                    >
                        <table class='table table-bordered '>
                            <thead className=''>
                                <tr
                                    className='bg-cmGrey300 text-cmGrey900'
                                    style={{fontWeight: 600}}
                                >
                                    <th className='px-5 '>Other Smart Text</th>
                                    <th className='px-5'>Value</th>
                                </tr>
                            </thead>
                            <tbody className='text-cmGrey700' style={{fontWeight: 600}}>
                                {otherFields?.length > 0 ? (
                                    <>
                                        {otherFields?.map((item, index) => (
                                            <tr>
                                                <td className='py-5 ps-sm-10 ps-5'>
                                                    [{item?.key}]
                                                </td>
                                                <td className='px-5'>
                                                    <div className='w-400px'>
                                                        <CustomInput
                                                            name={item?.key}
                                                            onChange={(e) =>
                                                                onChangeInputData(e, index)
                                                            }
                                                            value={item?.value}
                                                            placeholder='Enter'
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            style={{
                                                textAlign: 'center',
                                                fontFamily: 'Manrope',
                                                fontWeight: '500',
                                                fontSize: 14,
                                                paddingTop: 20,
                                                paddingBottom: 20,
                                            }}
                                        >
                                            No fields found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div>
                {selectedEmployee ? (
                    <div className='text-cmGrey800 text-center mb-5' style={{fontWeight: 600}}>
                        Email will be sent to{' '}
                        <span className='text-cmGrey900' style={{fontWeight: 700}}>
                            {' '}
                            {selectedEmployee?.email}
                        </span>
                    </div>
                ) : null}
                <div className='d-flex flex-wrap flex-center gap-sm-10 gap-5'>
                    <CustomButton
                        buttonLabel='Test Template'
                        buttonType={BUTTON_TYPE.secondary}
                        padding={'px-sm-10 py-3'}
                        onClick={() => sendOrDownloadTemplate('test')}
                    />
                    <CustomButton
                        buttonLabel='Send Now'
                        padding={'px-sm-15 py-3'}
                        onClick={() => sendOrDownloadTemplate('send')}
                        loading={loading}
                    />

                    <CustomButton
                        buttonLabel='Download'
                        buttonType={BUTTON_TYPE.secondary}
                        padding={'py-3 px-sm-10'}
                        onClick={() => sendOrDownloadTemplate('download')}
                        // onClick={() => viewInvoiceRef?.current?.downloadPdf()}
                    />
                </div>
            </div>
            <PrintOrDownloadPDF ref={viewInvoiceRef} fileName={`Sequifi-Invoice.pdf`}>
                <div className='my-sm-10 overflow-auto mx-auto border border-cmGrey200 w-90 shadow-sm'>
                    <div className='mb-5 text-center'>
                        <CustomImage
                            className={'w-50px h-50px'}
                            src={companyData?.logo}
                            type={IMAGE_TYPE.companyLogo}
                        />
                    </div>
                    <div
                        className='p-5'
                        style={{fontSize: '12px'}}
                        dangerouslySetInnerHTML={{__html: downloadContent}}
                    />
                    <div className='fixed-bottom border-top text-cmGrey900 text-center p-5'>
                        <div className='text-cmGrey800' style={{fontWeight: 500, fontSize: '16px'}}>
                            {companyData?.business_name} |{' '}
                            {formattedPhoneNumber(companyData?.business_phone)} |{' '}
                            {companyData?.company_email} |{companyData?.business_address},{' '}
                            {companyData?.business_state} {companyData?.business_zip}
                        </div>
                    </div>
                </div>
            </PrintOrDownloadPDF>
        </div>
    )
}

export default SendLettertoEmployee
