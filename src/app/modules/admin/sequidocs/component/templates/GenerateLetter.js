/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect, useRef, useMemo, useCallback} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import Btn from '../../Icon/file1.png'
import 'react-datepicker/dist/react-datepicker.css'
import File from '../../Icon/file.png'
import CustomSearchInput from '../../../../../../customComponents/customInputs/customSearchInput/CustomSearchInput'
import {
    getRecuiterFilterService,
    getUserEmploymentPackageDetailService,
    sendSequiDocsTemplateService,
} from '../../../../../../services/Services'
import {
    getValidDate,
    TEMPLATE_DYNAMIC_FIELDS,
    TEMPLATE_DYNAMIC_FIELD_FIND_REGEX,
} from '../../../../../../constants/constants'
import {useSelector} from 'react-redux'
import {getCompanyProfileSelector} from '../../../../../../redux/selectors/SettingsSelectors'
import CustomLoader from '../../../../../../customComponents/customLoader/CustomLoader'
import {saveAs} from 'file-saver'
import CustomToast from '../../../../../../customComponents/customToast/CustomToast'
import {getErrorMessageFromResponse, getServerImage} from '../../../../../../helpers/CommonHelpers'
import CustomInput from '../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomModal from '../../../../../../customComponents/customModal/CustomModal'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../customComponents/customButtton/CustomButton'
import CustomCheckbox from '../../../../../../customComponents/customCheckbox/CustomCheckbox'
import CustomDatePicker from '../../../../../../customComponents/customInputs/customDatePicker/CustomDatePicker'
import {fontsFamily} from '../../../../../../assets/fonts/fonts'

