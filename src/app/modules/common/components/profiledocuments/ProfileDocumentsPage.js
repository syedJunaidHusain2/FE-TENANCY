import React, {useState, useEffect, useCallback} from 'react'

import {useLocation} from 'react-router-dom'
import {DocumentFormPopup, ProfileDocumentFormPopup} from './ProfileDocumentFormPopup'

import {
    getEmployeeDocumentByIdService,
    deleteEmployeeDocumentByIdService,
} from '../../../../../services/Services'

import ProfileDocumentTable from './ProfileDocumentTable'
import CustomToast from '../../../../../customComponents/customToast/CustomToast'

const ProfileDocumentsPage = ({getEmployeeProfile}) => {
    let location = useLocation()
    const [employeeDocData, setEmployeeDocData] = useState(null)
    const [selectedEmployeecData, setSelectedEmployeecData] = useState(null)
    const [loading, setLoading] = useState(true)

    const [open, setOpen] = useState(false)

    useEffect(() => {
        getDocument()
    }, [])

    const getDocument = () => {
        setLoading(true)
        getEmployeeDocumentByIdService(location?.state?.employee_id)
            .then((res) => {
                setEmployeeDocData(res)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    const handleClose = () => {
        setSelectedEmployeecData(null)
        getDocument()
        setOpen(false)
    }

    const deleteDocument = useCallback(
        (id) => {
            const tempData = {...employeeDocData}
            const finalData = tempData?.data?.filter((item) => item?.id !== id)
            tempData.data = finalData
            setEmployeeDocData(tempData)
            CustomToast.success('Document Deleted')
            const body = {
                user_id: location?.state?.employee_id,
                id: id,
            }
            deleteEmployeeDocumentByIdService(body)
        },
        [employeeDocData, location?.state?.employee_id]
    )

    return (
        <div>
            <div className='mb-10 bg-cmwhite shadow-sm' style={{borderRadius: '10px'}}>
                <div
                    className='mx-10 p-5 d-flex justify-content-between align-items-center'
                    style={{fontWeight: 600, fontFamily: 'Manrope'}}
                >
                    <div className='d-flex gap-3 align-items-center'>
                        <div className='text-cmGrey900' style={{fontSize: '14px'}}>
                            Total Documents:
                        </div>
                        <div className='text-cmGrey900' style={{fontSize: '16px', fontWeight: 800}}>
                            {employeeDocData?.totalDocuments}
                        </div>
                    </div>
                    {/* <div
            className='btn bg-cmBlue-Crayola text-cmwhite'
            style={{fontWeight: 600}}
            onClick={() => {
              setOpen(true)
            }}
          >
            Upload New
          </div> */}
                </div>
                {/* <DocumentTable */}
                <ProfileDocumentTable
                    onSelectedModal={(val, type) => {
                        if (type == 'edit') setOpen(true)
                        setSelectedEmployeecData(val)
                    }}
                    loading={loading}
                    documentData={employeeDocData?.data}
                    deleteDocument={deleteDocument}
                    userId={location?.state?.employee_id}
                />
            </div>

            {open && (
                <ProfileDocumentFormPopup
                    show={open}
                    handleClose={handleClose}
                    employeeDocData={selectedEmployeecData}
                    userId={location?.state?.employee_id}
                />
            )}
        </div>
    )
}

export default ProfileDocumentsPage
