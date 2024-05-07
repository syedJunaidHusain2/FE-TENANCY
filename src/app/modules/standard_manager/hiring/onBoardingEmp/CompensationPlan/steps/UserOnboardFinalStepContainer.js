/* eslint-disable jsx-a11y/anchor-is-valid */
import {useCallback, useState} from 'react'
import {
    digiSignerSignatureRequestService,
    hireEmployeeDirectlyService,
    sendEmailbyIdService,
} from '../../../../../../../services/Services'
import CustomLoader from '../../../../../../../customComponents/customLoader/CustomLoader'
import CustomToast from '../../../../../../../customComponents/customToast/CustomToast'
import {useSelector} from 'react-redux'
import {getUserDataSelector} from '../../../../../../../redux/selectors/AuthSelectors'
import {getErrorMessageFromResponse} from '../../../../../../../helpers/CommonHelpers'
import CustomInput, {
    INPUT_TYPE,
} from '../../../../../../../customComponents/customInputs/customInput/CustomInput'
import CustomCheckbox from '../../../../../../../customComponents/customCheckbox/CustomCheckbox'
import {DIGISIGNER_CONFIG} from '../../../../../../../constants/constants'

const UserOnboardFinalStepContainer = ({
    employeeData,
    selectedDocument,
    onModalClose,
    page,
    hireDirect,
    onBackPress = null,
}) => {
    const userData = useSelector(getUserDataSelector)
    const [loading, setLoading] = useState(false)
    // const [name, setName] = useState(`${userData?.first_name} ${userData?.last_name}`)
    const [name, setName] = useState(null)

    const [allowPermission, setAllowPermission] = useState(false)
    const handleSubmit = () => {
        if (employeeData?.id) {
            if (allowPermission) {
                setLoading(true)
                sendEmailbyIdService(employeeData?.id)
                    .then(() => {
                        CustomToast.success('Employee created and mail sent')
                        onModalClose()
                        sendFormToEmail()
                    })
                    .catch((e) => {
                        CustomToast.error(getErrorMessageFromResponse(e))
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            } else {
                CustomToast.error(
                    'Accept acknowledge that all the information added is correct and reviewed.'
                )
            }
        } else {
            CustomToast.success('Employee created but mail not sent')
        }
    }
    const onHireDirectly = () => {
        if (employeeData?.id) {
            if (allowPermission) {
                setLoading(true)
                const body = {
                    employee_id: employeeData?.id,
                }
                hireEmployeeDirectlyService(body)
                    .then(() => {
                        CustomToast.success('Employee Hired')
                        onModalClose()
                        sendFormToEmail()
                    })
                    .catch((e) => {
                        CustomToast.error(getErrorMessageFromResponse(e))
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            } else {
                CustomToast.error(
                    'Accept acknowledge that all the information added is correct and reviewed.'
                )
            }
        } else {
            CustomToast.error('Employee created but mail not sent')
        }
    }

    const sendFormToEmail = useCallback(() => {
        if (DIGISIGNER_CONFIG.attach_document) {
            const selectedData = selectedDocument.filter((item) => item?.isSelected)
            selectedData?.map((item) => {
                digiSignerSignatureRequestService(item?.document_id, item?.name, employeeData)
            })
        }
    }, [employeeData, selectedDocument])

    return (
        page && (
            <>
                <CustomLoader visible={loading} full />
                <div
                    className='current d-flex flex-column '
                    data-kt-stepper-element='content'
                    style={{marginBottom: '34%'}}
                >
                    <div
                        className='container mt-3 d-flex justify-content-center flex-column  w-md-425px mt-20'
                        // style={{marginLeft: '-10px'}}
                    >
                        <div
                            className='cmGrey900'
                            style={{fontFamily: 'Manrope', fontSize: '14px', fontWeight: 600}}
                        >
                            Review the agreement
                        </div>
                        <div
                            className='text-cmGrey700 mt-5'
                            style={{fontWeight: 600, fontSize: '14px'}}
                        >
                            Kindly Review all information before sending out the mail.
                        </div>
                        <div className='mt-16 d-flex gap-1'>
                            <div>
                                {' '}
                                <CustomCheckbox
                                    checked={allowPermission}
                                    onChange={() => setAllowPermission((val) => !val)}
                                />
                            </div>
                            <div
                                className='text-cmGrey800'
                                style={{fontWeight: 600, fontSize: '14px'}}
                            >
                                I hereby acknowledge that all the information added is correct and
                                reviewed.
                                <label style={{color: 'red'}}>*</label>
                            </div>
                        </div>

                        <div className='mt-10'>
                            <CustomInput
                                label={'Enter your Name'}
                                placeholder='Enter Name'
                                value={name}
                                onChange={(e) => setName(e?.target?.value)}
                                style={{fontWeight: 700}}
                            />
                        </div>
                        <div className='d-flex justify-content-center mt-16'>
                            <div className='me-2'>
                                <button
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: 700,
                                    }}
                                    type='button'
                                    className='btn text-cmBlue-Crayola border border-cmBlue-Crayola'
                                    data-kt-stepper-action='previous'
                                    onClick={onBackPress}
                                >
                                    Back
                                </button>
                            </div>
                            <button
                                type='button'
                                style={{
                                    background: '#6078EC',
                                    color: 'white',
                                    fontSize: '12px',
                                }}
                                className='btn btn-lg fs-6 mb-2 ms-5 '
                                onClick={() => (hireDirect ? onHireDirectly() : handleSubmit())}
                            >
                                {hireDirect ? 'Hire Directly' : 'Submit (Send mail)'}
                            </button>
                            {!hireDirect && (
                                <button
                                    type='button'
                                    style={{
                                        background: '#6078EC',
                                        color: 'white',
                                        fontSize: '12px',
                                    }}
                                    className='btn btn-lg fs-6 mb-2 ms-5 '
                                    onClick={onHireDirectly}
                                >
                                    Hire Directly
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </>
        )
    )
}

export default UserOnboardFinalStepContainer
