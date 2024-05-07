import React, {useCallback, useRef, useState} from 'react'
import CustomModal from '../../../../../../../customComponents/customModal/CustomModal'
import {KTSVG} from '../../../../../../../_metronic/helpers'
import {ProgressBar} from 'primereact/progressbar'
import CustomButton, {
    BUTTON_SIZE,
    BUTTON_TYPE,
} from '../../../../../../../customComponents/customButtton/CustomButton'
import {importAdminSalesDataService} from '../../../../../../../services/Services'
import CustomToast from '../../../../../../../customComponents/customToast/CustomToast'
import {
    downloadAnyFileHelper,
    getErrorMessageFromResponse,
} from '../../../../../../../helpers/CommonHelpers'
import moment from 'moment'
import axios from 'axios'
import {saveAs} from 'file-saver'
import {AMAZON_S3_BUCKET_URL, AMAZON_S3_CONFIG} from '../../../../../../../constants/constants'
const ExcelImportModal = ({open, handleClose}) => {
    const companyProfileFilePickerRef = useRef()
    const [selectedFile, setSelectedFile] = useState(null)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [uploadError, setUploadError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const fileSelectedHandler = (e) => {
        setUploadError(false)
        setSelectedFile(e?.target?.files?.[0])
    }

    const onUploadFile = useCallback(() => {
        if (!selectedFile) return CustomToast.error('No file selected')
        setLoading(true)
        setErrorMessage(null)
        let formData = new FormData()
        formData.append('file', selectedFile)
        importAdminSalesDataService(formData, (uploadProgress) => {
            setUploadProgress(uploadProgress?.completed)
        })
            .then((res) => {
                handleClose()
                CustomToast.success('Your excel sheet has been successfully imported.')
            })
            .catch((err) => {
                setUploadProgress(0)
                setUploadError(true)
                setErrorMessage(err?.data?.error ?? getErrorMessageFromResponse(err))
            })
            .finally(() => setLoading(false))
    }, [handleClose, selectedFile])

    const sampleFileDownload = () => {
        const fileURL = `${AMAZON_S3_CONFIG.s3_bucket_url}/excel_import/import_format.xlsx`

        axios
            .get(fileURL, {responseType: 'arraybuffer'})
            .then((response) => {
                const blob = new Blob([response.data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                })
                saveAs(blob, 'sample_file.xlsx')
                CustomToast.success('File Downloaded Successfully')
            })
            .catch((error) => {
                console.error('Error downloading file:', error)
            })
    }

    const handleDragEnter = (e) => {
        setErrorMessage('')
        setUploadError(false)
        e.preventDefault()
    }

    const handleDrop = (e) => {
        e.preventDefault()
        const file = e?.dataTransfer?.files?.[0]
        if (file && file?.name?.split(".")?.[1]==="xlsx") {
             setSelectedFile(file)
          } else {
            setUploadError(true)
            setErrorMessage("Invalid file type. Please upload an XLSX file.")
          }
       
    }

    const removeFile = () => {
        setSelectedFile(null)
    }
    return (
        <CustomModal show={open} onHide={handleClose} maxWidth='425' showline={false}>
            <div className='mb-5' style={{fontWeight: 700, fontSize: 18, color: '#363939'}}>
                Excel Import
            </div>
            <div
                className='text-cmGrey600 mb-10 cursor-pointer'
                style={{fontSize: 12, fontWeight: 600}}
            >
                Need Help to understand what will work?{' '}
                <span
                    className='text-cminfo text-decoration-underline'
                    onClick={sampleFileDownload}
                >
                    Download Sample{' '}
                </span>
            </div>

            <div
                onDragEnter={handleDragEnter}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className='d-flex flex-center flex-column h-200px border-cmGrey400 rounded border gap-1 border-dashed bg-cmwhite bg-hover-cmGrey100 cursor-pointer mb-10 draggable="true"'
                onClick={() => companyProfileFilePickerRef?.current?.click()}
            >
                <div className='bi bi-plus-circle text-cmGrey600' style={{fontSize: 30}} />
                <div style={{color: '#363939', fontWeight: 600, fontSize: 18}}>Upload Files</div>
                <div className='' style={{color: '#57595A', fontWeight: 600}}>
                    <span className='text-cmBlue-Crayola'>Browse file</span> from your computer
                </div>
                <input
                    ref={companyProfileFilePickerRef}
                    type='file'
                    accept='.xlsx, .xls'
                    onChange={fileSelectedHandler}
                    style={{display: 'none'}}
                />
            </div>
            {selectedFile ? (
                <div
                    className='border border-cmGrey300 gap-5 d-flex align-items-start p-3 mb-3'
                    style={{borderRadius: 10}}
                >
                    <div className=''>
                        <KTSVG
                            path='/media/icons/duotune/art/ExcelSheetIcon.svg'
                            svgClassName='cursor-pointer'
                            svgStyle={{width: '45px', height: '45px'}}
                        />
                    </div>

                    <div className='flex-grow-1'>
                        <div className='d-flex justify-content-between align-items-start mb-3'>
                            <div>
                                <div style={{color: '#363939', fontSize: 15, fontWeight: 500}}>
                                    {selectedFile?.name}
                                </div>
                                <div style={{fontSize: 10, fontWeight: 500, color: '#57595A'}}>
                                    {selectedFile?.size}kb
                                </div>
                            </div>
                            {uploadError ? (
                                <div className='me-5'>
                                    <KTSVG
                                        path='/media/icons/duotune/art/Red-Warn.svg'
                                        svgClassName='cursor-pointer'
                                        svgStyle={{width: '25px', height: '25px'}}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <KTSVG
                                        path='/media/icons/duotune/art/trash-2.svg'
                                        svgClassName='cursor-pointer'
                                        svgStyle={{width: '21px', height: '21px'}}
                                        onClick={removeFile}
                                    />
                                </div>
                            )}
                        </div>
                        {uploadProgress > 0 && !uploadError ? (
                            <div className='d-flex align-items-center justify-content-between w-95 pb-2'>
                                <div className='w-85'>
                                    <ProgressBar
                                        color='#6078EC'
                                        value={uploadProgress}
                                        style={{borderRadius: 50, height: '12px'}}
                                    />
                                </div>
                                <div style={{fontSize: 10, fontWeight: 500, color: '#797A7B'}}>
                                    {uploadProgress}%
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            ) : null}

            <div>
                <span className='p-error' style={{fontWeight: 'bold', fontSize: 12}}>
                    {errorMessage}
                </span>
            </div>
            <div className='d-flex mt-10 flex-center gap-7'>
                <div>
                    <CustomButton
                        buttonType={BUTTON_TYPE.disabledBorder}
                        buttonLabel='Cancel'
                        buttonSize={BUTTON_SIZE.small}
                        onClick={handleClose}
                    />
                </div>
                <div>
                    <CustomButton
                        buttonLabel='Upload'
                        buttonSize={BUTTON_SIZE.small}
                        onClick={onUploadFile}
                        loading={loading}
                    />
                </div>
            </div>
        </CustomModal>
    )
}

export default ExcelImportModal
