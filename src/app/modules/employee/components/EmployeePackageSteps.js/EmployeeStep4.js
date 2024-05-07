import {React, useState, useEffect, useCallback, useRef} from 'react'

import {HIRE_FIELD_KEYS} from '../EmployeePageBody'
import UploadNewDocModal from './UploadNewDocModal'
import {
    deleteEmployeeDocumentByIdService,
    deleteOnBoardingDocumentService,
    getEmployeeDocumentByIdService,
    uploadOnBoardingDocumentService,
} from '../../../../../services/Services'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'
import CustomLoader from '../../../../../customComponents/customLoader/CustomLoader'
import EachDocTypeRow from './EachDocTypeRow'
import {getErrorMessageFromResponse} from '../../../../../helpers/CommonHelpers'

let uploadingImgArr = []
const EmployeeStep4 = ({
    employeeData,
    validationMessage,
    setDocumentCount,
    DataFields,
    globalCompanyProfile,
}) => {
    const [openModal, setOpenModal] = useState()
    const [showTable, setShowTable] = useState(true)
    const [loading, setLoading] = useState(false)
    const [selectedEmployeecData, setSelectedEmployeecData] = useState(null)
    const [employeeDocData, setEmployeeDocData] = useState(null)

    useEffect(() => {
        if (employeeData?.id) getDocument()
    }, [employeeData?.id])

    const getDocument = () => {
        setLoading(true)
        getEmployeeDocumentByIdService(employeeData?.id)
            .then((res) => {
                setEmployeeDocData(res?.data)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const CloseModal = () => {
        setOpenModal(false)
    }

    return (
        <div className=' w-sm-100 w-100 mx-auto' style={{fontSize: '14px', fontFamily: 'Manrope'}}>
            <div className='text-cmGrey500 text-center mb-10 '>
                Welcome to <span className='text-cmGrey800'> {globalCompanyProfile?.name}</span>,
                Please Complete The Following Fields. Please ensure the following information is
                correct before proceeding to the next section.
            </div>
            <div
                className='bg-cmwhite shadow-sm mb-10 w-sm-75 w-100 mx-auto py-5 '
                style={{borderRadius: '10px'}}
            >
                {showTable && (
                    <div style={{position: 'relative'}}>
                        <CustomLoader visible={loading} full />
                        <div
                            className='text-center text-cmGrey600'
                            style={{
                                fontSize: '14px',
                                fontWeight: '500',
                                fontFamily: 'Manrope',
                            }}
                        >
                            {/* Upload Mandatory Documents */}
                        </div>
                        <div className='table-responsive'>
                            <table className='table' style={{tableLayout: 'fixed', width: '100%'}}>
                                <thead className=''>
                                    <tr
                                        className='text-cmGrey900 bg-cmGrey300'
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            fontFamily: 'Manrope',
                                        }}
                                    >
                                        <th className=' p-5' style={{width: '175px'}}>
                                            Type
                                        </th>
                                        <th className=' p-5' style={{width: '150px'}}>
                                            Uploaded Date
                                        </th>
                                        <th className=' p-5 ' style={{width: '300px'}}>
                                            Attachments
                                        </th>
                                        <th className=' p-5' style={{width: '120px'}}></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {employeeDocData?.length > 0 ? (
                                        employeeDocData?.map(
                                            (item, index) =>
                                                !item?.is_deleted && (
                                                    <EachDocTypeRow
                                                        key={index}
                                                        employeeData={employeeData}
                                                        item={item}
                                                        userId={employeeData?.id}
                                                    />
                                                )
                                        )
                                    ) : (
                                        <tr>
                                            <td colSpan={3}>
                                                <div className='text-center'>
                                                    No documents need to be upload
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
            <UploadNewDocModal
                show={openModal}
                handleClose={CloseModal}
                userData={employeeData}
                getDocument={getDocument}
                editData={selectedEmployeecData}
            />
        </div>
    )
}

export default EmployeeStep4