const modalsRoot = document.getElementById('root-modals') || document.body
const GenerateLetter = ({show, handleClose, selectedTemplate}) => {
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [fields, setFields] = useState(null)
    const companyData = useSelector(getCompanyProfileSelector)
    const [loading, setLoading] = useState()
    const [showDueDate, setShowDueDate] = useState(false)
    const [dueDate, setDueDate] = useState(null)

    const onClose = useCallback(() => {
        handleClose()
        setFields(null)
        setShowDueDate(false)
        setSelectedEmployee(null)
    }, [handleClose])

    useEffect(() => setDynamicFieldsValue(), [selectedTemplate])

    const setDynamicFieldsValue = useCallback(() => {
        // const finalTemplate = selectedTemplate?.template_description?.replace(/[\]][^\s]/gim, '] ')
        const regexFoundData = selectedTemplate?.template_description?.match(
            TEMPLATE_DYNAMIC_FIELD_FIND_REGEX
        )
        const uniqueData = regexFoundData?.filter(
            (item, index, self) => self?.indexOf(item) == index
        )
        const data =
            uniqueData?.length > 0
                ? uniqueData?.map((item) => {
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

                      return {
                          key,
                          fullKey: item,
                          value,
                          type,
                      }
                  })
                : []
        setFields(data)
    }, [
        companyData?.business_address,
        companyData?.company_email,
        companyData?.company_website,
        companyData?.logo,
        companyData?.name,
        companyData?.phone_number,
        selectedTemplate?.template_description,
    ])

    const onSeachRecruiter = useCallback(
        (searchText) =>
            new Promise((resolve) => {
                getRecuiterFilterService(searchText)
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

    const updateFieldsData = useCallback(
        (index, value) => {
            let temp = [...fields]
            temp[index].value = value
            setFields(temp)
        },
        [fields]
    )

    const onChangeInputData = useCallback(
        (e, index) => {
            updateFieldsData(index, e?.target?.value)
        },
        [updateFieldsData]
    )

    const onSelectEmployee = useCallback(
        (value) => {
            const employeeData = value
            getUserEmploymentPackageDetailService(value?.id).then((res) => {
                const empPackageData = res?.data

                let tempFields = [...fields]
                fields.map((item, index) => {
                    // Employee ID
                    if (TEMPLATE_DYNAMIC_FIELDS.employee_id.key === item?.key)
                        tempFields[index].value = employeeData?.id

                    // Employee Name
                    if (TEMPLATE_DYNAMIC_FIELDS.employee_name.key === item?.key)
                        tempFields[index].value = `${employeeData?.first_name ?? ''} ${
                            employeeData?.last_name ?? ''
                        }`

                    // Employee Designation
                    if (TEMPLATE_DYNAMIC_FIELDS.employee_designation.key === item?.key)
                        tempFields[index].value = employeeData?.position_detail?.position_name ?? ''

                    // Employee Full Name
                    if (TEMPLATE_DYNAMIC_FIELDS.employee_full_name.key === item?.key)
                        tempFields[index].value = employeeData?.name ?? ''

                    // Employee Position
                    if (TEMPLATE_DYNAMIC_FIELDS.employee_position.key === item?.key)
                        tempFields[index].value = employeeData?.position_detail?.position_name ?? ''

                    // Employee First Name
                    if (TEMPLATE_DYNAMIC_FIELDS.employee_first_name.key === item?.key)
                        tempFields[index].value = employeeData?.first_name ?? ''

                    // Employee Address
                    if (TEMPLATE_DYNAMIC_FIELDS.employee_address.key === item?.key)
                        tempFields[index].value = employeeData?.home_address ?? ''

                    // Employee SSN
                    if (TEMPLATE_DYNAMIC_FIELDS.employee_ssn.key === item?.key)
                        tempFields[index].value = employeeData?.social_sequrity_no ?? ''

                    // Employee Manager Full Name
                    if (TEMPLATE_DYNAMIC_FIELDS.employee_manager_full_name.key === item?.key)
                        tempFields[index].value = `${
                            employeeData?.manager_detail?.first_name ?? ''
                        } ${employeeData?.manager_detail?.last_name ?? ''}`

                    // Employee Manager Position
                    if (TEMPLATE_DYNAMIC_FIELDS.employee_manager_position.key === item?.key)
                        tempFields[index].value = employeeData?.manager_detail?.position_name ?? ''

                    // Employee Manager Department
                    if (TEMPLATE_DYNAMIC_FIELDS.employee_manager_department.key === item?.key)
                        tempFields[index].value =
                            employeeData?.manager_detail?.department_name ?? ''

                    // Employee Redline Amount
                    if (TEMPLATE_DYNAMIC_FIELDS.employee_redline_amount.key === item?.key) {
                        tempFields[index].value = empPackageData?.redline_amount ?? ''
                    }

                    // Employee Redline Amount Type
                    if (
                        TEMPLATE_DYNAMIC_FIELDS.employee_redline_amount_with_type.key === item?.key
                    ) {
                        tempFields[index].value = empPackageData?.redline_type ?? ''
                    }

                    // Employee Upfront Amount
                    if (TEMPLATE_DYNAMIC_FIELDS.employee_upfront_amount.key === item?.key) {
                        tempFields[index].value = empPackageData?.upfront_pay_amount ?? ''
                    }
                    // Employee Comission
                    if (TEMPLATE_DYNAMIC_FIELDS.employee_comission.key === item?.key) {
                        tempFields[index].value = `${empPackageData?.commission} %` ?? ''
                    }

                    // Employee Direct Override
                    if (TEMPLATE_DYNAMIC_FIELDS.employee_direct_override.key === item?.key) {
                        tempFields[index].value =
                            `${empPackageData?.direct_overrides_amount} ${empPackageData?.direct_overrides_type}` ??
                            ''
                    }
                    // Employee Indirect Override
                    if (TEMPLATE_DYNAMIC_FIELDS.employee_indirect_override.key === item?.key) {
                        tempFields[index].value =
                            `${empPackageData?.indirect_overrides_amount} ${empPackageData?.indirect_overrides_type}` ??
                            ''
                    }

                    return null
                })
                setFields(tempFields)
            })
            setSelectedEmployee(value)
        },
        [fields]
    )

    const sendOrDownloadTemplate = useCallback(
        (type = 'send') => {
            if (!selectedEmployee) return CustomToast.error('Select employee')
            const fieldsData = {}
            fields.map((item) => {
                fieldsData[item?.key] = item?.value
                return null
            })
            const body = {
                user_id: selectedEmployee?.id,
                template_id: selectedTemplate?.id,
                ...fieldsData,
            }
            if (showDueDate) body.due_date = dueDate
            setLoading(true)
            sendSequiDocsTemplateService(selectedTemplate?.id, body)
                .then((res) => {
                    const fileName = res?.data?.split('/')?.[1]
                    if (type === 'send') CustomToast.success('Template sent successfully')
                    else if (type === 'download') {
                        CustomToast.success('Template download successfully')
                        saveAs(getServerImage(res?.data), fileName)
                    }
                    onClose()
                })
                .catch((e) => {
                    CustomToast.error(getErrorMessageFromResponse(e))
                })
                .finally(() => {
                    setLoading(false)
                })
        },
        [dueDate, fields, onClose, selectedEmployee, selectedTemplate?.id, showDueDate]
    )
    return (
        <CustomModal
            show={show}
            onHide={onClose}
            title='Use Template | Generate Letter'
            maxWidth='850'
        >
            {/* <div className='modal-header '></div> */}

            <div
                className='mx-auto p-5'
                style={{fontFamily: fontsFamily.manrope, width: 'fit-content'}}
            >
                <div className='d-sm-flex mb-10'>
                    <div className=''>
                        <div className=' mb-16' id='kt_chat_contacts_header'>
                            <label className='mb-1' style={{color: '#616161', fontSize: '14px'}}>
                                If you are generating a letter for an employee
                            </label>

                            <CustomSearchInput
                                placeholder='Search for an Employee / Email address / All / Positions'
                                onSearch={onSeachRecruiter}
                                onSelectValue={onSelectEmployee}
                                selectedValue={selectedEmployee?.name}
                            />
                        </div>
                        {/* search bar ends */}
                        {/* Lists starts */}

                        <div
                            // id='get'
                            style={{border: '1px solid #E0E0E0', borderRadius: '10px'}}
                            className='table-responsive overflow-auto'
                        >
                            <table className='table '>
                                <thead>
                                    <tr
                                        className=' '
                                        style={{
                                            background: '#EEEEEE',
                                            color: '#212121',
                                            fontSize: '14px',
                                            fontWeight: '800',
                                            fontFamily: 'Manrope',
                                        }}
                                    >
                                        {/* <th st></th> */}
                                        <th className='min-w-50px ps-6'>Placeholder</th>
                                        <th className='min-w-300px ps-6'>value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fields?.length > 0 ? (
                                        <>
                                            {fields?.map((item, index) => (
                                                <tr
                                                    className=''
                                                    style={{
                                                        color: '#616161',
                                                        height: '40px',
                                                        fontSize: '12px',
                                                        fontFamily: 'Manrope',
                                                    }}
                                                >
                                                    <td className='p-6 w-75px'>
                                                        <label
                                                            className='mb-1 mt-1'
                                                            style={{
                                                                color: '#616161',
                                                                fontSize: '14px',
                                                            }}
                                                        >
                                                            [{item?.key}]
                                                        </label>
                                                    </td>
                                                    <td>
                                                        <CustomInput
                                                            name={item?.key}
                                                            onChange={(e) =>
                                                                onChangeInputData(e, index)
                                                            }
                                                            value={item?.value}
                                                            placeholder='Enter'
                                                        />
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
                {/* button starts*/}
                <div className=' d-flex flex-row gap-5 align-items-center mb-10'>
                    <div className=''>
                        <CustomCheckbox
                            checked={showDueDate}
                            onChange={() => {
                                setShowDueDate((val) => !val)
                            }}
                        />
                    </div>
                    <div className='' style={{fontWeight: 600}}>
                        Expiry Date:
                    </div>
                    {showDueDate && (
                        <div>
                            <CustomDatePicker
                                value={dueDate}
                                onChange={(e) => setDueDate(e?.target?.value)}
                            />
                        </div>
                    )}
                </div>
                <div className='gap-10 d-flex flex-wrap flex-center'>
                    <CustomButton
                        type='submit'
                        buttonType={BUTTON_TYPE.primary}
                        buttonLabel='Send Now'
                        padding={'px-10'}
                        onClick={() => sendOrDownloadTemplate('send')}
                        icon='bi bi-send'
                        iconPosition='right'
                    />
                    <CustomButton
                        padding={'px-10'}
                        type='submit'
                        buttonType={BUTTON_TYPE.secondary}
                        buttonLabel='Download'
                        onClick={() => sendOrDownloadTemplate('download')}
                        icon='bi bi-file-earmark-arrow-down'
                        iconPosition='right'
                    />
                </div>
                {/* button ends*/}
            </div>

            <CustomLoader full visible={loading} />
        </CustomModal>
    )
}

export {GenerateLetter}
